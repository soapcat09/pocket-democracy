import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TownProvider } from "./contexts/TownContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import VerifyId from "./pages/VerifyId";
import Initiatives from "./pages/Initiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TownProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-id" element={<VerifyId />} />
            <Route path="/" element={<Index />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiative/:id" element={<InitiativeDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TownProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
