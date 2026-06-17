import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProfileSection } from "./ProfileSection";

interface ProfileAboutProps {
  sectionIndex: string;
  about: string;
  about2: string;
  isEditing: boolean;
  focusClass: string;
  ringColor: string;
  onEdit: () => void;
  onChange: (field: "about" | "about2", value: string) => void;
  delay?: number;
}

function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-[17px] font-normal leading-[1.95] tracking-[-0.01em] text-white/88">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: delay + i * 0.025, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function ProfileAbout({
  sectionIndex,
  about,
  about2,
  isEditing,
  focusClass,
  ringColor,
  onEdit,
  onChange,
  delay = 0.1,
}: ProfileAboutProps) {
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-40px" });

  return (
    <ProfileSection
      sectionId="profile-about"
      index={sectionIndex}
      title="About Me"
      subtitle="Your story — revealed word by word as you scroll"
      ringColor={ringColor}
      onEdit={onEdit}
      isEditing={isEditing}
      delay={delay}
    >
      {isEditing ? (
        <div className="space-y-5">
          <textarea
            value={about}
            onChange={(e) => onChange("about", e.target.value)}
            placeholder="Write your primary bio..."
            className={`min-h-[130px] w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] leading-[1.85] text-white outline-none transition-all focus:border-white/20 focus:bg-white/[0.04] ${focusClass}`}
          />
          <textarea
            value={about2}
            onChange={(e) => onChange("about2", e.target.value)}
            placeholder="Share more about your journey..."
            className={`min-h-[100px] w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm leading-[1.85] text-white outline-none transition-all focus:border-white/20 focus:bg-white/[0.04] ${focusClass}`}
          />
        </div>
      ) : (
        <div className="space-y-8">
          <RevealWords text={about} delay={0.1} />

          <motion.blockquote
            ref={quoteRef}
            initial={{ opacity: 0, x: -20 }}
            animate={quoteInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="profile-about-quote relative rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-6"
            style={{ borderColor: `${ringColor}25` }}
          >
            <span
              className="profile-quote-bracket profile-quote-bracket-tl absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2"
              style={{ borderColor: ringColor }}
            />
            <span
              className="profile-quote-bracket profile-quote-bracket-br absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2"
              style={{ borderColor: ringColor }}
            />
            <p className="text-[15px] italic leading-[1.9] text-white/50">{about2}</p>
          </motion.blockquote>
        </div>
      )}
    </ProfileSection>
  );
}
