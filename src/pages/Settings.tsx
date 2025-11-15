import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Moon, Sun, User, MessageSquare, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
    });
  }, [navigate]);

  const { data: userProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    },
    enabled: !!user,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["user-comments", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("initiative_comments")
        .select("*, initiatives(title)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
  };

  const handleUploadAvatar = async () => {
  
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden ${
      theme === "light" 
        ? "bg-gray-100" 
        : "bg-gray-900"
    }`}>
      {/* Header */}
      <header className={`border-b ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-slate-900/80 border-slate-700"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className={theme === "light" ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-slate-800"}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className={`grid w-full grid-cols-4 ${
              theme === "light"
                ? "bg-gray-200"
                : "bg-slate-800"
            }`}>
              <TabsTrigger value="account" className={`${
                theme === "light" ? "text-gray-900" : "text-slate-300"
              } data-[state=active]:bg-[#FFAE00] data-[state=active]:text-gray-900`}>
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="comments" className={`${
                theme === "light" ? "text-gray-900" : "text-slate-300"
              } data-[state=active]:bg-[#FFAE00] data-[state=active]:text-gray-900`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Comments</span>
              </TabsTrigger>
              <TabsTrigger value="theme" className={`${
                theme === "light" ? "text-gray-900" : "text-slate-300"
              } data-[state=active]:bg-[#FFAE00] data-[state=active]:text-gray-900`}>
                <Sun className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Theme</span>
              </TabsTrigger>
              <TabsTrigger value="logout" className={`${
                theme === "light" ? "text-gray-900" : "text-slate-300"
              } data-[state=active]:bg-[#FFAE00] data-[state=active]:text-gray-900`}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="mt-6">
              <Card className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "border-gray-300"
              }`} style={theme === "dark" ? { backgroundColor: "#D3D5ED" } : {}}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Account Settings</CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-600"}>
                    Edit your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* User Info */}
                  <div className="space-y-4">
                    <div>
                      <Label className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Full Name</Label>
                      <Input
                        disabled
                        value={userProfile?.full_name || ""}
                        className={theme === "light"
                          ? "mt-1 bg-gray-100 border-gray-300 text-gray-600"
                          : "mt-1 bg-gray-50 border-gray-300 text-gray-600"
                        }
                      />
                    </div>
                    <div>
                      <Label className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Email</Label>
                      <Input
                        disabled
                        value={user?.email || ""}
                        className={theme === "light"
                          ? "mt-1 bg-gray-100 border-gray-300 text-gray-600"
                          : "mt-1 bg-gray-50 border-gray-300 text-gray-600"
                        }
                      />
                    </div>
                    <div>
                      <Label className={theme === "light" ? "text-gray-900" : "text-gray-900"}>County</Label>
                      <Input
                        disabled
                        value={userProfile?.county || ""}
                        className={theme === "light"
                          ? "mt-1 bg-gray-100 border-gray-300 text-gray-600"
                          : "mt-1 bg-gray-50 border-gray-300 text-gray-600"
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Comments Tab */}
            <TabsContent value="comments" className="mt-6">
              <Card className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "border-gray-300"
              }`} style={theme === "dark" ? { backgroundColor: "#D3D5ED" } : {}}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Your Comments</CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-600"}>
                    View all comments you've posted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {comments.length === 0 ? (
                    <p className={`text-center py-8 ${
                      theme === "light" ? "text-gray-500" : "text-gray-700"
                    }`}>
                      No comments posted yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-lg border ${
                            theme === "light"
                              ? "bg-gray-50 border-gray-200"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className={`text-sm font-semibold ${
                              theme === "light" ? "text-pink-600" : "text-pink-600"
                            }`}>
                              On: {comment.initiatives?.title}
                            </p>
                            <p className={`text-xs ${
                              theme === "light" ? "text-gray-500" : "text-gray-600"
                            }`}>
                              {new Date(comment.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <p className={`text-sm ${
                            theme === "light" ? "text-gray-900" : "text-gray-900"
                          }`}>{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Theme Tab */}
            <TabsContent value="theme" className="mt-6">
              <Card className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "border-gray-300"
              }`} style={theme === "dark" ? { backgroundColor: "#D3D5ED" } : {}}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Theme Settings</CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-600"}>
                    Choose your preferred theme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleThemeChange("dark")}
                      variant={theme === "dark" ? "default" : "outline"}
                      className={`h-24 flex flex-col items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-[#FFAE00] hover:bg-[#ff9d00] text-gray-900"
                          : theme === "light"
                          ? "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                          : "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      }`}
                    >
                      <Moon className="h-6 w-6" />
                      <span>Dark Theme</span>
                    </Button>
                    <Button
                      onClick={() => handleThemeChange("light")}
                      variant={theme === "light" ? "default" : "outline"}
                      className={`h-24 flex flex-col items-center justify-center gap-2 ${
                        theme === "light"
                          ? "bg-[#FFAE00] hover:bg-[#ff9d00] text-gray-900"
                          : theme === "dark"
                          ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                          : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <Sun className="h-6 w-6" />
                      <span>Light Theme</span>
                    </Button>
                  </div>
                  <p className={`text-sm ${
                    theme === "light" ? "text-gray-600" : "text-gray-700"
                  }`}>
                    Current theme: <span className={theme === "light" ? "text-gray-900" : "text-gray-900"}>
                      {theme === "light" ? "Light" : "Dark"}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logout Tab */}
            <TabsContent value="logout" className="mt-6">
              <Card className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "border-gray-300"
              }`} style={theme === "dark" ? { backgroundColor: "#D3D5ED" } : {}}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-900" : "text-gray-900"}>Logout</CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-600"}>
                    Sign out of your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`mb-6 ${
                    theme === "light" ? "text-gray-700" : "text-gray-900"
                  }`}>
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                  </p>
                  <Button
                    onClick={handleSignOut}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
