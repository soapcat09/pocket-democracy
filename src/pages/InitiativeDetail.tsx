import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Users, ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { InitiativeComments } from "@/components/InitiativeComments";

const InitiativeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);

  // Fetch initiative details
  const { data: initiative, isLoading } = useQuery({
    queryKey: ['initiative', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('initiatives')
        .select(`
          *,
          counties (
            name,
            cnp_code
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Fetch vote counts
  const { data: voteCounts, refetch: refetchVoteCounts } = useQuery({
    queryKey: ['voteCounts', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_initiative_vote_counts', { initiative_uuid: id });

      if (error) throw error;
      return data?.[0] || { votes_for: 0, votes_against: 0, votes_abstain: 0 };
    },
    enabled: !!id
  });

  // Check if user has voted
  const { data: existingVote, refetch: refetchVote } = useQuery({
    queryKey: ['userVote', id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('initiative_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  useEffect(() => {
    if (existingVote) {
      setUserVote(existingVote.vote_type as "for" | "against" | "abstain");
    }
  }, [existingVote]);

  const handleVote = async (voteType: "for" | "against" | "abstain") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Trebuie să fii autentificat pentru a vota");
      navigate("/auth");
      return;
    }

    try {
      // Check if user already voted
      const { data: existing } = await supabase
        .from('votes')
        .select('id')
        .eq('initiative_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Update existing vote
        const { error } = await supabase
          .from('votes')
          .update({ vote_type: voteType })
          .eq('id', existing.id);

        if (error) throw error;
        toast.success("Vot actualizat cu succes!");
      } else {
        // Insert new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            initiative_id: id,
            user_id: user.id,
            vote_type: voteType
          });

        if (error) throw error;
        toast.success("Vot înregistrat cu succes!");
      }

      setUserVote(voteType);
      refetchVote();
      refetchVoteCounts();
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("A apărut o eroare la votare");
    }
  };

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (!initiative) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Inițiativa nu a fost găsită</p>
          <Button onClick={() => navigate("/initiatives")} className="mt-4">
            Înapoi la inițiative
          </Button>
        </div>
      </div>
    );
  }

  const daysLeft = getDaysLeft(initiative.end_date);
  const totalVotes = (voteCounts?.votes_for || 0) + (voteCounts?.votes_against || 0) + (voteCounts?.votes_abstain || 0);
  const votePercentage = totalVotes > 0 ? Math.round(((voteCounts?.votes_for || 0) / totalVotes) * 100) : 0;
  const hasVoted = !!userVote;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/initiatives" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Înapoi la Inițiative</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title & Category */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 flex-wrap">
            <Badge variant="secondary" className="capitalize">{initiative.category}</Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {daysLeft} zile rămase
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">{initiative.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{initiative.location}, {initiative.counties?.name}</span>
          </div>
        </div>

        {/* Vote Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-muted/20">
          <div className="space-y-6">
            {/* Vote Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold text-foreground">{totalVotes.toLocaleString()}</span>
                  <span className="text-muted-foreground">voturi</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{votePercentage}%</div>
                  <div className="text-sm text-muted-foreground">în favoare</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={votePercentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    <ThumbsUp className="inline h-3 w-3 mr-1" />
                    {(voteCounts?.votes_for || 0).toLocaleString()} pentru
                  </span>
                  <span className="text-muted-foreground">
                    <ThumbsDown className="inline h-3 w-3 mr-1" />
                    {(voteCounts?.votes_against || 0).toLocaleString()} împotrivă
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Voting Actions */}
            {!hasVoted ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Votează</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleVote("for")}
                    className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Pentru
                  </Button>
                  <Button
                    onClick={() => handleVote("against")}
                    variant="destructive"
                    className="gap-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Împotrivă
                  </Button>
                  <Button
                    onClick={() => handleVote("abstain")}
                    variant="outline"
                    className="gap-2"
                  >
                    Abținere
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">
                    Ai votat: {userVote === "for" ? "Pentru" : userVote === "against" ? "Împotrivă" : "Abținere"}
                  </p>
                  <p className="text-sm text-muted-foreground">Mulțumim pentru participare!</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Overview Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Descriere</h2>
          <Card className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {initiative.description}
            </p>
          </Card>
        </section>

        {/* Initiative Information */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Informații Inițiativă</h2>
          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Categorie</p>
                <p className="font-semibold text-foreground capitalize">{initiative.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Locație</p>
                <p className="font-semibold text-foreground">{initiative.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Județ</p>
                <p className="font-semibold text-foreground">{initiative.counties?.name}</p>
              </div>
              {initiative.budget && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Buget estimat</p>
                  <p className="font-semibold text-foreground">{initiative.budget.toLocaleString()} RON</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="default" className="capitalize">{initiative.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data început</p>
                <p className="font-semibold text-foreground">
                  {new Date(initiative.start_date).toLocaleDateString('ro-RO')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data sfârșit</p>
                <p className="font-semibold text-foreground">
                  {new Date(initiative.end_date).toLocaleDateString('ro-RO')}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Comments Section */}
        <InitiativeComments initiativeId={id!} />
      </main>
    </div>
  );
};

export default InitiativeDetail;
