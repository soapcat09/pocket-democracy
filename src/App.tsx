import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TownProvider } from "./contexts/TownContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Initiatives from "./pages/Initiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import DemoCodes from "./pages/DemoCodes";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Routes that don't require authentication
const PublicRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/2fa" element={<TwoFactorAuth />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

// Routes that require authentication
const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }
    />
    <Route
      path="/initiatives"
      element={
        <ProtectedRoute>
          <Initiatives />
        </ProtectedRoute>
      }
    />
    <Route
      path="/initiative/:id"
      element={
        <ProtectedRoute>
          <InitiativeDetail />
        </ProtectedRoute>
      }
    />
    <Route
      path="/demo-codes"
      element={
        <ProtectedRoute>
          <DemoCodes />
        </ProtectedRoute>
      }
    />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Main app router that decides between public and private routes
const AppRoutes = () => {
  const { isAuthenticated, isLoading, awaitingTwoFactor } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If awaiting 2FA, show 2FA page
  if (awaitingTwoFactor) {
    return (
      <Routes>
        <Route path="/2fa" element={<TwoFactorAuth />} />
        <Route path="*" element={<Navigate to="/2fa" replace />} />
      </Routes>
    );
  }

  // If not authenticated, show public routes
  if (!isAuthenticated) {
    return <PublicRoutes />;
  }

  // If authenticated, show private routes
  return <PrivateRoutes />;
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TownProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TownProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
