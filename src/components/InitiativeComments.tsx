import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./Comment";

interface InitiativeCommentsProps {
  initiativeId: string;
}

export const InitiativeComments = ({ initiativeId }: InitiativeCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  // Fetch top-level comments (no parent)
  const { data: comments, refetch } = useQuery({
    queryKey: ['initiativeComments', initiativeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('initiative_comments')
        .select('*')
        .eq('initiative_id', initiativeId)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!initiativeId
  });

  const handleSubmitComment = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be authenticated to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      const { error } = await supabase.from('initiative_comments').insert({
        initiative_id: initiativeId,
        user_id: user.id,
        content: newComment.trim()
      });

      if (error) throw error;

      toast.success("Comment added successfully!");
      setNewComment("");
      refetch();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("An error occurred while adding the comment");
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        Discussions ({comments?.length || 0})
      </h2>

      {/* Add new comment */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Add a comment</h3>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="min-h-[120px] mb-3"
        />
        <Button onClick={handleSubmitComment}>
          Post comment
        </Button>
      </Card>

      {/* Display comments */}
      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              initiativeId={initiativeId}
              onReplyAdded={refetch}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No comments yet. Be the first to comment!</p>
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};
