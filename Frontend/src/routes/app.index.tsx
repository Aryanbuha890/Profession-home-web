import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Page, Card, Bar, Stat } from "@/components/app/Page";
import { useRole, Role } from "@/hooks/useRole";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Brain,
  Map,
  Users,
  Compass,
  Briefcase,
  Bot,
  Award,
  Ticket,
  ChevronRight,
  Plus,
  Flame,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  Lock,
  Download,
  Share2,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw,
  BookOpen,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ChevronUp,
  GraduationCap,
  Coins,
  Settings,
  ScrollText,
  Send,
  Trash2,
  Check,
  Info,
  ArrowRight,
  Activity,
  FileSpreadsheet,
  Layers,
  Unlock,
  MessageSquare,
  Eye,
  CheckSquare,
  X,
} from "lucide-react";


export const Route = createFileRoute("/app/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "home",
    };
  },
  head: () => ({ meta: [{ title: "Command Center — Professional Home" }] }),
  component: DashboardSelector,
});

function DashboardSelector() {
  const { role } = useRole();
  const search = Route.useSearch();
  const currentTab = search.tab || "home";

  switch (role) {
    case "student":
      return <StudentDashboard currentTab={currentTab} />;
    case "researcher":
      return <ResearcherDashboard currentTab={currentTab} />;
    case "founder":
      return <FounderDashboard currentTab={currentTab} />;
    case "investor":
      return <InvestorDashboard currentTab={currentTab} />;
    case "university":
      return <UniversityDashboard currentTab={currentTab} />;
    case "expert":
      return <ExpertDashboard currentTab={currentTab} />;
    case "admin":
      return <AdminDashboard currentTab={currentTab} />;
    default:
      return <StudentDashboard currentTab={currentTab} />;
  }
}

// -------------------------------------------------------------
// HELPER COMPONENTS & DATA
// -------------------------------------------------------------

