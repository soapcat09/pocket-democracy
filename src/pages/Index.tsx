import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vote } from "lucide-react";
import { findTownByCode } from "@/lib/towns";
import { useTown } from "@/contexts/TownContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { getTownCodeFromCnpCounty } from "@/lib/cnp-counties";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedTown } = useTown();
  const { theme } = useTheme();

  useEffect(() => {
    const initializeUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setUser(session.user);
      
      // Fetch user profile to get CNP
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('cnp')
        .eq('user_id', session.user.id)
        .single();
      
      if (error || !profile?.cnp) {
        toast.error("Nu am putut găsi CNP-ul tău în profil");
        setLoading(false);
        return;
      }
      
      // Extract county code from CNP (positions 8-9, which are indices 7-8)
      const countyCode = profile.cnp.substring(7, 9);
      
      // Get town code from county
      const townCode = getTownCodeFromCnpCounty(profile.cnp);
      
      if (!townCode) {
        toast.error("Județul tău nu are un oraș disponibil în platformă momentan");
        setLoading(false);
        return;
      }
      
      // Find town by code
      const town = findTownByCode(townCode);
      
      if (!town) {
        toast.error("Nu am putut găsi orașul corespunzător județului tău");
        setLoading(false);
        return;
      }
      
      // Set town and redirect to county-specific page
      setSelectedTown(town);
      toast.success(`Bine ai venit în județul ${town.county}!`, {
        description: `Vizualizezi inițiativele pentru ${town.name}`
      });
      
      // Redirect to initiatives page with county filter
      navigate(`/initiatives?county=${countyCode}`);
    };

    initializeUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, setSelectedTown]);

  if (loading || !user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}>
        <div className="text-center space-y-4">
          <Vote className={`h-12 w-12 mx-auto animate-pulse ${
            theme === "light" ? "text-pink-500" : "text-pink-400"
          }`} />
          <p className={theme === "light" ? "text-gray-600" : "text-slate-400"}>
            Se încarcă...
          </p>
        </div>
      </div>
    );
  }

  // This page auto-redirects, but we show a fallback just in case
  return null;
};

export default Index;
