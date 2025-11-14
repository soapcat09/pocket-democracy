import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, CheckCircle2, XCircle } from "lucide-react";

const VerifyId = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Fișierul este prea mare. Mărimea maximă este 5MB.");
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
        toast.error("Formatul fișierului nu este acceptat. Folosește JPG, PNG sau WEBP.");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Te rugăm să încarci o poză cu buletinul");
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sesiune expirată. Te rugăm să te autentifici din nou.");
        navigate("/auth");
        return;
      }

      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('birth_date, county, city')
        .eq('user_id', session.user.id)
        .single();

      if (profileError || !profile) {
        toast.error("Nu am putut găsi datele profilului tău.");
        setLoading(false);
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('birthDate', profile.birth_date);
      formData.append('county', profile.county);
      formData.append('city', profile.city);

      // Call edge function
      const { data, error } = await supabase.functions.invoke('verify-id-document', {
        body: formData,
      });

      if (error) {
        console.error('Error calling function:', error);
        toast.error("Eroare la verificarea documentului: " + error.message);
        setLoading(false);
        return;
      }

      if (data.success) {
        if (data.verified) {
          toast.success(data.message);
          navigate("/");
        } else {
          toast.warning(data.message);
          navigate("/");
        }
      } else {
        toast.error(data.error || "Eroare la verificarea documentului");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verificare Buletin
          </CardTitle>
          <CardDescription className="text-center">
            Încarcă o poză cu buletinul tău pentru verificare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document">Poză Buletin</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Input
                  id="document"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="document" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click pentru a schimba imaginea
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click pentru a încărca imaginea
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG sau WEBP (max. 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Asigură-te că datele din buletin sunt clare și lizibile</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Imaginea trebuie să conțină toate informațiile personale</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Nu folosi imagini blurate sau incomplete</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
                disabled={loading}
              >
                Sari peste
              </Button>
              <Button type="submit" className="flex-1" disabled={loading || !file}>
                {loading ? "Se verifică..." : "Verifică Buletinul"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyId;