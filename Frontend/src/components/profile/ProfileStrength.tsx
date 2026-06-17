import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "./ProfileSection";

interface ProfileStrengthProps {
  sectionIndex: string;
  strength: number;
  gradientText: string;
  ringColor: string;
  projectsAdded: boolean;
  onAddProjects: () => void;
  delay?: number;
}

function AnimatedCore({ value, color }: { value: number; color: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    spring.set(value);
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [value, spring, rounded]);

  const size = 112;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-2 rounded-full blur-xl"
        style={{ background: color }}
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg width={size} height={size} className="relative -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 14px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-white">{displayValue}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">%</span>
      </div>
    </div>
  );
}

function OrbitSatellite({
  index,
  total,
  radius,
  duration,
  color,
  label,
  complete,
}: {
  index: number;
  total: number;
  radius: number;
  duration: number;
  color: string;
  label: string;
  complete: boolean;
}) {
  const startAngle = (index / total) * 360;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
      animate={{ rotate: [startAngle, startAngle + 360] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        style={{ top: -radius }}
        animate={{ rotate: [-startAngle, -(startAngle + 360)] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`profile-orbit-node flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md transition-shadow ${
            complete
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-white/10 bg-white/[0.04]"
          }`}
          style={{
            boxShadow: complete ? `0 0 20px ${color}50` : `0 0 12px ${color}20`,
          }}
        >
          {complete ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <span className="font-mono text-[10px] font-bold text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <span className="max-w-[72px] truncate text-center text-[9px] font-medium uppercase tracking-wider text-white/35">
          {label.split(" ")[0]}
        </span>
      </motion.div>
    </motion.div>
  );
}

const checklist = ["Personal Info", "Education", "Skills", "Portfolio Projects"];

export function ProfileStrength({
  sectionIndex,
  strength,
  gradientText,
  ringColor,
  projectsAdded,
  onAddProjects,
  delay = 0.1,
}: ProfileStrengthProps) {
  const completionStates = checklist.map((item) =>
    item === "Portfolio Projects" ? projectsAdded : true,
  );

  return (
    <ProfileSection
      sectionId="profile-strength"
      index={sectionIndex}
      title="Profile Strength"
      subtitle="Your identity orbit — complete every node to unlock full visibility"
      ringColor={ringColor}
      delay={delay}
    >
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div className="profile-orbit-system relative mx-auto aspect-square w-full max-w-[340px] shrink-0 sm:max-w-[380px]">
          {[0.42, 0.32, 0.22].map((inset, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-dashed"
              style={{
                inset: `${inset * 100}%`,
                borderColor: `${ringColor}${i === 0 ? "25" : "12"}`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 28 + i * 8, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {checklist.map((item, idx) => (
            <OrbitSatellite
              key={item}
              index={idx}
              total={checklist.length}
              radius={145 - idx * 8}
              duration={18 + idx * 4}
              color={ringColor}
              label={item}
              complete={completionStates[idx]}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedCore value={strength} color={ringColor} />
          </div>
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {checklist.map((item, idx) => {
            const isPortfolio = item === "Portfolio Projects";
            const isComplete = completionStates[idx];

            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16, rotateX: -12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200, damping: 22 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`profile-strength-card group relative overflow-hidden rounded-2xl border px-5 py-4 transition-colors ${
                  isComplete
                    ? "border-emerald-500/20 bg-emerald-500/[0.05]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${ringColor}15, transparent 70%)`,
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      isComplete ? "bg-emerald-500/20" : "border border-white/10 bg-white/[0.03]"
                    }`}
                    style={{ boxShadow: isComplete ? `0 0 16px ${ringColor}40` : undefined }}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <span className="font-mono text-xs text-white/30">{String(idx + 1).padStart(2, "0")}</span>
                    )}
                  </span>
                  <span className={`flex-1 text-sm font-semibold ${isComplete ? "text-white/90" : "text-white/40"}`}>
                    {item}
                  </span>
                  {isPortfolio && !projectsAdded && (
                    <Button
                      onClick={onAddProjects}
                      variant="link"
                      className={`relative z-10 h-auto cursor-pointer p-0 text-xs font-bold ${gradientText}`}
                    >
                      Add →
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ProfileSection>
  );
}
