import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, FlaskConical, Rocket, TrendingUp, Target, Building2,
  ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layout, Terminal, Bot, Shield, Check
} from "lucide-react";
import { Role } from "@/hooks/useRole";

interface OnboardingWizardProps {
  onComplete: (role: Role) => void;
}

const ROLES = [
  {
    id: "student",
    icon: GraduationCap,
    label: "Student",
    emoji: "🎓",
    desc: "Build skills, network, and find placement opportunities.",
    glow: "rgba(139,92,246,0.25)",
    border: "rgba(139,92,246,0.3)",
  },
  {
    id: "researcher",
    icon: FlaskConical,
    label: "Researcher",
    emoji: "🔬",
    desc: "Collaborate on research papers, patents, and get grants.",
    glow: "rgba(34,211,238,0.2)",
    border: "rgba(34,211,238,0.3)",
  },
  {
    id: "founder",
    icon: Rocket,
    label: "Startup Founder",
    emoji: "🚀",
    desc: "Scale your startup, manage equity, and pitch to LPs.",
    glow: "rgba(251,146,60,0.2)",
    border: "rgba(251,146,60,0.3)",
  },
  {
    id: "investor",
    icon: TrendingUp,
    label: "Investor",
    emoji: "💰",
    desc: "Track startup deal flows and manage asset portfolios.",
    glow: "rgba(74,222,128,0.2)",
    border: "rgba(74,222,128,0.3)",
  },
  {
    id: "expert",
    icon: Target,
    label: "Industry Expert",
    emoji: "🎯",
    desc: "Offer consultations, mentor clients, and earn hourly.",
    glow: "rgba(244,114,182,0.2)",
    border: "rgba(244,114,182,0.3)",
  },
  {
    id: "university",
    icon: Building2,
    label: "University Admin",
    emoji: "🏛",
    desc: "Monitor placements, audits, and department analytics.",
    glow: "rgba(96,165,250,0.2)",
    border: "rgba(96,165,250,0.3)",
  },
] as const;

interface QuestionData {
  q1: string;
  q1Opts: string[];
  q2: string;
  q2Opts: string[];
}

const QUESTIONNAIRE_DATA: Record<string, QuestionData> = {
  student: {
    q1: "What is your primary academic domain?",
    q1Opts: ["Computer Science / IT", "Engineering", "Business / Finance", "Science / Research", "Humanities & Liberal Arts"],
    q2: "What is your immediate career goal?",
    q2Opts: ["Land a tech role", "Apply to grad school / PhD", "Launch a startup", "Explore corporate internships"],
  },
  researcher: {
    q1: "What is your primary research domain?",
    q1Opts: ["AI / Machine Learning", "Biotechnology & Healthcare", "Quantum Computing & Tech", "Economics & Social Sciences", "Material Engineering"],
    q2: "What is your current focus?",
    q2Opts: ["Writing thesis/dissertation", "Publishing to international journals", "Applying for government funding", "Filing patent disclosures"],
  },
  founder: {
    q1: "What is your startup's current stage?",
    q1Opts: ["Ideation / Pre-product", "MVP / Beta Testing", "Generating Revenue (Bootstrapped)", "Seed Funded / Venture Backed"],
    q2: "What is your most pressing challenge?",
    q2Opts: ["Finding technical co-founders", "Pitching to investors", "Product-market fit validation", "Hiring early-stage talent"],
  },
  investor: {
    q1: "What is your primary investment focus?",
    q1Opts: ["B2B SaaS & AI Systems", "DeepTech & Hard Sciences", "Fintech & Web3", "Consumer Tech & Platforms"],
    q2: "What is your typical ticket size?",
    q2Opts: ["<$100k (Angel)", "$100k - $500k (Pre-Seed)", "$500k - $2M (Seed/Seed+)", ">$2M (Series A)"],
  },
  expert: {
    q1: "What is your primary mentorship area?",
    q1Opts: ["Software Architecture & Dev", "Product Management & Marketing", "Fundraising & Finance", "Career Planning & Resumes"],
    q2: "How many years of industry experience do you have?",
    q2Opts: ["1 - 3 years", "3 - 7 years", "7 - 12 years", "12+ years"],
  },
  university: {
    q1: "What is your main administrative objective?",
    q1Opts: ["Improving campus placement rates", "Streamlining NAAC/Accreditation audits", "Incubating student spin-offs", "Managing faculty research grants"],
    q2: "How many students does your institution serve?",
    q2Opts: ["Under 1,000", "1,000 - 5,000", "5,000 - 15,000", "15,000+"],
  },
};

