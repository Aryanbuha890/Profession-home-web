import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Users,
  Send,
  Calendar,
  Building,
  ShieldCheck,
} from "lucide-react";

export interface ProfileStat {
  label: string;
  value: string;
}

export interface RoleProfile {
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
  stats: ProfileStat[];
  accentClass: string;
  buttonAccent: string;
  badges: string[];
  gradientText: string;
  focusClass: string;
  cardHoverClass: string;
  progressClass: string;
  ringColor: string;
  glowColor: string;
  connectLabel: string;
  connectIcon: LucideIcon;
  roleTag: string;
}

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const roleProfiles: Record<string, RoleProfile> = {
  student: {
    name: "Vraj Gajjar",
    role: "Full Stack Developer & AI Engineer",
    avatar: "https://i.pravatar.cc/300?img=11",
    banner:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    about:
      "Passionate Full Stack Developer and AI Enthusiast with a strong background in building scalable web applications. Currently building solutions that bridge the gap between complex AI models and user-friendly interfaces.",
    about2:
      "Recognized as a GSSoC 2026 Contributor and active participant in multiple global hackathons. My goal is to leverage technology to solve real-world problems and continuously grow as a software engineer.",
    currentRole: "SDE Intern @ TechCorp",
    location: "Ahmedabad, Gujarat, India",
    email: "contact@vraj.dev",
    phone: "+91 98765 43210",
    timezone: "IST (UTC +5:30)",
    availability: "Open to Work",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "MongoDB",
      "Docker",
      "AWS",
      "Machine Learning",
    ],
    strength: 85,
    stats: [
      { label: "Projects", value: "12" },
      { label: "Hackathons", value: "8" },
      { label: "Skills", value: "9" },
      { label: "Endorsements", value: "24" },
    ],
    socials: [
      { label: "GitHub" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Portfolio" },
    ],
    activities: [
      {
        title: "Published a new project",
        desc: "Launched the 'AEGIS Command Center' on GitHub.",
        time: "2 days ago",
      },
      {
        title: "Won Hackathon",
        desc: "First runner up at the National Coding Challenge 2026.",
        time: "1 week ago",
      },
      {
        title: "Started a new position",
        desc: "Joined TechCorp as a Full Stack Intern.",
        time: "1 month ago",
      },
    ],
    accentClass:
      "text-sky-400 border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20",
    buttonAccent:
      "from-sky-400 to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    badges: ["Verified User", "Open Source Contributor"],
    gradientText: "text-sky-400",
    focusClass: "focus:border-sky-500/50",
    cardHoverClass: "via-sky-400/20",
    progressClass: "[&>div]:from-sky-400 [&>div]:to-indigo-500",
    ringColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.35)",
    connectLabel: "Connect",
    connectIcon: MessageSquare,
    roleTag: "STUDENT",
  },
  researcher: {
    name: "Dr. Aryan Buha",
    role: "Principal ML Researcher & PhD",
    avatar: "https://i.pravatar.cc/300?img=68",
    banner:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2070&auto=format&fit=crop",
    about:
      "Passionate Machine Learning Researcher focusing on Deep Neural Network optimization, Transformers, and Natural Language Processing. Dedicated to translating theoretical SOTA models into real-world applications.",
    about2:
      "Currently working on efficient model distillation methods and novel attention mechanisms. Over 15 published papers in top venues including NeurIPS, ICML, and CVPR.",
    currentRole: "Lead AI Scientist @ DeepMind Research",
    location: "Mumbai, Maharashtra, India",
    email: "aryan.buha@academy.edu",
    phone: "+91 91234 56789",
    timezone: "IST (UTC +5:30)",
    availability: "Open for Collaborations",
    skills: [
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Computer Vision",
      "Model Optimization",
      "LaTeX",
      "Python",
      "C++",
      "Academic Writing",
    ],
    strength: 100,
    stats: [
      { label: "Publications", value: "15+" },
      { label: "Citations", value: "2.4K" },
      { label: "h-index", value: "12" },
      { label: "Collaborators", value: "48" },
    ],
    socials: [
      { label: "Google Scholar" },
      { label: "LinkedIn" },
      { label: "ORCID ID" },
      { label: "ResearchGate" },
    ],
    activities: [
      {
        title: "Published paper",
        desc: "Paper titled 'Sparse Self-Attention Optimization' accepted at NeurIPS 2026.",
        time: "3 days ago",
      },
      {
        title: "Filed patent",
        desc: "Submitted patent draft for 'Distributed Attention Architecture'.",
        time: "2 weeks ago",
      },
      {
        title: "Panel Speaker",
        desc: "Keynote speaker at International AI Symposium.",
        time: "1 month ago",
      },
    ],
    accentClass:
      "text-violet-400 border-violet-500/20 bg-violet-500/10 hover:bg-violet-500/20",
    buttonAccent:
      "from-violet-400 to-fuchsia-500 shadow-[0_0_20px_rgba(167,139,250,0.3)]",
    badges: ["IEEE Fellow", "Verified Academic", "SOTA Pioneer"],
    gradientText: "text-violet-400",
    focusClass: "focus:border-violet-500/50",
    cardHoverClass: "via-violet-400/20",
    progressClass: "[&>div]:from-violet-400 [&>div]:to-fuchsia-500",
    ringColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.4)",
    connectLabel: "Collaborate",
    connectIcon: Users,
    roleTag: "RESEARCHER",
  },
  founder: {
    name: "Aryan Buha",
    role: "Founder & CEO, Nexus OS",
    avatar: "https://i.pravatar.cc/300?img=12",
    banner:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    about:
      "Visionary builder and repeat founder. Building Nexus OS to democratize developer workspace toolchains and scale developer productivity using decentralized, super-fast visual dashboards.",
    about2:
      "Background in Full Stack product building and fundraising. Selected in the Y-Combinator W26 cohort. Obsessed with fast product execution and great developer experience design.",
    currentRole: "CEO @ Nexus Labs Inc.",
    location: "Bangalore, Karnataka, India",
    email: "founder@nexusos.io",
    phone: "+91 99988 87766",
    timezone: "IST (UTC +5:30)",
    availability: "Raising Seed Round",
    skills: [
      "Pitching",
      "Cap Table Management",
      "Product Strategy",
      "Seed Fundraising",
      "Next.js",
      "Go",
      "Rust",
      "System Architecture",
    ],
    strength: 85,
    stats: [
      { label: "Startups", value: "2" },
      { label: "Funding", value: "$2M" },
      { label: "Team Size", value: "14" },
      { label: "MRR Growth", value: "340%" },
    ],
    socials: [
      { label: "GitHub" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Crunchbase" },
    ],
    activities: [
      {
        title: "Pitched Investors",
        desc: "Completed Pitch Deck v1.4 draft submissions to 12 venture fund partners.",
        time: "Yesterday",
      },
      {
        title: "Closed Pre-seed",
        desc: "Finalized pre-seed round SAFE notes calculations ($2M at $12M valuation).",
        time: "5 days ago",
      },
      {
        title: "Deployed MVP",
        desc: "Launched Nexus OS Landing Page & sandbox workspace to Vercel.",
        time: "3 weeks ago",
      },
    ],
    accentClass:
      "text-rose-400 border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20",
    buttonAccent:
      "from-rose-400 to-orange-500 shadow-[0_0_20px_rgba(251,113,133,0.3)]",
    badges: ["Tech Founder", "Ecosystem Incubated", "Venture Backed"],
    gradientText: "text-rose-400",
    focusClass: "focus:border-rose-500/50",
    cardHoverClass: "via-rose-400/20",
    progressClass: "[&>div]:from-rose-400 [&>div]:to-orange-500",
    ringColor: "#fb7185",
    glowColor: "rgba(251,113,133,0.35)",
    connectLabel: "Pitch Idea",
    connectIcon: Send,
    roleTag: "FOUNDER",
  },
  investor: {
    name: "Vikram Malhotra",
    role: "Managing Partner, Vanguard Capital",
    avatar: "https://i.pravatar.cc/300?img=59",
    banner:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    about:
      "Early-stage venture investor supporting visionary founders in SaaS, AI Infrastructure, and Developer Tools. Focused on helping pre-seed startups navigate scale from 0 to 1.",
    about2:
      "Managing a portfolio of 12 hyper-growth companies. Always seeking engineers, builders, and researchers who are redefining system architectures.",
    currentRole: "Managing Partner @ Vanguard Capital",
    location: "Delhi NCR, India",
    email: "vikram@vanguard.vc",
    phone: "+91 98888 77777",
    timezone: "IST (UTC +5:30)",
    availability: "Actively Investing",
    skills: [
      "Due Diligence",
      "Venture Capital",
      "Deal Flow Analysis",
      "Financial Modeling",
      "Cap Table Optimization",
      "Go-to-Market",
    ],
    strength: 95,
    stats: [
      { label: "Portfolio", value: "12" },
      { label: "AUM", value: "$45M" },
      { label: "Deals", value: "28" },
      { label: "Exits", value: "3" },
    ],
    socials: [
      { label: "Vanguard VC" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Crunchbase" },
    ],
    activities: [
      {
        title: "Term Sheet Issued",
        desc: "Offered seed investment sheet to an AI infrastructure startup.",
        time: "4 days ago",
      },
      {
        title: "Due Diligence Complete",
        desc: "Completed engineering diligence audit for Nexus OS build.",
        time: "1 week ago",
      },
      {
        title: "LP Meeting",
        desc: "Quarterly portfolio review presented to Lead Institutional Investors.",
        time: "3 weeks ago",
      },
    ],
    accentClass:
      "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20",
    buttonAccent:
      "from-emerald-400 to-teal-500 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    badges: ["GP Investor", "LP Partner", "Angel Network Lead"],
    gradientText: "text-emerald-400",
    focusClass: "focus:border-emerald-500/50",
    cardHoverClass: "via-emerald-400/20",
    progressClass: "[&>div]:from-emerald-400 [&>div]:to-teal-500",
    ringColor: "#34d399",
    glowColor: "rgba(52,211,153,0.35)",
    connectLabel: "Inquire Deal",
    connectIcon: MessageSquare,
    roleTag: "INVESTOR",
  },
  university: {
    name: "Dr. Neeraja Patel",
    role: "Dean of Innovation, Indus Institute of Tech",
    avatar: "https://i.pravatar.cc/300?img=47",
    banner:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    about:
      "Dedicated educator and academic director leading digital transformation, internship pipelines, and corporate partnerships at IIT-Indus.",
    about2:
      "Fostering university incubation programs, curriculum modernization, and research centers. Driven to bridge academic excellence with startup ecosystems.",
    currentRole: "Dean @ Indus Institute of Tech",
    location: "Gandhinagar, Gujarat, India",
    email: "dean.patel@indus.edu",
    phone: "+91 97777 66666",
    timezone: "IST (UTC +5:30)",
    availability: "Scheduling Corporate Visits",
    skills: [
      "Higher Education",
      "Corporate Relations",
      "Placement Strategy",
      "Grant Writing",
      "Curriculum Design",
      "Incubator Setup",
    ],
    strength: 90,
    stats: [
      { label: "Students", value: "4.2K" },
      { label: "Placements", value: "85%" },
      { label: "Partners", value: "32" },
      { label: "Grants", value: "₹15M" },
    ],
    socials: [
      { label: "Indus University" },
      { label: "LinkedIn" },
      { label: "Academic Profile" },
      { label: "ResearchGate" },
    ],
    activities: [
      {
        title: "Placement Drive",
        desc: "Over 85% of computer science students placed in top tech roles.",
        time: "2 days ago",
      },
      {
        title: "Secured Research Grant",
        desc: "Received Government DST Grant of ₹15M for Machine Learning Lab.",
        time: "1 week ago",
      },
      {
        title: "MoU Signed",
        desc: "MoU finalized with Vanguard Capital for incubation partnership.",
        time: "2 weeks ago",
      },
    ],
    accentClass:
      "text-pink-400 border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20",
    buttonAccent:
      "from-pink-400 to-purple-500 shadow-[0_0_20px_rgba(244,114,182,0.3)]",
    badges: ["Academic Dean", "Incubator Lead", "Placement Director"],
    gradientText: "text-pink-400",
    focusClass: "focus:border-pink-500/50",
    cardHoverClass: "via-pink-400/20",
    progressClass: "[&>div]:from-pink-400 [&>div]:to-purple-500",
    ringColor: "#f472b6",
    glowColor: "rgba(244,114,182,0.35)",
    connectLabel: "Partner MoU",
    connectIcon: Building,
    roleTag: "UNIVERSITY",
  },
  expert: {
    name: "Dr. John Chen",
    role: "Senior Technical Advisor & Startup Coach",
    avatar: "https://i.pravatar.cc/300?img=33",
    banner:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    about:
      "Experienced tech executive, coach, and strategist. I help pre-seed and seed-stage startup founders design clean system architectures, growth loops, and prepare for institutional fundraising.",
    about2:
      "Over 15 years of operational experience across FAANG companies. Former engineering director. Active mentor across multiple premium accelerators.",
    currentRole: "Senior Advisor @ Vanguard Catalyst",
    location: "Pune, Maharashtra, India",
    email: "dr.chen@catalyst.io",
    phone: "+91 96666 55555",
    timezone: "IST (UTC +5:30)",
    availability: "Booking Discovery Sessions",
    skills: [
      "System Design",
      "Growth Loops",
      "Developer Relations",
      "Engineering Leadership",
      "Agile Methodologies",
      "SaaS",
    ],
    strength: 92,
    stats: [
      { label: "Clients", value: "64" },
      { label: "Sessions", value: "320" },
      { label: "Rating", value: "4.9" },
      { label: "Years", value: "15+" },
    ],
    socials: [
      { label: "Vanguard Catalyst" },
      { label: "LinkedIn" },
      { label: "Twitter / X" },
      { label: "Medium Blog" },
    ],
    activities: [
      {
        title: "Client Onboarded",
        desc: "Matched and onboarded Nexus OS under startup coaching track.",
        time: "Yesterday",
      },
      {
        title: "Masterclass Complete",
        desc: "Led a virtual workshop on 'Scalable Node Micro-architectures' for 50 founders.",
        time: "3 days ago",
      },
      {
        title: "Review Complete",
        desc: "Approved system design documents check for biotech patent portfolio.",
        time: "1 week ago",
      },
    ],
    accentClass:
      "text-amber-400 border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20",
    buttonAccent:
      "from-amber-400 to-yellow-600 shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    badges: ["Senior Advisory Partner", "GTM Strategist", "Frictionless Coach"],
    gradientText: "text-amber-400",
    focusClass: "focus:border-amber-500/50",
    cardHoverClass: "via-amber-400/20",
    progressClass: "[&>div]:from-amber-400 [&>div]:to-yellow-600",
    ringColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.35)",
    connectLabel: "Book Session",
    connectIcon: Calendar,
    roleTag: "EXPERT",
  },
  admin: {
    name: "Root System Admin",
    role: "Principal Infrastructure Administrator",
    avatar: "https://i.pravatar.cc/300?img=60",
    banner:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
    about:
      "Managing ecosystem backend logs, user roles verification database, rewards distribution ledgers, and portal analytics security audit panels.",
    about2:
      "Maintaining maximum system availability, database replication nodes performance, API gateway rate-limit optimization, and support desks.",
    currentRole: "Chief Infrastructure Architect",
    location: "Remote",
    email: "admin@professionalhome.org",
    phone: "+91 95555 44444",
    timezone: "GMT (UTC +0:00)",
    availability: "Always Online",
    skills: [
      "Kubernetes",
      "Docker",
      "Network Security",
      "Database Administration",
      "Systems Architecture",
      "API Gateways",
      "Linux",
    ],
    strength: 100,
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Nodes", value: "48" },
      { label: "Tickets", value: "12" },
      { label: "Audits", value: "100%" },
    ],
    socials: [
      { label: "Internal Panel" },
      { label: "GitHub Admin" },
      { label: "Security Keys" },
      { label: "Network Logs" },
    ],
    activities: [
      {
        title: "SSL Renewed",
        desc: "Successfully verified and renewed security gateway certificates.",
        time: "12 hours ago",
      },
      {
        title: "Optimized Database",
        desc: "Re-indexed users database nodes to reduce query latency by 35%.",
        time: "1 day ago",
      },
      {
        title: "Audit Complete",
        desc: "Completed security audit for the rewards transaction ledger.",
        time: "3 days ago",
      },
    ],
    accentClass:
      "text-red-400 border-red-500/20 bg-red-500/10 hover:bg-red-500/20",
    buttonAccent:
      "from-red-500 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    badges: ["Root Access", "Security Operations", "Systems Health"],
    gradientText: "text-red-400",
    focusClass: "focus:border-red-500/50",
    cardHoverClass: "via-red-400/20",
    progressClass: "[&>div]:from-red-500 [&>div]:to-rose-600",
    ringColor: "#ef4444",
    glowColor: "rgba(239,68,68,0.35)",
    connectLabel: "Diagnostics",
    connectIcon: ShieldCheck,
    roleTag: "ADMIN",
  },
};
