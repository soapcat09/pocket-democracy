import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2, LogOut } from "lucide-react";
import { useTown } from "@/contexts/TownContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const categories = ["All", "Infrastructure", "Environment", "Education", "Healthcare", "Safety"];

const mockInitiatives = [
  {
    id: 1,
    title: "New Community Park Development",
    description: "Proposal to develop a 5-acre community park with playgrounds, walking trails, and green spaces in the downtown area.",
    category: "Infrastructure",
    location: "Downtown District",
    votesFor: 2847,
    votesAgainst: 432,
    daysLeft: 12,
    status: "active"
  },
  {
    id: 2,
    title: "Solar Panel Installation Program",
    description: "Initiative to install solar panels on all public buildings to reduce carbon emissions by 40% over the next 5 years.",
    category: "Environment",
    location: "Citywide",
    votesFor: 4521,
    votesAgainst: 1203,
    daysLeft: 8,
    status: "active"
  },
  {
    id: 3,
    title: "Expand After-School Programs",
    description: "Funding proposal to expand after-school programs in 15 elementary schools, providing free tutoring and activities.",
    category: "Education",
    location: "School District 5",
    votesFor: 3156,
    votesAgainst: 892,
    daysLeft: 15,
    status: "active"
  },
  {
    id: 4,
    title: "Bike Lane Network Expansion",
    description: "Add 25 miles of protected bike lanes connecting residential areas to downtown and commercial districts.",
    category: "Infrastructure",
    location: "Multiple Districts",
    votesFor: 1923,
    votesAgainst: 1456,
    daysLeft: 5,
    status: "active"
  },
  {
    id: 5,
    title: "Mobile Health Clinic Initiative",
    description: "Launch three mobile health clinics to provide free health screenings and basic care in underserved neighborhoods.",
    category: "Healthcare",
    location: "East Side",
    votesFor: 5234,
    votesAgainst: 678,
    daysLeft: 20,
    status: "active"
  },
  {
    id: 6,
    title: "Street Lighting Upgrade",
    description: "Replace old street lights with energy-efficient LED lights in high-crime areas to improve safety.",
    category: "Safety",
    location: "North District",
    votesFor: 2891,
    votesAgainst: 543,
    daysLeft: 10,
    status: "active"
  }
];

const Initiatives = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { selectedTown, setSelectedTown } = useTown();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedTown) {
      toast.error("Please select a town first");
      navigate("/");
    }
  }, [selectedTown, navigate]);

  const filteredInitiatives = selectedCategory === "All" 
    ? mockInitiatives 
    : mockInitiatives.filter(i => i.category === selectedCategory);

  const getVotePercentage = (votesFor: number, votesAgainst: number) => {
    const total = votesFor + votesAgainst;
    return total > 0 ? Math.round((votesFor / total) * 100) : 0;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Deconectat cu succes");
    navigate("/auth");
  };

  if (!selectedTown) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground">{selectedTown.name}</h1>
                <p className="text-xs text-muted-foreground">{selectedTown.county}</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Deconectare
            </Button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Initiatives Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Inițiative Active</h2>
          <p className="text-muted-foreground">
            {filteredInitiatives.length} inițiative disponibile pentru votare
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInitiatives.map((initiative) => {
            const votePercentage = getVotePercentage(initiative.votesFor, initiative.votesAgainst);
            const totalVotes = initiative.votesFor + initiative.votesAgainst;

            return (
              <Link key={initiative.id} to={`/initiative/${initiative.id}`}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-b from-card to-card/50">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {initiative.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {initiative.daysLeft}d left
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-foreground leading-tight">
                        {initiative.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {initiative.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {initiative.location}
                    </div>

                    {/* Vote Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{totalVotes.toLocaleString()}</span>
                          <span className="text-muted-foreground">votes</span>
                        </div>
                        <span className="font-bold text-lg" style={{ color: votePercentage >= 50 ? 'hsl(var(--vote-yes))' : 'hsl(var(--vote-no))' }}>
                          {votePercentage}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-vote-yes transition-all"
                          style={{ width: `${votePercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <Button className="w-full" variant="default">
                      Vezi & Votează
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Initiatives;
