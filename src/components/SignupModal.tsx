import { useState, type FormEvent, useEffect } from "react";
import { Loader2, Eye, EyeOff, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import CountryDropdown from "@/components/CountryDropdown";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  type CountryConfig,
  validateEmail,
  validatePhone,
  getPhoneErrorMessage,
} from "@/lib/countries";
import { useAuth, type AuthUser } from "@/App";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ open, onClose, onSwitchToLogin }: SignupModalProps) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryConfig>(DEFAULT_COUNTRY);
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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required.";
    else if (name.trim().length < 2) e.name = "Name must be at least 2 characters.";

    if (!email.trim()) e.email = "Email address is required.";
    else if (!validateEmail(email)) e.email = "Please enter a valid email address.";

    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!validatePhone(phone, country)) e.phone = getPhoneErrorMessage(country);

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg(null);
    if (!validate()) {
      toast.error("Please correct the highlighted fields and try again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          countryCode: country.iso,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const user: AuthUser = {
          email: data.user?.email || email.trim().toLowerCase(),
          name: data.user?.name || name.trim(),
          phone: data.user?.phone || phone.trim(),
          createdAt: data.user?.createdAt || new Date().toISOString(),
        };
        login(user, data.sessionToken || "fallback_token");
        setSuccessMsg(
          data.alreadyExists
            ? "It looks like you've already contacted us. We've recognized your details and will continue with your request."
            : "Thank you! Your account has been created successfully.",
        );
        toast.success(
          data.alreadyExists
            ? "Welcome back! We've logged you in."
            : "Account created successfully. Welcome!",
        );
        setTimeout(() => {
          onClose();
          navigate("/learn");
        }, 900);
      } else {
        const msg = data.error || "Submission failed. Please review your details.";
        const code = String(data.code || "");
        if (code === "INVALID_LEAD") {
          toast.error(msg);
        } else if (/already exist|duplicate/i.test(String(data.error || ""))) {
          toast.warning(
            "It looks like you've already contacted us. Please use the login option or wait for our team.",
          );
        } else {
          toast.error(msg);
        }
        setErrors({ form: msg });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection and try again.");
      setErrors({ form: "Network error during submission." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md overflow-hidden border-border/60 bg-card/95 backdrop-blur-2xl p-0 sm:rounded-2xl">
        <motion.div
          key={open ? "open" : "closed"}
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
                Secure Account
              </span>
              <DialogTitle className="font-heading text-2xl text-white leading-tight">
                Start Your Crypto Journey
              </DialogTitle>
              <DialogDescription className="font-body text-sm text-white/70">
                Create your free account. Institutional-grade strategies begin here.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 px-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="su-name" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="su-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
                className="h-11"
              />
              {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="su-email" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="su-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                disabled={loading}
                className="h-11"
              />
              {errors.email && <p className="font-body text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <div className="w-[46%] flex-shrink-0">
                  <CountryDropdown value={country} onChange={setCountry} error={errors.phone} />
                </div>
                <div className="flex-1">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={country.example}
                    disabled={loading}
                    className="h-11"
                  />
                </div>
              </div>
              {errors.phone && <p className="font-body text-xs text-destructive">{errors.phone}</p>}
              {!errors.phone && (
                <p className="font-body text-[11px] text-muted-foreground/80">
                  Example: +{country.dialCode} {country.example}
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
                  Creating Your Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-center font-body text-xs text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-semibold text-accent hover:text-accent/80 hover:underline underline-offset-2"
              >
                Log in instead
              </button>
            </p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
