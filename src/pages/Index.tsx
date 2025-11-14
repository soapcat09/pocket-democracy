import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Vote, Shield, MapPin, ArrowRight, Building2 } from "lucide-react";
import { findTownByCode } from "@/lib/towns";
import { useTown } from "@/contexts/TownContext";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const townCodeSchema = z.string()
  .trim()
  .min(1, "Please enter a town code")
  .max(10, "Town code is too long")
  .regex(/^[A-Z]{3}\d{2}$/i, "Invalid code format. Use format: ABC01");

const Index = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { selectedTown, setSelectedTown } = useTown();

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (selectedTown && user) {
      navigate("/initiatives");
    }
  }, [selectedTown, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate input
    const validation = townCodeSchema.safeParse(code);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    // Find town
    const town = findTownByCode(code);
    if (!town) {
      setError("Town code not found. Please check and try again.");
      toast.error("Invalid town code", {
        description: "The code you entered doesn't match any Romanian town."
      });
      return;
    }

    // Set town and navigate
    setSelectedTown(town);
    toast.success(`Welcome to ${town.name}!`, {
      description: `Viewing initiatives for ${town.county} county`
    });
    navigate("/initiatives");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Deconectat cu succes");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="absolute top-4 right-4 z-10"
      >
        Deconectare
      </Button>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Vote className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Time2Vote</h1>
            </div>
            <Badge variant="secondary" className="mb-4">
              Democrație Digitală pentru România
            </Badge>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Votează pe proiectele locale și ajută la dezvoltarea comunității tale
            </p>

            {/* Code Entry Card */}
            <Card className="p-8 max-w-md mx-auto bg-gradient-to-b from-card to-muted/20 mt-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Intră în orașul tău</h2>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Introdu codul orașului tău pentru a accesa inițiativele locale
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="townCode" className="text-base">
                    Cod Oraș
                  </Label>
                  <Input
                    id="townCode"
                    type="text"
                    placeholder="ex: BUC01, CLJ01, TIM01"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError("");
                    }}
                    className={`text-center text-lg tracking-wider ${error ? "border-destructive" : ""}`}
                    maxLength={10}
                  />
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  <p className="text-xs text-muted-foreground text-center">
                    Format: 3 litere + 2 cifre (ABC01)
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg">
                  Accesează Inițiativele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Exemple de coduri: București (BUC01), Cluj-Napoca (CLJ01), Timișoara (TIM01), Iași (IAS01)
                  </p>
                </div>
              </form>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Orașe</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">156</div>
                <div className="text-sm text-muted-foreground">Inițiative</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">42K+</div>
                <div className="text-sm text-muted-foreground">Votanți</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              De ce Time2Vote?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Construim încredere între cetățeni și autorități prin transparență
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center space-y-4 bg-gradient-to-b from-card to-card/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Vote className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Votare în Timp Real</h3>
              <p className="text-muted-foreground">
                Votează instant pe inițiative și vezi rezultatele în timp real
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 bg-gradient-to-b from-card to-card/50">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Focus Local</h3>
              <p className="text-muted-foreground">
                Vezi doar inițiativele din orașul tău, relevante pentru comunitatea ta
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 bg-gradient-to-b from-card to-card/50">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Sigur & Transparent</h3>
              <p className="text-muted-foreground">
                Votul tău este securizat, anonim și contribuie la un proces democratic
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Time2Vote</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Time2Vote. Împuternicind comunitățile prin democrație digitală.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
