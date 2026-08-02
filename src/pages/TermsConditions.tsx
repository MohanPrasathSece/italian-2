import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft, AlertTriangle, ShieldCheck, Scale, Users, Cpu, Globe, Gavel, Award, MessageSquare, Landmark, Ban } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const SECTIONS = [
  {
    id: "acceptance",
    icon: ShieldCheck,
    title: "1. Acceptance of Terms",
    body:
      "By accessing, browsing, or using the theSilverStone Capital website (the \"Site\"), any features, content, forms, or services made available by theSilverStone Capital (\"we,\" \"us,\" \"our,\" or \"the Company\"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms & Conditions (\"Terms\"). If you do not agree with any part of these Terms, you must discontinue use of the Site immediately. Continued use following any posted update to these Terms constitutes your acceptance of the revised Terms.",
  },
  {
    id: "eligibility",
    icon: Users,
    title: "2. Eligibility",
    body:
      "Use of the Site and any services offered is available only to individuals and entities that can form legally binding contracts under applicable law. Without limiting the foregoing, you must be at least eighteen (18) years of age, or the age of majority in your jurisdiction of residence (whichever is higher). The Site is not intended for use by any person in any jurisdiction where such use would be contrary to local law or regulation, or where we are not licensed or authorized to operate. It is your responsibility to ensure you may lawfully access the Site from your location.",
  },
  {
    id: "purpose",
    icon: Globe,
    title: "3. Website Purpose & Nature",
    body:
      "theSilverStone Capital is an educational, informational, and client-facing digital asset investment platform. The Site provides general information about digital assets, blockchain technology, portfolio management, and investor education materials. Any descriptions of strategies, historical performance, allocations, or market views are for illustrative, educational, and marketing purposes only. They do not represent the performance of any specific investor, guarantee any future outcome, or constitute a binding offer.",
  },
  {
    id: "responsibilities",
    icon: Users,
    title: "4. User Responsibilities",
    body:
      "You are responsible for: (a) ensuring the accuracy of any information you provide to us, including contact details; (b) safeguarding any login credentials, session tokens, or device access related to your account; (c) using the Site in compliance with all applicable national, federal, state, and local laws; (d) immediately notifying us of any unauthorized account use or suspected breach; and (e) refraining from impersonating any person or entity or misrepresenting your affiliation or authority to act on behalf of another.",
  },
  {
    id: "acceptable-use",
    icon: Ban,
    title: "5. Acceptable Use Policy",
    body:
      "You agree not to, and not to permit any third party to: (a) use the Site for any unlawful purpose, including fraud, money laundering, terrorist financing, or market manipulation; (b) upload, transmit, or distribute malware, ransomware, viruses, or any code designed to interrupt or compromise any system; (c) attempt to gain unauthorized access to the Site, backend systems, Vercel Blob Storage, CRM endpoints, or other users' accounts; (d) reverse engineer, scrape, crawl, or monitor the Site via automated means without our written permission; (e) submit false, misleading, defamatory, or infringing content through any form or communication channel; or (f) interfere with, overload, or attack the infrastructure that hosts the Site.",
  },
  {
    id: "ip",
    icon: Award,
    title: "6. Intellectual Property Rights",
    body:
      "All content on the Site — including but not limited to text, graphics, logos, icons, images, audio, video, software, animations, UI components, data compilations, custom illustrations, selection and arrangement of materials, and our trade names, trademarks, and service marks (including theSilverStone Capital and related indicia) — are the exclusive property of theSilverStone Capital or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws worldwide. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Site for your personal, non-commercial, informational purposes. No right, title, or interest is transferred to you.",
  },
  {
    id: "crypto-risk",
    icon: AlertTriangle,
    title: "7. Cryptocurrency Risk Disclosure",
    body:
      "Digital assets and cryptocurrencies (Bitcoin, Ethereum, stablecoins, tokens, and all related instruments) are HIGH-RISK, HIGH-VOLATILITY financial instruments. Prices can and frequently do move 20% or more in a single day. Investors must be prepared to lose their entire invested capital. Risks include, but are not limited to: extreme price volatility; exchange failures, fraud, and hacking; smart contract bugs, exploits, and rug pulls; regulatory and legislative action in any jurisdiction; illiquidity and difficulty of exiting positions; forks, airdrops, and protocol-level changes; technological obsolescence; and operational risks of any blockchain network, wallet, bridge, or custodian. Before investing, you should carefully consider your objectives, experience, financial situation, and risk appetite.",
  },
  {
    id: "no-financial-advice",
    icon: Landmark,
    title: "8. No Financial Advice",
    body:
      "NOTHING ON THE SITE CONSTITUTES FINANCIAL, LEGAL, TAX, INVESTMENT, OR ACCOUNTING ADVICE. THE SITE IS PROVIDED FOR GENERAL INFORMATION AND EDUCATION ONLY AND IS NOT A RECOMMENDATION OR SOLICITATION TO BUY, SELL, HODL, OR OTHERWISE DEAL IN ANY CRYPTOCURRENCY, TOKEN, SECURITY, DERIVATIVE, OR FINANCIAL INSTRUMENT. ALL STRATEGY DESCRIPTIONS AND ALLOCATIONS ARE PRESENTED FOR ILLUSTRATIVE PURPOSES. Before making any investment decision, you should consult with properly licensed and qualified professional advisors in your jurisdiction, including financial, tax, and legal advisors. We do not tailor any content to the specific circumstances of any individual viewer.",
  },
  {
    id: "no-investment-advice",
    icon: Gavel,
    title: "9. No Investment Advice; Suitability",
    body:
      "The Company does not provide personalized investment advice through this website. Any enrolment in a managed strategy or any portfolio allocation is subject to a separate, executed client agreement and an onboarding process that includes suitability assessment, risk classification, and appropriate disclosures. The information contained here is general and does not take into account your investment objectives, financial situation, tax status, or particular needs, and should therefore not be relied upon as authoritative.",
  },
  {
    id: "no-guarantees",
    icon: Cpu,
    title: "10. No Guaranteed Returns",
    body:
      "ALL INVESTMENTS INVOLVE RISK, AND THERE CAN BE NO GUARANTEE OF FUTURE RESULTS. PAST PERFORMANCE, INDICATED OR OTHERWISE, IS NOT INDICATIVE OF FUTURE RESULTS. ALL PERCENTAGES, FIGURES, PROJECTIONS, AND AUM STATEMENTS ARE PRESENTED AS ILLUSTRATIVE METRICS FOR MARKETING PURPOSES AND ARE NOT A GUARANTEE, TARGET, OR PROJECTION OF THE PERFORMANCE OF ANY PARTICULAR OFFERING OR CLIENT ACCOUNT. YOU MAY LOSE SOME OR ALL OF YOUR INVESTED CAPITAL.",
  },
  {
    id: "liability",
    icon: Scale,
    title: "11. Limitation of Liability",
    body:
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CRYPTOVEST CAPITAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, PARTNERS, CONTRACTORS, AFFILIATES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, OUR LIABILITY SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW. NOTWITHSTANDING ANYTHING TO THE CONTRARY, OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE SITE SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM, OR ONE HUNDRED UNITED STATES DOLLARS (USD 100.00) IF NO SUCH PAYMENTS HAVE BEEN MADE.",
  },
  {
    id: "privacy",
    icon: ShieldCheck,
    title: "12. Privacy",
    body:
      "Your use of the Site is also governed by our Privacy Policy, which is incorporated by reference into these Terms. The Privacy Policy explains how we collect, use, share, and protect your personal information, including the processing of enquiries through our CRM, session storage, and cookies. Please review the Privacy Policy in full before using the Site.",
  },
  {
    id: "law",
    icon: Gavel,
    title: "13. Governing Law & Venue",
    body:
      "These Terms, and any dispute, claim, controversy, or matter (including non-contractual disputes) arising out of or relating to these Terms or the Site, shall be governed by and construed in accordance with the laws of the Republic of Singapore, without regard to its conflict-of-laws rules. The parties irrevocably submit to the exclusive jurisdiction of the courts of Singapore to settle any such dispute. Nothing in this clause shall prevent us from seeking injunctive or other equitable relief in any court of competent jurisdiction to protect our intellectual property, systems, or confidential information.",
  },
  {
    id: "disputes",
    icon: Gavel,
    title: "14. Dispute Resolution",
    body:
      "Prior to initiating any formal proceedings, you agree to first attempt to resolve any dispute informally by sending a written notice to our legal team with a clear description of the dispute, the relevant facts, and the relief you seek. We will then attempt in good faith to resolve the dispute through direct consultation within a period of thirty (30) calendar days from receipt of the notice. If the dispute is not resolved within that period, either party may then initiate formal proceedings in accordance with Section 13 (Governing Law & Venue).",
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "15. Contact",
    body:
      "Questions, notices, or requests regarding these Terms should be directed to: theSilverStone Capital. Communications received through the above channels shall be deemed received upon confirmation from our systems.",
  },
];

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | theSilverStone Capital</title>
        <meta name="description" content="theSilverStone Capital terms & conditions. Important disclaimers including cryptocurrency risk disclosure, no financial advice, no guaranteed returns, and limitation of liability." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://thesilverstonecapital.com/terms" />
      </Helmet>

      <div className="pt-28 sm:pt-32 pb-16 min-h-screen bg-background">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-ivory-dark via-background to-background">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-4xl px-4 lg:px-8 relative z-10 py-14 sm:py-20">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
                <FileText size={14} className="text-accent" />
                <span className="font-body text-[11px] uppercase tracking-widest text-accent font-semibold">Legal Agreement</span>
              </div>
              <h1 className="text-h1 font-heading text-foreground mb-4 leading-tight">Terms &amp; Conditions</h1>
              <p className="font-body text-base text-muted-foreground max-w-3xl leading-relaxed">
                Please read these terms carefully before using the theSilverStone Capital website. They include important disclaimers, risk warnings, and limitations of liability. By accessing or using the Site, you agree to be bound by these Terms &amp; Conditions in full.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                {[
                  { Icon: AlertTriangle, label: "High Risk Assets", tone: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
                  { Icon: ShieldCheck, label: "No Financial Advice", tone: "text-rose-600 bg-rose-500/10 border-rose-500/20" },
                  { Icon: Award, label: "All Rights Reserved", tone: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
                ].map(({ Icon, label, tone }) => (
                  <div key={label} className={`flex items-center gap-2.5 rounded-xl border ${tone} px-4 py-3 backdrop-blur`}>
                    <Icon size={18} />
                    <span className="font-body text-xs font-semibold tracking-wide uppercase">{label}</span>
                  </div>
                ))}
              </div>

              <p className="font-body text-xs text-muted-foreground mt-6">
                <strong className="text-foreground">Last updated:</strong> July 2025 · Effective as of the date posted above.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-4xl px-4 lg:px-8 py-12 sm:py-16 space-y-8">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.article
                key={section.id}
                id={section.id}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="scroll-mt-28 rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 sm:p-8 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground pt-1.5">
                    {section.title}
                  </h2>
                </div>
                <p
                  className="font-body text-base leading-[1.8] text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </motion.article>
            );
          })}

          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 backdrop-blur"
          >
            <h3 className="font-heading text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <AlertTriangle size={18} className="text-gold" /> Final Acknowledgement
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              You expressly acknowledge and agree that your use of the Site is at your sole risk. The Site is provided on an \"AS IS\" and \"AS AVAILABLE\" basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We make no warranty that the Site will meet your requirements, be uninterrupted, secure, timely, accurate, or error-free.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
