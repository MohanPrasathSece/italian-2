import { useState, type FormEvent, useEffect } from "react";
import { Loader2, Send, Check, User, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/App";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CountryDropdown from "@/components/CountryDropdown";
import {
  DEFAULT_COUNTRY,
  type CountryConfig,
  validateEmail,
  validatePhone,
  getPhoneErrorMessage,
} from "@/lib/countries";

interface ContactFormProps {
  variant?: "home" | "logged-in";
  compact?: boolean;
}

export default function ContactForm({ variant = "home", compact = false }: ContactFormProps) {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryConfig>(DEFAULT_COUNTRY);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (!name && user.name) setName(user.name);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    else if (name.trim().length < 2) e.name = "Name is too short.";

    if (!email.trim()) e.email = "Email is required.";
    else if (!validateEmail(email)) e.email = "Please enter a valid email address.";

    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!validatePhone(phone, country)) e.phone = getPhoneErrorMessage(country);

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);
    if (!validate()) {
      toast.error("Please correct the highlighted fields and try again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          countryCode: country.iso,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const msg =
          data.message ||
          "Thank you for contacting us. Your message has been received, and our team will get back to you shortly.";
        setSuccess(msg);
        toast.success(msg);
        setMessage("");
        if (!user) {
          setPhone("");
        }
      } else {
        const code = String(data.code || "");
        const msg =
          data.error ||
          "We couldn't process your enquiry with the information provided. Please try again.";
        if (code === "INVALID_LEAD") {
          toast.error(
            "We couldn't process your enquiry with the information provided. Please review your details and try again.",
          );
        } else if (/already exist|duplicate/i.test(String(data.error || ""))) {
          toast.warning(
            "It looks like you've already contacted us. We've recognized your details and will continue with your request.",
          );
          setSuccess(
            "It looks like you've already contacted us. We've recognized your details and will continue with your request.",
          );
        } else {
          toast.error(msg);
        }
        if (!success) setErrors({ form: msg });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please check your connection and try again.");
      setErrors({ form: "Network error during submission." });
    } finally {
      setLoading(false);
    }
  };

  if (variant === "home") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-sm tracking-widest uppercase text-gold">Get In Touch</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h3 className="text-h2 font-heading text-foreground mb-4">
            Ready to Begin Your Crypto Investment Journey?
          </h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Join 12,000+ global investors growing their wealth with CryptoVest Capital. Fill in the form and our
            team of investment advisors will be in touch within 24 hours.
          </p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm backdrop-blur-sm space-y-4"
          style={{ background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--card) / 0.7))" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cf-name" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <User size={12} className="inline mr-1 -mt-0.5 text-accent" /> Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cf-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
                className="h-11"
              />
              {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cf-email" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                disabled={loading}
                className="h-11"
              />
              {errors.email && <p className="font-body text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Phone size={12} className="inline mr-1 -mt-0.5 text-accent" /> Phone Number <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-[42%_1fr] gap-2">
              <CountryDropdown value={country} onChange={setCountry} error={errors.phone} />
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={country.example}
                disabled={loading}
                className="h-11"
              />
            </div>
            {errors.phone ? (
              <p className="font-body text-xs text-destructive">{errors.phone}</p>
            ) : (
              <p className="font-body text-[11px] text-muted-foreground/80">
                Example: +{country.dialCode} {country.example}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cf-msg" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <MessageSquare size={12} className="inline mr-1 -mt-0.5 text-accent" /> Message (Optional)
            </Label>
            <Textarea
              id="cf-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your investment goals and we'll tailor a strategy for you..."
              rows={4}
              disabled={loading}
              className="resize-none"
            />
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-start gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-emerald-700"
            >
              <Check size={16} className="mt-0.5 flex-shrink-0" />
              <p className="font-body text-xs leading-snug">{success}</p>
            </motion.div>
          )}
          {errors.form && !success && (
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
                Sending Enquiry...
              </>
            ) : (
              <>
                Send Enquiry <Send size={16} className="ml-2" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`space-y-4 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-5 sm:p-6 ${compact ? "max-w-2xl mx-auto" : ""}`}
    >
      <div className="mb-2">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Send us a message</h3>
        <p className="font-body text-sm text-muted-foreground">
          Have a question about your portfolio or the markets? Our analysts are here to help.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cf-name-2" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name *
          </Label>
          <Input id="cf-name-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" disabled={loading} className="h-10" />
          {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-email-2" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email *
          </Label>
          <Input id="cf-email-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" disabled={loading} className="h-10" />
          {errors.email && <p className="font-body text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone *</Label>
        <div className="grid grid-cols-[42%_1fr] gap-2">
          <CountryDropdown value={country} onChange={setCountry} error={errors.phone} />
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={country.example} disabled={loading} className="h-10" />
        </div>
        {errors.phone && <p className="font-body text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-msg-2" className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Message
        </Label>
        <Textarea
          id="cf-msg-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your question, thoughts, or request..."
          rows={4}
          disabled={loading}
        />
      </div>
      {success && (
        <div className="flex items-start gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-emerald-700">
          <Check size={16} className="mt-0.5 flex-shrink-0" />
          <p className="font-body text-xs leading-snug">{success}</p>
        </div>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send size={15} className="ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
