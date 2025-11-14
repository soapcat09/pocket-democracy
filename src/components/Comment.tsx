import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
    parent_comment_id: string | null;
  };
  initiativeId: string;
  onReplyAdded: () => void;
  level?: number;
}

export const Comment = ({ comment, initiativeId, onReplyAdded, level = 0 }: CommentProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  // Fetch vote counts
  const { data: voteCounts, refetch: refetchVotes } = useQuery({
    queryKey: ['commentVotes', comment.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_comment_vote_counts', { comment_uuid: comment.id });
      if (error) throw error;
      return data?.[0] || { upvotes: 0, downvotes: 0 };
    }
  });

  // Fetch user's vote
  const { data: existingVote } = useQuery({
    queryKey: ['userCommentVote', comment.id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('comment_votes')
        .select('vote_type')
        .eq('comment_id', comment.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) setUserVote(data.vote_type as "up" | "down");
      return data;
    }
  });

  // Fetch replies
  const { data: replies } = useQuery({
    queryKey: ['commentReplies', comment.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('initiative_comments')
        .select('*')
        .eq('parent_comment_id', comment.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const handleVote = async (voteType: "up" | "down") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be authenticated to vote");
      return;
    }

    try {
      const { data: existing } = await supabase
        .from('comment_votes')
        .select('id, vote_type')
        .eq('comment_id', comment.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        if (existing.vote_type === voteType) {
          // Remove vote if clicking same button
          await supabase.from('comment_votes').delete().eq('id', existing.id);
          setUserVote(null);
        } else {
          // Update vote
          await supabase
            .from('comment_votes')
            .update({ vote_type: voteType })
            .eq('id', existing.id);
          setUserVote(voteType);
        }
      } else {
        // Insert new vote
        await supabase.from('comment_votes').insert({
          comment_id: comment.id,
          user_id: user.id,
          vote_type: voteType
        });
        setUserVote(voteType);
      }

      refetchVotes();
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("An error occurred while voting");
    }
  };

  const handleReply = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be authenticated to reply");
      return;
    }

    if (!replyContent.trim()) {
      toast.error("Please write a reply");
      return;
    }

    try {
      const { error } = await supabase.from('initiative_comments').insert({
        initiative_id: initiativeId,
        user_id: user.id,
        content: replyContent.trim(),
        parent_comment_id: comment.id
      });

      if (error) throw error;

      toast.success("Reply added successfully!");
      setReplyContent("");
      setShowReplyForm(false);
      onReplyAdded();
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("An error occurred while adding the reply");
    }
  };

  const score = (voteCounts?.upvotes || 0) - (voteCounts?.downvotes || 0);
  const marginLeft = level > 0 ? `${level * 2}rem` : "0";

  return (
    <div style={{ marginLeft }}>
      <Card className="p-4 mb-3 bg-card">
        <div className="flex gap-3">
          {/* Vote buttons */}
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              className={`h-8 w-8 p-0 ${userVote === "up" ? "text-primary" : "text-muted-foreground"}`}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className={`text-sm font-semibold ${
              score > 0 ? "text-primary" : score < 0 ? "text-destructive" : "text-muted-foreground"
            }`}>
              {score}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              className={`h-8 w-8 p-0 ${userVote === "down" ? "text-destructive" : "text-muted-foreground"}`}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Comment content */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              {new Date(comment.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-foreground mb-3 whitespace-pre-wrap">{comment.content}</p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="gap-2 h-8 text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              Reply
            </Button>

            {showReplyForm && (
              <div className="mt-3 space-y-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button onClick={handleReply} size="sm">
                    Send reply
                  </Button>
                  <Button
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyContent("");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Render replies */}
      {replies && replies.length > 0 && (
        <div>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              initiativeId={initiativeId}
              onReplyAdded={onReplyAdded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