/* ───────────────────────── BACKGROUND ───────────────────────── */
function RainBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes hii {
          0% {
            backdrop-filter: blur(0.85em) brightness(4) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(0.85em) brightness(4) hue-rotate(0deg);
          }
          100% {
            backdrop-filter: blur(0.85em) brightness(4) hue-rotate(360deg);
            -webkit-backdrop-filter: blur(0.85em) brightness(4) hue-rotate(360deg);
          }
        }

        @keyframes hi {
          0% {
            background-position:
              0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px,
              50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 350.5px,
              100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px,
              150px 31px, 153px 31px, 301.5px 120.5px, 175px 235px, 178px 235px, 326.5px 384.5px,
              200px 121px, 203px 121px, 351.5px 228.5px, 225px 224px, 228px 224px, 376.5px 364.5px,
              250px 26px, 253px 26px, 401.5px 105px, 275px 75px, 278px 75px, 426.5px 180px;
          }
          100% {
            background-position:
              0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px,
              50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px,
              100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px,
              150px 9876px, 153px 9876px, 301.5px 9965.5px, 175px 13391px, 178px 13391px, 326.5px 13540.5px,
              200px 14741px, 203px 14741px, 351.5px 14848.5px, 225px 18770px, 228px 18770px, 376.5px 18910.5px,
              250px 5082px, 253px 5082px, 401.5px 5161px, 275px 6375px, 278px 6375px, 426.5px 6480px;
          }
        }

        .rain-container-onb {
          position: relative;
          width: 100%;
          height: 100%;
          --c: #a855f7; /* Premium neon purple */
          background-color: #03010a;
          background-image: 
            radial-gradient(4px 100px at 0px 235px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 235px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 117.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 252px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 252px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 126px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 150px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 150px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 75px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 253px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 253px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 126.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 204px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 204px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 102px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 134px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 134px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 67px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 179px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 179px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 89.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 299px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 299px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 149.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 215px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 215px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 107.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 281px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 281px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 140.5px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 158px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 158px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 79px, var(--c) 100%, #0000 150%),
            radial-gradient(4px 100px at 0px 210px, var(--c), #0000),
            radial-gradient(4px 100px at 300px 210px, var(--c), #0000),
            radial-gradient(1.5px 1.5px at 150px 105px, var(--c) 100%, #0000 150%);
          background-size:
            300px 235px, 300px 235px, 300px 235px, 300px 252px, 300px 252px, 300px 252px,
            300px 150px, 300px 150px, 300px 150px, 300px 253px, 300px 253px, 300px 253px,
            300px 204px, 300px 204px, 300px 204px, 300px 134px, 300px 134px, 300px 134px,
            300px 179px, 300px 179px, 300px 179px, 300px 299px, 300px 299px, 300px 299px,
            300px 215px, 300px 215px, 300px 215px, 300px 281px, 300px 281px, 300px 281px,
            300px 158px, 300px 158px, 300px 158px, 300px 210px, 300px 210px, 300px 210px;
          animation: hi 120s linear infinite;
        }

        .rain-container-onb::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: radial-gradient(
            circle at 50% 50%,
            #0000 0,
            #0000 2px,
            hsl(270 20% 4%) 2px
          );
          background-size: 8px 8px;
          animation: hii 10s linear infinite;
        }
      `}</style>
      <div className="rain-container-onb absolute inset-0 w-full h-full" />
    </div>
  );
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | "">("");
  const [q1Val, setQ1Val] = useState("");
  const [q2Val, setQ2Val] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("vision-pro");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Calibrating holographic grid...");

  // Progress animation on step 4
  useEffect(() => {
    if (step === 4) {
      const texts = [
        "Calibrating holographic grid...",
        "Instantiating AI widgets...",
        "Building command modules...",
        "Establishing encrypted terminal tunnels...",
        "Finalizing control interfaces...",
      ];
      
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (selectedRole) onComplete(selectedRole as Role);
            }, 500);
            return 100;
          }
          // Shift text based on progress
          const textIdx = Math.min(Math.floor(prev / 20), texts.length - 1);
          setLoadingText(texts[textIdx]);
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [step, selectedRole]);

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId);
    setQ1Val("skipped");
    setQ2Val("skipped");
    setStep(3);
  };

  const handleFinalSubmit = () => {
    setStep(4);
  };

  const currentQuestionData = null;

  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden bg-black text-white px-4">
      <RainBackground />

      {/* Progress Dots */}
      {step < 4 && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {[1, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  step === num
                    ? "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] scale-125"
                    : step > num
                    ? "bg-green-400"
                    : "bg-white/10"
                }`}
              />
              {num < 3 && <div className={`h-[1px] w-8 bg-white/10 ${step > num ? "bg-green-400/50" : ""}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Main glass frame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[720px] rounded-[28px] overflow-hidden border border-violet-500/25 z-10"
          style={{
            boxShadow:
              "0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(139,92,246,0.08)",
          }}
        >
          {/* Glass Fill */}
          <div
            className="absolute inset-0 rounded-[28px]"
            style={{
              background: "linear-gradient(170deg, rgba(16,12,32,0.94) 0%, rgba(8,6,18,0.97) 60%, rgba(12,9,24,0.95) 100%)",
              backdropFilter: "blur(50px) saturate(1.4)",
              WebkitBackdropFilter: "blur(50px) saturate(1.4)",
            }}
          />

          <div className="relative p-8 sm:p-10 flex flex-col items-center">
            {/* Step 1: Select Profession */}
            {step === 1 && (
              <div className="w-full text-center">
                <div className="flex justify-center mb-3">
                  <div
                    className="h-10 w-10 rounded-[12px] flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(167,139,250,0.8) 0%, rgba(103,232,249,0.6) 50%, rgba(129,140,248,0.8) 100%)",
                      boxShadow: "0 10px 30px rgba(139,92,246,0.3)",
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display mb-1.5">
                  Choose Your Profession
                </h2>
                <p className="text-xs text-white/40 mb-8 max-w-[420px] mx-auto">
                  Customize your cockpit experience. Select a specialized console layout tailored to your professional workspace.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {ROLES.map((role) => (
                    <motion.button
                      key={role.id}
                      type="button"
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleRoleSelect(role.id as Role)}
                      className="relative rounded-2xl p-4 text-left border border-white/[0.05] bg-white/[0.01] hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-300 flex items-start gap-3.5 group cursor-default select-none overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 0% 0%, ${role.glow}, transparent 65%)`,
                        }}
                      />
                      <div className="relative z-10 text-2xl h-10 w-10 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {role.emoji}
                      </div>
                      <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono tracking-widest text-violet-400 font-bold uppercase">Console</span>
                          <ChevronRight className="h-3 w-3 text-white/20 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {role.label}
                        </h4>
                        <p className="text-[10.5px] text-white/30 leading-snug mt-1">
                          {role.desc}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Role Specific Q&A (Removed) */}

            {/* Step 3: Platform Preferences */}
            {step === 3 && (
              <div className="w-full">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-display mb-1">
                    HUD & AI Options
                  </h3>
                  <p className="text-[11px] text-white/35">
                    Optimize layout widgets and AI parameters to personalize your cockpit interface.
                  </p>
                </div>

                <div className="space-y-6 max-w-[500px] mx-auto">
                  {/* UI Style Theme Selection */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-violet-400 font-bold mb-3 flex items-center gap-1.5">
                      <Layout className="h-3.5 w-3.5" />
                      Interface Theme Mode
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "vision-pro", label: "Apple Vision Pro Glass", desc: "Premium transparent blur" },
                        { id: "cyberpunk", label: "Holographic Cyberpunk", desc: "Bright vectors and glows" },
                      ].map((t) => {
                        const isSel = selectedTheme === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTheme(t.id)}
                            className={`rounded-xl p-3 text-left transition-all duration-200 cursor-default select-none border ${
                              isSel
                                ? "bg-violet-600/10 border-violet-500/50 text-white font-bold"
                                : "bg-white/[0.01] border-white/[0.05] text-white/60 hover:bg-white/[0.03] hover:border-white/10"
                            }`}
                          >
                            <h5 className="text-[11.5px]">{t.label}</h5>
                            <p className="text-[9.5px] text-white/30 leading-snug mt-0.5">{t.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Toggles */}
                  <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                    <div>
                      <h5 className="text-[11.5px] font-bold text-white flex items-center gap-1.5">
                        <Bot className="h-4 w-4 text-violet-400" />
                        AI Agent Integration
                      </h5>
                      <p className="text-[9.5px] text-white/35 mt-0.5">
                        Activate automated due-diligence, copilot drafting, and audits.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiEnabled(!aiEnabled)}
                      className={`h-5 w-9 rounded-full transition-colors relative flex items-center ${
                        aiEnabled ? "bg-violet-500" : "bg-white/10"
                      }`}
                    >
                      <motion.div
                        layout
                        className="h-3.5 w-3.5 bg-white rounded-full absolute"
                        style={{ left: aiEnabled ? "18px" : "3px" }}
                      />
                    </button>
                  </div>

                  {/* Security / Compliance Indicators */}
                  <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                    <div>
                      <h5 className="text-[11.5px] font-bold text-white flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-violet-400" />
                        Accreditation Status
                      </h5>
                      <p className="text-[9.5px] text-white/35 mt-0.5">
                        Enable cryptographic 2FA controls and audit lock flags.
                      </p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                </div>

                {/* Back / Next Controls */}
                <div className="flex gap-3 justify-end max-w-[500px] mx-auto mt-8 pt-3 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-white/[0.06] hover:bg-white/5 text-white text-[11px] font-mono uppercase tracking-widest rounded-xl transition cursor-default"
                  >
                    Console Menu
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-6 py-2.5 text-white text-[11px] font-mono uppercase tracking-widest rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-[0_4px_16px_rgba(124,58,237,0.3)] flex items-center gap-1.5 cursor-default transition"
                  >
                    Build Cockpit
                    <Terminal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Loading Screen */}
            {step === 4 && (
              <div className="w-full text-center py-6">
                <div className="relative mb-8 flex justify-center">
                  {/* Dynamic rotating outer glow ring */}
                  <div className="absolute h-20 w-20 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                  <div className="h-20 w-20 rounded-full bg-violet-600/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-violet-400 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-base font-mono uppercase tracking-widest text-violet-400 font-bold mb-1">
                  Synthesizing Console OS
                </h3>
                <p className="text-xs text-white/40 mb-6 font-mono h-4">
                  {loadingText}
                </p>

                {/* Loading Progress Bar */}
                <div className="w-full max-w-[320px] mx-auto bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-white/20 mt-2">
                  LOADING PROCESS: {loadingProgress}%
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
