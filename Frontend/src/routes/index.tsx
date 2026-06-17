import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Users,
  Eye,
  Cpu,
  Brain,
  TrendingUp,
  Compass,
  Bot,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FlaskConical,
  Rocket,
  Award,
  CheckCircle2,
  FileText,
  LineChart,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Trust, Footer, HowItWorks, Ecosystem, Features, FeaturesCarousel, Pricing, FAQ, ContactCTA } from "@/components/landing/Sections";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "../components/ui/ScrollStack";

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
      <ScrollRevealSection />
      <HowItWorks />
      <Ecosystem />
      <Features />
      <FeaturesCarousel />
      <Pricing />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const word1 = "PROFESSIONAL".split("");
  const word2 = "HOME".split("");
  const images = [
    "/pexels-ai25studioai-5466251.jpg",
    "/pexels-jakubzerdzicki-30260904.jpg",
    "/pexels-karola-g-8539456.jpg",
    "/pexels-katerina-holmes-5905529.jpg",
    "/pexels-konat-umut-budak-765467672-37296311.jpg",
    "/pexels-larissafarber-7593250.jpg",
    "/pexels-n-voitkevich-6532364.jpg",
    "/pexels-peaky-31177212.jpg",
    "/pexels-rdne-7843009.jpg",
    "/pexels-samuel-francis-830136920-37916490.jpg",
    "/pexels-shubhamdhage-37911158.jpg",
    "/pexels-shvets-production-7562363.jpg",
    "/pexels-shvetsa-5324972.jpg",
    "/pexels-silverkblack-36697950.jpg",
    "/pexels-tima-miroshnichenko-6914003.jpg",
    "/pexels-tima-miroshnichenko-9574458.jpg"
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white pt-24 pb-12"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#05060F] pointer-events-none">
        <video
          src="/bg%20video%20ph.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.45]"
          muted
          loop
          playsInline
          autoPlay
        />

        {/* Blending overlay layers for contrast and modern neon look */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060F]/20 via-transparent to-[#05060F]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05060F]/30 to-[#05060F]/90" />
      </div>

      <div className="relative w-full max-w-6xl px-6 flex flex-col justify-center items-center flex-1 z-10">
        <motion.div style={{ y }} className="mx-auto max-w-5xl text-center w-full flex flex-col items-center justify-center">

          {/* Giant Interactive Serif Display Typography */}
          <div className="flex flex-col items-center justify-center select-none tracking-tight leading-[0.95] text-center w-full max-w-6xl mb-6 font-serif-display">

            {/* Word 1: PROFESSIONAL - Strict flex-nowrap to avoid breaking onto new lines */}
            <div className="flex flex-row flex-nowrap justify-center gap-[0.02em] text-[11vw] font-bold whitespace-nowrap">
              {word1.map((char, idx) => {
                const globalIdx = idx;
                const imgUrl = images[globalIdx % images.length];
                const isHovered = hoveredIdx === globalIdx;

                return (
                  <span
                    key={idx}
                    onMouseEnter={() => {
                      setHoveredIdx(globalIdx);
                    }}
                    onMouseLeave={() => {
                      setHoveredIdx(null);
                    }}
                    className={`inline-block transition-all duration-300 ease-out transform ${isHovered
                        ? "scale-[1.08] text-transparent bg-clip-text bg-cover bg-center drop-shadow-[0_0_35px_rgba(167,139,250,0.85)] z-20"
                        : "text-slate-100 hover:text-transparent bg-clip-text bg-cover bg-center"
                      }`}
                    style={{
                      backgroundImage: isHovered ? `url(${imgUrl})` : "none",
                      WebkitTextStroke: !isHovered ? "1.5px rgba(255,255,255,0.12)" : "0px transparent",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Word 2: HOME */}
            <div className="flex flex-row flex-nowrap justify-center gap-[0.02em] text-[11vw] font-bold mt-2 whitespace-nowrap">
              {word2.map((char, idx) => {
                const globalIdx = word1.length + idx;
                const imgUrl = images[globalIdx % images.length];
                const isHovered = hoveredIdx === globalIdx;

                return (
                  <span
                    key={idx}
                    onMouseEnter={() => {
                      setHoveredIdx(globalIdx);
                    }}
                    onMouseLeave={() => {
                      setHoveredIdx(null);
                    }}
                    className={`inline-block transition-all duration-300 ease-out transform ${isHovered
                        ? "scale-[1.08] text-transparent bg-clip-text bg-cover bg-center drop-shadow-[0_0_35px_rgba(167,139,250,0.85)] z-20"
                        : "text-slate-100 hover:text-transparent bg-clip-text bg-cover bg-center"
                      }`}
                    style={{
                      backgroundImage: isHovered ? `url(${imgUrl})` : "none",
                      WebkitTextStroke: !isHovered ? "1.5px rgba(255,255,255,0.12)" : "0px transparent",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-8 max-w-2xl text-base text-white/60 sm:text-lg"
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
              search={{ tab: "home" }}
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

        </motion.div>
      </div>
    </section>
  );
}

interface DashboardMockupCardProps {
  roleName: string;
  accentColor: string;
  accentColorClass: string;
  accentBgClass: string;
  successScore: number;
  successStatus: string;
  progressMetrics: { label: string; value: string; percentage: number; fromColor: string; toColor: string }[];
  chartTitle: string;
  chartValue: string;
  chartChange: string;
  chartAreaGradId: string;
  chartLineGradId: string;
  chartLinePath: string;
  chartAreaPath: string;
  chartTooltipTime: string;
  chartTooltipValue: string;
  chartTooltipChange: string;
  sparklines: { label: string; value: string; change: string; color: string; sparkPoints: number[] }[];
  liveEvents: { time: string; message: string; color: string; tag: string }[];
  sidebarItems: { icon: any; label: string; active?: boolean }[];
  floatingChips: { title: string; subtitle: string; icon: any; gradFrom: string; gradTo: string; xPosClass: string; yPosClass: string }[];
  copilotStatus: string;
}

function DashboardMockupCard({
  roleName,
  accentColor,
  accentColorClass,
  successScore,
  successStatus,
  progressMetrics,
  chartTitle,
  chartValue,
  chartChange,
  chartAreaGradId,
  chartLineGradId,
  chartLinePath,
  chartAreaPath,
  chartTooltipTime,
  chartTooltipValue,
  chartTooltipChange,
  sparklines,
  liveEvents,
  sidebarItems,
  floatingChips,
  copilotStatus,
}: DashboardMockupCardProps) {
  return (
    <div className="relative mx-auto max-w-5xl w-full">
      {/* Glow aura */}
      <div 
        className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[44px] blur-3xl opacity-35 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`
        }}
      />

      {/* Outer gradient bordered window */}
      <div
        className="rounded-[20px] p-[1px]"
        style={{
          background: `linear-gradient(140deg, rgba(255,255,255,0.2) 0%, ${accentColor}40 30%, rgba(255,255,255,0.05) 100%)`,
        }}
      >
        <div 
          className="overflow-hidden rounded-[19px] bg-[#070913]/95 backdrop-blur-2xl"
          style={{
            boxShadow: `0 45px 100px -25px rgba(0,0,0,0.95), 0 0 50px -10px ${accentColor}55`
          }}
        >
          {/* Top window browser bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-gradient-to-b from-[#090b16] to-[#05060f] px-4 py-2.5">
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            </div>

            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              professionalhome.ai/command?role={roleName}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/40 w-[20%] justify-end">
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </span>
            </div>
          </div>

          {/* Main workspace frame */}
          <div className="grid grid-cols-12 gap-px bg-white/5">
            {/* Sidebar */}
            <aside className="col-span-2 hidden flex-col gap-1.5 bg-[#05060F] p-3 lg:flex">
              {sidebarItems.map((it, i) => {
                const Ic = it.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] font-medium transition-colors cursor-pointer ${
                      it.active
                        ? "bg-white/10 text-white"
                        : "text-white/45 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Ic className="h-3.5 w-3.5" style={{ color: it.active ? accentColor : "currentColor" }} />
                    {it.label}
                  </div>
                );
              })}
            </aside>

            {/* Content panel */}
            <div className="col-span-12 grid grid-cols-12 gap-3 bg-[#070913] p-4 lg:col-span-10">
              {/* Success Score Gauge */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-4 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/45">
                  <span>Success Score</span>
                  <span style={{ color: accentColor }}>{successStatus}</span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <defs>
                        <linearGradient id={`score-grad-${roleName}`} x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor={accentColor} />
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
                        stroke={`url(#score-grad-${roleName})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="97"
                        initial={{ strokeDashoffset: 97 }}
                        animate={{ strokeDashoffset: 97 - (97 * successScore) / 100 }}
                        transition={{ duration: 1.6, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-white">{successScore}</div>
                        <div className="text-[8px] font-mono uppercase text-white/40">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {progressMetrics.map((pm, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] text-white/60">
                          <span>{pm.label}</span>
                          <span className="font-mono" style={{ color: pm.toColor }}>{pm.value}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pm.percentage}%`,
                              background: `linear-gradient(to right, ${pm.fromColor}, ${pm.toColor})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Velocity Chart */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      {chartTitle} · 24h
                    </div>
                    <div className="mt-1 font-display text-2xl font-semibold text-white">
                      {chartValue} <span className="text-xs font-medium text-emerald-300">{chartChange}</span>
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
                      <linearGradient id={chartAreaGradId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
                        <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={chartLineGradId} x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor={accentColor} />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                      <filter id={`glow-${roleName}`} x="-20%" y="-20%" width="140%" height="140%">
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
                      d={chartAreaPath}
                      fill={`url(#${chartAreaGradId})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.path
                      d={chartLinePath}
                      fill="none"
                      stroke={`url(#${chartLineGradId})`}
                      strokeWidth="2"
                      filter={`url(#glow-${roleName})`}
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
                      stroke={`${accentColor}55`}
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx="270"
                      cy="62"
                      r="5"
                      fill={accentColor}
                      stroke="#0A0E1F"
                      strokeWidth="2.5"
                    />
                    <circle cx="270" cy="62" r="9" fill="none" stroke={`${accentColor}55`} />
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
                      <div className="font-mono text-white/40">{chartTooltipTime}</div>
                      <div className="font-display text-sm font-semibold text-white">{chartTooltipValue}</div>
                      <div className="text-[9px]" style={{ color: accentColor }}>{chartTooltipChange}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sparkline cards */}
              {sparklines.map((k, i) => {
                const max = Math.max(...k.sparkPoints);
                const pts = k.sparkPoints
                  .map(
                    (val, idx) => `${(idx / (k.sparkPoints.length - 1)) * 100},${30 - (val / (max || 1)) * 24}`,
                  )
                  .join(" ");
                return (
                  <div
                    key={i}
                    className="col-span-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/45 uppercase tracking-wider">
                        {k.label}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                        style={{ background: `${k.color}1a`, color: k.color }}
                      >
                        {k.change}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">{k.value}</div>
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="mt-2 h-6 w-full"
                    >
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={k.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                      <polyline points={`${pts} 100,30 0,30`} fill={k.color} opacity="0.12" />
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
                  {liveEvents.map((evt, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="font-mono text-white/40">{evt.time}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: evt.color }} />
                      <span className="flex-1 truncate text-white/80">{evt.message}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase"
                        style={{ background: `${evt.color}22`, color: evt.color }}
                      >
                        {evt.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      {floatingChips.map((chip, idx) => {
        const ChipIcon = chip.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.15 }}
            className={`absolute z-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex ${chip.xPosClass} ${chip.yPosClass}`}
          >
            <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${chip.gradFrom} ${chip.gradTo}`}>
              <ChipIcon className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold">{chip.title}</div>
              <div className="text-[10px] text-white/50">{chip.subtitle}</div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white backdrop-blur-2xl md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300 animate-pulse" />
        {copilotStatus}
      </motion.div>
    </div>
  );
}

const studentOSProps: DashboardMockupCardProps = {
  roleName: "student",
  accentColor: "#8B5CF6",
  accentColorClass: "text-[#8B5CF6]",
  accentBgClass: "bg-[#8B5CF6]",
  successScore: 94,
  successStatus: "Academic Velocity: Exceptional",
  progressMetrics: [
    { label: "Skills Profile", value: "96%", percentage: 96, fromColor: "#8B5CF6", toColor: "#A78BFA" },
    { label: "Vetted Mentors", value: "4 Active", percentage: 80, fromColor: "#3B82F6", toColor: "#60A5FA" },
    { label: "Placement Success", value: "94%", percentage: 94, fromColor: "#10B981", toColor: "#34D399" },
  ],
  chartTitle: "Academic Velocity Trend",
  chartValue: "96.4 pts",
  chartChange: "↑ 12.8% vs base",
  chartAreaGradId: "student-area-grad",
  chartLineGradId: "student-line-grad",
  chartLinePath: "M0,90 C40,82 80,68 120,52 C160,36 200,22 240,18 C280,14 320,10 400,5",
  chartAreaPath: "M0,90 C40,82 80,68 120,52 C160,36 200,22 240,18 C280,14 320,10 400,5 L400,110 L0,110 Z",
  chartTooltipTime: "Semester 2",
  chartTooltipValue: "96.4 pts",
  chartTooltipChange: "Top 2% of cohort",
  sparklines: [
    { label: "Active Goals", value: "7", change: "+3 target", color: "#8B5CF6", sparkPoints: [4, 6, 5, 8, 7, 9, 11, 13] },
    { label: "Diagnostic Rank", value: "98th", change: "Top 5%", color: "#3B82F6", sparkPoints: [90, 92, 91, 95, 94, 96, 97, 98] },
    { label: "Weekly Hours", value: "32.5h", change: "+4.2h", color: "#10B981", sparkPoints: [28, 30, 29, 34, 32, 31, 33, 32.5] },
    { label: "Expert Calls", value: "4", change: "100%", color: "#F59E0B", sparkPoints: [1, 2, 2, 3, 3, 4, 4, 4] },
  ],
  liveEvents: [
    { time: "14:32", message: "Matched with McKinsey Advisor", color: "#8B5CF6", tag: "match" },
    { time: "14:28", message: "AI Diagnostic Analysis Completed", color: "#3B82F6", tag: "completed" },
    { time: "14:15", message: "Completed: Resume Deep-Scan review", color: "#10B981", tag: "ok" },
  ],
  sidebarItems: [
    { icon: GraduationCap, label: "Academics", active: true },
    { icon: Brain, label: "AI Diagnostic" },
    { icon: Users, label: "Expert Mentors" },
    { icon: TrendingUp, label: "Career Path" },
    { icon: Compass, label: "Placements" },
  ],
  floatingChips: [
    { title: "Advisor Matched", subtitle: "McKinsey Engagement Lead", icon: Sparkles, gradFrom: "from-purple-500", gradTo: "to-indigo-500", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "Resume Score: 92", subtitle: "Ready for submission", icon: Award, gradFrom: "from-blue-500", gradTo: "to-cyan-400", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Matching with McKinsey Advisor, found 2 preparation roadmaps."',
};

const researcherOSProps: DashboardMockupCardProps = {
  roleName: "researcher",
  accentColor: "#0EA5E9",
  accentColorClass: "text-[#0EA5E9]",
  accentBgClass: "bg-[#0EA5E9]",
  successScore: 88,
  successStatus: "Citations & Impact: High",
  progressMetrics: [
    { label: "Citations", value: "312", percentage: 85, fromColor: "#38BDF8", toColor: "#0EA5E9" },
    { label: "Collaborations", value: "8 Active", percentage: 75, fromColor: "#A78BFA", toColor: "#8B5CF6" },
    { label: "Publication Index", value: "88%", percentage: 88, fromColor: "#10B981", toColor: "#34D399" },
  ],
  chartTitle: "Citation Index Growth",
  chartValue: "312 cites",
  chartChange: "↑ 24% YoY",
  chartAreaGradId: "researcher-area-grad",
  chartLineGradId: "researcher-line-grad",
  chartLinePath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10",
  chartAreaPath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10 L400,110 L0,110 Z",
  chartTooltipTime: "Q2 2026",
  chartTooltipValue: "312 cites",
  chartTooltipChange: "h-index: 14 (+2)",
  sparklines: [
    { label: "Active Papers", value: "5", change: "+2 draft", color: "#0EA5E9", sparkPoints: [2, 3, 3, 4, 3, 5, 4, 5] },
    { label: "Grant Submissions", value: "3", change: "1 approved", color: "#10B981", sparkPoints: [1, 1, 2, 2, 2, 3, 3, 3] },
    { label: "Co-Authors", value: "12", change: "+4 new", color: "#8B5CF6", sparkPoints: [6, 8, 8, 9, 10, 10, 11, 12] },
    { label: "Review Requests", value: "8", change: "completed", color: "#F59E0B", sparkPoints: [3, 4, 5, 5, 6, 7, 7, 8] },
  ],
  liveEvents: [
    { time: "16:45", message: "Co-author match: Dr. Helena Chen", color: "#0EA5E9", tag: "match" },
    { time: "16:10", message: "Grant Funding Approved: NSF Call", color: "#10B981", tag: "grant" },
    { time: "15:30", message: "Manuscript review request: IEEE Trans", color: "#8B5CF6", tag: "review" },
  ],
  sidebarItems: [
    { icon: FlaskConical, label: "Research Lab", active: true },
    { icon: FileText, label: "Manuscripts" },
    { icon: Users, label: "Co-Authors" },
    { icon: Award, label: "Grants & Funding" },
    { icon: Compass, label: "Conferences" },
  ],
  floatingChips: [
    { title: "Co-Author Found", subtitle: "Dr. Helena Chen (MIT)", icon: Users, gradFrom: "from-sky-500", gradTo: "to-blue-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "NSF Grant Approved", subtitle: "$450k funding unlocked", icon: Award, gradFrom: "from-emerald-500", gradTo: "to-teal-400", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Analyzing Marie Curie draft, found 3 citations to add."',
};

const startupOSProps: DashboardMockupCardProps = {
  roleName: "startup",
  accentColor: "#10B981",
  accentColorClass: "text-[#10B981]",
  accentBgClass: "bg-[#10B981]",
  successScore: 92,
  successStatus: "Growth Velocity: Hyper",
  progressMetrics: [
    { label: "Seed Capital", value: "$2.1M", percentage: 84, fromColor: "#34D399", toColor: "#10B981" },
    { label: "Advisor Board", value: "4 Active", percentage: 100, fromColor: "#3B82F6", toColor: "#60A5FA" },
    { label: "Growth Velocity", value: "+42% MoM", percentage: 92, fromColor: "#A78BFA", toColor: "#8B5CF6" },
  ],
  chartTitle: "MRR Growth Curve",
  chartValue: "$124K MRR",
  chartChange: "↑ 42% MoM",
  chartAreaGradId: "startup-area-grad",
  chartLineGradId: "startup-line-grad",
  chartLinePath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2",
  chartAreaPath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2 L400,110 L0,110 Z",
  chartTooltipTime: "Month 12",
  chartTooltipValue: "$124,080 MRR",
  chartTooltipChange: "4.2x LTV/CAC",
  sparklines: [
    { label: "Active Pilots", value: "8", change: "+3 live", color: "#10B981", sparkPoints: [2, 3, 3, 5, 4, 6, 7, 8] },
    { label: "Burn Rate", value: "$45k/mo", change: "stable", color: "#EF4444", sparkPoints: [40, 42, 45, 44, 45, 45, 45, 45] },
    { label: "Net Promoter", value: "76", change: "+2 pts", color: "#0EA5E9", sparkPoints: [68, 70, 72, 70, 74, 75, 74, 76] },
    { label: "Pitch Meetings", value: "14", change: "+8 booked", color: "#8B5CF6", sparkPoints: [2, 4, 5, 8, 7, 10, 12, 14] },
  ],
  liveEvents: [
    { time: "18:02", message: "Investor Meeting: Sequoia Capital", color: "#10B981", tag: "meeting" },
    { time: "17:40", message: "Prototype validation complete: 94% score", color: "#3B82F6", tag: "milestone" },
    { time: "16:20", message: "Enterprise Pilot signed: Acme Corp", color: "#8B5CF6", tag: "sales" },
  ],
  sidebarItems: [
    { icon: Rocket, label: "Startup OS", active: true },
    { icon: LineChart, label: "Metrics & KPIs" },
    { icon: Users, label: "Cap Table" },
    { icon: FileText, label: "Data Room" },
    { icon: Compass, label: "Investor Pipeline" },
  ],
  floatingChips: [
    { title: "Sequoia Call Booked", subtitle: "Partner Pitch Scheduled", icon: Rocket, gradFrom: "from-emerald-500", gradTo: "to-emerald-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "$2.1M Seed Closed", subtitle: "Tier-1 lead VCs onboard", icon: Award, gradFrom: "from-violet-500", gradTo: "to-purple-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Reviewing Seed Pitch deck, updated financial model."',
};

function DashboardSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#05060F] border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">Command Center</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            One platform. <span className="text-white/50">Custom operating systems.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Scroll down to see the custom operating systems for Students, Researchers, and Founders stack seamlessly.
          </p>
        </div>

        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={120} 
          baseScale={0.86} 
          itemScale={0.03}
          itemStackDistance={35}
          rotationAmount={0}
          blurAmount={1.5}
          stackPosition="12%"
        >
          <ScrollStackItem>
            <DashboardMockupCard {...studentOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...researcherOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...startupOSProps} />
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}

// Apple-style horizontal scroll shelf Journey section
function JourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const journeyCards = [
    {
      badge: "STAGE 01",
      title: "AI Assessment",
      subtitle: "Map your situation, domain competencies, and target career goals.",
      price: "AI Diagnostic Analysis",
      img: "/AI Assessment.jpeg",
    },
    {
      badge: "STAGE 02",
      title: "Expert Matching",
      subtitle: "Personalized matching with verified academic and industry experts.",
      price: "Expert Consultations",
      img: "/Expert Matching.jpeg",
    },
    {
      badge: "STAGE 03",
      title: "Roadmap Creation",
      subtitle: "Generate dynamic task checklists, resource plans, and project phases.",
      price: "Actionable Roadmaps",
      img: "/Roadmap Creation.jpeg",
    },
    {
      badge: "STAGE 04",
      title: "Execution Tracking",
      subtitle: "Track weekly deliverables and manage projects with Kanban tools.",
      price: "Milestone Tracking",
      img: "/Execution Tracking.jpeg",
    },
    {
      badge: "STAGE 05",
      title: "Outcome Achievement",
      subtitle: "Log placements, verify publications, track grants and funding.",
      price: "Outcome Analytics",
      img: "/Outcome Achievement.jpeg",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 360; // Card width + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 bg-[#05060F] overflow-hidden">
      {/* subtle glowing background effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.08),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.06),transparent)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section heading with Navigation Arrows */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl max-w-3xl">
            <ScrollReveal>The latest. Explore the stages of professional growth.</ScrollReveal>
          </h2>
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-violet-500/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-white/80" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-violet-500/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll snap shelf */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {journeyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 80, damping: 15 }}
              className="flex-shrink-0 w-[285px] sm:w-[320px] md:w-[340px] snap-start rounded-[24px] border border-white/10 bg-[#0c0d16]/90 overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(124,58,237,0.25)] hover:border-violet-500/30 cursor-default flex flex-col h-[500px] shadow-2xl"
            >
              {/* Card text content */}
              <div className="px-6 pt-6 pb-2">
                {card.badge && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-violet-400 mb-1.5">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-[0.08em] leading-tight text-white font-mango uppercase">
                  {card.title}
                </h3>
                <p className="text-[12.5px] mt-1.5 leading-snug text-white/60 min-h-[38px]">
                  {card.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 mt-2 hover:text-violet-300 transition-colors">
                  {card.price} <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-violet-300" />
                </span>
              </div>

              {/* Card product image */}
              <div className="flex-1 flex items-center justify-center px-4 pb-5 mt-2 relative overflow-hidden bg-black/40">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover object-top rounded-2xl border border-white/5 shadow-sm transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface RevealWordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
}

function RevealWord({ word, index, total, progress }: RevealWordProps) {
  const start = index / total;
  const end = (index + 1.5) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mx-2 text-[6vw] sm:text-[5.2vw] md:text-[4.5vw] font-black uppercase text-white font-mango tracking-wide"
    >
      {word}
    </motion.span>
  );
}

function SparkleStar({ className }: { className?: string }) {
  return (
    <motion.svg
      className={`w-6 h-6 text-violet-400 fill-current drop-shadow-[0_0_8px_rgba(167,139,250,0.8)] ${className}`}
      viewBox="0 0 24 24"
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.5, 1, 0.5],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
    </motion.svg>
  );
}

function PurpleCrosshair({ className, pulse = false }: { className?: string; pulse?: boolean }) {
  return (
    <div className={`absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 ${className}`}>
      {/* Horizontal line */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      {/* Vertical line */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
      {/* Glowing center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_#a78bfa,0_0_20px_rgba(139,92,246,0.6)]" />
      {/* Pulse ring */}
      {pulse && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-violet-500/30 bg-violet-500/5"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

function FaintIntersection({ className }: { className?: string }) {
  return (
    <div className={`absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-25 z-0 ${className}`}>
      {/* Horizontal faint line */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-[1px] bg-white/10" />
      {/* Vertical faint line */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[1px] h-12 bg-white/10" />
      {/* Faint center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full" />
    </div>
  );
}

// Scroll Reveal Text Block Component
function ScrollRevealSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const text =
    "AMBITION WITHOUT SYSTEMATIC DIRECTION IS WASTED POTENTIAL. DYNAMIC ROADMAPS, EXPERT MENTORSHIP, AND OUTCOME ANALYTICS BRIDGE THE GAP BETWEEN AMBITION AND OUTCOME. BUILD YOUR CAREER SYSTEM.";
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "start 0.4"],
  });

  return (
    <section
      className="relative py-40 bg-[#05060F] flex flex-col items-center justify-center min-h-[90vh] px-6 overflow-hidden border-t border-white/5 select-none"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        {/* Vertical Lines */}
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />

        {/* Horizontal Lines */}
        <div className="absolute left-0 right-0 top-[20%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute left-0 right-0 top-[40%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute left-0 right-0 top-[80%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
      </div>

      {/* Active Glowing Crosshairs */}
      <PurpleCrosshair className="top-[20%] left-[40%]" pulse />
      <PurpleCrosshair className="top-[40%] left-[80%]" pulse />
      <PurpleCrosshair className="top-[60%] left-[20%]" pulse />
      <PurpleCrosshair className="top-[80%] left-[60%]" pulse />

      {/* Faint Intersections */}
      <FaintIntersection className="top-[20%] left-[20%]" />
      <FaintIntersection className="top-[20%] left-[80%]" />
      <FaintIntersection className="top-[40%] left-[40%]" />
      <FaintIntersection className="top-[60%] left-[60%]" />
      <FaintIntersection className="top-[80%] left-[40%]" />
      <FaintIntersection className="top-[80%] left-[80%]" />

      {/* Premium Sparkling Star Decorations */}
      <SparkleStar className="absolute top-12 left-12" />
      <SparkleStar className="absolute top-12 right-12" />
      <SparkleStar className="absolute bottom-16 left-16 opacity-35 scale-75" />
      <SparkleStar className="absolute top-[28%] left-[12%] opacity-20 scale-50" />
      <SparkleStar className="absolute bottom-[28%] right-[12%] opacity-25 scale-50" />

      {/* Quote text - upright, clean spacing, proper alignment */}
      <div ref={textRef} className="max-w-5xl text-center leading-[1.1] tracking-tight relative z-10 py-16 px-4">
        {words.map((word, idx) => (
          <RevealWord
            key={idx}
            word={word}
            index={idx}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* Decorative Quote Mark */}
      <div className="absolute bottom-10 right-10 text-violet-500/15 text-[140px] font-serif pointer-events-none select-none">
        ”
      </div>
    </section>
  );
}
