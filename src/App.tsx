import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TownProvider } from "./contexts/TownContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Initiatives from "./pages/Initiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TownProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiative/:id" element={<InitiativeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TownProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
