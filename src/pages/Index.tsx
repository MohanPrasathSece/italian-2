import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TrendingUp, Shield, Users, Wallet, Coins, BarChart3, Lock, Zap, Globe, ChevronRight, PieChart, ArrowUpRight, Coins as CoinsIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/App";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cryptovestcapital.com/#organization",
  "name": "CryptoVest Capital",
  "alternateName": ["CryptoVest", "CV Capital", "CryptoVest Capital Partners"],
  "url": "https://cryptovestcapital.com/",
  "foundingDate": "2021",
  "description": "CryptoVest Capital is a leading digital asset investment firm specializing in cryptocurrency portfolio management, DeFi strategies, staking, and blockchain investments.",
  "areaServed": "Worldwide",
  "sameAs": [
    "https://cryptovestcapital.com/",
    "https://twitter.com/cryptovestcap"
  ]
};

const INVESTMENT_FUND_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "InvestmentFund",
  "name": "CryptoVest Digital Asset Fund",
  "description": "A diversified cryptocurrency investment fund offering exposure to Bitcoin, Ethereum, and curated altcoin portfolios with risk-managed strategies.",
  "fundType": "Hedge Fund",
  "url": "https://cryptovestcapital.com/"
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cryptovestcapital.com/" }
  ]
};

const investmentServices = [
  {
    icon: PieChart,
    title: "Portfolio Management",
    desc: "Tailored cryptocurrency portfolios designed to match your risk profile, time horizon, and financial goals with active rebalancing.",
  },
  {
    icon: TrendingUp,
    title: "Algorithmic Trading",
    desc: "Quantitative strategies powered by advanced algorithms and machine learning to capture market inefficiencies and generate alpha.",
  },
  {
    icon: Lock,
    title: "Staking & Yield Farming",
    desc: "Generate passive income through institutional-grade staking and optimized DeFi yield strategies with audited protocols.",
  },
  {
    icon: Wallet,
    title: "OTC & Private Sales",
    desc: "Access exclusive pre-IDO tokens, venture round allocations, and large-block OTC trades with minimal slippage.",
  },
  {
    icon: CoinsIcon,
    title: "DeFi Strategies",
    desc: "Curated decentralized finance strategies including liquidity provision, lending, and yield aggregation across leading protocols.",
  },
  {
    icon: BarChart3,
    title: "Market Research",
    desc: "Institutional-grade research reports, on-chain analytics, and market insights from our team of blockchain analysts.",
  },
  {
    icon: Shield,
    title: "Custody Solutions",
    desc: "Bank-grade cold storage, multi-sig wallets, and insurance-backed custody solutions safeguarding your digital assets.",
  },
  {
    icon: Zap,
    title: "ICO/IEO Advisory",
    desc: "Strategic advisory for token launches, including due diligence, regulatory guidance, and listing support on top exchanges.",
  },
  {
    icon: Globe,
    title: "Global Macro",
    desc: "Top-down macroeconomic analysis and cross-market positioning to navigate the evolving digital asset landscape.",
  }
];

const stats = [
  { value: 2.4, suffix: "B+", label: "Assets Under Management" },
  { value: 156, suffix: "%", label: "Avg. Annual Returns (5Y)" },
  { value: 12000, suffix: "+", label: "Global Investors" },
  { value: 50, suffix: "+", label: "Countries Served" },
];

