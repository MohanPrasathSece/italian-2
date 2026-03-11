import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// ──────────────────────────────────────────────────────────────────
// LOCAL BUSINESS CONTACT SCHEMA — Critical for Local SEO & NAP
// NAP (Name, Address, Phone) consistency = #1 Local SEO signal
// ──────────────────────────────────────────────────────────────────
const CONTACT_PAGE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://kpjadvocates.com/contact#webpage",
    "url": "https://kpjadvocates.com/contact",
    "name": "Contact P. J. Jedidiah Koilson | KPJ Advocates | Thoothukudi",
    "description": "Contact Advocate P. J. Jedidiah Koilson at KPJ Advocates, Thoothukudi. Phone: +91 95003 26495. Located at Pearl Plaza, Devarpuram Road.",
    "isPartOf": { "@id": "https://kpjadvocates.com/#website" },
    "mainEntity": { "@id": "https://kpjadvocates.com/#organization" },
    "inLanguage": "en-IN"
};

const LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": "https://kpjadvocates.com/#organization",
    "name": "KPJ Advocates",
    "alternateName": ["KPJ Law Firm", "KPJ Advocates & Solicitors"],
    "description": "Premier law firm in Thoothukudi led by Advocate P. J. Jedidiah Koilson. Expert in Civil, Criminal, Property, Banking, and Family Law.",
    "url": "https://kpjadvocates.com/",
    "telephone": "+91-95003-26495",
    "email": "info@kpjadvocates.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 46/24A, 1st floor, Pearl Plaza, Devarpuram Road",
        "addressLocality": "Thoothukudi",
        "addressRegion": "Tamil Nadu",
        "postalCode": "628003",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "8.8105",
        "longitude": "78.1408"
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Pearl+Plaza+Devarpuram+Road+Thoothukudi",
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
        }
    ],
    "founder": { "@id": "https://kpjadvocates.com/about#person" },
    "priceRange": "$$",
    "areaServed": [
        { "@type": "City", "name": "Thoothukudi" },
        { "@type": "City", "name": "Tuticorin" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" }
    ]
};

const BREADCRUMB_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kpjadvocates.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://kpjadvocates.com/contact" }
    ]
};

