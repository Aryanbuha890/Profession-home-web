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
import { Trust, Footer } from "@/components/landing/Sections";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
      <HeroStats />
      <Trust />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 text-white"
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

      <div className="relative mx-auto max-w-6xl px-6 pt-[148px] pb-24 lg:pt-[190px] lg:pb-32">
        <motion.div style={{ y }} className="mx-auto max-w-3xl text-center">
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
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[86px]"
          >
            Autonomous Intelligence
            <br />
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

        {/* Dashboard visual mockup */}
        <FloatingDashboard />
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
      className="relative mx-auto mt-16 max-w-5xl"
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

function HeroStats() {
  const stats = [
    { v: 847321, l: "Outcomes Tracked" },
    { v: 99.2, dec: 1, suffix: "%", l: "Completion Rate" },
    { v: 2400, l: "Verified Experts" },
    { v: 98.7, dec: 1, suffix: "%", l: "Match Accuracy" },
  ];

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="relative bg-transparent px-6 py-7">
              {i > 0 && <span className="absolute inset-y-4 left-0 w-px bg-white/10" />}
              <div className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <AnimatedCounter value={s.v} decimals={s.dec ?? 0} suffix={s.suffix ?? ""} />
              </div>
              <div className="mt-1 text-xs font-medium text-white/55">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
