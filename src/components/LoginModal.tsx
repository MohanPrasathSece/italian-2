import { useState, type FormEvent, useEffect } from "react";
import { Loader2, X, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/countries";
import { useAuth, type AuthUser } from "@/App";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ open, onClose, onSwitchToSignup }: LoginModalProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setErrors({});
      setLoading(false);
      setSuccessMsg(null);
    }
  }, [open]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg(null);
    if (!email.trim()) {
      setErrors({ email: "Email is required." });
      toast.error("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address." });
      toast.error("Invalid email address format.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const user: AuthUser = {
          email: data.user?.email || email.trim().toLowerCase(),
          name: data.user?.name || "Valued Investor",
          phone: data.user?.phone || "",
          createdAt: data.user?.createdAt || new Date().toISOString(),
        };
        login(user, data.sessionToken || "fallback_login_token");
        setSuccessMsg("Login successful. Redirecting to your learning dashboard...");
        toast.success("Welcome back! Login successful.");
        setTimeout(() => {
          onClose();
          navigate("/learn");
        }, 800);
      } else {
        const code = String(data.code || "");
        const msg = data.error || "Login failed.";
        if (code === "NOT_FOUND" || res.status === 404) {
          toast.error("No account found with this email. Please sign up first.");
        } else {
          toast.error(msg);
        }
        setErrors({ form: msg });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection and try again.");
      setErrors({ form: "Network error during login." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md overflow-hidden border-border/60 bg-card/95 backdrop-blur-2xl p-0 sm:rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 px-6 pt-8 pb-6 text-primary-foreground">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--gold)) 0%, transparent 50%)"
            }} />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground transition-colors"
            >
              <X size={18} />
            </button>
            <DialogHeader className="text-left sm:text-left space-y-1.5 relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-gold">
                Secure Login
              </span>
              <DialogTitle className="font-heading text-2xl text-white leading-tight">
                Access Your Dashboard
              </DialogTitle>
              <DialogDescription className="font-body text-sm text-white/70">
                Enter your email to log in. No password required — your identity is verified securely.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 px-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="li-email" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="li-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                disabled={loading}
                className="h-11"
              />
              {errors.email && (
                <p className="flex items-center gap-1 font-body text-xs text-destructive">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-start gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-emerald-700"
              >
                <Check size={16} className="mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs leading-snug">{successMsg}</p>
              </motion.div>
            )}

            {errors.form && !successMsg && (
              <p className="rounded-md border border-destructive/20 bg-destructive/5 p-3 font-body text-xs text-destructive">
                {errors.form}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full h-12 bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Logging into Crypto Account...
                </>
              ) : (
                "Log In to Crypto Portfolio"
              )}
            </Button>

            <p className="text-center font-body text-xs text-muted-foreground">
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="font-semibold text-accent hover:text-accent/80 hover:underline underline-offset-2"
              >
                Create free account
              </button>
            </p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
