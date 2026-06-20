import { motion, useSpring, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    spring.set(value);
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v).toLocaleString()));
    return () => unsub();
  }, [spring, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function GlowOrb({ color = "#a78bfa", size = 120, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{ width: size, height: size, background: color }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-violet-400 bg-violet-400/10 px-2.5 py-0.5 rounded-full">
      {children}
    </span>
  );
}

export function VioletButton({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-violet-400 to-indigo-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = "#a78bfa",
  label,
}: {
  value: number;
  size?: number;
  stroke?: string;
  label?: string;
}) {
  const r = 16;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
        <motion.circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-black text-white leading-none">{value}</span>
        {label && <span className="text-[6px] text-muted-foreground uppercase mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

export function ShimmerBar({ value, color = "from-violet-400 to-indigo-500" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent research-shimmer" />
      </motion.div>
    </div>
  );
}
