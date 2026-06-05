import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Briefcase, Send, Copy, Check } from "lucide-react";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kpjadvocates.com/" },
    { "@type": "ListItem", "position": 2, "name": "Work With Us", "item": "https://kpjadvocates.com/work-with-us" }
  ]
};

const WorkWithUs = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("info@kpjadvocates.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Work With Us | KPJ Advocates</title>
        <meta
          name="description"
          content="If you wish to work with us, please share your CV to info@kpjadvocates.com."
        />
        <link rel="canonical" href="https://kpjadvocates.com/work-with-us" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
      </Helmet>

      {/* ── Page Header ── */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-sm tracking-widest uppercase text-gold">Careers</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h1 className="text-h1 font-heading text-primary-foreground mb-4">Work With Us</h1>
        </div>
      </section>

      {/* ── Content Section with Centered Card ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 flex justify-center">
          <div className="w-full max-w-xl bg-card p-8 lg:p-10 rounded-2xl shadow-xl border border-border text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full" />
            
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto text-accent mb-6">
              <Briefcase size={28} />
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Application Details</h3>
            
            <div className="my-6 p-6 bg-ivory-dark rounded-xl border border-gold/20">
              <p className="font-body text-base text-foreground leading-relaxed">
                If you wish to work with us, please share your CV to{" "}
                <a href="mailto:info@kpjadvocates.com" className="text-accent font-semibold hover:underline">
                  info@kpjadvocates.com
                </a>
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <a
                href="mailto:info@kpjadvocates.com?subject=CV Application - Career Opportunity&body=Dear KPJ Advocates Team,%0D%0A%0D%0AI am writing to express my interest in working with KPJ Advocates. Please find my CV attached for your review.%0D%0A%0D%0ARegards,"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-md"
              >
                <Send size={16} />
                Email CV Directly
              </a>

              <button
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border border-border bg-background text-foreground font-body text-sm font-semibold tracking-wide hover:bg-muted transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Email Address
                  </>
                )}
              </button>
            </div>

            <p className="font-body text-xs text-muted-foreground mt-8 leading-relaxed">
              We look forward to receiving your profile. Our team reviews all submissions and will reach out if a matching position or internship opportunity is open.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;
