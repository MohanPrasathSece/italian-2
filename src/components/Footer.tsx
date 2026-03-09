import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-6">
            <img src="/kpj-advocates-thoothukudi-logo.png" alt="KPJ Advocates Logo" className="h-12 w-auto brightness-0 invert" />
          </div>
          <p className="font-body text-sm leading-relaxed opacity-80">
            A premier law firm committed to upholding justice with integrity, excellence, and unwavering dedication to our clients.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-gold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 font-body text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Services", path: "/services" },
              { label: "Practice Areas", path: "/practice-areas" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} onClick={() => window.scrollTo(0, 0)} className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice Areas */}
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-gold uppercase tracking-wider">Practice Areas</h4>
          <ul className="space-y-2 font-body text-sm">
            <li><Link to="/practice-areas" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">Real Estate & Property</Link></li>
            <li><Link to="/practice-areas" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">Banking & Finance</Link></li>
            <li><Link to="/practice-areas" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">Family Disputes</Link></li>
            <li><Link to="/practice-areas" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">Dispute Resolution</Link></li>
            <li><Link to="/practice-areas" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">NBFC Operations</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-gold uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 font-body text-sm">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-gold flex-shrink-0" />
              <a href="mailto:info@kpjadvocates.com" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">info@kpjadvocates.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-gold flex-shrink-0" />
              <a href="tel:+919500326495" className="opacity-70 hover:text-gold hover:opacity-100 transition-colors">+91 95003 26495</a>
            </li>
            <li className="flex items-start gap-2 opacity-70">
              <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
              No. 46/24A, 1st floor, Pearl Plaza, Devarpuram Road, Thoothukudi - 628003
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
        <p className="font-body text-sm opacity-60">
          © {new Date().getFullYear()} KPJ Advocates. All rights reserved.
        </p>
        <p className="font-body text-xs opacity-40 mt-2">
          Developed by <a href="https://www.zyradigitals.com" target="_blank" rel="noopener noreferrer" className="text-gold opacity-100 font-medium hover:underline transition-all">Zyra Digitals</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