function HolographicTicket({
  title,
  subtitle,
  type,
  admitNo,
  validUntil,
  gradient,
  accentColor,
}: {
  title: string;
  subtitle: string;
  type: string;
  admitNo: string;
  validUntil: string;
  gradient: string;
  accentColor: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="ticket-wrapper cursor-pointer select-none"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.1s ease-out",
        fontSize: "12px",
      }}
    >
      <div className="ticket" style={{ border: `1.5px solid ${accentColor}40` }}>
        <div
          className="t-main"
          style={{
            background: `radial-gradient(circle at bottom left, transparent 1em, #0c0f24 1.05em), radial-gradient(circle at bottom right, transparent 1em, #0c0f24 1.05em)`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at ${tilt.x * 200 + 50}% ${tilt.y * 200 + 50}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            }}
          />
          <div className="t-content">
            <div className="t-header">
              <div className="t-logo">
                <Ticket className="h-4.5 w-4.5" style={{ color: accentColor }} />
                <span className="text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                  Growth Ticket
                </span>
              </div>
              <span
                className="t-type"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: `${accentColor}10`,
                }}
              >
                {type}
              </span>
            </div>
            <h4 className="text-base font-black text-white leading-tight uppercase tracking-tight mt-3 mb-1.5 font-display">
              {title}
            </h4>
            <p className="text-[10px] text-muted-foreground leading-normal mb-4">
              {subtitle}
            </p>
            <div className="t-details">
              <div className="t-detail-item">
                <span className="t-label">ADMIT PASS</span>
                <span className="t-value text-white font-mono text-xs">{admitNo}</span>
              </div>
              <div className="t-detail-item">
                <span className="t-label">VALID THRU</span>
                <span className="t-value text-white font-mono text-xs">{validUntil}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="t-perforation">
          <div className="t-perf-line" style={{ borderTop: "2.5px dashed rgba(255,255,255,0.1)" }} />
        </div>
        <div
          className="t-stub"
          style={{
            background: `radial-gradient(circle at top left, transparent 1em, #090a16 1.05em), radial-gradient(circle at top right, transparent 1em, #090a16 1.05em)`,
          }}
        >
          <div className="t-barcode-container">
            <div className="t-barcode" style={{ filter: "invert(1) opacity(0.5)" }} />
            <div className="t-barcode-id">PH-{admitNo.split("-")[1] || admitNo}</div>
          </div>
          <div className="t-admit">
            <span className="t-admit-text">ROLE ZONE</span>
            <span className="t-admit-num" style={{ color: accentColor }}>
              S4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CelebrationModal({
  isOpen,
  onClose,
  level,
  rewardTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  rewardTitle: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 360,
                  x: `calc(${Math.random() * window.innerWidth}px + ${Math.sin(i) * 50}px)`,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ["#38bdf8", "#8b5cf6", "#f43f5e", "#10b981", "#fbbf24"][
                    i % 5
                  ],
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-slate-900/90 text-center shadow-shadow-glow backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-slate-950 font-bold text-2xl shadow-xl">
                🚀
              </div>
              <h2 className="text-3xl font-black text-white mt-5 tracking-tight uppercase font-display">
                Level Completed!
              </h2>
              <p className="text-sky-400 font-mono text-sm mt-1 uppercase tracking-wider font-semibold">
                You reached Level {level}
              </p>
              <div className="my-6 py-4 px-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
                  Unlocked Reward Pass
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {rewardTitle}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold">
                  ✓ Saved to your Reward Center
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-950 shadow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Claim Reward & Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// -------------------------------------------------------------
// FLAGSHIP STUDENT DASHBOARD (SGOS)
// -------------------------------------------------------------

function StudentDashboard({ currentTab }: { currentTab: string }) {
  const [successScore, setSuccessScore] = useState(86);
  const [xp, setXp] = useState(780);
  const [level, setLevel] = useState(4);
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Complete Portfolio",
      desc: "Upload 3 verified projects and hook up GitHub.",
      difficulty: "Medium",
      reward: 250,
      progress: 75,
      deadline: "2 days left",
      tag: "Project",
    },
    {
      id: 2,
      title: "Build AI Project",
      desc: "Implement semantic search with vector embeds.",
      difficulty: "Hard",
      reward: 500,
      progress: 20,
      deadline: "5 days left",
      tag: "Code",
    },
    {
      id: 3,
      title: "Apply To 20 Internships",
      desc: "Submit optimized resumes through matchmaker.",
      difficulty: "Hard",
      reward: 400,
      progress: 60,
      deadline: "10 days left",
      tag: "Career",
    },
    {
      id: 4,
      title: "Attend Expert Session",
      desc: "Complete 1-on-1 discovery session w/ Dr. Chen.",
      difficulty: "Easy",
      reward: 100,
      progress: 0,
      deadline: "Today",
      tag: "Mentor",
    },
  ]);

  const [streakCount, setStreakCount] = useState(12);
  const [claimedStreakToday, setClaimedStreakToday] = useState(false);
  const [techSkill, setTechSkill] = useState(82);
  const [designSkill, setDesignSkill] = useState(74);
  const [commsSkill, setCommsSkill] = useState(88);
  const [researchSkill, setResearchSkill] = useState(70);

  useEffect(() => {
    const avg = Math.round((techSkill + designSkill + commsSkill + researchSkill) / 4);
    setSuccessScore(avg + 6);
  }, [techSkill, designSkill, commsSkill, researchSkill]);

  const [projectsList, setProjectsList] = useState([
    {
      name: "SmartDoc AI Parser",
      lang: "TypeScript · Python",
      progress: 88,
      status: "Analyzing",
      github: "github.com/aryan/smartdoc-ai",
    },
    {
      name: "Cognitive Vector Search",
      lang: "Rust · PyTorch",
      progress: 42,
      status: "Active Ideation",
      github: "github.com/aryan/cog-search",
    },
  ]);
  const [newProjName, setNewProjName] = useState("");
  const handleAddProject = () => {
    if (!newProjName.trim()) return;
    setProjectsList((prev) => [
      ...prev,
      {
        name: newProjName,
        lang: "React · Node",
        progress: 10,
        status: "Active Ideation",
        github: `github.com/aryan/${newProjName.toLowerCase().replace(/\s+/g, "-")}`,
      },
    ]);
    setNewProjName("");
  };

  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [lastReward, setLastReward] = useState("");

  const handleCompleteMission = (id: number, title: string, xpReward: number) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, progress: 100 } : m))
    );
    setTimeout(() => {
      const nextXp = xp + xpReward;
      if (nextXp >= 1000) {
        setXp(nextXp - 1000);
        setLevel((l) => l + 1);
        setLastReward(
          id === 1
            ? "Resume Review Session Pass"
            : id === 2
              ? "Premium Platform Pass"
              : "Mock Technical Interview Pass"
        );
        setCelebrationOpen(true);
      } else {
        setXp(nextXp);
      }
      setMissions((prev) => prev.filter((m) => m.id !== id));
    }, 400);
  };

  const [leetCodeSnippet, setLeetCodeSnippet] = useState(
    `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass`
  );
  const [verificationResult, setVerificationResult] = useState<
    "idle" | "running" | "success" | "failed"
  >("idle");

  const runCodeVerification = () => {
    setVerificationResult("running");
    setTimeout(() => {
      if (leetCodeSnippet.includes("dict") || leetCodeSnippet.includes("map")) {
        setVerificationResult("success");
      } else {
        setVerificationResult("failed");
      }
    }, 1200);
  };

  return (
    <>
      <CelebrationModal
        isOpen={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        level={level}
        rewardTitle={lastReward}
      />

      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Career Mission Control" subtitle="Your personalized student operating center.">
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-white/[0.03] to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-sky-400 bg-sky-400/10 px-2.5 py-0.5 rounded-full">
                Operating System Overview
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Good Morning Aryan 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-md">
                You are performing ahead of 88% of applicants in the Bangalore Tech Corridor.
                Complete 1 more mission today to secure your streak bonus.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  onClick={() => setXp((prev) => prev + 100)}
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white/90 hover:bg-white/[0.08] transition cursor-pointer"
                >
                  <Flame className="h-3.5 w-3.5 text-orange-400" /> +100 XP Spark
                </button>
                <button
                  onClick={() => {
                    setLevel(level + 1);
                    setLastReward("VIP Expert Session Voucher");
                    setCelebrationOpen(true);
                  }}
                  className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 text-xs font-bold text-slate-950 shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Simulate Level Up
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative overflow-hidden">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Current Level Profile
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-slate-950 font-black text-lg">
                  L{level}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-mono text-white/70 mb-1">
                    <span>Rank #12 Arena</span>
                    <span>{xp}/1000 XP</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${(xp / 1000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>Career Success Score</span>
                <span className="text-sky-400 font-semibold">Excellent</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <defs>
                      <linearGradient id="score-grad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="url(#score-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset={100 - successScore}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-white leading-none">{successScore}</span>
                    <span className="text-[7px] text-muted-foreground uppercase mt-0.5">/100</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  {[
                    { label: "Technical Skills", pct: techSkill, color: "from-sky-400 to-indigo-500" },
                    { label: "Comms & Soft", pct: commsSkill, color: "from-indigo-400 to-purple-500" },
                    { label: "Credentials", pct: researchSkill, color: "from-violet-400 to-fuchsia-500" },
                  ].map((sub) => (
                    <div key={sub.label} className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[8px] text-muted-foreground leading-none">
                        <span>{sub.label}</span>
                        <span className="font-mono text-white/80">{sub.pct}%</span>
                      </div>
                      <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${sub.color} rounded-full`}
                          style={{ width: `${sub.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Motivator Streak</span>
                <span className="rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] px-1.5 py-0.5 font-semibold flex items-center gap-1 font-mono">
                  🔥 Active
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-white tracking-tight">{streakCount}</span>
                <span className="text-xs text-orange-400 font-bold">Days Daily Streak</span>
              </div>
              <button
                onClick={() => {
                  if (!claimedStreakToday) {
                    setStreakCount((s) => s + 1);
                    setClaimedStreakToday(true);
                  }
                }}
                disabled={claimedStreakToday}
                className={`mt-3 w-full py-1.5 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1.5 ${
                  claimedStreakToday
                    ? "bg-white/5 border border-white/5 text-muted-foreground cursor-not-allowed"
                    : "bg-orange-500/25 border border-orange-500/20 text-orange-400 hover:bg-orange-500/35 cursor-pointer"
                }`}
              >
                <Flame className="h-3 w-3" />
                {claimedStreakToday ? "Streak Claimed Today" : "Claim Daily Streak +15 XP"}
              </button>
            </Card>

            <Card className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Match Opportunities</span>
                <span className="rounded bg-sky-500/15 border border-sky-500/20 text-sky-400 text-[9px] px-1.5 py-0.5 font-medium font-mono">
                  3 AI matches
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-white tracking-tight">22</span>
                <span className="text-[10px] text-muted-foreground font-mono">applications tracked</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[9px] bg-sky-500/10 border border-sky-500/20 rounded px-1.5 py-0.5 text-sky-400 font-semibold font-mono">
                  OpenAI: 98%
                </span>
                <span className="text-[9px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white/70">
                  Anthropic: 92%
                </span>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Next Milestone Reward</span>
                <span className="rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[9px] px-1.5 py-0.5 font-medium font-mono">
                  Level 5
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-xs font-semibold text-white truncate">Mock Technical Interview Pass</span>
              </div>
              <div className="mt-3 text-[9px] text-indigo-300 flex items-center gap-1 font-medium bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-2.5 py-1.5 w-full justify-center">
                <Ticket className="h-3 w-3 shrink-0" />
                <span className="truncate">Claim at 1,000 XP threshold</span>
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-black text-white tracking-tight uppercase mb-3.5 font-display">
              Active Missions
            </h3>
            {missions.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 text-center text-xs text-muted-foreground">
                🎉 All active missions completed! You are ready to Level Up.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {missions.map((m) => (
                  <Card key={m.id} className="flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-semibold uppercase text-muted-foreground">
                          {m.tag}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                            m.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : m.difficulty === "Medium"
                                ? "bg-sky-500/10 text-sky-400"
                                : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {m.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-2 leading-snug font-display">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        {m.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-1 leading-none">
                        <span>XP: +{m.reward}</span>
                        <span>{m.progress}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-3.5">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-300"
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                      <button
                        onClick={() => handleCompleteMission(m.id, m.title, m.reward)}
                        className="w-full py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-bold text-white transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="h-3 w-3 text-sky-400" /> Mark Complete
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-base font-black text-white tracking-tight uppercase mb-3.5 font-display">
              Ecosystem Hubs
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="flex flex-col justify-between border-[#DFFF00]/30 hover:border-[#DFFF00]/60 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Premium Business Dashboard</h3>
                  <p className="text-sm text-white/60 mb-4">View advanced business analytics, sales charts, and customer traffic data.</p>
                </div>
                <Link to="/app/business" className="flex items-center justify-center gap-2 bg-[#DFFF00]/10 text-[#DFFF00] py-3 rounded-xl font-bold hover:bg-[#DFFF00]/20 transition-colors">
                  Open Business Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
              <Card className="flex flex-col justify-between border-rose-500/30 hover:border-rose-500/60 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Startup Hub</h3>
                  <p className="text-sm text-white/60 mb-4">Manage fundraising, milestones, runway, and access the mentor network.</p>
                </div>
                <Link to="/app/startup" className="flex items-center justify-center gap-2 bg-rose-500/20 text-rose-400 py-3 rounded-xl font-bold hover:bg-rose-500/30 transition-colors">
                  Open Startup Hub <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </Page>
      )}

      {/* TAB: ARENA */}
      {currentTab === "arena" && (
        <Page title="Career Growth Arena" subtitle="Navigate your developmental districts in the career city map.">
          <div className="grid gap-6 md:grid-cols-5 mt-4">
            {[
              {
                id: "foundation",
                name: "Foundation District",
                desc: "Establish your core domain knowledge, master fundamentals, and define targets.",
                progress: 92,
                status: "Completed",
                icon: GraduationCap,
                gradient: "from-sky-400 to-blue-500",
              },
              {
                id: "skills",
                name: "Skills District",
                desc: "Dive deep into technologies, build algorithmic strength, and learn advanced toolsets.",
                progress: 78,
                status: "In Progress",
                icon: Brain,
                gradient: "from-blue-400 to-indigo-500",
              },
              {
                id: "project",
                name: "Project District",
                desc: "Build real-world proof of capability. Complete repositories, deploy systems, and write tests.",
                progress: 60,
                status: "In Progress",
                icon: Compass,
                gradient: "from-indigo-400 to-purple-500",
              },
              {
                id: "interview",
                name: "Interview District",
                desc: "Polish behavioral matrices, practice mock system designs, and rehearse whiteboard code.",
                progress: 10,
                status: "Locked",
                icon: Lock,
                gradient: "from-purple-400 to-fuchsia-500",
              },
              {
                id: "career",
                name: "Career District",
                desc: "Deploy customized match models, schedule interviews, and negotiate placements.",
                progress: 0,
                status: "Locked",
                icon: Lock,
                gradient: "from-fuchsia-400 to-rose-500",
              },
            ].map((d) => {
              const IconComp = d.icon;
              const isLocked = d.status === "Locked";
              return (
                <Card
                  key={d.id}
                  className={`flex flex-col justify-between border transition-all duration-300 relative group overflow-hidden ${
                    isLocked
                      ? "border-white/5 opacity-55 hover:opacity-75"
                      : "border-white/10 hover:border-sky-400/30 hover:shadow-2xl"
                  }`}
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/[0.01] pointer-events-none" />
                  {!isLocked && (
                    <span className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${d.gradient}`} />
                  )}
                  <div>
                    <div className="flex justify-between items-center">
                      <div className={`p-2 rounded-xl bg-white/5 ${isLocked ? "text-muted-foreground" : "text-sky-400"}`}>
                        <IconComp className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-[9px] font-mono font-semibold uppercase text-muted-foreground">
                        {d.status}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mt-4 tracking-tight leading-snug font-display">
                      {d.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-1 leading-none">
                      <span>Progress</span>
                      <span>{d.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${d.gradient} rounded-full`}
                        style={{ width: `${d.progress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Page>
      )}

      {/* TAB: CHALLENGES */}
      {currentTab === "challenges" && (
        <Page title="Arena Challenges" subtitle="Tackle daily career tasks, build consistency, and stack XP.">
          <div className="grid gap-6 md:grid-cols-3 mt-4">
            <Card className="md:col-span-2">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase flex items-center gap-1.5 mb-4 font-display">
                <Flame className="h-4.5 w-4.5 text-orange-400" /> Weekly Streak Calendar
              </h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                {[
                  { d: "Mon", done: true },
                  { d: "Tue", done: true },
                  { d: "Wed", done: true },
                  { d: "Thu", done: true },
                  { d: "Fri", done: true, today: true },
                  { d: "Sat", done: false },
                  { d: "Sun", done: false },
                ].map((day) => (
                  <div key={day.d} className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
                    <div className="text-[10px] text-muted-foreground font-mono">{day.d}</div>
                    <div className="mt-2 flex items-center justify-center">
                      {day.done ? (
                        <Flame className="h-5 w-5 text-orange-400 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-white/10 bg-slate-900" />
                      )}
                    </div>
                    {day.today && (
                      <span className="text-[8px] text-sky-400 font-bold uppercase font-mono mt-1 block">
                        Today
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-1 font-display">
                  Consistency Rewards
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-normal">
                  Maintain a 15-day streak to claim a premium <strong>Resume Review Voucher</strong>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1 leading-none">
                  <span>Progress (12/15)</span>
                  <span>80%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ASSESSMENT */}
      {currentTab === "assessment" && (
        <Page title="AI Assessment" subtitle="Perform diagnostic skill audits and verify algorithmic strength.">
          <div className="grid gap-6 md:grid-cols-3 mt-4">
            <Card className="md:col-span-1">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
                Adjust Competencies
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-1.5">
                    <span>Technical Logic</span>
                    <span>{techSkill}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={techSkill}
                    onChange={(e) => setTechSkill(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-1.5">
                    <span>System Architecture</span>
                    <span>{designSkill}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={designSkill}
                    onChange={(e) => setDesignSkill(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>
              </div>
            </Card>
            <Card className="md:col-span-2">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
                LeetCode Code Sandbox Verifier
              </h3>
              <textarea
                rows={4}
                value={leetCodeSnippet}
                onChange={(e) => setLeetCodeSnippet(e.target.value)}
                className="w-full bg-slate-950 font-mono text-xs text-emerald-400 p-4 rounded-xl border border-white/10 outline-none focus:border-sky-400"
              />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={runCodeVerification}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer"
                >
                  Verify Solution
                </button>
                {verificationResult === "running" && <span className="text-xs text-sky-400 font-mono self-center">Running...</span>}
                {verificationResult === "success" && <span className="text-xs text-emerald-400 font-mono self-center">✓ Verified!</span>}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ROADMAP */}
      {currentTab === "roadmap" && (
        <Page title="Career Roadmap" subtitle="Explore your phase-by-phase target schedules.">
          <Card>
            <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
              Target Timelines
            </h3>
            <div className="space-y-4">
              {["Phase 1: Basic Credential Building", "Phase 2: Project Workspaces Configuration", "Phase 3: Direct Incubation Drives"].map((p, idx) => (
                <div key={idx} className="flex gap-4 items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="h-6 w-6 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-xs">{idx + 1}</span>
                  <div className="text-sm text-white font-medium">{p}</div>
                </div>
              ))}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: SKILLS */}
      {currentTab === "skills" && (
        <Page title="Skill Builder" subtitle="Review target competency markers.">
          <div className="grid gap-4 md:grid-cols-3">
            {["System Engineering", "Database Scaling", "ML Optimization"].map((s, idx) => (
              <Card key={idx}>
                <div className="text-xs text-muted-foreground uppercase font-mono">Competence</div>
                <h4 className="text-sm font-bold text-white mt-1.5 font-display">{s}</h4>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" style={{ width: `${60 + idx * 10}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: PROJECTS */}
      {currentTab === "projects" && (
        <Page title="Projects Vault" subtitle="Track capstone repos and code environments.">
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="New Project Name..."
              value={newProjName}
              onChange={(e) => setNewProjName(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-sky-400/50"
            />
            <button onClick={handleAddProject} className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer">
              Add Project
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projectsList.map((p, idx) => (
              <Card key={idx}>
                <h4 className="text-sm font-bold text-white font-display">{p.name}</h4>
                <div className="text-xs text-sky-400 font-mono mt-1">{p.github}</div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: INTERNSHIPS & JOBS */}
      {(currentTab === "internships" || currentTab === "jobs") && (
        <Page title="Placement Opportunities" subtitle="Review matching parameters.">
          <div className="space-y-3">
            {[{ role: "ML Intern", co: "OpenAI", match: 98 }, { role: "Research Assistant", co: "Anthropic", match: 92 }].map((job) => (
              <Card key={job.role} className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{job.role}</h4>
                  <p className="text-xs text-muted-foreground">{job.co} · Full Time</p>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400">{job.match}% Compatibility</span>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: MENTORS */}
      {currentTab === "mentors" && (
        <Page title="Advisors Hub" subtitle="Interact with verified industry coaches.">
          <div className="grid gap-4 md:grid-cols-2">
            {["Dr. Helena Chen", "Marco Rossi"].map((m) => (
              <Card key={m} className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{m}</h4>
                  <p className="text-xs text-muted-foreground">Advisory Committee</p>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 text-[10px] font-bold cursor-pointer">Book Slot</button>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: AI COPILOT */}
      {currentTab === "copilot" && (
        <Page title="AI Copilot" subtitle="Interactive contextual help suite.">
          <Card className="p-6 text-center max-w-md mx-auto">
            <Bot className="h-8 w-8 text-sky-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white font-display">Always-On Agent</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Use the floating orb in the bottom-right corner to start typing questions immediately.
            </p>
          </Card>
        </Page>
      )}

      {/* TAB: REWARDS */}
      {currentTab === "rewards" && (
        <Page title="Reward Passes" subtitle="Apple Wallet styled holographic passes.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <HolographicTicket
              title="Expert Advisory Pass"
              subtitle="Unlock 1-on-1 consultation slot w/ verified architects"
              type="VOUCHER PASS"
              admitNo="VCH-9824"
              validUntil="Jul 30, 2026"
              gradient="from-amber-400 via-orange-400 to-yellow-500"
              accentColor="#fbbf24"
            />
            <HolographicTicket
              title="Resume Review Pass"
              subtitle="Full review checklist & AI formatting validator"
              type="VIP PASS"
              admitNo="VIP-RES-119"
              validUntil="Aug 15, 2026"
              gradient="from-violet-400 via-purple-400 to-fuchsia-500"
              accentColor="#a78bfa"
            />
          </div>
        </Page>
      )}

      {/* FALLBACK TABS */}
      {["achievements", "community", "profile"].includes(currentTab) && (
        <Page title={currentTab.toUpperCase()} subtitle="Profile settings and digital logs.">
          <Card className="p-6">
            <div className="text-sm text-white font-bold mb-2">Aryan Buha</div>
            <p className="text-xs text-muted-foreground">Ecosystem verified candidate logs.</p>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// RESEARCHER DASHBOARD
// -------------------------------------------------------------

function ResearcherDashboard({ currentTab }: { currentTab: string }) {
  // LaTeX Abstract AI Optimizer states
  const [latexInput, setLatexInput] = useState(
    `\\begin{abstract}\nThis paper introduces a novel ML architecture utilizing sparse graph nodes to optimize parsing efficiency...\n\\end{abstract}`
  );
  const [latexOutput, setLatexOutput] = useState("");
  const [optimizingLatex, setOptimizingLatex] = useState(false);

  const runLatexOptimizer = () => {
    setOptimizingLatex(true);
    setTimeout(() => {
      setLatexOutput(
        `\\begin{abstract}\nWe present a state-of-the-art sparse graph representation parser. Our methodology improves citation indexing speeds by 42% while retaining high-fidelity compilation accuracy under tight memory constraints.\n\\end{abstract}`
      );
      setOptimizingLatex(false);
    }, 1200);
  };

  // Co-author Matcher states
  const [scholar1, setScholar1] = useState("Dr. Helena Chen");
  const [scholar2, setScholar2] = useState("Dr. Aryan Buha");
  const [matchingScore, setMatchingScore] = useState<number | null>(null);

  const calculateMatching = () => {
    if (scholar1 === scholar2) {
      setMatchingScore(100);
      return;
    }
    const score = Math.round(70 + Math.random() * 28);
    setMatchingScore(score);
  };

  // Patent draft sequences uploader
  const [patents, setPatents] = useState([
    { title: "Sparse Graph Node Compression Method", stage: "Patent Filing", progress: 80 },
    { title: "Distributed Vector Parsing Architecture", stage: "Research Validation", progress: 40 },
  ]);
  const [newPatentTitle, setNewPatentTitle] = useState("");
  const handleAddPatent = () => {
    if (!newPatentTitle.trim()) return;
    setPatents((prev) => [
      ...prev,
      { title: newPatentTitle, stage: "Idea Submission", progress: 10 },
    ]);
    setNewPatentTitle("");
  };

  // Research sprint task board
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review literature matrix on graph embeddings", column: "todo" },
    { id: 2, title: "Draft experiment models using PyTorch API", column: "progress" },
    { id: 3, title: "Submit Horizon grant report draft", column: "done" },
  ]);

  const moveTask = (id: number, nextCol: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: nextCol } : t)));
  };

  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Research Command Center" subtitle="Manage publications, collaboration metrics, and patents.">
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-white/[0.03] to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-violet-400 bg-violet-400/10 px-2.5 py-0.5 rounded-full">
                PI Command Suite
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Welcome Dr. Aryan 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                You are currently ranked in the top 5% of ML researchers in your department.
                Your citations increased by 14% this month.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl relative overflow-hidden">
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    strokeDashoffset="6"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-white leading-none">94</span>
                  <span className="text-[6px] text-muted-foreground uppercase mt-0.5">Impact</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Stage: Exp Validation</div>
                <div className="text-[10px] text-violet-400 font-mono mt-0.5">Rank #8 Citations</div>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative overflow-hidden">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Current Startup Stage
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-orange-500 text-slate-950 font-black text-xs uppercase text-center font-display leading-tight">
                  MVP<br />BUILD
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Stage 3 of 7: MVP</div>
                  <div className="text-[10px] text-rose-400 font-mono mt-0.5">Pre-Seed Track active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dials grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <div className="text-[10px] text-muted-foreground font-mono mt-1.5">428 total citations</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono">Active Patents</div>
              <div className="text-2xl font-black text-white mt-1">2 filing sequences</div>
              <div className="text-[10px] text-violet-400 font-mono mt-1.5">1 pending examination</div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: RESEARCH ARENA (GALAXY) */}
      {currentTab === "research_arena" && (
        <Page title="Research Arena (Galaxy)" subtitle="Explore academic targets inside the visual research galaxy.">
          <ResearchGalaxyCanvas />
        </Page>
      )}

      {/* TAB: RESEARCH PROJECTS */}
      {currentTab === "research_projects" && (
        <Page title="Research Projects" subtitle="Track and configure your active research papers.">
          <Card>
            <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
              Literature Workspace Projects
            </h3>
            <div className="space-y-4">
              {[
                { title: "Deep Optimization with Sparse Graph Nets", rate: "ML & Logic", progress: 84 },
                { title: "Multi-Agent Matrix for Solar Grids", rate: "Methodology Stack", progress: 52 },
              ].map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white font-display">{p.title}</h4>
                    <span className="text-[10px] text-violet-400 font-semibold font-mono">{p.rate}</span>
                  </div>
                  <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: COLLABORATORS */}
      {currentTab === "collaborators" && (
        <Page title="Collaboration Hub" subtitle="Find academic co-authors and configure compatibility ratios.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
                AI Compatibility Matcher
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Scholar Node 1</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white"
                    value={scholar1}
                    onChange={(e) => setScholar1(e.target.value)}
                  >
                    <option>Dr. Helena Chen</option>
                    <option>Dr. Aryan Buha</option>
                    <option>Prof. Adeyemi</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Scholar Node 2</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white"
                    value={scholar2}
                    onChange={(e) => setScholar2(e.target.value)}
                  >
                    <option>Dr. Aryan Buha</option>
                    <option>Dr. Helena Chen</option>
                    <option>Prof. Adeyemi</option>
                  </select>
                </div>
                <button
                  onClick={calculateMatching}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-400 to-indigo-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer"
                >
                  Analyze Link Ratios
                </button>
              </div>
            </Card>

            <Card className="md:col-span-2 flex flex-col justify-center items-center text-center">
              {matchingScore === null ? (
                <div className="text-xs text-muted-foreground">Select scholar co-authors to calculate compatibility matrix.</div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl font-black text-violet-400 font-display">{matchingScore}%</div>
                  <div className="text-sm text-white font-bold">Domain Similarity Compatibility</div>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    AI matched co-author score based on citation references, publications, and target NSF research area overlaps.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: PUBLICATIONS */}
      {currentTab === "publications" && (
        <Page title="Publication Center" subtitle="Draft manuscripts and use LaTeX abstract text optimizers.">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-2 font-display">
                LaTeX Abstract Editor
              </h3>
              <textarea
                rows={6}
                value={latexInput}
                onChange={(e) => setLatexInput(e.target.value)}
                className="w-full bg-slate-950 font-mono text-xs text-violet-400 p-4 rounded-xl border border-white/10 outline-none focus:border-violet-400"
              />
              <button
                onClick={runLatexOptimizer}
                disabled={optimizingLatex}
                className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-400 to-indigo-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer"
              >
                {optimizingLatex ? "Optimizing..." : "Optimize Abstract"}
              </button>
            </Card>

            <Card className="flex flex-col justify-center bg-slate-950/60 p-4 rounded-xl border border-white/5">
              <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider mb-2">
                Optimized LaTeX Output
              </div>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-emerald-400 border border-white/5 min-h-[120px] select-text">
                {latexOutput || "% Click optimize to output clean LaTeX abstract..."}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: GRANTS */}
      {currentTab === "grants" && (
        <Page title="Grant Center" subtitle="Review available fellowship scopes and calculate success parameters.">
          <Card className="max-w-md mx-auto">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4 font-display">
              RFP Grant Success Probability
            </h3>
            <div className="space-y-3.5 text-xs text-white/80">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>NSF Fellowship (AI Core Research)</span>
                <span className="text-emerald-400 font-mono font-semibold">92% Match</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Horizon Europe (Sparse Graph Networks)</span>
                <span className="text-sky-400 font-mono font-semibold">74% Match</span>
              </div>
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: PATENTS */}
      {currentTab === "patents" && (
        <Page title="Patent Center" subtitle="Track filed sequences and validation steps.">
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Patent Title..."
              value={newPatentTitle}
              onChange={(e) => setNewPatentTitle(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none"
            />
            <button onClick={handleAddPatent} className="rounded-xl bg-gradient-to-r from-violet-400 to-indigo-500 px-4 py-2 text-xs font-bold text-slate-950 cursor-pointer">
              File Draft
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {patents.map((pat) => (
              <Card key={pat.title}>
                <h4 className="text-sm font-bold text-white font-display">{pat.title}</h4>
                <div className="text-[10px] text-violet-400 font-mono mt-1">{pat.stage}</div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full" style={{ width: `${pat.progress}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: RESEARCH TASKS */}
      {currentTab === "research_tasks" && (
        <Page title="Research Tasks" subtitle="Agile Scrum Task Board for experiment iterations.">
          <div className="grid gap-4 md:grid-cols-3">
            {["todo", "progress", "done"].map((col) => (
              <Card key={col} className="bg-slate-950/40 p-4 border border-white/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">{col}</h3>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.column === col)
                    .map((t) => (
                      <div key={t.id} className="p-3 bg-slate-900/90 border border-white/5 rounded-lg text-xs">
                        <div className="text-white/90">{t.title}</div>
                        <div className="mt-2 flex gap-1.5 justify-end">
                          {col !== "todo" && (
                            <button
                              onClick={() => moveTask(t.id, col === "progress" ? "todo" : "progress")}
                              className="text-[9px] text-muted-foreground hover:text-white"
                            >
                              ◀ Back
                            </button>
                          )}
                          {col !== "done" && (
                            <button
                              onClick={() => moveTask(t.id, col === "todo" ? "progress" : "done")}
                              className="text-[9px] text-violet-400 hover:text-white font-semibold"
                            >
                              Move ▶
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: DOCUMENT INTELLIGENCE */}
      {currentTab === "docs" && (
        <Page title="Document Intelligence" subtitle="Chat with datasets, extract citations automatically.">
          <Card className="max-w-md mx-auto p-6 text-center">
            <FileText className="h-8 w-8 text-violet-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white font-display">Citation Parser</h4>
            <div className="mt-3 p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
              <span className="text-xs text-muted-foreground">Drag PDFs, research papers, or datasets here</span>
            </div>
          </Card>
        </Page>
      )}

      {/* FALLBACK TABS */}
      {["research_roadmap", "research_copilot", "achievements", "community", "events", "profile"].includes(currentTab) && (
        <Page title={currentTab.toUpperCase()} subtitle="Academic credentials and citation metrics logs.">
          <Card className="p-6">
            <div className="text-sm text-white font-bold mb-2">Dr. Aryan Buha</div>
            <p className="text-xs text-muted-foreground">Ecosystem verified academic logs.</p>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// STARTUP DASHBOARD - FOUNDER OS
// -------------------------------------------------------------

function FounderDashboard({ currentTab }: { currentTab: string }) {
  // Pre-seed SAFE note calculator states
  const [preMoneyVal, setPreMoneyVal] = useState(12000000);
  const [investmentAmt, setInvestmentAmt] = useState(2000000);
  const [dilution, setDilution] = useState(0);

  const calculateSAFE = () => {
    const totalVal = Number(preMoneyVal) + Number(investmentAmt);
    const dilutionPct = Math.round((Number(investmentAmt) / totalVal) * 100);
    setDilution(dilutionPct);
  };

  // Sprint Kanban board
  const [founderTasks, setFounderTasks] = useState([
    { id: 1, title: "Review incorporation Delaware charter docs", column: "todo", category: "Legal" },
    { id: 2, title: "Draft pre-seed deck slides w/ metrics", column: "progress", category: "Fundraising" },
    { id: 3, title: "Design MVP user onboarding funnel", column: "progress", category: "Product" },
    { id: 4, title: "Deploy initial Landing Page to Vercel", column: "done", category: "Engineering" },
  ]);

  const moveFounderTask = (id: number, nextCol: string) => {
    setFounderTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: nextCol } : t)));
  };

  // Pitch deck slide feedback comments
  const [selectedSlide, setSelectedSlide] = useState(1);
  const slideFeedbacks = [
    { slide: 1, title: "Title Slide", score: 95, comments: "✓ Core thesis stands out. Visual alignment looks clean and fits premium dark theme." },
    { slide: 2, title: "Problem Definition", score: 88, comments: "✓ Highly relatable problem. Try adding a concrete user quote or metric to emphasize scale." },
    { slide: 3, title: "Market Size (TAM/SAM)", score: 64, comments: "⚠ Too generic. Break down your TAM/SAM using specific bottoms-up estimations instead of global reports." },
    { slide: 4, title: "Product MVP Demo", score: 90, comments: "✓ Sleek visuals. Ensure your video link or GIF runs automatically when presenting." },
    { slide: 5, title: "Revenue & SAFEs Ask", score: 72, comments: "⚠ Dilution parameters unclear. Integrate your pre-seed SAFE note calculator metrics here." }
  ];

  // Projects list
  const [pitchDecks, setPitchDecks] = useState([
    { name: "Pre-Seed Pitch Deck v1.4.pdf", size: "4.2 MB", version: "v1.4", date: "Today" },
    { name: "SAFE Financial Projections.xlsx", size: "1.8 MB", version: "v2.1", date: "2 days ago" }
  ]);

  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Founder OS Control Panel" subtitle="Mission Control for building a venture-backed startup.">
          {/* Welcome Card */}
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-white/[0.03] to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full">
                Incubation Suite
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Good Morning Founder 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Your runway is healthy (14 Months). The YC pre-screening score has advanced to **82%** after completing the deck revision.
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative overflow-hidden">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Current Startup Stage
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-orange-500 text-slate-950 font-black text-xs uppercase text-center font-display leading-tight">
                  MVP<br />BUILD
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Stage 3 of 7: MVP</div>
                  <div className="text-[10px] text-rose-400 font-mono mt-0.5">Pre-Seed Track active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dials grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono">Startup Health</div>
              <div className="text-2xl font-black text-white mt-1">91 / 100</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: "91%" }} />
              </div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono">Fundraising Score</div>
              <div className="text-2xl font-black text-white mt-1">82 / 100</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: "82%" }} />
              </div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono">User Growth</div>
              <div className="text-2xl font-black text-white mt-1">88 / 100</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: "88%" }} />
              </div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono">Execution Score</div>
              <div className="text-2xl font-black text-white mt-1">79 / 100</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: "79%" }} />
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-black text-white tracking-tight uppercase mb-3.5 font-display">
              Ecosystem Hubs
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="flex flex-col justify-between border-[#DFFF00]/30 hover:border-[#DFFF00]/60 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Premium Business Dashboard</h3>
                  <p className="text-sm text-white/60 mb-4">View advanced business analytics, sales charts, and customer traffic data.</p>
                </div>
                <Link to="/app/business" className="flex items-center justify-center gap-2 bg-[#DFFF00]/10 text-[#DFFF00] py-3 rounded-xl font-bold hover:bg-[#DFFF00]/20 transition-colors">
                  Open Business Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
              <Card className="flex flex-col justify-between border-rose-500/30 hover:border-rose-500/60 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Startup Hub</h3>
                  <p className="text-sm text-white/60 mb-4">Manage fundraising, milestones, runway, and access the mentor network.</p>
                </div>
                <Link to="/app/startup" className="flex items-center justify-center gap-2 bg-rose-500/20 text-rose-400 py-3 rounded-xl font-bold hover:bg-rose-500/30 transition-colors">
                  Open Startup Hub <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </Page>
      )}

      {/* TAB: STARTUP ARENA */}
      {currentTab === "startup_arena" && (
        <Page title="Startup Arena City" subtitle="Tackle milestones to unlock sectors in the Startup Metropolis.">
          <div className="grid gap-6 md:grid-cols-4 mt-4">
            {[
              { name: "Idea District", desc: "Refine value propositions, target profiles, and validation parameters.", unlocked: true, stage: "Complete" },
              { name: "Validation District", desc: "Run customer surveys, landing drives, and gather early signups.", unlocked: true, stage: "Complete" },
              { name: "MVP District", desc: "Code system core features, configure databases, connect secure auth.", unlocked: true, stage: "Active ⚡" },
              { name: "Growth District", desc: "Launch CAC funnels, optimize ad sets, structure user retention metrics.", unlocked: false, stage: "Locked" },
            ].map((d, i) => (
              <Card key={i} className={`flex flex-col justify-between border ${d.unlocked ? "border-rose-400/20" : "border-white/5 opacity-60"}`}>
                <div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground">
                    <span>SECTOR {i + 1}</span>
                    <span className={d.unlocked ? "text-rose-400" : "text-muted-foreground"}>{d.stage}</span>
                  </div>
                  <h4 className="text-base font-black text-white mt-3 font-display">{d.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{d.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: STARTUP ASSESSMENT */}
      {currentTab === "startup_assessment" && (
        <Page title="AI Assessment report" subtitle="AI Diagnostic analysis evaluating funding & operational readiness.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Executive Audit Dials</h3>
              <div className="space-y-3.5 text-xs text-white/80">
                <Bar value={85} label="Business Idea Feasibility" />
                <Bar value={90} label="Market Opportunity (TAM)" />
                <Bar value={62} label="Competitor Counter-Strategy" />
                <Bar value={78} label="Funding Ready Competency" />
              </div>
            </Card>
            <Card className="flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-black text-rose-400 font-display">82%</div>
              <div className="text-xs font-bold text-white mt-1">Investor Readiness Score</div>
              <button className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-orange-500 text-[10px] font-bold text-slate-950 hover:opacity-95 transition cursor-pointer">
                Download Executive Audit
              </button>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: STARTUP ROADMAP */}
      {currentTab === "startup_roadmap" && (
        <Page title="Venture Roadmap" subtitle="Coordinate schedules from validation milestones to scaling up.">
          <Card>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Milestone Timeline</h3>
            <div className="space-y-4">
              {["Core Tech & Frontend Build", "Delaware SAFEs Signature Preparation", "Incubator Pitch Rehearsals"].map((m, idx) => (
                <div key={idx} className="flex gap-4 items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                  <span className="h-6 w-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold font-mono text-xs">{idx + 1}</span>
                  <div className="text-sm text-white font-medium">{m}</div>
                </div>
              ))}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: TASKS & EXECUTION */}
      {currentTab === "tasks" && (
        <Page title="Tasks & Execution" subtitle="Agile Scrum Task Board managing startup development sprint.">
          <div className="grid gap-4 md:grid-cols-3">
            {["todo", "progress", "done"].map((col) => (
              <Card key={col} className="bg-slate-950/40 p-4 border border-white/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">{col}</h3>
                <div className="space-y-2">
                  {founderTasks
                    .filter((t) => t.column === col)
                    .map((t) => (
                      <div key={t.id} className="p-3 bg-slate-900/90 border border-white/5 rounded-lg text-xs">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-mono text-rose-400 font-semibold bg-rose-400/10 px-1.5 py-0.5 rounded">
                            {t.category}
                          </span>
                        </div>
                        <div className="text-white/90">{t.title}</div>
                        <div className="mt-2.5 flex gap-1.5 justify-end">
                          {col !== "todo" && (
                            <button
                              onClick={() => moveFounderTask(t.id, col === "progress" ? "todo" : "progress")}
                              className="text-[9px] text-muted-foreground hover:text-white"
                            >
                              ◀ Back
                            </button>
                          )}
                          {col !== "done" && (
                            <button
                              onClick={() => moveFounderTask(t.id, col === "todo" ? "progress" : "done")}
                              className="text-[9px] text-rose-400 hover:text-white font-semibold"
                            >
                              Move ▶
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: MENTORS & INVESTORS */}
      {(currentTab === "mentors" || currentTab === "investors") && (
        <Page title="Venture Network & Discovery" subtitle="Connect with advisors and seed accelerators matching your TAM.">
          <div className="space-y-3">
            {[
              { name: "Sequoia Capital", ticket: "₹20M - ₹50M", match: 96, loc: "Bangalore Hub" },
              { name: "Accel India", ticket: "₹15M - ₹40M", match: 91, loc: "Delhi Corridor" },
              { name: "Y Combinator", ticket: "₹40M SAFE", match: 88, loc: "Mountain View, CA" }
            ].map((vc) => (
              <Card key={vc.name} className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{vc.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{vc.loc} · Ticket size: {vc.ticket}</p>
                </div>
                <span className="text-xs font-mono font-bold text-rose-400">{vc.match}% AI Match</span>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: FUNDING CENTER */}
      {currentTab === "funding" && (
        <Page title="SAFE Dilution Calculator" subtitle="Verify dilution percentages before signing SAFE notes.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">SAFE note parameters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Pre-money Valuation (₹)</label>
                  <input
                    type="number"
                    value={preMoneyVal}
                    onChange={(e) => setPreMoneyVal(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Investment Amount (₹)</label>
                  <input
                    type="number"
                    value={investmentAmt}
                    onChange={(e) => setInvestmentAmt(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <button
                  onClick={calculateSAFE}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-400 to-orange-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer"
                >
                  Calculate Dilution
                </button>
              </div>
            </Card>

            <Card className="md:col-span-2 flex flex-col justify-center items-center text-center">
              {dilution === 0 ? (
                <div className="text-xs text-muted-foreground">Adjust inputs and calculate dilution matrices.</div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl font-black text-rose-400 font-display">{dilution}%</div>
                  <div className="text-sm text-white font-bold">Estimated Equity Dilution</div>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    This round dilutes co-founders by approximately {dilution}%. Consult YC SAFE templates before finalizing cap table adjustments.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: PITCH DECK STUDIO */}
      {currentTab === "pitch_decks" && (
        <Page title="Pitch Deck Studio" subtitle="Slide-by-slide AI comment reviewer and deck scorecard.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Slide Outline</h3>
              <div className="space-y-2">
                {slideFeedbacks.map((slide) => (
                  <button
                    key={slide.slide}
                    onClick={() => setSelectedSlide(slide.slide)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                      selectedSlide === slide.slide
                        ? "border-rose-400/40 bg-white/[0.04]"
                        : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-white mb-1">
                      <span>Slide {slide.slide}: {slide.title}</span>
                      <span className="text-[10px] text-rose-400 font-mono">{slide.score}/100</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-2 flex flex-col justify-center bg-slate-950/60 border border-white/5 p-4 rounded-xl">
              {(() => {
                const current = slideFeedbacks.find((f) => f.slide === selectedSlide);
                return (
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
                      Slide {selectedSlide} feedback
                    </div>
                    <div className="text-base font-bold text-white">{current?.title}</div>
                    <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-rose-400 border border-white/5 min-h-[100px] leading-relaxed">
                      {current?.comments}
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: CUSTOMER HUB */}
      {currentTab === "customers" && (
        <Page title="Customer Hub" subtitle="Monitor lead conversions, CAC, LTV, and retention parameters.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Conversion Funnel</h3>
              <div className="space-y-3.5 text-xs text-white/80">
                <Bar value={85} label="Landing Page Visitors -> Signups" />
                <Bar value={42} label="Signups -> Active Workspace Creation" />
                <Bar value={15} label="Active Users -> Pro Upgrade Conversion" />
              </div>
            </Card>
            <Card className="flex flex-col justify-center text-center">
              <div className="text-2xl font-black text-rose-400 font-display">₹12,400</div>
              <div className="text-xs text-muted-foreground mt-1">LTV / CAC Ratio Score</div>
              <div className="text-[9px] text-emerald-400 font-mono mt-2 font-semibold">
                ✓ highly scalable unit economics
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: DOCUMENTS */}
      {currentTab === "docs" && (
        <Page title="Documents Center" subtitle="Explore corporate legal files and Delaware Safe templates.">
          <div className="grid gap-4 md:grid-cols-2">
            {pitchDecks.map((doc, idx) => (
              <Card key={idx} className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{doc.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{doc.size} · Version: {doc.version}</p>
                </div>
                <button className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition cursor-pointer">
                  <Download className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: REWARD CENTER */}
      {currentTab === "rewards" && (
        <Page title="Founder Reward Center" subtitle="Access black card passes, advisor calls, and QR codes.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <HolographicTicket
              title="Advisor Strategy Call"
              subtitle="Free 30-minute growth scaling slot with verified mentors"
              type="STRATEGY PASS"
              admitNo="STR-4829"
              validUntil="Jul 30, 2026"
              gradient="from-rose-400 via-orange-400 to-rose-600"
              accentColor="#fb7185"
            />
            <HolographicTicket
              title="Pitch Deck Audit"
              subtitle="Get page-by-page comments from capital partners"
              type="AUDIT PASS"
              admitNo="AUD-1192"
              validUntil="Aug 15, 2026"
              gradient="from-purple-400 via-rose-400 to-indigo-500"
              accentColor="#a78bfa"
            />
          </div>
        </Page>
      )}

      {/* FALLBACK TABS */}
      {["startup_assessment", "team_workspace", "analytics", "achievements", "community", "profile"].includes(currentTab) && (
        <Page title={currentTab.toUpperCase()} subtitle="Startup OS configurations workspace.">
          <Card className="p-6">
            <div className="text-sm text-white font-bold mb-2">Founder Workspace Profile</div>
            <p className="text-xs text-muted-foreground">Cap table details and active incubation workflows.</p>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// INVESTOR DASHBOARD
// -------------------------------------------------------------

function InvestorDashboard({ currentTab }: { currentTab: string }) {
  // 1. Unified Startup Deal Pipeline State
  const [pipeline, setPipeline] = useState([
    { id: 1, name: "CortexML Labs", sector: "AI & Machine Learning", stage: "Due Diligence", ask: "₹150M", arr: "₹24M", growth: "+180% YoY", ddScore: 60, val: 1200 },
    { id: 2, name: "Solaris CleanGrid", sector: "CleanTech & Energy", stage: "Meeting", ask: "₹80M", arr: "₹12M", growth: "+95% YoY", ddScore: 40, val: 600 },
    { id: 3, name: "QuantumCrypto", sector: "Web3 & Cyber Security", stage: "Funded", ask: "₹120M", arr: "₹18M", growth: "+110% YoY", ddScore: 100, val: 900 },
    { id: 4, name: "BioSynthesis AI", sector: "BioTech", stage: "Screening", ask: "₹200M", arr: "₹8M", growth: "+60% YoY", ddScore: 0, val: 1500 },
    { id: 5, name: "Profession Home", sector: "EdTech & Talent Market", stage: "Screening", ask: "₹50M", arr: "₹15M", growth: "+210% YoY", ddScore: 20, val: 350 },
  ]);

  // 2. Inline Add Startup Form State
  const [newStartupName, setNewStartupName] = useState("");
  const [newStartupSector, setNewStartupSector] = useState("AI & Machine Learning");
  const [newStartupAsk, setNewStartupAsk] = useState("₹100M");
  const [newStartupARR, setNewStartupARR] = useState("₹10M");
  const [newStartupGrowth, setNewStartupGrowth] = useState("+120% YoY");
  const [newStartupVal, setNewStartupVal] = useState(800);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStartupName.trim()) return;
    const nextId = Math.max(...pipeline.map(s => s.id), 0) + 1;
    setPipeline(prev => [
      ...prev,
      {
        id: nextId,
        name: newStartupName,
        sector: newStartupSector,
        stage: "Screening",
        ask: newStartupAsk,
        arr: newStartupARR,
        growth: newStartupGrowth,
        ddScore: 0,
        val: Number(newStartupVal) || 500
      }
    ]);
    // Set up empty due diligence checklist for the new startup
    setDdItems(prev => ({
      ...prev,
      [nextId]: { incorporation: false, arrAudit: false, techAudit: false, ipSearch: false, teamRef: false }
    }));
    // Setup comparison metrics
    setComparedMetrics(prev => ({
      ...prev,
      [nextId]: { team: 7, velocity: 6, growthPct: 100, tamSize: 400, cacRatio: 3.0, githubStars: 250, nrrPct: 110 }
    }));
    setNewStartupName("");
    setShowAddForm(false);
  };

  // 3. Battlefield Comparison State (Startup Discovery)
  const [battlefieldIds, setBattlefieldIds] = useState<number[]>([1, 2]); // defaults to CortexML & Solaris
  const [customWeights, setCustomWeights] = useState({
    team: 30,
    velocity: 25,
    growth: 20,
    nrr: 15,
    tam: 10
  });
  
  // Custom metrics slider adjustment for compared startups
  const [comparedMetrics, setComparedMetrics] = useState<Record<number, {
    team: number;
    velocity: number;
    growthPct: number;
    tamSize: number;
    cacRatio: number;
    githubStars: number;
    nrrPct: number;
  }>>({
    1: { team: 9, velocity: 8, growthPct: 180, tamSize: 450, cacRatio: 4.2, githubStars: 1420, nrrPct: 124 }, // CortexML
    2: { team: 8, velocity: 7, growthPct: 95, tamSize: 600, cacRatio: 3.5, githubStars: 340, nrrPct: 112 }, // Solaris
    3: { team: 9, velocity: 9, growthPct: 110, tamSize: 320, cacRatio: 5.1, githubStars: 2800, nrrPct: 132 }, // QuantumCrypto
    4: { team: 7, velocity: 6, growthPct: 60, tamSize: 800, cacRatio: 2.8, githubStars: 120, nrrPct: 105 }, // BioSynthesis
    5: { team: 10, velocity: 10, growthPct: 210, tamSize: 250, cacRatio: 6.2, githubStars: 850, nrrPct: 145 }, // Profession Home
  });

  const updateMetric = (startupId: number, key: string, value: number) => {
    setComparedMetrics(prev => ({
      ...prev,
      [startupId]: {
        ...prev[startupId],
        [key]: value
      }
    }));
  };

  const calculateBattlefieldScore = (id: number) => {
    const metrics = comparedMetrics[id];
    const s = pipeline.find(x => x.id === id);
    if (!metrics || !s) return 0;
    
    // Normalize metrics to 0-100 scale
    const teamNorm = metrics.team * 10;
    const velocityNorm = metrics.velocity * 10;
    const growthNorm = Math.min((metrics.growthPct / 200) * 100, 100);
    const nrrNorm = Math.min(((metrics.nrrPct - 80) / 65) * 100, 100); // scaled from 80% to 145%
    const tamNorm = Math.min((metrics.tamSize / 800) * 100, 100); // scaled up to 800 crore TAM

    const totalWeight = customWeights.team + customWeights.velocity + customWeights.growth + customWeights.nrr + customWeights.tam;
    const w = {
      team: customWeights.team / totalWeight,
      velocity: customWeights.velocity / totalWeight,
      growth: customWeights.growth / totalWeight,
      nrr: customWeights.nrr / totalWeight,
      tam: customWeights.tam / totalWeight,
    };

    const composite = (teamNorm * w.team) + (velocityNorm * w.velocity) + (growthNorm * w.growth) + (nrrNorm * w.nrr) + (tamNorm * w.tam);
    return Math.round(composite);
  };

  // 4. Investment Allocations State (Dry Powder Simulator)
  const [fundSize, setFundSize] = useState(800); // Fund size in ₹ Millions
  const [commitments, setCommitments] = useState<Record<number, number>>({
    1: 45, // ₹45M committed to CortexML
    2: 15, // ₹15M committed to Solaris
    3: 60, // ₹60M committed to QuantumCrypto
  });
  const [confirmedCommitments, setConfirmedCommitments] = useState<Record<number, boolean>>({
    3: true, // QuantumCrypto is fully completed
  });
  const [dealCommitStatus, setDealCommitStatus] = useState<Record<number, string>>({});

  const handleCommitDeal = (startupId: number) => {
    setConfirmedCommitments(prev => ({ ...prev, [startupId]: true }));
    setDealCommitStatus(prev => ({ ...prev, [startupId]: "Allocation committed successfully! Check ledger." }));
    setTimeout(() => {
      setDealCommitStatus(prev => ({ ...prev, [startupId]: "" }));
    }, 4000);
  };

  // 5. AI Copilot Chat State
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Venture Terminal Intelligence is initialized. Dr. Aryan, ask me to evaluate deal dilution, competitor landscapes, or score founder benchmarks." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);

  const triggerCopilotQuery = (queryText: string) => {
    if (isCopilotTyping) return;
    setMessages(prev => [...prev, { sender: "user", text: queryText }]);
    setIsCopilotTyping(true);

    setTimeout(() => {
      let response = "";
      if (queryText.toLowerCase().includes("cortexml") || queryText.toLowerCase().includes("competitor")) {
        response = `**AI Competitive Audit Matrix — CortexML Labs**
        
| Competitor | Market Share | Model Efficiency | Latency | Core Moat |
| :--- | :---: | :---: | :---: | :--- |
| **CortexML** | **14%** | **94.2% (Elite)** | **12ms** | Proprietary Decentralized Quantization |
| TensorFlow Hub | 48% | 82.0% | 45ms | Google Brand Distribution Network |
| Mistral Core | 22% | 88.5% | 28ms | Multi-modal local scaling |

**Key Risk Analysis:**
1. *Moat Durability:* High developer stickiness (1,420 Stars, +180% MoM API consumption).
2. *Dilution Profile:* Pre-money SAFE note cap is reasonable. Recommendation: **Over-allocate allocation pool.**`;
      } else if (queryText.toLowerCase().includes("dilution") || queryText.toLowerCase().includes("safe")) {
        response = `**Capital Allocation Dilution Projection**
        
*   **Target Ask:** ₹150M at a ₹1,200M Cap.
*   **Resulting Dilution:** ~11.11% Post-Money dilution index.
*   **Option Pool Expansion:** Suggest negotiating a pre-money option pool reservation of 8% to absorb advisor shares.
*   *Verdict:* Safe note is standard Delaware template. Dilution triggers match normal Series A terms.`;
      } else {
        response = `**Market Intelligence Alert: CleanTech valuation parameters**
        
*   **SaaS Average Seed caps:** stabilized at 15-20x ARR (down from 45x peak).
*   **CleanGrid multiple:** Solar Energy projects index exhibits a CAGR of 18.2% YTD.
*   **Investment Recommendation:** Focus capital on high NRR companies (>115%) showing founder velocity >= 8/10.`;
      }

      setMessages(prev => [...prev, { sender: "ai", text: response }]);
      setIsCopilotTyping(false);
    }, 1200);
  };

  const handleSendCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    triggerCopilotQuery(chatInput);
    setChatInput("");
  };

  // 6. Due Diligence Center State
  const [selectedDDStartup, setSelectedDDStartup] = useState<number>(1);
  const [ddItems, setDdItems] = useState<Record<number, {
    incorporation: boolean;
    arrAudit: boolean;
    techAudit: boolean;
    ipSearch: boolean;
    teamRef: boolean;
  }>>({
    1: { incorporation: true, arrAudit: true, techAudit: false, ipSearch: true, teamRef: false },
    2: { incorporation: true, arrAudit: false, techAudit: false, ipSearch: false, teamRef: true },
    3: { incorporation: true, arrAudit: true, techAudit: true, ipSearch: true, teamRef: true },
    4: { incorporation: false, arrAudit: false, techAudit: false, ipSearch: false, teamRef: false },
    5: { incorporation: true, arrAudit: false, techAudit: false, ipSearch: false, teamRef: false },
  });

  const toggleDDItem = (startupId: number, field: keyof typeof ddItems[number]) => {
    setDdItems(prev => {
      const updated = {
        ...prev,
        [startupId]: {
          ...prev[startupId],
          [field]: !prev[startupId][field]
        }
      };

      // Recalculate ddScore for this startup inside pipeline state
      const checkedCount = Object.values(updated[startupId]).filter(Boolean).length;
      const score = Math.round((checkedCount / 5) * 100);
      
      setPipeline(prevPipe =>
        prevPipe.map(s => (s.id === startupId ? { ...s, ddScore: score } : s))
      );

      return updated;
    });
  };

  const getDDScore = (id: number) => {
    const items = ddItems[id];
    if (!items) return 0;
    return Math.round((Object.values(items).filter(Boolean).length / 5) * 100);
  };

  const triggerIssueTermSheet = (id: number) => {
    setPipeline(prev =>
      prev.map(s => (s.id === id ? { ...s, stage: "Term Sheet" } : s))
    );
    alert(`Success: Standard pre-seed Term Sheet issued to ${pipeline.find(x => x.id === id)?.name || "Founder"}. Status updated to Term Sheet.`);
  };

  // 7. Founder Meetings Calendar State
  const [meetings, setMeetings] = useState([
    { id: 1, startup: "CortexML Labs", founder: "Dr. Elena Rostova", date: "2026-06-15", time: "14:00", type: "Diligence Review", status: "Confirmed" },
    { id: 2, startup: "Solaris CleanGrid", founder: "Marcus Vance", date: "2026-06-16", time: "10:30", type: "Series A Terms Discussion", status: "Confirmed" },
    { id: 3, startup: "Profession Home", founder: "Aryan Buha", date: "2026-06-18", time: "16:00", type: "Initial Pitch Presentation", status: "Pending" },
  ]);
  const [meetStartup, setMeetStartup] = useState("");
  const [meetFounder, setMeetFounder] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [meetType, setMeetType] = useState("Initial Pitch");
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [activeVirtualRoom, setActiveVirtualRoom] = useState<string | null>(null);
  const [roomTimer, setRoomTimer] = useState(0);

  useEffect(() => {
    let timerId: any;
    if (activeVirtualRoom) {
      timerId = setInterval(() => {
        setRoomTimer(prev => prev + 1);
      }, 1000);
    } else {
      setRoomTimer(0);
    }
    return () => clearInterval(timerId);
  }, [activeVirtualRoom]);

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetStartup || !meetFounder || !meetDate || !meetTime) return;
    setMeetings(prev => [
      ...prev,
      {
        id: prev.length + 1,
        startup: meetStartup,
        founder: meetFounder,
        date: meetDate,
        time: meetTime,
        type: meetType,
        status: "Pending"
      }
    ]);
    setMeetStartup("");
    setMeetFounder("");
    setMeetDate("");
    setMeetTime("");
    setShowMeetingModal(false);
  };

  // 8. Portfolio Multiple Valuation States
  const [portfolioExits, setPortfolioExits] = useState<Record<number, number>>({
    1: 3.2, // 3.2x MoIC on CortexML
    2: 1.5, // 1.5x MoIC on Solaris CleanGrid
    3: 4.8, // 4.8x MoIC on QuantumCrypto
  });

  const updateExitMultiple = (startupId: number, val: number) => {
    setPortfolioExits(prev => ({
      ...prev,
      [startupId]: Number(val)
    }));
  };

  // 9. Market Intelligence filter
  const [marketIntelFilter, setMarketIntelFilter] = useState("all");

  // 10. Report Compilation Loader State
  const [compilingProgress, setCompilingProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledReportName, setCompiledReportName] = useState<string | null>(null);

  const startCompilingReport = (reportTitle: string) => {
    setIsCompiling(true);
    setCompilingProgress(0);
    const interval = setInterval(() => {
      setCompilingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompiling(false);
          setCompiledReportName(reportTitle);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  // 11. Forum Syndicate Community State
  const [forumPosts, setForumPosts] = useState([
    { id: 1, title: "Co-investment Opportunity: Series A CleanGrid", author: "Devon Capital (GP)", content: "We are seeking co-investment partners for a ₹30M allocation space in Solaris CleanGrid. Term sheet signed. Excellent unit economics.", votes: 15, tags: ["Co-investment", "Seed"] },
    { id: 2, title: "GenAI Valuation caps stabilizing at 15-20x ARR", author: "Sarah Jenkins (LP)", content: "Data from Silicon Valley suggests seed deals are pricing in healthy valuation parameters. Focus capital checks on high retention targets.", votes: 31, tags: ["Valuations", "Market Intel"] },
  ]);
  const [forumTitle, setForumTitle] = useState("");
  const [forumContent, setForumContent] = useState("");
  const [forumTag, setForumTag] = useState("Co-investment");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forumTitle || !forumContent) return;
    setForumPosts(prev => [
      {
        id: prev.length + 1,
        title: forumTitle,
        author: "Vanguard Catalyst (You)",
        content: forumContent,
        votes: 1,
        tags: [forumTag]
      },
      ...prev
    ]);
    setForumTitle("");
    setForumContent("");
  };

  const handleUpvotePost = (id: number) => {
    setForumPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, votes: p.votes + 1 } : p))
    );
  };

  // 12. GP Thesis details state
  const [partnerName, setPartnerName] = useState("Dr. Aryan Buha");
  const [fundName, setFundName] = useState("Vanguard Catalyst Partners III");
  const [gpThesis, setGpThesis] = useState("Empowering high-velocity startups across DeepTech, CleanEnergy, and Web3 infrastructure.");
  const [avgCheckSize, setAvgCheckSize] = useState(40); // in ₹ Millions

  // 13. System configuration Settings state
  const [autoNda, setAutoNda] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [digestInterval, setDigestInterval] = useState("weekly");

  // Kanban Stage ADVANCE & REGRESS helpers
  const advanceStartup = (id: number) => {
    setPipeline(prev =>
      prev.map(s => {
        if (s.id === id) {
          const next =
            s.stage === "Screening"
              ? "Meeting"
              : s.stage === "Meeting"
                ? "Due Diligence"
                : s.stage === "Due Diligence"
                  ? "Term Sheet"
                  : s.stage === "Term Sheet"
                    ? "Funded"
                    : "Funded";
          return { ...s, stage: next };
        }
        return s;
      })
    );
  };

  const regressStartup = (id: number) => {
    setPipeline(prev =>
      prev.map(s => {
        if (s.id === id) {
          const prevStage =
            s.stage === "Funded"
              ? "Term Sheet"
              : s.stage === "Term Sheet"
                ? "Due Diligence"
                : s.stage === "Due Diligence"
                  ? "Meeting"
                  : s.stage === "Meeting"
                    ? "Screening"
                    : "Screening";
          return { ...s, stage: prevStage };
        }
        return s;
      })
    );
  };

  // Total Capital Committed Calculations
  const totalCommittedCapital = Object.entries(commitments).reduce((sum, [id, val]) => {
    const sId = Number(id);
    if (confirmedCommitments[sId]) {
      return sum + val;
    }
    return sum;
  }, 0);

  const dryPowder = fundSize - totalCommittedCapital;

  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Executive Deal Flow Terminal" subtitle="GP Core Command Center · Real-time pipeline allocation controls.">
          {/* Executive Overview Banner */}
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                {fundName}
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Welcome back, {partnerName} 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Fund III deployment remains on trajectory. dry powder stands at <strong className="text-white">₹{dryPowder}M</strong>. We have <strong className="text-white">{pipeline.filter(s => s.stage === "Due Diligence").length} companies</strong> undergoing critical audits.
              </p>
            </div>
            
            {/* Circular Dry Powder Dial */}
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Fund Utilization Ratio
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-emerald-400/20">
                  <div className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-r-emerald-400 rotate-45" />
                  <span className="text-[10px] font-bold text-white font-mono">
                    {Math.round((totalCommittedCapital / fundSize) * 100)}%
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">₹{totalCommittedCapital}M Allocated</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">₹{dryPowder}M Available Cap</div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Bloomberg KPI Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Fund IRR (Net)</span>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">28.4%</div>
              <div className="text-[10px] text-muted-foreground mt-1">✓ Top-quartile benchmarking</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>TVPI Multiple</span>
                <Layers className="h-3.5 w-3.5 text-teal-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">2.14x</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">+0.12x since last Q valuation</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Active Funnel Deals</span>
                <Activity className="h-3.5 w-3.5 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {pipeline.filter(s => s.stage !== "Funded").length} Targets
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {pipeline.filter(s => s.stage === "Screening").length} Screening · {pipeline.filter(s => s.stage === "Due Diligence").length} Audit
              </div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Total Round Cap</span>
                <Coins className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-500 mt-1">₹{fundSize}M</div>
              <div className="text-[10px] text-muted-foreground mt-1">Target Check average: ₹40M</div>
            </Card>
          </div>

          {/* Deal Spotlight & Pipeline Distribution */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-400" /> Target Deal Spotlight
                </h3>
                <span className="text-[10px] bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full font-mono">Series A target</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">CortexML Labs</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Developing local LLM quantization protocols with latency thresholds of 12ms. Currently in due diligence.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white font-mono">ARR: ₹24M</span>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white font-mono">Growth: +180% YoY</span>
                    <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">DD Progress: {getDDScore(1)}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href="?tab=due_diligence" className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-[10px] rounded-lg cursor-pointer transition">
                    Run DD Audit
                  </a>
                  <a href="?tab=investor_copilot" className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg cursor-pointer transition">
                    <Bot className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-emerald-400" /> Pipeline Stage Breakdown
              </h3>
              <div className="space-y-3">
                {["Screening", "Meeting", "Due Diligence", "Term Sheet", "Funded"].map(stage => {
                  const count = pipeline.filter(s => s.stage === stage).length;
                  const pct = Math.round((count / pipeline.length) * 100);
                  return (
                    <div key={stage} className="text-xs">
                      <div className="flex justify-between items-center mb-1 text-muted-foreground">
                        <span className="font-semibold text-white">{stage}</span>
                        <span className="font-mono">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: DEAL FLOW */}
      {currentTab === "deal_flow" && (
        <Page title="Venture Deal Flow Kanban" subtitle="Track deal milestones. Drag and advance target startups to Term Sheet checkpoints.">
          
          {/* Add Startup Toggle Button */}
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Interact with target cards to transition pipeline stages.
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-[10px] font-bold rounded-lg cursor-pointer transition flex items-center gap-1"
            >
              {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {showAddForm ? "Cancel Add" : "Discover New Startup"}
            </button>
          </div>

          {/* Add Startup Inline Form */}
          {showAddForm && (
            <Card className="mb-6 border border-emerald-400/20">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Discover New Pipeline Lead</h3>
              <form onSubmit={handleAddStartup} className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BrainCorp"
                    value={newStartupName}
                    onChange={(e) => setNewStartupName(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Sector Area</label>
                  <select
                    value={newStartupSector}
                    onChange={(e) => setNewStartupSector(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  >
                    <option>AI & Machine Learning</option>
                    <option>CleanTech & Energy</option>
                    <option>Web3 & Cyber Security</option>
                    <option>BioTech</option>
                    <option>EdTech & Talent Market</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Round Ask (₹)</label>
                  <input
                    type="text"
                    value={newStartupAsk}
                    onChange={(e) => setNewStartupAsk(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Current ARR (₹)</label>
                  <input
                    type="text"
                    value={newStartupARR}
                    onChange={(e) => setNewStartupARR(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Valuation Cap (₹M)</label>
                  <input
                    type="number"
                    value={newStartupVal}
                    onChange={(e) => setNewStartupVal(Number(e.target.value))}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded cursor-pointer transition"
                  >
                    Create Deal Lead
                  </button>
                </div>
              </form>
            </Card>
          )}

          {/* Kanban Board Layout */}
          <div className="grid gap-4 md:grid-cols-5 mt-2 overflow-x-auto">
            {["Screening", "Meeting", "Due Diligence", "Term Sheet", "Funded"].map((col) => {
              const list = pipeline.filter((t) => t.stage === col);
              return (
                <div key={col} className="bg-slate-950/40 p-3.5 border border-white/5 rounded-2xl min-w-[210px] flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                      {col}
                    </span>
                    <span className="text-[10px] bg-white/5 text-muted-foreground px-2 py-0.5 rounded font-semibold font-mono">
                      {list.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {list.length === 0 ? (
                      <div className="h-24 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-[10px] text-muted-foreground">
                        Empty Stage
                      </div>
                    ) : (
                      list.map((t) => (
                        <div key={t.id} className="p-3 bg-slate-900/90 border border-white/5 rounded-xl text-xs hover:border-emerald-400/30 transition">
                          <div className="text-[9px] font-mono text-emerald-400 font-semibold bg-emerald-400/10 px-1.5 py-0.5 rounded w-fit mb-2">
                            {t.sector.split(" & ")[0]}
                          </div>
                          <div className="text-white font-bold text-xs">{t.name}</div>
                          
                          <div className="mt-2 text-[10px] text-muted-foreground space-y-0.5 font-mono">
                            <div>Ask: {t.ask}</div>
                            <div>ARR: {t.arr}</div>
                            <div>Growth: {t.growth}</div>
                          </div>

                          {/* DD indicator */}
                          {t.stage === "Due Diligence" && (
                            <div className="mt-3.5">
                              <div className="flex justify-between text-[9px] text-muted-foreground mb-0.5">
                                <span>Audit checklist</span>
                                <span>{t.ddScore}%</span>
                              </div>
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: `${t.ddScore}%` }} />
                              </div>
                            </div>
                          )}

                          <div className="mt-4 flex gap-1.5 justify-end">
                            {col !== "Screening" && (
                              <button
                                onClick={() => regressStartup(t.id)}
                                className="text-[9px] text-muted-foreground hover:text-white px-1.5 py-0.5 bg-white/5 rounded border border-white/5 cursor-pointer"
                              >
                                ◀ Back
                              </button>
                            )}
                            {col !== "Funded" && (
                              <button
                                onClick={() => advanceStartup(t.id)}
                                className="text-[9px] text-emerald-400 hover:text-white font-semibold px-1.5 py-0.5 bg-emerald-400/5 rounded border border-emerald-400/10 cursor-pointer"
                              >
                                Move ▶
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Page>
      )}

      {/* TAB: STARTUP DISCOVERY & BATTLEFIELD */}
      {currentTab === "startup_discovery" && (
        <Page title="Startup Discovery Suite" subtitle="Review discovered targets and access the Startup Battlefield side-by-side matching matrix.">
          
          {/* Section 1: Discovered Startups Grid */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
              <Search className="h-4 w-4 text-emerald-400" /> Targets in Pipeline
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pipeline.map(s => {
                const isCompared = battlefieldIds.includes(s.id);
                return (
                  <Card key={s.id} className={`flex flex-col justify-between border ${isCompared ? "border-emerald-400/30" : "border-white/5"}`}>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-muted-foreground">{s.sector}</span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono bg-emerald-400/10 px-2 py-0.5 rounded">
                          {s.stage}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display mt-2">{s.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-mono">
                        ARR: {s.arr} · growth velocity: {s.growth} · round cap: ₹{s.val}M
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          if (isCompared) {
                            setBattlefieldIds(battlefieldIds.filter(id => id !== s.id));
                          } else {
                            if (battlefieldIds.length >= 3) {
                              alert("Battlefield matrix comparison is limited to max 3 startups.");
                              return;
                            }
                            setBattlefieldIds([...battlefieldIds, s.id]);
                          }
                        }}
                        className={`w-full py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                          isCompared 
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/10 hover:bg-rose-500/30" 
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 hover:bg-emerald-500/30"
                        }`}
                      >
                        {isCompared ? "Remove from Battle" : "Add to Battlefield"}
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Section 2: Startup Battlefield Matrix */}
          <Card className="border border-emerald-400/20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 mb-4 gap-2">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Trophy className="h-4.5 w-4.5 text-amber-400 animate-pulse" /> Startup Battlefield (Side-by-Side Analysis)
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Adjust custom weights and metrics below to dynamically compute the composite Venture Match Index.
                </p>
              </div>
              <div className="flex gap-2">
                {battlefieldIds.length === 0 && (
                  <span className="text-[10px] text-rose-400 font-mono font-semibold">
                    ⚠ Select at least one startup to compare.
                  </span>
                )}
                {battlefieldIds.length > 0 && (
                  <button
                    onClick={() => setBattlefieldIds([])}
                    className="text-[9px] text-muted-foreground hover:text-white font-mono"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Custom Weight Adjustments */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-5 mb-6 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs">
              <div>
                <label className="text-[9px] text-muted-foreground font-mono block mb-1">Team Weight ({customWeights.team}%)</label>
                <input
                  type="range" min="0" max="100"
                  value={customWeights.team}
                  onChange={(e) => setCustomWeights(prev => ({ ...prev, team: Number(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
              <div>
                <label className="text-[9px] text-muted-foreground font-mono block mb-1">Velocity Weight ({customWeights.velocity}%)</label>
                <input
                  type="range" min="0" max="100"
                  value={customWeights.velocity}
                  onChange={(e) => setCustomWeights(prev => ({ ...prev, velocity: Number(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
              <div>
                <label className="text-[9px] text-muted-foreground font-mono block mb-1">growth Weight ({customWeights.growth}%)</label>
                <input
                  type="range" min="0" max="100"
                  value={customWeights.growth}
                  onChange={(e) => setCustomWeights(prev => ({ ...prev, growth: Number(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
              <div>
                <label className="text-[9px] text-muted-foreground font-mono block mb-1">NRR Weight ({customWeights.nrr}%)</label>
                <input
                  type="range" min="0" max="100"
                  value={customWeights.nrr}
                  onChange={(e) => setCustomWeights(prev => ({ ...prev, nrr: Number(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
              <div>
                <label className="text-[9px] text-muted-foreground font-mono block mb-1">TAM Weight ({customWeights.tam}%)</label>
                <input
                  type="range" min="0" max="100"
                  value={customWeights.tam}
                  onChange={(e) => setCustomWeights(prev => ({ ...prev, tam: Number(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>

            {/* Comparison Columns Grid */}
            <div className="grid gap-4 md:grid-cols-3">
              {battlefieldIds.map(id => {
                const s = pipeline.find(x => x.id === id);
                const metrics = comparedMetrics[id];
                if (!s || !metrics) return null;

                const score = calculateBattlefieldScore(id);
                return (
                  <div key={id} className="p-4 rounded-xl border border-white/5 bg-slate-900/60 relative">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold text-white font-display">{s.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          score >= 80 ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                        }`}>
                          {score} Index
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Metric 1: Team */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>Founder & Team Experience</span>
                          <span className="text-white font-bold">{metrics.team}/10</span>
                        </div>
                        <input
                          type="range" min="1" max="10"
                          value={metrics.team}
                          onChange={(e) => updateMetric(id, "team", Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      {/* Metric 2: Product Velocity */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>Product Release Velocity</span>
                          <span className="text-white font-bold">{metrics.velocity}/10</span>
                        </div>
                        <input
                          type="range" min="1" max="10"
                          value={metrics.velocity}
                          onChange={(e) => updateMetric(id, "velocity", Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      {/* Metric 3: Growth % */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>Growth ARR Rate</span>
                          <span className="text-white font-bold">{metrics.growthPct}% YoY</span>
                        </div>
                        <input
                          type="range" min="10" max="250"
                          value={metrics.growthPct}
                          onChange={(e) => updateMetric(id, "growthPct", Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      {/* Metric 4: Net Retention (NRR) */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>Net Retention Rate (NRR)</span>
                          <span className="text-white font-bold">{metrics.nrrPct}%</span>
                        </div>
                        <input
                          type="range" min="80" max="150"
                          value={metrics.nrrPct}
                          onChange={(e) => updateMetric(id, "nrrPct", Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      {/* Metric 5: TAM Crore */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>Addressable TAM</span>
                          <span className="text-white font-bold">₹{metrics.tamSize} Crore</span>
                        </div>
                        <input
                          type="range" min="50" max="1000"
                          value={metrics.tamSize}
                          onChange={(e) => updateMetric(id, "tamSize", Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      {/* Secondary metrics (Static review parameters) */}
                      <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground">
                        <div>CAC/LTV: <strong className="text-white">{metrics.cacRatio}x</strong></div>
                        <div>Git Stars: <strong className="text-white">{metrics.githubStars}</strong></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: INVESTMENT OPPORTUNITIES */}
      {currentTab === "investments" && (
        <Page title="Investment Allocations Pool" subtitle="Deploy Capital commitments to outstanding syndicates and monitor Dry Powder.">
          
          {/* Capital allocation summary */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Stat label="Primary dry powder" value={`₹${dryPowder}M`} tone="electric" />
            <Stat label="Total Allocated Pool" value={`₹${totalCommittedCapital}M`} tone="violet" />
            <Card>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Active Term Sheets Signed</div>
              <div className="mt-2 font-display text-3xl font-semibold text-amber-500">
                {Object.values(confirmedCommitments).filter(Boolean).length} Startups
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">Fund check maximum Cap: ₹100M</div>
            </Card>
          </div>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Outstanding Funding allocations</h3>
          <div className="space-y-4">
            {pipeline.map(s => {
              const allocation = commitments[s.id] || 20;
              const isCommitted = confirmedCommitments[s.id];
              const capVal = s.val;
              
              // Dynamic Ownership calculation
              const ownership = ((allocation / capVal) * 100).toFixed(2);
              
              return (
                <Card key={s.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-display">{s.name}</h4>
                      <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                        Valuation Cap: ₹{capVal}M
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target Ask: {s.ask} · Round Type: Pre-Seed SAFE Note.
                    </p>

                    {/* Check Slider */}
                    {!isCommitted && (
                      <div className="mt-4 max-w-md">
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-muted-foreground">
                          <span>Check Size Allocation (₹M)</span>
                          <span className="text-emerald-400 font-bold">₹{allocation}M Check</span>
                        </div>
                        <input
                          type="range" min="5" max="100" step="5"
                          value={allocation}
                          onChange={(e) => setCommitments(prev => ({ ...prev, [s.id]: Number(e.target.value) }))}
                          className="w-full accent-emerald-400"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2 text-right">
                    <div className="text-xs font-mono">
                      <div className="text-muted-foreground">Dilution Share:</div>
                      <div className="text-sm font-bold text-white">{ownership}% Ownership</div>
                    </div>
                    
                    {isCommitted ? (
                      <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono bg-emerald-400/10 px-2.5 py-1 rounded">
                        ✓ Capital Committed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCommitDeal(s.id)}
                        className="px-4 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-[10px] rounded-lg cursor-pointer transition"
                      >
                        Commit Allocation Check
                      </button>
                    )}
                    
                    {dealCommitStatus[s.id] && (
                      <span className="text-[10px] font-semibold text-amber-400 font-mono mt-1">
                        {dealCommitStatus[s.id]}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Page>
      )}

      {/* TAB: AI INVESTMENT ANALYST */}
      {currentTab === "investor_copilot" && (
        <Page title="Venture AI Copilot" subtitle="Prompt-driven due diligence and competition auditing.">
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Quick Actions Panel */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Suggested Intelligence Queries</h3>
              <div className="space-y-2">
                {[
                  "Audit CortexML Labs competition moat",
                  "Review series A Safe note dilution parameters",
                  "Check CleanTech sector ARR multiples caps",
                  "Formulate standard deviation values for EdTech exits"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerCopilotQuery(q)}
                    className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition leading-relaxed"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat Box */}
            <Card className="md:col-span-2 flex flex-col h-[480px]">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
                <Bot className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono uppercase">Venture Analyst Chat</span>
              </div>

              {/* Chat Output */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-lg text-xs leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-emerald-500 text-slate-950 font-medium" 
                        : "bg-white/[0.02] border border-white/5 text-white/90"
                    }`}>
                      <div className="whitespace-pre-line">{m.text}</div>
                    </div>
                  </div>
                ))}
                {isCopilotTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-muted-foreground italic font-mono">
                      Analyst is auditing indices...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendCopilot} className="flex gap-2 border-t border-white/5 pt-3">
                <input
                  type="text"
                  placeholder="Ask a question about cap tables, ARR audits, or multiples..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-2 focus:border-emerald-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl cursor-pointer transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: DUE DILIGENCE CENTER */}
      {currentTab === "due_diligence" && (
        <Page title="Due Diligence Core" subtitle="Execute legal, financial, and technical audits. Complete audits to unlock Term Sheet creation.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Startup Selector */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Select Target for Audit</h3>
              <div className="space-y-2">
                {pipeline.map(s => {
                  const score = getDDScore(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedDDStartup(s.id)}
                      className={`w-full text-left p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                        selectedDDStartup === s.id 
                          ? "bg-emerald-500/10 border-emerald-400/30 text-white" 
                          : "bg-white/[0.01] border-white/5 text-muted-foreground hover:bg-white/[0.03]"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold font-display">{s.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{s.stage}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {score}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Checklists and Progress Dial */}
            <Card className="md:col-span-2">
              {(() => {
                const target = pipeline.find(x => x.id === selectedDDStartup);
                const items = ddItems[selectedDDStartup] || { incorporation: false, arrAudit: false, techAudit: false, ipSearch: false, teamRef: false };
                if (!target) return <div className="text-xs text-muted-foreground text-center">No startup selected</div>;

                const score = getDDScore(target.id);
                return (
                  <div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">Audit Checklist: {target.name}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Checked items feed directly to the global database readiness metrics.</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          {score}% Completed
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition">
                        <input
                          type="checkbox"
                          id="inc-check"
                          checked={items.incorporation}
                          onChange={() => toggleDDItem(target.id, "incorporation")}
                          className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
                        />
                        <label htmlFor="inc-check" className="text-xs text-white cursor-pointer select-none flex-1">
                          <strong>Legal Incorporation:</strong> Validate Delaware C-Corp charter certificate and good standing documents.
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition">
                        <input
                          type="checkbox"
                          id="arr-check"
                          checked={items.arrAudit}
                          onChange={() => toggleDDItem(target.id, "arrAudit")}
                          className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
                        />
                        <label htmlFor="arr-check" className="text-xs text-white cursor-pointer select-none flex-1">
                          <strong>Financial ARR Audit:</strong> Reconcile Stripe invoices ledger, customer contracts, and monthly cash burn.
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition">
                        <input
                          type="checkbox"
                          id="tech-check"
                          checked={items.techAudit}
                          onChange={() => toggleDDItem(target.id, "techAudit")}
                          className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
                        />
                        <label htmlFor="tech-check" className="text-xs text-white cursor-pointer select-none flex-1">
                          <strong>Tech Architecture & Security:</strong> Code repository quality check, cloud database dependency mapping, and penetration audit.
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition">
                        <input
                          type="checkbox"
                          id="ip-check"
                          checked={items.ipSearch}
                          onChange={() => toggleDDItem(target.id, "ipSearch")}
                          className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
                        />
                        <label htmlFor="ip-check" className="text-xs text-white cursor-pointer select-none flex-1">
                          <strong>Intellectual Property check:</strong> Verify patents search ledger, trademark filings, and engineer NDA signatures.
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition">
                        <input
                          type="checkbox"
                          id="ref-check"
                          checked={items.teamRef}
                          onChange={() => toggleDDItem(target.id, "teamRef")}
                          className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
                        />
                        <label htmlFor="ref-check" className="text-xs text-white cursor-pointer select-none flex-1">
                          <strong>Reference Calls:</strong> Call at least 2 key enterprise clients and review former employer reports.
                        </label>
                      </div>
                    </div>

                    {/* Issuance of Term Sheet button */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                      {score === 100 ? (
                        <button
                          onClick={() => triggerIssueTermSheet(target.id)}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 font-bold text-slate-950 hover:opacity-90 transition cursor-pointer text-xs"
                        >
                          🏆 Issue Term Sheet Draft
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-xs cursor-not-allowed"
                        >
                          Complete audit (100%) to issue Term Sheet
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: FOUNDER MEETINGS */}
      {currentTab === "founder_meetings" && (
        <Page title="Founder Pitch Meetings" subtitle="Organize pitch calendar calls and access the Virtual Pitch Room simulator.">
          
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Upcoming founder pitches and strategic check-ins.</span>
            <button
              onClick={() => setShowMeetingModal(!showMeetingModal)}
              className="px-3 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-[10px] font-bold rounded-lg cursor-pointer transition flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" /> Book Call Slot
            </button>
          </div>

          {/* New Meeting Form Card */}
          {showMeetingModal && (
            <Card className="mb-6 border border-emerald-400/20 max-w-xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Book Pitch Presentation</h3>
              <form onSubmit={handleBookMeeting} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Company Target</label>
                    <input
                      type="text" required placeholder="e.g. BrainCorp"
                      value={meetStartup} onChange={(e) => setMeetStartup(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Founder Full Name</label>
                    <input
                      type="text" required placeholder="Elena Rostova"
                      value={meetFounder} onChange={(e) => setMeetFounder(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Date</label>
                    <input
                      type="date" required
                      value={meetDate} onChange={(e) => setMeetDate(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Time Slot</label>
                    <input
                      type="time" required
                      value={meetTime} onChange={(e) => setMeetTime(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Call Category</label>
                    <select
                      value={meetType} onChange={(e) => setMeetType(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    >
                      <option>Initial Pitch</option>
                      <option>Diligence Review</option>
                      <option>Cap Table Terms Discussion</option>
                      <option>LP Presentation</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded cursor-pointer transition"
                >
                  Book Meeting
                </button>
              </form>
            </Card>
          )}

          {/* Virtual Pitch Room Simulation Overlay */}
          {activeVirtualRoom && (
            <Card className="mb-6 border-2 border-emerald-400 bg-slate-950/90 max-w-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Virtual Pitch Terminal — Room Active
                  </span>
                </div>
                <button
                  onClick={() => setActiveVirtualRoom(null)}
                  className="px-2.5 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[10px] font-bold rounded-lg cursor-pointer transition"
                >
                  Disconnect
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 rounded-xl border border-white/5 bg-slate-900/60 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center font-bold text-white text-lg">
                    GP
                  </div>
                  <div className="text-xs font-bold text-white mt-2">{partnerName}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">GP Host · Connected</div>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-slate-900/60 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-400 flex items-center justify-center font-bold text-white text-lg">
                    FD
                  </div>
                  <div className="text-xs font-bold text-white mt-2">
                    {meetings.find(m => m.startup === activeVirtualRoom)?.founder || "Founder"}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Presenter · Screen Sharing active</div>
                </div>
              </div>

              {/* Status Audio Waves */}
              <div className="mt-6 p-3 rounded-lg bg-slate-900/40 border border-white/5 flex justify-between items-center">
                <div className="text-[10px] font-mono text-muted-foreground">
                  Session duration: {Math.floor(roomTimer / 60)}m {roomTimer % 60}s · Audio: encrypted
                </div>
                <div className="flex gap-1 h-3 items-end">
                  <span className="w-0.5 bg-emerald-400 animate-bounce h-full" />
                  <span className="w-0.5 bg-emerald-400 animate-bounce h-1/2" style={{ animationDelay: "0.2s" }} />
                  <span className="w-0.5 bg-emerald-400 animate-bounce h-3/4" style={{ animationDelay: "0.4s" }} />
                  <span className="w-0.5 bg-emerald-400 animate-bounce h-1/3" style={{ animationDelay: "0.1s" }} />
                </div>
              </div>
            </Card>
          )}

          {/* Meetings List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((m) => (
              <Card key={m.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                    <span className="text-muted-foreground">{m.date} · {m.time}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      m.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">{m.type}</h4>
                  <div className="text-sm font-bold text-white mt-1.5 font-display">{m.startup}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Founder: {m.founder}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                  <button
                    onClick={() => setActiveVirtualRoom(m.startup)}
                    className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded cursor-pointer transition flex justify-center items-center gap-1"
                  >
                    <Play className="h-3 w-3 fill-current" /> Join Virtual Room
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: PORTFOLIO COMPANIES */}
      {currentTab === "portfolio" && (
        <Page title="Portfolio Valuation Matrix" subtitle="Monitor current asset caps, invested checks, and run exit MoIC multiple scenarios.">
          
          {/* Portfolio metrics */}
          {(() => {
            const investedTotal = 120; // in ₹ Millions
            const currentTotal = Math.round(
              45 * (portfolioExits[1] || 1) + 
              15 * (portfolioExits[2] || 1) + 
              60 * (portfolioExits[3] || 1)
            );
            const netMultiple = (currentTotal / investedTotal).toFixed(2);

            return (
              <>
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <Stat label="Total Cash Invested" value={`₹${investedTotal}M`} tone="electric" />
                  <Stat label="Current Stake Value" value={`₹${currentTotal}M`} tone="violet" />
                  <Card>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio Net MoIC Multiple</div>
                    <div className="mt-2 font-display text-3xl font-semibold text-emerald-400">
                      {netMultiple}x
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">Scenario calculation active</div>
                  </Card>
                </div>

                {/* Spreadsheet grid */}
                <Card className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase font-mono text-muted-foreground tracking-wider">
                        <th className="py-2.5">Startup</th>
                        <th className="py-2.5">Invested Capital</th>
                        <th className="py-2.5">Valuation cap</th>
                        <th className="py-2.5">Ownership %</th>
                        <th className="py-2.5">Exit Multiple Simulator</th>
                        <th className="py-2.5 text-right">Imputed Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {[
                        { id: 1, name: "CortexML Labs", invested: 45, val: 1200, own: 3.75 },
                        { id: 2, name: "Solaris CleanGrid", invested: 15, val: 600, own: 2.50 },
                        { id: 3, name: "QuantumCrypto", invested: 60, val: 900, own: 6.67 },
                      ].map(p => {
                        const exit = portfolioExits[p.id] || 1;
                        const imputed = Math.round(p.invested * exit);
                        return (
                          <tr key={p.id} className="hover:bg-white/[0.01]">
                            <td className="py-3.5 font-sans font-bold text-white text-xs">{p.name}</td>
                            <td className="py-3.5">₹{p.invested}M</td>
                            <td className="py-3.5">₹{p.val}M</td>
                            <td className="py-3.5">{p.own}%</td>
                            <td className="py-3.5 flex items-center gap-2.5 max-w-[200px]">
                              <input
                                type="range" min="0.5" max="10" step="0.1"
                                value={exit}
                                onChange={(e) => updateExitMultiple(p.id, Number(e.target.value))}
                                className="w-24 accent-emerald-400"
                              />
                              <span className="text-[10px] font-bold text-emerald-400 font-mono w-10">
                                {exit.toFixed(1)}x
                              </span>
                            </td>
                            <td className="py-3.5 text-right text-white font-bold">₹{imputed}M</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </>
            );
          })()}
        </Page>
      )}

      {/* TAB: INVESTMENT PIPELINE ANALYTICS */}
      {currentTab === "investment_pipeline" && (
        <Page title="Pipeline Funnel & Conversion Analytics" subtitle="Review deal velocity metrics and drop-off indices across active sectors.">
          
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Visual Funnel Card */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Deal Flow Pipeline Funnel</h3>
              <div className="space-y-4">
                {[
                  { stage: "Screening (Top of Funnel)", count: 18, pct: 100, color: "from-emerald-400 to-emerald-500" },
                  { stage: "Meeting (Pitch Evaluated)", count: 9, pct: 50, color: "from-teal-400 to-teal-500" },
                  { stage: "Due Diligence (Audit active)", count: 4, pct: 22, color: "from-cyan-400 to-cyan-500" },
                  { stage: "Term Sheet (Deal negotiating)", count: 2, pct: 11, color: "from-sky-400 to-sky-500" },
                  { stage: "Funded (Portfolio Completed)", count: 3, pct: 16, color: "from-indigo-400 to-indigo-500" },
                ].map((f, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center text-xs mb-1 font-mono text-muted-foreground">
                      <span className="text-white font-bold">{f.stage}</span>
                      <span>{f.count} Startups ({f.pct}%)</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${f.color}`} style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pipeline Velocities */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Conversion Velocity</h3>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Average Days in Screening</div>
                  <div className="text-xl font-bold text-white mt-0.5">8.4 Days</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Diligence Completion Index</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">14.2 Days</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">LP Capital Call SLA</div>
                  <div className="text-xl font-bold text-white mt-0.5">5.0 Business Days</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold text-amber-500">Funnel drop-off reason</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    60% of targets are rejected due to low Customer retention {"(<105% NRR)"} and high churn caps.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: MARKET INTELLIGENCE */}
      {currentTab === "market_intel" && (
        <Page title="Market Intelligence Terminal" subtitle="Live tracking of valuation multiples and regulatory sector benchmarks.">
          
          <div className="mb-4 flex gap-2">
            {["all", "SaaS", "DeepTech", "CleanTech", "BioTech"].map(sec => (
              <button
                key={sec}
                onClick={() => setMarketIntelFilter(sec)}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition ${
                  marketIntelFilter === sec 
                    ? "bg-emerald-500 text-slate-950" 
                    : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {sec.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { sector: "Generative AI Core", averageMultiple: "18-24x ARR", cagr: "+38.4%", trend: "Bullish ⚡", show: ["all", "DeepTech"] },
              { sector: "Enterprise SaaS", averageMultiple: "10-12x ARR", cagr: "+12.1%", trend: "Stabilized", show: ["all", "SaaS"] },
              { sector: "CleanGrid Infrastructure", averageMultiple: "8-11x EBITDA", cagr: "+24.5%", trend: "Accelerating 📈", show: ["all", "CleanTech"] },
              { sector: "Molecular BioSciences", averageMultiple: "15-18x ARR", cagr: "+18.0%", trend: "Stable", show: ["all", "BioTech"] },
            ]
              .filter(s => marketIntelFilter === "all" || s.show.includes(marketIntelFilter))
              .map((item, idx) => (
                <Card key={idx} className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground">Multiples Index</span>
                      <span className="text-[9px] font-bold font-mono text-emerald-400">{item.trend}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-display mt-2">{item.sector}</h4>
                    <div className="text-2xl font-black text-white mt-1.5 font-mono">{item.averageMultiple}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                    <span>Average Sector CAGR:</span>
                    <span className="text-white font-bold">{item.cagr}</span>
                  </div>
                </Card>
              ))}
          </div>
        </Page>
      )}

      {/* TAB: REPORTS */}
      {currentTab === "reports" && (
        <Page title="Syndicate & Limited Partner Reports" subtitle="Generate LP valuation summaries and export audited deal pipelines.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Report Builder */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Syndicate PDF Compiler</h3>
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Configure parameters to generate a cryptographically signed investment report.
                </div>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" defaultChecked className="accent-emerald-400" />
                    Include Cap Table dilution indexes
                  </label>
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" defaultChecked className="accent-emerald-400" />
                    Include active Due Diligence checklists
                  </label>
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" className="accent-emerald-400" />
                    Include forum syndicate proposals
                  </label>
                </div>

                {isCompiling ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>Compiling assets...</span>
                      <span>{compilingProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${compilingProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startCompilingReport("Q2_2026_Vanguard_Portfolio_Report.pdf")}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition flex justify-center items-center gap-1"
                  >
                    Compile LP Portfolio Report
                  </button>
                )}

                {compiledReportName && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-[10px] font-mono">{compiledReportName}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Generated successfully · 2.4 MB</div>
                    </div>
                    <button
                      onClick={() => alert("Report downloaded successfully to system.")}
                      className="p-1 bg-emerald-400 text-slate-950 rounded hover:bg-emerald-300 transition cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* Available Library */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">LP Ledger Reports Library</h3>
              <div className="space-y-3">
                {[
                  { name: "Q1 2026 Vanguard Fund III Audited Ledger.pdf", size: "4.8 MB", date: "2026-04-10" },
                  { name: "Venture Multiples & Dilution Parameters Report Q1.pdf", size: "1.9 MB", date: "2026-03-24" },
                  { name: "SaaS & CleanTech Policy Shift Analysis.pdf", size: "2.1 MB", date: "2026-03-12" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] transition">
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">{item.name}</h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Compiled on {item.date} · {item.size}</p>
                    </div>
                    <button
                      onClick={() => alert(`Downloading file: ${item.name}`)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-white rounded-lg cursor-pointer transition"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: COMMUNITY */}
      {currentTab === "community" && (
        <Page title="Syndicate Investor Forum" subtitle="Co-invest and exchange pipeline leads with verified Venture Partners.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* New Post Form */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Create Syndicate Topic</h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Topic Title</label>
                  <input
                    type="text" required placeholder="e.g. Co-invest opportunity"
                    value={forumTitle} onChange={(e) => setForumTitle(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Syndicate Details</label>
                  <textarea
                    required placeholder="Provide round cap details..."
                    value={forumContent} onChange={(e) => setForumContent(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 h-24 focus:border-emerald-400 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Tag Group</label>
                  <select
                    value={forumTag} onChange={(e) => setForumTag(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                  >
                    <option>Co-investment</option>
                    <option>Valuations</option>
                    <option>Market Intel</option>
                    <option>General</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition"
                >
                  Publish Topic
                </button>
              </form>
            </Card>

            {/* Forums feed */}
            <Card className="md:col-span-2 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Active Syndicate Threads</h3>
              {forumPosts.map(post => (
                <div key={post.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] transition flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleUpvotePost(post.id)}
                      className="p-1 bg-white/5 hover:bg-emerald-500/20 text-muted-foreground hover:text-emerald-400 rounded cursor-pointer transition"
                    >
                      <ChevronUp className="h-4.5 w-4.5" />
                    </button>
                    <span className="text-xs font-bold font-mono text-white mt-1">{post.votes}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground font-mono">Shared by {post.author}</span>
                      <div className="flex gap-1">
                        {post.tags.map(t => (
                          <span key={t} className="text-[8px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5 font-display">{post.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: PROFILE */}
      {currentTab === "profile" && (
        <Page title="GP Investment Thesis profile" subtitle="Configure check parameters to validate deals match your criteria.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Thesis Details Form */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">thesis parameters</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thesis details updated."); }}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Partner Credentials</label>
                    <input
                      type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Active Venture Fund name</label>
                    <input
                      type="text" value={fundName} onChange={(e) => setFundName(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Fund Focus Thesis Statement</label>
                  <textarea
                    value={gpThesis} onChange={(e) => setGpThesis(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 h-20 focus:border-emerald-400 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-mono mb-1 text-muted-foreground">
                    <span>Average target Check Allocation (₹M)</span>
                    <span className="text-emerald-400 font-bold">₹{avgCheckSize}M</span>
                  </div>
                  <input
                    type="range" min="10" max="150" step="5"
                    value={avgCheckSize} onChange={(e) => setAvgCheckSize(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition"
                >
                  Save Thesis Settings
                </button>
              </form>
            </Card>

            {/* Validation match parameters info card */}
            <Card className="md:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Thesis Audit summary</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your current parameters match targets seeking Pre-Seed and Seed investments capped below ₹150M.
                </p>
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-xs text-emerald-400 font-semibold font-mono">
                  ✓ Validated Stage focus: Seed & Series A
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono pt-3 border-t border-white/5">
                Last updated today · 12:24
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: SETTINGS */}
      {currentTab === "settings" && (
        <Page title="Venture Terminal Configurations" subtitle="Review security permissions, matching scores and digest configurations.">
          
          <Card className="max-w-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Security & Operations Ledger</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Auto-approve NDAs</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Automatically sign target NDAs matching standard templates.</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoNda}
                  onChange={() => setAutoNda(!autoNda)}
                  className="h-4.5 w-4.5 rounded accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Two-Factor security key</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Require biometric verification key during check calls.</div>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                  className="h-4.5 w-4.5 rounded accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div className="flex justify-between text-[10px] font-mono mb-2 text-muted-foreground">
                  <span>Minimum Suitability Score Index Threshold</span>
                  <span className="text-emerald-400 font-bold">{minMatchScore}% match</span>
                </div>
                <input
                  type="range" min="50" max="95"
                  value={minMatchScore}
                  onChange={(e) => setMinMatchScore(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Market Intel Digest</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Recurrence rate for sector multiples notifications.</div>
                </div>
                <select
                  value={digestInterval}
                  onChange={(e) => setDigestInterval(e.target.value)}
                  className="text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1"
                >
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly digest</option>
                  <option value="monthly">Monthly summary</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => alert("Configurations updated successfully.")}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition"
              >
                Save Settings
              </button>
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: REWARDS */}
      {currentTab === "rewards" && (
        <Page title="Investor VIP Reward Center" subtitle="Access boarding pass style VIP vouchers, networking dinner passes, and terminal licenses.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <HolographicTicket
              title="GP-LP Annual Summit VIP Dinner"
              subtitle="Entry pass for exclusive networking session at Bangalore Club"
              type="SUMMIT PASS"
              admitNo="VIP-9921"
              validUntil="Oct 12, 2026"
              gradient="from-amber-400 via-yellow-500 to-amber-700"
              accentColor="#f59e0b"
            />
            <HolographicTicket
              title="Y-Combinator Speed Pitching Arena"
              subtitle="Premium fast-track pipeline access to top 20 SaaS developers"
              type="ARENA PASS"
              admitNo="ARN-8812"
              validUntil="Aug 02, 2026"
              gradient="from-emerald-400 via-teal-500 to-cyan-600"
              accentColor="#10b981"
            />
            <HolographicTicket
              title="Bloomberg Terminal Access Voucher"
              subtitle="3-month pro license extension code sponsored by Syndicate Fund"
              type="DATA PASS"
              admitNo="BBG-0021"
              validUntil="Dec 31, 2026"
              gradient="from-blue-400 via-indigo-500 to-purple-600"
              accentColor="#3b82f6"
            />
          </div>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// UNIVERSITY DASHBOARD
// -------------------------------------------------------------

function UniversityDashboard({ currentTab }: { currentTab: string }) {
  // 1. Student Database State
  const [students, setStudents] = useState([
    { id: 1, name: "Aman Gupta", dept: "Computer Science", year: "4th Year", progress: 85, arenaStatus: "Grandmaster", placementStatus: "Placed (Google)", skills: "React, TypeScript, ML", readiness: 95 },
    { id: 2, name: "Sanya Roy", dept: "Electrical Eng", year: "4th Year", progress: 92, arenaStatus: "Expert", placementStatus: "Interview Scheduled (NVIDIA)", skills: "IoT, Python, Embedded C", readiness: 90 },
    { id: 3, name: "Vikram Malhotra", dept: "Mechanical Eng", year: "3rd Year", progress: 60, arenaStatus: "Specialist", placementStatus: "Eligible (Tesla)", skills: "AutoCAD, SolidWorks, MATLAB", readiness: 75 },
    { id: 4, name: "Sneha Nair", dept: "BioTech", year: "4th Year", progress: 78, arenaStatus: "Candidate", placementStatus: "Offers Signed (Biocon)", skills: "Genomics, R, Bioinformatics", readiness: 85 }
  ]);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentDeptFilter, setStudentDeptFilter] = useState("all");
  const [selectedStudentDetailId, setSelectedStudentDetailId] = useState<number | null>(1);

  // 2. Researchers State
  const [researchers, setResearchers] = useState([
    { id: 1, name: "Dr. Elena Rostova", dept: "AI & Data Sciences", papers: 14, citations: 480, patents: 2, progress: 90 },
    { id: 2, name: "Dr. Marcus Vance", dept: "CleanGrid Technology", papers: 9, citations: 210, patents: 1, progress: 75 }
  ]);

  // 3. Faculty State
  const [faculty, setFaculty] = useState([
    { id: 1, name: "Prof. K. Sen", dept: "Computer Science", publications: 28, patents: 4, mentoringCount: 12, supervisionCount: 5 },
    { id: 2, name: "Prof. Sarah Jenkins", dept: "BioTech", publications: 19, patents: 2, mentoringCount: 8, supervisionCount: 3 }
  ]);

  // 4. Placement Drives State
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Sanya Roy", company: "NVIDIA", date: "June 18, 2026", time: "10:30", status: "Scheduled" },
    { id: 2, candidate: "Vikram Malhotra", company: "Tesla", date: "June 20, 2026", time: "14:00", status: "Shortlisted" }
  ]);

  // 5. Incubator Student Startups
  const [incubatorStartups, setIncubatorStartups] = useState([
    { id: 1, name: "CortexML Labs", founder: "Aarav Sharma", sector: "AI & ML", fundingRaised: "₹25M", progress: 65, status: "Incubated" },
    { id: 2, name: "Solaris CleanGrid", founder: "Marcus Vance", sector: "CleanTech", fundingRaised: "₹15M", progress: 50, status: "Pre-Incubated" }
  ]);
  const [showIncubatorModal, setShowIncubatorModal] = useState(false);
  const [newStartupName, setNewStartupName] = useState("");
  const [newStartupFounder, setNewStartupFounder] = useState("");
  const [newStartupSector, setNewStartupSector] = useState("AI & ML");

  const handleRegisterStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStartupName || !newStartupFounder) return;
    setIncubatorStartups(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: newStartupName,
        founder: newStartupFounder,
        sector: newStartupSector,
        fundingRaised: "₹0 (Pre-Seed)",
        progress: 10,
        status: "Pre-Incubated"
      }
    ]);
    setNewStartupName("");
    setNewStartupFounder("");
    setShowIncubatorModal(false);
  };

  // 6. Innovation Hub Challenges State
  const [innovationChallenges, setInnovationChallenges] = useState([
    { id: 1, title: "AI Innovation Challenge 2026", type: "Hackathon", deadline: "June 25", prize: "₹5,00,000 + Incubation", registrants: 45 },
    { id: 2, title: "CleanEnergy Pitch League", type: "Incubator Pitch", deadline: "July 10", prize: "₹3,00,000 seed grant", registrants: 18 }
  ]);

  // 7. Industry Partnerships & MoUs
  const [mous, setMous] = useState([
    { id: 1, partner: "NVIDIA Corp", field: "Deep Learning Research Center Lab", date: "2026-02-12", status: "Active" },
    { id: 2, partner: "Biocon India", field: "Clinical Bioinformatics Cell", date: "2026-03-24", status: "Active" },
    { id: 3, partner: "Tesla Motors", field: "Automated Control Systems Lab", date: "2026-05-01", status: "Pending" }
  ]);

  const handleApproveMou = (id: number) => {
    setMous(prev =>
      prev.map(m => (m.id === id ? { ...m, status: "Active" } : m))
    );
    alert("MoU agreement approved and activated successfully!");
  };

  // 8. Grants & Funding State
  const [grants, setGrants] = useState([
    { id: 1, agency: "DST Government India", title: "Decentralized Quantization ML Models", amount: "₹45L", status: "Approved" },
    { id: 2, agency: "Biocon Labs Sponsor", title: "Genomic Sequencing Acceleration", amount: "₹30L", status: "Under Review" }
  ]);

  const handleApproveGrant = (id: number) => {
    setGrants(prev =>
      prev.map(g => (g.id === id ? { ...g, status: "Approved" } : g))
    );
    alert("DST research grant funding allocated to university registry.");
  };

  // 9. AI University Copilot chatbot State
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Institution Intelligence active. Request student analytics, placement indices forecast, or plan events." }
  ]);
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);

  const triggerCopilotQuery = (queryText: string) => {
    if (copilotLoading) return;
    setMessages(prev => [...prev, { sender: "user", text: queryText }]);
    setCopilotLoading(true);

    setTimeout(() => {
      let response = "";
      if (queryText.toLowerCase().includes("placement")) {
        response = `**AI Placement Prediction Report**
        
*   **Students Eligible:** 120 (4th Year Computer Science / BioTech)
*   **Highest Placement Chance:** CS Department (95% placement readiness)
*   **Key Action Plan:** Focus on Resume reviews and mock coding rounds for the remaining 15% of candidates.
*   *Verdict:* Target placement rate of 98% is mathematically achievable by Q3.`;
      } else if (queryText.toLowerCase().includes("funding") || queryText.toLowerCase().includes("grant")) {
        response = `**University Grants & Funding Analysis**
        
*   **Active Funding Pools:** DST Government Research Grant (₹45L Approved)
*   **Open Applications:** Biocon Labs genomic sponsor check (₹30L Under Review)
*   **Opportunity Alert:** Indian CleanGrid agency has opened applications for a ₹50L solar research grant. Recommend submitting Dr. Vance's proposal.`;
      } else {
        response = `**AI University Admin Digest:**
        
*   Incubator: CortexML Labs holds strong traction (₹25M funding). Solaris CleanTech is prepping Series A.
*   Hackathons: AI Innovation Challenge has 45 registered student squads.
*   Events: Career Fair scheduling is set for October 12, 2026. Auto-synced with MoUs partners.`;
      }

      setMessages(prev => [...prev, { sender: "ai", text: response }]);
      setCopilotLoading(false);
    }, 1200);
  };

  // 10. Reports Compiling Loader State
  const [compilingProgress, setCompilingProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledReportName, setCompiledReportName] = useState<string | null>(null);

  const startCompilingReport = (title: string) => {
    setIsCompiling(true);
    setCompilingProgress(0);
    const interval = setInterval(() => {
      setCompilingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompiling(false);
          setCompiledReportName(title);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  // 11. Alumni Community forum State
  const [forumPosts, setForumPosts] = useState([
    { id: 1, title: "Alumni Meetup: Silicon Valley Chapter Q3", author: "Rahul Verma (Alumnus)", content: "We are organizing the annual alumni roundtable in San Jose. Connecting founders, GPs and senior developers. Masterclass slots available.", votes: 22 },
    { id: 2, title: "Recruitment drive slots opening for CS candidates", author: "Google Campus Lead", content: "NVIDIA and Google HR cells are scheduling campus interviews for student developers next week. Ensure profiles are published.", votes: 48 }
  ]);

  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="University Command Center" subtitle="Institution Command Tower · Placement, research, and incubator registries.">
          
          {/* Welcome Banner */}
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full">
                NBA Tier-1 Accredited Institution
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Welcome back, University Admin 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Campus placement ratios are performing at <strong className="text-emerald-400">94.2%</strong>. Total active grants balance stands at <strong className="text-white">₹75L</strong>. We have <strong className="text-white">{interviews.length} interviews scheduled</strong> today and <strong className="text-white">{incubatorStartups.length} incubated student startups</strong>.
              </p>
            </div>
            
            {/* University Performance Score Dial */}
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Overall University Performance
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-400/20">
                  <div className="absolute inset-0 rounded-full border-2 border-t-blue-400 border-r-blue-400 rotate-45" />
                  <span className="text-[10px] font-bold text-white font-mono">
                    96%
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">NAAC Grade: A++</div>
                  <div className="text-[10px] text-blue-400 font-mono mt-0.5">Top-10 National Rank</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dials / Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Placement rate</span>
                <Briefcase className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">94.2%</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Target: 98% CS placements</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Research impact score</span>
                <Brain className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">88 / 100</div>
              <div className="text-[10px] text-muted-foreground mt-1">690+ Citations registered</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Innovation score</span>
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-500 mt-1">92 / 100</div>
              <div className="text-[10px] text-muted-foreground mt-1">12 Patents filed YTD</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Incubator Capital</span>
                <Coins className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">₹40M Total</div>
              <div className="text-[10px] text-muted-foreground mt-1">CortexML & Solaris projects</div>
            </Card>
          </div>

          {/* Today's Events & Activities */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-blue-400" /> Scheduled Campus Interviews
              </h3>
              <div className="space-y-3">
                {interviews.map(i => (
                  <div key={i.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-blue-400/10 text-blue-400 px-2 py-0.5 rounded font-bold">
                          {i.date} at {i.time}
                        </span>
                        <span className="text-[10px] text-muted-foreground">Candidate: {i.candidate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5">Recruiter: {i.company}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Status: {i.status}</p>
                    </div>
                    <button onClick={() => alert("Connecting to virtual recruiter board...")} className="px-3.5 py-1.5 bg-blue-500 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition">
                      View Portal
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Quick Actions</h3>
              <div className="space-y-2">
                <a href="?tab=placements" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  💼 Launch Placement Funnel
                </a>
                <a href="?tab=reports" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  📝 Compile NAAC Reports
                </a>
                <a href="?tab=uni_copilot" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  🔮 Ask AI University Copilot
                </a>
              </div>
            </Card>
          </div>

          {/* Success Wall Outcome Gallery */}
          <Card className="border border-blue-400/20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="absolute top-0 right-0 h-40 w-40 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Trophy className="h-4.5 w-4.5 text-blue-400" /> Success Wall Outcomes (Social Proof credentials)
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Placed at Google", user: "Aman Gupta", detail: "CS senior secured placement as an AI Engineer at Google India.", label: "₹38L Package" },
                { title: "Nature Paper Published", user: "Dr. Elena Rostova", detail: "Quantization models benchmark accepted by Nature Research.", label: "Nature Approved" },
                { title: "₹25M Capital Raised", user: "CortexML Labs", detail: "Student incubated startup closed seed funding round.", label: "Incubator Success" },
                { title: "CleanGrid Patent Filed", user: "Dr. Marcus Vance", detail: "Technology transfer finalized for CleanEnergy grid patent.", label: "Patent Filed" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/60 relative">
                  <span className="text-[8px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded font-bold uppercase">
                    {item.label}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-2 font-display">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                  <div className="mt-3.5 text-[9px] font-mono text-white/70">
                    Candidate: {item.user}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: STUDENTS */}
      {currentTab === "students_list" && (
        <Page title="Student Operating Directory" subtitle="Reconcile student directory details, skill scores, and placement statuses.">
          
          <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
            <div className="flex gap-2">
              {["all", "Computer Science", "Electrical Eng", "Mechanical Eng", "BioTech"].map(dept => (
                <button
                  key={dept}
                  onClick={() => setStudentDeptFilter(dept)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition ${
                    studentDeptFilter === dept 
                      ? "bg-blue-500 text-slate-950" 
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"
                  }`}
                >
                  {dept.toUpperCase()}
                </button>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Search student directories..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 focus:border-blue-400 focus:outline-none w-full md:max-w-xs"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Spreadsheet Grid */}
            <Card className="md:col-span-2 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] uppercase font-mono text-muted-foreground tracking-wider">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Department</th>
                    <th className="py-2.5">Arena Status</th>
                    <th className="py-2.5">Placement Status</th>
                    <th className="py-2.5 text-right">Readiness Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {students
                    .filter(s => studentDeptFilter === "all" || s.dept === studentDeptFilter)
                    .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.skills.toLowerCase().includes(studentSearch.toLowerCase()))
                    .map(s => (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedStudentDetailId(s.id)}
                        className={`hover:bg-white/[0.01] cursor-pointer transition ${
                          selectedStudentDetailId === s.id ? "bg-blue-500/5" : ""
                        }`}
                      >
                        <td className="py-3.5 font-sans font-bold text-white text-xs">{s.name}</td>
                        <td className="py-3.5 text-[10px] text-muted-foreground">{s.dept} · {s.year}</td>
                        <td className="py-3.5 text-blue-400">{s.arenaStatus}</td>
                        <td className="py-3.5 text-white/95 text-[10px] font-sans">{s.placementStatus}</td>
                        <td className="py-3.5 text-right text-emerald-400 font-bold">{s.readiness}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>

            {/* Sidebar details */}
            <Card className="md:col-span-1">
              {(() => {
                const target = students.find(s => s.id === selectedStudentDetailId);
                if (!target) return <div className="text-xs text-muted-foreground text-center">Select a candidate profile</div>;
                return (
                  <div>
                    <h4 className="text-sm font-bold text-white font-display border-b border-white/5 pb-2 mb-3">
                      {target.name} · {target.dept}
                    </h4>
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Academic progress:</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${target.progress}%` }} />
                          </div>
                          <span className="font-mono text-white">{target.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Verified Skills:</div>
                        <div className="text-white mt-0.5 font-mono">{target.skills}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Placement Status:</div>
                        <div className="text-blue-400 mt-0.5 font-bold">{target.placementStatus}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Success Score Index:</div>
                        <div className="text-emerald-400 mt-0.5 font-mono font-bold">{target.readiness}% Readiness</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: RESEARCHERS */}
      {currentTab === "researchers_list" && (
        <Page title="Research Investigators Database" subtitle="Track publications, citations indices and patent allocations across academic departments.">
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchers.map(r => (
              <Card key={r.id}>
                <div className="flex justify-between items-start text-xs mb-2">
                  <span className="text-muted-foreground font-mono">{r.dept}</span>
                  <span className="text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded font-bold font-mono">
                    Impact: {r.progress}%
                  </span>
                </div>
                
                <h4 className="text-sm font-bold text-white font-display">{r.name}</h4>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-xs text-white">
                  <div className="p-2 bg-white/[0.01] rounded border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Papers</div>
                    <div className="text-base font-bold mt-0.5">{r.papers}</div>
                  </div>
                  <div className="p-2 bg-white/[0.01] rounded border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Citations</div>
                    <div className="text-base font-bold mt-0.5">{r.citations}</div>
                  </div>
                  <div className="p-2 bg-white/[0.01] rounded border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Patents</div>
                    <div className="text-base font-bold mt-0.5">{r.patents}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: FACULTY PROFILES */}
      {currentTab === "faculty" && (
        <Page title="Faculty Directory" subtitle="Audit faculty contributions, project supervisions, and student mentorship counters.">
          
          <div className="grid gap-6 md:grid-cols-2">
            {faculty.map(f => (
              <Card key={f.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{f.name}</h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Department: {f.dept}</p>
                  
                  <div className="mt-3.5 flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-white">Publications: {f.publications}</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded text-white">Patents: {f.patents}</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-muted-foreground">
                  <div>Mentees Allocated: <strong className="text-white">{f.mentoringCount} Candidates</strong></div>
                  <div>Supervisions: <strong className="text-white">{f.supervisionCount} Projects</strong></div>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: PLACEMENTS */}
      {currentTab === "placements" && (
        <Page title="Campus Placement Command Center" subtitle="Audit placement funnels, companies visits schedules, and package metrics.">
          
          {/* funnel and packages */}
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Stat label="Average Placement Package" value="₹12.8L / Annum" tone="electric" />
            <Stat label="Highest Placements Package" value="₹44.0L / Annum" tone="violet" />
            
            <Card>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Eligible Students Placed</div>
              <div className="mt-2 font-display text-3xl font-semibold text-blue-400">
                94.2% (113/120)
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">7 students negotiating offers</div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Funnel breakdown */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Active placement Drive Funnel</h3>
              <div className="space-y-4">
                {[
                  { stage: "Candidates Registered", count: 120, pct: 100, color: "from-blue-400 to-blue-500" },
                  { stage: "Assessment Cleared", count: 96, pct: 80, color: "from-purple-400 to-purple-500" },
                  { stage: "Interviews Scheduled", count: 48, pct: 40, color: "from-cyan-400 to-cyan-500" },
                  { stage: "Offers Extended", count: 18, pct: 15, color: "from-emerald-400 to-emerald-500" },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center text-xs mb-1 font-mono text-muted-foreground">
                      <span className="text-white font-bold">{item.stage}</span>
                      <span>{item.count} Candidates ({item.pct}%)</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Visiting Recruiter Panels</h3>
              <div className="space-y-2 text-xs font-mono text-muted-foreground">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white">Google India</span>
                  <span className="text-emerald-400 font-bold">12 Selected</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white">NVIDIA Research</span>
                  <span className="text-emerald-400 font-bold">6 Selected</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white">Tesla Motors</span>
                  <span className="text-emerald-400 font-bold">2 Selected</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white">Biocon Genomics</span>
                  <span className="text-emerald-400 font-bold">8 Selected</span>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: STARTUP INCUBATOR */}
      {currentTab === "startup_incubator" && (
        <Page title="University Startup Incubator" subtitle="Empower student spin-offs, track incubator funds, and register pitch events.">
          
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Active incubated student ventures and mentoring programs.</span>
            <button
              onClick={() => setShowIncubatorModal(!showIncubatorModal)}
              className="px-3.5 py-1.5 bg-blue-500 text-slate-950 hover:bg-blue-400 text-[10px] font-bold rounded-lg cursor-pointer transition flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" /> Incubate Startup
            </button>
          </div>

          {/* Incubate Startup Modal Form */}
          {showIncubatorModal && (
            <Card className="mb-6 border border-blue-400/20 max-w-xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Register Incubator Spin-off</h3>
              <form onSubmit={handleRegisterStartup} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Startup Project Name</label>
                    <input
                      type="text" required placeholder="e.g. CleanGrid AI"
                      value={newStartupName} onChange={(e) => setNewStartupName(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Founder / Student Name</label>
                    <input
                      type="text" required placeholder="Aman Gupta"
                      value={newStartupFounder} onChange={(e) => setNewStartupFounder(e.target.value)}
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Technology Sector</label>
                  <select
                    value={newStartupSector} onChange={(e) => setNewStartupSector(e.target.value)}
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-blue-400 focus:outline-none"
                  >
                    <option>AI & ML</option>
                    <option>CleanTech</option>
                    <option>BioTech</option>
                    <option>EdTech</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 text-[10px] font-bold rounded cursor-pointer transition"
                >
                  Confirm Incubation
                </button>
              </form>
            </Card>
          )}

          {/* Startups grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {incubatorStartups.map(s => (
              <Card key={s.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                    <span className="text-muted-foreground">{s.sector}</span>
                    <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-0.5 rounded uppercase">
                      {s.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">{s.name}</h4>
                  <div className="text-xs text-muted-foreground mt-1">Founder: {s.founder}</div>
                  <div className="text-[10px] text-amber-500 font-mono mt-1.5 font-semibold">Funding Raised: {s.fundingRaised}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex justify-between text-[9px] text-muted-foreground mb-0.5">
                    <span>Incubator checklist progress</span>
                    <span>{s.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: INNOVATION HUB */}
      {currentTab === "innovation_hub" && (
        <Page title="University Innovation & Hackathon League" subtitle="Register student teams for innovation challenges and hackathons.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Active Innovation challenges</h3>
              <div className="space-y-3">
                {innovationChallenges.map(c => (
                  <div key={c.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">
                          {c.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground">Deadline: {c.deadline}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5 font-sans">{c.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Award: {c.prize}</p>
                    </div>
                    <button
                      onClick={() => {
                        setInnovationChallenges(prev =>
                          prev.map(ch => ch.id === c.id ? { ...ch, registrants: ch.registrants + 1 } : ch)
                        );
                        alert("Registered a new student team!");
                      }}
                      className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition flex items-center gap-1"
                    >
                      Register Team ({c.registrants})
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Technology Transfer pipeline</h3>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground font-mono">
                <div className="p-2.5 rounded bg-white/[0.01] border border-white/5 text-white/90">
                  <strong>✓ LLM Quantization Transfer:</strong> Licenced to CortexML Labs for commercialization under MoU terms.
                </div>
                <div className="p-2.5 rounded bg-white/[0.01] border border-white/5 text-white/90">
                  <strong>✓ Solaris Solar Grid:</strong> Licensing agreement drafted with corporate partners.
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: INDUSTRY PARTNERSHIPS */}
      {currentTab === "partners" && (
        <Page title="Corporate Partnerships & MoUs" subtitle="Manage university research partnerships, corporate agreements and MoUs.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Memorandum of Understanding (MoUs) Registry</h3>
              <div className="space-y-3">
                {mous.map(m => (
                  <div key={m.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                          MoU Signed: {m.date}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5 font-sans">{m.partner}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Focus field: {m.field}</p>
                    </div>

                    {m.status === "Pending" ? (
                      <button
                        onClick={() => handleApproveMou(m.id)}
                        className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition"
                      >
                        Approve MoU
                      </button>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono bg-emerald-400/10 px-2 py-0.5 rounded">
                        Active Agreement
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Corporate Sponsors</h3>
              <div className="space-y-2 text-xs font-mono text-muted-foreground">
                <div className="p-2 border border-white/5 rounded bg-white/[0.01]">
                  <strong>NVIDIA AI Lab Sponsorship:</strong> Sponsored ₹20L GPU compute units for research.
                </div>
                <div className="p-2 border border-white/5 rounded bg-white/[0.01]">
                  <strong>Biocon Indian Biotech Sponsorship:</strong> Sponsored ₹15L lab sequencing reagents.
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: RESEARCH CENTER */}
      {currentTab === "research_center" && (
        <Page title="University Research Center" subtitle="Audit publication lists, patents filed, and academic citations analytics.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Recent Publications & Abstracts</h3>
              <div className="space-y-3 font-mono text-xs text-muted-foreground">
                {[
                  { title: "Local weight quantization for Mistral LLM variants", author: "Dr. Elena Rostova", citations: 45, date: "2026-05" },
                  { title: "Bioinformatics optimization for high throughput DNA sequencing", author: "Dr. Sarah Jenkins", citations: 28, date: "2026-04" },
                ].map((pub, idx) => (
                  <div key={idx} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02]">
                    <div className="flex justify-between items-center text-[9px] mb-1.5">
                      <span>Author: {pub.author} · citations: {pub.citations}</span>
                      <span>{pub.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans">{pub.title}</h4>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Patents Ledger</h3>
              <div className="space-y-3 text-xs font-mono text-white/90">
                <div className="p-2.5 rounded bg-white/[0.01] border border-white/5">
                  <strong>✓ Decentralized Quantization:</strong> Patent #IN-99212 approved and filed.
                </div>
                <div className="p-2.5 rounded bg-white/[0.01] border border-white/5">
                  <strong>✓ Genomic Sequencing Engine:</strong> Patent #IN-48191 submitted.
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: GRANTS & FUNDING */}
      {currentTab === "grants" && (
        <Page title="Grants & Research Funding Center" subtitle="Track Government sponsorships, industry grants applications and scholarships.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Grant Applications Status</h3>
              <div className="space-y-3">
                {grants.map(g => (
                  <div key={g.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                          Agency: {g.agency}
                        </span>
                        <span className="text-amber-500 font-bold font-mono text-[10px]">{g.amount}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5 font-sans">{g.title}</h4>
                    </div>

                    {g.status === "Under Review" ? (
                      <button
                        onClick={() => handleApproveGrant(g.id)}
                        className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition"
                      >
                        Approve Grant Allocation
                      </button>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono bg-emerald-400/10 px-2 py-0.5 rounded">
                        ✓ Capital Received
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Funding Allocations Summary</h3>
              <div className="space-y-3 text-xs font-mono text-muted-foreground">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>DST Govt Grants:</span>
                  <span className="text-white">₹45,00,000</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>NVIDIA Lab Sponsors:</span>
                  <span className="text-white">₹20,00,000</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Biocon India Lab Sponsors:</span>
                  <span className="text-white">₹15,00,000</span>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: EVENTS */}
      {currentTab === "events" && (
        <Page title="University Events Center" subtitle="Schedule hackathons, career recruitment fairs and research roundtables.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">roundtable Panel Events Schedule</h3>
              <div className="space-y-3">
                {[
                  { topic: "NBA Tier-1 Compliance Review panel", date: "June 20, 2026", time: "11:00", status: "Open" },
                  { topic: "University Annual Alumni Career Fair", date: "October 12, 2026", time: "09:00", status: "Scheduling" }
                ].map((ev, idx) => (
                  <div key={idx} className="p-4 border border-white/5 rounded-xl bg-white/[0.01]">
                    <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground mb-1.5">
                      <span>{ev.date} at {ev.time}</span>
                      <span className="text-blue-400 font-bold">{ev.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans">{ev.topic}</h4>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Auditorium Allocations</h3>
              <div className="text-xs text-muted-foreground font-mono space-y-2">
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded">
                  <strong>Auditorium A:</strong> Reserved for Google Campus recruiting drive interviews.
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded">
                  <strong>Lab Cell B:</strong> Reserved for NVIDIA GPU local Quantization trial runs.
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ANALYTICS */}
      {currentTab === "analytics" && (
        <Page title="Performance Metrics & Analytics Center" subtitle="Institution analytics dashboards served directly from database.">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Department Performance Index</h3>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { dept: "Computer Science & Data", score: 96, color: "bg-blue-500" },
                  { dept: "BioTechnology Genomics Cell", score: 88, color: "bg-purple-500" },
                  { dept: "Electrical Systems Control Eng", score: 78, color: "bg-cyan-500" }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-muted-foreground text-[10px] mb-1">
                      <span className="text-white font-semibold">{item.dept}</span>
                      <span>{item.score}% Performance</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="flex flex-col justify-center items-center text-center">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Student Success rate Index</h3>
              <div className="text-4xl font-black text-blue-400 font-display">94.2%</div>
              <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                94.2% placement eligibility ratio recorded across NBA accredited academic tracks.
              </p>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: REPORTS */}
      {currentTab === "reports" && (
        <Page title="NAAC & NBA Compliance Report Center" subtitle="Generate institution accreditation board reports and board slides.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Report compiler */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Accreditation PDF Compiler</h3>
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Configure metrics parameters to build audited NAAC reports.
                </div>
                
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" defaultChecked className="accent-blue-500" />
                    Include Placement funnel rates
                  </label>
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" defaultChecked className="accent-blue-500" />
                    Include citations and patents indices
                  </label>
                  <label className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" className="accent-blue-500" />
                    Include MoU corporate sponsors listings
                  </label>
                </div>

                {isCompiling ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>Compiling assets...</span>
                      <span>{compilingProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${compilingProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startCompilingReport("NAAC_Tier1_Accreditation_Report_2026.pdf")}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition flex justify-center items-center gap-1"
                  >
                    Compile NAAC Compliance Report
                  </button>
                )}

                {compiledReportName && (
                  <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-[10px] font-mono">{compiledReportName}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Generated successfully · 5.4 MB</div>
                    </div>
                    <button
                      onClick={() => alert("NAAC PDF report downloaded successfully.")}
                      className="p-1 bg-blue-400 text-slate-950 rounded hover:bg-blue-300 transition cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* List */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Available Reports Vault</h3>
              <div className="space-y-3">
                {[
                  { name: "NBA_Tier1_Accreditation_Report.pdf", size: "3.2 MB", date: "2026-05" },
                  { name: "National_Institution_Rankings_Ledger.pdf", size: "1.8 MB", date: "2026-04" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] transition">
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">{item.name}</h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Compiled {item.date} · Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => alert(`Downloading report: ${item.name}`)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-white rounded-lg cursor-pointer transition"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: AI UNIVERSITY COPILOT */}
      {currentTab === "uni_copilot" && (
        <Page title="University AI Copilot" subtitle="Institution AI assistant for placement predictions, events drafting and grant analysis.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Quick Prompts */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Suggested Queries</h3>
              <div className="space-y-2">
                {[
                  "Predict placement readiness ratios CS department",
                  "Audit DST research grant budget funding caps",
                  "Generate draft template for Google Campus interview panels",
                  "Summarize NAAC accreditation checklist parameters"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerCopilotQuery(q)}
                    className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition leading-relaxed"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat Box */}
            <Card className="md:col-span-2 flex flex-col h-[480px]">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
                <Bot className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-bold text-white font-mono uppercase">University AI Terminal</span>
              </div>

              {/* Chat Output */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-lg text-xs leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-blue-500 text-slate-950 font-medium" 
                        : "bg-white/[0.02] border border-white/5 text-white/90"
                    }`}>
                      <div className="whitespace-pre-line">{m.text}</div>
                    </div>
                  </div>
                ))}
                {copilotLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-muted-foreground italic font-mono">
                      Copilot is evaluating university data points...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!copilotInput.trim()) return;
                  triggerCopilotQuery(copilotInput);
                  setCopilotInput("");
                }}
                className="flex gap-2 border-t border-white/5 pt-3"
              >
                <input
                  type="text"
                  placeholder="Ask a question about placements, grants registries or MoUs..."
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  className="flex-1 text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-2 focus:border-blue-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 hover:bg-blue-400 text-slate-950 rounded-xl cursor-pointer transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: COMMUNITY */}
      {currentTab === "community" && (
        <Page title="University Roundtable Forum" subtitle="Participate in campus roundtables and alumni check-ins.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">roundtable Threads</h3>
              {forumPosts.map(post => (
                <div key={post.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] transition flex items-start gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, votes: p.votes + 1 } : p))}
                      className="p-1 bg-white/5 hover:bg-blue-500/20 text-muted-foreground hover:text-blue-400 rounded cursor-pointer transition"
                    >
                      <ChevronUp className="h-4.5 w-4.5" />
                    </button>
                    <span className="text-xs font-bold font-mono text-white mt-1">{post.votes}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground font-mono">Shared by {post.author}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5 font-display">{post.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>
              ))}
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Alumni chapter Registrations</h3>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <div className="p-3 border border-white/5 rounded bg-white/[0.01]">
                  <strong>✓ Bangalore Alumni Chapter:</strong> Sync scheduled for July 12. 45 registered alumni.
                </div>
                <div className="p-3 border border-white/5 rounded bg-white/[0.01]">
                  <strong>✓ Mumbai Tech Roundtable:</strong> Sync scheduled for August 01. 18 registered recruiters.
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: SETTINGS */}
      {currentTab === "settings" && (
        <Page title="University Portal Configurations" subtitle="Configure NDA templates auto-signatures, 2FA locks and report tokens.">
          
          <Card className="max-w-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Compliance & Security configurations</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Auto-approve Industry MoUs</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Automatically approve partnerships complying with Tier-1 university bylaws.</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4.5 w-4.5 rounded accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Require accreditation 2FA keys</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Two-factor biometric check required when modifying NBA/NAAC compliance ledgers.</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4.5 w-4.5 rounded accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => alert("Configurations saved successfully.")}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer transition"
              >
                Save Settings
              </button>
            </div>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// INDUSTRY EXPERT / MENTOR DASHBOARD
// -------------------------------------------------------------

function ExpertDashboard({ currentTab }: { currentTab: string }) {
  // 1. Client Management CRM State
  const [clients, setClients] = useState([
    { id: 1, name: "Aarav Sharma", category: "Founder", schoolOrCompany: "CortexML Labs", goal: "Raise pre-seed Safe note", progress: 65, successScore: 92, milestone: "Incorporate Delaware C-Corp", sessionsCount: 6, priority: "High", status: "Active" },
    { id: 2, name: "Priya Patel", category: "Researcher", schoolOrCompany: "IISc Bangalore", goal: "Publish GenAI optimization paper", progress: 80, successScore: 95, milestone: "Peer abstract revisions", sessionsCount: 8, priority: "Medium", status: "Active" },
    { id: 3, name: "Rohan Das", category: "Student", schoolOrCompany: "IIT Bombay", goal: "Secure AI Research Placement", progress: 45, successScore: 88, milestone: "Build project portfolio", sessionsCount: 3, priority: "High", status: "Active" },
    { id: 4, name: "Prof. K. Sen", category: "University", schoolOrCompany: "BITS Pilani", goal: "Launch DeepTech Incubator", progress: 30, successScore: 78, milestone: "Corporate sponsorship drive", sessionsCount: 2, priority: "Low", status: "Pending" },
  ]);
  const [clientSearch, setClientSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [selectedClientDetailId, setSelectedClientDetailId] = useState<number | null>(1);

  // 2. Discovery Sessions Requests State
  const [discoveryRequests, setDiscoveryRequests] = useState([
    { id: 101, name: "Neha Sen", category: "Founder", topic: "SaaS growth pricing metrics", score: 85, challenges: "High initial churn, low self-serve trial rate", goals: "Optimize LTV/CAC ratio, double trial conversion", docName: "Pricing_Proposal_Draft.pdf", note: "Recommended: Schedule call to audit bottom-up TAM.", status: "Pending" },
    { id: 102, name: "Aditya Verma", category: "Student", topic: "Vite+React routing optimization", score: 72, challenges: "Difficulty managing lazy states, tanstack routers", goals: "Resolve chunk load error, structure route components", docName: "Project_Proposal.pdf", note: "Recommended: Approve for career path review.", status: "Pending" },
  ]);

  const handleApproveDiscovery = (id: number) => {
    const req = discoveryRequests.find(r => r.id === id);
    if (!req) return;
    
    // Add to clients list
    const nextClientId = Math.max(...clients.map(c => c.id), 0) + 1;
    setClients(prev => [
      ...prev,
      {
        id: nextClientId,
        name: req.name,
        category: req.category,
        schoolOrCompany: req.category === "Founder" ? "Venture Lead" : "Independent",
        goal: req.goals,
        progress: 10,
        successScore: req.score,
        milestone: "Discovery consultation setup",
        sessionsCount: 1,
        priority: "Medium",
        status: "Active"
      }
    ]);

    // Update roadmaps state
    setRoadmaps(prev => ({
      ...prev,
      [nextClientId]: {
        milestones: [
          { id: 1, title: "Discovery Consultation Session", deadline: "June 25", deliverables: req.topic, done: true },
          { id: 2, title: "Core Goal Mapping", deadline: "July 15", deliverables: "Detailed execution plan", done: false }
        ]
      }
    }));

    // Update discovery list
    setDiscoveryRequests(prev => prev.filter(r => r.id !== id));
    alert(`Success: Approved ${req.name}'s request. User has been added to client list.`);
  };

  // 3. Consultations Sessions State
  const [sessions, setSessions] = useState([
    { id: 1, clientName: "Aarav Sharma", topic: "Cap Table Structure Review", date: "Today", time: "15:00", duration: "45 mins", recordingUrl: "simulated_recording_cap_table.mp4", status: "Upcoming", notes: "Review post-money Safe option pools and dilution caps.", actions: ["Incorporate Delaware C-Corp", "Draft Option Pool proposal"] },
    { id: 2, clientName: "Priya Patel", topic: "LaTeX Publication Final Polish", date: "Yesterday", time: "11:00", duration: "60 mins", recordingUrl: "simulated_recording_latex.mp4", status: "Completed", notes: "LaTeX equations compiled successfully. Suggested Mistral comparison charts.", actions: ["Include parameter density comparisons", "Submit abstract draft"] },
  ]);
  const [consultNotes, setConsultNotes] = useState("");
  const [newActionItem, setNewActionItem] = useState("");

  const handleAddActionItem = (sessionId: number) => {
    if (!newActionItem.trim()) return;
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, actions: [...s.actions, newActionItem] } : s))
    );
    setNewActionItem("");
  };

  // 4. Arena Rewards Tickets State
  const [rewardTickets, setRewardTickets] = useState([
    { id: "TKT-4891", type: "Free 1-on-1 Mentorship Session", clientName: "Rohan Das", expiryDate: "2026-07-15", priority: "High", status: "Pending" },
    { id: "TKT-1192", type: "Startup Pitch Deck Audit Pass", clientName: "Aarav Sharma", expiryDate: "2026-08-01", priority: "Critical", status: "Pending" },
    { id: "TKT-3829", type: "Resume & Portfolio Review", clientName: "Neha Sen", expiryDate: "2026-06-30", priority: "Medium", status: "Approved" },
  ]);

  const handleTicketStatus = (id: string, nextStatus: string) => {
    setRewardTickets(prev =>
      prev.map(t => (t.id === id ? { ...t, status: nextStatus } : t))
    );
    alert(`Ticket ID: ${id} status updated to ${nextStatus}.`);
  };

  // 5. Custom Roadmaps State
  const [activeRoadmapClient, setActiveRoadmapClient] = useState(1);
  const [roadmaps, setRoadmaps] = useState<Record<number, {
    milestones: { id: number; title: string; deadline: string; deliverables: string; done: boolean }[];
  }>>({
    1: {
      milestones: [
        { id: 1, title: "Formulate Core Thesis", deadline: "June 20", deliverables: "Thesis abstract document approved", done: true },
        { id: 2, title: "Delaware C-Corp Incorporation", deadline: "July 10", deliverables: "Certificate of Good Standing", done: false },
        { id: 3, title: "Draft Option Pool Shares", deadline: "July 25", deliverables: "Option pool expansion document", done: false },
      ]
    },
    2: {
      milestones: [
        { id: 1, title: "Run experimental baseline runs", deadline: "June 25", deliverables: "Results table compiled", done: true },
        { id: 2, title: "Draft peer comparison section", deadline: "July 12", deliverables: "Mistral & Llama benchmarking graphs", done: true },
        { id: 3, title: "LaTeX abstract submission", deadline: "August 01", deliverables: "Final PDF submitted to review board", done: false },
      ]
    },
    3: {
      milestones: [
        { id: 1, title: "Complete ML baseline models", deadline: "June 18", deliverables: "GitHub repository setup", done: true },
        { id: 2, title: "Create project portfolio resume", deadline: "June 28", deliverables: "Online portfolio site on Vercel", done: false }
      ]
    },
    4: {
      milestones: [
        { id: 1, title: "Sponsorship pitch deck validation", deadline: "July 01", deliverables: "12-slide business incubator plan", done: false }
      ]
    }
  });

  const toggleMilestone = (clientId: number, milestoneId: number) => {
    setRoadmaps(prev => {
      const list = prev[clientId]?.milestones || [];
      const updated = list.map(m => (m.id === milestoneId ? { ...m, done: !m.done } : m));
      
      // Update overall progress in clients state
      const doneCount = updated.filter(m => m.done).length;
      const progressPct = list.length > 0 ? Math.round((doneCount / list.length) * 100) : 0;
      
      setClients(prevClients =>
        prevClients.map(c => (c.id === clientId ? { ...c, progress: progressPct } : c))
      );

      return {
        ...prev,
        [clientId]: { milestones: updated }
      };
    });
  };

  const [newRoadmapTitle, setNewRoadmapTitle] = useState("");
  const [newRoadmapDate, setNewRoadmapDate] = useState("");
  const [newRoadmapDeliv, setNewRoadmapDeliv] = useState("");

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoadmapTitle || !newRoadmapDate) return;
    
    setRoadmaps(prev => {
      const list = prev[activeRoadmapClient]?.milestones || [];
      const nextId = Math.max(...list.map(m => m.id), 0) + 1;
      const updated = [
        ...list,
        {
          id: nextId,
          title: newRoadmapTitle,
          deadline: newRoadmapDate,
          deliverables: newRoadmapDeliv,
          done: false
        }
      ];

      // Update client overall progress ratio
      const doneCount = updated.filter(m => m.done).length;
      const progressPct = Math.round((doneCount / updated.length) * 100);
      setClients(prevClients =>
        prevClients.map(c => (c.id === activeRoadmapClient ? { ...c, progress: progressPct } : c))
      );

      return {
        ...prev,
        [activeRoadmapClient]: { milestones: updated }
      };
    });

    setNewRoadmapTitle("");
    setNewRoadmapDate("");
    setNewRoadmapDeliv("");
  };

  // 6. Visual Task Center Board
  const [tasks, setTasks] = useState([
    { id: 1, clientId: 1, title: "Audit Delaware incorporation charter files", column: "todo", deadline: "June 18", clientName: "Aarav Sharma" },
    { id: 2, clientId: 1, title: "Complete pre-seed SAFE parameters validation checks", column: "progress", deadline: "June 22", clientName: "Aarav Sharma" },
    { id: 3, clientId: 2, title: "Revise section 3 peer LaTeX annotations", column: "review", deadline: "June 15", clientName: "Priya Patel" },
    { id: 4, clientId: 3, title: "Implement light/dark theme dashboard layouts", column: "done", deadline: "June 10", clientName: "Rohan Das" },
  ]);

  const moveTask = (id: number, nextCol: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, column: nextCol } : t)));
  };

  const handleApproveSubmission = (id: number) => {
    moveTask(id, "done");
    alert("Deliverable audited and marked as completed!");
  };

  // 7. Meeting Hub States
  const [meetings, setMeetings] = useState([
    { id: 1, client: "Aarav Sharma", type: "Zoom", date: "Today", time: "15:00", link: "https://zoom.us/j/99212019", topic: "Cap Table Option Pools Audit", status: "Active" },
    { id: 2, client: "Priya Patel", type: "Google Meet", date: "June 15", time: "11:00", link: "https://meet.google.com/abc-def-ghi", topic: "Revising LaTeX calculations", status: "Scheduled" }
  ]);

  const [activeAdvisoryRoom, setActiveAdvisoryRoom] = useState<string | null>(null);
  const [advisoryNotes, setAdvisoryNotes] = useState("");
  const [virtualTimer, setVirtualTimer] = useState(0);

  useEffect(() => {
    let t: any;
    if (activeAdvisoryRoom) {
      t = setInterval(() => setVirtualTimer(prev => prev + 1), 1000);
    } else {
      setVirtualTimer(0);
    }
    return () => clearInterval(t);
  }, [activeAdvisoryRoom]);

  // 8. Client Workspace Chat State
  const [activeWorkspaceClient, setActiveWorkspaceClient] = useState(1);
  const [workspaceChats, setWorkspaceChats] = useState<Record<number, { sender: string; text: string; time: string }[]>>({
    1: [
      { sender: "client", text: "Dr. John, I have uploaded our incorporate Delaware files. Can you review?", time: "10:15" },
      { sender: "expert", text: "Got it Aarav. I will run the AI audit in the Documents vault shortly.", time: "10:20" }
    ],
    2: [
      { sender: "client", text: "We compiled the LaTeX paper benchmark draft successfully.", time: "Yesterday" }
    ]
  });
  const [workspaceInput, setWorkspaceInput] = useState("");

  const handleSendWorkspaceChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceInput.trim()) return;
    
    setWorkspaceChats(prev => {
      const chats = prev[activeWorkspaceClient] || [];
      return {
        ...prev,
        [activeWorkspaceClient]: [
          ...chats,
          { sender: "expert", text: workspaceInput, time: "Just now" }
        ]
      };
    });
    setWorkspaceInput("");
  };

  // 9. Document Analysis State (Annotations Review)
  const [selectedDocId, setSelectedDocId] = useState(1);
  const [runAuditLoading, setRunAuditLoading] = useState(false);
  const [auditComplete, setAuditComplete] = useState<Record<number, boolean>>({});
  
  const documents = [
    { id: 1, name: "Aarav_Pre-Seed_PitchDeck.pdf", type: "Pitch Deck", client: "Aarav Sharma" },
    { id: 2, name: "Priya_GenAI_Optimization_Abstract.tex", type: "LaTeX Document", client: "Priya Patel" },
    { id: 3, name: "Rohan_Portfolio_CV.pdf", type: "Resume", client: "Rohan Das" }
  ];

  const handleRunDocumentAudit = (id: number) => {
    setRunAuditLoading(true);
    setTimeout(() => {
      setAuditComplete(prev => ({ ...prev, [id]: true }));
      setRunAuditLoading(false);
    }, 1500);
  };

  // 10. AI Expert Orb Chat State
  const [orbMessages, setOrbMessages] = useState([
    { sender: "ai", text: "Advisor Intelligence Orb active. Tweak credentials, write summaries, or request recommendations." }
  ]);
  const [orbInput, setOrbInput] = useState("");
  const [orbLoading, setOrbLoading] = useState(false);

  const triggerOrbAdvisory = (text: string) => {
    if (orbLoading) return;
    setOrbMessages(prev => [...prev, { sender: "user", text }]);
    setOrbLoading(true);

    setTimeout(() => {
      let res = "";
      if (text.toLowerCase().includes("report")) {
        res = `**Advisory Report draft — Vanguard Catalyst**
        
*   **Target Client:** Aarav Sharma (CortexML Labs)
*   **Venture Thesis:** Quantization models show LATENCY: 12ms. Competitors hover at 30ms.
*   **Dilution Index:** Cap Table dilution stands at 11% pre-money SAFE check. Option Pool buffer: 8% approved.
*   *Consultant Verdict:* Pre-seed funding index is positive. Auto-approve SAFE note signatures.`;
      } else if (text.toLowerCase().includes("roadmap")) {
        res = `**AI Generated Research Roadmap Proposal**
        
1.  **Phase 1 (W1-W3):** Benchmark parameter density curves across local Mistral models.
2.  **Phase 2 (W4-W6):** Format LaTeX equations, optimize mathematical notations, peer abstract check.
3.  **Phase 3 (W7-W9):** Validate results with Nature submission Guidelines, issue PDF files.`;
      } else {
        res = `**Advisor Recommendations Checklist:**
        
*   Instruct Rohan to deploy AI portfolio project directly to Vercel/GitHub to build credentials.
*   Review Prof. K. Sen's incubator budget spreadsheets to balance corporate sponsorships.
*   Auto-NDA protocols are checked and active across all clients.`;
      }
      setOrbMessages(prev => [...prev, { sender: "ai", text: res }]);
      setOrbLoading(false);
    }, 1200);
  };

  // 11. Revenue Payout States
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutProgress, setPayoutProgress] = useState(0);
  const [payoutHistory, setPayoutHistory] = useState([
    { id: "PAY-1920", date: "May 30, 2026", amount: "₹1,80,000", status: "Settled" },
    { id: "PAY-0829", date: "April 30, 2026", amount: "₹2,10,000", status: "Settled" }
  ]);

  const handleRequestPayout = () => {
    if (payoutLoading) return;
    setPayoutLoading(true);
    setPayoutProgress(0);
    const interval = setInterval(() => {
      setPayoutProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPayoutLoading(false);
          setPayoutHistory(prevHist => [
            { id: "PAY-" + Math.floor(Math.random() * 9000 + 1000), date: "Today", amount: "₹2,40,000", status: "Processing" },
            ...prevHist
          ]);
          return 100;
        }
        return prev + 25;
      });
    }, 4000);
  };

  // 12. Reviews & Star Ratings State
  const [expertRatingScore, setExpertRatingScore] = useState(98);
  const reviews = [
    { author: "Aarav Sharma", rating: 5, text: "✓ The cap table option pool expansion advice was invaluable. Incorporated C-Corp successfully.", date: "2 days ago" },
    { author: "Priya Patel", rating: 5, text: "✓ Revisions on our LaTeX document model were peer audited and accepted. Exceptional insight.", date: "1 week ago" }
  ];

  // 13. Achievements Badges
  const [certificateRequested, setCertificateRequested] = useState<string | null>(null);

  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Advisor Command Center" subtitle="Flagship Expert Terminal · Private advisory metrics and consulting workflows.">
          {/* Welcome Banner */}
          <div className="mb-6 grid gap-6 md:grid-cols-3 bg-gradient-to-r from-amber-400/5 via-blue-500/5 to-transparent p-6 rounded-2xl border border-white/5 glow relative overflow-hidden">
            <div className="md:col-span-2">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                Professional Advisor License
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                Welcome back, Dr. John 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Your consulting engine is running at peak capacity. Client satisfaction score is at <strong className="text-emerald-400">98%</strong>. You have <strong className="text-white">{discoveryRequests.length} pending Discovery requests</strong> and <strong className="text-white">{tasks.filter(t => t.column === "review").length} client deliverables</strong> awaiting your audit.
              </p>
            </div>
            
            {/* Reputation Score Dial */}
            <div className="flex flex-col justify-center rounded-xl bg-white/[0.02] border border-white/5 p-4 relative">
              <div className="text-[9px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">
                Expert Reputation Index
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-amber-400/20">
                  <div className="absolute inset-0 rounded-full border-2 border-t-amber-400 border-r-amber-400 rotate-45" />
                  <span className="text-[10px] font-bold text-white font-mono">
                    {expertRatingScore}%
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Top 2% Mentor Ranking</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">Gold Tier verified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dials / Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Monthly revenue</span>
                <Coins className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">₹2,40,000</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ payout checkout ready</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Active clients</span>
                <Users className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {clients.filter(c => c.status === "Active").length} Clients
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {clients.filter(c => c.category === "Founder").length} Founders · {clients.filter(c => c.category === "Researcher").length} Scholars
              </div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Discovery requests</span>
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-amber-500 mt-1">
                {discoveryRequests.length} Pending
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">Action required: scheduling</div>
            </Card>
            <Card>
              <div className="text-xs text-muted-foreground uppercase font-mono flex justify-between items-center">
                <span>Success wall outcomes</span>
                <Award className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">12 Outputs</div>
              <div className="text-[10px] text-muted-foreground mt-1">Outcomes verified under guidance</div>
            </Card>
          </div>

          {/* Expert Command Center dashboard grids */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" /> Today's Sessions & Pending Tasks
              </h3>
              <div className="space-y-3">
                {sessions.map(s => (
                  <div key={s.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded font-bold">
                          {s.time} · {s.duration}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{s.clientName}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5">{s.topic}</h4>
                      <p className="text-[10px] text-muted-foreground mt-1">{s.notes}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="?tab=meetings" className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition">
                        Start Video Room
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Quick Actions</h3>
              <div className="space-y-2">
                <a href="?tab=discovery_sessions" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  ⚡ Review Onboarding Requests
                </a>
                <a href="?tab=revenue" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  💰 Execute Payout Checkout
                </a>
                <a href="?tab=expert_copilot" className="block text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition">
                  🔮 Launch AI Report Builder
                </a>
              </div>
            </Card>
          </div>

          {/* Success Wall outcome gallery */}
          <Card className="border border-amber-400/20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="absolute top-0 right-0 h-40 w-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Trophy className="h-4.5 w-4.5 text-amber-400" /> Success Wall Outcomes (Social Proof credentials)
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "AI Placement Secured", user: "Rohan Das", detail: "Secured a 6-month placement as an AI Engineer at NVIDIA.", label: "IIT Placement" },
                { title: "Research Paper Published", user: "Priya Patel", detail: "Published mathematical models in GenAI Symposium 2026.", label: "Nature Approved" },
                { title: "Seed Funding Raised", user: "Aarav Sharma", detail: "Raised ₹25M pre-seed Safe note check led by local GP.", label: "Venture Deal" },
                { title: "Patent Filing Completed", user: "Dr. Elena Rostova", detail: "Filed decentralized LLM quantization protocol.", label: "Patent Filed" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/60 relative">
                  <span className="text-[8px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-bold uppercase">
                    {item.label}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-2 font-display">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                  <div className="mt-3.5 text-[9px] font-mono text-white/70">
                    Advised by: Dr. John
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Page>
      )}

      {/* TAB: CLIENTS */}
      {currentTab === "clients" && (
        <Page title="Client CRM Directory" subtitle="Consulting CRM hub tracking client status, current goals, and advisor milestones.">
          
          <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
            <div className="flex gap-2">
              {["all", "Student", "Researcher", "Founder", "University"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setClientFilter(cat)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition ${
                    clientFilter === cat 
                      ? "bg-amber-400 text-slate-950" 
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 focus:border-amber-400 focus:outline-none w-full md:max-w-xs"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* List */}
            <Card className="md:col-span-2 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] uppercase font-mono text-muted-foreground tracking-wider">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Focus Goal</th>
                    <th className="py-2.5">Progress</th>
                    <th className="py-2.5 text-right">Reputation Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {clients
                    .filter(c => clientFilter === "all" || c.category === clientFilter)
                    .filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase()) || c.goal.toLowerCase().includes(clientSearch.toLowerCase()))
                    .map(c => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedClientDetailId(c.id)}
                        className={`hover:bg-white/[0.01] cursor-pointer transition ${
                          selectedClientDetailId === c.id ? "bg-amber-400/5" : ""
                        }`}
                      >
                        <td className="py-3.5 font-sans font-bold text-white text-xs">{c.name}</td>
                        <td className="py-3.5 text-[10px] text-muted-foreground">{c.category}</td>
                        <td className="py-3.5 text-white/95 text-[10px] font-sans">{c.goal}</td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400" style={{ width: `${c.progress}%` }} />
                            </div>
                            <span>{c.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 text-right text-emerald-400">{c.successScore}% Match</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>

            {/* Sidebar Details Card */}
            <Card className="md:col-span-1">
              {(() => {
                const target = clients.find(c => c.id === selectedClientDetailId);
                if (!target) return <div className="text-xs text-muted-foreground text-center">Select a client to view milestones</div>;
                const clientRoadmap = roadmaps[target.id]?.milestones || [];
                return (
                  <div>
                    <h4 className="text-sm font-bold text-white font-display border-b border-white/5 pb-2 mb-3">
                      {target.name} · {target.category} focus
                    </h4>
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Venture / Affiliation:</div>
                        <div className="text-white mt-0.5">{target.schoolOrCompany}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Core Advisor Goal:</div>
                        <div className="text-white mt-0.5">{target.goal}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-muted-foreground font-mono">Next Milestone:</div>
                        <div className="text-amber-400 mt-0.5">{target.milestone}</div>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <div className="text-[9px] uppercase text-muted-foreground font-mono mb-2">Roadmap Milestones progress:</div>
                        {clientRoadmap.length === 0 ? (
                          <span className="text-muted-foreground italic">No milestones defined.</span>
                        ) : (
                          <div className="space-y-2">
                            {clientRoadmap.map(m => (
                              <div key={m.id} className="flex justify-between items-center p-2 rounded bg-white/[0.01] border border-white/5">
                                <span className={m.done ? "line-through text-muted-foreground" : "text-white"}>
                                  {m.title}
                                </span>
                                <span className="text-[9px] font-mono text-amber-400">{m.deadline}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: DISCOVERY SESSIONS */}
      {currentTab === "discovery_sessions" && (
        <Page title="Discovery Sessions Desk" subtitle="Review consultation requests and schedule active advisory clients.">
          
          <div className="grid gap-6 md:grid-cols-2">
            {discoveryRequests.length === 0 ? (
              <Card className="col-span-2 text-center p-8 border border-dashed border-white/5">
                <div className="text-sm text-white font-bold mb-1">Discovery Desk empty</div>
                <p className="text-xs text-muted-foreground">All consultation inquiries have been audited and scheduled.</p>
              </Card>
            ) : (
              discoveryRequests.map(r => (
                <Card key={r.id} className="flex flex-col justify-between border border-white/5 hover:border-amber-400/20 transition relative">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                      <span className="text-muted-foreground">{r.category} · Onboarding query</span>
                      <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-bold">
                        Fit Score: {r.score}%
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-white font-display">{r.name}</h4>
                    <div className="text-xs text-amber-400 font-mono mt-1">Topic: {r.topic}</div>
                    
                    <div className="mt-4 space-y-2 text-xs">
                      <div>
                        <strong className="text-white block font-mono text-[10px] uppercase text-muted-foreground">Goals:</strong>
                        <p className="text-white/80 mt-0.5">{r.goals}</p>
                      </div>
                      <div>
                        <strong className="text-white block font-mono text-[10px] uppercase text-muted-foreground">Challenges:</strong>
                        <p className="text-white/80 mt-0.5">{r.challenges}</p>
                      </div>
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[10px] text-muted-foreground">
                        <strong className="text-white block mb-0.5">AI Insights:</strong>
                        {r.note}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => handleApproveDiscovery(r.id)}
                      className="w-full py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-[10px] rounded-lg cursor-pointer transition"
                    >
                      Approve & Schedule Client
                    </button>
                    <button
                      onClick={() => setDiscoveryRequests(prev => prev.filter(req => req.id !== r.id))}
                      className="px-3.5 py-2 bg-white/5 hover:bg-rose-500/20 text-muted-foreground hover:text-rose-400 rounded-lg border border-white/10 cursor-pointer transition"
                    >
                      Decline Inquiry
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Page>
      )}

      {/* TAB: CONSULTATIONS */}
      {currentTab === "consultations" && (
        <Page title="Advisory Session Hub" subtitle="Manage scheduled slot consultations, note-taking templates and past logs.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* List */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Sessions Schedule</h3>
              <div className="space-y-3">
                {sessions.map(s => (
                  <button
                    key={s.id}
                    className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition block cursor-pointer"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                      <span>{s.date} · {s.time}</span>
                      <span className={s.status === "Upcoming" ? "text-amber-400" : "text-muted-foreground"}>
                        {s.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1.5 font-sans">{s.topic}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Client: {s.clientName}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Note taking workspace */}
            <Card className="md:col-span-2">
              <div className="border-b border-white/5 pb-3 mb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Session Audit Workspace: Aarav Sharma</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Add notes and assign client action tasks.</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Notes Input */}
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Session notes</label>
                  <textarea
                    placeholder="Enter consulting insights, options reviews, or next steps..."
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    className="w-full h-24 text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-2 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                {/* Checklist Action Builder */}
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Milestone Action Items</label>
                  <div className="space-y-2 mb-3">
                    {sessions[0].actions.map((act, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/90">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new action item..."
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                      className="flex-1 text-xs text-white bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddActionItem(1)}
                      className="px-3 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[10px] rounded-lg cursor-pointer transition"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Simulated playback */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-slate-900/60 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <Play className="h-4 w-4 text-amber-400 fill-current" />
                    <div>
                      <div className="font-bold text-white text-[11px] font-mono">simulated_recording_cap_table.mp4</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Recording compiled · Duration: 42 mins</div>
                    </div>
                  </div>
                  <button onClick={() => alert("Downloading meeting video file...")} className="p-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-white cursor-pointer transition">
                    <Download className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ARENA REWARDS */}
      {currentTab === "rewards" && (
        <Page title="Advisor Rewards Arena" subtitle="Review and approve client reward ticket redemptions.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {rewardTickets.map(t => (
              <Card key={t.id} className="flex flex-col justify-between border border-white/5 relative">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                    <span className="text-muted-foreground">{t.id}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      t.priority === "Critical" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {t.priority}
                    </span>
                  </div>

                  {/* Boarding pass aesthetics */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 mb-4">
                    <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                      {t.type}
                    </div>
                    <div className="text-sm font-bold text-white mt-2 font-display">{t.clientName}</div>
                    <div className="text-[9px] text-muted-foreground font-mono mt-1">Expires: {t.expiryDate}</div>
                  </div>

                  <div className="text-xs text-muted-foreground font-mono flex justify-between">
                    <span>Redeem Status:</span>
                    <span className={t.status === "Approved" ? "text-emerald-400" : "text-amber-500 font-bold"}>
                      {t.status}
                    </span>
                  </div>
                </div>

                {t.status === "Pending" && (
                  <div className="mt-6 pt-3 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => handleTicketStatus(t.id, "Approved")}
                      className="w-full py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-[10px] font-bold rounded cursor-pointer transition"
                    >
                      Approve & Redeem
                    </button>
                    <button
                      onClick={() => handleTicketStatus(t.id, "Rejected")}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-rose-500/20 text-muted-foreground hover:text-rose-400 rounded border border-white/10 cursor-pointer transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: ROADMAPS */}
      {currentTab === "roadmaps" && (
        <Page title="Advisor Roadmap Builder" subtitle="Construct milestones and deadline parameters for advisory clients.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Client selector */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Select Client</h3>
              <div className="space-y-2">
                {clients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveRoadmapClient(c.id)}
                    className={`w-full text-left p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                      activeRoadmapClient === c.id 
                        ? "bg-amber-400/10 border-amber-400/30 text-white" 
                        : "bg-white/[0.01] border-white/5 text-muted-foreground hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-display">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{c.category}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {c.progress}%
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Builder interface */}
            <Card className="md:col-span-2">
              {(() => {
                const target = clients.find(c => c.id === activeRoadmapClient);
                const road = roadmaps[activeRoadmapClient];
                if (!target || !road) return <div className="text-xs text-muted-foreground text-center">No client selected</div>;

                return (
                  <div>
                    <h4 className="text-sm font-bold text-white font-display border-b border-white/5 pb-2 mb-4">
                      Roadmap Template: {target.name}
                    </h4>

                    {/* Milestones list */}
                    <div className="space-y-3 mb-6">
                      {road.milestones.map(m => (
                        <div key={m.id} className="flex gap-3 items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                          <input
                            type="checkbox"
                            checked={m.done}
                            onChange={() => toggleMilestone(target.id, m.id)}
                            className="h-4 w-4 rounded accent-amber-400 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className={`text-xs font-bold ${m.done ? "line-through text-muted-foreground" : "text-white"}`}>
                              {m.title}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              Deliverable: {m.deliverables}
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold">
                            {m.deadline}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Add Milestone Form */}
                    <form onSubmit={handleAddMilestone} className="pt-4 border-t border-white/5 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Insert Milestone Node</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-[9px] text-muted-foreground font-mono block mb-1">Milestone Name</label>
                          <input
                            type="text" required placeholder="e.g. Conduct pilot trial"
                            value={newRoadmapTitle}
                            onChange={(e) => setNewRoadmapTitle(e.target.value)}
                            className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-muted-foreground font-mono block mb-1">Target Deadline</label>
                          <input
                            type="text" required placeholder="e.g. July 18"
                            value={newRoadmapDate}
                            onChange={(e) => setNewRoadmapDate(e.target.value)}
                            className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] text-muted-foreground font-mono block mb-1">Required Deliverable</label>
                        <input
                          type="text" placeholder="e.g. Pilot feedback report PDF"
                          value={newRoadmapDeliv}
                          onChange={(e) => setNewRoadmapDeliv(e.target.value)}
                          className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[10px] rounded-lg cursor-pointer transition"
                      >
                        Publish Milestone
                      </button>
                    </form>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: TASKS */}
      {currentTab === "tasks" && (
        <Page title="Tasks Assignment & Review" subtitle="Assign sprint items to clients and audit submitted deliverables.">
          
          <div className="grid gap-4 md:grid-cols-3">
            {["todo", "progress", "review"].map((col) => {
              const list = tasks.filter(t => t.column === col);
              return (
                <Card key={col} className="bg-slate-950/40 p-4 border border-white/5 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                      {col === "review" ? "Awaiting Audit (Review)" : col.toUpperCase()}
                    </span>
                    <span className="text-[9px] bg-white/5 text-muted-foreground px-2 py-0.5 rounded font-mono">
                      {list.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {list.length === 0 ? (
                      <div className="h-24 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-[10px] text-muted-foreground">
                        Empty List
                      </div>
                    ) : (
                      list.map(t => (
                        <div key={t.id} className="p-3 bg-slate-900/95 border border-white/5 rounded-xl text-xs">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[8px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-bold">
                              {t.clientName}
                            </span>
                            <span className="text-[8px] font-mono text-muted-foreground">{t.deadline}</span>
                          </div>
                          
                          <div className="text-white font-bold leading-relaxed">{t.title}</div>
                          
                          <div className="mt-4 flex gap-1.5 justify-end border-t border-white/5 pt-2">
                            {col === "review" ? (
                              <button
                                onClick={() => handleApproveSubmission(t.id)}
                                className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-[9px] font-bold rounded cursor-pointer hover:bg-emerald-400 transition"
                              >
                                Approve Deliverable
                              </button>
                            ) : (
                              <>
                                {col !== "todo" && (
                                  <button
                                    onClick={() => moveTask(t.id, col === "progress" ? "todo" : "progress")}
                                    className="text-[9px] text-muted-foreground hover:text-white cursor-pointer"
                                  >
                                    ◀ Back
                                  </button>
                                )}
                                {col !== "review" && (
                                  <button
                                    onClick={() => moveTask(t.id, col === "todo" ? "progress" : "review")}
                                    className="text-[9px] text-amber-400 hover:text-white font-semibold cursor-pointer"
                                  >
                                    Move ▶
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Page>
      )}

      {/* TAB: MEETINGS */}
      {currentTab === "meetings" && (
        <Page title="Advisory Meeting Hub" subtitle="Coordinate Google Meet/Zoom calendar slots and review automated AI session summaries.">
          
          {/* Active room overlay */}
          {activeAdvisoryRoom && (
            <Card className="mb-6 border border-amber-400/40 bg-slate-950/90 max-w-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Live Session Active
                  </span>
                </div>
                <button
                  onClick={() => setActiveAdvisoryRoom(null)}
                  className="px-2.5 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[10px] font-bold rounded-lg cursor-pointer transition"
                >
                  End Call Session
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 text-center text-xs">
                <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40">
                  <div className="text-white font-bold text-sm">Dr. John</div>
                  <div className="text-[10px] text-amber-400 mt-1">Expert advisor · Connected</div>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40">
                  <div className="text-white font-bold text-sm">{activeAdvisoryRoom}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Client · Audio active</div>
                </div>
              </div>

              {/* Live transcript indicator */}
              <div className="mt-4 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs">
                <div className="text-[9px] font-mono uppercase text-muted-foreground">Session Clocks:</div>
                <div className="text-white mt-1">
                  Time elapsed: {Math.floor(virtualTimer / 60)}m {virtualTimer % 60}s
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Scheduled Advisory Sessions</h3>
              <div className="space-y-3">
                {meetings.map(m => (
                  <div key={m.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                          {m.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{m.date} at {m.time}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5 font-sans">{m.topic}</h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Focus client: {m.client}</p>
                    </div>
                    <button
                      onClick={() => setActiveAdvisoryRoom(m.client)}
                      className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition flex items-center gap-1"
                    >
                      <Play className="h-3 w-3 fill-current" /> Join Room
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">AI summaries output</h3>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs leading-relaxed text-muted-foreground font-mono">
                <strong className="text-white block mb-1 uppercase text-[9px]">Last session action items:</strong>
                *   Cap table Delaware charters review complete.
                *   Milestone option pools proposed at 8% Cap.
                *   Follow-up roadmap scheduled for Aarav Sharma next week.
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: WORKSPACE */}
      {currentTab === "workspace" && (
        <Page title="Client Workspace Hub" subtitle="Private collaborative channels, chat grids, and milestone logs.">
          
          <div className="grid gap-6 md:grid-cols-4">
            
            {/* Client sidebar */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Collaborators</h3>
              <div className="space-y-2">
                {clients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveWorkspaceClient(c.id)}
                    className={`w-full text-left p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                      activeWorkspaceClient === c.id 
                        ? "bg-amber-400/10 border-amber-400/30 text-white" 
                        : "bg-white/[0.01] border-white/5 text-muted-foreground hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-display">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{c.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat board and files */}
            <Card className="md:col-span-3 flex flex-col h-[450px]">
              {(() => {
                const target = clients.find(c => c.id === activeWorkspaceClient);
                const chats = workspaceChats[activeWorkspaceClient] || [];
                if (!target) return <div className="text-xs text-muted-foreground text-center">Select a client to open workspace</div>;

                return (
                  <>
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
                      <Users className="h-4.5 w-4.5 text-amber-400" />
                      <span className="text-xs font-bold text-white font-mono uppercase">
                        Workspace channel: {target.name}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                      {chats.map((ch, idx) => (
                        <div key={idx} className={`flex ${ch.sender === "expert" ? "justify-end" : "justify-start"}`}>
                          <div className={`p-3 rounded-xl max-w-md text-xs leading-relaxed ${
                            ch.sender === "expert"
                              ? "bg-amber-400 text-slate-950 font-medium"
                              : "bg-white/[0.02] border border-white/5 text-white/95"
                          }`}>
                            <div className="font-bold text-[9px] opacity-75 mb-0.5">
                              {ch.sender === "expert" ? "Dr. John (Advisor)" : target.name} · {ch.time}
                            </div>
                            <div>{ch.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendWorkspaceChat} className="flex gap-2 border-t border-white/5 pt-3">
                      <input
                        type="text"
                        placeholder="Write a message to client..."
                        value={workspaceInput}
                        onChange={(e) => setWorkspaceInput(e.target.value)}
                        className="flex-1 text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-2 focus:border-amber-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl cursor-pointer transition"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: DOCUMENTS */}
      {currentTab === "documents" && (
        <Page title="Document Review vault" subtitle="Review uploaded papers, portfolios, and pitch decks. Audit with annotations.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Library list */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Review Directory</h3>
              <div className="space-y-2">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                      selectedDocId === doc.id 
                        ? "bg-amber-400/10 border-amber-400/30 text-white" 
                        : "bg-white/[0.01] border-white/5 text-muted-foreground hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-mono">{doc.name}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">Author: {doc.client} · {doc.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Document reviewer & annotations */}
            <Card className="md:col-span-2">
              {(() => {
                const doc = documents.find(d => d.id === selectedDocId);
                const isAudited = auditComplete[selectedDocId];
                if (!doc) return <div className="text-xs text-muted-foreground text-center">Select document to preview</div>;

                return (
                  <div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">{doc.name}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Audit reviews by Dr. John</p>
                      </div>
                      <button
                        onClick={() => handleRunDocumentAudit(doc.id)}
                        disabled={runAuditLoading}
                        className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition disabled:opacity-50"
                      >
                        {runAuditLoading ? "Auditing files..." : "Run AI Document Audit"}
                      </button>
                    </div>

                    {/* Annotations audit interface */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[11px] leading-relaxed text-white/90 relative">
                        <span className="text-[8px] bg-white/5 text-muted-foreground px-1.5 py-0.5 rounded absolute top-2 right-2">PDF PREVIEW</span>
                        <div>
                          <strong>Thesis Abstract Section:</strong><br />
                          This model utilizes local low-latency quantization algorithms on Llama weight densities to deploy real-time LLM outputs below 15 milliseconds...
                        </div>
                      </div>

                      {isAudited ? (
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">AI Audit Annotations:</h4>
                          <div className="p-3 rounded-lg bg-amber-400/5 border border-amber-400/20 text-xs text-white leading-relaxed">
                            <strong>⚠ Annotation 1 (Abstract L12):</strong> Ambiguous latency claims. Rephrase weight parameters references to cite exact benchmarks.
                          </div>
                          <div className="p-3 rounded-lg bg-amber-400/5 border border-amber-400/20 text-xs text-white leading-relaxed">
                            <strong>✓ Annotation 2 (Quantization Moat):</strong> verified. Moat structure is highly robust and defensible.
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic text-center py-6">
                          Run the AI Audit tool to compile comments.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: AI EXPERT ASSISTANT */}
      {currentTab === "expert_copilot" && (
        <Page title="Advisor AI Assistant" subtitle="Prompt reports creation, milestone roadmaps, and client analytics briefs.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Prompts list */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Suggested Prompts</h3>
              <div className="space-y-2">
                {[
                  "Draft McKinsey advisory report draft for Aarav",
                  "Create research roadmap milestones for Priya Patel",
                  "Write career resume review notes for Rohan Das",
                  "Compile option pool advice metrics summary"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerOrbAdvisory(q)}
                    className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs text-white cursor-pointer transition leading-relaxed"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat Box */}
            <Card className="md:col-span-2 flex flex-col h-[480px]">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white font-mono uppercase">AI Assistant Terminal</span>
              </div>

              {/* Chat Output */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {orbMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-lg text-xs leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-amber-400 text-slate-950 font-medium" 
                        : "bg-white/[0.02] border border-white/5 text-white/90"
                    }`}>
                      <div className="whitespace-pre-line">{m.text}</div>
                    </div>
                  </div>
                ))}
                {orbLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-muted-foreground italic font-mono">
                      Assistant Orb compiling recommendations...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!orbInput.trim()) return;
                  triggerOrbAdvisory(orbInput);
                  setOrbInput("");
                }}
                className="flex gap-2 border-t border-white/5 pt-3"
              >
                <input
                  type="text"
                  placeholder="Ask assistant to review a resume, generate summaries, or draft plans..."
                  value={orbInput}
                  onChange={(e) => setOrbInput(e.target.value)}
                  className="flex-1 text-xs text-white bg-slate-950 border border-white/10 rounded-xl px-3 py-2 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl cursor-pointer transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: REVENUE CENTER */}
      {currentTab === "revenue" && (
        <Page title="Advisor Revenue Engine" subtitle="Audit recurring consulting retainers, completed session payouts, and payout transfers.">
          
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Stat label="Revenue This Month (YTD)" value="₹2,40,000" tone="electric" />
            <Stat label="Average Consultation value" value="₹8,000 / Session" tone="violet" />
            
            <Card className="flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Settled payout balance</div>
                <div className="mt-2 font-display text-3xl font-semibold text-amber-500">
                  ₹2,40,000
                </div>
              </div>
              
              {payoutLoading ? (
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span>Processing transfer...</span>
                    <span>{payoutProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${payoutProgress}%` }} />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleRequestPayout}
                  className="mt-4 w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition"
                >
                  Request Payout Transfer
                </button>
              )}
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Payout Transfer Ledger</h3>
              <div className="space-y-3 font-mono text-xs">
                {payoutHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-white/5 rounded-xl bg-white/[0.01]">
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.id}</h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Cleared on {item.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{item.amount}</div>
                      <span className="text-[9px] text-emerald-400 font-bold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Fee commission Breakdown</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Expert Share:</span>
                  <span className="text-white">90%</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Platform Comm:</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Tax Deductions:</span>
                  <span className="text-white">0.00% (GST exempt)</span>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: REVIEWS & REPUTATION */}
      {currentTab === "reviews" && (
        <Page title="Advisor Star Reviews & Reputation" subtitle="Audit client comments, reputation metrics and generate share certificates.">
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Reputation stats */}
            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Reputation index</h3>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Average Star Rating</div>
                  <div className="text-2xl font-bold text-white mt-1">4.96 / 5.0</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Response time SLA</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">1.2 Hours</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">Milestones Completion Rate</div>
                  <div className="text-2xl font-bold text-white mt-1">94.8%</div>
                </div>
              </div>
            </Card>

            {/* Reviews list */}
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Client Reviews feed</h3>
              <div className="space-y-4">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="p-4 border border-white/5 rounded-xl bg-white/[0.01]">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white font-bold">{rev.author}</span>
                      <span className="text-amber-400 font-bold">{"★".repeat(rev.rating)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rev.text}</p>
                    <div className="mt-2 text-[9px] text-muted-foreground font-mono">Submitted {rev.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ANALYTICS */}
      {currentTab === "analytics" && (
        <Page title="Performance Metrics & Analytics" subtitle="Review consultant distributions, metrics served, and growth.">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Clients Served Distribution</h3>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { segment: "Founder Ventures", count: 8, percentage: 44, color: "bg-amber-400" },
                  { segment: "Academic Researchers", count: 6, percentage: 33, color: "bg-blue-400" },
                  { segment: "Student Placements", count: 4, percentage: 22, color: "bg-purple-400" }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-muted-foreground text-[10px] mb-1">
                      <span className="text-white font-semibold">{item.segment}</span>
                      <span>{item.count} clients ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="flex flex-col justify-center items-center text-center">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Milestone Retention metrics</h3>
              <div className="text-4xl font-black text-amber-500 font-display">96.4%</div>
              <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                96.4% of clients retain services after the initial discovery consultation session.
              </p>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: ACHIEVEMENT SYSTEM */}
      {currentTab === "rewards_achievements" || currentTab === "achievements" ? (
        <Page title="Expert Reputation Achievements" subtitle="Generate advisor credential certificates and LinkedIn posters.">
          
          {/* Certificate showcase */}
          {certificateRequested && (
            <Card className="mb-6 border-2 border-amber-400 bg-slate-950 p-8 max-w-xl mx-auto text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="border-4 border-amber-400/20 p-6 rounded-xl flex flex-col justify-center items-center">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">PROFESSIONAL ADVISORY CERTIFICATE</div>
                <h2 className="text-2xl font-black text-white mt-4 font-display">Dr. John</h2>
                <div className="h-0.5 w-16 bg-amber-400 my-4" />
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Is hereby certified as a verified **{certificateRequested}** at Professional Home, having successfully completed peer validation standards.
                </p>
                <div className="mt-8 flex justify-between w-full border-t border-white/5 pt-4 text-[9px] font-mono text-muted-foreground">
                  <span>ID: CER-49129</span>
                  <span>Issued on June 12, 2026</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2 justify-center">
                <button
                  onClick={() => alert("Certificate printed!")}
                  className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer transition"
                >
                  Print PDF Certificate
                </button>
                <button
                  onClick={() => setCertificateRequested(null)}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 text-white font-bold text-[10px] rounded-lg cursor-pointer hover:bg-white/10 transition"
                >
                  Close Showcase
                </button>
              </div>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Research Champion", desc: "Guide 5 peer researchers to compile and publish LaTeX abstracts.", badge: "RES-CHAMP" },
              { title: "Top Startup Mentor", desc: "Complete Safe parameters diligence structures audits for 10 founders.", badge: "START-MENTOR" },
              { title: "5-Star Advisor Elite", desc: "Maintain a client satisfaction score rating above 95% over 20 sessions.", badge: "STAR-ELITE" }
            ].map((item, idx) => (
              <Card key={idx} className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold uppercase">
                    {item.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3 font-display">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => setCertificateRequested(item.title)}
                  className="mt-6 w-full py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-[10px] rounded cursor-pointer transition"
                >
                  Generate Certificate Certificate
                </button>
              </Card>
            ))}
          </div>
        </Page>
      ) : null}

      {/* TAB: COMMUNITY */}
      {currentTab === "community" && (
        <Page title="Advisor Roundtable Forums" subtitle="Participate in expert roundtables, exchange credentials and register for masterclasses.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Expert Discussion threads</h3>
              <div className="space-y-3.5">
                {[
                  { title: "Sponsorship structures for DeepTech incubators", author: "Dr. Elena Rostova", desc: "How are you balancing options dilution caps when negotiating corporate incubator funds?", date: "1 hour ago" },
                  { title: "Structuring peer academic papers reviews templates", author: "Prof. K. Sen", desc: "Best practices for compiler annotations across Llama quantization abstracts.", date: "Today" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] transition">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
                      <span>Posted by {item.author}</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-display">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Advisory Roundtables schedule</h3>
              <div className="space-y-3 text-xs">
                {[
                  { topic: "INC-3891 Incubator Launch Panel", date: "June 20", time: "16:00" },
                  { topic: "LaTeX notations peer audit sync", date: "June 25", time: "10:00" }
                ].map((ev, idx) => (
                  <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01]">
                    <div className="font-bold text-white">{ev.topic}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-1">{ev.date} at {ev.time}</div>
                    <button onClick={() => alert("Registered for panel roundtable slot.")} className="mt-2.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[9px] rounded transition cursor-pointer">
                      Register Slot
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: PROFILE */}
      {currentTab === "profile" && (
        <Page title="Advisor Credentials profile" subtitle="Configure check thesis, average session pricing, and consulting availability.">
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Advisor details</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Profile credentials saved successfully."); }}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Expert Advisor Name</label>
                    <input
                      type="text" defaultValue="Dr. John"
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground font-mono block mb-1">Credentials / Affiliation</label>
                    <input
                      type="text" defaultValue="Senior Advisory Partner, Vanguard Catalyst"
                      className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-muted-foreground font-mono block mb-1">Advisor Focus Thesis Statement</label>
                  <textarea
                    defaultValue="Providing premium scaling and option pool parameters strategy advice across deep tech ventures."
                    className="w-full text-xs text-white bg-slate-950 border border-white/10 rounded px-2.5 py-1.5 h-20 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[10px] rounded-lg cursor-pointer transition"
                >
                  Save Profile Details
                </button>
              </form>
            </Card>

            <Card className="md:col-span-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Audited thesis focus</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your thesis focus is verified under the platform guidelines. Validated to advise Founders, Researchers, and Students.
              </p>
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-xs text-emerald-400 font-semibold font-mono">
                ✓ Active Advisor License validated
              </div>
            </Card>
          </div>
        </Page>
      )}

      {/* TAB: SETTINGS */}
      {currentTab === "settings" && (
        <Page title="Advisor Configurations Settings" subtitle="Review security permissions, NDA templates approvals, and API sync tags.">
          
          <Card className="max-w-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Operational configurations</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Auto-sign Client NDAs</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Automatically approve and sign standard templates before sessions.</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4.5 w-4.5 rounded accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Enforce Two-Factor verification</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Enforce security key requirements for checkout transfers.</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4.5 w-4.5 rounded accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                <div>
                  <div className="text-xs font-bold text-white">Client matching notification</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Alert if a new user fit score exceeds 80% thresholds.</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4.5 w-4.5 rounded accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => alert("Configurations saved successfully.")}
                className="px-4 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[10px] rounded-lg cursor-pointer transition"
              >
                Save Settings
              </button>
            </div>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// ADMIN DASHBOARD
// -------------------------------------------------------------

function AdminDashboard({ currentTab }: { currentTab: string }) {
  return (
    <>
      {/* TAB: HOME */}
      {currentTab === "home" && (
        <Page title="Control Tower" subtitle="Oversee system load, stripe balances, and overrides.">
          <div className="grid gap-6 md:grid-cols-3 mt-4">
            <Card>
              <div className="text-xs text-red-500 uppercase font-mono">Total Platform Users</div>
              <div className="text-2xl font-black text-white mt-1">42.8K Accounts</div>
              <div className="text-[10px] text-muted-foreground mt-1">18.2K active daily</div>
            </Card>
            <Card>
              <div className="text-xs text-red-500 uppercase font-mono">System Load</div>
              <div className="text-2xl font-black text-white mt-1">Normal (14%)</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">Servers Status: Online</div>
            </Card>
          </div>
        </Page>
      )}

      {/* FALLBACK TABS */}
      {["users", "students", "researchers", "startups", "experts", "universities", "investors", "rewards", "arena_mgmt", "tickets", "payments", "analytics", "moderation", "support"].includes(currentTab) && (
        <Page title={currentTab.toUpperCase()} subtitle="Admin Control Workspace.">
          <Card className="p-6">
            <div className="text-sm text-white font-bold mb-2">Root Control Workspace</div>
            <p className="text-xs text-muted-foreground">System Overrides and moderator settings ledger.</p>
          </Card>
        </Page>
      )}
    </>
  );
}

// -------------------------------------------------------------
// RESEARCH GALAXY CANVAS COMPONENT
// -------------------------------------------------------------

function ResearchGalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    const planets = [
      { name: "Idea Planet", r: 45, speed: 0.005, color: "#38bdf8", desc: "Formulate core thesis & hypothesis" },
      { name: "Literature Planet", r: 75, speed: 0.003, color: "#818cf8", desc: "Systematic reviews of academic articles" },
      { name: "Experiment Planet", r: 105, speed: 0.002, color: "#a78bfa", desc: "Execute lab models, gather datasets" },
      { name: "Publication Planet", r: 135, speed: 0.0015, color: "#f472b6", desc: "LaTeX writing, abstract reviews, peer checks" },
      { name: "Patent Planet", r: 165, speed: 0.001, color: "#fb7185", desc: "IP searches, validation, filings sequence" },
      { name: "Innovation Planet", r: 195, speed: 0.0008, color: "#34d399", desc: "Direct commercialization & spin-offs" }
    ];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = 350;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Sun/Center Node
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Orbit Lines
      planets.forEach((p) => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.stroke();
      });

      // Draw Orbiting Planets
      angle += 0.5;
      planets.forEach((p, idx) => {
        const theta = angle * p.speed + idx * 5;
        const px = cx + Math.cos(theta) * p.r;
        const py = cy + Math.sin(theta) * p.r;

        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText(p.name, px + 10, py + 3);
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative border border-white/5 bg-slate-950/40 p-4 rounded-2xl flex flex-col justify-center items-center">
      <div className="absolute top-3 left-4 text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
        RESEARCH GALAXY SIMULATION
      </div>
      <canvas ref={canvasRef} className="w-full max-w-lg cursor-pointer" />
      <div className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
        Hover planetary orbits to check Stage milestones. Unlocking worlds requires peer outcomes review.
      </div>
    </div>
  );
}
