import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Zap } from "lucide-react";

const SECTIONS = [
  { id: "profile-strength", label: "Strength", num: "01" },
  { id: "profile-about", label: "About", num: "02" },
  { id: "profile-skills", label: "Skills", num: "03" },
  { id: "profile-info", label: "Info", num: "04" },
  { id: "profile-socials", label: "Socials", num: "05" },
  { id: "profile-activity", label: "Activity", num: "06" },
];

export function ProfileCommandDock({ ringColor }: { ringColor: string }) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <ScrollProgressBar color={ringColor} />

      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="profile-command-dock fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/10 bg-[#05060F]/90 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <span className="mr-1 flex items-center gap-1 rounded-lg px-2 py-1 text-[8px] font-bold font-mono uppercase tracking-widest text-white/40">
              <Zap className="h-3 w-3" style={{ color: ringColor }} />
              Nav
            </span>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`profile-dock-pill relative cursor-pointer rounded-xl px-3 py-2 text-[10px] font-bold font-mono uppercase tracking-wider transition-all border-none ${
                  active === s.id
                    ? "text-white"
                    : "text-white/35 hover:text-white/70"
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-xl border"
                    style={{
                      borderColor: `${ringColor}40`,
                      background: `${ringColor}15`,
                      boxShadow: `0 0 20px ${ringColor}25`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.num}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-1 cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/40 transition hover:text-white border-solid"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgressBar({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="profile-scroll-progress fixed left-0 top-0 z-[60] h-[2px] w-full"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}60)`, scaleX: progress }}
      />
    </div>
  );
}
