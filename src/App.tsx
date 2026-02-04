import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PrivateLayout } from "@/components/layout/PrivateLayout";

// Public Pages
import Landing from "@/pages/Landing";
import Education from "@/pages/Education";
import About from "@/pages/About";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword"; // NY SIDA

// Private Pages
import MemberDashboard from "@/pages/MemberDashboard";
import MemberOnboarding from "@/pages/MemberOnboarding";
import MemberGroups from "@/pages/MemberGroups";
import MemberProfile from "@/pages/MemberProfile";
import PocGuide from "@/pages/PocGuide";
import UpdatePassword from "@/pages/UpdatePassword"; // NY SIDA

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/utbildning" element={<Education />} />
              <Route path="/om-oss" element={<About />} />
            </Route>

            {/* Login & Auth Pages (standalone) */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Private Routes with Private Layout */}
            <Route element={<PrivateLayout />}>
              <Route path="/medlem" element={<MemberDashboard />} />
              <Route path="/medlem/onboarding" element={<MemberOnboarding />} />
              <Route path="/medlem/grupper" element={<MemberGroups />} />
              <Route path="/medlem/profil" element={<MemberProfile />} />
              <Route path="/medlem/poc-guide" element={<PocGuide />} />
              
              {/* Sidan man hamnar på efter att ha klickat på länken i mailet */}
              <Route path="/update-password" element={<UpdatePassword />} />
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
