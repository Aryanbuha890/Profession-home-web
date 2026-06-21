import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

/* ── Mouse spotlight card (Vercel / Aceternity style) ── */
export function SpotlightCard({
  children,
  className = "",
  color = "139, 92, 246",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`research-spotlight relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/25 hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(${color},0.18), transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] research-mesh" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ── Cinematic page hero ── */
export function PageHero({
  badge,
  title,
  subtitle,
  accent = "#a78bfa",
  children,
}: {
  badge: string;
  title: string;
  subtitle: string;
  accent?: string;
  children?: ReactNode;
}) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    setChars(0);
    const id = setInterval(() => setChars((c) => (c >= title.length ? c : c + 1)), 35);
    return () => clearInterval(id);
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="research-page-hero relative mb-8 overflow-hidden rounded-3xl border border-white/[0.08] p-6 md:p-8"
      style={{
        background: `linear-gradient(135deg, ${accent}12 0%, transparent 50%, ${accent}06 100%)`,
      }}
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[100px]" style={{ background: accent, opacity: 0.15 }} />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full blur-[80px] bg-sky-500/10" />
      <div className="research-hero-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-bold font-mono uppercase tracking-[0.2em]"
            style={{ borderColor: `${accent}40`, color: accent, background: `${accent}10` }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {badge}
          </motion.span>
          <h1 className="mt-3 font-display text-2xl font-black tracking-tight text-white md:text-3xl">
            {title.slice(0, chars)}
            <span className="research-cursor-blink text-violet-400">|</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">{subtitle}</p>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Magnetic button ── */
export function MagneticButton({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`cursor-pointer border-none ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* ── Live ticker marquee ── */
export function LiveTicker({ items }: { items: string[] }) {
  return (
    <div className="research-ticker relative mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] py-2">
      <div className="research-ticker-track flex gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[10px] font-mono text-white/40">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Quick nav strip ── */
export function QuickNavStrip({
  links,
}: {
  links: { label: string; to: string; icon?: ReactNode }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.to}
          href={l.to}
          className="group flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[10px] font-bold font-mono uppercase tracking-wider text-white/60 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
        >
          {l.icon}
          {l.label}
          <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </Link>
      ))}
    </div>
  );
}

/* ── Tilt on hover ── */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const sry = useSpring(rotateY, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        rotateY.set(((e.clientX - cx) / (r.width / 2)) * -8);
        rotateX.set(((e.clientY - cy) / (r.height / 2)) * 8);
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated border glow ── */
export function GlowBorder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`research-glow-border relative rounded-2xl p-[1px] ${className}`}>
      <div className="relative rounded-2xl bg-slate-950/90 backdrop-blur-md h-full">{children}</div>
    </div>
  );
}
