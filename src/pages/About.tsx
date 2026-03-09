import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Scale, Eye, Shield, Users } from "lucide-react";
// ──────────────────────────────────────────────────────────────────
// SEO IMAGES — Root-level SEO optimized filenames
// ──────────────────────────────────────────────────────────────────
const lawyerImg = "/best-advocate-in-thoothukudi-jedidiah-koilson.jpeg";
const chooseUsImg = "/top-lawyer-thoothukudi-court.png";

// ──────────────────────────────────────────────────────────────────
// PERSON SCHEMA — The core entity page. This is where Google
// builds its understanding of "P. J. Jedidiah Koilson" as an entity.
// ──────────────────────────────────────────────────────────────────
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://kpjadvocates.com/about#person",
  "name": "P. J. Jedidiah Koilson",
  "givenName": "Jedidiah",
  "familyName": "Koilson",
  "additionalName": "P. J.",
  "alternateName": [
    "Jedidiah Koilson",
    "Jedediah Koilson",
    "Jedidiyah Koilson",
    "Jedideya Koilson",
    "Judidiah Koilson",
    "Jedida Koilson",
    "Jedidaih Koilson",
    "P.J. Jedidiah",
    "P J Jedidiah Koilson",
    "Koilson Advocate",
    "Koilson Lawyer Thoothukudi"
  ],
  "honorificSuffix": "B.A., LL.B",
  "jobTitle": "Advocate",
  "description": "P. J. Jedidiah Koilson is a professional Advocate enrolled under the Bar Council of Tamil Nadu & Puducherry, practising at KPJ Advocates, Thoothukudi. Specializes in Civil, Criminal, Property, Banking, and Family Law.",
  "image": {
    "@type": "ImageObject",
    "url": "https://kpjadvocates.com/best-advocate-in-thoothukudi-jedidiah-koilson.jpeg",
    "name": "P. J. Jedidiah Koilson — Advocate, KPJ Advocates Thoothukudi",
    "description": "Professional portrait of Advocate P. J. Jedidiah Koilson, Lead Advocate at KPJ Advocates, Thoothukudi, Tamil Nadu",
    "width": "800",
    "height": "1000"
  },
  "url": "https://kpjadvocates.com/about",
  "email": "info@kpjadvocates.com",
  "telephone": "+91-95003-26495",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 46/24A, 1st floor, Pearl Plaza, Devarpuram Road",
    "addressLocality": "Thoothukudi",
    "addressRegion": "Tamil Nadu",
    "postalCode": "628003",
    "addressCountry": "IN"
  },
  "worksFor": {
    "@id": "https://kpjadvocates.com/#organization"
  },
  "knowsAbout": [
    "Civil Law",
    "Criminal Law",
    "Property Law",
    "Family Law",
    "Banking Law",
    "SARFAESI Act",
    "Insolvency and Bankruptcy Code",
    "NBFC Legal Operations",
    "Consumer Court Cases",
    "Legal Notices and Compliance"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "Enrolment under Bar Council of Tamil Nadu & Puducherry",
    "credentialCategory": "license",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Bar Council of Tamil Nadu and Puducherry"
    }
  },
  "sameAs": [
    "https://kpjadvocates.com/",
    "https://kpjadvocates.com/about",
    "https://www.google.com/maps/search/?api=1&query=KPJ+Advocates+Thoothukudi"
  ]
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kpjadvocates.com/" },
    { "@type": "ListItem", "position": 2, "name": "About — P. J. Jedidiah Koilson", "item": "https://kpjadvocates.com/about" }
  ]
};

const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": "https://kpjadvocates.com/about",
  "name": "About P. J. Jedidiah Koilson | Advocate | KPJ Advocates",
  "description": "Professional profile and background of P. J. Jedidiah Koilson, Lead Advocate at KPJ Advocates, Thoothukudi.",
  "mainEntity": { "@id": "https://kpjadvocates.com/about#person" },
  "isPartOf": { "@id": "https://kpjadvocates.com/#website" },
  "inLanguage": "en-IN"
};

