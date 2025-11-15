import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2, LogOut, Settings } from "lucide-react";
import { useTown } from "@/contexts/TownContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { AdminStats } from "@/components/AdminStats";
import { AdminCreateInitiative } from "@/components/AdminCreateInitiative";
import { useQuery } from "@tanstack/react-query";

const categories = ["All", "infrastructură", "mediu", "educație", "sănătate", "sport", "cultură", "social", "altele"];

const Initiatives = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { selectedTown, setSelectedTown } = useTown();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isAdmin, loading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!selectedTown) {
      toast.error("Please select a town first");
      navigate("/");
    }
  }, [selectedTown, navigate]);

  const { data: initiatives = [], refetch } = useQuery({
    queryKey: ['initiatives', selectedTown?.county],
    queryFn: async () => {
      if (!selectedTown) return [];
      
      const { data, error } = await supabase
        .from('initiatives')
        .select(`
          *,
          counties!inner (
            name,
            cnp_code
          )
        `)
        .eq('status', 'active')
        .eq('counties.name', selectedTown.county)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedTown
  });

  // Realtime subscription for new initiatives
  useEffect(() => {
    const channel = supabase
      .channel('initiatives-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'initiatives'
        },
        () => refetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const filteredInitiatives = selectedCategory === "All" 
    ? initiatives 
    : initiatives.filter(i => i.category === selectedCategory);

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
    <div className="min-h-screen" style={{ backgroundColor: '#EBE8E4' }}>
      {/* Header */}
      <header className="border-b border-border" style={{ backgroundColor: '#5150A6' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5" style={{ color: '#FFAE00' }} />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground">{selectedTown.name}</h1>
                <p className="text-xs text-foreground">{selectedTown.county}</p>
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

      {/* Admin Stats - shown only for admins */}
      {isAdmin && (
        <div className="container mx-auto px-4 py-6">
          <AdminStats />
        </div>
      )}

      {/* Category Filter */}
      <div className="border-b border-gray-200" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
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
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Active Initiatives</h2>
          <p className="text-gray-600">
            {filteredInitiatives.length} initiatives available for voting
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInitiatives.map((initiative) => {
            const daysLeft = getDaysLeft(initiative.end_date);

            return (
              <Link key={initiative.id} to={`/initiative/${initiative.id}`}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col" style={{ backgroundColor: '#D3D5ED' }}>
                  <div className="flex flex-col flex-1 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {initiative.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          {daysLeft}d rămase
                        </div>
                      </div>
                      <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem] text-gray-900">
                        {initiative.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm line-clamp-3 min-h-[4.5rem] text-gray-700">
                      {initiative.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="h-4 w-4" />
                      {initiative.location}, {initiative.counties?.name}
                    </div>

                    {/* CTA */}
                    <Button className="w-full mt-auto bg-pink-500 hover:bg-pink-600 text-white" variant="default">
                      View & Vote
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Admin Create Initiative Button - shown only for admins */}
      {isAdmin && <AdminCreateInitiative />}
    </div>
  );
};

export default Initiatives;
