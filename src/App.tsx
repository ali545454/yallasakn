import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./context/UserContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileMenu from "@/components/Mobile/MobileMenu";
import "leaflet/dist/leaflet.css";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ApartmentDetails from "./pages/ApartmentDetails";
import Dashboard from "./pages/Dashboard";
import AddApartment from "./pages/AddApartment";
import EditApartmentPage from "./pages/EditApartmentPage";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import HelpPage from "./pages/Help";
import Privacy from "./pages/Privacy";
import SafetyPage from "./pages/SafetyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage"; //  ⬅️ استيراد الصفحة الجديدة
import ForgotPassword from "./pages/ForgotPassword";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FavoritesProvider } from "@/context/FavoritesContext";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <LoadingProvider>
            <LoadingOverlay />
            <FavoritesProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/apartment/:apartmentUuid"
                  element={
                    <ProtectedRoute>
                      <ApartmentDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-apartment"
                  element={
                    <ProtectedRoute>
                      <AddApartment />
                    </ProtectedRoute>
                  }
                />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/safety" element={<SafetyPage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
                <Route
                  path="/apartments/:apartmentUuid"
                  element={<ApartmentDetails />}
                />
                <Route
                  path="/edit-apartment/:apartmentUuid"
                  element={
                    <ProtectedRoute>
                      <EditApartmentPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </FavoritesProvider>
            <MobileMenu />
          </LoadingProvider>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