// ──────────────────────────────────────────────────────────────────

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            toast({
                title: "Missing required fields",
                description: "Please fill name, email, and message.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name, email, phone, subject, message }),
            });

            const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };

            if (!res.ok || !data?.ok) {
                throw new Error(data?.error || "Failed to send message");
            }

            toast({
                title: "Message sent",
                description: "We received your message and will contact you shortly.",
            });

            setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
        } catch (err) {
            toast({
                title: "Unable to send message",
                description: err instanceof Error ? err.message : "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Helmet>
                {/* ── SEO Title: Local Dominance First ── */}
                <title>Contact | KPJ Advocates</title>

                <meta name="description" content="Contact the #1 rated Advocate in Thoothukudi (Tuticorin). P. J. Jedidiah Koilson at KPJ Advocates, Pearl Plaza. Call +91 95003 26495 for expert legal consultation." />

                <meta name="keywords" content="Best advocate in Thoothukudi, Best advocate in Tuticorin, Top lawyer in Thoothukudi, Criminal lawyer in Thoothukudi, Advocate near me Thoothukudi, Tuticorin advocate office, Advocate in Thoothukudi court, P. J. Jedidiah Koilson contact" />

                <link rel="canonical" href="https://kpjadvocates.com/contact" />
                <meta name="robots" content="index, follow" />

                {/* ── Contact Page Schema ── */}
                <script type="application/ld+json">{JSON.stringify(CONTACT_PAGE_SCHEMA)}</script>

                {/* ── Local Business Schema (NAP) ── */}
                <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_SCHEMA)}</script>

                {/* ── Breadcrumb ── */}
                <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>

                {/* ── Open Graph ── */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contact | KPJ Advocates" />
                <meta property="og:description" content="Contact the top legal authority in Thoothukudi. Advocate P. J. Jedidiah Koilson — Expert in Civil, Criminal and Property Law." />
                <meta property="og:url" content="https://kpjadvocates.com/contact" />
                <meta property="og:image" content="https://kpjadvocates.com/kpj-advocates-thoothukudi-logo.png" />
                <meta property="og:site_name" content="KPJ Advocates" />
                <meta property="og:locale" content="en_IN" />

                {/* ── Twitter Card ── */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Contact P. J. Jedidiah Koilson | KPJ Advocates" />
                <meta name="twitter:description" content="Call +91 95003 26495 or visit Pearl Plaza, Thoothukudi." />
            </Helmet>

            {/* ── Hero Section ── */}
            <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                    <div className="flex items-center gap-2 justify-center mb-4">
                        <div className="h-px w-10 bg-gold" />
                        <span className="font-body text-sm tracking-widest uppercase text-gold">Get In Touch</span>
                        <div className="h-px w-10 bg-gold" />
                    </div>
                    <h1 className="text-h1 font-heading text-primary-foreground mb-6">Contact Us</h1>
                    <p className="font-body text-base text-primary-foreground/70 max-w-2xl mx-auto">
                        Have a legal concern? Our expert team is here to provide you with the guidance and representation you need.
                    </p>
                </div>
            </section>

            {/* ── Contact Content ── */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* ── Contact Info ── */}
                        <div>
                            <h2 className="text-2xl font-heading text-foreground mb-8 text-left uppercase tracking-wider">Visit Our Office</h2>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-accent" size={24} aria-label="Office address" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Our Address</h3>
                                        <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=Pearl+Plaza+Devarpuram+Road+Thoothukudi"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-accent transition-colors"
                                                title="KPJ Advocates office location — Pearl Plaza Thoothukudi"
                                            >
                                                No. 46/24A, 1st floor, Pearl Plaza,<br />
                                                Devarpuram Road, Thoothukudi - 628003
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-accent" size={24} aria-label="Phone number" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Phone Number</h3>
                                        <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                            <a href="tel:+919500326495" className="hover:text-accent transition-colors" title="Call Advocate P. J. Jedidiah Koilson">
                                                +91 95003 26495
                                            </a><br />&nbsp;
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-accent" size={24} aria-label="Email address" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email Address</h3>
                                        <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                            <a href="mailto:info@kpjadvocates.com" className="hover:text-accent transition-colors" title="Email KPJ Advocates">
                                                info@kpjadvocates.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-ivory-dark rounded-2xl border border-border">
                                <h4 className="font-heading text-xl font-semibold text-foreground mb-4">Office Hours</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-muted-foreground">Monday - Friday</span>
                                        <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-muted-foreground">Saturday</span>
                                        <span className="text-foreground font-medium">10:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-muted-foreground">Sunday</span>
                                        <span className="text-foreground font-medium text-accent">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Contact Form ── */}
                        <div className="bg-card p-8 lg:p-10 rounded-2xl shadow-xl border border-border">
                            <h2 className="text-2xl font-heading text-foreground mb-8 text-left uppercase tracking-wider">Send Us a Message</h2>
                            <form className="space-y-6" onSubmit={onSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="contact-name" className="font-body text-sm font-medium text-foreground">Full Name</label>
                                        <input
                                            type="text"
                                            id="contact-name"
                                            autoComplete="name"
                                            className="w-full px-4 py-3 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-body text-sm"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contact-email" className="font-body text-sm font-medium text-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            id="contact-email"
                                            autoComplete="email"
                                            className="w-full px-4 py-3 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-body text-sm"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contact-phone" className="font-body text-sm font-medium text-foreground">Mobile Number</label>
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            autoComplete="tel"
                                            className="w-full px-4 py-3 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-body text-sm"
                                            placeholder="+91 98765 43210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contact-subject" className="font-body text-sm font-medium text-foreground">Subject</label>
                                        <select
                                            id="contact-subject"
                                            className="w-full px-4 py-3 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-body text-sm"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        >
                                            <option value="">Select a service</option>
                                            <option value="real-estate">Real Estate & Property</option>
                                            <option value="banking">Banking & Finance</option>
                                            <option value="nbfc">NBFC Operations</option>
                                            <option value="family">Family Disputes</option>
                                            <option value="dispute">Dispute Resolution</option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="contact-message" className="font-body text-sm font-medium text-foreground">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-body text-sm resize-none"
                                        placeholder="Tell us about your case..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60 disabled:pointer-events-none"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Map Section ── */}
            <section className="h-[450px] w-full bg-ivory-dark relative overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1416.7126!2d78.1408!3d8.8105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03f0ec3531b7e1%3A0xc3924f0a0d440c9d!2sPearl%20Plaza%2C%20Thoothukudi%2C%20Tamil%20Nadu%20628001!5e0!3m2!1sen!2sin!4v1709300000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KPJ Advocates Office Location — Pearl Plaza, Thoothukudi"
                    aria-label="Google Maps showing KPJ Advocates office at Pearl Plaza, Devarpuram Road, Thoothukudi"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                />
            </section>
        </div>
    );
};

export default Contact;
