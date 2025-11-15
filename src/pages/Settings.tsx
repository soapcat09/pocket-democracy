import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setTwoFAEnabled(profileData.twofa_sms_enabled || false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleToggle2FA = async (checked: boolean) => {
    if (checked) {
      // Activare 2FA - generează și afișează cod în consolă
      const code = generateVerificationCode();
      setGeneratedCode(code);
      setShowVerificationInput(true);
      console.log("🔐 COD VERIFICARE 2FA (MOD DEZVOLTARE):", code);
      toast.info("Verifică consola pentru codul de verificare");
    } else {
      // Dezactivare 2FA
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ twofa_sms_enabled: false })
          .eq("user_id", user.id);

        if (error) throw error;

        setTwoFAEnabled(false);
        toast.success("2FA dezactivat cu succes");
      } catch (error: any) {
        toast.error("Eroare la dezactivarea 2FA");
      }
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode === generatedCode) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ twofa_sms_enabled: true })
          .eq("user_id", user.id);

        if (error) throw error;

        setTwoFAEnabled(true);
        setShowVerificationInput(false);
        setVerificationCode("");
        toast.success("2FA activat cu succes!");
      } catch (error: any) {
        toast.error("Eroare la activarea 2FA");
      }
    } else {
      toast.error("Cod incorect");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Setări</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Înapoi
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informații Cont</CardTitle>
            <CardDescription>Detaliile contului tău</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            {profile && (
              <>
                <div>
                  <Label>Nume Complet</Label>
                  <p className="text-sm text-muted-foreground">{profile.full_name}</p>
                </div>
                <div>
                  <Label>Telefon</Label>
                  <p className="text-sm text-muted-foreground">{profile.phone_number}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autentificare în Doi Pași (2FA)</CardTitle>
            <CardDescription>
              Adaugă un nivel suplimentar de securitate contului tău
              <br />
              <span className="text-xs text-yellow-600">
                Mod Dezvoltare: Codurile vor apărea în consolă
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activează 2FA prin SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Primește coduri de verificare la fiecare autentificare
                </p>
              </div>
              <Switch
                checked={twoFAEnabled}
                onCheckedChange={handleToggle2FA}
              />
            </div>

            {showVerificationInput && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Cod de Verificare</Label>
                  <p className="text-xs text-muted-foreground">
                    Verifică consola pentru cod (F12 → Console)
                  </p>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleVerifyCode} className="flex-1">
                    Verifică Cod
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowVerificationInput(false);
                      setVerificationCode("");
                    }}
                  >
                    Anulează
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Cont</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth");
              }}
            >
              Deconectare
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
