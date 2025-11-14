import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Mail, Smartphone, ArrowLeft } from "lucide-react";

const Setup2FA = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"choose" | "verify">("choose");
  const [method, setMethod] = useState<"email" | "phone">("email");

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const handleEnableEmail2FA = async () => {
    setLoading(true);
    setMethod("email");
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.email) {
        toast.error("Nu s-a putut găsi adresa de email");
        setLoading(false);
        return;
      }

      // Supabase doesn't have a direct "enable email 2FA" - we'll use MFA enrollment
      const { error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });

      if (error) {
        toast.error("Eroare la activarea 2FA: " + error.message);
      } else {
        toast.success("Am trimis un cod de verificare pe email!");
        setStep("verify");
      }
    } catch (error) {
      toast.error("A apărut o eroare neașteptată");
    } finally {
      setLoading(false);
    }
  };

  const handleEnablePhone2FA = async () => {
    if (!phoneNumber) {
      toast.error("Te rugăm să introduci numărul de telefon");
      return;
    }

    setLoading(true);
    setMethod("phone");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) {
        toast.error("Eroare la trimiterea codului SMS: " + error.message);
      } else {
        toast.success("Am trimis un cod de verificare pe telefon!");
        setStep("verify");
      }
    } catch (error) {
      toast.error("A apărut o eroare neașteptată");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Te rugăm să introduci un cod valid de 6 cifre");
      return;
    }

    setLoading(true);

    try {
      if (method === "phone") {
        const { error } = await supabase.auth.verifyOtp({
          phone: phoneNumber,
          token: verificationCode,
          type: 'sms',
        });

        if (error) {
          toast.error("Cod invalid: " + error.message);
        } else {
          toast.success("2FA activat cu succes prin telefon!");
          navigate("/");
        }
      } else {
        // For email/TOTP method
        const { data: { user } } = await supabase.auth.getUser();
        const factors = await supabase.auth.mfa.listFactors();
        
        if (factors.data && factors.data.totp && factors.data.totp.length > 0) {
          const factorId = factors.data.totp[0].id;
          
          const { error } = await supabase.auth.mfa.challengeAndVerify({
            factorId: factorId,
            code: verificationCode,
          });

          if (error) {
            toast.error("Cod invalid: " + error.message);
          } else {
            toast.success("2FA activat cu succes prin email!");
            navigate("/");
          }
        } else {
          toast.error("Nu s-a putut găsi factorul 2FA");
        }
      }
    } catch (error) {
      toast.error("A apărut o eroare la verificare");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  if (step === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("choose")}
              className="w-fit mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi
            </Button>
            <CardTitle className="text-2xl font-bold text-center">
              Verificare Cod
            </CardTitle>
            <CardDescription className="text-center">
              Introdu codul de 6 cifre trimis pe {method === "email" ? "email" : "telefon"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Cod de verificare</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Se verifică..." : "Verifică Codul"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Autentificare cu Doi Factori (2FA)
          </CardTitle>
          <CardDescription className="text-center">
            Adaugă un nivel suplimentar de securitate contului tău
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Smartphone className="mr-2 h-4 w-4" />
                Telefon
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4 mt-4">
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Vei primi un cod de verificare pe email de fiecare dată când te autentifici.
                </p>
              </div>
              <Button 
                onClick={handleEnableEmail2FA} 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Se activează..." : "Activează 2FA prin Email"}
              </Button>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone2fa">Număr de telefon</Label>
                <Input
                  id="phone2fa"
                  type="tel"
                  placeholder="+40 sau 07xx xxx xxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Vei primi un cod de verificare prin SMS de fiecare dată când te autentifici.
                </p>
              </div>
              <Button 
                onClick={handleEnablePhone2FA} 
                className="w-full"
                disabled={loading || !phoneNumber}
              >
                {loading ? "Se activează..." : "Activează 2FA prin SMS"}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={handleSkip}
              disabled={loading}
            >
              Configurez mai târziu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup2FA;