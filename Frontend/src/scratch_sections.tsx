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
      cat: "ASSESS",
      t: "AI Assessment",
      d: "Deep multi-domain analysis of skills, goals, gaps, and timing.",
      img: "/AI Assessment.jpeg",
      i: Brain,
    },
    {
      n: "02",
      cat: "MATCH",
      t: "Expert Matching",
      d: "Matched to vetted mentors, advisors, and collaborators.",
      img: "/Expert Matching.jpeg",
      i: Users,
    },
    {
      n: "03",
      cat: "PLAN",
      t: "Roadmap Creation",
      d: "A measurable plan with milestones, dependencies, and risk.",
      img: "/Roadmap Creation.jpeg",
      i: Map,
    },
    {
      n: "04",
      cat: "TRACK",
      t: "Execution Tracking",
      d: "Kanban, calendar, and milestone tracking with AI nudges.",
      img: "/Execution Tracking.jpeg",
      i: GanttChart,
    },
    {
      n: "05",
      cat: "ACHIEVE",
      t: "Outcome Achievement",
      d: "Internships, jobs, papers, patents, funding ΓÇö verified.",
      img: "/Outcome Achievement.jpeg",
      i: Trophy,
    },
  ];
  return (
    <section id="how" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps from ambition to outcome." />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, cat, t, d, img }) => (
            <li
              key={n}
              className="relative group overflow-hidden rounded-[24px] h-[450px] flex flex-col justify-end p-6 border-2 border-white/20 shadow-2xl transition-all duration-300 hover:border-purple-500/60"
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={img}
                  alt={t}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top Row: Center-aligned Stencil Stiled Number */}
                <div className="flex justify-center w-full mt-2">
                  <span 
                    className="text-6xl font-black text-white select-none tracking-widest"
                    style={{ fontFamily: "'Big Shoulders Stencil Display', sans-serif" }}
                  >
                    {parseInt(n)}
                  </span>
                </div>

                {/* Bottom Row: Text Details with Fixed Height for Perfect Horizontal Alignment */}
                <div className="text-left mt-auto h-[160px] flex flex-col justify-start">
                  <div className="text-[10px] font-bold tracking-[0.22em] text-purple-400 uppercase mb-2">
                    {cat}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors duration-300">
                    {t}
                  </h3>
                  <p className="mt-2 text-xs text-white/60 leading-relaxed font-sans line-clamp-4">
                    {d}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Ecosystem() {
  const cards = [
    {
      title: "Students",
      index: "01",
      icon: GraduationCap,
      metrics: [
        { label: "Skills Profile", value: "92% Complete" },
        { label: "Vetted Offers", value: "2 Secured" },
        { label: "Career Pathing", value: "AI-Optimized" }
      ]
    },
    {
      title: "Researchers",
      index: "02",
      icon: FlaskConical,
      metrics: [
        { label: "Publications", value: "3 Accepted" },
        { label: "Marie Curie Grant", value: "Γé¼186K Funded" },
        { label: "Collaborations", value: "8 Active Labs" }
      ]
    },
    {
      title: "Universities",
      index: "03",
      icon: School,
      metrics: [
        { label: "R&D Projects", value: "42 Active" },
        { label: "Academic Tier", value: "Tier 1 Partner" },
        { label: "Placement Rate", value: "96.8% Verified" }
      ]
    },
    {
      title: "Startups",
      index: "04",
      icon: Rocket,
      metrics: [
        { label: "Seed Funding", value: "$2.1M Raised" },
        { label: "Advisor Matches", value: "4 Advisors" },
        { label: "Growth Index", value: "+42% MoM" }
      ]
    },
    {
      title: "Investors",
      index: "05",
      icon: Coins,
      metrics: [
        { label: "Vetted Deal Flow", value: "28 Deals/mo" },
        { label: "Portfolio Status", value: "12 Co-invests" },
        { label: "Projected IRR", value: "32% Avg" }
      ]
    },
    {
      title: "Industry Experts",
      index: "06",
      icon: UserCheck,
      metrics: [
        { label: "Advisory Capacity", value: "14 hrs Matched" },
        { label: "Consulting Pool", value: "Verified Mentor" },
        { label: "Client Rating", value: "4.95 / 5.0" }
      ]
    }
  ];

  // Connection paths in the SVG viewport (0 0 960 700)
  const paths = [
    { d: "M 480 350 C 400 350, 320 110, 240 110", dur: "4.2s" }, // Card 1 (Top Left)
    { d: "M 480 350 L 240 350",                  dur: "3.6s" }, // Card 2 (Middle Left)
    { d: "M 480 350 C 400 350, 320 590, 240 590", dur: "4.8s" }, // Card 3 (Bottom Left)
    { d: "M 480 350 C 560 350, 640 110, 720 110", dur: "4.0s" }, // Card 4 (Top Right)
    { d: "M 480 350 L 720 350",                  dur: "3.8s" }, // Card 5 (Middle Right)
    { d: "M 480 350 C 560 350, 640 590, 720 590", dur: "4.5s" }  // Card 6 (Bottom Right)
  ];

  return (
    <section id="ecosystem" className="border-y border-border py-28 overflow-hidden bg-[#05060F] relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)] blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="The Ecosystem" title="One network. Every role. Real relationships." />

        <div className="mt-16 relative">
          {/* Layout Container */}
          <div className="eco-layout-container">
            {/* SVG Connections Layer (Visible on desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
              viewBox="0 0 960 700"
              fill="none"
            >
              {paths.map((p, idx) => (
                <g key={idx}>
                  {/* Shadow/Glow Line */}
                  <path
                    d={p.d}
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-[0.06]"
                    style={{ filter: "blur(3px)" }}
                  />
                  {/* Core Static Connection Line */}
                  <path
                    d={p.d}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Animated Neon Flowing Dot */}
                  <circle r="3.5" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 6px #38bdf8)" }}>
                    <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
                  </circle>
                </g>
              ))}

              {/* Atomic Orbits loops around center (480, 350) with animated flowing dots */}
              {/* Atomic Orbit 1 */}
              <g transform="rotate(-30 480 350)">
                <path
                  d="M 380 350 A 100 40 0 1 0 580 350 A 100 40 0 1 0 380 350"
                  stroke="rgba(56, 189, 248, 0.25)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle r="3" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 5px #38bdf8)" }}>
                  <animateMotion dur="5s" repeatCount="indefinite" path="M 380 350 A 100 40 0 1 0 580 350 A 100 40 0 1 0 380 350" />
                </circle>
              </g>

              {/* Atomic Orbit 2 */}
              <g transform="rotate(30 480 350)">
                <path
                  d="M 380 350 A 100 40 0 1 0 580 350 A 100 40 0 1 0 380 350"
                  stroke="rgba(56, 189, 248, 0.25)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle r="3" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 5px #38bdf8)" }}>
                  <animateMotion dur="6s" repeatCount="indefinite" path="M 380 350 A 100 40 0 1 0 580 350 A 100 40 0 1 0 380 350" />
                </circle>
              </g>

              {/* Atomic Orbit 3 */}
              <g transform="rotate(90 480 350)">
                <path
                  d="M 375 350 A 105 45 0 1 0 585 350 A 105 45 0 1 0 375 350"
                  stroke="rgba(192, 132, 252, 0.25)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle r="3" fill="#c084fc" style={{ filter: "drop-shadow(0 0 5px #c084fc)" }}>
                  <animateMotion dur="7s" repeatCount="indefinite" path="M 375 350 A 105 45 0 1 0 585 350 A 105 45 0 1 0 375 350" />
                </circle>
              </g>
            </svg>

            {/* Central AI Core */}
            <div className="eco-core-wrapper">
              <div className="eco-core-glow-bg" />
              <div className="eco-core-sphere">
                <div className="eco-core-inner-glow" />
                {/* Brain core content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
                    AI CORE
                  </span>
                  <span className="text-xs font-black tracking-tight text-white uppercase mt-0.5">
                    PH-OS
                  </span>
                </div>
              </div>
            </div>

            {/* Ecosystem Cards */}
            {cards.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className={`eco-glass-card card-${idx + 1}`}>
                  <div className="eco-card-header">
                    <div className="eco-card-title-group">
                      <span className="eco-card-title-icon">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="eco-card-title">{c.title}</span>
                    </div>
                    <span className="eco-card-index">{c.index}</span>
                  </div>
                  
                  <div className="eco-card-divider" />
                  
                  <div className="eco-card-body">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="eco-card-metric">
                        <span className="eco-metric-label">{m.label}</span>
                        <span className="eco-metric-value">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
      d: "Deep multi-domain analysis of your skills, goals, risk profile, and timing ΓÇö actionable insights in minutes, not months.",
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
      d: "Your always-on AI assistant that works across every workflow ΓÇö drafting, scheduling, research, and strategic nudges on autopilot.",
      i: Bot,
      accent: "#14b8a6",
      accentGlow: "rgba(20,184,166,0.3)",
      featured: true,
    },
    {
      t: "Outcome Analytics",
      d: "Real-time dashboards tracking success metrics by cohort, institution, and individual ΓÇö proof that the system delivers.",
      i: BarChart3,
      accent: "#ec4899",
      accentGlow: "rgba(236,72,153,0.3)",
      featured: true,
    },
  ];

  return (
    <section id="platform" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="Ten systems. One operating model." />

        <div className="mt-14 platform-grid">
          {items.map(({ t, d, i: Icon, accent, accentGlow, featured }, idx) => (
            <div
              key={t}
              className={`platform-card${featured ? " featured" : ""} platform-card-${idx + 1}`}
              style={{
                "--card-accent-glow": accentGlow,
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
      m: ["2 papers", "Γé¼186K grant", "3 collaborators"],
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
              search={{ tab: "home" }}
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
              { to: "/login", label: "Login / Sign Up" },
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
