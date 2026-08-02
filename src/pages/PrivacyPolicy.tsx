import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, FileText, ArrowLeft, Cookie, Database, Users, Server, Lock, Mail, Scale } from "lucide-react";

const SECTIONS = [
  {
    id: "information",
    icon: Database,
    title: "1. Information We Collect",
    items: [
      "<strong>Information you provide directly:</strong> Full name, email address, phone number, country of residence, and any message or enquiry you submit through our forms.",
      "<strong>Signup & authentication:</strong> Your email address, optional phone number, and country code for login (email-only authentication via Vercel Blob).",
      "<strong>Automatically collected data:</strong> Device type, browser, operating system, IP address (anonymized where required by law), referring website, pages visited, and timestamp.",
      "<strong>Cookies & similar technologies:</strong> Session tokens, preferences, basic analytics to understand how the website is used.",
    ],
  },
  {
    id: "usage",
    icon: FileText,
    title: "2. How We Use Your Information",
    items: [
      "<strong>Service delivery:</strong> Create and authenticate your account, respond to enquiries, process your investor onboarding, and deliver educational content.",
      "<strong>Investor communications:</strong> Send service-related emails, account notifications, strategy updates, and performance reports you are entitled to.",
      "<strong>CRM Processing:</strong> Submitted enquiries and signups are forwarded to our licensed CRM partner for lead management, client relationship tracking, and compliance purposes.",
      "<strong>Security & fraud prevention:</strong> Monitor for suspicious activity, maintain audit logs, and protect both our systems and your assets.",
      "<strong>Product improvement:</strong> Aggregated, de-identified usage statistics to improve our website, strategies, and educational materials.",
      "<strong>Legal compliance:</strong> Comply with AML/KYC requirements, sanctions screening, tax reporting, and other legal obligations where applicable.",
    ],
  },
  {
    id: "crm",
    icon: Server,
    title: "3. CRM & Lead Processing",
    items: [
      "When you submit a signup, contact, or enquiry form, the data you provide is sent to our secure CRM endpoint (<code>inwo.crmcore.me</code>) over encrypted TLS.",
      "CRM data is transmitted only from our backend; your browser never communicates directly with the CRM and never receives CRM credentials or tokens.",
      "Data sent to the CRM may include your name, email, phone, country, and optional message. It does <strong>not</strong> include passwords (we do not use passwords), authentication tokens, or payment card data.",
      "CRM records are retained according to our data retention schedule (see Section 8) and may be used by authorized compliance and relationship managers to contact you with relevant information.",
      "If the CRM identifies your email or phone as an existing record, we transparently continue your request rather than creating duplicates. You will receive a friendly message in that event.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "4. Cookies & Tracking",
    items: [
      "<strong>Essential cookies:</strong> Strictly required to operate the site, maintain your authenticated session, and remember basic preferences such as region. These cannot be disabled if you wish to use the service.",
      "<strong>Analytics cookies:</strong> Aggregate, privacy-friendly analytics to help us understand traffic patterns and content performance. Data is anonymized and not shared with advertising partners.",
      "<strong>Third-party tracking:</strong> We do not currently sell data or share personal information with third-party ad networks, data brokers, or advertising exchanges.",
      "You may disable cookies via your browser settings. Please note that certain features (e.g., maintaining a logged-in session) may not function correctly.",
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "5. Security Measures",
    items: [
      "TLS 1.3 encryption for all data transmitted to and from our website and API endpoints.",
      "Secrets, CRM tokens, and Blob credentials are stored in environment variables. They are never hardcoded or exposed to the client.",
      "Backend input validation, sanitization, and HTTP-only security headers on all routes.",
      "Custody and authentication data are stored in Vercel Blob Storage with private access (<code>access: \"private\"</code>). Only authorized backend processes can read or write user records.",
      "Internal access controls, least-privilege policies, and regular security review of our infrastructure and vendors.",
      "<strong>No security system is 100% impenetrable.</strong> While we follow industry best practices, we cannot guarantee absolute security of any information transmitted over the Internet.",
    ],
  },
  {
    id: "retention",
    icon: Shield,
    title: "6. Data Retention",
    items: [
      "<strong>User accounts:</strong> Retained for the lifetime of your account plus a reasonable grace period after account closure unless a longer retention is required by law.",
      "<strong>CRM & enquiries:</strong> Typically retained for up to 5 years from last contact in line with financial services compliance expectations.",
      "<strong>Session tokens:</strong> Session tokens automatically expire after 30 days; tokens are invalidated server-side on logout.",
      "<strong>Logs:</strong> Server logs and debug information are rotated within 30 days.",
      "Upon request and subject to applicable exceptions, we will delete your personal data in a timely manner after verifying your identity.",
    ],
  },
  {
    id: "rights",
    icon: Users,
    title: "7. Your Rights",
    items: [
      "Subject to local law (including GDPR, CCPA/CPRA, PIPL, PDPA, and similar regimes), you may:",
      "• <strong>Access</strong> the personal information we hold about you.",
      "• <strong>Correct</strong> inaccurate or incomplete personal data.",
      "• <strong>Delete</strong> your personal information, where legally permitted.",
      "• <strong>Restrict or object</strong> to certain processing activities.",
      "• <strong>Portability:</strong> Request a machine-readable export of the core data you provided.",
      "• <strong>Withdraw consent</strong> for consent-based processing without affecting prior lawful processing.",
      "To exercise any of these rights, contact us using the details in Section 11. We will respond within applicable legal timelines after verifying your identity.",
    ],
  },
  {
    id: "marketing",
    icon: Mail,
    title: "8. Marketing & Communications",
    items: [
      "We will only send you promotional marketing emails (e.g., newsletters, market insights, webinar announcements) if you have actively opted in or have an existing client relationship and the content is materially similar to products or services already requested.",
      "Every marketing email contains a clear, one-click unsubscribe mechanism at the bottom.",
      "Service-critical communications (account alerts, security notices, replies to your enquiries) are not classed as marketing and will continue to be delivered as needed.",
    ],
  },
  {
    id: "thirdparties",
    icon: Scale,
    title: "9. Third Parties & Sub-processors",
    items: [
      "We share your data only with vetted providers who contractually commit to adequate confidentiality, security, and data-protection standards. Current categories include:",
      "• <strong>Hosting & infrastructure:</strong> Vercel, Inc. (frontend, serverless functions, and private Blob Storage).",
      "• <strong>CRM & investor relations:</strong> Licensed CRM service provider as described in Section 3.",
      "• <strong>Lead analytics:</strong> Aggregated, privacy-safe performance tracking via the lead dashboard counter (identifier, signup/contact type only).",
      "• <strong>Professional advisors:</strong> Auditors, legal counsel, compliance consultants, and tax advisors, under strict confidentiality obligations.",
      "We do <strong>not</strong> sell or rent personal information to third parties for commercial purposes.",
    ],
  },
  {
    id: "transfers",
    icon: Server,
    title: "10. International Transfers",
    items: [
      "Information you submit may be processed in countries outside your jurisdiction of residence, including the United States, Singapore, the European Union, and other countries where our sub-processors maintain facilities.",
      "Where personal data is transferred from the EEA, UK, or equivalent regulated jurisdictions, we rely on recognized adequacy decisions or appropriate safeguards (including standard contractual clauses) to ensure an adequate level of protection.",
      "You may obtain a copy of the relevant safeguards by contacting us using the details below.",
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "11. Contact & Complaints",
    items: [
      "Questions, requests, or complaints regarding this Privacy Policy or the handling of your information should be directed to our Data Protection / Privacy team:",

      "If you remain dissatisfied after our internal review, you may be entitled to lodge a complaint with your local data protection authority.",
    ],
  },
];

const PrivacyPolicy = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55 },
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Silver Stone Capital</title>
        <meta name="description" content="Silver Stone Capital privacy policy. How we collect, use, and protect your personal data including CRM processing, cookies, security, and your rights." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://silverstonecapital.com/privacy" />
      </Helmet>

      <div className="pt-28 sm:pt-32 pb-16 min-h-screen bg-background">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-ivory-dark via-background to-background">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-5xl px-4 lg:px-8 relative z-10 py-14 sm:py-20">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
                <Shield size={14} className="text-accent" />
                <span className="font-body text-[11px] uppercase tracking-widest text-accent font-semibold">Legal</span>
              </div>
              <h1 className="text-h1 font-heading text-foreground mb-4 leading-tight">Privacy Policy</h1>
              <p className="font-body text-base text-muted-foreground max-w-3xl leading-relaxed">
                Silver Stone Capital is committed to protecting your privacy. This policy explains what information we collect, how we use it, the basis on which we process it, and the rights and controls you have over your data when using our website and services.
              </p>
              <p className="font-body text-xs text-muted-foreground mt-6">
                <strong className="text-foreground">Last updated:</strong> July 2025 · Effective as of the date posted above.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-5xl px-4 lg:px-8 py-12 sm:py-16 space-y-10">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="scroll-mt-28 rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-6 sm:p-8 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground pt-1.5">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((html) => (
                    <li
                      key={html}
                      className="flex gap-3 items-start font-body text-base leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: `<span class="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0"></span><span>${html}</span>`,
                      }}
                    />
                  ))}
                </ul>
              </motion.section>
            );
          })}

          <motion.div {...fadeUp} className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Acknowledgement</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              By using the Silver Stone Capital website, submitting any form, or creating an account, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy and our accompanying Terms &amp; Conditions. We may update this policy from time to time; material changes will be reflected by updating the "Last updated" date above and, where appropriate, notified via email or prominent website notice.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