// ──────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Scale,
    title: "Justice",
    desc: "Inspired by the Roman tradition of Justitia, we uphold fairness and equity in every case.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "We believe in open communication and honest counsel throughout the legal process.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Our reputation is built on ethical practice and unwavering commitment to the law.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Users,
    title: "Client First",
    desc: "Every strategy and decision is made with our client's best interests at heart.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        {/* ── Name-first title for entity-based brand SERP ── */}
        <title>About | KPJ Advocates</title>

        <meta name="description" content="P. J. Jedidiah Koilson — #1 Advocate in Thoothukudi. Professional lawyer with 25+ years legacy. Expert in Civil, Criminal, Property, and Family Law in Tuticorin." />

        {/* ── Local & Branded Keywords ── */}
        <meta name="keywords" content="Best advocate in Thoothukudi, Best advocate in Tuticorin, Top lawyer in Thoothukudi, Criminal lawyer in Thoothukudi, Advocate near me Thoothukudi, P. J. Jedidiah Koilson, Jedidiah Koilson, Jedediah Koilson, KPJ Advocates, Tuticorin lawyer" />

        <link rel="canonical" href="https://kpjadvocates.com/about" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* ── Core Person Entity Schema ── */}
        <script type="application/ld+json">{JSON.stringify(PERSON_SCHEMA)}</script>

        {/* ── ProfilePage Schema ── */}
        <script type="application/ld+json">{JSON.stringify(PROFILE_PAGE_SCHEMA)}</script>

        {/* ── Breadcrumb ── */}
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>

        {/* ── Open Graph ── */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About | KPJ Advocates" />
        <meta property="og:description" content="Professional profile of Advocate P. J. Jedidiah Koilson — #1 rated Advocate in Thoothukudi, Tamil Nadu. Specializing in Civil, Criminal and Property Law." />
        <meta property="og:url" content="https://kpjadvocates.com/about" />
        <meta property="og:image" content="https://kpjadvocates.com/kpj-advocates-thoothukudi-logo.png" />
        <meta property="og:image:alt" content="Best Advocate in Thoothukudi — P. J. Jedidiah Koilson" />
        <meta property="og:site_name" content="KPJ Advocates" />
        <meta property="og:locale" content="en_IN" />
        <meta property="profile:first_name" content="Jedidiah" />
        <meta property="profile:last_name" content="Koilson" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | KPJ Advocates" />
        <meta name="twitter:description" content="Professional Advocate at KPJ Advocates, Thoothukudi. Expert in Civil, Property, Criminal & Family Law." />
        <meta name="twitter:image" content="https://kpjadvocates.com/kpj-advocates-thoothukudi-logo.png" />
      </Helmet>

      {/* ── Header ── */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-sm tracking-widest uppercase text-gold">About KPJ</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h1 className="text-h1 font-heading text-primary-foreground mb-4">Our Story</h1>
          <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto">
            Committed to justice and excellence in legal practice.
          </p>
        </div>
      </section>

      {/* ── History / Person Entity Section ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col items-center">
              <img
                src={lawyerImg}
                alt="P. J. Jedidiah Koilson B.A. LL.B — Advocate at KPJ Advocates, Thoothukudi, Tamil Nadu"
                title="Advocate P. J. Jedidiah Koilson — KPJ Advocates Thoothukudi"
                className="rounded-2xl shadow-xl w-full max-w-sm mx-auto object-cover aspect-[4/5] mb-4"
              />
              <div className="text-center">
                <h4 className="font-heading text-xl font-bold text-foreground">P. J. JEDIDIAH KOILSON B.A., LL.B</h4>
                <p className="font-body text-base text-accent italic mb-1">Advocate</p>
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">
                  Enrolled under THE BAR COUNCIL OF TAMILNADU & PUDUCHERRY
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="font-body text-sm tracking-widest uppercase text-gold">Our History</span>
              </div>
              <h2 className="text-h2 font-heading text-foreground mb-6">A Legacy of Advocacy</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                With over 25 years of advocacy and professionalism in the legal field, KPJ Advocates was established to honor and carry forward the legacy of our beloved father, K. Pon James.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Our firm is committed to justice and excellence embracing the values he practiced: serving the downtrodden, standing by the oppressed, and guided by strong moral and ethical principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-20 lg:py-28 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Our Values</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Mission & Core Values</h2>
            <p className="font-body text-base text-muted-foreground">
              Our mission is to provide exceptional legal representation while upholding the highest standards of ethics, professionalism, and service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={v.image}
                    alt={`${v.title} — KPJ Advocates legal value, Thoothukudi`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-accent shadow-sm">
                    <v.icon size={24} />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="font-body text-sm tracking-widest uppercase text-gold">Why Choose Us</span>
              </div>
              <h2 className="text-h2 font-heading text-white mb-8">Excellence in Legal Representation</h2>
              <div className="space-y-6">
                {[
                  { title: "Personalized Approach", desc: "We don't believe in one-size-fits-all. Every case is treated with bespoke strategy." },
                  { title: "Decades of Experience", desc: "Our team brings over 25 years of specialized knowledge across various legal domains." },
                  { title: "Result-Oriented", desc: "Our focus is always on achieving the most favorable outcome for our clients efficiently." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
                      <ChevronRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="font-body text-sm text-primary-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
              <img
                src={chooseUsImg}
                alt="Professional legal consultation at KPJ Advocates, Thoothukudi — P. J. Jedidiah Koilson"
                title="Excellence at KPJ Advocates — P. J. Jedidiah Koilson, Advocate Thoothukudi"
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center gap-2 justify-center mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="font-body text-sm tracking-widest uppercase text-gold">Our Vision</span>
                <div className="h-px w-10 bg-gold" />
              </div>
              <h2 className="text-h2 font-heading text-foreground mb-6">A Future Built on Justice</h2>
            </div>
            <div className="flex justify-center">
              <div className="max-w-xl w-full p-6 sm:p-10 rounded-3xl bg-ivory-dark border border-border relative group overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full group-hover:bg-gold/10 transition-colors" />
                <h4 className="font-heading text-2xl font-bold text-foreground mb-4">Vision</h4>
                <p className="font-body text-base text-muted-foreground leading-relaxed italic">
                  "Carrying forward the legacy"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
