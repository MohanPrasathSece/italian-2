import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Practice Areas", path: "/practice-areas" },
  { label: "Work with us", path: "/work-with-us" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? "bg-card shadow-sm border-b border-border py-4 backdrop-blur-sm" : "bg-transparent py-6"
      }`}>
      <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
          <img src="/kpj-advocates-thoothukudi-logo.png" alt="KPJ Advocates Logo" className={`h-14 w-auto object-contain transition-all ${!scrolled && isHome ? "brightness-0 invert" : ""}`} />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => window.scrollTo(0, 0)}
                className={`font-body text-xs lg:text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold ${location.pathname === link.path
                  ? "text-gold"
                  : scrolled || !isHome ? "text-foreground" : "text-white"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/services"
          onClick={() => window.scrollTo(0, 0)}
          className="hidden md:inline-flex items-center px-4 lg:px-6 py-2 md:py-2.5 rounded-md bg-accent text-accent-foreground font-body text-xs lg:text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
        >
          Request a Consultation
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden relative z-[50] p-2.5 rounded-xl transition-all duration-300 ${scrolled || !isHome
            ? "bg-gold/10 text-gold"
            : "bg-white/10 text-white backdrop-blur-md border border-white/20"
            }`}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden fixed inset-0 z-[100]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 shadow-2xl border border-white/20 overflow-hidden"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center mb-8">
                <div className="w-16 h-1 bg-gold/20 rounded-full" />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 bg-gold text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.li
                      key={link.path}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => {
                          setOpen(false);
                          window.scrollTo(0, 0);
                        }}
                        className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${isActive
                          ? "bg-gold text-white shadow-md"
                          : "text-navy hover:bg-gold/5"
                          }`}
                      >
                        <span className="font-heading text-base font-medium tracking-wide uppercase">
                          {link.label}
                        </span>
                        <ChevronRight
                          size={18}
                          className={`transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1 opacity-50"
                            }`}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li
                  className="mt-4"
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/services"
                    onClick={() => {
                      setOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="flex justify-center items-center w-full py-4 rounded-2xl bg-primary text-white font-heading text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-primary/20"
                  >
                    Request a Consultation
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