const faqs = [
  { q: "What is the minimum investment required?", a: "Our flagship strategies start with a minimum investment of $10,000. For high-net-worth individuals and institutional clients, we offer custom managed accounts with tailored fee structures starting at $100,000." },
  { q: "How secure are my digital assets?", a: "We employ institutional-grade security including multi-signature cold storage, hardware security modules (HSMs), 24/7 monitoring, and comprehensive insurance coverage on custodied assets. All protocols undergo rigorous smart contract audits." },
  { q: "What cryptocurrencies do you invest in?", a: "Our core allocation includes established assets like Bitcoin and Ethereum, complemented by curated mid-cap and emerging altcoins selected through our proprietary fundamental and quantitative research framework." },
  { q: "How often will I receive performance reports?", a: "Clients receive weekly performance summaries via email, detailed monthly reports with portfolio breakdowns, and quarterly in-depth reviews including market outlook and strategy adjustments. Our client portal provides real-time access 24/7." },
  { q: "Can I withdraw my funds at any time?", a: "Yes, our standard strategies offer weekly liquidity with 7-day notice. We also provide customized lock-up structures for yield-enhanced strategies with correspondingly higher return profiles." },
  { q: "Do you offer tax reporting support?", a: "Absolutely. We provide comprehensive tax documentation including realized gain/loss reports, cost-basis tracking, and jurisdiction-specific guidance through our network of international tax partners." },
  { q: "What makes CryptoVest Capital different?", a: "Our edge combines institutional-grade infrastructure, a veteran team with traditional finance and crypto-native expertise, rigorous risk management frameworks, and a transparent, client-first approach." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// ─────────── Trading / Crypto Animation Components ───────────

function CandlestickChart() {
  const candles = [
    { o: 42000, h: 42800, l: 41600, c: 42500 },
    { o: 42500, h: 43100, l: 42100, c: 42900 },
    { o: 42900, h: 43300, l: 42700, c: 43200 },
    { o: 43200, h: 43400, l: 41900, c: 42100 },
    { o: 42100, h: 42400, l: 41400, c: 41700 },
    { o: 41700, h: 42200, l: 41300, c: 42000 },
    { o: 42000, h: 42900, l: 41800, c: 42700 },
    { o: 42700, h: 43500, l: 42500, c: 43400 },
    { o: 43400, h: 44000, l: 43100, c: 43900 },
    { o: 43900, h: 44300, l: 43500, c: 44100 },
    { o: 44100, h: 44200, l: 43200, c: 43500 },
    { o: 43500, h: 43800, l: 42900, c: 43200 },
  ];
  const min = 41000;
  const max = 44500;
  const range = max - min;
  const H = 160;
  const toY = (v: number) => H - ((v - min) / range) * H;
  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${candles.length * 38} ${H + 30}`} className="w-full h-auto">
        <defs>
          <linearGradient id="bullGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="bearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <g key={i}>
            <line x1="0" y1={H * p + 15} x2={candles.length * 38} y2={H * p + 15} stroke="hsl(var(--border))" strokeDasharray="2 4" strokeWidth="0.5" />
            <text x="4" y={H * p + 12} fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="Poppins, sans-serif">
              ${(max - range * p).toLocaleString()}
            </text>
          </g>
        ))}
        {candles.map((c, i) => {
          const x = i * 38 + 20;
          const up = c.c >= c.o;
          const color = up ? "url(#bullGrad)" : "url(#bearGrad)";
          const bodyY = toY(Math.max(c.o, c.c));
          const bodyH = Math.max(2, Math.abs(toY(c.c) - toY(c.o)));
          return (
            <g key={i} style={{ transformBox: "fill-box", transformOrigin: `${x}px ${bodyY + bodyH / 2}px` }}>
              <line x1={x} x2={x} y1={toY(c.h) + 15} y2={toY(c.l) + 15} stroke={up ? "hsl(var(--gold))" : "#ef4444"} strokeWidth="1" />
              <motion.rect
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                x={x - 9}
                y={bodyY + 15}
                width="18"
                height={bodyH}
                fill={color}
                rx="1.5"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChart() {
  const points = [62, 68, 64, 72, 70, 82, 78, 90, 88, 96, 94, 108, 116, 112, 124, 130, 126, 138, 146, 156];
  const W = 400;
  const H = 130;
  const stepX = W / (points.length - 1);
  const max = Math.max(...points);
  const toY = (v: number) => H - (v / max) * (H - 20) - 4;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${toY(p)}`).join(" ");
  const area = `${d} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        style={{ transformOrigin: "bottom" }}
        fill="url(#areaGrad)"
      />
      <motion.path
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        fill="none"
        stroke="hsl(var(--gold))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={i * stepX}
          cy={toY(p)}
          r="2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.04 }}
          fill="hsl(var(--gold))"
        />
      ))}
    </svg>
  );
}

function FloatingCoins() {
  const coins = [
    { sym: "₿", label: "BTC", delay: 0, x: "12%", y: "22%", size: "3.2rem", dur: 7 },
    { sym: "Ξ", label: "ETH", delay: 1.2, x: "82%", y: "18%", size: "2.6rem", dur: 6 },
    { sym: "◎", label: "SOL", delay: 2.1, x: "20%", y: "72%", size: "2.2rem", dur: 8 },
    { sym: "Ð", label: "DOGE", delay: 0.6, x: "72%", y: "68%", size: "2.4rem", dur: 7.4 },
    { sym: "◈", label: "USDC", delay: 1.8, x: "90%", y: "48%", size: "2rem", dur: 6.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((c) => (
        <motion.div
          key={c.label}
          className="absolute flex flex-col items-center opacity-50"
          style={{ left: c.x, top: c.y, transform: "translate(-50%,-50%)" }}
          animate={{ y: [0, -14, 0], rotate: [0, 5, -3, 0] }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex h-[3.5em] w-[3.5em] items-center justify-center rounded-full bg-gold/10 border border-gold/40 backdrop-blur-sm text-gold shadow-[0_0_25px_rgba(212,175,55,0.25)] font-bold"
            style={{ fontSize: c.size }}
          >
            {c.sym}
          </div>
          <span className="mt-1 font-body text-[10px] font-semibold uppercase tracking-wider text-gold/80">{c.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Ticker() {
  const items = [
    { s: "BTC", p: 67234.56, c: 2.43 },
    { s: "ETH", p: 3456.78, c: 1.87 },
    { s: "SOL", p: 142.33, c: 5.12 },
    { s: "AVAX", p: 34.87, c: -1.24 },
    { s: "MATIC", p: 0.5842, c: 3.06 },
    { s: "LINK", p: 14.22, c: 0.89 },
    { s: "ARB", p: 0.92, c: -2.11 },
    { s: "OP", p: 1.24, c: 4.17 },
  ];
  return (
    <div className="relative w-full overflow-hidden bg-primary/95 backdrop-blur border-y border-gold/20">
      <motion.div
        className="flex gap-10 whitespace-nowrap py-2.5 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-xs font-bold text-gold">{t.s}</span>
            <span className="font-body text-xs font-medium text-white/90">${t.p.toLocaleString()}</span>
            <span className={`font-body text-[11px] font-semibold ${t.c >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {t.c >= 0 ? "▲" : "▼"} {Math.abs(t.c).toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function BrowserTabs({ children }: { children: React.ReactNode }) {
  const tabs = ["Market Overview", "BTC/USD", "Portfolio"];
  const [active, setActive] = useState(0);
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur shadow-2xl shadow-primary/10">
      <div className="flex items-center gap-1 border-b border-border/60 bg-gradient-to-b from-ivory-dark/60 to-transparent px-3 pt-2">
        <div className="flex gap-1.5 pr-2">
          <span className="h-3 w-3 rounded-full bg-rose-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex gap-1 ml-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`font-body text-[11px] px-3 py-1.5 rounded-t-md border border-b-0 transition-all ${
                active === i
                  ? "bg-card border-border text-foreground -mb-px"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-ivory-dark/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const Index = () => {
  const [tabs, setTabs] = useState(0);
  const { openSignup, openLogin } = useAuth();

  return (
    <>
      <Helmet>
        <title>Home | CryptoVest Capital — Digital Asset Investment Firm</title>

        <meta name="description" content="CryptoVest Capital is a premier cryptocurrency investment firm offering portfolio management, DeFi strategies, staking, and institutional-grade custody services for global investors." />

        <meta name="keywords" content="Crypto investment firm, Bitcoin investment, Ethereum fund, cryptocurrency portfolio management, DeFi investing, crypto staking, digital asset management, blockchain investments, crypto hedge fund, institutional crypto" />

        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://cryptovestcapital.com/" />

        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(INVESTMENT_FUND_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>

        <meta property="og:title" content="CryptoVest Capital | Premier Digital Asset Investment Firm" />
        <meta property="og:description" content="Institutional-grade cryptocurrency investment strategies. Portfolio management, DeFi yield, staking, and secure custody." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cryptovestcapital.com/" />
        <meta property="og:site_name" content="CryptoVest Capital" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CryptoVest Capital | Digital Asset Investment Firm" />
        <meta name="twitter:description" content="Leading cryptocurrency investment firm. Portfolio management, DeFi strategies, staking & secure custody." />
      </Helmet>

      {/* Hero — FULL SCREEN */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-navy via-primary to-navy-light" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.35) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(212, 175, 55, 0.25) 0%, transparent 55%)`
          }} />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-body text-[11px] tracking-[0.18em] text-gold uppercase">Since 2021 · $2.4B AUM</span>
            </div>

            <h1 className="text-h1 sm:text-5xl lg:text-6xl font-heading text-white mb-6 leading-[1.1] drop-shadow-xl">
              Invest in the <span className="text-gold">Future</span><br className="sm:block hidden" />
              of <span className="text-gold">Digital Assets</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
              Institutional-grade cryptocurrency strategies, portfolio management, and secure custody for forward-thinking global investors.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => openSignup()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-md bg-accent text-accent-foreground font-body text-sm font-semibold tracking-wide shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start Investing Today
                <ChevronRight size={16} />
              </button>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-md border border-white/20 text-white font-body text-sm font-semibold tracking-wide hover:bg-white/8 hover:border-gold/40 transition-all backdrop-blur-sm"
              >
                Explore Strategies
                <ArrowUpRight size={16} />
              </a>
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
                Pioneering Digital Asset Investment Since 2021
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                CryptoVest Capital was founded by veterans from traditional finance and blockchain technology. We bridge the gap between institutional investing and the emerging world of cryptocurrencies, delivering best-in-class strategies with uncompromising security and transparency.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                Our team manages over $2.4B in digital assets for more than 12,000 clients across 50+ countries, combining deep crypto-native expertise with institutional-grade risk management frameworks.
              </p>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent hover:opacity-80 transition-opacity"
              >
                Discover Our Approach <ChevronRight size={16} />
              </a>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl" />
                <div className="relative bg-primary rounded-2xl p-6 sm:p-8 shadow-2xl border border-gold/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {[
                      { label: "BTC Exposure", value: "42%" },
                      { label: "ETH & Layer 2", value: "28%" },
                      { label: "DeFi Bluechips", value: "18%" },
                      { label: "Emerging Alts", value: "12%" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="font-heading text-2xl font-bold text-gold mb-1">{item.value}</p>
                        <p className="font-body text-xs text-white/70">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-body text-xs text-white/80 uppercase tracking-widest">Cumulative Performance</p>
                      <p className="font-heading text-lg font-bold text-gold">+156%</p>
                    </div>
                    <LineChart />
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Risk-Adjusted Returns", pct: 94 },
                      { label: "Client Retention Rate", pct: 98 },
                      { label: "Protocol Audit Score", pct: 100 }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1.5">
                          <span className="font-body text-xs text-white/80">{item.label}</span>
                          <span className="font-body text-xs text-gold font-semibold">{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15 }}
                            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Services */}
      <section id="services" className="py-20 lg:py-28 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Our Expertise</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Investment Services</h2>
            <p className="font-body text-base text-muted-foreground">
              Comprehensive digital asset investment solutions tailored to build, protect, and grow your cryptocurrency portfolio.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentServices.map((svc, idx) => (
              <motion.div
                key={svc.title}
                {...fadeInUp}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-card rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border group relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors blur-2xl" />
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors relative">
                  <svc.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{svc.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CryptoVest */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, hsl(var(--gold)) 0%, transparent 45%), radial-gradient(circle at 70% 80%, hsl(var(--gold)) 0%, transparent 40%)`,
          filter: "blur(80px)"
        }} />
        <div className="container mx-auto px-4 lg:px-8 text-center relative">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Why Choose Us</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-primary-foreground mb-4">Verified Performance</h2>
            <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto mb-16">
              A proven track record of superior risk-adjusted returns across all market cycles.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                {...fadeInUp}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <Counter end={s.value} suffix={s.suffix} duration={2000} />
                <p className="font-body text-base text-primary-foreground/80 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Investment Process */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-sm tracking-widest uppercase text-gold">Our Process</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">The Pathway to Digital Wealth</h2>
            <p className="font-body text-base text-muted-foreground">
              A systematic, research-driven approach to navigating the dynamic cryptocurrency markets with precision and confidence.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 text-center lg:text-left">
            {[
              { id: "01", title: "Discovery & Onboarding", desc: "We understand your goals, risk tolerance, and time horizon through a comprehensive consultation." },
              { id: "02", title: "Portfolio Construction", desc: "Our research team designs a tailored allocation using our proprietary multi-factor framework." },
              { id: "03", title: "Active Management", desc: "Continuous monitoring, strategic rebalancing, and tactical positioning to optimize risk-adjusted returns." },
              { id: "04", title: "Transparent Reporting", desc: "Real-time access to your holdings and detailed performance reports with expert market commentary." }
            ].map((step, idx) => (
              <motion.div
                key={step.id}
                {...fadeInUp}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <span className="font-heading text-xl font-bold text-accent">{step.id}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-6 -right-6 w-12 h-px bg-gold/30" />
                )}
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
              Find answers to common questions about our digital asset investment services.
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
    </>
  );
};

export default Index;
