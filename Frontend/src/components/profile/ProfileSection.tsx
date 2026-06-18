import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Edit3 } from "lucide-react";
import { fadeUp } from "./animations";

interface ProfileSectionProps {
  sectionId?: string;
  index: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  ringColor: string;
  onEdit?: () => void;
  isEditing?: boolean;
  delay?: number;
  className?: string;
}

export function ProfileSection({
  sectionId,
  index,
  title,
  subtitle,
  children,
  ringColor,
  onEdit,
  isEditing,
  delay = 0,
  className = "",
}: ProfileSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isActive = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <motion.section
      ref={ref}
      id={sectionId}
      {...fadeUp(delay)}
      className={`profile-section ${isActive ? "profile-section-active" : ""} ${className}`}
      style={{ "--section-glow": ringColor } as React.CSSProperties}
    >
      <div
        className="profile-section-ambient pointer-events-none absolute -inset-x-8 -inset-y-4 -z-10 rounded-3xl transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${ringColor}12, transparent 70%)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      <div className="profile-section-header">
        <div className="flex min-w-0 flex-1 items-start gap-5">
          <span
            className="profile-section-index shrink-0 font-mono text-[11px] font-semibold tracking-[0.22em] transition-colors duration-500"
            style={{ color: isActive ? ringColor : `${ringColor}90` }}
          >
            {index}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                {title}
              </h2>
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className={`shrink-0 cursor-pointer rounded-lg border p-2 transition-all duration-300 ${
                    isEditing
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                  title={isEditing ? "Save" : "Edit"}
                >
                  {isEditing ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                </button>
              )}
            </div>
            {subtitle && (
              <p className="mt-1.5 text-sm text-white/40">{subtitle}</p>
            )}
            <div
              className="profile-section-rule mt-4 h-px w-full transition-all duration-700"
              style={{
                background: isActive
                  ? `linear-gradient(90deg, ${ringColor}, ${ringColor}30 50%, transparent 100%)`
                  : `linear-gradient(90deg, ${ringColor}50, ${ringColor}15 40%, transparent 100%)`,
                boxShadow: isActive ? `0 0 20px ${ringColor}40` : "none",
              }}
            />
          </div>
        </div>
      </div>

      <div className="profile-section-body pl-0 md:pl-[3.25rem]">{children}</div>
    </motion.section>
  );
}
