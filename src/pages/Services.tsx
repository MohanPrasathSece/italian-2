import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, FileText, Users, Briefcase, Shield, MessageSquare, Landmark, Scale, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  {
    icon: Landmark,
    title: "Real Estate and Property",
    desc: "Strategic legal support in property transactions, title due diligence, and dispute resolution.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    points: ["Title Due Diligence", "RERA Compliance", "Property Documentation", "Boundary Disputes"]
  },
  {
    icon: Landmark,
    title: "Banking and Finance",
    desc: "Advisory and representation in banking transactions, regulatory compliance, and financial disputes.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    points: ["Regulatory Advisory", "IBC Proceedings", "Financial Disputes", "Compliance Audits"]
  },
  {
    icon: Briefcase,
    title: "Loan Recovery & SARFAESI Act",
    desc: "Comprehensive enforcement and recovery proceedings under the SARFAESI Act and mechanisms.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    points: ["Strategic Enforcement", "SARFAESI Actions", "Statutory Compliance", "Debt Recovery Advice"]
  },
  {
    icon: FileText,
    title: "Legal Notices and Compliance",
    desc: "Precise drafting, strategic response, and regulatory compliance solutions across diverse sectors.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    points: ["Drafting Official Notices", "Sector Compliance", "Strategic Responses", "Regulatory Filings"]
  },
  {
    icon: Users,
    title: "Family Disputes",
    desc: "Discreet and solution-oriented representation in matrimonial and family law matters.",
    image: "https://images.unsplash.com/photo-1591115765373-520f765ff793?auto=format&fit=crop&q=80&w=800",
    points: ["Matrimonial Resolution", "Child Custody", "Property Partition", "Amicable Mediation"]
  },
  {
    icon: BookOpen,
    title: "Non-Litigation Matters",
    desc: "Comprehensive advisory, documentation, and preventive legal strategies for regulatory matters.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
    points: ["Transactional Advisory", "Preventive Documentation", "Contract Management", "Legal Opinions"]
  },
  {
    icon: Shield,
    title: "NBFC Legal Operations",
    desc: "Regulatory-aligned legal support for NBFC operations, compliance, and recovery functions.",
    image: "https://images.unsplash.com/photo-1544717305-27a734ef1904?auto=format&fit=crop&q=80&w=800",
    points: ["Operational Compliance", "Recovery Functions", "Portfolio Auditing", "Regulatory Alignment"]
  },
  {
    icon: Users,
    title: "MCOP and Consumer Court Cases",
    desc: "Focused representation in motor accident claims and consumer protection litigation.",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=800",
    points: ["Accident Claims", "Consumer Protection", "Insurance Disputes", "Court Representation"]
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    desc: "Strategic representation before High Courts, District Courts, and specialized tribunals.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    points: ["High Court Advocacy", "District Court Cases", "Tribunal Representation", "Strategic Litigation"]
  },
];

const faqs = [
  { q: "How do I get started with KPJ Advocates?", a: "Simply fill out the consultation request below, give us a call, or visit our office. We'll schedule an initial meeting to understand your needs and recommend the best course of action." },
  { q: "What should I bring to my first consultation?", a: "Bring any relevant documents, contracts, correspondence, or evidence related to your matter. The more information you provide, the better we can assess your situation and advise accordingly." },
  { q: "Are virtual consultations available?", a: "Yes, we offer virtual consultations via video call for clients who prefer remote meetings. These are available for both initial consultations and ongoing case management." },
  { q: "How are your fees structured?", a: "We offer transparent, competitive pricing. Depending on the case, we may charge hourly rates, fixed fees, or contingency-based arrangements. Fees are discussed upfront during your initial consultation." },
];

const Services = () => (
  <>
    <Helmet>
      <title>Legal Services | KPJ Advocates | P. J. Jedidiah Koilson</title>
      <meta name="description" content="Explore the comprehensive legal services offered by KPJ Advocates in Thoothukudi. Specialized in Civil, Criminal, Property, and Banking law by P. J. Jedidiah Koilson." />
      <meta name="keywords" content="P. J. Jedidiah Koilson, Jedidiah Koilson, Jedediah Koilson, Jedidiyah Koilson, Judidiah Koilson, Property law Thoothukudi, Banking lawyer Tamil Nadu, SARFAESI Act expert, Family law consultation" />
      <link rel="canonical" href="https://kpjadvocates.com/services" />

      <meta property="og:title" content="Expert Legal Services in Thoothukudi | KPJ Advocates" />
      <meta property="og:description" content="Providing high-stakes legal solutions for property, banking, and civil disputes. Led by P. J. Jedidiah Koilson." />
      <meta property="og:url" content="https://kpjadvocates.com/services" />
    </Helmet>

    {/* Page Header */}
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

    {/* Services Grid Implementation */}
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((s, i) => (
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

    {/* Dedicated CTA Section */}
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

    {/* FAQ Section with Refined Design */}
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
