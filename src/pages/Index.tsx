import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Scale, Shield, Users, Award, Briefcase, Heart, Home as HomeIcon, BookOpen, ChevronRight, Landmark, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero_bg_@.jpg";
import lawyerImg from "@/assets/jedidah koilson.jpeg";

import Counter from "@/components/Counter";

const practiceAreas = [
  {
    icon: HomeIcon,
    title: "Real Estate and Property",
    desc: "Strategic legal support in property transactions, title due diligence, survey matters, RERA compliance, documentation, and dispute resolution.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Landmark,
    title: "Banking and Finance",
    desc: "Advisory and representation in banking transactions, regulatory compliance, Insolvency and Bankruptcy Code (IBC) proceedings, and financial disputes.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Briefcase,
    title: "Loan Recovery & SARFAESI Act",
    desc: "Comprehensive enforcement and recovery proceedings, including actions under the SARFAESI Act and related statutory mechanisms.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: FileText,
    title: "Legal Notices and Compliance",
    desc: "Precise drafting, strategic response, and regulatory compliance solutions across diverse sectors.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Heart,
    title: "Family Disputes",
    desc: "Discreet and solution-oriented representation in matrimonial and family law matters.",
    image: "https://images.unsplash.com/photo-1591115765373-520f765ff793?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: BookOpen,
    title: "Non-Litigation Matters",
    desc: "Comprehensive advisory, documentation, and preventive legal strategies for transactional and regulatory matters.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Shield,
    title: "NBFC Legal Operations",
    desc: "Regulatory-aligned legal support for NBFC operations, compliance management, and recovery functions.",
    image: "https://images.unsplash.com/photo-1544717305-27a734ef1904?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Users,
    title: "MCOP and Consumer Court Cases",
    desc: "Focused representation in motor accident claims and consumer protection litigation.",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    desc: "Strategic representation before High Courts, District Courts, and specialized tribunals across jurisdictions.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 60, suffix: "+", label: "Cases" },
];

const faqs = [
  { q: "What types of cases does KPJ Advocates handle?", a: "We handle a comprehensive range of legal matters including civil, criminal, corporate, family, and property law. We provide tailored solutions for individuals and businesses alike." },
  { q: "Do you represent in other districts?", a: "We represent cases all over Tamil Nadu." },
  { q: "How do I schedule a consultation?", a: "You can request a consultation through our website, call our office directly, or visit us in person. We offer both in-person and virtual consultations for your convenience." },
  { q: "What are your legal fees and payment options?", a: "Our fees vary depending on the complexity and nature of the case. We offer transparent pricing and flexible payment arrangements. Contact us for a detailed consultation on fees." },
  { q: "How long does a typical legal case take?", a: "The timeline depends on the type and complexity of the case. During your initial consultation, we provide a realistic timeline and keep you informed throughout the process." },
  { q: "Do you offer pro bono legal services?", a: "Yes, KPJ Advocates is committed to access to justice. We selectively take on pro bono cases as part of our commitment to community service." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KPJ Advocates | Best Law Firm in Thoothukudi | Expert Legal Consultation</title>
        <meta name="description" content="KPJ Advocates is a leading law firm in Thoothukudi, Tamil Nadu. Expert legal services in Civil, Criminal, Property, and Family Law cases. Schedule your consultation with our experienced advocates today." />
        <meta name="keywords" content="KPJ Advocates, Law firm in Thoothukudi, Best lawyer in Tuticorin, Civil advocate Thoothukudi, Property law experts, Criminal defense lawyer Tamil Nadu, Top law firm for family disputes, Legal notices Thoothukudi, NBFC legal support" />
        <link rel="canonical" href="https://kpjadvocates.com/" />

        <meta property="og:title" content="KPJ Advocates | Expert Legal Solutions in Thoothukudi" />
        <meta property="og:description" content="Experience justice with integrity. Specialized legal services for civil, property, and corporate cases in Thoothukudi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kpjadvocates.com/" />
        <meta property="og:image" content="https://kpjadvocates.com/kpj_main_logo.png" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Legal background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="font-body text-body-lg text-white mb-4 max-w-lg drop-shadow-lg opacity-90 italic">
              "Speak up for those who cannot speak for themselves" — Proverbs 31:8
            </p>
            <h1 className="text-h1 font-heading text-white mb-6 leading-tight drop-shadow-2xl">
              Justice, <span className="text-gold">Integrity</span> <br />& <span className="text-gold text-glow">Excellence</span>
            </h1>
            <p className="font-body text-base text-white/80 mb-10 max-w-lg drop-shadow-md">
              A premier law firm delivering trusted legal services with a commitment to truth, fairness, and the rule of law.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide shadow-xl shadow-accent/20 hover:scale-105 transition-all"
              >
                Request a Consultation
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="font-body text-sm tracking-widest uppercase text-gold">About Our Firm</span>
              </div>
              <h2 className="text-h2 font-heading text-foreground mb-6">
                Dynamic Legal Advocacy in Tuticorin
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Founded in 2026, KPJ Advocates is a dynamic law firm based in Tuticorin committed to providing exceptional legal services. We are focused on civil matters, delivering strategic legal solutions and advocating relentlessly for our clients.
              </p>
              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent hover:opacity-80 transition-opacity"
              >
                Read Our Full Story <ChevronRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="order-1 lg:order-2 flex flex-col items-center"
            >
              <img
                src={lawyerImg}
                alt="P. J. JEDIDIAH KOILSON B.A., LL.B, Advocate at KPJ Advocates"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto object-cover aspect-[4/5] mb-6"
              />
              <div className="text-center">
                <h4 className="font-heading text-2xl font-bold text-foreground">P. J. JEDIDIAH KOILSON B.A., LL.B</h4>
                <p className="font-body text-base text-accent italic font-medium mb-1">Advocate</p>
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest px-4">
                  Enrolled under THE BAR COUNCIL OF TAMILNADU & PUDUCHERRY
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 lg:py-28 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Our Expertise</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Practice Areas</h2>
            <p className="font-body text-base text-muted-foreground">
              Comprehensive legal services tailored to protect your rights and advance your interests.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, idx) => (
              <motion.div
                key={area.title}
                {...fadeInUp}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border group"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                  <area.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{area.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/practice-areas"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              View All Practice Areas <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose KPJ */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Why Choose Us</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-primary-foreground mb-4">Verified Excellence</h2>
            <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto mb-16">
              A track record of dedicated advocacy and successful outcomes.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                {...fadeInUp}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Counter end={s.value} suffix={s.suffix} duration={2000} />
                <p className="font-body text-base text-primary-foreground/80">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Our Approach Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Our Process</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">The Pathway to Justice</h2>
            <p className="font-body text-base text-muted-foreground">
              A systematic and dedicated approach to every legal challenge, ensuring clarity and results at every step.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left">
            {[
              { id: "01", title: "Initial Consultation", desc: "We begin by understanding your unique legal challenges and goals through a deep-dive consultation." },
              { id: "02", title: "Strategic Planning", desc: "Our experts craft a tailored strategy combining classical legal wisdom with modern strategic insights." },
              { id: "03", title: "Effective Representation", desc: "We represent your interests with vigor and precision, ensuring the best possible outcome for your case." }
            ].map((step, idx) => (
              <motion.div
                key={step.id}
                {...fadeInUp}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <span className="font-heading text-xl font-bold text-accent">{step.id}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">FAQ</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="font-body text-base text-muted-foreground">
              Find answers to common questions about our legal services.
            </p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6 shadow-sm">
                  <AccordionTrigger className="font-body text-base font-medium text-foreground hover:text-accent py-5 hover:no-underline text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 lg:py-24 bg-white border-y border-border relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-h2 font-heading text-foreground mb-4">Ready to Discuss Your Case?</h2>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto mb-8">
            Get in touch with our experienced legal team today. We're here to protect your rights and fight for your interests.
          </p>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide shadow-lg shadow-accent/20 hover:scale-105 transition-all"
          >
            Request a Consultation <ChevronRight size={16} />
          </Link>
        </div>
      </motion.section>
    </>
  );
};

export default Index;
