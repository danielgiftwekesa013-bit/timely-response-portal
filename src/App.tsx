import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/authContext";
import { BookingProvider } from "@/lib/bookingContext";

// Public Pages
import PublicLayout from "./components/layout/PublicLayout";
import Index from "./pages/Index";
import BookRide from "./pages/BookRide";
import TrackRide from "./pages/TrackRide";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ScheduledPickups from "./pages/admin/ScheduledPickups";
import DriversManagement from "./pages/admin/DriversManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/book" element={<BookRide />} />
                <Route path="/track" element={<TrackRide />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/trl" element={<AdminLogin />} />
              <Route path="/trl" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="pickups" element={<ScheduledPickups />} />
                <Route path="my-pickups" element={<ScheduledPickups />} />
                <Route path="drivers" element={<DriversManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
