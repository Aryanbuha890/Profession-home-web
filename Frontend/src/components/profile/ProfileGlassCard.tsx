import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Edit3 } from "lucide-react";
import { scaleIn } from "./animations";

interface ProfileGlassCardProps {
  title?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  onEdit?: () => void;
  isEditing?: boolean;
  hoverColorClass?: string;
  delay?: number;
  accentGlow?: string;
}

export function ProfileGlassCard({
  title,
  headerRight,
  children,
  className = "",
  onEdit,
  isEditing,
  hoverColorClass = "via-violet-400/20",
  delay = 0,
  accentGlow,
}: ProfileGlassCardProps) {
  return (
    <motion.div
      {...scaleIn(delay)}
      className={`profile-glass-card group relative overflow-hidden rounded-[22px] p-6 ${className}`}
      style={
        accentGlow
          ? ({ "--profile-accent-glow": accentGlow } as React.CSSProperties)
          : undefined
      }
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${hoverColorClass} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="profile-card-shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {title && (
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {headerRight}
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className={`cursor-pointer rounded-xl border p-2 transition-all duration-300 ${
                  isEditing
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
                title={isEditing ? "Save section" : "Edit section"}
              >
                {isEditing ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Edit3 className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
