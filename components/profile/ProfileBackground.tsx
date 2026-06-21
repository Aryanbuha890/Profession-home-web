import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 17 + 7) % 100}%`,
  y: `${(i * 23 + 11) % 100}%`,
  size: 1 + (i % 3),
  duration: 4 + (i % 6),
  delay: (i % 8) * 0.5,
}));

export function ProfileBackground({ glowColor }: { glowColor: string }) {
  return (
    <div className="profile-ambient pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="profile-ambient-grid absolute inset-0 opacity-[0.35]" />
      <div className="profile-grain pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="profile-aurora-band profile-aurora-band-1 pointer-events-none absolute inset-0" style={{ "--aurora-color": glowColor } as React.CSSProperties} />
      <div className="profile-aurora-band profile-aurora-band-2 pointer-events-none absolute inset-0" />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="profile-particle absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: glowColor,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            y: [0, -30, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="profile-aurora profile-orb profile-orb-1 absolute -left-32 top-20 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: glowColor }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="profile-orb profile-orb-2 absolute -right-24 top-1/3 h-80 w-80 rounded-full blur-[90px]"
        style={{ background: "rgba(99,102,241,0.15)" }}
        animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="profile-orb profile-orb-3 absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-[80px]"
        style={{ background: glowColor }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
