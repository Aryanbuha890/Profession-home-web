import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export function ProfileLiveStatus({
  ringColor,
  availability,
}: {
  ringColor: string;
  availability: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring" }}
      className="profile-live-status absolute right-6 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md"
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: ringColor }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: ringColor }} />
      </span>
      <Radio className="h-3 w-3 text-white/50" />
      <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-white/70">
        {availability}
      </span>
    </motion.div>
  );
}
