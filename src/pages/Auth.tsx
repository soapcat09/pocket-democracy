import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { format } from "date-fns";
import { validateCnpCheckDigit, getCountyFromCnp } from "@/lib/cnp-counties";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }),
  confirmPassword: z.string().min(6, { message: "Confirmarea parolei este necesară" }),
  fullName: z.string().trim().min(3, { message: "Numele complet trebuie să aibă cel puțin 3 caractere" }),
  phoneNumber: z.string().min(10, { message: "Numărul de telefon trebuie să aibă cel puțin 10 cifre" }).regex(/^(\+4|0)[0-9]{9}$/, { message: "Număr de telefon invalid pentru România" }),
  cnp: z.string().length(13, { message: "CNP-ul trebuie să aibă exact 13 cifre" })
    .regex(/^[0-9]{13}$/, { message: "CNP-ul trebuie să conțină doar cifre" })
    .refine((cnp) => {
      // Validate check digit
      return validateCnpCheckDigit(cnp);
    }, { message: "CNP invalid - cifra de control nu este corectă" })
    .refine((cnp) => {
      // Validate county code
      const county = getCountyFromCnp(cnp);
      return county !== null;
    }, { message: "CNP invalid - cod de județ necunoscut" })
    .refine((cnp) => {
      // Extract birth date from CNP (digits 2-7: YYMMDD)
      const yy = parseInt(cnp.substring(1, 3));
      const mm = parseInt(cnp.substring(3, 5));
      const dd = parseInt(cnp.substring(5, 7));
      
      // Validate month and day
      if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
        return false;
      }
      
      // Determine century from first digit
      const firstDigit = parseInt(cnp[0]);
      let fullYear: number;
      if (firstDigit === 1 || firstDigit === 2) {
        fullYear = 1900 + yy;
      } else if (firstDigit === 5 || firstDigit === 6) {
        fullYear = 2000 + yy;
      } else {
        return false;
      }
      
      // Calculate age
      const birthDate = new Date(fullYear, mm - 1, dd);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      
      return actualAge >= 18;
    }, { message: "Trebuie să ai cel puțin 18 ani conform CNP-ului" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parolele nu se potrivesc",
  path: ["confirmPassword"],
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnp, setCnp] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [show2FAInput, setShow2FAInput] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [generated2FACode, setGenerated2FACode] = useState("");
  const [pendingAuthData, setPendingAuthData] = useState<any>(null);

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

        const { data, error } = await supabase.auth.signInWithPassword({
          email: validation.data.email,
          password: validation.data.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email sau parolă greșită");
          } else {
            toast.error(error.message);
          }
        } else if (data.user) {
          // Verifică dacă utilizatorul are 2FA activat
          const { data: profileData } = await supabase
            .from("profiles")
            .select("twofa_sms_enabled")
            .eq("user_id", data.user.id)
            .single();

          if (profileData?.twofa_sms_enabled) {
            // Generează cod 2FA
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGenerated2FACode(code);
            setPendingAuthData(data);
            setShow2FAInput(true);
            console.log("🔐 COD 2FA (MOD DEZVOLTARE):", code);
            toast.info("Verifică consola pentru codul 2FA");
            
            // Deconectează temporar pentru a cere codul 2FA
            await supabase.auth.signOut();
          } else {
            toast.success("Autentificare reușită!");
          }
        }
      } else {
        // Validate signup input
        const validation = signupSchema.safeParse({ 
          email, 
          password, 
          confirmPassword,
          fullName,
          phoneNumber, 
          cnp
        });
        
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        // Extract birth date from CNP
        const cnpValue = validation.data.cnp;
        const yy = parseInt(cnpValue.substring(1, 3));
        const mm = parseInt(cnpValue.substring(3, 5));
        const dd = parseInt(cnpValue.substring(5, 7));
        const firstDigit = parseInt(cnpValue[0]);
        
        let fullYear: number;
        if (firstDigit === 1 || firstDigit === 2) {
          fullYear = 1900 + yy;
        } else if (firstDigit === 5 || firstDigit === 6) {
          fullYear = 2000 + yy;
        } else {
          fullYear = 1900 + yy;
        }
        
        const birthDate = new Date(fullYear, mm - 1, dd);
        
        // Extract county from CNP
        const county = getCountyFromCnp(cnpValue);

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
              full_name: validation.data.fullName,
              birth_date: format(birthDate, 'yyyy-MM-dd'),
              county: county || "Necunoscut",
              city: "", // City is not extracted from CNP
              phone_number: validation.data.phoneNumber,
              cnp: validation.data.cnp,
            });

          if (profileError) {
            toast.error("Eroare la crearea profilului: " + profileError.message);
          } else {
            toast.success("Cont creat cu succes!");
          }
        }
      }
    } catch (error) {
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handle2FAVerification = async () => {
    if (twoFACode === generated2FACode) {
      setLoading(true);
      try {
        // Re-autentifică utilizatorul
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        toast.success("Autentificare reușită cu 2FA!");
        setShow2FAInput(false);
        setTwoFACode("");
      } catch (error: any) {
        toast.error("Eroare la autentificare: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Cod 2FA incorect");
    }
  };

  if (show2FAInput) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Verificare 2FA
            </CardTitle>
            <CardDescription className="text-center">
              Introdu codul de verificare din consolă
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twoFACode">Cod 2FA</Label>
                <p className="text-xs text-muted-foreground">
                  Verifică consola browserului (F12 → Console)
                </p>
                <Input
                  id="twoFACode"
                  type="text"
                  placeholder="000000"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handle2FAVerification} className="flex-1" disabled={loading}>
                  {loading ? "Se verifică..." : "Verifică"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShow2FAInput(false);
                    setTwoFACode("");
                    setGenerated2FACode("");
                  }}
                >
                  Anulează
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmă Parola</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nume Complet</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Ex: Ion Popescu"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

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
                  <Label htmlFor="cnp">CNP (Cod Numeric Personal)</Label>
                  <Input
                    id="cnp"
                    type="text"
                    placeholder="1234567890123"
                    maxLength={13}
                    value={cnp}
                    onChange={(e) => setCnp(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Județul va fi extras automat din CNP (cifrele 8-9)
                  </p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Se procesează..." : isLogin ? "Autentificare" : "Creare cont"}
            </Button>

            {isLogin && (
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-muted-foreground hover:text-primary"
                  onClick={() => navigate("/forgot-password")}
                >
                  Ai uitat parola?
                </Button>
              </div>
            )}
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
