-- Create comments table for initiatives
CREATE TABLE public.initiative_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.initiative_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comment votes table
CREATE TABLE public.comment_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES public.initiative_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Enable RLS
ALTER TABLE public.initiative_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for comments
CREATE POLICY "Anyone can view comments on active initiatives"
  ON public.initiative_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.initiatives
      WHERE initiatives.id = initiative_comments.initiative_id
      AND (initiatives.status = 'active' OR initiatives.created_by = auth.uid())
    )
  );

CREATE POLICY "Authenticated users can create comments"
  ON public.initiative_comments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.initiative_comments
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.initiative_comments
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for comment votes
CREATE POLICY "Anyone can view comment votes"
  ON public.comment_votes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote on comments"
  ON public.comment_votes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.comment_votes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON public.comment_votes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updating comment timestamps
CREATE TRIGGER update_initiative_comments_updated_at
  BEFORE UPDATE ON public.initiative_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get comment vote counts
CREATE OR REPLACE FUNCTION public.get_comment_vote_counts(comment_uuid uuid)
RETURNS TABLE(upvotes bigint, downvotes bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*) FILTER (WHERE vote_type = 'up') AS upvotes,
    COUNT(*) FILTER (WHERE vote_type = 'down') AS downvotes
  FROM public.comment_votes
  WHERE comment_id = comment_uuid;
$$;

-- Create indexes for better performance
CREATE INDEX idx_initiative_comments_initiative_id ON public.initiative_comments(initiative_id);
CREATE INDEX idx_initiative_comments_parent_id ON public.initiative_comments(parent_comment_id);
CREATE INDEX idx_comment_votes_comment_id ON public.comment_votes(comment_id);