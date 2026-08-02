import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, LogIn, UserPlus, User, LogOut, BookOpen, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/App";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", section: null, route: "/" },
  { label: "About", section: null, route: "/", offset: true },
  { label: "Services", section: "services", route: "/" },
  { label: "Process", section: null, route: "/", offset2: true },
  { label: "FAQ", section: null, route: "/", offset3: true },
];

const scrollToSection = (section: string | null, offset: number = 0) => {
  if (section) {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  } else if (offset > 0) {
    setTimeout(() => window.scrollTo({ top: offset, behavior: "smooth" }), 100);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, openSignup, openLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    toast("Logged out successfully.", { description: "See you next time!" });
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-card/95 shadow-sm border-b border-border py-3 backdrop-blur-xl"
            : "bg-primary/90 border-b border-white/10 py-4 backdrop-blur-md shadow-lg"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <Link
            to="/"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className={`flex items-center gap-2.5 font-heading text-2xl font-bold tracking-tight ${
              !scrolled && isHome ? "text-white" : "text-foreground"
            }`}>
              <TrendingUp size={28} className="text-gold" />
              <span className={scrolled || !isHome ? "text-foreground" : "text-white font-bold"}>
                Summit Ledger<span className="text-gold font-extrabold">Capital</span>
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.route}
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname !== "/" && link.route === "/") {
                      navigate("/");
                      setTimeout(() => {
                        let offset = 0;
                        if (link.offset) offset = 780;
                        else if (link.offset2) offset = 1600;
                        else if (link.offset3) offset = 2600;
                        else if (link.section) scrollToSection(link.section, 80);
                        else scrollToSection(null, offset);
                      }, 150);
                    } else {
                      let offset = 0;
                      if (link.offset) offset = 780;
                      else if (link.offset2) offset = 1600;
                      else if (link.offset3) offset = 2600;
                      else if (link.section) scrollToSection(link.section, 80);
                      else scrollToSection(null, offset);
                    }
                  }}
                  className={`font-body text-xs lg:text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold ${
                    scrolled || !isHome ? "text-foreground" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link
                  to="/learn"
                  className={`font-body text-xs lg:text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold flex items-center gap-1.5 ${
                    scrolled || !isHome ? "text-foreground" : "text-white"
                  }`}
                >
                  <BookOpen size={14} /> Learn
                </Link>
              </li>
            )}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <User size={14} />
                  </div>
                  <span className="font-body text-xs font-semibold text-foreground max-w-[110px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-border text-foreground font-body text-xs font-semibold tracking-wide hover:bg-ivory-dark hover:border-accent/40 transition-all"
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openLogin()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-body text-xs lg:text-sm font-semibold tracking-wide hover:text-gold transition-colors"
                  style={{ color: !scrolled && isHome ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                >
                  <LogIn size={14} /> Login
                </button>
                <button
                  onClick={() => openSignup()}
                  className="inline-flex items-center gap-1.5 px-4 lg:px-6 py-2 md:py-2.5 rounded-md bg-accent text-accent-foreground font-body text-xs lg:text-sm font-semibold tracking-wide shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <UserPlus size={14} /> Sign Up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden relative z-[50] p-2.5 rounded-xl transition-all duration-300 ${
              scrolled || !isHome ? "bg-gold/10 text-gold" : "bg-white/10 text-white backdrop-blur-md border border-white/20"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <div className="lg:hidden fixed inset-0 z-[100]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              />

              <motion.div
                initial={{ y: -50, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute top-4 left-4 right-4 bg-white/96 backdrop-blur-2xl rounded-[2.2rem] p-6 shadow-2xl border border-white/30 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-7">
                  <div className="w-16 h-1 bg-gold/20 rounded-full" />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 bg-gold text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
                  >
                    <X size={18} />
                  </button>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    return (
                      <motion.li key={link.label} whileTap={{ scale: 0.98 }}>
                        <a
                          href={link.section ? `#${link.section}` : "#"}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            if (location.pathname !== "/" && link.route === "/") {
                              navigate("/");
                              setTimeout(() => {
                                let offset = 0;
                                if (link.offset) offset = 780;
                                else if (link.offset2) offset = 1600;
                                else if (link.offset3) offset = 2600;
                                else if (link.section) scrollToSection(link.section, 80);
                                else scrollToSection(null, offset);
                              }, 150);
                            } else {
                              let offset = 0;
                              if (link.offset) offset = 780;
                              else if (link.offset2) offset = 1600;
                              else if (link.offset3) offset = 2600;
                              else if (link.section) scrollToSection(link.section, 80);
                              else scrollToSection(null, offset);
                            }
                          }}
                          className="flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group text-navy hover:bg-gold/5"
                        >
                          <span className="font-heading text-base font-medium tracking-wide uppercase">
                            {link.label}
                          </span>
                          <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 opacity-50" />
                        </a>
                      </motion.li>
                    );
                  })}
                  {user && (
                    <motion.li whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/learn"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group text-navy hover:bg-gold/5"
                      >
                        <span className="font-heading text-base font-medium tracking-wide uppercase">
                          Learn Hub
                        </span>
                        <BookOpen size={18} className="opacity-50" />
                      </Link>
                    </motion.li>
                  )}
                </ul>

                <div className="mt-5 pt-5 border-t border-border/60 space-y-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-ivory-dark mb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <User size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-body text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="font-body text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setOpen(false);
                          handleLogout();
                        }}
                        className="flex justify-center items-center w-full py-3.5 rounded-2xl border border-border text-foreground font-heading text-xs font-bold tracking-[0.15em] uppercase hover:bg-ivory-dark transition-all"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <motion.li className="list-none" whileTap={{ scale: 0.98 }}>
                        <button
                          onClick={() => {
                            setOpen(false);
                            openLogin();
                          }}
                          className="flex justify-center items-center w-full py-3.5 rounded-2xl border border-border text-primary font-heading text-xs font-bold tracking-[0.15em] uppercase shadow-sm hover:bg-ivory-dark transition-all"
                        >
                          <LogIn size={16} className="mr-2" /> Login
                        </button>
                      </motion.li>
                      <motion.li className="list-none" whileTap={{ scale: 0.98 }}>
                        <button
                          onClick={() => {
                            setOpen(false);
                            openSignup();
                          }}
                          className="flex justify-center items-center w-full py-4 rounded-2xl bg-primary text-white font-heading text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-primary/20"
                        >
                          <UserPlus size={16} className="mr-2" /> Create Free Account
                        </button>
                      </motion.li>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
