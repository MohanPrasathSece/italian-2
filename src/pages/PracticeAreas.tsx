import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Scale, Shield, Briefcase, Heart, Home as HomeIcon, BookOpen, ChevronRight } from "lucide-react";

const areas = [
  {
    icon: Scale,
    title: "Civil Law",
    desc: "Our civil litigation team handles a wide range of disputes including contract breaches, property matters, personal injury, and consumer protection. We employ strategic litigation techniques and alternative dispute resolution to achieve the best outcomes, ensuring that every legal avenue is explored for our clients.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Shield,
    title: "Criminal Law",
    desc: "From pre-trial investigation to courtroom defense, our criminal law team provides robust representation, ensuring your rights are protected. We handle cases ranging from white-collar crimes to serious offenses, bringing a meticulous approach to evidence analysis and defense strategy to secure justice.",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Briefcase,
    title: "Corporate Law",
    desc: "We advise businesses on corporate governance, mergers and acquisitions, regulatory compliance, and commercial contracts. Our legal experts help you navigate complex business landscapes with confidence, providing sound strategic advice on intellectual property, liability management, and corporate structuring.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Heart,
    title: "Family Law",
    desc: "Our family law practice provides compassionate counsel in matters of divorce, child custody, and family disputes. We prioritize amicable resolutions while vigorously protecting your family's interests, handling sensitive matters with the utmost discretion, care, and legal precision to ensure a smooth transition.",
    image: "/family-law.png"
  },
  {
    icon: HomeIcon,
    title: "Property Law",
    desc: "From residential purchases to commercial developments, our team handles conveyancing and land disputes with precision. We ensure that all property transactions are legally sound and that your ownership rights are fully protected through rigorous due diligence and clear, enforceable legal documentation.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: BookOpen,
    title: "Legal Consultation",
    desc: "Our comprehensive legal consultation service provides expert analysis and strategic advice across all areas of law. Whether you need a one-time legal opinion or ongoing advisory services, our team of experts is dedicated to providing clarity, direction, and risk assessment for any legal challenge.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
  },
];

const PracticeAreas = () => (
  <>
    <Helmet>
      <title>Legal Practice Areas | KPJ Advocates | P. J. Jedidiah Koilson</title>
      <meta name="description" content="Explore KPJ Advocates' wide range of legal services including Civil, Criminal, Corporate, Family, and Property Law in Thoothukudi. Led by P. J. Jedidiah Koilson." />
      <meta name="keywords" content="P. J. Jedidiah Koilson, Jedidiah Koilson, Jedediah Koilson, Jedidiyah Koilson, Judidiah Koilson, Civil Law, Criminal Law, Corporate Law, Family Law, Property Law, Legal Consultation, Top Lawyers Thoothukudi" />
      <link rel="canonical" href="https://kpjadvocates.com/practice-areas" />

      <meta property="og:title" content="Expert Legal Services | Practice Areas | KPJ Advocates" />
      <meta property="og:description" content="Discover our specialized legal expertise. We handle complex civil, criminal, and corporate matters in Tamil Nadu. Led by P. J. Jedidiah Koilson." />
      <meta property="og:url" content="https://kpjadvocates.com/practice-areas" />
    </Helmet>

    {/* Page Header */}
    <section className="py-20 lg:py-28 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="h-px w-10 bg-gold" />
          <span className="font-body text-sm tracking-widest uppercase text-gold">Our Expertise</span>
          <div className="h-px w-10 bg-gold" />
        </div>
        <h1 className="text-h1 font-heading text-primary-foreground mb-4">Practice Areas</h1>
        <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto">
          Comprehensive legal services built on decades of experience and a relentless pursuit of justice.
        </p>
      </div>
    </section>

    {/* Areas Grid */}
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div key={area.title} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-48 overflow-hidden relative">
                <img src={area.image} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-accent shadow-sm">
                  <area.icon size={24} />
                </div>
              </div>
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{area.title}</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-ivory-dark">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-h3 font-heading text-foreground mb-4">Need Legal Assistance?</h2>
        <p className="font-body text-base text-muted-foreground mb-8 max-w-lg mx-auto">
          Our experts are ready to help you navigate any legal challenge. Get in touch today.
        </p>
        <Link
          to="/contact"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
        >
          Request a Consultation <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  </>
);

export default PracticeAreas;
