import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, TrendingUp, Coins, Lock, Shield, Scale, FileText, Award } from "lucide-react";

const Footer = () => {
  const scrollToSection = (section: string | null) => {
    if (typeof window === "undefined") return;
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden border-t border-gold/10">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-28 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center mb-5"
              >
                <span className="flex items-center gap-2.5 font-heading text-2xl font-bold tracking-tight text-white">
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <defs>
                      <linearGradient id="coinLogoGradFooter" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#D4AF37" />
                        <stop offset="1" stopColor="#B7922F" />
                      </linearGradient>
                    </defs>
                    <circle cx="24" cy="24" r="22" fill="url(#coinLogoGradFooter)" />
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                    <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="serif" fontSize="24" fontWeight="700" style={{ letterSpacing: "-0.04em" }}>₿</text>
                  </svg>
                  Crypto<span className="text-gold">Vest</span>
                </span>
              </Link>
              <p className="font-body text-sm leading-relaxed text-white/70">
                CryptoVest Capital is a premier digital asset investment firm delivering institutional-grade cryptocurrency strategies, portfolio management, and secure custody for global investors.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-navy"
                  >
                    <Icon size={16} />
                  </a>
                ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold rounded-full" />
            </h3>
            <ul className="space-y-3 pt-2">
              {[
                { label: "Home", section: null },
                { label: "About", section: "services", offset: 900 },
                { label: "Services", section: "services" },
                { label: "Process", section: "services", offset: 1700 },
                { label: "FAQ", section: "services", offset: 2800 },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.offset) {
                        scrollToSection(null);
                        setTimeout(() => window.scrollTo({ top: link.offset, behavior: "smooth" }), 50);
                      } else {
                        scrollToSection(link.section);
                      }
                    }}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6 relative inline-block">
              Core Services
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold rounded-full" />
            </h3>
            <ul className="space-y-3 pt-2">
              {[
                { label: "Portfolio Management", icon: TrendingUp },
                { label: "Algorithmic Trading", icon: Coins },
                { label: "Staking & Yield", icon: Lock },
                { label: "Secure Custody", icon: Shield },
                { label: "Market Research", icon: FileText },
                { label: "Investor Education", icon: Award },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to="/"
                    onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}
                    className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    <item.icon size={16} className="text-gold/70 group-hover:text-gold transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold rounded-full" />
            </h3>
            <ul className="space-y-3 pt-2">
              <li>
                <Link
                  to="/privacy"
                  className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Scale size={14} className="text-gold/70 group-hover:text-gold transition-colors" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <FileText size={14} className="text-gold/70 group-hover:text-gold transition-colors" />
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="font-body text-sm text-white/70">
                © {new Date().getFullYear()} CryptoVest Capital. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right max-w-3xl">
              <p className="font-body text-xs leading-relaxed text-white/50">
                <span className="inline-flex items-center gap-1">
                  <Shield size={12} className="text-gold" />
                  Investment Risk Disclaimer:
                </span>{" "}
                Cryptocurrency investments are highly volatile and involve substantial risk of loss. Past performance does not guarantee future results. Nothing on this website constitutes financial, investment, or legal advice. Please read our <Link to="/terms" className="underline hover:text-gold">Terms</Link> &amp; <Link to="/privacy" className="underline hover:text-gold">Privacy Policy</Link> before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
