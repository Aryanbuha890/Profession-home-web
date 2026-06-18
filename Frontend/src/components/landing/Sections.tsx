import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
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
import { motion } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";

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
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="text-xs uppercase tracking-[0.22em] text-[var(--electric)]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl text-white">
        <ScrollReveal>{title}</ScrollReveal>
      </h2>
      {sub && (
        <p className="mt-4 text-muted-foreground">
          <ScrollReveal>{sub}</ScrollReveal>
        </p>
      )}
    </motion.div>
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
      d: "Internships, jobs, papers, patents, funding — verified.",
      img: "/Outcome Achievement.jpeg",
      i: Trophy,
    },
  ];
  return (
    <section id="how" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps from ambition to outcome." />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, cat, t, d, img }, idx) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
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
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Ecosystem() {
  const roles = [
    {
      title: "Students",
      num: "01",
      icon: GraduationCap,
      accent: "#a78bfa",
      accentRgb: "167,139,250",
      description: "AI-powered skill mapping and personalized career trajectories that adapt to your growth.",
      metrics: [
        { label: "Skills Profile", value: "92%" },
        { label: "Vetted Offers", value: "2 Secured" },
        { label: "Career Path", value: "AI-Optimized" }
      ]
    },
    {
      title: "Researchers",
      num: "02",
      icon: FlaskConical,
      accent: "#38bdf8",
      accentRgb: "56,189,248",
      description: "Grant discovery, lab collaboration matching, and real-time publication tracking.",
      metrics: [
        { label: "Publications", value: "3 Accepted" },
        { label: "Grant Funded", value: "\u20ac186K" },
        { label: "Active Labs", value: "8 Collab" }
      ]
    },
    {
      title: "Startups",
      num: "03",
      icon: Rocket,
      accent: "#34d399",
      accentRgb: "52,211,153",
      description: "Investor matching, advisor networks, and growth analytics built for scale.",
      metrics: [
        { label: "Seed Round", value: "$2.1M" },
        { label: "Advisors", value: "4 Active" },
        { label: "Growth", value: "+42% MoM" }
      ]
    }
  ];

  return (
    <section id="ecosystem" className="border-y border-border py-28 overflow-hidden bg-[#05060F] relative">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(167,139,250,0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(52,211,153,0.1), transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="The Ecosystem" title="One network. Every role. Real relationships." />

        {/* 3-Panel Grid */}
        <div className="eco-panels-grid">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="eco-panel"
                style={{
                  '--panel-accent': role.accent,
                  '--panel-accent-rgb': role.accentRgb,
                  '--panel-delay': `${idx * 0.15}s`,
                } as React.CSSProperties}
              >
                {/* Animated gradient border wrapper */}
                <div className="eco-panel-border-wrap">
                  <div className="eco-panel-border-glow" />
                </div>

                {/* Card content */}
                <div className="eco-panel-content">
                  {/* Large watermark number */}
                  <span className="eco-panel-watermark">{role.num}</span>

                  {/* Icon */}
                  <div className="eco-panel-icon-wrap">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="eco-panel-title">{role.title}</h3>

                  {/* Description */}
                  <p className="eco-panel-desc">{role.description}</p>

                  {/* Divider with accent dot */}
                  <div className="eco-panel-divider">
                    <div className="eco-panel-divider-line" />
                    <div className="eco-panel-divider-dot" />
                    <div className="eco-panel-divider-line" />
                  </div>

                  {/* Metrics */}
                  <div className="eco-panel-metrics">
                    {role.metrics.map((m) => (
                      <div key={m.label} className="eco-panel-metric">
                        <span className="eco-panel-metric-dot" />
                        <span className="eco-panel-metric-label">{m.label}</span>
                        <span className="eco-panel-metric-value">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA arrow */}
                  <div className="eco-panel-cta">
                    <span>Explore</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    {
      t: "Professional Home",
      d: "Understands your skills, goals, strengths, and opportunities.",
      i: School,
      accent: "#7c3aed",
      accentGlow: "rgba(124,58,237,0.3)",
    },
    {
      t: "Personalized Guidance Session",
      d: "Your ambitions deserve more than generic advice. Get personalised guidance tailored to your unique journey and aspirations.",
      i: Users,
      accent: "#06b6d4",
      accentGlow: "rgba(6,182,212,0.3)",
      featured: true,
    },
    {
      t: "Growth Roadmap",
      d: "Personalised milestones and action plans for your goals.",
      i: Map,
      accent: "#8b5cf6",
      accentGlow: "rgba(139,92,246,0.3)",
    },
    {
      t: "Career Growth",
      d: "Internships, jobs, portfolio building, and career guidance.",
      i: Briefcase,
      accent: "#10b981",
      accentGlow: "rgba(16,185,129,0.3)",
    },
    {
      t: "Achievement Tracker",
      d: "Track progress, outcomes, certifications, and verified achievements.",
      i: Trophy,
      accent: "#f59e0b",
      accentGlow: "rgba(245,158,11,0.3)",
    },
    {
      t: "AI",
      d: "Your always-on assistant for planning, learning, research, and execution.",
      i: Bot,
      accent: "#14b8a6",
      accentGlow: "rgba(20,184,166,0.3)",
      featured: true,
    },
  ];

  return (
    <section id="platform" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="One Platform for Professional Growth" />

        <div className="mt-14 platform-grid">
          {items.map(({ t, d, i: Icon, accent, accentGlow, featured }, idx) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: "easeOut" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesCarousel() {
  const items = [
    {
      number: "01",
      title: "Professional Home",
      description: "Understands your skills, goals, strengths, and opportunities.",
      icon: Brain,
      colorStart: "124, 58, 237", // Purple/Indigo
      colorEnd: "79, 70, 229",
    },
    {
      number: "02",
      title: "Personalized Guidance Session",
      description: "Your ambitions deserve more than generic advice.",
      icon: Users,
      colorStart: "6, 182, 212", // Cyan/Teal
      colorEnd: "13, 148, 136",
    },
    {
      number: "03",
      title: "Growth Roadmap",
      description: "Personalised milestones and action plans for your goals.",
      icon: Map,
      colorStart: "217, 70, 239", // Fuchsia/Pink
      colorEnd: "219, 39, 119",
    },
    {
      number: "04",
      title: "Career Growth",
      description: "Internships, jobs, portfolio building, and career guidance.",
      icon: Briefcase,
      colorStart: "16, 185, 129", // Emerald/Green
      colorEnd: "22, 163, 74",
    },
    {
      number: "05",
      title: "Achievement Tracker",
      description: "Track progress, outcomes, certifications, and verified achievements.",
      icon: Trophy,
      colorStart: "245, 158, 11", // Amber/Orange
      colorEnd: "234, 88, 12",
    },
    {
      number: "06",
      title: "AI",
      description: "Your always-on assistant for planning, learning, research, and execution.",
      icon: Bot,
      colorStart: "59, 130, 246", // Blue/Violet
      colorEnd: "124, 58, 237",
    },
  ];

  return (
    <section 
      id="platform-carousel" 
      className="py-24 bg-[#05060F] overflow-visible select-none"
    >
      <div className="mx-auto max-w-6xl px-6 overflow-visible relative">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <div className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6] font-semibold">
            Interactive
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Interactive 3D Ecosystem
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base">
            Explore the professional growth modules in a continuous 3D rotating loop.
          </p>
        </div>

        {/* ====== 3D Carousel – Flex Centered ====== */}
        <style>{`
          .carousel-uiverse-wrapper {
            width: 100%;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: visible;
            margin: 0.5rem 0 2rem 0;
          }
          .carousel-uiverse-inner {
            --w: 200px;
            --h: 290px;
            --translateZ: calc(var(--w) * 2.5);
            --rotateX: -6deg;
            --perspective: 2000px;
            width: var(--w);
            height: var(--h);
            transform-style: preserve-3d;
            transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0deg);
            animation: rotating-uiverse 36s linear infinite;
            position: relative;
          }
          @keyframes rotating-uiverse {
            from {
              transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0deg);
            }
            to {
              transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(360deg);
            }
          }
          .carousel-uiverse-card {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: 1.5px solid transparent;
            border-radius: 20px;
            overflow: hidden;
            transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
            box-shadow: 
              0 15px 35px -10px rgba(0,0,0,0.85),
              inset 0 1px 1px rgba(255,255,255,0.12);
            
            /* True glass gradient border technique using padding-box and border-box */
            background: 
              linear-gradient(135deg, rgba(15, 16, 35, 0.6) 0%, rgba(5, 6, 15, 0.8) 100%) padding-box,
              linear-gradient(135deg, rgba(var(--color-start), 0.45) 0%, rgba(var(--color-end), 0.1) 100%) border-box;

            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            padding: 28px 22px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            transition: 
              transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), 
              box-shadow 0.4s ease;
            cursor: default;
          }

          /* Premium diagonal shine sweep */
          .carousel-uiverse-card::after {
            content: '';
            position: absolute;
            top: -150%;
            left: -150%;
            width: 300%;
            height: 300%;
            background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.12) 50%, transparent 55%);
            transition: transform 0.8s ease;
            transform: rotate(45deg);
            pointer-events: none;
            z-index: 5;
          }
          .carousel-uiverse-card:hover::after {
            transform: translate(100%, 100%) rotate(45deg);
          }

          .carousel-uiverse-card:hover {
            transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(calc(var(--translateZ) + 25px));
            box-shadow: 
              0 25px 50px -15px rgba(var(--color-start), 0.5),
              inset 0 1px 2px rgba(255,255,255,0.22);
            background: 
              linear-gradient(135deg, rgba(15, 16, 35, 0.5) 0%, rgba(5, 6, 15, 0.7) 100%) padding-box,
              linear-gradient(135deg, rgba(var(--color-start), 0.85) 0%, rgba(var(--color-end), 0.3) 100%) border-box;
          }
          
          .carousel-uiverse-card .card-number {
            font-size: 2rem;
            font-weight: 900;
            color: rgba(var(--color-start), 0.95);
            font-family: 'Big Shoulders Stencil Display', sans-serif;
            margin-bottom: 12px;
            letter-spacing: 0.05em;
            line-height: 1;
          }
          .carousel-uiverse-card .card-icon {
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(var(--color-start), 0.15);
            border: 1px solid rgba(var(--color-start), 0.35);
            color: rgba(var(--color-start), 1);
            transition: all 0.3s ease;
          }
          .carousel-uiverse-card:hover .card-icon {
            background: rgba(var(--color-start), 0.25);
            border-color: rgba(var(--color-start), 0.55);
            transform: scale(1.08) rotate(3deg);
          }
          .carousel-uiverse-card .card-icon svg {
            width: 24px;
            height: 24px;
          }
          .carousel-uiverse-card .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            margin-bottom: 10px;
            line-height: 1.25;
            letter-spacing: -0.01em;
          }
          .carousel-uiverse-card .card-desc {
            font-size: 0.88rem;
            color: rgba(255,255,255,0.65);
            line-height: 1.55;
            font-weight: 400;
          }
          @media (max-width: 1024px) {
            .carousel-uiverse-wrapper {
              height: 550px;
            }
            .carousel-uiverse-inner {
              --w: 170px;
              --h: 250px;
              --translateZ: calc(var(--w) * 2.2);
            }
            .carousel-uiverse-card {
              padding: 24px 18px;
            }
            .carousel-uiverse-card .card-title {
              font-size: 1.1rem;
            }
            .carousel-uiverse-card .card-desc {
              font-size: 0.82rem;
            }
          }
          @media (max-width: 768px) {
            .carousel-uiverse-wrapper {
              height: 480px;
            }
            .carousel-uiverse-inner {
              --w: 140px;
              --h: 210px;
              --translateZ: calc(var(--w) * 1.9);
            }
            .carousel-uiverse-card {
              padding: 20px 14px;
              border-radius: 16px;
            }
            .carousel-uiverse-card .card-title {
              font-size: 0.98rem;
            }
            .carousel-uiverse-card .card-desc {
              font-size: 0.72rem;
              line-height: 1.45;
            }
            .carousel-uiverse-card .card-icon {
              width: 38px;
              height: 38px;
              margin-bottom: 12px;
            }
            .carousel-uiverse-card .card-icon svg {
              width: 20px;
              height: 20px;
            }
          }
          @media (max-width: 480px) {
            .carousel-uiverse-wrapper {
              height: 380px;
            }
            .carousel-uiverse-inner {
              --w: 110px;
              --h: 170px;
              --translateZ: calc(var(--w) * 1.6);
            }
            .carousel-uiverse-card {
              padding: 14px 10px;
              border-radius: 12px;
            }
            .carousel-uiverse-card .card-number {
              font-size: 0.65rem;
              margin-bottom: 8px;
            }
            .carousel-uiverse-card .card-title {
              font-size: 0.8rem;
            }
            .carousel-uiverse-card .card-desc {
              font-size: 0.62rem;
            }
            .carousel-uiverse-card .card-icon {
              width: 28px;
              height: 28px;
              border-radius: 8px;
              margin-bottom: 8px;
            }
            .carousel-uiverse-card .card-icon svg {
              width: 16px;
              height: 16px;
            }
          }
        `}</style>

        <div className="carousel-uiverse-wrapper">
          <div
            className="carousel-uiverse-inner"
            style={
              {
                '--quantity': items.length,
              } as React.CSSProperties
            }
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="carousel-uiverse-card"
                  style={
                    {
                      '--index': idx,
                      '--color-start': item.colorStart,
                      '--color-end': item.colorEnd,
                    } as React.CSSProperties
                  }
                >
                  <div className="card-number">{item.number}</div>
                  <div className="card-icon">
                    <Icon />
                  </div>
                  <div className="card-title">{item.title}</div>
                  <div className="card-desc">{item.description}</div>
                </div>
              );
            })}
          </div>
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
          {cards.map((c, idx) => (
            <motion.article
              key={c.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="glass-strong rounded-2xl p-6"
            >
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
            </motion.article>
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
          {plans.map((p, idx) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: "easeOut" }}
            >
              <Link
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
            </motion.div>
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
              { to: "/", hash: "faq", label: "FAQ" },
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

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is Professional Home?",
      answer: "Professional Home is a unified career operating system designed to turn professional ambition into achievement. We combine AI diagnostics, expert mentorship matching, interactive growth roadmaps, and verified outcome tracking to help students, researchers, and founders succeed."
    },
    {
      question: "Who is Professional Home for?",
      answer: "It is built for three primary groups: Students looking to accelerate academic and career velocity; Researchers seeking citation impact, collaborations, and grant funding; and Startup Founders looking to secure capital, build advisor boards, and manage pitch data rooms."
    },
    {
      question: "How does the AI Career Diagnostic work?",
      answer: "Our proprietary AI analysis maps your current skill profile, academic/professional situation, and career aspirations, cross-referencing them with industry pathways to generate a personalized action roadmap."
    },
    {
      question: "What is the Expert Matching system?",
      answer: "We match you with verified industry veterans and academic advisors (e.g., McKinsey partners, Tier-1 startup founders, MIT researchers) who provide one-on-one consultations, resume deep-scans, and pitch deck reviews."
    },
    {
      question: "Is there a free trial or entry-level tier?",
      answer: "Yes! The Student tier is completely free ($0/mo) and includes basic AI assessments, roadmap building, and workspace hub features. We also offer 14-day trials on our Pro Research and Growth Startup passes."
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#05060F]">
      {/* Glow details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          FAQ
        </div>
        
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Frequently asked questions
        </h2>
        
        <p className="mt-4 text-slate-400 text-sm sm:text-base">
          Haven't found what you're looking for?{" "}
          <button
            onClick={() => {
              document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-violet-400 hover:text-violet-300 transition-colors font-medium underline underline-offset-4 decoration-violet-400/30 cursor-pointer bg-transparent border-none p-0"
          >
            Contact us.
          </button>
        </p>

        <div className="mt-16 max-w-3xl mx-auto flex flex-col border-t border-white/5 text-left">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-white/5 py-6 sm:py-7">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="text-base sm:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-200 tracking-tight">
                    {item.question}
                  </span>
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                    {/* Horizontal line */}
                    <div className="absolute w-4.5 h-[1.5px] bg-slate-500 group-hover:bg-slate-300 transition-colors duration-205" />
                    {/* Vertical line */}
                    <motion.div
                      className="absolute w-[1.5px] h-4.5 bg-slate-500 group-hover:bg-slate-300 transition-colors duration-205"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-[90%] font-normal">
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome aboard! Let's get started on your professional roadmap.", {
      description: `We've sent a kickoff diagnostic roadmap email to ${email}`,
    });
    setEmail("");
  };

  return (
    <section id="contact-cta" className="py-24 relative overflow-hidden bg-[#05060F]">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="relative w-full max-w-5xl mx-auto rounded-[32px] border border-white/[0.08] cta-glass-card overflow-hidden px-6 py-16 sm:py-20 text-center">
          
          {/* Top perspective grid - converging downward into deep center */}
          <div className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none overflow-hidden select-none">
            <svg 
              viewBox="0 0 1000 180" 
              className="w-full h-full" 
              preserveAspectRatio="none"
              style={{
                maskImage: "linear-gradient(to bottom, black 35%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 95%)"
              }}
            >
              <defs>
                <linearGradient id="top-glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Converging vertical lines (wide at top y=0, narrow at bottom y=180) */}
              {Array.from({ length: 21 }).map((_, i) => {
                const t = (i - 10) / 10;
                const x1 = 500 + t * 620;
                const x2 = 500 + t * 90;
                return (
                  <line
                    key={`top-v-${i}`}
                    x1={x1}
                    y1={0}
                    x2={x2}
                    y2={180}
                    stroke="rgba(139, 92, 246, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Perspective spaced horizontal lines (closer together near bottom vanishing point) */}
              {[0, 45, 85, 120, 145, 162, 174, 180].map((y, idx) => (
                <line
                  key={`top-h-${idx}`}
                  x1={0}
                  y1={y}
                  x2={1000}
                  y2={y}
                  stroke="rgba(139, 92, 246, 0.08)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          {/* Bottom perspective grid - converging upward into deep center */}
          <div className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none overflow-hidden select-none">
            <svg 
              viewBox="0 0 1000 180" 
              className="w-full h-full" 
              preserveAspectRatio="none"
              style={{
                maskImage: "linear-gradient(to top, black 35%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to top, black 35%, transparent 95%)"
              }}
            >
              <defs>
                <linearGradient id="bottom-glow-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Converging vertical lines (wide at bottom y=180, narrow at top y=0) */}
              {Array.from({ length: 21 }).map((_, i) => {
                const t = (i - 10) / 10;
                const x1 = 500 + t * 620;
                const x2 = 500 + t * 90;
                return (
                  <line
                    key={`bottom-v-${i}`}
                    x1={x1}
                    y1={180}
                    x2={x2}
                    y2={0}
                    stroke="rgba(139, 92, 246, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Perspective spaced horizontal lines (closer together near top vanishing point) */}
              {[0, 6, 18, 35, 60, 95, 135, 180].map((y, idx) => (
                <line
                  key={`bottom-h-${idx}`}
                  x1={0}
                  y1={y}
                  x2={1000}
                  y2={y}
                  stroke="rgba(139, 92, 246, 0.08)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          {/* Symmetrical glowing ambient orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_60%)] blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.08)_0%,transparent_60%)] blur-3xl pointer-events-none" />

          {/* Symmetrical static stars/sparkles in background matching 3rd image */}
          <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-pulse pointer-events-none" />
          <div className="absolute top-[35%] right-[10%] w-1 h-1 bg-white rounded-full opacity-40 pointer-events-none" />
          <div className="absolute bottom-[22%] left-[18%] w-1 h-1 bg-white rounded-full opacity-25 pointer-events-none" />
          <div className="absolute bottom-[30%] right-[16%] w-1.5 h-1.5 bg-white rounded-full opacity-35 animate-pulse pointer-events-none" />
          <div className="absolute top-[50%] left-[8%] w-1.5 h-1.5 bg-white rounded-full opacity-20 pointer-events-none" />
          <div className="absolute bottom-[55%] right-[22%] w-1 h-1 bg-white rounded-full opacity-30 pointer-events-none" />

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            {/* Glowing Logo Container with White Border */}
            <div className="relative w-16 h-16 rounded-2xl bg-[#090b16] border-2 border-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.18)] mb-8 transition-transform duration-500 hover:scale-105 overflow-hidden select-none pointer-events-none">
              <img 
                src="/Logo.png" 
                alt="Professional Home Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 font-sans leading-[1.15]">
              Achieve Your Potential.<br />Starting Now.
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans">
              Professional Home combines AI assessments, expert guidance, and execution tracking to accelerate your growth.
            </p>

            {/* Shared Pill-shaped Input Container matching 3rd image */}
            <form onSubmit={handleSubmit} className="flex items-center bg-[#070913]/60 border border-white/[0.08] hover:border-white/15 focus-within:border-violet-500/50 rounded-full p-1.5 pl-6 transition-all duration-300 w-full max-w-md mx-auto z-10 relative">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500/70 flex-1 h-10"
              />
              <button
                type="submit"
                className="h-10 px-6 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-300 text-sm font-semibold cursor-pointer shrink-0"
              >
                Get Started
              </button>
            </form>

            {/* Form Meta Subtext (Horizontal layout with star badge) */}
            <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500/80 mt-6 font-sans pointer-events-none select-none">
              <span>No credit card required</span>
              <span className="text-violet-400/60 mx-1">✦</span>
              <span>Free diagnostic assessment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

