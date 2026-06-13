import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar, Pill } from "@/components/app/Page";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock,
  Check,
  Lock,
  Sparkles,
  Download,
  Brain,
  HelpCircle,
  ArrowRight,
  Zap,
  RefreshCw,
  GraduationCap,
  Trophy,
  Shield,
  ChevronRight,
  Target,
  TrendingUp,
  Star,
  Briefcase,
  Layers,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/app/assessment")({
  head: () => ({ meta: [{ title: "AI Assessment — Professional Home" }] }),
  component: Assessment,
});

const steps = [
  { step: 1, name: "Current Situation", description: "Define your domain sector" },
  { step: 2, name: "Skills", description: "Rate core capabilities" },
  { step: 3, name: "Experience", description: "Verify achievements" },
  { step: 4, name: "Goals", description: "Identify career targets" },
  { step: 5, name: "Challenges", description: "Detail active roadblocks" },
  { step: 6, name: "Timeline", description: "Establish preparation schedules" },
  { step: 7, name: "Finish & Download", description: "Generate custom PDF report" },
];

function Assessment() {
  const [assessmentStep, setAssessmentStep] = useState<number>(2); // Start on Step 2 "Skills" by default as shown in the mockup
  
  // State for Step 1: Situation
  const [sector, setSector] = useState<string>("Computer Science & Software Engineering");
  const [level, setLevel] = useState<string>("Undergraduate Fellow");

  // State for Step 2: Skills
  const [techSkill, setTechSkill] = useState<number>(78);
  const [researchSkill, setResearchSkill] = useState<number>(64);
  const [commsSkill, setCommsSkill] = useState<number>(52);
  const [designSkill, setDesignSkill] = useState<number>(36);

  // State for Step 3: Experience
  const [experiences, setExperiences] = useState([
    { title: "Scientific Journals / Papers Published", done: true },
    { title: "Granted Patents or Registrations", done: false },
    { title: "Verified Technical Github Repositories", done: true },
    { title: "Fellowships or Professional Certifications", done: false },
  ]);

  // State for Step 4: Goals
  const [goal, setGoal] = useState<string>("Land FAANG Internship");

  // State for Step 5: Challenges
  const [challenges, setChallenges] = useState([
    { title: "Lack of mentor advice", done: true },
    { title: "Need resume review", done: true },
    { title: "Struggling with coding rounds", done: false },
  ]);

  // State for Step 6: Timeline
  const [prepMonths, setPrepMonths] = useState<number>(6);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitProgress, setSubmitProgress] = useState<number>(0);
  const [pdfSuccess, setPdfSuccess] = useState<boolean>(false);

  // Calculate dynamic outcomes mathematically
  const expBonus = experiences.filter((e) => e.done).length * 3;
  const rawSuccess = Math.round(
    techSkill * 0.35 + researchSkill * 0.2 + commsSkill * 0.2 + designSkill * 0.15 + 20 + expBonus
  );
  const successProbability = Math.min(100, Math.max(10, rawSuccess));

  const strengths = Math.min(100, Math.round(techSkill * 0.8 + researchSkill * 0.3 + expBonus));
  const opportunities = Math.min(100, Math.round(commsSkill * 0.6 + designSkill * 0.5 + 15));
  const risks = Math.max(0, Math.round(100 - (techSkill * 0.5 + commsSkill * 0.4 + expBonus)));

  const handleToggleExp = (idx: number) => {
    setExperiences((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, done: !e.done } : e))
    );
  };

  const handleToggleChallenge = (idx: number) => {
    setChallenges((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, done: !c.done } : c))
    );
  };

  const executeSubmission = () => {
    setIsSubmitting(true);
    setSubmitProgress(0);
    
    const interval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          setIsSubmitted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDownloadPDF = () => {
    setPdfSuccess(true);
    setTimeout(() => setPdfSuccess(false), 3000);
  };

  return (
    <Page
      title="AI Career Intelligence Center"
      subtitle="Discover your strengths, identify skill gaps, and build a personalized roadmap powered by AI."
    >
      {/* ─── HERO STATS HUD ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Professional Score", value: `${successProbability}%`, icon: Trophy, color: "sky", delta: "Top 15% of peers" },
          { label: "Career Match Score", value: `${Math.min(100, Math.round(successProbability * 0.96))}%`, icon: Target, color: "violet", delta: "AI Engineer · 92% fit" },
          { label: "Assessment", value: `${Math.round(((assessmentStep - 1) / 6) * 100)}%`, icon: Activity, color: "emerald", delta: `Step ${assessmentStep} of 7` },
          { label: "Domain Rank", value: "Top 12%", icon: Star, color: "amber", delta: "CS & SE cohort" },
        ].map(({ label, value, icon: Icon, color, delta }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden p-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md"
          >
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20 ${
              color === "sky" ? "bg-sky-400" : color === "violet" ? "bg-violet-400" : color === "emerald" ? "bg-emerald-400" : "bg-amber-400"
            }`} />
            <div className={`inline-flex p-1.5 rounded-lg border mb-2 ${
              color === "sky" ? "border-sky-500/20 bg-sky-500/5 text-sky-400" :
              color === "violet" ? "border-violet-500/20 bg-violet-500/5 text-violet-400" :
              color === "emerald" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" :
              "border-amber-500/20 bg-amber-500/5 text-amber-400"
            }`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{label}</div>
            <div className={`text-2xl font-black mt-0.5 ${
              color === "sky" ? "text-sky-400" : color === "violet" ? "text-violet-400" : color === "emerald" ? "text-emerald-400" : "text-amber-400"
            }`}>{value}</div>
            <div className="text-[9px] font-mono text-muted-foreground/50 mt-0.5">{delta}</div>
          </motion.div>
        ))}
      </div>

      {/* ─── WIZARD + PREVIEW GRID ─── */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch mt-2">
        {/* Column 1: Vertical Stepper Sidebar (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sky-500/5 blur-xl pointer-events-none" />
          
          <div>
            {/* Time HUD estimate */}
            <div className="mb-6 p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-[9px] font-mono text-sky-400 uppercase font-bold">Time Estimate</div>
                  <div className="text-[10px] font-bold text-white">~6 min remaining</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[8px] font-mono text-muted-foreground uppercase">Progress</div>
                <div className="text-[10px] font-mono font-bold text-white">Step {assessmentStep} of 7</div>
              </div>
            </div>

            {/* Vertical Stepper timeline */}
            <div className="relative space-y-4 pl-3">
              <div className="absolute left-6 top-3 bottom-3 w-[2px] bg-white/5 -translate-x-1/2 z-0" />
              
              {steps.map((s) => {
                const isActive = assessmentStep === s.step;
                const isCompleted = assessmentStep > s.step;
                
                return (
                  <button
                    key={s.step}
                    onClick={() => {
                      if (!isSubmitted) setAssessmentStep(s.step);
                    }}
                    disabled={isSubmitted}
                    className="relative flex items-center gap-3 w-full text-left py-1 group focus:outline-none bg-transparent border-none cursor-pointer z-10"
                  >
                    <div className={`w-6.5 h-6.5 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-300 ${
                      isActive
                        ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.25)] ring-2 ring-sky-500/15"
                        : isCompleted
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 bg-slate-950 text-muted-foreground/40 group-hover:border-white/20"
                    }`}>
                      {isCompleted ? <Check className="h-3 w-3 stroke-[3]" /> : s.step}
                    </div>
                    
                    <div>
                      <div className={`text-[11px] font-bold transition-all duration-300 ${
                        isActive
                          ? "text-sky-400"
                          : isCompleted
                          ? "text-white/80"
                          : "text-muted-foreground/60 group-hover:text-muted-foreground/80"
                      }`}>
                        {s.name}
                      </div>
                      <div className="text-[8px] text-muted-foreground/40 font-mono tracking-tight leading-none mt-0.5">
                        {s.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 text-[9px] font-mono text-muted-foreground/30 text-center">
            AI Engine: Normalized Peer Benchmark
          </div>
        </div>

        {/* Column 2: Stepper Question Form Component (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md relative overflow-hidden min-h-[420px]">
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />
          
          <div className="flex flex-col h-full justify-between">
            
            {/* Display loader if submitting */}
            {isSubmitting ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn py-12">
                <RefreshCw className="h-10 w-10 text-sky-400 animate-spin" />
                <h4 className="text-sm font-bold text-white">Analyzing Diagnostic Ratios</h4>
                <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 transition-all duration-150" style={{ width: `${submitProgress}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {submitProgress < 35 && "Normalizing skills against domain peers..."}
                  {submitProgress >= 35 && submitProgress < 75 && "Running multi-risk predictive analytics..."}
                  {submitProgress >= 75 && "Finalizing strategic roadmap recommendations..."}
                </p>
              </div>
            ) : isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-base font-black text-white font-display">Assessment complete!</h4>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Your profiles have been successfully benchmarked against industry standards. Your predicted success rate is currently <strong>{successProbability}%</strong>.
                </p>
                <div className="flex flex-col gap-2.5 w-full max-w-xs pt-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 hover:opacity-90 cursor-pointer transition shadow-lg shadow-emerald-500/5"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Assessment PDF
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setAssessmentStep(2);
                    }}
                    className="w-full py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white flex items-center justify-center gap-1.5 hover:bg-white/10 cursor-pointer transition"
                  >
                    Restart Assessment Wizard
                  </button>
                </div>
                {pdfSuccess && (
                  <span className="text-[10px] text-emerald-400 font-mono animate-pulse mt-2">
                    ✓ PDF document compiled. Check your local downloads folder.
                  </span>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Wizard Steps Switch */}
                <div className="min-h-[300px]">
                  
                  {/* Step 1: Situation */}
                  {assessmentStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Current Situation</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Define your current academic or professional focus district.</p>
                      </div>
                      
                      <div className="space-y-4 pt-3">
                        <div className="grid gap-2">
                          <label className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Select Domain Sector</label>
                          <select
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-sky-400 transition"
                          >
                            <option>Computer Science & Software Engineering</option>
                            <option>Finance & Quantitative Economics</option>
                            <option>Biotechnology & Life Sciences</option>
                            <option>Creative Design & Product Strategy</option>
                          </select>
                        </div>

                        <div className="grid gap-2">
                          <label className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Select Target Level</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Undergraduate Fellow", "Graduate Researcher", "SaaS Technical Founder", "Principal Lead"].map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => setLevel(lvl)}
                                className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition ${
                                  level === lvl
                                    ? "border-sky-500/50 bg-sky-500/5 text-sky-400"
                                    : "border-white/5 bg-white/[0.01] text-muted-foreground hover:border-white/10 hover:text-white"
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Skills */}
                  {assessmentStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Tell us about your skills</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Rate your proficiency. The AI will normalize against your domain peers.</p>
                      </div>
                      
                      <div className="space-y-4 pt-3">
                        {/* 1. Quantitative Methods */}
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition">
                          <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-2.5">
                            <span>Quantitative methods</span>
                            <span className="font-mono text-sky-400 font-bold">{techSkill}%</span>
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

                        {/* 2. Scientific Writing */}
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition">
                          <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-2.5">
                            <span>Scientific writing</span>
                            <span className="font-mono text-sky-400 font-bold">{researchSkill}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={researchSkill}
                            onChange={(e) => setResearchSkill(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                          />
                        </div>

                        {/* 3. Team Leadership */}
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition">
                          <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-2.5">
                            <span>Team leadership</span>
                            <span className="font-mono text-sky-400 font-bold">{commsSkill}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={commsSkill}
                            onChange={(e) => setCommsSkill(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                          />
                        </div>

                        {/* 4. Fundraising / Pitching */}
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition">
                          <div className="flex justify-between text-[11px] font-semibold text-white/95 mb-2.5">
                            <span>Fundraising / pitching</span>
                            <span className="font-mono text-sky-400 font-bold">{designSkill}%</span>
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
                    </div>
                  )}

                  {/* Step 3: Experience */}
                  {assessmentStep === 3 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Verify Practical Experience</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Select verified items recorded in your credential system.</p>
                      </div>
                      
                      <div className="space-y-2.5 pt-3">
                        {experiences.map((exp, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleToggleExp(idx)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                              exp.done
                                ? "border-sky-500/20 bg-sky-500/5 text-white"
                                : "border-white/5 bg-white/[0.01] text-muted-foreground hover:border-white/10"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              exp.done ? "border-sky-400 bg-sky-400 text-slate-950" : "border-white/20"
                            }`}>
                              {exp.done && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-semibold">{exp.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Goals */}
                  {assessmentStep === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Set Target Objectives</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Identify your primary strategic growth target.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3">
                        {[
                          { key: "Land FAANG Internship", desc: "Focus on DSA & algorithmic structures" },
                          { key: "Build & Launch SaaS", desc: "Focus on MVP buildouts & cloud execution" },
                          { key: "Publish Research", desc: "Focus on scientific writeups & quantitative data" },
                          { key: "Mentor Career Placements", desc: "Focus on expert advisor mock simulations" }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setGoal(item.key)}
                            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-24 ${
                              goal === item.key
                                ? "border-sky-500/50 bg-sky-500/5"
                                : "border-white/5 bg-white/[0.01] hover:border-white/10"
                            }`}
                          >
                            <span className={`text-xs font-black ${goal === item.key ? "text-sky-400" : "text-white"}`}>{item.key}</span>
                            <span className="text-[9px] text-muted-foreground/60 leading-tight mt-1">{item.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Challenges */}
                  {assessmentStep === 5 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Identify Roadblocks</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Select blocks slowing your growth districts.</p>
                      </div>

                      <div className="space-y-2.5 pt-3">
                        {challenges.map((ch, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleToggleChallenge(idx)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                              ch.done
                                ? "border-sky-500/20 bg-sky-500/5 text-white"
                                : "border-white/5 bg-white/[0.01] text-muted-foreground hover:border-white/10"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              ch.done ? "border-sky-400 bg-sky-400 text-slate-950" : "border-white/20"
                            }`}>
                              {ch.done && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-semibold">{ch.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Timeline */}
                  {assessmentStep === 6 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Define Preparation Timeline</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Establish timing thresholds for placing your target offers.</p>
                      </div>

                      <div className="pt-6 space-y-6">
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                          <span className="text-[9px] font-mono text-muted-foreground uppercase">Target Placement Window</span>
                          <h3 className="text-3xl font-black text-white mt-1 leading-none">{prepMonths} Months</h3>
                          <p className="text-[9px] text-sky-400 font-mono mt-1.5 uppercase font-bold">Planned completion: Dec 2026</p>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          value={prepMonths}
                          onChange={(e) => setPrepMonths(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-muted-foreground/60 uppercase">
                          <span>1 Month (Fast-track)</span>
                          <span>12 Months (Gradual)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 7: Finish */}
                  {assessmentStep === 7 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-black text-white font-display">Generate Detailed Report</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Compile your final diagnostic and benchmark scores.</p>
                      </div>

                      <div className="pt-4 space-y-4">
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Shield className="h-4 w-4 text-sky-400" /> Standard Assessment Blueprint
                          </h5>
                          <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                            Compiling includes Predicted Success Probability index ({successProbability}%), strengths score ({strengths}%), and live advisor gaps list.
                          </p>
                        </div>

                        <button
                          onClick={executeSubmission}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 hover:opacity-95 cursor-pointer transition shadow-lg shadow-sky-500/10"
                        >
                          Finish Assessment & Compile <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Navigation */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-6 shrink-0">
                  <button
                    disabled={assessmentStep <= 1}
                    onClick={() => setAssessmentStep((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-xs text-white bg-transparent transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                  >
                    Back
                  </button>
                  
                  {assessmentStep < 7 && (
                    <button
                      onClick={() => setAssessmentStep((prev) => Math.min(7, prev + 1))}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-950 hover:opacity-90 transition cursor-pointer flex items-center gap-1"
                    >
                      Continue <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Column 3: Live Preview HUD Dashboard Card (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/5">
                Live preview
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/60 uppercase">Real-time sync</span>
            </div>

            {/* Circular Success gauge */}
            <div className="mt-5 flex flex-col items-center text-center">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold mb-2.5">
                Predicted success probability
              </span>
              
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="rgba(255,255,255,0.02)"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="url(#successGradientRadial)"
                    strokeWidth="5.5"
                    fill="transparent"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * successProbability) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                  <defs>
                    <linearGradient id="successGradientRadial" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                  <span className="text-2xl font-black text-white">
                    {successProbability}%
                  </span>
                  <span className="text-[7px] text-muted-foreground uppercase mt-1 font-semibold font-mono">Peer-Normalized</span>
                </div>
              </div>
            </div>

            {/* Sub-Metrics progress indicators */}
            <div className="mt-6 space-y-3.5 pt-4 border-t border-white/5">
              {/* Strengths */}
              <div>
                <div className="flex justify-between text-[9px] font-mono mb-1 leading-none">
                  <span className="text-muted-foreground">Strengths</span>
                  <span className="text-emerald-400 font-bold">{strengths}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${strengths}%` }}
                  />
                </div>
              </div>

              {/* Opportunities */}
              <div>
                <div className="flex justify-between text-[9px] font-mono mb-1 leading-none">
                  <span className="text-muted-foreground">Opportunities</span>
                  <span className="text-sky-400 font-bold">{opportunities}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all duration-500"
                    style={{ width: `${opportunities}%` }}
                  />
                </div>
              </div>

              {/* Risks */}
              <div>
                <div className="flex justify-between text-[9px] font-mono mb-1 leading-none">
                  <span className="text-muted-foreground">Risks</span>
                  <span className="text-rose-400 font-bold">{risks}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full transition-all duration-500"
                    style={{ width: `${risks}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI observations bullet recommendations */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2.5">
              <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider font-semibold">
                Real-time AI Insights
              </div>
              <ul className="space-y-2 text-[10px] text-white/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {techSkill > 70
                      ? "Strong publication trajectory and quantitative logic base."
                      : "Moderate logical baseline, expand algorithmic checks."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {designSkill > 40
                      ? "Favorable positioning in underserved domain channels."
                      : "Underserved niche opportunity (high demand detected)."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {commsSkill > 50
                      ? "Mentor coverage fully adequate for placements search."
                      : "Schedule mock assessments in expert dashboard."}
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Report download button */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 hover:opacity-95 cursor-pointer transition shadow-lg shadow-sky-500/10"
            >
              <Download className="h-3.5 w-3.5" /> Generate Deep AI Assessment PDF
            </button>
          </div>

        </div>

      </div>

      {/* ─── AI ANALYSIS DASHBOARD ─── */}
      <div className="mt-8 space-y-6">
        {/* Readiness cards row */}
        <div>
          <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-sky-400" /> AI Readiness Analysis
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Career Readiness", pct: Math.min(100, Math.round(successProbability * 0.9)), color: "sky", icon: "🚀" },
              { label: "Industry Readiness", pct: Math.min(100, Math.round(successProbability * 0.76)), color: "violet", icon: "🏢" },
              { label: "Research Readiness", pct: Math.min(100, Math.round(successProbability * 0.65)), color: "emerald", icon: "🔬" },
              { label: "Startup Readiness", pct: Math.min(100, Math.round(successProbability * 0.71)), color: "amber", icon: "⚡" },
            ].map(({ label, pct, color, icon }) => {
              const circumference = 2 * Math.PI * 36;
              const offset = circumference - (circumference * pct) / 100;
              return (
                <div key={label} className="relative p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-3">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                      <circle
                        cx="40" cy="40" r="36" fill="none"
                        stroke={color === "sky" ? "#38bdf8" : color === "violet" ? "#a78bfa" : color === "emerald" ? "#34d399" : "#fbbf24"}
                        strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg">{icon}</span>
                      <span className={`text-[11px] font-black ${
                        color === "sky" ? "text-sky-400" : color === "violet" ? "text-violet-400" : color === "emerald" ? "text-emerald-400" : "text-amber-400"
                      }`}>{pct}%</span>
                    </div>
                  </div>
                  <h4 className="text-[11px] font-bold text-white">{label}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career Paths + DNA row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recommended Career Paths */}
          <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
            <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-violet-400" /> Recommended Career Paths
            </h3>
            <div className="space-y-3">
              {[
                { role: "AI Engineer", match: Math.min(100, Math.round(successProbability * 0.92)), icon: "🤖", color: "sky" },
                { role: "Data Scientist", match: Math.min(100, Math.round(successProbability * 0.87)), icon: "📊", color: "violet" },
                { role: "Research Scientist", match: Math.min(100, Math.round(successProbability * 0.84)), icon: "🔬", color: "emerald" },
                { role: "Product Engineer", match: Math.min(100, Math.round(successProbability * 0.79)), icon: "⚙️", color: "amber" },
              ].map(({ role, match, icon, color }) => (
                <div key={role} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition">
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-black text-white">{role}</span>
                      <span className={`text-[10px] font-mono font-bold ${
                        color === "sky" ? "text-sky-400" : color === "violet" ? "text-violet-400" : color === "emerald" ? "text-emerald-400" : "text-amber-400"
                      }`}>{match}% match</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          color === "sky" ? "bg-sky-400" : color === "violet" ? "bg-violet-400" : color === "emerald" ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                        style={{ width: `${match}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional DNA */}
          <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
            <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" /> Professional DNA Analysis
            </h3>
            <div className="space-y-3">
              {[
                { label: "Technical DNA", pct: techSkill, color: "sky" },
                { label: "Research DNA", pct: researchSkill, color: "violet" },
                { label: "Leadership DNA", pct: commsSkill, color: "emerald" },
                { label: "Communication DNA", pct: Math.round((commsSkill + designSkill) / 2), color: "amber" },
                { label: "Entrepreneurship DNA", pct: designSkill, color: "rose" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-[9px] font-mono mb-1.5">
                    <span className="text-muted-foreground/70">{label}</span>
                    <span className={`font-bold ${
                      color === "sky" ? "text-sky-400" : color === "violet" ? "text-violet-400" : color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400"
                    }`}>{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        color === "sky" ? "bg-gradient-to-r from-sky-400 to-blue-500" :
                        color === "violet" ? "bg-gradient-to-r from-violet-400 to-purple-500" :
                        color === "emerald" ? "bg-gradient-to-r from-emerald-400 to-teal-500" :
                        color === "amber" ? "bg-gradient-to-r from-amber-400 to-orange-500" :
                        "bg-gradient-to-r from-rose-400 to-pink-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Next Actions */}
        <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/5 via-violet-500/5 to-slate-900/40 backdrop-blur-md">
          <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> AI Recommended Next Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { action: "Build Portfolio", desc: "Add 2 AI projects", icon: "🚀", color: "sky" },
              { action: "Complete AI Project", desc: "ML Classifier task", icon: "⚡", color: "violet" },
              { action: "Join Hackathon", desc: "Next in 14 days", icon: "🏆", color: "emerald" },
              { action: "Connect Mentor", desc: "Dr. Helena available", icon: "🤝", color: "amber" },
            ].map(({ action, desc, icon, color }) => (
              <button key={action} className={`group p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                color === "sky" ? "border-sky-500/20 bg-sky-500/5 hover:border-sky-500/40" :
                color === "violet" ? "border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40" :
                color === "emerald" ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40" :
                "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40"
              }`}>
                <span className="text-2xl block mb-2">{icon}</span>
                <h4 className="text-[11px] font-black text-white">{action}</h4>
                <p className="text-[9px] text-muted-foreground/60 mt-1">{desc}</p>
                <ChevronRight className={`h-3 w-3 mt-2 ${
                  color === "sky" ? "text-sky-400" : color === "violet" ? "text-violet-400" : color === "emerald" ? "text-emerald-400" : "text-amber-400"
                } opacity-0 group-hover:opacity-100 transition`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
