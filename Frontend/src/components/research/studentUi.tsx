import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

export function SectionTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer border transition-all ${
            active === tab.id
              ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
              : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-white hover:border-white/20"
          }`}
        >
          {active === tab.id && (
            <motion.div
              layoutId="research-tab-pill"
              className="absolute inset-0 rounded-xl border border-violet-500/30 bg-violet-500/10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export function ProgressGate({
  unlocked,
  unlockAt,
  currentProgress,
  children,
  title,
}: {
  unlocked: boolean;
  unlockAt: number;
  currentProgress: number;
  children: ReactNode;
  title: string;
}) {
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative rounded-2xl border border-white/5 overflow-hidden">
      <div className="pointer-events-none opacity-30 blur-[1px]">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 text-center">
        <div className="p-3 rounded-2xl border border-violet-500/30 bg-violet-500/10 mb-3">
          <Lock className="h-6 w-6 text-violet-400" />
        </div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-[11px] text-muted-foreground mt-2 max-w-xs">
          Reach <span className="text-violet-400 font-bold">{unlockAt}%</span> Research Arena progress to unlock.
          You're at <span className="text-white font-bold">{currentProgress}%</span>.
        </p>
        <div className="mt-4 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentProgress / unlockAt) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <span className="mt-2 text-[9px] font-mono text-violet-400 flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Complete modules above to unlock
        </span>
      </div>
    </div>
  );
}

export function StudentAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="research-student-aurora absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-[120px] bg-violet-600/10" />
      <div className="research-student-aurora-2 absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px] bg-sky-500/8" />
      <div className="absolute inset-0 research-mesh opacity-20" />
    </div>
  );
}
