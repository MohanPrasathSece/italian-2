import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, FileText, Users, Briefcase, Shield, Landmark, Scale, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ──────────────────────────────────────────────────────────────────
// SERVICES PAGE SEO — Service + FAQ schema
// ──────────────────────────────────────────────────────────────────
const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://kpjadvocates.com/services#list",
  "name": "Legal Services — KPJ Advocates | P. J. Jedidiah Koilson",
  "description": "Comprehensive legal services provided by Advocate P. J. Jedidiah Koilson at KPJ Advocates, Thoothukudi, Tamil Nadu.",
  "url": "https://kpjadvocates.com/services",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Real Estate and Property Law", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 2, "name": "Banking and Finance Law", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Loan Recovery & SARFAESI Act", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 4, "name": "Legal Notices and Compliance", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 5, "name": "Family Disputes", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 6, "name": "Non-Litigation Matters", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 7, "name": "NBFC Legal Operations", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 8, "name": "MCOP and Consumer Court Cases", "url": "https://kpjadvocates.com/services" },
    { "@type": "ListItem", "position": 9, "name": "Dispute Resolution", "url": "https://kpjadvocates.com/services" }
  ]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://kpjadvocates.com/services#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get started with KPJ Advocates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply fill out the consultation request on our website, call +91 95003 26495, or visit our office at Pearl Plaza, Devarpuram Road, Thoothukudi. We'll schedule an initial meeting to understand your needs and recommend the best course of action."
      }
    },
    {
      "@type": "Question",
      "name": "What should I bring to my first consultation with Advocate P. J. Jedidiah Koilson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bring any relevant documents, contracts, correspondence, or evidence related to your matter. The more information you provide, the better Advocate Jedidiah Koilson can assess your situation and advise accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "Are virtual consultations available at KPJ Advocates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, KPJ Advocates offers virtual consultations via video call for clients who prefer remote meetings. These are available for both initial consultations and ongoing case management."
      }
    },
    {
      "@type": "Question",
      "name": "How are legal fees structured at KPJ Advocates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer transparent, competitive pricing. Depending on the case, we may charge hourly rates, fixed fees, or contingency-based arrangements. Fees are discussed upfront during your initial consultation with Advocate P. J. Jedidiah Koilson."
      }
    }
  ]
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kpjadvocates.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://kpjadvocates.com/services" }
  ]
};

// ──────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Landmark,
    title: "Real Estate and Property",
    desc: "Strategic legal support in property transactions, title due diligence, and dispute resolution.",
    points: ["Title Due Diligence", "RERA Compliance", "Property Documentation", "Boundary Disputes"]
  },
  {
    icon: Landmark,
    title: "Banking and Finance",
    desc: "Advisory and representation in banking transactions, regulatory compliance, and financial disputes.",
    points: ["Regulatory Advisory", "IBC Proceedings", "Financial Disputes", "Compliance Audits"]
  },
  {
    icon: Briefcase,
    title: "Loan Recovery & SARFAESI Act",
    desc: "Comprehensive enforcement and recovery proceedings under the SARFAESI Act and mechanisms.",
    points: ["Strategic Enforcement", "SARFAESI Actions", "Statutory Compliance", "Debt Recovery Advice"]
  },
  {
    icon: FileText,
    title: "Legal Notices and Compliance",
    desc: "Precise drafting, strategic response, and regulatory compliance solutions across diverse sectors.",
    points: ["Drafting Official Notices", "Sector Compliance", "Strategic Responses", "Regulatory Filings"]
  },
  {
    icon: Users,
    title: "Family Disputes",
    desc: "Discreet and solution-oriented representation in matrimonial and family law matters.",
    points: ["Matrimonial Resolution", "Child Custody", "Property Partition", "Amicable Mediation"]
  },
  {
    icon: BookOpen,
    title: "Non-Litigation Matters",
    desc: "Comprehensive advisory, documentation, and preventive legal strategies for regulatory matters.",
    points: ["Transactional Advisory", "Preventive Documentation", "Contract Management", "Legal Opinions"]
  },
  {
    icon: Shield,
    title: "NBFC Legal Operations",
    desc: "Regulatory-aligned legal support for NBFC operations, compliance, and recovery functions.",
    points: ["Operational Compliance", "Recovery Functions", "Portfolio Auditing", "Regulatory Alignment"]
  },
  {
    icon: Users,
    title: "MCOP and Consumer Court Cases",
    desc: "Focused representation in motor accident claims and consumer protection litigation.",
    points: ["Accident Claims", "Consumer Protection", "Insurance Disputes", "Court Representation"]
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    desc: "Strategic representation before High Courts, District Courts, and specialized tribunals.",
    points: ["High Court Advocacy", "District Court Cases", "Tribunal Representation", "Strategic Litigation"]
  },
];

