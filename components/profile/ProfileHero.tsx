import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CheckCircle2,
  Download,
  Edit3,
  Image as ImageIcon,
  Save,
  Sparkles,
} from "lucide-react";
import type { RoleProfile } from "./types";
import { getInitials } from "./types";
import { fadeUp } from "./animations";
import { useTilt } from "./useTilt";
import { ProfileLiveStatus } from "./ProfileLiveStatus";

interface ProfileHeroProps {
  profile: RoleProfile;
  isEditing: boolean;
  onToggleEdit: () => void;
  onChange: (field: keyof RoleProfile, value: string) => void;
  onImageUpload: (field: "avatar" | "banner", e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHero({
  profile,
  isEditing,
  onToggleEdit,
  onChange,
  onImageUpload,
}: ProfileHeroProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const ConnectIcon = profile.connectIcon;
  const { ref: tiltRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(8);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  return (
    <motion.div {...fadeUp(0)} className="profile-hero-wrap mb-8" style={{ perspective: 1400 }}>
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="profile-hero profile-hero-holo relative overflow-hidden rounded-[28px] border border-white/[0.08] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.7)]"
      >
        <div
          className="profile-holo-border pointer-events-none absolute -inset-px z-30 rounded-[28px] opacity-80"
          style={{
            background: `conic-gradient(from var(--holo-angle, 0deg), transparent, ${profile.ringColor}, transparent, ${profile.ringColor}80, transparent)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        <div className="profile-hero-scan pointer-events-none absolute inset-0 z-20 opacity-[0.07]" />

        <div
          className="relative h-48 overflow-hidden sm:h-56"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
        >
          <motion.div
            className="profile-banner absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.banner})` }}
            animate={{ scale: isEditing ? 1 : [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(500px circle at ${spot.x}% ${spot.y}%, ${profile.glowColor}40, transparent 50%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060F] via-[#05060F]/60 to-[#05060F]/20" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 80% at 50% 100%, ${profile.glowColor}, transparent 65%)`,
            }}
          />

          <div className="profile-hero-noise pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />

          {isEditing && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100">
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <ImageIcon className="h-4 w-4" /> Change Cover
              </button>
              <input
                type="file"
                ref={bannerInputRef}
                onChange={(e) => onImageUpload("banner", e)}
                className="hidden"
                accept="image/*"
              />
            </div>
          )}

          <ProfileLiveStatus ringColor={profile.ringColor} availability={profile.availability} />

          <div className="absolute left-6 top-5 z-20">
            <span className="profile-role-badge inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/75 backdrop-blur-md">
              <Sparkles className="h-3 w-3" style={{ color: profile.ringColor }} />
              {profile.roleTag}
            </span>
          </div>
        </div>

        <div className="relative z-20 -mt-20 px-6 pb-8 sm:-mt-[5.5rem] sm:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="profile-avatar-wrap group relative mb-5 shrink-0" style={{ transform: "translateZ(40px)" }}>
              <div
                className="profile-avatar-bloom pointer-events-none absolute -inset-8 rounded-full blur-2xl"
                style={{ background: `${profile.ringColor}35` }}
              />
              <div
                className="profile-avatar-ring absolute -inset-1 rounded-[24px] opacity-90"
                style={{
                  background: `conic-gradient(from 200deg, ${profile.ringColor}, transparent 45%, ${profile.ringColor})`,
                }}
              />
              <Avatar className="relative h-[7.5rem] w-[7.5rem] rounded-[22px] border-[3px] border-[#05060F] bg-[#05060F] shadow-2xl sm:h-36 sm:w-36">
                <AvatarImage src={profile.avatar} className="object-cover" />
                <AvatarFallback className="rounded-[22px] text-3xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-[18px] bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <Camera className="mb-1 h-7 w-7 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Update</span>
                </button>
              )}
              <input
                type="file"
                ref={avatarInputRef}
                onChange={(e) => onImageUpload("avatar", e)}
                className="hidden"
                accept="image/*"
              />
            </div>

            {isEditing ? (
              <div className="w-full max-w-md space-y-2" style={{ transform: "translateZ(20px)" }}>
                <input
                  value={profile.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-2xl font-bold text-white outline-none sm:text-3xl ${profile.focusClass}`}
                />
                <input
                  value={profile.role}
                  onChange={(e) => onChange("role", e.target.value)}
                  className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-base text-white/80 outline-none ${profile.focusClass}`}
                />
              </div>
            ) : (
              <div style={{ transform: "translateZ(24px)" }}>
                <h1 className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight sm:text-[2rem]">
                  <span className="profile-name-gradient profile-name-shimmer">{profile.name}</span>
                  <CheckCircle2 className={`h-6 w-6 shrink-0 ${profile.gradientText}`} />
                </h1>
                <p className="mt-1.5 text-base text-white/55 sm:text-lg">{profile.role}</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2" style={{ transform: "translateZ(16px)" }}>
              {profile.badges.map((badgeText, i) => (
                <motion.div
                  key={badgeText}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                >
                  <Badge className={`${profile.accentClass} text-[11px] backdrop-blur-sm`}>
                    {badgeText}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
              style={{ transform: "translateZ(12px)" }}
            >
              <Button
                onClick={onToggleEdit}
                variant={isEditing ? "default" : "outline"}
                size="sm"
                className={
                  isEditing
                    ? "cursor-pointer rounded-xl border-none bg-emerald-500 text-white hover:bg-emerald-600"
                    : "cursor-pointer rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/10"
                }
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                  </>
                )}
              </Button>
              {!isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </Button>
                  <Button
                    size="sm"
                    className={`profile-cta-btn cursor-pointer rounded-xl bg-gradient-to-r ${profile.buttonAccent} font-bold text-slate-950 hover:opacity-90`}
                  >
                    <ConnectIcon className="mr-2 h-4 w-4" /> {profile.connectLabel}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
