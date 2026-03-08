import { Link } from "react-router-dom";
import { ChevronRight, Scale, Eye, Shield, Users } from "lucide-react";
import lawyerImg from "@/assets/jedidah koilson.jpeg";
import chooseUsImg from "@/assets/courtroom-excellence.png";


const values = [
  { icon: Scale, title: "Justice", desc: "Inspired by the Roman tradition of Justitia, we uphold fairness and equity in every case.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" },
  { icon: Eye, title: "Transparency", desc: "We believe in open communication and honest counsel throughout the legal process.", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800" },
  { icon: Shield, title: "Integrity", desc: "Our reputation is built on ethical practice and unwavering commitment to the law.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" },
  { icon: Users, title: "Client First", desc: "Every strategy and decision is made with our client's best interests at heart.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800" },
];

const About = () => {
  return (
    <>
      {/* Header */}
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

      {/* History */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col items-center">
              <img src={lawyerImg} alt="P. J. JEDIDIAH KOILSON B.A., LL.B, Advocate at KPJ Advocates" className="rounded-2xl shadow-xl w-full max-w-sm mx-auto object-cover aspect-[4/5] mb-4" />
              <div className="text-center">
                <h4 className="font-heading text-xl font-bold text-foreground">P. J. JEDIDIAH KOILSON B.A., LL.B</h4>
                <p className="font-body text-base text-accent italic mb-1">Advocate</p>
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">Enrolled under THE BAR COUNCIL OF TAMILNADU & PUDUCHERRY</p>
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

      {/* Mission & Values */}
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
                  <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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

      {/* Why Choose Us */}
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
                alt="Professional legal meeting"
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founders' Vision */}
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
