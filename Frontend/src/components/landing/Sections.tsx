import { Link } from "@tanstack/react-router";
import {
  Brain,
  Users,
  Map,
  GanttChart,
  Trophy,
  FlaskConical,
  Rocket,
  Briefcase,
  Coins,
  Bot,
  BarChart3,
  Check,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  GraduationCap,
  School,
  UserCheck,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs uppercase tracking-[0.22em] text-[var(--electric)]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Trust() {
  const logoItems = [
    { src: "/Coursera_Logo.png", alt: "Coursera", h: "h-7" },
    { src: "/Jira_Logo.png", alt: "Jira", h: "h-7" },
    { src: "/Notion_Logo.png", alt: "Notion", h: "h-7" },
    { src: "/OpenAI_Logo.png", alt: "OpenAI", h: "h-6" },
    { src: "/ResearchGate_logo.png", alt: "ResearchGate", h: "h-7" },
    { src: "/Slack_Logo.png", alt: "Slack", h: "h-7" },
    { src: "/Y_Combinator_Logo.png", alt: "Y Combinator", h: "h-7" },
  ];

  // Repeat 3 times for a seamless, continuous scroll loop
  const scrollLogos = [...logoItems, ...logoItems, ...logoItems];

  const stats = [
    { num: 120, decimals: 0, prefix: "", suffix: "K+", l: "Active members" },
    { num: 38, decimals: 0, prefix: "", suffix: "K", l: "Projects in motion" },
    { num: 9.2, decimals: 1, prefix: "", suffix: "K", l: "Verified outcomes" },
    { num: 2.4, decimals: 1, prefix: "", suffix: "K", l: "Expert mentors" },
    { num: 1.8, decimals: 1, prefix: "", suffix: "K", l: "Research papers" },
    { num: 420, decimals: 0, prefix: "$", suffix: "M", l: "Funding raised" },
  ];
  return (
    <section className="bg-surface/30 py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-center text-xs uppercase tracking-[0.2em] font-bold text-white">
          Trusted across the innovation ecosystem
        </h3>
      </div>
        
      {/* Infinite Logo Carousel (Edge-to-Edge White Banner with Gradient Ends) */}
      <div 
        className="mt-8 relative w-full overflow-hidden py-5 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#05060F] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#05060F] after:to-transparent"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.95) 85%, transparent)"
        }}
      >
        <div className="flex w-max gap-16 animate-logo-scroll cursor-pointer">
          {scrollLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center min-w-[140px] h-10">
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.h} object-contain opacity-90 hover:opacity-100 transition-all duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-6">
          {stats.map((s) => (
            <div key={s.l} className="bg-surface/60 p-6 text-center">
              <div className="font-display text-3xl font-semibold text-gradient">
                <AnimatedCounter value={s.num} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "AI Assessment",
      d: "Deep multi-domain analysis of skills, goals, gaps, and timing.",
      i: Brain,
    },
    {
      n: "02",
      t: "Expert Matching",
      d: "Matched to vetted mentors, advisors, and collaborators.",
      i: Users,
    },
    {
      n: "03",
      t: "Roadmap Creation",
      d: "A measurable plan with milestones, dependencies, and risk.",
      i: Map,
    },
    {
      n: "04",
      t: "Execution Tracking",
      d: "Kanban, calendar, and milestone tracking with AI nudges.",
      i: GanttChart,
    },
    {
      n: "05",
      t: "Outcome Achievement",
      d: "Internships, jobs, papers, patents, funding — verified.",
      i: Trophy,
    },
  ];
  return (
    <section id="how" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps from ambition to outcome." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, t, d, i: Icon }) => (
            <li key={n} className="premium-white-window-card group">
              {/* macOS-style window tools bar */}
              <div className="window-tools">
                <div className="window-dots">
                  <span className="window-dot red" />
                  <span className="window-dot yellow" />
                  <span className="window-dot green" />
                </div>
                <span className="window-step">Step {n}</span>
              </div>
              
              {/* Card content body */}
              <div className="card-body">
                <div className="card-icon-wrapper">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                
                <h3 className="card-title-white">
                  {t}
                </h3>
                <p className="card-desc-white">
                  {d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Ecosystem() {
  /* Node definitions with fixed positions (percentage of the visual container)
     and SVG path endpoints for the connection lines (in a 500x500 viewBox). */
  const nodes = [
    { n: "Experts",       icon: UserCheck,     x: 24, y: 17, sx: 140, sy: 95  },
    { n: "Investors",     icon: Coins,         x: 76, y: 17, sx: 360, sy: 95  },
    { n: "Startups",      icon: Rocket,        x: 9,  y: 50, sx: 75,  sy: 250 },
    { n: "Students",      icon: GraduationCap, x: 91, y: 50, sx: 425, sy: 250 },
    { n: "Researchers",   icon: FlaskConical,  x: 24, y: 83, sx: 140, sy: 405 },
    { n: "Universities",  icon: School,        x: 76, y: 83, sx: 360, sy: 405 },
  ];

  /* Connection paths — each starts at center (250,250) and curves to the node endpoint.
     Top/bottom nodes use vertical exit → horizontal turn (like circuit traces).
     Side nodes use straight horizontal lines. */
  const paths = [
    /* Experts    */ "M 250 250 C 250 170, 170 95, 140 95",
    /* Investors  */ "M 250 250 C 250 170, 330 95, 360 95",
    /* Startups   */ "M 250 250 L 75 250",
    /* Students   */ "M 250 250 L 425 250",
    /* Researchers*/ "M 250 250 C 250 330, 170 405, 140 405",
    /* Universities*/"M 250 250 C 250 330, 330 405, 360 405",
  ];

  return (
    <section id="ecosystem" className="border-y border-border py-28 overflow-hidden" style={{ background: "#080a14" }}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="The Ecosystem" title="One network. Every role. Real relationships." />

        <div className="mt-16 grid items-center gap-16 md:grid-cols-2">
          {/* ─── Network Visual ─── */}
          <div className="eco-visual">

            {/* SVG Layer — grid, rings, connection lines, and animated dots */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 500"
              fill="none"
            >
              <defs>
                {/* Square grid pattern */}
                <pattern id="eco-sq-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" />
                </pattern>

                {/* Radial fade mask so grid fades at edges */}
                <radialGradient id="eco-fade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="85%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="eco-fade-mask">
                  <rect width="500" height="500" fill="url(#eco-fade)" />
                </mask>
              </defs>

              {/* Grid, masked to fade toward edges */}
              <rect width="500" height="500" fill="url(#eco-sq-grid)" mask="url(#eco-fade-mask)" />

              {/* Concentric rings */}
              <circle cx="250" cy="250" r="210" stroke="rgba(255,255,255,0.035)" strokeWidth="0.6" />
              <circle cx="250" cy="250" r="150" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6" strokeDasharray="4 6" />
              <circle cx="250" cy="250" r="90"  stroke="rgba(255,255,255,0.04)"  strokeWidth="0.6" />

              {/* Connection lines + animated flowing dots */}
              {paths.map((d, i) => (
                <g key={i}>
                  {/* Static faint line */}
                  <path d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

                  {/* Animated flowing dot */}
                  <circle r="3" fill="rgba(140,180,255,0.85)">
                    <animateMotion
                      dur={`${3 + i * 0.4}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                </g>
              ))}

              {/* Small static endpoint dots at each node */}
              {nodes.map((node) => (
                <g key={`dot-${node.n}`}>
                  <circle cx={node.sx} cy={node.sy} r="3" fill="rgba(130,170,255,0.5)" />
                  <circle cx={node.sx} cy={node.sy} r="1.5" fill="rgba(200,220,255,0.9)" />
                </g>
              ))}
            </svg>

            {/* ─── Center 3D Orb ─── */}
            <div className="eco-orb-outer">
              <div className="eco-orb-glow-1" />
              <div className="eco-orb-glow-2" />
              <div className="eco-orb">
                <span className="relative z-10 text-[7px] sm:text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(180,220,255,0.85)" }}>
                  Professional
                </span>
                <span className="relative z-10 text-sm sm:text-base font-black tracking-tight text-white uppercase mt-0.5">
                  Home
                </span>
              </div>
            </div>

            {/* ─── Dark Glass Node Cards ─── */}
            {nodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.n}
                  className="eco-node"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span className="eco-icon">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span className="eco-label">{node.n}</span>
                </div>
              );
            })}
          </div>

          {/* ─── Right Column — descriptive text ─── */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              A dynamic flywheel for verified outcomes.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Students find mentors. Researchers find collaborators. Founders find investors.
              Universities track innovation. Every introduction is purposeful and every relationship
              is measured and verified.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { title: "Talent Graph", desc: "Interactive mapping of expertise & potential" },
                { title: "Verified Outcomes", desc: "Proof-backed achievements & progress" },
                { title: "AI Introductions", desc: "Purposeful networking based on compatibility" },
                { title: "Reputation System", desc: "Peer-vetted feedback & trust markers" },
                { title: "Cross-Institution", desc: "Seamless collaboration across borders" },
                { title: "Granular Permissions", desc: "Secure data controls for IP protection" },
              ].map((x) => (
                <div key={x.title} className="flex gap-3 items-start">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <Check className="h-3 w-3" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white/90">{x.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{x.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    {
      t: "AI Assessment Engine",
      d: "Deep multi-domain analysis of your skills, goals, risk profile, and timing — actionable insights in minutes, not months.",
      i: Brain,
      accent: "#7c3aed",
      accentGlow: "rgba(124,58,237,0.3)",
      featured: true,
    },
    {
      t: "Expert Marketplace",
      d: "Access a vetted network of mentors, advisors, and investors matched precisely to your domain and growth stage.",
      i: Users,
      accent: "#06b6d4",
      accentGlow: "rgba(6,182,212,0.3)",
      featured: true,
    },
    {
      t: "Roadmap Builder",
      d: "Milestones, dependencies, and projections.",
      i: Map,
      accent: "#8b5cf6",
      accentGlow: "rgba(139,92,246,0.3)",
    },
    {
      t: "Execution Tracker",
      d: "Kanban, calendar, timeline, and KPIs.",
      i: GanttChart,
      accent: "#10b981",
      accentGlow: "rgba(16,185,129,0.3)",
    },
    {
      t: "Research Hub",
      d: "Projects, grants, teams, publications.",
      i: FlaskConical,
      accent: "#d946ef",
      accentGlow: "rgba(217,70,239,0.3)",
    },
    {
      t: "Startup Hub",
      d: "Pitch reviews, fundraising, milestones.",
      i: Rocket,
      accent: "#f97316",
      accentGlow: "rgba(249,115,22,0.3)",
    },
    {
      t: "Career Hub",
      d: "Skill gap, resume, interview prep.",
      i: Briefcase,
      accent: "#3b82f6",
      accentGlow: "rgba(59,130,246,0.3)",
    },
    {
      t: "Funding Hub",
      d: "Grants, accelerators, and term sheets.",
      i: Coins,
      accent: "#f59e0b",
      accentGlow: "rgba(245,158,11,0.3)",
    },
    {
      t: "AI Copilot",
      d: "Your always-on AI assistant that works across every workflow — drafting, scheduling, research, and strategic nudges on autopilot.",
      i: Bot,
      accent: "#14b8a6",
      accentGlow: "rgba(20,184,166,0.3)",
      featured: true,
    },
    {
      t: "Outcome Analytics",
      d: "Real-time dashboards tracking success metrics by cohort, institution, and individual — proof that the system delivers.",
      i: BarChart3,
      accent: "#ec4899",
      accentGlow: "rgba(236,72,153,0.3)",
      featured: true,
    },
  ];

  /* 20-column bento layout positions (desktop only).
     Row 1: 8 + 8 + 4   (big · big · small)
     Row 2: 5 + 5 + 5 + 5   (4 equal)
     Row 3: 4 + 8 + 8   (small · big · big) */
  const gridPos = [
    { col: "1 / 9",   row: "1" },   // 01 — featured
    { col: "9 / 17",  row: "1" },   // 02 — featured
    { col: "17 / 21", row: "1" },   // 03
    { col: "1 / 6",   row: "2" },   // 04
    { col: "6 / 11",  row: "2" },   // 05
    { col: "11 / 16", row: "2" },   // 06
    { col: "16 / 21", row: "2" },   // 07
    { col: "1 / 5",   row: "3" },   // 08
    { col: "5 / 13",  row: "3" },   // 09 — featured
    { col: "13 / 21", row: "3" },   // 10 — featured
  ];

  return (
    <section id="platform" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="Ten systems. One operating model." />

        <div className="mt-14 platform-grid">
          {items.map(({ t, d, i: Icon, accent, accentGlow, featured }, idx) => (
            <div
              key={t}
              className={`platform-card${featured ? " featured" : ""}`}
              style={{
                "--card-accent-glow": accentGlow,
                gridColumn: gridPos[idx]?.col,
                gridRow: gridPos[idx]?.row,
              } as React.CSSProperties}
            >
              {/* Numbered index */}
              <div className="platform-card-index">{String(idx + 1).padStart(2, "0")}</div>

              {/* Accent-colored icon */}
              <div
                className="platform-card-icon"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <h3 className="platform-card-title">{t}</h3>
              <p className="platform-card-desc">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stories() {
  const cards = [
    {
      who: "Ana K., PhD candidate",
      what: "Published 2 papers and secured a Marie Curie fellowship in 9 months.",
      m: ["2 papers", "€186K grant", "3 collaborators"],
    },
    {
      who: "Devin R., Founder",
      what: "From idea to a seed round of $2.1M with 4 verified design partners.",
      m: ["$2.1M raised", "4 LOIs", "8 hires"],
    },
    {
      who: "Priya S., Senior",
      what: "Landed a research internship at a top lab and a return offer.",
      m: ["1 internship", "+2 skills", "Return offer"],
    },
  ];
  return (
    <section className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Outcomes" title="Real people. Real, verified wins." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.who} className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div>
                  <div className="text-sm font-medium">{c.who}</div>
                  <div className="text-xs text-muted-foreground">Verified outcome</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed">{c.what}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.m.map((x) => (
                  <span key={x} className="rounded-full glass px-2.5 py-1 text-xs">
                    {x}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    {
      n: "Student",
      p: "$0",
      d: "For ambitious learners.",
      f: ["AI Assessment", "Roadmap Builder", "Community Access", "Workspace Hub"],
      cta: "Get started",
      accent: "#06b6d4", // Cyan
      accentGlow: "rgba(6, 182, 212, 0.35)",
      tier: "STU-01",
      barcode: "PH-STU-2026",
      category: "BASIC",
    },
    {
      n: "Research",
      p: "$19",
      d: "For researchers and labs.",
      f: ["Research Hub", "Grant Matching", "Collaboration Tools", "Workspace Hub"],
      cta: "Start trial",
      featured: true,
      accent: "#7c3aed", // Violet
      accentGlow: "rgba(124, 58, 237, 0.35)",
      tier: "RES-02",
      barcode: "PH-RES-2026",
      category: "PRO",
    },
    {
      n: "Startup",
      p: "$49",
      d: "For founders and teams.",
      f: ["Startup Hub", "Investor Matching", "Pitch Deck Reviews", "Research Hub"],
      cta: "Start trial",
      accent: "#d946ef", // Fuchsia
      accentGlow: "rgba(217, 70, 239, 0.35)",
      tier: "STA-03",
      barcode: "PH-STA-2026",
      category: "GROWTH",
    },
    {
      n: "Enterprise",
      p: "Custom",
      d: "For universities & corps.",
      f: ["SSO & Permissions", "Analytics Dashboards", "Dedicated Support", "Integrations"],
      cta: "Talk to us",
      accent: "#f97316", // Gold/Orange
      accentGlow: "rgba(249, 115, 22, 0.35)",
      tier: "ENT-04",
      barcode: "PH-ENT-2026",
      category: "ENTERPRISE",
    },
  ];
  return (
    <section id="pricing" className="py-28 relative overflow-hidden">
      {/* Background ambient glowing details */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionHead eyebrow="Pricing" title="Plans for every stage of growth." />
        
        <div className="mt-16 pricing-tickets-grid">
          {plans.map((p) => (
            <Link
              key={p.n}
              to="/app"
              className="ticket-wrapper block text-left"
              style={{
                "--t-accent": p.accent,
                "--t-accent-glow": p.accentGlow,
              } as React.CSSProperties}
            >
              <div className="ticket">
                {/* Main Pass Info */}
                <div className="t-main">
                  <div className="t-content">
                    
                    {/* Top: Logo & Pass Category */}
                    <div className="t-header">
                      <div className="t-logo">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path
                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                        {p.category}
                      </div>
                      <div className="t-type">{p.n} Pass</div>
                    </div>

                    {/* Pricing Tier Details */}
                    <div className="t-title">
                      {p.p}
                      {p.p !== "Custom" && <span className="text-sm font-semibold tracking-normal text-slate-500 lowercase ml-1">/mo</span>}
                    </div>
                    <div className="t-subtitle">{p.d}</div>

                    {/* Features Detail Grid */}
                    <div className="t-details">
                      {p.f.map((feature, idx) => (
                        <div className="t-detail-item" key={idx}>
                          <span className="t-label">Feature 0{idx + 1}</span>
                          <span className="t-value" title={feature}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                  </div>

                  {/* Perf separator */}
                  <div className="t-perforation" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", transform: "translateY(50%)" }}>
                    <div className="t-perf-line" />
                  </div>
                </div>

                {/* Ticket Stub Barcode / Admit */}
                <div className="t-stub">
                  
                  {/* Barcode details */}
                  <div className="t-barcode-container">
                    <div className="t-barcode" />
                    <div className="t-barcode-id">{p.barcode}</div>
                  </div>

                  {/* Admission details (Tier index) */}
                  <div className="t-admit">
                    <div className="t-admit-text">Tier</div>
                    <div className="t-admit-num">{p.tier.split("-")[1]}</div>
                  </div>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.49 1.977 14.026.957 11.4.957c-5.44 0-9.865 4.37-9.87 9.802-.001 1.772.475 3.5 1.378 5.027L1.935 21.8l6.19-1.626zm12.355-6.967c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#05060F] pt-16 pb-0 overflow-hidden text-white/70">
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Information */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-white/60 mt-1 max-w-md">
            AI-powered platform helping students, researchers, and innovators discover the right career path, execute projects, and plan their academic journey with confidence. Our mission is to make career exploration simple, accessible, and personalized for every student.
          </p>
          <div className="text-[13px] text-white/40 font-medium">
            Professional Home Pvt Ltd
          </div>
        </div>

        {/* Contact Us */}
        <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3.5 text-[13.5px]">
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-white/80">Surat, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <Mail className="h-4 w-4" />
                </span>
                <a href="mailto:professionalhome@gmail.com" className="text-white/80 hover:text-violet-400 transition-colors">
                  professionalhome@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+911234567890" className="text-white/80 hover:text-violet-400 transition-colors">
                  +91 1234567890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3.5">Connect</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sitemap Links */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Site Map</h3>
          <ul className="grid gap-2.5 text-[13.5px]">
            {[
              { to: "/", label: "Home" },
              { to: "/", hash: "how", label: "How" },
              { to: "/", hash: "ecosystem", label: "Ecosystem" },
              { to: "/", hash: "platform", label: "Platform" },
              { to: "/", hash: "pricing", label: "Pricing" },
              { to: "/app", label: "Login / Sign Up" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className="text-white/75 hover:text-white hover:underline transition decoration-white/20 underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Legal / Copyright strip */}
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 mt-16 pt-8 border-t border-dashed border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white transition-colors">Manage Cookies</Link>
        </div>
        <div>
          © 2026 Professional Home Pvt Ltd. All rights reserved.
        </div>
      </div>

      {/* Giant Watermark Layer (rendered behind/below everything) */}
      <div className="relative w-full pointer-events-none select-none z-0 overflow-hidden h-[18vw] min-h-[140px] flex items-end justify-center mt-2">
        {/* Vibrant violet-purple background gradient matching reference image */}
        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-t from-[#7C3AED]/30 via-[#4C1D95]/5 to-transparent pointer-events-none" />
        {/* Radial spotlight centered at the bottom to give that intense bright glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.45)_0%,rgba(139,92,246,0.18)_40%,transparent_70%)] blur-2xl pointer-events-none" />

        <h1 className="relative z-10 text-[9.2vw] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/25 via-white/5 to-transparent select-none uppercase font-sans whitespace-nowrap">
          Professional Home
        </h1>
      </div>
    </footer>
  );
}
