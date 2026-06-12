import { createFileRoute } from "@tanstack/react-router";
import { CopilotChat, GlowingOrb } from "@/components/app/CopilotChat";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Map,
  Brain,
  Briefcase,
  Mic,
  Upload,
  BookOpen,
  Trophy,
  Target,
  Zap,
  Clock,
  ChevronRight,
  Bot,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot — Professional Home" }] }),
  component: Copilot,
});

const AI_TOOLS = [
  { id: "resume", label: "Resume Analyzer", icon: FileText, color: "sky", desc: "Parse & score your resume in seconds", prompt: "Analyze my resume and give detailed feedback" },
  { id: "roadmap", label: "Roadmap Generator", icon: Map, color: "violet", desc: "Generate a personalized career roadmap", prompt: "Generate a custom roadmap for landing a FAANG internship" },
  { id: "interview", label: "Interview Coach", icon: Brain, color: "emerald", desc: "Simulate real interview scenarios", prompt: "Start a mock technical interview for SDE roles" },
  { id: "projects", label: "Project Generator", icon: Zap, color: "amber", desc: "Get AI-curated project ideas", prompt: "Suggest 5 impressive portfolio projects for an AI/ML engineer" },
  { id: "career", label: "Career Advisor", icon: Briefcase, color: "rose", desc: "Get expert career path guidance", prompt: "What career path should I take given my skills in ML and Python?" },
  { id: "research", label: "Research Assistant", icon: BookOpen, color: "indigo", desc: "Accelerate academic research", prompt: "Help me structure a research paper on transformer architectures" },
];

const SUGGESTED_PROMPTS = [
  { text: "Generate Roadmap", icon: "🗺️" },
  { text: "Review My Resume", icon: "📄" },
  { text: "Suggest Projects", icon: "⚡" },
  { text: "Find Internships", icon: "🎯" },
  { text: "Prepare Interview", icon: "🧠" },
  { text: "Build Study Plan", icon: "📚" },
];

const MEMORY_ITEMS = [
  { icon: "🎯", label: "Career Goal", value: "Land FAANG internship by Oct 2026" },
  { icon: "⚡", label: "Top Skills", value: "Python, ML, System Design" },
  { icon: "🏆", label: "XP Level", value: "Level 4 PRO · 3,240 XP" },
  { icon: "📅", label: "Last Session", value: "Roadmap review · 2 days ago" },
];

const colorMap: Record<string, string> = {
  sky: "text-sky-400 border-sky-500/20 bg-sky-500/5",
  violet: "text-violet-400 border-violet-500/20 bg-violet-500/5",
  emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  rose: "text-rose-400 border-rose-500/20 bg-rose-500/5",
  indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
};

