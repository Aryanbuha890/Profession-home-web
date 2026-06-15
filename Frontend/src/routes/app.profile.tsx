import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { useRole } from "@/hooks/useRole";
import {
  CheckCircle2, Download, MessageSquare, Calendar, MapPin, Mail, Phone, Briefcase, Award, LayoutDashboard, Globe, Check, Clock, Save, Edit3, Github, Linkedin, Twitter, Camera, Image as ImageIcon, Send, ShieldCheck, Building, Users
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

interface RoleProfile {
  name: string;
  role: string;
  avatar: string;
  banner: string;
  about: string;
  about2: string;
  currentRole: string;
  location: string;
  email: string;
  phone: string;
  timezone: string;
  availability: string;
  skills: string[];
  strength: number;
  socials: { label: string }[];
  activities: { title: string; desc: string; time: string }[];
  accentClass: string;
  buttonAccent: string;
  badges: string[];
  gradientText: string;
  focusClass: string;
  cardHoverClass: string;
  progressClass: string;
  connectLabel: string;
  connectIcon: any;
}

const roleProfiles: Record<string, RoleProfile> = {
  student: {
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
    ],
    accentClass: "text-sky-400 border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20",
    buttonAccent: "from-sky-400 to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    badges: ["Verified User", "Open Source Contributor"],
    gradientText: "text-sky-400",
    focusClass: "focus:border-sky-500/50",
    cardHoverClass: "via-sky-400/20",
    progressClass: "[&>div]:from-sky-400 [&>div]:to-indigo-500",
    connectLabel: "Connect",
    connectIcon: MessageSquare
  },
  researcher: {
    name: "Dr. Aryan Buha",
    role: "Principal ML Researcher & PhD",
    avatar: "https://i.pravatar.cc/300?img=68",
    banner: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2070&auto=format&fit=crop",
    about: "Passionate Machine Learning Researcher focusing on Deep Neural Network optimization, Transformers, and Natural Language Processing. Dedicated to translating theoretical SOTA models into real-world applications.",
    about2: "Currently working on efficient model distillation methods and novel attention mechanisms. Over 15 published papers in top venues including NeurIPS, ICML, and CVPR.",
    currentRole: "Lead AI Scientist @ DeepMind Research",
    location: "Mumbai, Maharashtra, India",
    email: "aryan.buha@academy.edu",
    phone: "+91 91234 56789",
    timezone: "IST (UTC +5:30)",
    availability: "Open for Collaborations",
    skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision", "Model Optimization", "LaTeX", "Python", "C++", "Academic Writing"],
    strength: 90,
    socials: [
      { label: "Google Scholar" },
      { label: "LinkedIn" },
      { label: "ORCID ID" },
      { label: "ResearchGate" }
    ],
    activities: [
      { title: "Published paper", desc: "Paper titled 'Sparse Self-Attention Optimization' accepted at NeurIPS 2026.", time: "3 days ago" },
      { title: "Filed patent", desc: "Submitted patent draft for 'Distributed Attention Architecture'.", time: "2 weeks ago" },
      { title: "Panel Speaker", desc: "Keynote speaker at International AI Symposium.", time: "1 month ago" }
    ],
    accentClass: "text-violet-400 border-violet-500/20 bg-violet-500/10 hover:bg-violet-500/20",
    buttonAccent: "from-violet-400 to-fuchsia-500 shadow-[0_0_20px_rgba(167,139,250,0.3)]",
    badges: ["IEEE Fellow", "Verified Academic", "SOTA Pioneer"],
    gradientText: "text-violet-400",
    focusClass: "focus:border-violet-500/50",
    cardHoverClass: "via-violet-400/20",
    progressClass: "[&>div]:from-violet-400 [&>div]:to-fuchsia-500",
    connectLabel: "Collaborate",
    connectIcon: Users
  },
  founder: {
    name: "Aryan Buha",
    role: "Founder & CEO, Nexus OS",
    avatar: "https://i.pravatar.cc/300?img=12",
    banner: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    about: "Visionary builder and repeat founder. Building Nexus OS to democratize developer workspace toolchains and scale developer productivity using decentralized, super-fast visual dashboards.",
    about2: "Background in Full Stack product building and fundraising. Selected in the Y-Combinator W26 cohort. Obsessed with fast product execution and great developer experience design.",
    currentRole: "CEO @ Nexus Labs Inc.",
    location: "Bangalore, Karnataka, India",
    email: "founder@nexusos.io",
    phone: "+91 99988 87766",
    timezone: "IST (UTC +5:30)",
    availability: "Raising Seed Round",
    skills: ["Pitching", "Cap Table Management", "Product Strategy", "Seed Fundraising", "Next.js", "Go", "Rust", "System Architecture"],
    strength: 85,
    socials: [
      { label: "GitHub" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Crunchbase" }
    ],
    activities: [
      { title: "Pitched Investors", desc: "Completed Pitch Deck v1.4 draft submissions to 12 venture fund partners.", time: "Yesterday" },
      { title: "Closed Pre-seed", desc: "Finalized pre-seed round SAFE notes calculations ($2M at $12M valuation).", time: "5 days ago" },
      { title: "Deployed MVP", desc: "Launched Nexus OS Landing Page & sandbox workspace to Vercel.", time: "3 weeks ago" }
    ],
    accentClass: "text-rose-400 border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20",
    buttonAccent: "from-rose-400 to-orange-500 shadow-[0_0_20px_rgba(251,113,133,0.3)]",
    badges: ["Tech Founder", "Ecosystem Incubated", "Venture Backed"],
    gradientText: "text-rose-400",
    focusClass: "focus:border-rose-500/50",
    cardHoverClass: "via-rose-400/20",
    progressClass: "[&>div]:from-rose-400 [&>div]:to-orange-500",
    connectLabel: "Pitch Idea",
    connectIcon: Send
  },
  investor: {
    name: "Vikram Malhotra",
    role: "Managing Partner, Vanguard Capital",
    avatar: "https://i.pravatar.cc/300?img=59",
    banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    about: "Early-stage venture investor supporting visionary founders in SaaS, AI Infrastructure, and Developer Tools. Focused on helping pre-seed startups navigate scale from 0 to 1.",
    about2: "Managing a portfolio of 12 hyper-growth companies. Always seeking engineers, builders, and researchers who are redefining system architectures.",
    currentRole: "Managing Partner @ Vanguard Capital",
    location: "Delhi NCR, India",
    email: "vikram@vanguard.vc",
    phone: "+91 98888 77777",
    timezone: "IST (UTC +5:30)",
    availability: "Actively Investing",
    skills: ["Due Diligence", "Venture Capital", "Deal Flow Analysis", "Financial Modeling", "Cap Table Optimization", "Go-to-Market"],
    strength: 95,
    socials: [
      { label: "Vanguard VC" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Crunchbase" }
    ],
    activities: [
      { title: "Term Sheet Issued", desc: "Offered seed investment sheet to an AI infrastructure startup.", time: "4 days ago" },
      { title: "Due Diligence Complete", desc: "Completed engineering diligence audit for Nexus OS build.", time: "1 week ago" },
      { title: "LP Meeting", desc: "Quarterly portfolio review presented to Lead Institutional Investors.", time: "3 weeks ago" }
    ],
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20",
    buttonAccent: "from-emerald-400 to-teal-500 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    badges: ["GP Investor", "LP Partner", "Angel Network Lead"],
    gradientText: "text-emerald-400",
    focusClass: "focus:border-emerald-500/50",
    cardHoverClass: "via-emerald-400/20",
    progressClass: "[&>div]:from-emerald-400 [&>div]:to-teal-500",
    connectLabel: "Inquire Deal",
    connectIcon: MessageSquare
  },
  university: {
    name: "Dr. Neeraja Patel",
    role: "Dean of Innovation, Indus Institute of Tech",
    avatar: "https://i.pravatar.cc/300?img=47",
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    about: "Dedicated educator and academic director leading digital transformation, internship pipelines, and corporate partnerships at IIT-Indus.",
    about2: "Fostering university incubation programs, curriculum modernization, and research centers. Driven to bridge academic excellence with startup ecosystems.",
    currentRole: "Dean @ Indus Institute of Tech",
    location: "Gandhinagar, Gujarat, India",
    email: "dean.patel@indus.edu",
    phone: "+91 97777 66666",
    timezone: "IST (UTC +5:30)",
    availability: "Scheduling Corporate Visits",
    skills: ["Higher Education", "Corporate Relations", "Placement Strategy", "Grant Writing", "Curriculum Design", "Incubator Setup"],
    strength: 90,
    socials: [
      { label: "Indus University" },
      { label: "LinkedIn" },
      { label: "Academic Profile" },
      { label: "ResearchGate" }
    ],
    activities: [
      { title: "Placement Drive", desc: "Over 85% of computer science students placed in top tech roles.", time: "2 days ago" },
      { title: "Secured Research Grant", desc: "Received Government DST Grant of ₹15M for Machine Learning Lab.", time: "1 week ago" },
      { title: "MoU Signed", desc: "MoU finalized with Vanguard Capital for incubation partnership.", time: "2 weeks ago" }
    ],
    accentClass: "text-pink-400 border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20",
    buttonAccent: "from-pink-400 to-purple-500 shadow-[0_0_20px_rgba(244,114,182,0.3)]",
    badges: ["Academic Dean", "Incubator Lead", "Placement Director"],
    gradientText: "text-pink-400",
    focusClass: "focus:border-pink-500/50",
    cardHoverClass: "via-pink-400/20",
    progressClass: "[&>div]:from-pink-400 [&>div]:to-purple-500",
    connectLabel: "Partner MoU",
    connectIcon: Building
  },
  expert: {
    name: "Dr. John Chen",
    role: "Senior Technical Advisor & Startup Coach",
    avatar: "https://i.pravatar.cc/300?img=33",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    about: "Experienced tech executive, coach, and strategist. I help pre-seed and seed-stage startup founders design clean system architectures, growth loops, and prepare for institutional fundraising.",
    about2: "Over 15 years of operational experience across FAANG companies. Former engineering director. Active mentor across multiple premium accelerators.",
    currentRole: "Senior Advisor @ Vanguard Catalyst",
    location: "Pune, Maharashtra, India",
    email: "dr.chen@catalyst.io",
    phone: "+91 96666 55555",
    timezone: "IST (UTC +5:30)",
    availability: "Booking Discovery Sessions",
    skills: ["System Design", "Growth Loops", "Developer Relations", "Engineering Leadership", "Agile Methodologies", "SaaS"],
    strength: 92,
    socials: [
      { label: "Vanguard Catalyst" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Medium Blog" }
    ],
    activities: [
      { title: "Client Onboarded", desc: "Matched and onboarded Nexus OS under startup coaching track.", time: "Yesterday" },
      { title: "Masterclass Complete", desc: "Led a virtual workshop on 'Scalable Node Micro-architectures' for 50 founders.", time: "3 days ago" },
      { title: "Review Complete", desc: "Approved system design documents check for biotech patent portfolio.", time: "1 week ago" }
    ],
    accentClass: "text-amber-400 border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20",
    buttonAccent: "from-amber-400 to-yellow-600 shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    badges: ["Senior Advisory Partner", "GTM Strategist", "Frictionless Coach"],
    gradientText: "text-amber-400",
    focusClass: "focus:border-amber-500/50",
    cardHoverClass: "via-amber-400/20",
    progressClass: "[&>div]:from-amber-400 [&>div]:to-yellow-600",
    connectLabel: "Book Session",
    connectIcon: Calendar
  },
  admin: {
    name: "Root System Admin",
    role: "Principal Infrastructure Administrator",
    avatar: "https://i.pravatar.cc/300?img=60",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    about: "Managing ecosystem backend logs, user roles verification database, rewards distribution ledgers, and portal analytics security audit panels.",
    about2: "Maintaining maximum system availability, database replication nodes performance, API gateway rate-limit optimization, and support desks.",
    currentRole: "Chief Infrastructure Architect",
    location: "Remote",
    email: "admin@professionalhome.org",
    phone: "+91 95555 44444",
    timezone: "GMT (UTC +0:00)",
    availability: "Always Online",
    skills: ["Kubernetes", "Docker", "Network Security", "Database Administration", "Systems Architecture", "API Gateways", "Linux"],
    strength: 100,
    socials: [
      { label: "Internal Panel" },
      { label: "GitHub Admin" },
      { label: "Security Keys" },
      { label: "Network Logs" }
    ],
    activities: [
      { title: "SSL Renewed", desc: "Successfully verified and renewed security gateway certificates.", time: "12 hours ago" },
      { title: "Optimized Database", desc: "Re-indexed users database nodes to reduce query latency by 35%.", time: "1 day ago" },
      { title: "Audit Complete", desc: "Completed security audit for the rewards transaction ledger.", time: "3 days ago" }
    ],
    accentClass: "text-red-400 border-red-500/20 bg-red-500/10 hover:bg-red-500/20",
    buttonAccent: "from-red-500 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    badges: ["Root Access", "Security Operations", "Systems Health"],
    gradientText: "text-red-400",
    focusClass: "focus:border-red-500/50",
    cardHoverClass: "via-red-400/20",
    progressClass: "[&>div]:from-red-500 [&>div]:to-rose-600",
    connectLabel: "Diagnostics",
    connectIcon: ShieldCheck
  }
};

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
};

function ProfileDashboard() {
  const { role } = useRole();
  const [profiles, setProfiles] = useState(roleProfiles);
  const activeProfile = profiles[role] || profiles.student;

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [projectsAdded, setProjectsAdded] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (field: keyof RoleProfile, value: any) => {
    setProfiles(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value
      }
    }));
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

  const ConnectIcon = activeProfile.connectIcon;

  return (
    <Page title="Profile Dashboard" subtitle="Manage your professional digital identity">
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        {/* 1. Hero Section */}
        <motion.div {...FADE_IN} className="relative rounded-[20px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl">
          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full bg-slate-900 relative overflow-hidden transition-all duration-500">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${activeProfile.banner})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent pointer-events-none"></div>
            
            {editingSection === 'hero' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity z-10">
                <button 
                  onClick={() => bannerInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center gap-2 transition-all shadow-lg backdrop-blur-md cursor-pointer bg-transparent"
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
                    <AvatarImage src={activeProfile.avatar} className="object-cover" />
                    <AvatarFallback className="text-3xl rounded-[20px]">{getInitials(activeProfile.name)}</AvatarFallback>
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
                      value={activeProfile.name} 
                      onChange={e => handleProfileChange('name', e.target.value)}
                      className="text-3xl md:text-4xl font-bold tracking-tight text-white bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-2 py-1 -ml-2 w-full outline-none transition-all"
                    />
                  ) : (
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                      {activeProfile.name}
                      <CheckCircle2 className={`w-6 h-6 ${activeProfile.gradientText} shrink-0`} />
                    </h1>
                  )}
                  
                  {editingSection === 'hero' ? (
                    <input 
                      value={activeProfile.role} 
                      onChange={e => handleProfileChange('role', e.target.value)}
                      className="text-lg text-white font-medium bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent focus:border-sky-500/50 rounded-lg px-2 py-1 -ml-2 w-full outline-none transition-all"
                    />
                  ) : (
                    <p className="text-lg text-white/80 font-medium">{activeProfile.role}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                    {activeProfile.badges.map((badgeText, bIdx) => (
                      <Badge key={bIdx} className={activeProfile.accentClass}>{badgeText}</Badge>
                    ))}
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
                    <Button className={`bg-gradient-to-r ${activeProfile.buttonAccent} text-slate-950 font-bold hover:opacity-90 transition-all rounded-xl cursor-pointer`}>
                      <ConnectIcon className="w-4 h-4 mr-2" /> {activeProfile.connectLabel}
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
                title={<><CheckCircle2 className={`w-5 h-5 ${activeProfile.gradientText}`} /> Profile Strength</>}
                headerRight={<span className={`${activeProfile.gradientText} font-mono font-bold`}>{activeProfile.strength}%</span>}
                hoverColorClass={activeProfile.cardHoverClass}
              >
                <Progress value={activeProfile.strength} className={`h-2 bg-white/5 mb-4 [&>div]:bg-gradient-to-r ${activeProfile.progressClass} [&>div]:transition-all [&>div]:duration-1000`} />
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Personal Info</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Education</span></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Skills</span></div>
                  <div className="flex justify-between items-center">
                    <span className={`flex items-center gap-2 ${projectsAdded ? 'text-white/70' : 'text-white/40'}`}>
                      <Check className={`w-4 h-4 ${projectsAdded ? 'text-emerald-400' : 'opacity-0'}`} /> Portfolio Projects
                    </span>
                    {!projectsAdded && (
                      <Button onClick={handleAddProjects} variant="link" className={`h-auto p-0 ${activeProfile.gradientText} text-xs cursor-pointer hover:underline transition-colors`}>Add</Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Information */}
            <motion.div {...FADE_IN} transition={{ delay: 0.2 }}>
              <GlassCard title="Information" onEdit={() => toggleSection('info')} isEditing={editingSection === 'info'} hoverColorClass={activeProfile.cardHoverClass}>
                <div className="space-y-4">
                  <InfoRow isEditing={editingSection === 'info'} icon={Briefcase} label="Current Role" value={activeProfile.currentRole} onChange={(v) => handleProfileChange('currentRole', v)} focusClass={activeProfile.focusClass} />
                  <InfoRow isEditing={editingSection === 'info'} icon={MapPin} label="Location" value={activeProfile.location} onChange={(v) => handleProfileChange('location', v)} focusClass={activeProfile.focusClass} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Mail} label="Email" value={activeProfile.email} onChange={(v) => handleProfileChange('email', v)} focusClass={activeProfile.focusClass} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Phone} label="Phone" value={activeProfile.phone} onChange={(v) => handleProfileChange('phone', v)} focusClass={activeProfile.focusClass} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Globe} label="Timezone" value={activeProfile.timezone} onChange={(v) => handleProfileChange('timezone', v)} focusClass={activeProfile.focusClass} />
                  <InfoRow isEditing={editingSection === 'info'} icon={Clock} label="Availability" value={activeProfile.availability} onChange={(v) => handleProfileChange('availability', v)} focusClass={activeProfile.focusClass} className={editingSection === 'info' ? "" : "text-emerald-400 font-medium"} />
                </div>
              </GlassCard>
            </motion.div>

            {/* Social Links */}
            <motion.div {...FADE_IN} transition={{ delay: 0.3 }}>
              <GlassCard title="Social Links" onEdit={() => toggleSection('socials')} isEditing={editingSection === 'socials'} hoverColorClass={activeProfile.cardHoverClass}>
                <div className="grid grid-cols-2 gap-3">
                  {activeProfile.socials.map((social, idx) => {
                    const icons = [Github, Linkedin, Twitter, Globe];
                    const Icon = icons[idx % icons.length];
                    if (editingSection === 'socials') {
                      return (
                        <div key={idx} className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 group transition-all">
                          <Icon className="w-4 h-4 text-white/50 shrink-0 group-focus-within:text-sky-400 transition-colors" />
                          <input 
                            value={social.label}
                            onChange={(e) => {
                              const newSocials = [...activeProfile.socials];
                              newSocials[idx] = { ...newSocials[idx], label: e.target.value };
                              handleProfileChange('socials', newSocials);
                            }}
                            className="w-full bg-transparent border-none text-sm text-white outline-none placeholder:text-white/30"
                          />
                        </div>
                      );
                    }
                    return <SocialBtn key={idx} icon={Icon} label={social.label} activeColorClass={activeProfile.gradientText} />;
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
                <GlassCard title="About Me" onEdit={() => toggleSection('about')} isEditing={editingSection === 'about'} hoverColorClass={activeProfile.cardHoverClass}>
                  <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed max-w-none text-sm space-y-4">
                    {editingSection === 'about' ? (
                      <>
                        <textarea 
                          value={activeProfile.about}
                          onChange={(e) => handleProfileChange('about', e.target.value)}
                          className={`w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent ${activeProfile.focusClass} rounded-lg px-3 py-2 -ml-3 text-white outline-none transition-all resize-none min-h-[100px]`}
                        />
                        <textarea 
                          value={activeProfile.about2}
                          onChange={(e) => handleProfileChange('about2', e.target.value)}
                          className={`w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent ${activeProfile.focusClass} rounded-lg px-3 py-2 -ml-3 text-white outline-none transition-all resize-none min-h-[100px]`}
                        />
                      </>
                    ) : (
                      <>
                        <p>{activeProfile.about}</p>
                        <p>{activeProfile.about2}</p>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Skills */}
              <motion.div {...FADE_IN} transition={{ delay: 0.2 }}>
                <GlassCard title="Top Skills" onEdit={() => toggleSection('skills')} isEditing={editingSection === 'skills'} hoverColorClass={activeProfile.cardHoverClass}>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all cursor-default flex items-center gap-2">
                        {editingSection === 'skills' ? (
                          <input 
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...activeProfile.skills];
                              newSkills[index] = e.target.value;
                              handleProfileChange('skills', newSkills);
                            }}
                            className={`bg-transparent border-none outline-none text-white ${activeProfile.gradientText} transition-colors w-auto`}
                            style={{ width: `${Math.max(skill.length, 2)}ch` }}
                          />
                        ) : (
                          skill
                        )}
                        {editingSection === 'skills' && (
                          <button onClick={() => {
                            const newSkills = activeProfile.skills.filter((_, i) => i !== index);
                            handleProfileChange('skills', newSkills);
                          }} className="text-white/40 hover:text-red-400 cursor-pointer">&times;</button>
                        )}
                      </span>
                    ))}
                    {editingSection === 'skills' && (
                      <button onClick={() => {
                        handleProfileChange('skills', [...activeProfile.skills, "New Skill"]);
                      }} className={`px-3 py-1.5 rounded-lg ${activeProfile.accentClass} text-sm font-medium transition-all cursor-pointer bg-transparent`}>
                        + Add Skill
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Activity Feed */}
              <motion.div {...FADE_IN} transition={{ delay: 0.4 }}>
                <GlassCard title="Recent Activity" hoverColorClass={activeProfile.cardHoverClass}>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {activeProfile.activities.map((act, idx) => {
                      const icons = [LayoutDashboard, Award, Briefcase];
                      return (
                        <ActivityItem
                          key={idx}
                          title={act.title}
                          desc={act.desc}
                          time={act.time}
                          icon={icons[idx % icons.length]}
                          activeColorClass={activeProfile.gradientText}
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

function GlassCard({ title, headerRight, children, className = "", onEdit, isEditing, hoverColorClass = "via-sky-400/20" }: { title?: React.ReactNode, headerRight?: React.ReactNode, children: React.ReactNode, className?: string, onEdit?: () => void, isEditing?: boolean, hoverColorClass?: string }) {
  return (
    <div className={`rounded-[20px] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 shadow-xl relative overflow-hidden group ${className}`}>
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400/0 ${hoverColorClass} to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
      
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

function InfoRow({ icon: Icon, label, value, onChange, isEditing, className = "text-white/90", focusClass = "focus:border-sky-500/50" }: { icon: any, label: string, value: string, onChange?: (val: string) => void, isEditing?: boolean, className?: string, focusClass?: string }) {
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
            className={`w-full bg-transparent hover:bg-white/5 focus:bg-white/10 border border-transparent ${focusClass} rounded-md px-2 py-1 -ml-2 text-sm text-white outline-none transition-all`}
          />
        ) : (
          <p className={`text-sm truncate ${className}`}>{value}</p>
        )}
      </div>
    </div>
  );
}

function SocialBtn({ icon: Icon, label, activeColorClass = "text-sky-400" }: { icon: any, label: string, activeColorClass?: string }) {
  return (
    <button className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/80 hover:text-white cursor-pointer w-full justify-center group">
      <Icon className={`w-4 h-4 group-hover:${activeColorClass} transition-colors text-white/50`} />
      {label}
    </button>
  );
}

function ActivityItem({ title, desc, time, icon: Icon, activeColorClass = "text-sky-400" }: { title: string, desc: string, time: string, icon: any, activeColorClass?: string }) {
  return (
    <div className="relative flex items-start gap-4 group">
      <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full border-2 ${activeColorClass.replace('text-', 'border-')} bg-[#0B1220] ring-4 ring-[#0B1220] z-10 transition-transform group-hover:scale-125`} />
      
      <div className="flex-1 ml-6 md:ml-0 md:w-1/2 md:pr-10 md:text-right">
        <div className="hidden md:block">
          <p className="text-sm font-bold text-white mb-1">{title}</p>
          <p className="text-xs text-white/60 mb-2 leading-relaxed">{desc}</p>
        </div>
        <span className={`text-[10px] font-mono ${activeColorClass}/80 uppercase tracking-wider`}>{time}</span>
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
