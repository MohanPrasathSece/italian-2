import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useAuth } from "@/App";
import {
  BookOpen, Shield, TrendingUp, Lock, Brain, Layers, PieChart,
  AlertTriangle, Activity, CheckCircle2, Coins, BarChart3, Zap,
  GraduationCap, Sparkles, ChevronDown, ChevronRight, Wallet, Globe,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "@/components/ContactForm";
import { useState as useStateRF } from "react";

// ───── Smaller reusable animation pieces ─────

function SmallCandles() {
  const candles = [
    { o: 42, h: 44, l: 40, c: 43 }, { o: 43, h: 46, l: 42, c: 45 },
    { o: 45, h: 47, l: 43, c: 44 }, { o: 44, h: 48, l: 43, c: 47 },
    { o: 47, h: 50, l: 45, c: 49 }, { o: 49, h: 51, l: 47, c: 50 },
    { o: 50, h: 49, l: 45, c: 46 }, { o: 46, h: 47, l: 43, c: 45 },
  ];
  const min = 40, max = 52, H = 90;
  const range = max - min;
  const toY = (v: number) => H - ((v - min) / range) * H;
  return (
    <svg viewBox={`0 0 ${candles.length * 30} ${H + 10}`} className="w-full h-auto">
      {candles.map((c, i) => {
        const x = i * 30 + 16;
        const up = c.c >= c.o;
        const color = up ? "hsl(var(--gold))" : "#ef4444";
        const bodyY = toY(Math.max(c.o, c.c));
        const bodyH = Math.max(2, Math.abs(toY(c.c) - toY(c.o)));
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={toY(c.h) + 5} y2={toY(c.l) + 5} stroke={color} strokeWidth="1" />
            <motion.rect
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ transformOrigin: `${x}px ${bodyY + bodyH / 2 + 5}px` }}
              x={x - 7}
              y={bodyY + 5}
              width="14"
              height={bodyH}
              fill={color}
              opacity={up ? 0.95 : 0.85}
              rx="1.2"
            />
          </g>
        );
      })}
    </svg>
  );
}