function Copilot() {
  const [activeView, setActiveView] = useState<"chat" | "tools">("chat");
  const [chatKey, setChatKey] = useState(0);
  const [injectedPrompt, setInjectedPrompt] = useState<string | null>(null);

  const handleToolSelect = (prompt: string) => {
    setInjectedPrompt(prompt);
    setActiveView("chat");
    setChatKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#070915] text-white">
      {/* Ambient background meshes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ─── HERO ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-6 md:p-8"
        >
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,1) 0px,rgba(255,255,255,1) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(255,255,255,1) 0px,rgba(255,255,255,1) 1px,transparent 1px,transparent 32px)" }} />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <GlowingOrb />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  AI Copilot · Active
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Professional Home AI</h1>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">Your AI-powered career companion. Ask anything — career, skills, projects, interviews.</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 shrink-0">
              {[
                { label: "Sessions", value: "47", icon: MessageSquare },
                { label: "Insights", value: "128", icon: Brain },
                { label: "Saved Goals", value: "6", icon: Target },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                  <div className="text-lg font-black text-white">{value}</div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested prompts row */}
          <div className="relative mt-6 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map(({ text, icon }) => (
              <button
                key={text}
                onClick={() => handleToolSelect(text)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-cyan-500/30 text-xs text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <span>{icon}</span> {text}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── VIEW TOGGLE ─── */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("chat")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === "chat" ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400" : "border border-white/5 bg-white/[0.02] text-muted-foreground hover:text-white"}`}
          >
            <Bot className="h-3.5 w-3.5" /> Chat Workspace
          </button>
          <button
            onClick={() => setActiveView("tools")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeView === "tools" ? "bg-violet-500/15 border border-violet-500/30 text-violet-400" : "border border-white/5 bg-white/[0.02] text-muted-foreground hover:text-white"}`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> AI Tools
          </button>
        </div>

        {/* ─── MAIN LAYOUT ─── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT: Chat or Tools */}
          <div>
            {activeView === "chat" ? (
              <motion.div
                key={`chat-${chatKey}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CopilotChat />
              </motion.div>
            ) : (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Upload zone */}
                <div className="relative p-5 rounded-2xl border-2 border-dashed border-white/10 bg-slate-900/30 backdrop-blur-md text-center hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300 cursor-pointer group">
                  <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2 group-hover:text-cyan-400 transition" />
                  <h4 className="text-sm font-bold text-white">AI Workspace Upload</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">Drop your resume, research paper, or portfolio for AI analysis</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {["PDF", "DOCX", "PNG", "CSV"].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-muted-foreground/60">{t}</span>
                    ))}
                  </div>
                </div>

                {/* AI Tools grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AI_TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleToolSelect(tool.prompt)}
                        className="group relative p-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-white/20 hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden cursor-pointer"
                      >
                        <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-10 ${colorMap[tool.color].split(" ")[0].replace("text-", "bg-")}`} />
                        <div className={`inline-flex p-2 rounded-xl border mb-3 ${colorMap[tool.color]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="text-xs font-black text-white mb-1">{tool.label}</h4>
                        <p className="text-[9px] text-muted-foreground/60 leading-relaxed">{tool.desc}</p>
                        <div className="mt-3 flex items-center gap-1 text-[9px] font-mono text-muted-foreground/40 group-hover:text-cyan-400 transition">
                          Launch <ChevronRight className="h-2.5 w-2.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Voice button */}
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-slate-900/30 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shrink-0">
                    <Mic className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black text-white">Voice Input</h4>
                    <p className="text-[9px] text-muted-foreground/60 mt-0.5">Speak naturally — AI will transcribe and respond</p>
                  </div>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/5 text-rose-400">BETA</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: AI Memory Sidebar */}
          <div className="space-y-4">
            {/* Memory panel */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-4 w-4 text-violet-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">AI Memory</h3>
                <span className="ml-auto text-[8px] font-mono text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="space-y-3">
                {MEMORY_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-base leading-none mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-[9px] font-mono text-muted-foreground/50 uppercase">{item.label}</div>
                      <div className="text-[10px] font-bold text-white mt-0.5">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session History */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-sky-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">Recent Sessions</h3>
              </div>
              <div className="space-y-2">
                {[
                  { title: "Roadmap discussion", time: "2 days ago", tag: "Career" },
                  { title: "Resume gap analysis", time: "1 week ago", tag: "Resume" },
                  { title: "DSA practice session", time: "2 weeks ago", tag: "Skills" },
                ].map((s) => (
                  <button key={s.title} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition text-left cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white truncate">{s.title}</div>
                      <div className="text-[8px] font-mono text-muted-foreground/40 mt-0.5">{s.time}</div>
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-sky-500/20 bg-sky-500/5 text-sky-400 shrink-0">{s.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-black text-white">Copilot Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "12", label: "Ideas Generated", color: "text-sky-400" },
                  { value: "8", label: "Plans Created", color: "text-violet-400" },
                  { value: "3", label: "CVs Reviewed", color: "text-emerald-400" },
                  { value: "5h", label: "Time Saved", color: "text-amber-400" },
                ].map(({ value, label, color }) => (
                  <div key={label} className="text-center p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className={`text-lg font-black ${color}`}>{value}</div>
                    <div className="text-[8px] font-mono text-muted-foreground/50 mt-0.5 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
