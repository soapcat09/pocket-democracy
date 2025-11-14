-- Create counties table with CNP codes
CREATE TABLE public.counties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  cnp_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.counties ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read counties (public data)
CREATE POLICY "Counties are viewable by everyone"
ON public.counties
FOR SELECT
USING (true);

-- Insert all Romanian counties with their CNP codes
INSERT INTO public.counties (name, cnp_code) VALUES
  ('Alba', '01'),
  ('Arad', '02'),
  ('Argeș', '03'),
  ('Bacău', '04'),
  ('Bihor', '05'),
  ('Bistrița-Năsăud', '06'),
  ('Botoșani', '07'),
  ('Brașov', '08'),
  ('Brăila', '09'),
  ('Buzău', '10'),
  ('Caraș-Severin', '11'),
  ('Cluj', '12'),
  ('Constanța', '13'),
  ('Covasna', '14'),
  ('Dâmbovița', '15'),
  ('Dolj', '16'),
  ('Galați', '17'),
  ('Gorj', '18'),
  ('Harghita', '19'),
  ('Hunedoara', '20'),
  ('Ialomița', '21'),
  ('Iași', '22'),
  ('Ilfov', '23'),
  ('Maramureș', '24'),
  ('Mehedinți', '25'),
  ('Mureș', '26'),
  ('Neamț', '27'),
  ('Olt', '28'),
  ('Prahova', '29'),
  ('Satu-Mare', '30'),
  ('Sălaj', '31'),
  ('Sibiu', '32'),
  ('Suceava', '33'),
  ('Teleorman', '34'),
  ('Timiș', '35'),
  ('Tulcea', '36'),
  ('Vaslui', '37'),
  ('Vâlcea', '38'),
  ('Vrancea', '39'),
  ('București', '40'),
  ('București - Sector 1', '41'),
  ('București - Sector 2', '42'),
  ('București - Sector 3', '43'),
  ('București - Sector 4', '44'),
  ('București - Sector 5', '45'),
  ('București - Sector 6', '46'),
  ('Călărași', '51'),
  ('Giurgiu', '52');

-- Create initiatives table
CREATE TABLE public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  county_id UUID NOT NULL REFERENCES public.counties(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'approved', 'rejected')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on initiatives
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

-- Anyone can view active initiatives
CREATE POLICY "Anyone can view active initiatives"
ON public.initiatives
FOR SELECT
USING (status = 'active' OR auth.uid() = created_by);

-- Only authenticated users can create initiatives
CREATE POLICY "Authenticated users can create initiatives"
ON public.initiatives
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Only creators can update their own initiatives
CREATE POLICY "Users can update their own initiatives"
ON public.initiatives
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Create votes table
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  initiative_id UUID NOT NULL REFERENCES public.initiatives(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('for', 'against', 'abstain')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, initiative_id)
);

-- Enable RLS on votes
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Users can view their own votes
CREATE POLICY "Users can view their own votes"
ON public.votes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own votes
CREATE POLICY "Users can insert their own votes"
ON public.votes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own votes
CREATE POLICY "Users can update their own votes"
ON public.votes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete their own votes"
ON public.votes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create function to get vote counts for an initiative
CREATE OR REPLACE FUNCTION public.get_initiative_vote_counts(initiative_uuid UUID)
RETURNS TABLE(votes_for BIGINT, votes_against BIGINT, votes_abstain BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*) FILTER (WHERE vote_type = 'for') AS votes_for,
    COUNT(*) FILTER (WHERE vote_type = 'against') AS votes_against,
    COUNT(*) FILTER (WHERE vote_type = 'abstain') AS votes_abstain
  FROM public.votes
  WHERE initiative_id = initiative_uuid;
$$;

-- Create trigger to update updated_at column
CREATE TRIGGER update_initiatives_updated_at
BEFORE UPDATE ON public.initiatives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_votes_updated_at
BEFORE UPDATE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();