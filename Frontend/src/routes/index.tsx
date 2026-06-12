import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  LayoutDashboard,
  Brain,
  TrendingUp,
  Compass,
  Eye,
  Cpu,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Trust, Footer, HowItWorks, Ecosystem, Features, Pricing } from "@/components/landing/Sections";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Professional Home — Turn Ambition Into Achievement" },
      {
        name: "description",
        content:
          "AI-powered assessments, expert guidance, execution systems, and measurable outcomes for students, researchers, founders, and innovators.",
      },
      {
        property: "og:title",
        content: "Professional Home — Turn Ambition Into Achievement",
      },
      {
        property: "og:description",
        content:
          "The operating system for professional growth, research, innovation, and career success.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[#05060F] text-foreground antialiased overflow-x-clip">
      <Nav />
      <Hero />
      <DashboardSection />
      <Trust />
      <JourneySection />
      <HowItWorks />
      <Ecosystem />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white pt-24 pb-12"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 10%, rgba(124,58,237,0.32), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(37,99,235,0.22), transparent 60%), radial-gradient(700px 400px at 10% 20%, rgba(13,148,136,0.15), transparent 60%), linear-gradient(180deg, #05060F 0%, #07091A 60%, #05060F 100%)",
      }}
    >
      {/* Grid + scanline overlays */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 3px, transparent 4px)",
        }}
      />
      {/* Aurora radial backdrops */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.45),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.3),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.25),transparent)] blur-3xl" />

      <div className="relative w-full max-w-6xl px-6 flex flex-col justify-center items-center flex-1">
        <motion.div style={{ y }} className="mx-auto max-w-5xl text-center w-full flex flex-col items-center justify-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-xl animate-fade-up"
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              New
            </span>
            AI Copilot for research, careers & startups — now live
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[82px] md:leading-[1.05]"
          >
            Autonomous Intelligence
            <br className="hidden sm:inline" />{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-violet-300"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ffffff 0%, #C7D2FE 35%, #A78BFA 65%, #67E8F9 100%)",
              }}
            >
              for Modern Careers.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
          >
            Professional Home combines AI Assessment, Expert Mentorship, Research Tools, Startup
            Operations and Outcome Analytics into one unified command center.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/app"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(124,58,237,0.7)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage: "linear-gradient(120deg, #1B3A6B 0%, #2563EB 45%, #7C3AED 100%)",
              }}
            >
              <span className="relative z-10">Launch Command Center</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white/85 backdrop-blur-xl hover:bg-white/[0.08]">
              <PlayCircle className="h-4 w-4" /> Watch 90-sec Demo
            </button>
          </motion.div>

          {/* Trust strip indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/45"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> ISO 27001
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Deployed in 14 countries
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 99.99% uptime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative mx-auto mt-12 max-w-5xl"
    >
      {/* Glow aura */}
      <div className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[44px] bg-gradient-to-b from-violet-500/20 via-blue-500/10 to-transparent blur-3xl" />

      {/* Outer gradient bordered window */}
      <div
        className="rounded-[20px] p-[1px]"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.35), rgba(139,92,246,0.4) 30%, rgba(37,99,235,0.3) 60%, rgba(255,255,255,0.06) 100%)",
        }}
      >
        <div className="overflow-hidden rounded-[19px] bg-[#0A0E1F]/95 backdrop-blur-2xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]">
          {/* Top window browser bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-gradient-to-b from-[#0B1024] to-[#070A17] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <div className="ml-3 hidden items-center gap-1 text-[10px] font-mono text-white/35 lg:flex">
              <span className="text-white/55">professionalhome</span>
              <span className="text-white/25">/</span>
              <span className="text-white/55">command</span>
              <span className="text-white/25">/</span>
              <span className="text-white/80">overview</span>
            </div>

            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              professionalhome.ai/command
              <span className="ml-1 text-white/25">·</span>
              <span className="text-white/40">user-portal</span>
            </div>

            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/40">
              <span className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 md:inline-flex">
                <span>⌘</span>
                <span>K</span>
              </span>
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </span>
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-[9px] font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.06)]">
                AM
              </div>
            </div>
          </div>

          {/* Main workspace frame */}
          <div className="grid grid-cols-12 gap-px bg-white/5">
            {/* Sidebar */}
            <aside className="col-span-2 hidden flex-col gap-1 bg-[#0A0E1F] p-3 lg:flex">
              {[
                { i: Cpu, l: "Overview", a: true },
                { i: Brain, l: "AI Assessment" },
                { i: Users, l: "Expert Network" },
                { i: TrendingUp, l: "Execution Map" },
                { i: Compass, l: "Opportunities" },
              ].map((it, i) => {
                const Ic = it.i;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] font-medium transition-colors cursor-pointer ${
                      it.a
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Ic className="h-3.5 w-3.5" />
                    {it.l}
                  </div>
                );
              })}
            </aside>

            {/* Content panel */}
            <div className="col-span-12 grid grid-cols-12 gap-3 bg-[#0A0E1F] p-4 lg:col-span-10">
              {/* Success Score Gauge */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                  <span>Success Score</span>
                  <span className="text-emerald-300">Healthy</span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <defs>
                        <linearGradient id="score-g" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor="#34D399" />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="url(#score-g)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="97"
                        initial={{ strokeDashoffset: 97 }}
                        animate={{ strokeDashoffset: 97 - 97 * 0.86 }}
                        transition={{ duration: 1.6, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-white">86</div>
                        <div className="text-[8px] font-mono uppercase text-white/40">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Skills</span>
                      <span className="font-mono text-emerald-300">92%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Research</span>
                      <span className="font-mono text-cyan-300">74%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Outcomes</span>
                      <span className="font-mono text-blue-300">88%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Velocity Chart */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      User Growth Velocity · 24h
                    </div>
                    <div className="mt-1 font-display text-2xl font-semibold text-white">
                      12,408 <span className="text-xs font-medium text-emerald-300">↑ 8.4%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-mono text-white/50">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">24h</span>
                    <span className="px-2 py-0.5">7d</span>
                    <span className="px-2 py-0.5">30d</span>
                  </div>
                </div>

                <div className="relative mt-3">
                  <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-32 w-full">
                    <defs>
                      <linearGradient id="ar1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="line1" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                      <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* grid markers */}
                    {[20, 50, 80].map((yVal) => (
                      <line
                        key={yVal}
                        x1="0"
                        x2="400"
                        y1={yVal}
                        y2={yVal}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="2 4"
                      />
                    ))}
                    {/* y ticks */}
                    {[
                      { y: 20, l: "15k" },
                      { y: 50, l: "10k" },
                      { y: 80, l: "5k" },
                    ].map((t) => (
                      <text
                        key={t.y}
                        x="4"
                        y={t.y - 2}
                        fill="rgba(255,255,255,0.25)"
                        fontSize="7"
                        fontFamily="ui-monospace,monospace"
                      >
                        {t.l}
                      </text>
                    ))}
                    <motion.path
                      d="M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28 L400,110 L0,110 Z"
                      fill="url(#ar1)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.path
                      d="M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28"
                      fill="none"
                      stroke="url(#line1)"
                      strokeWidth="2"
                      filter="url(#glow1)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6 }}
                    />
                    {/* crosshair pointer */}
                    <line
                      x1="270"
                      x2="270"
                      y1="0"
                      y2="110"
                      stroke="rgba(167,139,250,0.35)"
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx="270"
                      cy="62"
                      r="5"
                      fill="#A78BFA"
                      stroke="#0A0E1F"
                      strokeWidth="2.5"
                    />
                    <circle cx="270" cy="62" r="9" fill="none" stroke="rgba(167,139,250,0.35)" />
                    {/* labels */}
                    {["00:00", "06:00", "12:00", "18:00", "24:00"].map((lbl, idx) => (
                      <text
                        key={lbl}
                        x={idx * 100}
                        y="118"
                        fill="rgba(255,255,255,0.3)"
                        fontSize="7"
                        fontFamily="ui-monospace,monospace"
                        textAnchor={idx === 0 ? "start" : idx === 4 ? "end" : "middle"}
                      >
                        {lbl}
                      </text>
                    ))}
                  </svg>
                  {/* floating tooltip card */}
                  <div
                    className="pointer-events-none absolute"
                    style={{ left: "calc(67.5% - 56px)", top: "8%" }}
                  >
                    <div className="rounded-lg border border-white/10 bg-[#0B1024]/90 px-2.5 py-1.5 text-[10px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="font-mono text-white/40">18:00</div>
                      <div className="font-display text-sm font-semibold text-white">11,842</div>
                      <div className="text-[9px] text-emerald-300">+6.2% vs avg</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sparkline cards */}
              {[
                {
                  l: "Active Goals",
                  v: "7",
                  c: "#60A5FA",
                  d: "+3 target",
                  spark: [6, 8, 7, 10, 9, 12, 11, 14],
                },
                {
                  l: "Verified Outcomes",
                  v: "14",
                  c: "#A78BFA",
                  d: "+8.4%",
                  spark: [4, 6, 5, 8, 7, 9, 11, 13],
                },
                {
                  l: "Active Mentors",
                  v: "3",
                  c: "#67E8F9",
                  d: "-2",
                  spark: [9, 8, 10, 7, 6, 5, 4, 3],
                },
                {
                  l: "Match Accuracy",
                  v: "98%",
                  c: "#34D399",
                  d: "stable",
                  spark: [10, 11, 10, 12, 11, 12, 11, 12],
                },
              ].map((k, i) => {
                const max = Math.max(...k.spark);
                const pts = k.spark
                  .map(
                    (val, idx) => `${(idx / (k.spark.length - 1)) * 100},${30 - (val / max) * 24}`,
                  )
                  .join(" ");
                return (
                  <div
                    key={i}
                    className="col-span-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/45 uppercase tracking-wider">
                        {k.l}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                        style={{ background: `${k.c}1a`, color: k.c }}
                      >
                        {k.d}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">{k.v}</div>
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="mt-2 h-6 w-full"
                    >
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={k.c}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                      <polyline points={`${pts} 100,30 0,30`} fill={k.c} opacity="0.12" />
                    </svg>
                  </div>
                );
              })}

              {/* Event Stream logs */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Live Event Stream
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    streaming
                  </span>
                </div>

                <ul className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-3">
                  {[
                    ["14:32", "New Opportunity: Microsoft Fellowship", "#67E8F9", "matched"],
                    ["14:28", "Milestone: Quantitative Methods 86%", "#EF4444", "alert"],
                    ["14:15", "Response: Dr. Helena Chen sent abstract", "#34D399", "ok"],
                  ].map(([t, msg, c, tag]) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="font-mono text-white/40">{t}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                      <span className="flex-1 truncate text-white/80">{msg}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase"
                        style={{ background: `${c}22`, color: c }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating interactive chips */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -left-6 top-24 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex"
      >
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
          <Eye className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="font-semibold">AI Copilot · Streaming</div>
          <div className="text-[10px] text-white/50">Marie Curie application checking</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute -right-6 bottom-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex"
      >
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <Cpu className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="font-semibold">Velocity · 60 FPS</div>
          <div className="text-[10px] text-white/50">Diagnostic engine running</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white backdrop-blur-2xl md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300 animate-pulse" />
        Copilot: "Analyzing Marie Curie application draft, found 3 recommendations."
      </motion.div>
    </motion.div>
  );
}

// HeroStats removed as requested

// Standalone section for the Dashboard Mockup
function DashboardSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 bg-[#05060F]">
      <div className="mx-auto max-w-6xl px-6">
        <FloatingDashboard />
      </div>
    </section>
  );
}

// Premium custom SVGs for the Journey Section cards
const DiscoverSvg = () => (
  <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(139,92,246,0.15)]">
    <defs>
      <radialGradient id="glow-discover" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad-discover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="75" fill="url(#glow-discover)" />
    
    {/* Orbiting rings */}
    <ellipse cx="100" cy="100" rx="70" ry="24" fill="none" stroke="url(#grad-discover)" strokeWidth="1.5" transform="rotate(30 100 100)" strokeDasharray="4 4" className="opacity-60" />
    <ellipse cx="100" cy="100" rx="70" ry="24" fill="none" stroke="url(#grad-discover)" strokeWidth="1.5" transform="rotate(-30 100 100)" className="opacity-80" />
    <ellipse cx="100" cy="100" rx="70" ry="24" fill="none" stroke="url(#grad-discover)" strokeWidth="2" transform="rotate(90 100 100)" />
    
    {/* Glowing particles */}
    <circle cx="135" cy="40" r="5" fill="#C7D2FE" />
    <circle cx="65" cy="160" r="4" fill="#8B5CF6" />
    <circle cx="160" cy="135" r="3" fill="#6366F1" />
    <circle cx="40" cy="65" r="5" fill="#A78BFA" />

    {/* Central bulb shape */}
    <g transform="translate(70, 60)">
      <path d="M30,0 C13.4,0 0,13.4 0,30 C0,41.4 6.4,51.3 15.8,56.3 C18,57.5 19.4,59.8 19.4,62.3 L19.4,68 C19.4,71.3 22.1,74 25.4,74 L34.6,74 C37.9,74 40.6,71.3 40.6,68 L40.6,62.3 C40.6,59.8 42,57.5 44.2,56.3 C53.6,51.3 60,41.4 60,30 C60,13.4 46.6,0 30,0 Z" fill="url(#grad-discover)" opacity="0.15" />
      <path d="M30,0 C13.4,0 0,13.4 0,30 C0,41.4 6.4,51.3 15.8,56.3 C18,57.5 19.4,59.8 19.4,62.3 L19.4,68 C19.4,71.3 22.1,74 25.4,74 L34.6,74 C37.9,74 40.6,71.3 40.6,68 L40.6,62.3 C40.6,59.8 42,57.5 44.2,56.3 C53.6,51.3 60,41.4 60,30 C60,13.4 46.6,0 30,0 Z" fill="none" stroke="url(#grad-discover)" strokeWidth="2.5" />
      {/* Filament */}
      <path d="M22,35 L26,30 L34,30 L38,35" fill="none" stroke="url(#grad-discover)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26,30 L26,45 M34,30 L34,45" fill="none" stroke="url(#grad-discover)" strokeWidth="2" />
      <circle cx="30" cy="20" r="10" fill="#FFF" opacity="0.9" className="animate-pulse" style={{ filter: "blur(3px)" }} />
    </g>
  </svg>
);

const CompareSvg = () => (
  <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(34,211,238,0.15)]">
    <defs>
      <radialGradient id="glow-compare" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad-compare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="50%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="75" fill="url(#glow-compare)" />

    {/* Browser Card Mockup */}
    <g transform="translate(45, 50)" className="opacity-90">
      {/* Card Base */}
      <rect x="0" y="0" width="110" height="80" rx="8" fill="#0B0F2B" stroke="url(#grad-compare)" strokeWidth="2" />
      {/* Card Header / Browser bar */}
      <path d="M0,8 A8,8 0 0,1 8,0 L102,0 A8,8 0 0,1 110,8 L110,18 L0,18 Z" fill="#14193F" />
      <circle cx="8" cy="9" r="3" fill="#FF5F57" />
      <circle cx="18" cy="9" r="3" fill="#FEBC2E" />
      <circle cx="28" cy="9" r="3" fill="#28C840" />
      {/* Card Content lines */}
      <rect x="10" y="28" width="50" height="8" rx="2" fill="url(#grad-compare)" opacity="0.8" />
      <rect x="10" y="42" width="90" height="6" rx="2" fill="#38BDF8" opacity="0.4" />
      <rect x="10" y="54" width="75" height="6" rx="2" fill="#38BDF8" opacity="0.4" />
      <rect x="10" y="66" width="45" height="6" rx="2" fill="#38BDF8" opacity="0.4" />
    </g>

    {/* Magnifying Glass */}
    <g transform="translate(100, 90)">
      {/* Handle */}
      <line x1="16" y1="16" x2="48" y2="48" stroke="url(#grad-compare)" strokeWidth="6" strokeLinecap="round" />
      <line x1="22" y1="22" x2="42" y2="42" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Glass Circle */}
      <circle cx="0" cy="0" r="28" fill="#0B0F2B" stroke="url(#grad-compare)" strokeWidth="4.5" />
      <circle cx="0" cy="0" r="23" fill="#38BDF8" opacity="0.15" />
      {/* Inner search details */}
      <path d="M-10,-5 L10,-5 M-10,5 L5,5" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
      {/* Reflection shine */}
      <path d="M-14,-14 A20,20 0 0,1 14,-14" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </g>
  </svg>
);

const DecideSvg = () => (
  <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(236,72,153,0.15)]">
    <defs>
      <radialGradient id="glow-decide" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad-decide" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#D946EF" />
      </linearGradient>
      <linearGradient id="grad-book" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#312E81" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="75" fill="url(#glow-decide)" />

    {/* Stack of books */}
    <g transform="translate(45, 95)">
      {/* Bottom Book */}
      <path d="M0,20 L90,20 C100,20 110,25 110,30 L110,38 C110,43 100,48 90,48 L0,48 Z" fill="url(#grad-book)" stroke="url(#grad-decide)" strokeWidth="1.5" />
      <rect x="5" y="28" width="90" height="12" fill="#FFF" opacity="0.9" />
      <line x1="95" y1="28" x2="95" y2="40" stroke="url(#grad-decide)" strokeWidth="1.5" />
      
      {/* Middle Book */}
      <path d="M10,2 L95,2 C103,2 112,6 112,11 L112,19 C112,24 103,28 95,28 L10,28 Z" fill="#1E1B4B" stroke="url(#grad-decide)" strokeWidth="1.5" />
      <rect x="15" y="10" width="87" height="10" fill="#FFF" opacity="0.9" />
      <line x1="98" y1="10" x2="98" y2="20" stroke="url(#grad-decide)" strokeWidth="1.5" />
    </g>

    {/* Graduation Cap */}
    <g transform="translate(100, 65)">
      {/* Cap Stand/Base */}
      <path d="M-26,10 L-26,24 C-26,29 0,34 0,34 C0,34 26,29 26,24 L26,10 Z" fill="#0B0F2B" stroke="url(#grad-decide)" strokeWidth="2.5" />
      <path d="M-26,18 C-26,18 0,25 0,25 C0,25 26,18 26,18" fill="none" stroke="url(#grad-decide)" strokeWidth="1.5" opacity="0.5" />
      
      {/* Cap Diamond Top */}
      <polygon points="0,-16 56,0 0,16 -56,0" fill="#1E1B4B" stroke="url(#grad-decide)" strokeWidth="3" />
      <polygon points="0,-11 44,0 0,11 -44,0" fill="url(#grad-decide)" opacity="0.2" />

      {/* Tassel */}
      <circle cx="0" cy="0" r="3.5" fill="url(#grad-decide)" />
      <path d="M0,0 C12,4 28,12 32,22 L34,34" fill="none" stroke="url(#grad-decide)" strokeWidth="2" strokeLinecap="round" />
      {/* Tassel Fringe */}
      <polygon points="34,34 31,44 37,44" fill="url(#grad-decide)" />
    </g>
  </svg>
);

