import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe, Linkedin, Twitter } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { containerVariants, itemVariants } from "./animations";

const socialIcons: LucideIcon[] = [Github, Linkedin, Twitter, Globe];

interface ProfileSocialsProps {
  sectionIndex: string;
  socials: { label: string }[];
  isEditing: boolean;
  focusClass: string;
  ringColor: string;
  onEdit: () => void;
  onChange: (socials: { label: string }[]) => void;
  delay?: number;
}

export function ProfileSocials({
  sectionIndex,
  socials,
  isEditing,
  focusClass,
  ringColor,
  onEdit,
  onChange,
  delay = 0.3,
}: ProfileSocialsProps) {
  return (
    <ProfileSection
      sectionId="profile-socials"
      index={sectionIndex}
      title="Social Links"
      subtitle="Connect across platforms and grow your network"
      ringColor={ringColor}
      onEdit={onEdit}
      isEditing={isEditing}
      delay={delay}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3 sm:flex-row"
      >
        {socials.map((social, idx) => {
          const Icon = socialIcons[idx % socialIcons.length];

          if (isEditing) {
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-1 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-white/35" />
                <input
                  value={social.label}
                  onChange={(e) => {
                    const next = [...socials];
                    next[idx] = { ...next[idx], label: e.target.value };
                    onChange(next);
                  }}
                  className={`w-full border-none bg-transparent text-sm text-white outline-none ${focusClass}`}
                />
              </motion.div>
            );
          }

          return (
            <motion.button
              key={idx}
              type="button"
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="profile-social-link group flex flex-1 cursor-pointer items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-white/15"
                  style={{ color: ringColor }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-white/75 group-hover:text-white">
                  {social.label}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
            </motion.button>
          );
        })}
      </motion.div>
    </ProfileSection>
  );
}
