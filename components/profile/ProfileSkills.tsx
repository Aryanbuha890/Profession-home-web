import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProfileSection } from "./ProfileSection";
import { containerVariants, itemVariants } from "./animations";
import { useTilt } from "./useTilt";

interface ProfileSkillsProps {
  sectionIndex: string;
  skills: string[];
  isEditing: boolean;
  accentClass: string;
  gradientText: string;
  focusClass: string;
  ringColor: string;
  onEdit: () => void;
  onChange: (skills: string[]) => void;
  delay?: number;
}

function skillLevel(index: number, total: number): number {
  return Math.max(62, 97 - index * Math.floor(35 / Math.max(total - 1, 1)));
}

function SkillOrb({
  skill,
  index,
  level,
  ringColor,
  total,
}: {
  skill: string;
  index: number;
  level: number;
  ringColor: string;
  total: number;
}) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(14);
  const delay = 0.15 + index * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 20 }}
      className="profile-skill-orb-wrap"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="profile-skill-orb group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md transition-shadow hover:border-white/15"
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-100"
          style={{ background: `${ringColor}30`, opacity: 0.5 }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <span
              className="mb-2 inline-block font-mono text-[10px] font-bold tracking-[0.2em]"
              style={{ color: `${ringColor}90` }}
            >
              NODE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold tracking-tight text-white">{skill}</h3>
          </div>
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-sm font-bold text-white"
            style={{
              background: `conic-gradient(from 180deg, ${ringColor}40, transparent, ${ringColor}80)`,
              boxShadow: `0 0 20px ${ringColor}25`,
            }}
          >
            {level}
          </div>
        </div>

        <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="profile-skill-beam absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${ringColor}50, ${ringColor}, ${ringColor})`,
              boxShadow: `0 0 12px ${ringColor}`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${ringColor}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProfileSkills({
  sectionIndex,
  skills,
  isEditing,
  accentClass,
  gradientText,
  focusClass,
  ringColor,
  onEdit,
  onChange,
  delay = 0.2,
}: ProfileSkillsProps) {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <ProfileSection
      sectionId="profile-skills"
      index={sectionIndex}
      title="Top Skills"
      subtitle="Interactive skill constellation — hover to feel the depth"
      ringColor={ringColor}
      onEdit={onEdit}
      isEditing={isEditing}
      delay={delay}
    >
      {isEditing ? (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={`${skill}-${index}`}
              variants={itemVariants}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white/90"
            >
              <input
                value={skill}
                onChange={(e) => {
                  const next = [...skills];
                  next[index] = e.target.value;
                  onChange(next);
                }}
                className={`border-none bg-transparent outline-none ${gradientText} ${focusClass}`}
                style={{ width: `${Math.max(skill.length, 2)}ch` }}
              />
              <button
                type="button"
                onClick={() => onChange(skills.filter((_, i) => i !== index))}
                className="cursor-pointer text-white/30 hover:text-red-400"
              >
                ×
              </button>
            </motion.span>
          ))}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={() => onChange([...skills, "New Skill"])}
            className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium ${accentClass}`}
          >
            + Add Skill
          </motion.button>
        </motion.div>
      ) : (
        <div ref={gridRef} className="relative">
          <svg
            className="profile-skill-constellation pointer-events-none absolute inset-0 h-full w-full opacity-30"
            preserveAspectRatio="none"
          >
            {isInView &&
              skills.slice(0, -1).map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${((i % 3) + 0.5) * 33.33}%`}
                  y1={`${Math.floor(i / 3) * 50 + 25}%`}
                  x2={`${(((i + 1) % 3) + 0.5) * 33.33}%`}
                  y2={`${Math.floor((i + 1) / 3) * 50 + 25}%`}
                  stroke={ringColor}
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                />
              ))}
          </svg>

          <div className="profile-skill-grid relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <SkillOrb
                key={`${skill}-${index}`}
                skill={skill}
                index={index}
                level={skillLevel(index, skills.length)}
                ringColor={ringColor}
                total={skills.length}
              />
            ))}
          </div>
        </div>
      )}
    </ProfileSection>
  );
}
