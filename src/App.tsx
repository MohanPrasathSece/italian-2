import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import LoggedIn from "./pages/LoggedIn";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";

export interface AuthUser {
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  sessionToken?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  sessionToken: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  openSignup: () => void;
  openLogin: () => void;
  closeSignup: () => void;
  closeLogin: () => void;
  signupOpen: boolean;
  loginOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = "cv_session_token";
const USER_KEY = "cv_user_data";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem(SESSION_KEY);
      const u = localStorage.getItem(USER_KEY);
      if (t && u) {
        setSessionToken(t);
        setUser(JSON.parse(u));
      }
    } catch (e) {}
    setReady(true);
  }, []);

  const login = (u: AuthUser, token: string) => {
    const enriched = { ...u, sessionToken: token };
    setSessionToken(token);
    setUser(enriched);
    try {
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(enriched));
    } catch (e) {}
  };

  const logout = () => {
    setSessionToken(null);
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {}
  };

  const openSignup = () => {
    setLoginOpen(false);
    setTimeout(() => setSignupOpen(true), 100);
  };
  const closeSignup = () => setSignupOpen(false);
  const openLogin = () => {
    setSignupOpen(false);
    setTimeout(() => setLoginOpen(true), 100);
  };
  const closeLogin = () => setLoginOpen(false);

  if (!ready) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <AuthContext.Provider value={{ user, sessionToken, login, logout, openSignup, openLogin, closeSignup, closeLogin, signupOpen, loginOpen }}>
      {children}
      <SignupModal
        open={signupOpen}
        onClose={closeSignup}
        onSwitchToLogin={() => {
          closeSignup();
          setTimeout(() => openLogin(), 150);
        }}
      />
      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
        onSwitchToSignup={() => {
          closeLogin();
          setTimeout(() => openSignup(), 150);
        }}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/learn" element={<ProtectedRoute><LoggedIn /></ProtectedRoute>} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
