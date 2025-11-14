import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth state and localStorage
    logout();
    // Small timeout so UI updates before redirect
    const t = setTimeout(() => navigate("/login", { replace: true }), 300);
    return () => clearTimeout(t);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Signing out…</p>
      </div>
    </div>
  );
}
