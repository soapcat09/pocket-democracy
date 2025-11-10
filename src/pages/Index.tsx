import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Shield, MapPin, Loader2 } from "lucide-react";
import { findClosestTown } from "@/lib/towns";
import { useTown } from "@/contexts/TownContext";
import { toast } from "sonner";

const Index = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState(false);
  const navigate = useNavigate();
  const { selectedTown, setSelectedTown } = useTown();

  useEffect(() => {
    // Auto-detect location on component mount if no town is selected
    if (!selectedTown) {
      detectLocation();
    }
  }, []);

  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectionError(false);
    
    try {
      // Using ipapi.co for IP geolocation (free tier: 1000 requests/day)
      const response = await fetch('https://ipapi.co/json/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      // Check if in Romania
      if (data.country_code !== 'RO') {
        toast.error("Locație nevalidă", {
          description: "Time2Vote este disponibil doar pentru orașele din România."
        });
        setDetectionError(true);
        setIsDetecting(false);
        return;
      }
      
      // Find closest Romanian town
      const town = findClosestTown(data.latitude, data.longitude);
      
      if (town) {
        setSelectedTown(town);
        toast.success("Locație detectată!", {
          description: `Bine ai venit în ${town.name}, ${town.county}!`
        });
        setTimeout(() => navigate("/initiatives"), 1500);
      } else {
        toast.error("Oraș neidentificat", {
          description: "Nu am putut identifica orașul tău. Te rugăm să încerci din nou."
        });
        setDetectionError(true);
      }
    } catch (error) {
      console.error('Location detection error:', error);
      toast.error("Eroare de detectare", {
        description: "Nu am putut detecta locația ta. Verifică conexiunea la internet."
      });
      setDetectionError(true);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

            {/* Location Detection Card */}
            <Card className="max-w-md mx-auto bg-gradient-to-b from-card to-muted/20 mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                  Verificare Locație
                </CardTitle>
                <CardDescription className="text-center">
                  {isDetecting 
                    ? "Detectăm locația ta pentru a-ți afișa inițiativele locale..."
                    : detectionError
                    ? "Nu am putut detecta locația ta. Încearcă din nou."
                    : selectedTown 
                    ? `Locație confirmată: ${selectedTown.name}, ${selectedTown.county}`
                    : "Te redirectăm către inițiativele orașului tău..."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isDetecting ? (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span>Se detectează...</span>
                  </div>
                ) : detectionError ? (
                  <Button onClick={detectLocation} className="w-full" size="lg">
                    <MapPin className="h-4 w-4 mr-2" />
                    Reîncearcă Detectarea
                  </Button>
                ) : selectedTown ? (
                  <Button onClick={() => navigate("/initiatives")} className="w-full" size="lg">
                    Vezi Inițiativele
                  </Button>
                ) : null}
                
                <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  Folosim adresa ta IP pentru a determina orașul în care te afli și a-ți afișa inițiativele locale relevante. Datele tale de locație nu sunt stocate.
                </p>
              </CardContent>
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