function Floaters() {
  const items = [
    { sym: "₿", label: "Bitcoin", x: "6%", y: "18%", dur: 6, size: "2.2rem" },
    { sym: "Ξ", label: "Ethereum", x: "92%", y: "22%", dur: 7, size: "2rem" },
    { sym: "◎", label: "Solana", x: "10%", y: "80%", dur: 6.6, size: "1.7rem" },
    { sym: "⬡", label: "Polkadot", x: "88%", y: "78%", dur: 7.2, size: "1.7rem" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((i) => (
        <motion.div
          key={i.sym}
          className="absolute flex flex-col items-center opacity-40"
          style={{ left: i.x, top: i.y, transform: "translate(-50%,-50%)" }}
          animate={{ y: [0, -10, 0], rotate: [0, 4, -3, 0] }}
          transition={{ duration: i.dur, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex h-[3em] w-[3em] items-center justify-center rounded-full border border-gold/40 bg-gold/10 backdrop-blur text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] font-bold"
            style={{ fontSize: i.size }}
          >
            {i.sym}
          </div>
          <span className="font-body text-[9px] uppercase tracking-widest mt-1 text-gold/70">{i.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function BrowserTabsStatic() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur shadow-xl">
      <div className="flex items-center gap-1 border-b border-border/60 bg-gradient-to-b from-ivory-dark/60 to-transparent px-3 pt-2">
        <div className="flex gap-1.5 pr-2">
          <span className="h-3 w-3 rounded-full bg-rose-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex gap-1 ml-2">
          {["Portfolio · Live", "BTC · 1H", "AI Signals"].map((t, i) => (
            <div
              key={t}
              className={`font-body text-[11px] px-3 py-1.5 rounded-t-md border border-b-0 ${
                i === 0 ? "bg-card border-border text-foreground -mb-px" : "border-transparent text-muted-foreground"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Portfolio Value", v: "$128,430", t: "+2.18%", up: true },
            { l: "24h P/L", v: "+$2,740", t: "2.18%", up: true },
            { l: "Sharpe Ratio", v: "2.14", t: "top 5%", up: true },
          ].map((x) => (
            <div key={x.l} className="rounded-lg bg-ivory-dark/60 p-2.5 border border-border/50">
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground">{x.l}</p>
              <p className="font-heading text-base font-bold text-foreground">{x.v}</p>
              <p className={`font-body text-[10px] font-semibold ${x.up ? "text-emerald-600" : "text-rose-500"}`}>
                {x.up ? "▲" : "▼"} {x.t}
              </p>
            </div>
          ))}
        </div>
        <SmallCandles />
      </div>
    </div>
  );
}

// ───── Data ─────

const LEARNING_MODULES = [
  { icon: Coins, title: "Cryptocurrency Basics", items: [
      "What is Bitcoin, Ethereum & digital money?",
      "Blockchain ledgers, miners, and nodes",
      "Wallets, private keys, and self-custody",
      "Understanding tokens, coins, and gas fees",
      "Reading order books and liquidity",
    ] },
  { icon: Layers, title: "Blockchain & Digital Assets", items: [
      "How public blockchains reach consensus",
      "Layer-1 vs Layer-2 scaling solutions",
      "Stablecoins: fiat-backed & algorithmic",
      "NFTs, RWA, and tokenized assets",
      "Bridges, interoperability, and modularity",
    ] },
  { icon: TrendingUp, title: "Crypto Investing & Trading", items: [
      "Long-term holding vs active trading",
      "Technical analysis and chart patterns",
      "Fundamental analysis: TVL, users, and fees",
      "Dollar-cost averaging (DCA) strategies",
      "Entry, stop-loss, and take-profit rules",
    ] },
];

const TOPICS_GRID = [
  { icon: Brain, title: "AI Market Analysis", desc: "How machine learning models scan on-chain data, order flow, and news to generate high-confidence directional signals." },
  { icon: PieChart, title: "Portfolio Diversification", desc: "Strategically blend large-caps, mid-caps, and emerging sectors to reduce drawdowns while preserving upside." },
  { icon: Shield, title: "Risk Management", desc: "Position sizing, correlation limits, and volatility targeting used by professional crypto portfolio managers." },
  { icon: Lock, title: "Security Best Practices", desc: "Hardware wallets, multi-sig setups, seed phrase hygiene, and avoiding common phishing and rug-pull attacks." },
  { icon: Activity, title: "Market Trends", desc: "Macro drivers, halving cycles, liquidity regimes, and how global capital flows impact digital asset prices." },
  { icon: Zap, title: "DeFi & Yield Strategies", desc: "Liquidity provision, lending, yield aggregators, and how we evaluate risk/reward across protocols." },
];

const LOGGED_FAQ = [
  { q: "Is CryptoVest Capital a registered investment manager?", a: "CryptoVest Capital operates under applicable regulatory frameworks with registered partners in key jurisdictions. Our structure is designed for international clients with appropriate legal opinions and compliance frameworks." },
  { q: "How do I fund my account?", a: "Accounts can be funded with major cryptocurrencies (BTC, ETH, USDC, USDT) or fiat via bank wire. Our onboarding team will provide tailored instructions based on your jurisdiction and preferred funding method." },
  { q: "What reporting will I receive?", a: "Clients receive weekly performance digests, detailed monthly portfolio statements with attribution, and quarterly deep dives including macro outlook and strategy repositioning." },
  { q: "Are my digital assets insured?", a: "Custodied assets benefit from comprehensive crime and theft insurance via Lloyd's of London syndicates. Smart-contract risk is further mitigated by audits, bug bounties, and conservative TVL limits." },
  { q: "Can I speak with an advisor?", a: "Absolutely. After signup, you'll be assigned a dedicated relationship manager. Book a call directly through the portal or email your manager anytime." },
  { q: "What is the lock-up period?", a: "Most flagship strategies offer weekly liquidity with 7 calendar days notice. Longer-dated structured products have tailored terms disclosed upfront in the strategy factsheet." },
];

// ───── Page ─────

const LoggedIn = () => {
  const { user } = useAuth();
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    setWelcome(true);
    const t = setTimeout(() => setWelcome(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <Helmet>
        <title>Learn Hub | CryptoVest Capital</title>
        <meta name="description" content="Your personal CryptoVest Capital learning hub. Master crypto, blockchain, and portfolio strategy with our educational resources." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Welcome banner */}
      <div className="pt-28 pb-6 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <AnimatedBanner show={welcome} name={user?.name?.split(" ")[0] || "Investor"} />
        </div>
      </div>

      {/* Hero / Intro */}
      <section className="relative overflow-hidden pb-10 pt-8">
        <Floaters />
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div {...fadeUp} className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-5">
                <GraduationCap size={14} className="text-gold" />
                <span className="font-body text-[11px] uppercase tracking-widest text-gold">Investor Learning Hub</span>
              </span>
              <h1 className="text-h1 font-heading text-foreground leading-tight mb-5">
                Welcome aboard, <span className="text-gold">{user?.name?.split(" ")[0] || "Valued Investor"}</span>.
              </h1>
              <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xl mb-6">
                Expand your knowledge of digital assets with curated education designed for serious investors.
                Learn how we <span className="text-accent font-semibold">enhance returns</span> and protect your wealth with institutional-grade safeguards.
              </p>
              <div className="flex flex-wrap gap-3">
                <Chip icon={Sparkles} label="Est. 2021 · $2.4B AUM" />
                <Chip icon={Shield} label="Insured custody · Audited protocols" />
                <Chip icon={Brain} label="AI-enhanced research" />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-2">
              <BrowserTabsStatic />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 1: How We Enhance Returns ─── */}
      <section id="returns" className="py-16 sm:py-20 bg-ivory-dark border-y border-border">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-gold">Section 01</span>
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">
              How We <span className="text-gold">Enhance Your Investment Returns</span>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Multi-layered alpha generation combining quantitative signals, fundamental conviction, and disciplined execution.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {[
              { num: "01", icon: Brain, title: "Quantitative & AI Signals", bullets: [
                  "ML models scan order flow and on-chain data",
                  "Multi-timeframe momentum & mean-reversion",
                  "Sentiment aggregation from 120+ sources",
                  "Correlation-adjusted sizing per signal",
                ] },
              { num: "02", icon: TrendingUp, title: "Active Factor Tilting", bullets: [
                  "Rotation across DeFi, L1, L2, and AI sectors",
                  "Risk-premia harvesting: carry, momentum, value",
                  "Tactical overlays around halving & liquidity cycles",
                  "Disciplined profit-taking into euphoria",
                ] },
              { num: "03", icon: Wallet, title: "Yield Enhancement", bullets: [
                  "Audited staking, lending, and LP strategies",
                  "Funding-rate arbitrage across CEX/DEX",
                  "Covered call structures in sideways markets",
                  "Risk-graded vaults: Conservative → Aggressive",
                ] },
            ].map((c, i) => (
              <motion.div
                key={c.num}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-6 sm:p-7 hover:border-accent/40 transition-all relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-5 relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <c.icon size={22} />
                  </div>
                  <span className="font-heading text-xl font-bold text-gold/70">{c.num}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 relative">{c.title}</h3>
                <ul className="space-y-2.5 relative">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2: Safety & Security ─── */}
      <section id="security" className="py-16 sm:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 30% 10%, hsl(var(--gold)) 0%, transparent 45%), radial-gradient(circle at 70% 90%, hsl(var(--gold)) 0%, transparent 40%)`,
          filter: "blur(80px)",
        }} />
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-gold">Section 02</span>
            </div>
            <h2 className="text-h2 font-heading text-white mb-4">
              How We Keep Your Wealth <span className="text-gold">Safe & Secure</span>
            </h2>
            <p className="font-body text-base text-white/75 leading-relaxed">
              Institutional-grade security layered across custody, trading, operations, and smart-contract risk.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              { icon: Lock, title: "Bank-Grade Cold Storage", body: "95%+ of custodied assets reside in air-gapped, geographically distributed multi-signature cold wallets backed by Lloyd's of London insurance." },
              { icon: Shield, title: "Smart Contract Audits", body: "Every protocol we interact with passes a multi-auditor review: Trail of Bits, Certora, OpenZeppelin, Spearbit, plus internal red-teaming." },
              { icon: AlertTriangle, title: "Operational Risk Controls", body: "Dual authorization for every withdrawal, SOC 2-aligned processes, 24/7 SOC monitoring, and strict segregation of duties." },
              { icon: Globe, title: "Regulated Infrastructure", body: "Licensed trustees, regulated banking partners for fiat rails, and legal opinions covering major jurisdictions including EU, SG, and UAE." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-gold/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <s.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1.5">{s.title}</h3>
                    <p className="font-body text-sm text-white/75 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["$2.4B", "Assets Secured"],
              ["99.98%", "Uptime (2Y)"],
              ["0", "Custody Breaches"],
              ["24/7", "SOC Monitoring"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 text-center">
                <p className="font-heading text-2xl font-bold text-gold">{v}</p>
                <p className="font-body text-xs uppercase tracking-widest mt-1 text-white/70">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Learning Modules (3rd main section) ─── */}
      <section id="learn" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-gold">Section 03 · Core Curriculum</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Master Crypto & Blockchain Investing</h2>
            <p className="font-body text-base text-muted-foreground">
              Structured learning modules from the fundamentals of money to advanced portfolio construction.
            </p>
          </motion.div>
          <Tabs defaultValue="basics" className="mb-14">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-auto p-1 bg-ivory-dark rounded-xl mb-8">
              {[
                { id: "basics", label: "Cryptocurrency Basics", icon: Coins },
                { id: "blockchain", label: "Blockchain & Assets", icon: Layers },
                { id: "investing", label: "Investing & Trading", icon: TrendingUp },
              ].map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-accent data-[state=active]:shadow-sm rounded-lg"
                >
                  <t.icon size={15} />
                  <span className="font-body text-xs sm:text-sm font-semibold tracking-wide">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {LEARNING_MODULES.map((m, idx) => (
              <TabsContent key={m.title} value={["basics", "blockchain", "investing"][idx]}>
                <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <m.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-1">{m.title}</h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {`${m.items.length} bite-sized lessons · Beginner to Intermediate`}
                      </p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {m.items.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 rounded-lg bg-ivory-dark/50 border border-border/40 p-3">
                        <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-foreground leading-relaxed">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Deep-dive topic cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {TOPICS_GRID.map((t, i) => (
              <motion.div
                key={t.title}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all group cursor-default"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                  <t.icon size={22} />
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">{t.title}</h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-accent font-body text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore topic <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-16 sm:py-20 bg-ivory-dark border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-gold">FAQ</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-4">Investor FAQ</h2>
            <p className="font-body text-base text-muted-foreground">
              Answers to the most common questions from our active investors.
            </p>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-3">
            {LOGGED_FAQ.map((f, i) => (
              <AccordionItem key={i} value={`li-faq-${i}`} className="bg-card rounded-xl border border-border px-6 shadow-sm">
                <AccordionTrigger className="font-body text-base font-medium text-foreground hover:text-accent py-5 hover:no-underline text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section id="contact-li" className="py-16 sm:py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-gold">Speak With Our Team</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-h2 font-heading text-foreground mb-3">Questions? We're Here to Help</h2>
            <p className="font-body text-base text-muted-foreground">
              Whether you're curious about strategy, performance, or onboarding, our team responds within one business day.
            </p>
          </motion.div>
          <ContactForm variant="logged-in" />
        </div>
      </section>
    </>
  );
};

// ───── Subcomponents ─────

function Chip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 font-body text-xs text-foreground shadow-sm">
      <Icon size={13} className="text-accent" />
      {label}
    </span>
  );
}

function AnimatedBanner({ show, name }: { show: boolean; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, height: 0 }}
      animate={show ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, height: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 via-gold/5 to-transparent p-4 sm:p-5 backdrop-blur">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent animate-pulse">
          <Sparkles size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-base sm:text-lg font-bold text-foreground truncate">
            Welcome back, {name}! Your portfolio is up <span className="text-accent">2.18%</span> today.
          </p>
          <p className="font-body text-xs sm:text-sm text-muted-foreground">
            Enjoy your personal learning hub. New AI market insights are ready.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default LoggedIn;
