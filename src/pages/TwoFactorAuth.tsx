import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Phone, Copy, Check } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function TwoFactorAuth() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { verifyTwoFactor, pendingUser, awaitingTwoFactor, twoFactorMethod } = useAuth();

  // Redirect if not awaiting 2FA
  useEffect(() => {
    if (!awaitingTwoFactor || !pendingUser) {
      navigate("/login");
    }
  }, [awaitingTwoFactor, pendingUser, navigate]);

  // Get demo code from localStorage on mount
  useEffect(() => {
    if (pendingUser?.email) {
      const storedCode = localStorage.getItem(`2fa_${pendingUser.email}`);
      if (storedCode) {
        setDemoCode(storedCode);
      }
    }
  }, [pendingUser]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      await verifyTwoFactor(code);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyDemoCode = () => {
    if (demoCode) {
      navigator.clipboard.writeText(demoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Mask email and phone for display
  const maskedEmail = pendingUser?.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
  const maskedPhone = pendingUser?.phoneNumber.replace(/(\d{3})[\d-]*(\d{4})/, "$1-***-$2");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>
            {twoFactorMethod === "email" ? (
              <div className="flex items-center gap-2 mt-2">
                <Mail className="w-4 h-4" />
                <span>Code sent to {maskedEmail}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4" />
                <span>Code sent to {maskedPhone}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                disabled={isLoading || timeLeft === 0}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <p className={`text-sm font-medium ${timeLeft <= 60 ? "text-red-600" : "text-gray-600"}`}>
                Code expires in: {formatTime(timeLeft)}
              </p>

              {demoCode && (
                <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 font-medium mb-2">📋 Demo Code (for testing):</p>
                  <div className="flex items-center gap-2 bg-white border border-yellow-200 rounded p-2">
                    <code className="flex-1 font-mono font-bold text-lg text-yellow-900">{demoCode}</code>
                    <button
                      type="button"
                      onClick={copyDemoCode}
                      className="p-1 hover:bg-yellow-100 rounded transition-colors"
                      title="Copy code"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-yellow-700" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || code.length !== 6 || timeLeft === 0}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setCode("");
                  navigate("/login");
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Back to Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
