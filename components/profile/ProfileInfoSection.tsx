import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Briefcase, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { useTilt } from "./useTilt";

interface ProfileInfoSectionProps {
  sectionIndex: string;
  currentRole: string;
  location: string;
  email: string;
  phone: string;
  timezone: string;
  availability: string;
  isEditing: boolean;
  focusClass: string;
  ringColor: string;
  onEdit: () => void;
  onChange: (field: string, value: string) => void;
  delay?: number;
}

function InfoCard({
  icon: Icon,
  label,
  value,
  onChange,
  isEditing,
  valueClass = "text-white/85",
  focusClass,
  ringColor,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange?: (val: string) => void;
  isEditing?: boolean;
  valueClass?: string;
  focusClass: string;
  ringColor: string;
}) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(8);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="profile-info-card profile-info-prism rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.035]"
    >
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]"
        style={{ color: ringColor }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>
      {isEditing && onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-sm text-white outline-none focus:border-white/20 ${focusClass}`}
        />
      ) : (
        <p className={`text-sm font-medium leading-snug ${valueClass}`}>{value}</p>
      )}
    </motion.div>
  );
}

export function ProfileInfoSection({
  sectionIndex,
  currentRole,
  location,
  email,
  phone,
  timezone,
  availability,
  isEditing,
  focusClass,
  ringColor,
  onEdit,
  onChange,
  delay = 0.2,
}: ProfileInfoSectionProps) {
  const fields: {
    icon: LucideIcon;
    label: string;
    key: string;
    value: string;
    valueClass?: string;
  }[] = [
    { icon: Briefcase, label: "Current Role", key: "currentRole", value: currentRole },
    { icon: MapPin, label: "Location", key: "location", value: location },
    { icon: Mail, label: "Email", key: "email", value: email },
    { icon: Phone, label: "Phone", key: "phone", value: phone },
    { icon: Globe, label: "Timezone", key: "timezone", value: timezone },
    {
      icon: Clock,
      label: "Availability",
      key: "availability",
      value: availability,
      valueClass: isEditing ? "text-white/85" : "text-emerald-400",
    },
  ];

  return (
    <ProfileSection
      sectionId="profile-info"
      index={sectionIndex}
      title="Information"
      subtitle="Contact details and professional availability"
      ringColor={ringColor}
      onEdit={onEdit}
      isEditing={isEditing}
      delay={delay}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(({ icon, label, key, value, valueClass }) => (
          <InfoCard
            key={key}
            icon={icon}
            label={label}
            value={value}
            isEditing={isEditing}
            onChange={(v) => onChange(key, v)}
            focusClass={focusClass}
            ringColor={ringColor}
            valueClass={valueClass}
          />
        ))}
      </div>
    </ProfileSection>
  );
}