// Animated Journey Section
function JourneySection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#05060F]">
      {/* subtle glowing background effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.08),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.06),transparent)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Start your journey with Professional Home
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">
            An ecosystem built to guide you from initial curiosity to verified professional achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Assess (Slides in from the Left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
            className="p-[1.5px] rounded-3xl bg-gradient-to-br from-purple-600 via-purple-300 to-white shadow-lg hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] transition-all duration-300 flex"
          >
            <div className="bg-white text-slate-900 rounded-[22px] p-8 flex flex-col items-center text-center h-full w-full">
              <div className="w-48 h-44 overflow-hidden flex items-center justify-center mb-6 relative rounded-xl">
                <img
                  src="/Assess.png"
                  alt="Assess"
                  className="w-full h-full object-contain scale-[1.7]"
                />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 tracking-tight">Assess</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Evaluate your multi-domain skills, discover knowledge gaps, and define your personalized innovation roadmap.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Execute (Slides up in the Center) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 80, damping: 15 }}
            className="p-[1.5px] rounded-3xl bg-gradient-to-br from-purple-600 via-purple-300 to-white shadow-lg hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] transition-all duration-300 flex"
          >
            <div className="bg-white text-slate-900 rounded-[22px] p-8 flex flex-col items-center text-center h-full w-full">
              <div className="w-48 h-44 overflow-hidden flex items-center justify-center mb-6 relative rounded-xl">
                <img
                  src="/Execute.png"
                  alt="Execute"
                  className="w-full h-full object-contain scale-[1.7]"
                />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 tracking-tight">Execute</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Work with vetted expert mentors, utilize advanced research tools, and coordinate projects in your dashboard.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Achieve (Slides in from the Right) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80, damping: 15 }}
            className="p-[1.5px] rounded-3xl bg-gradient-to-br from-purple-600 via-purple-300 to-white shadow-lg hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] transition-all duration-300 flex"
          >
            <div className="bg-white text-slate-900 rounded-[22px] p-8 flex flex-col items-center text-center h-full w-full">
              <div className="w-48 h-44 overflow-hidden flex items-center justify-center mb-6 relative rounded-xl">
                <img
                  src="/Achieve.png"
                  alt="Achieve"
                  className="w-full h-full object-contain scale-[1.7]"
                />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 tracking-tight">Achieve</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Verify your career milestones, secure patents or grants, and unlock career outcomes with analytics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

