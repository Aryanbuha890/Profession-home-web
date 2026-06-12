import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import {
  CheckCircle2, Download, MessageSquare, Calendar, MapPin, Mail, Phone, Briefcase, Award, LayoutDashboard, Globe, Check, Clock, Save, Edit3, Github, Linkedin, Twitter, Camera, Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — Professional Home" }] }),
  component: ProfileDashboard,
});

const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function ProfileDashboard() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [projectsAdded, setProjectsAdded] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Vraj Gajjar",
    role: "Full Stack Developer & AI Engineer",
    avatar: "https://i.pravatar.cc/300?img=11",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    about: "Passionate Full Stack Developer and AI Enthusiast with a strong background in building scalable web applications. Currently building solutions that bridge the gap between complex AI models and user-friendly interfaces.",
    about2: "Recognized as a GSSoC 2026 Contributor and active participant in multiple global hackathons. My goal is to leverage technology to solve real-world problems and continuously grow as a software engineer.",
    currentRole: "SDE Intern @ TechCorp",
    location: "Ahmedabad, Gujarat, India",
    email: "contact@vraj.dev",
    phone: "+91 98765 43210",
    timezone: "IST (UTC +5:30)",
    availability: "Open to Work",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Python", "MongoDB", "Docker", "AWS", "Machine Learning"],
    strength: 85,
    socials: [
      { label: "GitHub" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Portfolio" }
    ],
    activities: [
      { title: "Published a new project", desc: "Launched the 'AEGIS Command Center' on GitHub.", time: "2 days ago" },
      { title: "Won Hackathon", desc: "First runner up at the National Coding Challenge 2026.", time: "1 week ago" },
      { title: "Started a new position", desc: "Joined TechCorp as a Full Stack Intern.", time: "1 month ago" }
    ]
  });

  const handleProfileChange = (field: keyof typeof profile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'avatar' | 'banner', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleProfileChange(field, url);
    }
  };

  const toggleSection = (section: string) => {
    setEditingSection(prev => prev === section ? null : section);
  };

  const handleAddProjects = () => {
    setProjectsAdded(true);
    handleProfileChange('strength', 100);
  };

  return (
    <Page title="Profile Dashboard" subtitle="Manage your professional digital identity">
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        {/* 1. Hero Section */}
        <motion.div {...FADE_IN} className="relative rounded-[20px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl">
          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full bg-slate-900 relative overflow-hidden transition-all duration-500">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${profile.banner})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent pointer-events-none"></div>
            
            {editingSection === 'hero' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity z-10">
                <button 
                  onClick={() => bannerInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center gap-2 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                >
                  <ImageIcon className="w-5 h-5" /> Change Cover Photo
                </button>
                <input type="file" ref={bannerInputRef} onChange={(e) => handleImageUpload('banner', e)} className="hidden" accept="image/*" />
              </div>
            )}
          </div>

          <div className="px-6 sm:px-10 pb-8 relative -mt-20 z-20">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left w-full md:w-auto">
                
                {/* Avatar */}
                <div className="relative group shrink-0">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#0B1220] shadow-2xl rounded-[20px] bg-[#0B1220]">
                    <AvatarImage src={profile.avatar} className="object-cover" />
                    <AvatarFallback className="text-3xl rounded-[20px]">VG</AvatarFallback>
                  </Avatar>
                  {editingSection === 'hero' && (
                    <button 
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-[16px] border-4 border-transparent cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-white mb-2" />
                      <span className="absolute bottom-6 text-xs font-bold text-white uppercase tracking-wider">Update</span>
                    </button>
                  )}
                  <input type="file" ref={avatarInputRef} onChange={(e) => handleImageUpload('avatar', e)} className="hidden" accept="image/*" />
                </div>

                <div className="space-y-2 mb-2 w-full max-w-md">
                  {editingSection === 'hero' ? (
                    <input 
                      value={profile.name} 
                      onChange={e => handleProfileChange('name', e.target.value)}
                      className="text-3xl md:text-4xl font-bold tracking-tight text-white bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-2 py-1 -ml-2 w-full outline-none transition-all"
                    />
                  ) : (
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                      {profile.name}
                      <CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" />
                    </h1>
                  )}
                  
                  {editingSection === 'hero' ? (
                    <input 
                      value={profile.role} 
                      onChange={e => handleProfileChange('role', e.target.value)}
                      className="text-lg text-white font-medium bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-2 py-1 -ml-2 w-full outline-none transition-all"
                    />
                  ) : (
                    <p className="text-lg text-white/80 font-medium">{profile.role}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                    <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/20">Verified User</Badge>
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20">Open Source Contributor</Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto mb-2">
                <Button 
                  onClick={() => toggleSection('hero')}
                  variant={editingSection === 'hero' ? "default" : "outline"} 
                  className={editingSection === 'hero' ? "bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg border-none cursor-pointer" : "border-white/10 hover:bg-white/5 transition-all rounded-xl cursor-pointer bg-white/5"}
                >
                  {editingSection === 'hero' ? <><Save className="w-4 h-4 mr-2" /> Save Profile</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</>}
                </Button>
                {editingSection !== 'hero' && (
                  <>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 transition-all rounded-xl cursor-pointer">
                      <Download className="w-4 h-4 mr-2" /> Resume
                    </Button>
                    <Button className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] rounded-xl cursor-pointer">
                      <MessageSquare className="w-4 h-4 mr-2" /> Connect
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <motion.div {...FADE_IN} transition={{ delay: 0.1 }}>
              <GlassCard 
                title={<><CheckCircle2 className="w-5 h-5 text-sky-400" /> Profile Strength</>}
                headerRight={<span className="text-sky-400 font-mono font-bold">{profile.strength}%</span>}
              >
                <Progress value={profile.strength} className="h-2 bg-white/5 mb-4 [&>div]:bg-gradient-to-r [&>div]:from-sky-400 [&>div]:to-indigo-500 [&>div]:transition-all [&>div]:duration-1000" />
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Personal Info</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Education</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Skills</span></div>
                  <div className="flex justify-between items-center">
                    <span className={`flex items-center gap-2 ${projectsAdded ? 'text-white/70' : 'text-white/40'}`}>
                      <Check className={`w-4 h-4 ${projectsAdded ? 'text-emerald-400' : 'opacity-0'}`} /> Portfolio Projects
                    </span>
                    {!projectsAdded && (
                      <Button onClick={handleAddProjects} variant="link" className="h-auto p-0 text-sky-400 text-xs cursor-pointer hover:text-sky-300 transition-colors">Add</Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Information */}
            <motion.div {...FADE_IN} transition={{ delay: 0.2 }}>
              <GlassCard title="Information" onEdit={() => toggleSection('info')} isEditing={editingSection === 'info'}>
                <div className="space-y-4">
                  <InfoRow isEditing={editingSection === 'info'} icon={Briefcase} label="Current Role" value={profile.currentRole} onChange={(v) => handleProfileChange('currentRole', v)} />
                  <InfoRow isEditing={editingSection === 'info'} icon={MapPin} label="Location" value={profile.location} onChange={(v) => handleProfileChange('location', v)} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Mail} label="Email" value={profile.email} onChange={(v) => handleProfileChange('email', v)} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Phone} label="Phone" value={profile.phone} onChange={(v) => handleProfileChange('phone', v)} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Globe} label="Timezone" value={profile.timezone} onChange={(v) => handleProfileChange('timezone', v)} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Clock} label="Availability" value={profile.availability} onChange={(v) => handleProfileChange('availability', v)} className={editingSection === 'info' ? "" : "text-emerald-400 font-medium"} />
                </div>
              </GlassCard>
            </motion.div>

            {/* Social Links */}
            <motion.div {...FADE_IN} transition={{ delay: 0.3 }}>
              <GlassCard title="Social Links" onEdit={() => toggleSection('socials')} isEditing={editingSection === 'socials'}>
                <div className="grid grid-cols-2 gap-3">
                  {profile.socials.map((social, idx) => {
                    const icons = [Github, Linkedin, Twitter, Globe];
                    const Icon = icons[idx % icons.length];
                    if (editingSection === 'socials') {
                      return (
                        <div key={idx} className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 group transition-all">
                          <Icon className="w-4 h-4 text-white/50 shrink-0 group-focus-within:text-sky-400 transition-colors" />
                          <input 
                            value={social.label}
                            onChange={(e) => {
                              const newSocials = [...profile.socials];
                              newSocials[idx] = { ...newSocials[idx], label: e.target.value };
                              handleProfileChange('socials', newSocials);
                            }}
                            className="w-full bg-transparent border-none text-sm text-white outline-none placeholder:text-white/30"
                          />
                        </div>
                      );
                    }
                    return <SocialBtn key={idx} icon={Icon} label={social.label} />;
                  })}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column (Overview) */}
          <div className="xl:col-span-2 space-y-6">
            <div className="space-y-6 outline-none">
              
              {/* About Me */}
              <motion.div {...FADE_IN} transition={{ delay: 0.1 }}>
                <GlassCard title="About Me" onEdit={() => toggleSection('about')} isEditing={editingSection === 'about'}>
                  <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed max-w-none text-sm space-y-4">
                    {editingSection === 'about' ? (
                      <>
                        <textarea 
                          value={profile.about}
                          onChange={(e) => handleProfileChange('about', e.target.value)}
                          className="w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-3 py-2 -ml-3 text-white outline-none transition-all resize-none min-h-[100px]"
                        />
                        <textarea 
                          value={profile.about2}
                          onChange={(e) => handleProfileChange('about2', e.target.value)}
                          className="w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-3 py-2 -ml-3 text-white outline-none transition-all resize-none min-h-[100px]"
                        />
                      </>
                    ) : (
                      <>
                        <p>{profile.about}</p>
                        <p>{profile.about2}</p>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Skills */}
              <motion.div {...FADE_IN} transition={{ delay: 0.2 }}>
                <GlassCard title="Top Skills" onEdit={() => toggleSection('skills')} isEditing={editingSection === 'skills'}>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all cursor-default flex items-center gap-2">
                        {editingSection === 'skills' ? (
                          <input 
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...profile.skills];
                              newSkills[index] = e.target.value;
                              handleProfileChange('skills', newSkills as any);
                            }}
                            className="bg-transparent border-none outline-none text-white focus:text-sky-400 transition-colors w-auto"
                            style={{ width: `${Math.max(skill.length, 2)}ch` }}
                          />
                        ) : (
                          skill
                        )}
                        {editingSection === 'skills' && (
                          <button onClick={() => {
                            const newSkills = profile.skills.filter((_, i) => i !== index);
                            handleProfileChange('skills', newSkills as any);
                          }} className="text-white/40 hover:text-red-400 cursor-pointer">&times;</button>
                        )}
                      </span>
                    ))}
                    {editingSection === 'skills' && (
                      <button onClick={() => {
                        handleProfileChange('skills', [...profile.skills, "New Skill"] as any);
                      }} className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 text-sm font-medium hover:bg-sky-500/30 transition-all cursor-pointer">
                        + Add Skill
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Activity Feed */}
              <motion.div {...FADE_IN} transition={{ delay: 0.4 }}>
                {/* Removed onEdit prop from Recent Activity to prevent editing */}
                <GlassCard title="Recent Activity">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {profile.activities.map((act, idx) => {
                      const icons = [LayoutDashboard, Award, Briefcase];
                      return (
                        <ActivityItem
                          key={idx}
                          title={act.title}
                          desc={act.desc}
                          time={act.time}
                          icon={icons[idx % icons.length]}
                        />
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// Subcomponents

function GlassCard({ title, headerRight, children, className = "", onEdit, isEditing }: { title?: React.ReactNode, headerRight?: React.ReactNode, children: React.ReactNode, className?: string, onEdit?: () => void, isEditing?: boolean }) {
  return (
    <div className={`rounded-[20px] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 shadow-xl relative overflow-hidden group ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400/0 via-sky-400/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {title && (
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">{title}</h2>
          <div className="flex items-center gap-3">
            {headerRight}
            {onEdit && (
              <button 
                onClick={onEdit} 
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isEditing ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-sky-400 hover:border-sky-400/30'}`}
                title={isEditing ? "Save section" : "Edit section"}
              >
                {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      )}
      
      {!title && onEdit && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onEdit} 
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isEditing ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-sky-400 hover:border-sky-400/30'}`}
            title={isEditing ? "Save section" : "Edit section"}
          >
            {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </button>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, onChange, isEditing, className = "text-white/90" }: { icon: any, label: string, value: string, onChange?: (val: string) => void, isEditing?: boolean, className?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10 text-white/50">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-0.5">{label}</p>
        {isEditing && onChange ? (
          <input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-md px-2 py-1 -ml-2 text-sm text-white outline-none transition-all"
          />
        ) : (
          <p className={`text-sm truncate ${className}`}>{value}</p>
        )}
      </div>
    </div>
  );
}

function SocialBtn({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/80 hover:text-white cursor-pointer w-full justify-center group">
      <Icon className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
      {label}
    </button>
  );
}

function ActivityItem({ title, desc, time, icon: Icon }: { title: string, desc: string, time: string, icon: any }) {
  return (
    <div className="relative flex items-start gap-4 group">
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full border-2 border-sky-400 bg-[#0B1220] ring-4 ring-[#0B1220] z-10 transition-transform group-hover:scale-125" />
      
      <div className="flex-1 ml-6 md:ml-0 md:w-1/2 md:pr-10 md:text-right">
        <div className="hidden md:block">
          <p className="text-sm font-bold text-white mb-1">{title}</p>
          <p className="text-xs text-white/60 mb-2 leading-relaxed">{desc}</p>
        </div>
        <span className="text-[10px] font-mono text-sky-400/80 uppercase tracking-wider">{time}</span>
      </div>
      <div className="flex-1 md:w-1/2 md:pl-10">
        <div className="md:hidden">
          <p className="text-sm font-bold text-white mb-1">{title}</p>
          <p className="text-xs text-white/60 mb-2 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
