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

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password confirmation is required" }),
  fullName: z.string().trim().min(3, { message: "Full name must be at least 3 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone number must have at least 10 digits" }).regex(/^(\+4|0)[0-9]{9}$/, { message: "Invalid phone number for Romania" }),
  cnp: z.string().length(13, { message: "CNP must be exactly 13 digits" })
    .regex(/^[0-9]{13}$/, { message: "CNP must contain only digits" })
    .refine((cnp) => {
      // Validate check digit
      return validateCnpCheckDigit(cnp);
    }, { message: "Invalid CNP - check digit is incorrect" })
    .refine((cnp) => {
      // Validate county code
      const county = getCountyFromCnp(cnp);
      return county !== null;
    }, { message: "Invalid CNP - unknown county code" })
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
    }, { message: "You must be at least 18 years old according to your CNP" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
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
            toast.error("Wrong email or password");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Successfully authenticated!");
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
            toast.error("This email is already registered");
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
              county: county || "Unknown",
              city: "", // City is not extracted from CNP
              phone_number: validation.data.phoneNumber,
              cnp: validation.data.cnp,
            });

          if (profileError) {
            toast.error("Error creating profile: " + profileError.message);
          } else {
            toast.success("Account created successfully!");
          }
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Log in to access the platform"
              : "Create a new account to vote"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Ex: John Smith"
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+40 or 07xx xxx xxx"
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
                  <Label htmlFor="cnp">CNP (Personal Numeric Code)</Label>
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
                    County will be automatically extracted from CNP (digits 8-9)
                  </p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Log in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
