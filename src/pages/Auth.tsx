import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { romanianTowns } from "@/lib/towns";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
  phoneNumber: z.string().min(10, { message: "Numărul de telefon trebuie să aibă cel puțin 10 cifre" }).regex(/^(\+4|0)[0-9]{9}$/, { message: "Număr de telefon invalid pentru România" }),
  birthDate: z.date({
    required_error: "Data nașterii este obligatorie",
  }).refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    return actualAge >= 18;
  }, { message: "Trebuie să ai cel puțin 18 ani" }),
  county: z.string().min(1, { message: "Județul este obligatoriu" }),
  city: z.string().min(1, { message: "Localitatea este obligatorie" }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  // Get unique counties
  const counties = Array.from(new Set(romanianTowns.map(town => town.county))).sort();
  
  // Get cities for selected county
  const cities = romanianTowns
    .filter(town => town.county === county)
    .map(town => town.name)
    .sort();

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

    try {
      if (isLogin) {
        // Validate login input
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: validation.data.email,
          password: validation.data.password,
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
        // Validate signup input
        const validation = signupSchema.safeParse({ 
          email, 
          password,
          phoneNumber,
          birthDate,
          county,
          city 
        });
        
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const redirectUrl = `${window.location.origin}/`;
        const { data, error } = await supabase.auth.signUp({
          email: validation.data.email,
          password: validation.data.password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Acest email este deja înregistrat");
          } else {
            toast.error(error.message);
          }
        } else if (data.user) {
          // Create profile with additional information
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: data.user.id,
              birth_date: format(validation.data.birthDate, 'yyyy-MM-dd'),
              county: validation.data.county,
              city: validation.data.city,
              phone_number: validation.data.phoneNumber,
            });

          if (profileError) {
            toast.error("Eroare la crearea profilului: " + profileError.message);
          } else {
            toast.success("Cont creat cu succes! Redirecționăm către verificarea buletinului...");
            // Redirect to ID verification after short delay
            setTimeout(() => {
              navigate("/verify-id");
            }, 1500);
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
                  <Label htmlFor="phone">Număr de telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+40 sau 07xx xxx xxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
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
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează județul" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((countyName) => (
                        <SelectItem key={countyName} value={countyName}>
                          {countyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Localitatea</Label>
                  <Select value={city} onValueChange={setCity} disabled={!county}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează localitatea" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((cityName) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
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
