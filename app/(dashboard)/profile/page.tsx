'use client';
import { Page } from "@/components/app/Page";
import { useState } from "react";
import { useRole } from "@/hooks/useRole";
import {
  ProfileHero,
  ProfileStrength,
  ProfileInfoSection,
  ProfileSocials,
  ProfileAbout,
  ProfileSkills,
  ProfileActivity,
  ProfileBackground,
  ProfileScrollSpine,
  ProfileMouseAura,
  ProfileCommandDock,
  roleProfiles,
  type RoleProfile,
} from "@/components/profile";



function ProfileDashboard() {
  const { role } = useRole();
  const [profiles, setProfiles] = useState(roleProfiles);
  const activeProfile = profiles[role] || profiles.student;

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [projectsAdded, setProjectsAdded] = useState(false);

  const handleProfileChange = (field: keyof RoleProfile, value: RoleProfile[keyof RoleProfile]) => {
    setProfiles((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  const handleImageUpload = (
    field: "avatar" | "banner",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) handleProfileChange(field, URL.createObjectURL(file));
  };

  const toggleSection = (section: string) => {
    setEditingSection((prev) => (prev === section ? null : section));
  };

  const handleAddProjects = () => {
    setProjectsAdded(true);
    handleProfileChange("strength", 100);
  };

  const p = activeProfile;

  return (
    <Page title="Profile Dashboard" subtitle="Manage your professional digital identity">
      <div className="profile-page relative pb-20">
        <ProfileBackground glowColor={p.glowColor} />
        <ProfileMouseAura color={p.glowColor} />

        <div className="profile-stream relative mx-auto max-w-[920px] xl:max-w-[960px] xl:pl-6">
          <ProfileScrollSpine ringColor={p.ringColor} />
          <ProfileHero
            profile={p}
            isEditing={editingSection === "hero"}
            onToggleEdit={() => toggleSection("hero")}
            onChange={(field, value) => handleProfileChange(field, value)}
            onImageUpload={handleImageUpload}
          />

          <div className="profile-sections mt-2">
            <ProfileStrength
              sectionIndex="01"
              strength={p.strength}
              gradientText={p.gradientText}
              ringColor={p.ringColor}
              projectsAdded={projectsAdded}
              onAddProjects={handleAddProjects}
              delay={0.12}
            />

            <ProfileAbout
              sectionIndex="02"
              about={p.about}
              about2={p.about2}
              isEditing={editingSection === "about"}
              focusClass={p.focusClass}
              ringColor={p.ringColor}
              onEdit={() => toggleSection("about")}
              onChange={(field, value) => handleProfileChange(field, value)}
              delay={0.14}
            />

            <ProfileSkills
              sectionIndex="03"
              skills={p.skills}
              isEditing={editingSection === "skills"}
              accentClass={p.accentClass}
              gradientText={p.gradientText}
              focusClass={p.focusClass}
              ringColor={p.ringColor}
              onEdit={() => toggleSection("skills")}
              onChange={(skills) => handleProfileChange("skills", skills)}
              delay={0.16}
            />

            <ProfileInfoSection
              sectionIndex="04"
              currentRole={p.currentRole}
              location={p.location}
              email={p.email}
              phone={p.phone}
              timezone={p.timezone}
              availability={p.availability}
              isEditing={editingSection === "info"}
              focusClass={p.focusClass}
              ringColor={p.ringColor}
              onEdit={() => toggleSection("info")}
              onChange={(field, value) =>
                handleProfileChange(field as keyof RoleProfile, value)
              }
              delay={0.18}
            />

            <ProfileSocials
              sectionIndex="05"
              socials={p.socials}
              isEditing={editingSection === "socials"}
              focusClass={p.focusClass}
              ringColor={p.ringColor}
              onEdit={() => toggleSection("socials")}
              onChange={(socials) => handleProfileChange("socials", socials)}
              delay={0.2}
            />

            <ProfileActivity
              sectionIndex="06"
              activities={p.activities}
              ringColor={p.ringColor}
              delay={0.22}
            />
          </div>
        </div>
        <ProfileCommandDock ringColor={p.ringColor} />
      </div>
    </Page>
  );
}

export default ProfileDashboard;