const faqs = [
  { q: "How do I get started with KPJ Advocates?", a: "Simply fill out the consultation request below, call +91 95003 26495, or visit our office at Pearl Plaza, Devarpuram Road, Thoothukudi. We'll schedule an initial meeting to understand your needs." },
  { q: "What should I bring to my first consultation?", a: "Bring any relevant documents, contracts, correspondence, or evidence related to your matter. The more information you provide, the better we can assess your situation and advise accordingly." },
  { q: "Are virtual consultations available?", a: "Yes, we offer virtual consultations via video call for clients who prefer remote meetings. These are available for both initial consultations and ongoing case management." },
  { q: "How are your fees structured?", a: "We offer transparent, competitive pricing. Depending on the case, we may charge hourly rates, fixed fees, or contingency-based arrangements. Fees are discussed upfront during your initial consultation." },
];

const Services = () => (
  <>
    <Helmet>
      <title>Services | KPJ Advocates</title>
      <meta name="description" content="Comprehensive legal services in Thoothukudi (Tuticorin). #1 Advocate P. J. Jedidiah Koilson provides expert counsel in Property, Banking, Family, and Criminal law." />
      <meta name="keywords" content="Best legal services in Thoothukudi, Best advocate in Thoothukudi, Tuticorin lawyer, Criminal lawyer Thoothukudi, Property law Tuticorin, Family law advocate Thoothukudi, P. J. Jedidiah Koilson" />
      <link rel="canonical" href="https://kpjadvocates.com/services" />
      <meta name="robots" content="index, follow" />

      <script type="application/ld+json">{JSON.stringify(SERVICES_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>

      <meta property="og:title" content="Services | KPJ Advocates" />
      <meta property="og:description" content="Top-rated legal expertise in Thoothukudi. Real Estate, Banking, and Criminal law led by Advocate P. J. Jedidiah Koilson." />
      <meta property="og:url" content="https://kpjadvocates.com/services" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://kpjadvocates.com/kpj-advocates-thoothukudi-logo.png" />
      <meta property="og:site_name" content="KPJ Advocates" />
    </Helmet>

    {/* ── Page Header ── */}
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="h-px w-10 bg-gold" />
          <span className="font-body text-sm tracking-widest uppercase text-gold">Our Expertise</span>
          <div className="h-px w-10 bg-gold" />
        </div>
        <h1 className="text-h1 font-heading text-primary-foreground mb-6">Services</h1>
        <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
          At KPJ Advocates, we combine deep legal expertise with a commitment to achieving excellence for every client we serve.
        </p>
      </div>
    </section>

    {/* ── Services Grid ── */}
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-card rounded-[2rem] p-8 lg:p-10 border border-border hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(184,134,11,0.08)] transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-ivory-dark border border-border flex items-center justify-center text-accent mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                  <s.icon size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-2">
                  {s.points && s.points.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm font-body text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center text-primary-foreground">
        <h2 className="text-h2 font-heading text-white mb-6">Ready to Resolve Your Legal Matters?</h2>
        <p className="font-body text-lg opacity-80 mb-10 max-w-2xl mx-auto">
          Schedule a consultation with our experienced legal team today and take the first step towards justice.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity uppercase"
        >
          Book a Consultation
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>

    {/* ── FAQ Section ── */}
    <section className="py-24 lg:py-32 bg-ivory-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-gold">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs font-bold tracking-widest uppercase">Knowledge Center</span>
            </div>
            <h2 className="text-4xl font-heading text-foreground mb-6">Frequently Asked Questions</h2>
            <p className="font-body text-muted-foreground mb-8 text-lg">
              Find answers to common questions about our legal process and how we can work together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-white rounded-xl shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
            >
              Still Have Questions?
            </Link>
          </div>

          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-2xl border border-border px-8 shadow-sm data-[state=open]:border-gold/30 transition-all duration-300">
                  <AccordionTrigger className="font-heading text-lg font-bold text-foreground hover:text-gold py-6 hover:no-underline text-left transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base text-muted-foreground leading-relaxed pb-6 pr-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Services;
