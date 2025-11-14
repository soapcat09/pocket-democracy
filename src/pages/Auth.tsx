import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { romanianTowns } from "@/lib/towns";
import { z } from "zod";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
  birthDate: z.date({
    required_error: "Data nașterii este obligatorie",
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, { message: "Trebuie să ai cel puțin 18 ani" }),
  county: z.string().min(1, { message: "Județul este obligatoriu" }),
  city: z.string().min(1, { message: "Localitatea este obligatorie" }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  // Get unique counties
  const counties = Array.from(new Set(romanianTowns.map(town => town.county))).sort();
  
  // Get cities for selected county
  const cities = county 
    ? romanianTowns.filter(town => town.county === county).sort((a, b) => a.name.localeCompare(b.name))
    : [];

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    if (isLogin) {
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setLoading(false);
        return;
      }
    } else {
      const validation = signupSchema.safeParse({ 
        email, 
        password, 
        birthDate, 
        county, 
        city 
      });
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email sau parolă greșită");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Autentificare reușită!");
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (authError) {
          if (authError.message.includes("already registered")) {
            toast.error("Acest email este deja înregistrat");
          } else {
            toast.error(authError.message);
          }
        } else if (authData.user) {
          // Create profile with additional data
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: authData.user.id,
              birth_date: birthDate!.toISOString().split('T')[0],
              county,
              city,
            });

          if (profileError) {
            toast.error("Eroare la salvarea profilului: " + profileError.message);
          } else {
            toast.success("Cont creat cu succes! Te poți autentifica acum.");
            setIsLogin(true);
          }
        }
      }
    } catch (error) {
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Autentificare" : "Creare cont"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Intră în cont pentru a accesa platformă"
              : "Creează un cont nou pentru a vota"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplu@email.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label>Data nașterii</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "dd/MM/yyyy") : <span>Selectează data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background" align="start">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">Județul</Label>
                  <Select value={county} onValueChange={(value) => {
                    setCounty(value);
                    setCity(""); // Reset city when county changes
                  }}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Selectează județul" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {counties.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Localitatea</Label>
                  <Select value={city} onValueChange={setCity} disabled={!county}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Selectează localitatea" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {cities.map((town) => (
                        <SelectItem key={town.code} value={town.name}>
                          {town.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Se procesează..." : isLogin ? "Autentificare" : "Creare cont"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? "Nu ai cont? Creează unul" : "Ai deja cont? Autentifică-te"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
