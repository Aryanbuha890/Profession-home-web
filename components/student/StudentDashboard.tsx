'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Page, Card, Bar, Stat } from "@/components/app/Page";
import { CopilotChat, GlowingOrb } from "@/components/app/CopilotChat";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Trophy, Brain, Map, Users, Compass, Briefcase, Bot, Award,
  Circle, Mic, Ticket, ChevronRight, Plus, Flame, CheckCircle, Clock,
  ExternalLink, ChevronDown, Lock, Download, Share2, Calendar, DollarSign,
  TrendingUp, FileText, ShieldCheck, Zap, Play, RotateCcw, BookOpen, Filter,
  Search, CheckCircle2, AlertCircle, PlusCircle, ChevronUp, GraduationCap,
  Coins, Settings, ScrollText, Send, Trash2, Check, Info, ArrowRight, Activity,
  FileSpreadsheet, Layers, Unlock, MessageSquare, Eye, CheckSquare, X, Github,
  GitBranch, GitCommit, Terminal, ArrowUpRight, Loader2, ChevronLeft, ImageOff,
  Upload, Folder,
} from "lucide-react";
import Link from "next/link";

const CODE39_PATTERNS: Record<string, string> = {
  '0': '101001101101', '1': '110100101011', '2': '101100101011', '3': '110110010101',
  '4': '101001100111', '5': '110100110010', '6': '101100110010', '7': '101001100110',
  '8': '110100110011', '9': '101100110011', 'A': '110101001011', 'B': '101101001011',
  'C': '110110100101', 'D': '101011001011', 'E': '110101100101', 'F': '101101100101',
  'G': '101010011011', 'H': '110101001101', 'I': '101101001101', 'J': '101011001101',
  'K': '110101010011', 'L': '101101010011', 'M': '110110101001', 'N': '101011010011',
  'O': '110101101001', 'P': '101101101001', 'Q': '101010110011', 'R': '110101011001',
  'S': '101101011001', 'T': '101011011001', 'U': '110010101011', 'V': '100110101011',
  'W': '110011010101', 'X': '100101101011', 'Y': '110010110101', 'Z': '100111010101',
  '-': '100101011011', '.': '110010101101', ' ': '100110101101', '*': '100101101101'
};

const ScannableCode39Barcode = ({ value, className = "w-12 text-black" }: { value: string; className?: string }) => {
  const cleanValue = `*${value.toUpperCase().replace(/[^A-Z0-9\-\.\s]/g, "")}*`;
  let binaryString = "";
  for (const char of cleanValue) {
    binaryString += (CODE39_PATTERNS[char] || CODE39_PATTERNS[' ']) + "0";
  }

  // Generate crisp 1px lines using HTML divs for perfect physical pixel alignment (prevents subpixel vector blurring on screens)
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < binaryString.length; i++) {
    const isBlack = binaryString[i] === '1';
    bars.push(
      <div
        key={i}
        style={{ height: '1px' }}
        className={isBlack ? "bg-black w-full shrink-0" : "bg-white w-full shrink-0"}
      />
    );
  }

  return (
    <div className={`flex flex-col items-center bg-white p-2 rounded shadow-sm border border-slate-200/80 ${className}`}>
      <div className="w-full flex flex-col select-none pointer-events-none">
        {bars}
      </div>
    </div>
  );
};

const getCategoryStyles = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("vip") || t.includes("summit")) {
    return {
      gradient: "linear-gradient(135deg, #7c3aed, #db2777)", // Purple to Pink
      accent: "#db2777",
      label: "VIP ACCESS"
    };
  }
  if (t.includes("voucher") || t.includes("arena")) {
    return {
      gradient: "linear-gradient(135deg, #f97316, #eab308)", // Orange to Yellow
      accent: "#f97316",
      label: "VOUCHER"
    };
  }
  if (t.includes("strategy")) {
    return {
      gradient: "linear-gradient(135deg, #e11d48, #be123c)", // Rose to Crimson
      accent: "#e11d48",
      label: "STRATEGY"
    };
  }
  if (t.includes("audit")) {
    return {
      gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)", // Indigo to Purple
      accent: "#4f46e5",
      label: "AUDIT"
    };
  }
  if (t.includes("data")) {
    return {
      gradient: "linear-gradient(135deg, #2563eb, #06b6d4)", // Blue to Cyan
      accent: "#2563eb",
      label: "DATA"
    };
  }
  return {
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)", // Blue to Indigo
    accent: "#3b82f6",
    label: "PASS"
  };
};

const getPrivileges = (type: string): string[] => {
  const t = type.toLowerCase();
  if (t.includes("vip")) {
    return [
      "Full expert review of resume formatting & ATS optimization",
      "Interactive checklist scoring with AI criteria matches",
      "Direct queue placement for hiring agent audits"
    ];
  }
  if (t.includes("voucher")) {
    return [
      "1-on-1 virtual mentoring session with verified tech leads",
      "Architecture critique & code organization assessment",
      "Pre-scheduled calendar booking window"
    ];
  }
  if (t.includes("strategy")) {
    return [
      "30-minute founder growth scaling plan audit",
      "Pitch deck structure critique & angel funding alignment",
      "Direct introduction routing to core syndicate partners"
    ];
  }
  if (t.includes("audit")) {
    return [
      "Comprehensive slide-by-slide feedback and comment summary",
      "TAM & financial projection modeling audit",
      "Founder storytelling check by capital general partners"
    ];
  }
  if (t.includes("summit")) {
    return [
      "VIP pass entry to annual GP-LP networking dinner at Bangalore Club",
      "Exclusive face-to-face pitch time with 12+ general partners",
      "Print and digital version of Syndicate Fund portfolio booklet"
    ];
  }
  if (t.includes("arena")) {
    return [
      "5-minute live demo pitch block to top technical scouts",
      "Automated profile sync with participating deep-tech founders",
      "Stripe startup credits allocation packet code"
    ];
  }
  if (t.includes("data")) {
    return [
      "3-month premium license extension of Bloomberg terminal metrics",
      "Access to private benchmarking datasets for SaaS/Marketplaces",
      "Curated commodity research charts from Syndicate data vault"
    ];
  }
  return [
    "Standard access to Professional Home student programs",
    "Participation in weekly community review workshops",
    "Community discord networking channel entry"
  ];
};

export function HolographicTicket({
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
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const categoryStyles = getCategoryStyles(type);

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="ticket-wrapper cursor-pointer select-none relative group"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
          fontSize: "12px",
        }}
      >
        {/* Real-size Ticket container - Bigger premium sizes */}
        <div
          className="relative flex h-[210px] w-full max-w-[500px] bg-gradient-to-br from-white to-slate-50/95 border border-slate-200/90 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-xl group-hover:border-slate-300/90"
        >
          {/* Holographic light reflect overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 transition duration-300 group-hover:opacity-35"
            style={{
              background: `radial-gradient(circle at ${tilt.x * 200 + 50}% ${tilt.y * 200 + 50}%, rgba(0, 0, 0, 0.04) 0%, transparent 60%)`,
            }}
          />

          {/* Sweeping premium gloss sheen effect */}
          <div className="absolute inset-0 w-[120px] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 -translate-x-[200px] group-hover:translate-x-[600px] transition-transform duration-1000 ease-out pointer-events-none z-20" />

          {/* Left barcode stub - Always fully visible, raw, scannable barcode */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsScanModalOpen(true);
            }}
            className="w-[84px] shrink-0 flex flex-col items-center justify-center bg-slate-50/40 border-r border-dashed border-slate-200/90 px-2.5 relative"
          >
            <ScannableCode39Barcode value={admitNo} className="w-[52px]" />
            <span className="mt-2 text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest z-10 select-none">
              PH-{admitNo.split("-")[1] || admitNo}
            </span>
          </div>

          {/* Perforation holes & dashed separator */}
          <div className="absolute top-0 bottom-0 left-[82px] w-4 flex flex-col items-center justify-between pointer-events-none z-20">
            <div className="w-3.5 h-3.5 rounded-full bg-[#03010a] -mt-1.5 border border-white/5 shadow-inner" />
            <div className="flex-1 w-[1px] border-l border-dashed border-[#e8e8e8] my-1" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#03010a] -mb-1.5 border border-white/5 shadow-inner" />
          </div>

          {/* Main Content (Middle part) */}
          <div className="flex-1 flex flex-col justify-between p-4 pl-6 bg-transparent relative pr-18 text-slate-800">
            {/* Flight-like routing details */}
            <div className="flex items-center justify-between text-[10px] font-mono leading-none border-b border-[#f0f0f0] pb-2">
              <div>
                <p className="text-slate-400 text-[9px] uppercase tracking-wide">STUDENT OS</p>
                <p className="font-extrabold text-base text-slate-700 tracking-tight mt-0.5">STD</p>
                <p className="text-[9px] text-emerald-500 font-bold mt-0.5">â†— ACTIVE</p>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#aeaeae" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              <div className="text-right">
                <p className="text-slate-400 text-[9px] uppercase tracking-wide">PRO ZONE</p>
                <p className="font-extrabold text-base tracking-tight mt-0.5" style={{ color: categoryStyles.accent }}>PRO</p>
                <p className="text-[9px] text-indigo-500 font-bold mt-0.5">â†˜ LEVEL 4</p>
              </div>
            </div>

            {/* Title & Subtitle details */}
            <div className="my-1.5">
              <h4 className="text-sm font-bold text-[#2d2d2d] uppercase leading-tight font-display tracking-tight">
                {title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                {subtitle}
              </p>
            </div>

            {/* Details table matching reference flight ticket (Gate number removed) */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#f0f0f0] pt-2 text-[9px] font-mono">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wide block leading-none">PASSENGER</span>
                <span className="text-slate-800 font-extrabold text-xs uppercase leading-tight mt-0.5 block">Aryan Buha</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wide block leading-none">PASS ID</span>
                <span className="text-slate-800 font-extrabold text-xs uppercase leading-tight mt-0.5 block">{admitNo}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wide block leading-none">CATEGORY</span>
                <span className="text-slate-800 font-extrabold text-xs uppercase leading-tight mt-0.5 block">{type}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wide block leading-none">VALID THRU</span>
                <span className="text-slate-800 font-extrabold text-xs uppercase leading-tight mt-0.5 block">{validUntil}</span>
              </div>
            </div>
          </div>

          {/* Far Right colored strip with icons */}
          <div
            className="absolute right-0 top-0 bottom-0 w-14 flex flex-col items-center justify-between py-4 text-white z-10 overflow-hidden"
            style={{ background: categoryStyles.gradient }}
          >
            {/* Right-side strip gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/10 pointer-events-none mix-blend-overlay z-0" />

            {/* Top student icon (Plane logo replaced with GraduationCap student related logo) */}
            <GraduationCap className="h-6.5 w-6.5 text-white/95 relative z-10" />

            {/* Category marker rotated */}
            <div className="text-[8px] font-mono font-extrabold tracking-widest uppercase rotate-90 my-auto origin-center whitespace-nowrap text-white/90 relative z-10">
              {categoryStyles.label}
            </div>

            {/* Bottom PH logo (Professional Home logo in the strip bottom, not in the card body) */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md select-none border border-white/20 relative z-10 transition duration-300 hover:scale-105 active:scale-95">
              <span className="bg-gradient-to-br from-sky-500 to-indigo-600 bg-clip-text text-transparent font-sans text-[10px] font-black tracking-tighter">PH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scanned ticket info modal */}
      <AnimatePresence>
        {isScanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white overflow-hidden shadow-2xl"
            >
              {/* Scan beam animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent w-full h-1/2 animate-pulse pointer-events-none" />

              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsScanModalOpen(false);
                }}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition duration-200"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4">
                  {/* Pulsing rings */}
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping" />
                  <Check className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white">Boarding Pass Verified</h3>
                <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">PH-SECURE-SCAN-v1.4</p>
              </div>

              {/* Details Grid */}
              <div className="mt-6 space-y-3 border-t border-b border-slate-800 py-4 font-mono text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs">PASSENGER:</span>
                  <span className="font-bold text-slate-200">Aryan Buha</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs">PASS ID:</span>
                  <span className="font-bold text-slate-200 text-emerald-400">{admitNo}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs">CATEGORY:</span>
                  <span className="font-bold px-2 py-0.5 rounded text-[11px] bg-slate-800 border border-slate-700 text-slate-200">
                    {type}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs">VALIDITY:</span>
                  <span className="font-bold text-slate-200">{validUntil}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs">STATUS:</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    ACTIVE & VALID
                  </span>
                </div>
              </div>

              {/* Benefits/Info Section */}
              <div className="mt-4">
                <h4 className="text-xs font-bold font-display tracking-wide uppercase text-slate-400 mb-2">Access Privileges:</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                  {getPrivileges(type).map((priv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">âœ“</span>
                      <span>{priv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer note */}
              <p className="mt-6 text-center text-[10px] text-slate-500 leading-snug">
                This pass is verified cryptographically by Professional Home. Scan signature: {btoa(admitNo).slice(0, 16)}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
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
          {[...Array(30)].map((_, i) => {
              const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
              const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
              return (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * vw,
                  y: -50,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: vh + 50,
                  rotate: Math.random() * 360,
                  x: `calc(${Math.random() * vw}px + ${Math.sin(i) * 50}px)`,
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
              );
            })}
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
                ðŸš€
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
                  âœ“ Saved to your Reward Center
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

const CATEGORY_COLORS: Record<string, string> = {
  'Web': '#00f0ff',
  'Mobile': '#00ff9d',
  'AI / ML': '#7000ff',
  'Systems': '#ff6a00',
  'Open Source': '#ff9a00',
};

interface InlineImageCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
  autoPlayMs?: number;
  overlay?: React.ReactNode;
}

const InlineImageCarousel: React.FC<InlineImageCarouselProps> = ({
  images,
  alt = 'image',
  className = 'h-48',
  autoPlayMs = 0,
  overlay,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [errored, setErrored] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    if (autoPlayMs > 0 && images.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIdx((i) => (i + 1) % images.length);
      }, autoPlayMs);
    }
    return stopAuto;
  }, [autoPlayMs, images.length, stopAuto]);

  const go = useCallback((delta: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopAuto();
    setActiveIdx((i) => (i + delta + images.length) % images.length);
  }, [images.length, stopAuto]);

  const onImgError = (idx: number) =>
    setErrored((prev) => new Set([...prev, idx]));

  if (images.length === 0) {
    return (
      <div className={`relative w-full overflow-hidden bg-slate-950/60 shrink-0 ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <ImageOff size={28} className="text-white/20" />
        </div>
        {overlay}
      </div>
    );
  }

  const singleMode = images.length === 1;

  return (
    <div className={`relative w-full overflow-hidden bg-slate-900 shrink-0 ${className}`}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: idx === activeIdx ? 1 : 0, pointerEvents: idx === activeIdx ? 'auto' : 'none' }}
          aria-hidden={idx !== activeIdx}
        >
          {errored.has(idx) ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-950">
              <ImageOff size={24} className="text-white/20" />
            </div>
          ) : (
            <img
              src={src}
              alt={`${alt} ${idx + 1}`}
              loading="lazy"
              onError={() => onImgError(idx)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      ))}

      {overlay}

      {!singleMode && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => go(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => go(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all duration-200"
          >
            <ChevronRight size={14} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); stopAuto(); setActiveIdx(idx); }}
                className={`rounded-full transition-all duration-300 border border-white/25 ${idx === activeIdx ? 'w-4.5 h-1.5 bg-orange-500 border-orange-500' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>

          <div className="absolute top-2.5 right-2.5 z-20 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/80 border border-white/10">
            {activeIdx + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
};

interface ProjectDetailsModalProps {
  project: any;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, handleKey]);

  if (!project) return null;

  const accent = CATEGORY_COLORS[project.category] ?? '#ff6a00';
  const full = project.fullDescription ?? project.desc ?? project.description;
  const features = project.features ?? [];
  const galleryImages = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9500] flex items-start justify-center px-4 py-6 md:py-10 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden my-auto bg-slate-950 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.85)] font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${accent}99 38%, ${accent}99 62%, transparent 95%)`,
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Banner Image / Carousel */}
          <div className="relative h-56 md:h-64 overflow-hidden bg-slate-900">
            <InlineImageCarousel images={galleryImages} className="h-full" alt={project.name} />

            {/* Fade overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,0.1) 100%)' }}
            />

            {/* Category badge */}
            <div className="absolute bottom-4 left-6 pointer-events-none">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border"
                style={{
                  background: `${accent}18`,
                  borderColor: `${accent}50`,
                  color: accent,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8 space-y-5 text-left">
            <h2 className="font-display font-bold text-2xl text-white leading-tight pr-8">
              {project.name}
            </h2>

            <div className="h-px bg-white/10" />

            {/* About */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-orange-500/90 font-bold flex items-center gap-1.5">
                <Layers size={12} /> About Project
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{full}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-orange-500/90 font-bold flex items-center gap-1.5">
                  <CheckCircle size={12} /> Key Features
                </h3>
                <ul className="space-y-1.5">
                  {features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/60">
                      <span
                        className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: accent }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-orange-500/90 font-bold flex items-center gap-1.5">
                <Layers size={12} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t: string) => (
                  <span
                    key={t}
                    className="inline-flex items-center text-[10.5px] font-mono px-2 py-0.5 rounded border bg-orange-500/10 border-orange-500/30 text-orange-400 select-none"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Pipeline stats if available */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-[10px] text-white/60">
              <div className="flex items-center gap-1.5">
                <GitBranch size={13} className="text-sky-400" />
                <span>Branch: <strong className="text-white">{project.branch || "main"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitCommit size={13} className="text-emerald-400" />
                <span>Commits: <strong className="text-white">{project.commits || 24}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-violet-400" />
                <span>Tests: <strong className="text-white">{project.tests || "10/10"}</strong></span>
              </div>
            </div>

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                <Users size={14} className="text-orange-500/80 shrink-0" />
                <span>
                  Author: <span className="text-white font-semibold">{project.author || "Aryan Buha"}</span>
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Opening Sandbox IDE for ${project.name}...`)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-all flex items-center gap-1 bg-transparent"
                >
                  <Terminal size={13} /> Open IDE
                </button>
                {project.github && (
                  <a
                    href={project.github.startsWith("http") ? project.github : `https://${project.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-white/10 text-white/90 hover:bg-slate-800 transition-all flex items-center gap-1"
                  >
                    <Github size={13} /> GitHub <ExternalLink size={10} className="opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newProject: any) => void;
  defaultAuthor?: string;
}

const sanitizeImageUrl = (url: string) => {
  const value = url.trim();
  if (!value) return "";
  if (value.startsWith("data:image/")) return value;

  try {
    const parsed = new URL(
      value,
      typeof window !== "undefined" ? window.location.origin : "http://localhost"
    );
    if (["http:", "https:", "blob:"].includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch {
    return "";
  }

  return "";
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultAuthor = 'Aryan Buha',
}) => {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [techStack, setTechStack] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [githubUrl, setGithubUrl] = useState('');
  const [category, setCategory] = useState<'Web' | 'Mobile' | 'AI / ML' | 'Systems' | 'Open Source'>('Web');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>(['']);
  const [authorName, setAuthorName] = useState(defaultAuthor);
  const [isPublished, setIsPublished] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setShortDesc('');
      setFullDesc('');
      setTechStack('');
      setFeatures(['']);
      setGithubUrl('');
      setCategory('Web');
      setImageUrl('');
      setGalleryUrls(['']);
      setAuthorName(defaultAuthor);
      setIsPublished(true);
      setErrors({});
      setSubmitting(false);
    }
  }, [isOpen, defaultAuthor]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Project title is required.';
    if (!shortDesc.trim()) e.shortDesc = 'Short description is required.';
    if (!fullDesc.trim()) e.fullDesc = 'Full description is required.';
    if (!techStack.trim()) e.techStack = 'Enter at least one technology.';
    if (!githubUrl.trim()) e.githubUrl = 'GitHub repository URL is required.';
    if (!authorName.trim()) e.authorName = 'Author name is required.';
    return e;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImageUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const techArray = techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const validFeatures = features.filter((f) => f.trim());
    const safeImageUrl = sanitizeImageUrl(imageUrl);
    const validGallery = galleryUrls.map(sanitizeImageUrl).filter(Boolean);

    const newProject = {
      id: `proj-${Date.now()}`,
      name: title.trim(),
      lang: techArray.slice(0, 3).join(' Â· '),
      progress: 10,
      status: 'Active Ideation',
      github: githubUrl.replace(/^https?:\/\//i, ''),
      branch: 'main',
      commits: 1,
      tests: '0/0',
      deployStatus: isPublished ? 'success' : 'idle',
      activity: [0, 0, 0, 0, 1, 2, 4, 3],
      techStack: techArray,
      category: category,
      image: safeImageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      desc: shortDesc.trim(),
      shortDescription: shortDesc.trim(),
      fullDescription: fullDesc.trim(),
      features: validFeatures.length > 0 ? validFeatures : ['Initial workspace configuration completed.'],
      author: authorName.trim(),
      images: [imageUrl.trim(), ...validGallery].filter(Boolean),
      isPublished: isPublished,
    };

    onSubmit(newProject);
    setSubmitting(false);
    onClose();
  };

  const safePreviewImageUrl = sanitizeImageUrl(imageUrl);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9500] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md px-4 py-8 sm:py-12"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-slate-955 border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] my-auto text-left font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-display font-bold text-white uppercase">Submit a Capstone Project</h2>
              <p className="text-[10px] text-white/50 font-mono mt-0.5">Community Build Vault</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-all p-1.5 hover:bg-white/10 rounded-lg"
              aria-label="Close form"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Project Title <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="e.g. Nexus OS"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
              />
              {errors.title && <p className="text-[10px] text-red-400 font-mono">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition cursor-pointer"
              >
                <option value="Web">Web Development</option>
                <option value="Mobile">Mobile Applications</option>
                <option value="AI / ML">AI & Machine Learning</option>
                <option value="Systems">Low-level Systems</option>
                <option value="Open Source">Open Source Packages</option>
              </select>
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Short Description <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="Brief 2-3 sentence overview..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
              />
              {errors.shortDesc && <p className="text-[10px] text-red-400 font-mono">{errors.shortDesc}</p>}
            </div>

            {/* Full Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Full Description <span className="text-orange-500">*</span></label>
              <textarea
                rows={3}
                placeholder="Describe architecture, motivation, features, and compile setup details..."
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition resize-none"
              />
              {errors.fullDesc && <p className="text-[10px] text-red-400 font-mono">{errors.fullDesc}</p>}
            </div>

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Tech Stack <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="React, TypeScript, Rust, Assembly (comma-separated)"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
              />
              {errors.techStack && <p className="text-[10px] text-red-400 font-mono">{errors.techStack}</p>}
            </div>

            {/* Key Features (dynamic list) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Key Features</label>
              <div className="space-y-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Feature bullet point #${idx + 1}`}
                      value={feat}
                      onChange={(e) => {
                        const arr = [...features];
                        arr[idx] = e.target.value;
                        setFeatures(arr);
                      }}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                        className="px-2.5 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all bg-transparent"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFeatures([...features, ''])}
                  className="flex items-center gap-1.5 text-[10px] text-orange-500 hover:text-orange-400 font-mono transition-all bg-transparent border-none cursor-pointer"
                >
                  <Plus size={12} /> Add Feature Bullet
                </button>
              </div>
            </div>

            {/* GitHub URL */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">GitHub Repository <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="github.com/username/repo-name"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
              />
              {errors.githubUrl && <p className="text-[10px] text-red-400 font-mono">{errors.githubUrl}</p>}
            </div>

            {/* Main Cover Image */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Cover Image URL / Upload</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste image web address (https://...)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition flex items-center gap-1 text-[11px] font-mono bg-transparent"
                >
                  <Upload size={12} /> Upload
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {safePreviewImageUrl && (
                <div className="relative rounded-xl border border-white/10 overflow-hidden h-24 w-full bg-slate-900">
                  <img src={safePreviewImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black/90 rounded-full text-white/80 transition"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}
            </div>

            {/* Extra Gallery Images */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Extra Gallery Image URLs</label>
              <div className="space-y-2">
                {galleryUrls.map((gUrl, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Gallery URL #${idx + 1}`}
                      value={gUrl}
                      onChange={(e) => {
                        const arr = [...galleryUrls];
                        arr[idx] = e.target.value;
                        setGalleryUrls(arr);
                      }}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
                    />
                    {galleryUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== idx))}
                        className="px-2.5 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all bg-transparent"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setGalleryUrls([...galleryUrls, ''])}
                  className="flex items-center gap-1.5 text-[10px] text-orange-500 hover:text-orange-400 font-mono transition-all bg-transparent border-none cursor-pointer"
                >
                  <Plus size={12} /> Add Gallery Image
                </button>
              </div>
            </div>

            {/* Author Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wide text-white/70 block">Author Name <span className="text-orange-500">*</span></label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/50 transition"
              />
              {errors.authorName && <p className="text-[10px] text-red-400 font-mono">{errors.authorName}</p>}
            </div>

            {/* Publish immediately toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/15 bg-white/[0.01]">
              <div>
                <p className="text-xs font-bold text-white font-display">Publish Immediately</p>
                <p className="text-[10px] text-white/50 mt-0.5">
                  Published projects appear automatically in the Community Vault.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPublished}
                onClick={() => setIsPublished(!isPublished)}
                className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border border-white/20 transition-colors duration-200 focus:outline-none ${isPublished ? 'bg-orange-500' : 'bg-slate-900'}`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 mt-0.5 rounded-full bg-white shadow transition-transform duration-200 ${isPublished ? 'translate-x-4.5' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-white/10">
            <span className="text-[9px] font-mono text-white/40"><span className="text-orange-500">*</span> Required fields</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-white/10 text-white/60 hover:text-white rounded-xl text-xs font-semibold hover:bg-white/5 transition bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-5 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:opacity-90 active:scale-95 transition flex items-center gap-1 shadow-md shadow-orange-500/20 border-none cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Project'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
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
  const [techSkill, setTechSkill] = useState(78); // Quantitative methods
  const [designSkill, setDesignSkill] = useState(36); // Fundraising / pitching
  const [commsSkill, setCommsSkill] = useState(52); // Team leadership
  const [researchSkill, setResearchSkill] = useState(64); // Scientific writing
  const [assessmentStep, setAssessmentStep] = useState(2); // Starts on Step 2 "Skills" as requested
  const [selectedRoadmapPhase, setSelectedRoadmapPhase] = useState(2); // Starts with Phase 2 "In Progress" selected

  // Coins wallet for Reward Center
  const [coins, setCoins] = useState(450);

  // User customizeable widgets states
  const [educationDegree, setEducationDegree] = useState("B.Tech Computer Science");
  const [educationYear, setEducationYear] = useState("3rd Year");
  const [userCareerGoal, setUserCareerGoal] = useState("AI Developer / Systems Architect");
  const [userMissingSkills, setUserMissingSkills] = useState("Docker, Redis, System Design, Advanced PyTorch");
  const [isEditingGoalModal, setIsEditingGoalModal] = useState(false);
  const [tempDegree, setTempDegree] = useState(educationDegree);
  const [tempYear, setTempYear] = useState(educationYear);
  const [tempGoal, setTempGoal] = useState(userCareerGoal);
  const [tempSkills, setTempSkills] = useState(userMissingSkills);


  // Mentor Booking states
  const [bookedSessions, setBookedSessions] = useState<any[]>([]);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [bookingSlot, setBookingSlot] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Career Arena Decide states
  const [isDecideModalOpen, setIsDecideModalOpen] = useState(false);
  const [decidePathChoice, setDecidePathChoice] = useState<"research" | "startup" | null>(null);
  const [decideLoading, setDecideLoading] = useState(false);
  const [decideResult, setDecideResult] = useState<string | null>(null);

  // AI Assessment sliders/weights states
  const [academicRating, setAcademicRating] = useState(85);
  const [techRating, setTechRating] = useState(78);
  const [commsRating, setCommsRating] = useState(65);
  const [researchRating, setResearchRating] = useState(72);
  const [careerRating, setCareerRating] = useState(60);
  const [leadershipRating, setLeadershipRating] = useState(55);
  const [networkingRating, setNetworkingRating] = useState(50);

  // Sync techSkill, researchSkill, commsSkill with sliders
  useEffect(() => {
    setTechRating(techSkill);
  }, [techSkill]);

  useEffect(() => {
    setResearchRating(researchSkill);
  }, [researchSkill]);

  useEffect(() => {
    setCommsRating(commsSkill);
  }, [commsSkill]);

  // Live updated score derived from weights:
  // Academic 20%, Technical 15%, Comms 15%, Research 15%, Career Ready 15%, Leadership 10%, Networking 10%
  const studentHealthScore = Math.round(
    academicRating * 0.20 +
    techRating * 0.15 +
    commsRating * 0.15 +
    researchRating * 0.15 +
    careerRating * 0.15 +
    leadershipRating * 0.10 +
    networkingRating * 0.10
  );

  useEffect(() => {
    setSuccessScore(studentHealthScore);
  }, [studentHealthScore]);

  // Roadmap task checkbox states
  const [roadmapTasks, setRoadmapTasks] = useState({
    phase1_basics: true,
    phase1_courses: true,
    phase1_resources: false,
    phase2_tech: true,
    phase2_soft: false,
    phase2_comm: false,
    phase3_beginner: true,
    phase3_intermediate: false,
    phase3_advanced: false,
  });

  // Skill Builder Sub-tab
  const [skillsSubTab, setSkillsSubTab] = useState<"gaps" | "paths" | "courses" | "practice" | "progress">("gaps");

  // Community Events Registered
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);


  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [selectedDetailProject, setSelectedDetailProject] = useState<any | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const [projectsList, setProjectsList] = useState<any[]>([
    {
      id: "nexus-os",
      name: "Nexus OS",
      lang: "Rust Â· C Â· Assembly",
      progress: 95,
      status: "Active Dev",
      github: "github.com/vimarsh/nexus-os",
      branch: "main",
      commits: 284,
      tests: "24/24",
      deployStatus: "success",
      activity: [10, 20, 15, 30, 25, 40, 50, 48],
      techStack: ["Rust", "C", "Assembly"],
      category: "Systems",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
      desc: "A microkernel-based operating system focused on real-time processing and extreme security, built from scratch.",
      shortDescription: "A microkernel-based operating system focused on real-time processing and extreme security, built from scratch.",
      fullDescription: "Nexus OS is a next-generation microkernel operating system written in Rust. It utilizes zero-dependency kernels, capability-based security contexts, and lock-free data structures to achieve extreme execution efficiency and real-time processing guarantees. Built for critical embedded systems and secure sandbox execution.",
      features: [
        "Capability-based access control and microkernel isolation",
        "Lock-free communication channels for multi-core IPC",
        "Boot time under 50 milliseconds on target ARM boards",
        "Deterministic real-time task scheduler"
      ],
      author: "Vimarsh Core Team",
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
      ],
      isPublished: true,
      links: {
        github: "https://github.com/vimarsh/nexus-os",
      }
    },
    {
      id: "vimarsh-connect",
      name: "Vimarsh Connect",
      lang: "Next.js Â· TypeScript Â· Prisma",
      progress: 78,
      status: "In Progress",
      github: "github.com/vimarsh/vimarsh-connect",
      branch: "main",
      commits: 112,
      tests: "16/18",
      deployStatus: "success",
      activity: [12, 18, 15, 24, 30, 28, 42, 38],
      techStack: ["Next.js", "TypeScript", "Prisma"],
      category: "Web",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      desc: "Decentralized social platform for student developers to collaborate, share code snippets, and build in public.",
      shortDescription: "Decentralized social platform for student developers to collaborate, share code snippets, and build in public.",
      fullDescription: "Vimarsh Connect is a modern, high-performance decentralized platform that connects student developers around the world. It provides real-time chat, code snippets sharing galleries, interactive whiteboard boards, and integrates seamlessly with GitHub hooks to display live project feeds and commits.",
      features: [
        "Real-time reactive chat engine with WebSockets",
        "Interactive canvas whiteboard for sketching system designs",
        "Automatic GitHub repo integration and activity feeds",
        "End-to-end user data privacy controls"
      ],
      author: "Vimarsh Web Team",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
      ],
      isPublished: true,
      links: {
        github: "https://github.com/vimarsh/vimarsh-connect",
      }
    },
    {
      id: "visionary-ar",
      name: "Visionary AR",
      lang: "Python Â· PyTorch Â· OpenCV",
      progress: 62,
      status: "Active Dev",
      github: "github.com/vimarsh/visionary-ar",
      branch: "dev-main",
      commits: 85,
      tests: "12/12",
      deployStatus: "success",
      activity: [5, 12, 18, 10, 22, 28, 30, 32],
      techStack: ["Python", "PyTorch", "OpenCV"],
      category: "AI / ML",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
      desc: "Augmented reality assistant that identifies electronic components via camera and overlays live datasheet information.",
      shortDescription: "Augmented reality assistant that identifies electronic components via camera and overlays live datasheet information.",
      fullDescription: "Visionary AR is an innovative computer vision tool designed for hardware engineers. By utilizing mobile phone cameras or smart glasses feeds, it uses deep learning classification models (PyTorch) to identify electronic components (resistors, microcontrollers, capacitors) in real-time, overlaying interactive pinout diagrams and linking directly to technical datasheets.",
      features: [
        "YOLOv8-based real-time component classification",
        "Pins coordinate calculation and interactive overlay rendering",
        "Offline database caching for 100k+ component datasheets",
        "Bluetooth connectivity with smart glasses"
      ],
      author: "Vimarsh AI Team",
      images: [
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606166325683-e288e2390a38?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=600&auto=format&fit=crop"
      ],
      isPublished: true,
      links: {
        github: "https://github.com/vimarsh/visionary-ar",
      }
    },
    {
      id: "smartdoc-ai",
      name: "SmartDoc AI Parser",
      lang: "TypeScript Â· Python",
      progress: 88,
      status: "Analyzing",
      github: "github.com/aryan/smartdoc-ai",
      branch: "main",
      commits: 142,
      tests: "12/12",
      deployStatus: "success",
      activity: [12, 18, 15, 24, 30, 28, 42, 38],
      techStack: ["TypeScript", "Python", "Vercel", "FastAPI"],
      category: "AI / ML",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      desc: "AI document intelligence suite that parses scanned files, extracts tabular data, and validates formatting.",
      shortDescription: "AI document intelligence suite that parses scanned files, extracts tabular data, and validates formatting.",
      fullDescription: "SmartDoc AI Parser is an enterprise-grade document extraction platform. Built with FastAPI and TypeScript, it parses PDFs, images, and scanned reports using custom OCR models. It identifies structural components, formats tables into clean CSVs, and automatically double-checks values against predefined formatting rules using a custom validation engine.",
      features: [
        "Advanced OCR parsing with layout analysis",
        "Automated table cell segmentation and CSV formatting",
        "Custom rule-validation compiler for values sanity checks",
        "Serverless deployment scales to 10k documents/minute"
      ],
      author: "Aryan Buha",
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop"
      ],
      isPublished: true,
      links: {
        github: "https://github.com/aryan/smartdoc-ai",
      }
    },
  ]);

  const handleAddProject = (newProject: any) => {
    setProjectsList((prev) => [...prev, newProject]);
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
                Good Morning Aryan ðŸ‘‹
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

          {/* 7-WIDGET DASHBOARD SYSTEM */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            
            {/* Widget 1: Career Success Score */}
            <Card className="flex flex-col justify-between relative overflow-hidden xl:col-span-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>1. Career Success Score</span>
                <span className="text-sky-400 font-semibold font-mono">Live Sync</span>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative h-20 w-20 shrink-0">
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
                    <span className="text-xl font-black text-white leading-none">{successScore}</span>
                    <span className="text-[7.5px] text-muted-foreground uppercase mt-0.5">/100</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-2.5">
                  {[
                    { label: "Technical Skills", pct: techRating, color: "from-sky-400 to-indigo-500" },
                    { label: "Comms & Soft", pct: commsRating, color: "from-indigo-400 to-purple-500" },
                    { label: "Academic Standings", pct: academicRating, color: "from-violet-400 to-fuchsia-500" },
                  ].map((sub) => (
                    <div key={sub.label} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[9px] text-muted-foreground leading-none">
                        <span>{sub.label}</span>
                        <span className="font-mono text-white/80">{sub.pct}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${sub.color} rounded-full transition-all duration-300`}
                          style={{ width: `${sub.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Widget 2: Current Education Status */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>2. Education Status</span>
                <button 
                  onClick={() => {
                    setTempDegree(educationDegree);
                    setTempYear(educationYear);
                    setTempGoal(userCareerGoal);
                    setTempSkills(userMissingSkills);
                    setIsEditingGoalModal(true);
                  }}
                  className="text-[9px] text-sky-400 hover:text-sky-300 font-bold bg-transparent border-none cursor-pointer flex items-center gap-0.5"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3">
                <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Primary Track</div>
                <div className="text-sm font-black text-white mt-1 leading-snug">{educationDegree}</div>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[9px] font-mono font-bold">
                  ðŸŽ“ {educationYear}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/5 text-[9px] text-muted-foreground leading-snug">
                Ecosystem verified diagnostic logs sync active.
              </div>
            </Card>

            {/* Widget 3: Career Goal */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>3. Career Goal</span>
                <button 
                  onClick={() => {
                    setTempDegree(educationDegree);
                    setTempYear(educationYear);
                    setTempGoal(userCareerGoal);
                    setTempSkills(userMissingSkills);
                    setIsEditingGoalModal(true);
                  }}
                  className="text-[9px] text-sky-400 hover:text-sky-300 font-bold bg-transparent border-none cursor-pointer flex items-center gap-0.5"
                >
                  Change
                </button>
              </div>
              <div className="mt-3">
                <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Target Objective</div>
                <div className="text-sm font-black text-white mt-1 leading-snug line-clamp-2">{userCareerGoal}</div>
                <div className="inline-flex items-center gap-1 mt-2.5 text-[9px] text-emerald-400 font-bold font-mono">
                  <span>ðŸŽ¯ 88% Market Alignment</span>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-muted-foreground/60">
                Updated matching algorithms in September.
              </div>
            </Card>

            {/* Widget 4: Missing Skills */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>4. Missing Skills</span>
                <span className="rounded bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[8px] px-1.5 py-0.5 font-bold uppercase font-mono">Gaps</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Core Gap Checklist</div>
                <div className="flex flex-wrap gap-1.5">
                  {userMissingSkills.split(",").map((s) => (
                    <span 
                      key={s} 
                      className="text-[9.5px] font-mono px-2 py-0.5 rounded border border-rose-500/15 bg-rose-500/5 text-rose-300 select-none"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 text-[9px] text-muted-foreground/50">
                Close gaps in Skill Builder.
              </div>
            </Card>

            {/* Widget 5: Recommended Next Step */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>5. Recommended Step</span>
                <span className="text-emerald-400 font-bold font-mono text-[9px]">High Priority</span>
              </div>
              <div className="mt-3">
                <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Next Milestone Task</div>
                {bookedSessions.length > 0 ? (
                  <div className="mt-1">
                    <div className="text-[11px] text-emerald-400 font-bold">Session with {bookedSessions[0].mentorName}</div>
                    <div className="text-[9px] text-slate-300 font-mono mt-0.5">ðŸ“… {bookedSessions[0].slot}</div>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-white mt-1 leading-snug">
                    Schedule 1-on-1 discovery with faang expert Marco Rossi.
                  </div>
                )}
              </div>
              {bookedSessions.length > 0 ? (
                <div className="mt-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-[9px] rounded-lg font-bold">
                  âœ“ Session Confirmed
                </div>
              ) : (
                <button 
                  onClick={() => {
                    const searchParams = new URLSearchParams(window.location.search);
                    searchParams.set("tab", "mentors");
                    window.history.pushState({}, "", `?${searchParams.toString()}`);
                    window.dispatchEvent(new Event("popstate"));
                    // Let's do a hard navigates trigger or just update url parameter tab which tanstack router binds to
                    window.location.href = "/app?tab=mentors";
                  }}
                  className="mt-3 w-full py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/35 border border-sky-500/30 text-sky-300 text-[10px] font-bold text-center cursor-pointer transition"
                >
                  Book Session Now
                </button>
              )}
            </Card>

            {/* Widget 6: XP Points & Wallet */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>6. XP Wallet</span>
                <span className="text-amber-400 font-mono text-[9px]">Level {level}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-300">
                  <span>{xp}/1000 XP</span>
                  <span className="text-amber-400 font-bold">ðŸª™ {coins} Coins</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${(xp / 1000) * 100}%` }}
                  />
                </div>
                <div className="mt-2.5 flex justify-between gap-1 text-[8.5px] text-muted-foreground font-mono">
                  <span>+15% active streak multi</span>
                  <span>Goal: L5 Unlocks</span>
                </div>
              </div>
              <div className="mt-3 flex gap-1.5">
                <button
                  onClick={() => setXp((prev) => prev + 100)}
                  className="flex-1 py-1 rounded bg-white/[0.04] border border-white/5 text-[9px] font-bold text-white hover:bg-white/[0.08]"
                >
                  +100 XP Spark
                </button>
                <button
                  onClick={() => setCoins((prev) => prev + 50)}
                  className="flex-1 py-1 rounded bg-amber-500/10 border border-amber-500/25 text-[9px] font-bold text-amber-400 hover:bg-amber-500/20"
                >
                  +50 Coins
                </button>
              </div>
            </Card>

            {/* Widget 7: Recent Achievements */}
            <Card className="flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>7. Achievements Vault</span>
                <span className="text-[9px] text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  { name: "Streak Warrior", icon: "ðŸ”¥", date: "June 16" },
                  { name: "First Commit", icon: "ðŸš€", date: "June 14" },
                  { name: "AI Pioneer", icon: "ðŸ¤–", date: "June 12" },
                ].map((ac) => (
                  <div key={ac.name} className="flex items-center justify-between text-[10px] p-1.5 rounded bg-white/[0.01] border border-white/5">
                    <span className="flex items-center gap-1.5 text-white/90">
                      <span>{ac.icon}</span>
                      <span className="truncate">{ac.name}</span>
                    </span>
                    <span className="text-[8px] text-muted-foreground font-mono">{ac.date}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[8px] text-muted-foreground/40 text-center font-mono">
                Showing 3 of 14 vault achievements
              </div>
            </Card>

          </div>

          {/* User Customize Modal */}
          {isEditingGoalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
              <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
                <button
                  onClick={() => setIsEditingGoalModal(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-bold font-display text-white mb-4">Edit Profile Widgets</h3>
                <div className="space-y-4">
                  <div className="grid gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Degree track / Major</label>
                    <input 
                      type="text" 
                      value={tempDegree} 
                      onChange={(e) => setTempDegree(e.target.value)} 
                      className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Academic Year</label>
                    <input 
                      type="text" 
                      value={tempYear} 
                      onChange={(e) => setTempYear(e.target.value)} 
                      className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Career Goal Target</label>
                    <input 
                      type="text" 
                      value={tempGoal} 
                      onChange={(e) => setTempGoal(e.target.value)} 
                      className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Missing Skills (comma separated)</label>
                    <input 
                      type="text" 
                      value={tempSkills} 
                      onChange={(e) => setTempSkills(e.target.value)} 
                      className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="flex justify-end gap-2.5 pt-4">
                    <button
                      onClick={() => setIsEditingGoalModal(false)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl border border-white/10 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setEducationDegree(tempDegree);
                        setEducationYear(tempYear);
                        setUserCareerGoal(tempGoal);
                        setUserMissingSkills(tempSkills);
                        setIsEditingGoalModal(false);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-955 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-base font-black text-white tracking-tight uppercase mb-3.5 font-display">
              Active Missions
            </h3>
            {missions.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 text-center text-xs text-muted-foreground">
                ðŸŽ‰ All active missions completed! You are ready to Level Up.
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
                          className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${m.difficulty === "Easy"
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
                <Link href="/app/business" className="flex items-center justify-center gap-2 bg-[#DFFF00]/10 text-[#DFFF00] py-3 rounded-xl font-bold hover:bg-[#DFFF00]/20 transition-colors">
                  Open Business Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
              <Card className="flex flex-col justify-between border-rose-500/30 hover:border-rose-500/60 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Startup Hub</h3>
                  <p className="text-sm text-white/60 mb-4">Manage fundraising, milestones, runway, and access the mentor network.</p>
                </div>
                <Link href="/app/startup" className="flex items-center justify-center gap-2 bg-rose-500/20 text-rose-400 py-3 rounded-xl font-bold hover:bg-rose-500/30 transition-colors">
                  Open Startup Hub <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </Page>
      )}

      {currentTab === "arena" && (
        <Page title="Career Growth Arena" subtitle="Expert discussions, path decisions, and developmental districts.">
          {/* HUD Header */}
          <div className="grid gap-4 md:grid-cols-3 mb-6 mt-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-4 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-bold">Arena Status</span>
              <div className="text-2xl font-black text-white mt-1">Level 4 Candidate</div>
              <div className="text-xs text-muted-foreground mt-1">Active District Path: Systems & Product Dev</div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-4 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">Domain Preparedness</span>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {studentHealthScore}% <span className="text-xs text-emerald-400 font-normal font-mono">+6% from weights</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full" style={{ width: `${studentHealthScore}%` }} />
              </div>
            </div>
            {/* Decide Action Card */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 backdrop-blur-xl group hover:border-amber-500/40 transition duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" /> ðŸŽ¯ Path Decisions
              </span>
              <div className="text-sm font-bold text-white mt-1 leading-snug">Expert Decision Matrix</div>
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-[10px] text-muted-foreground">Diagnose research vs startup trajectory</span>
                <button 
                  onClick={() => {
                    setDecidePathChoice(null);
                    setDecideResult(null);
                    setIsDecideModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-[10px] font-bold text-slate-955 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer border-none font-display"
                >
                  Decide Now
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Left 2 Columns: Career Map & Districts */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Interactive City Map */}
              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-6">
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                  Career City Map / Roadmap Path
                </h3>

                <div className="relative flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-4 py-4 px-2">
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/5 -translate-y-1/2 hidden sm:block z-0">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 transition-all duration-500"
                      style={{ width: '55%' }}
                    />
                  </div>

                  {[
                    { id: "foundation", name: "Foundation", status: "Completed", icon: GraduationCap },
                    { id: "skills", name: "Skills", status: "In Progress", icon: Brain },
                    { id: "project", name: "Project", status: "In Progress", icon: Compass },
                    { id: "interview", name: "Interview", status: "Locked", icon: Users },
                    { id: "career", name: "Career", status: "Locked", icon: Briefcase },
                  ].map((node) => {
                    const Icon = node.icon;
                    const isCompleted = node.status === "Completed";
                    const isInProgress = node.status === "In Progress";
                    const isLocked = node.status === "Locked";

                    return (
                      <div key={node.id} className="relative flex flex-col items-center group z-10 select-none">
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border bg-slate-900 transition-all duration-300 
                          ${isCompleted ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : ""}
                          ${isInProgress ? "border-sky-500 animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.3)]" : ""}
                          ${isLocked ? "border-white/10 text-muted-foreground opacity-60" : ""}
                        `}>
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 bg-emerald-500 text-slate-955 rounded-full p-0.5 z-20">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </div>
                          )}
                          <Icon className={`h-5 w-5 ${isCompleted ? "text-emerald-400" : isInProgress ? "text-sky-400" : "text-white/30"}`} />
                        </div>
                        <span className="text-[10px] font-mono mt-2 font-bold text-white">{node.name}</span>
                        <span className={`text-[8px] font-semibold uppercase ${isCompleted ? "text-emerald-400/80" : isInProgress ? "text-sky-400/80" : "text-muted-foreground/60"}`}>{node.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Districts List */}
              <div className="space-y-4">
                {[
                  { name: "Foundation District", desc: "Define target profiles, master core diagnostics, and establish roadmaps.", status: "Completed", progress: 100, color: "emerald" },
                  { name: "Skills District", desc: "Gain advanced programming and system scaling tool competencies.", status: "In Progress", progress: techRating, color: "sky" },
                  { name: "Project District", desc: "Launch functional workspaces, deploy full-stack codebases, and compile tests.", status: "In Progress", progress: 60, color: "indigo" },
                ].map((d) => (
                  <div key={d.name} className={`p-5 rounded-2xl border bg-slate-955/40 backdrop-blur-md relative overflow-hidden border-white/5`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-black text-white">{d.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 max-w-md">{d.desc}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${d.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"}`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[9px] font-mono mb-1 text-slate-400">
                        <span>District Completion</span>
                        <span>{d.progress}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full`} style={{ width: `${d.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Expert Discussion Feed */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-md flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sky-500/5 blur-xl pointer-events-none" />
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight uppercase flex items-center gap-1.5 mb-1 font-display">
                  <Users className="h-4.5 w-4.5 text-sky-400" /> Expert Discussion Feed
                </h3>
                <p className="text-[10px] text-muted-foreground">Real-time evaluations by the Academic & Industry Advisory Board.</p>

                <div className="mt-5 space-y-3.5">
                  {[
                    { author: "Dr. Helena Chen", role: "AI Research Lead Â· MIT", comment: "Aryan's work on 'Nexus OS' has strong logic parameters. However, we need to see structured API endpoints to evaluate web readiness.", time: "2 hours ago", avatar: "HC" },
                    { author: "Marco Rossi", role: "SDE Director Â· ex-Meta", comment: "The algorithmic LeetCode index is solid (70%), but let's schedule a whiteboard simulation to check diagnostic communications.", time: "4 hours ago", avatar: "MR" },
                    { author: "Priya Raghavan", role: "PM Â· ex-Razorpay", comment: "Strong SaaS portfolio projects on Vimarsh Connect. I suggest adding custom Redis caching layer diagnostics to secure advanced metrics.", time: "1 day ago", avatar: "PR" }
                  ].map((msg, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {msg.avatar}
                        </div>
                        <div>
                          <div className="text-[10.5px] font-bold text-white leading-tight">{msg.author}</div>
                          <div className="text-[8px] text-muted-foreground font-mono leading-none">{msg.role}</div>
                        </div>
                        <span className="ml-auto text-[8px] text-muted-foreground font-mono">{msg.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-normal font-sans">
                        "{msg.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[9px] text-muted-foreground/40 font-mono text-center">
                Refreshed live as profile parameters change.
              </div>
            </div>

          </div>

          {/* DECIDE MODAL */}
          {isDecideModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setIsDecideModalOpen(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/25 bg-amber-500/5">
                    Decide Matrix
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-1">Ecosystem Career Decision Platform</h3>
                <p className="text-xs text-muted-foreground mb-6">Choose a directional trajectory to align your diagnostic metrics.</p>

                {decideLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-10 w-10 text-sky-400 animate-spin" />
                    <span className="text-xs text-sky-300 font-mono text-center">AI compiling score metrics, verifying commit lists, mapping gaps...</span>
                  </div>
                ) : decideResult ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-2 font-mono">
                        <span>âœ“ DIAGNOSTIC VERDICT COMPILED</span>
                      </div>
                      <p className="text-xs leading-relaxed font-sans">{decideResult}</p>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => {
                          setIsDecideModalOpen(false);
                          // Option to change goal based on choice
                          if (decidePathChoice === "research") {
                            setUserCareerGoal("Deep Tech Research Scientist (AI/ML)");
                            setUserMissingSkills("Scientific Writing, PyTorch Optimizations, Thesis Drafting");
                          } else {
                            setUserCareerGoal("High-Growth SaaS Founding Engineer");
                            setUserMissingSkills("Docker, Redis Caching, System Architecture");
                          }
                        }}
                        className="px-5 py-2 text-xs font-bold text-slate-955 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl"
                      >
                        Accept Recommendation & Update OS Goal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setDecidePathChoice("research")}
                        className={`p-4 text-left rounded-2xl border transition-all cursor-pointer bg-transparent ${decidePathChoice === "research"
                            ? "border-sky-500 bg-sky-500/5 shadow-md shadow-sky-500/5"
                            : "border-white/5 hover:border-white/10 bg-white/[0.01]"
                          }`}
                      >
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          ðŸ”¬ Deep Tech Research
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                          Align values with papers publishing, university labs collaborations, and mathematical algorithm designs.
                        </p>
                      </button>

                      <button
                        onClick={() => setDecidePathChoice("startup")}
                        className={`p-4 text-left rounded-2xl border transition-all cursor-pointer bg-transparent ${decidePathChoice === "startup"
                            ? "border-sky-500 bg-sky-500/5 shadow-md shadow-sky-500/5"
                            : "border-white/5 hover:border-white/10 bg-white/[0.01]"
                          }`}
                      >
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          âš¡ Founding SaaS Engineer
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                          Align metrics with microservice deployments, databases scale, fullstack codebases, and startup launches.
                        </p>
                      </button>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-white/5 mt-6">
                      <button
                        onClick={() => setIsDecideModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold rounded-xl border border-white/10 text-white bg-transparent"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!decidePathChoice}
                        onClick={() => {
                          setDecideLoading(true);
                          setTimeout(() => {
                            setDecideLoading(false);
                            if (decidePathChoice === "research") {
                              const compatibility = Math.round(researchRating * 0.7 + academicRating * 0.3);
                              setDecideResult(
                                `Compatibility with Deep Research: ${compatibility}%. AI Diagnosis shows exceptional Academic standing (${academicRating}%) and Research metrics (${researchRating}%). Recommendation: Focus on publishing your Nexus OS microkernel architecture. Missing items: Research Publication Badge in vault.`
                              );
                            } else {
                              const compatibility = Math.round(techRating * 0.6 + leadershipRating * 0.2 + networkingRating * 0.2);
                              setDecideResult(
                                `Compatibility with Founding SaaS SDE: ${compatibility}%. Systems/Tech scores are high (${techRating}%), but operations and networking skills need scaling. Recommendation: Focus on closing gap skills (Docker, Redis) and book a mentoring slot with Marco Rossi.`
                              );
                            }
                          }, 1500);
                        }}
                        className="px-5 py-2 text-xs font-bold text-slate-955 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Diagnose Trajectory
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </Page>
      )}

      {currentTab === "challenges" && (
        <Page title="Arena Challenges" subtitle="Tackle daily/monthly tasks, build consistency, and stack badges.">
          {/* HUD Header */}
          <div className="grid gap-4 md:grid-cols-3 mb-6 mt-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-4 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-bold flex items-center gap-1">
                <Flame className="h-3 w-3 animate-pulse" /> consistency streak
              </span>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {streakCount} Days <span className="text-xs text-muted-foreground font-normal">Best: 18 days</span>
              </div>
              <div className="text-[10px] text-orange-400/80 font-mono mt-1">On Fire! 1.2x multiplier active</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-4 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-bold flex items-center gap-1">
                <Zap className="h-3 w-3" /> Experience Points (XP)
              </span>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {xp} XP <span className="text-xs text-sky-400 font-normal font-mono">Level {level}</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" style={{ width: `${(xp/1000)*100}%` }} />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 backdrop-blur-xl group hover:border-emerald-500/40 transition duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                <Award className="h-3 w-3 animate-pulse" /> Consistency Reward
              </span>
              <div className="text-sm font-bold text-white mt-1 leading-snug">Voucher Progress (12/15 days)</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-muted-foreground">3 days left for Resume Review Pass</span>
                <span className="text-[9px] text-emerald-400 font-bold font-mono">80%</span>
              </div>
            </div>
          </div>

          {/* CHALLENGE CATEGORIES LIST */}
          <div className="space-y-4">
            {[
              { id: "daily", name: "Daily Challenge", desc: "Short daily coding puzzles to build cognitive consistency.", locked: true, unlockReq: "Requires consistency streak > 15 days" },
              { id: "weekly", name: "Weekly Challenge", desc: "Medium difficulty assignments, focused on algorithm logic diagnostics.", locked: true, unlockReq: "Requires Level 5 candidate metrics" },
              {
                id: "monthly",
                name: "Monthly Challenge",
                desc: "Large architectural objectives to build premium portfolios.",
                locked: false,
                challenges: [
                  { title: "SaaS Capstone Deployment", instruction: "Deploy a full-stack platform w/ continuous unit testing and DB replication setups.", rewards: ["800 XP", "Capstone Master Badge", "Verified Certificate"], code: "CAP-OCT" }
                ]
              },
              {
                id: "skills",
                name: "Skill Challenges",
                desc: "Targeted technological challenges to verify domain skills.",
                locked: false,
                challenges: [
                  { title: "Systems Core Optimize", instruction: "Solve lock-free IPC channels microkernel diagnostics.", rewards: ["450 XP", "Systems Architect Badge"], code: "SYS-OPT" },
                  { title: "Database Scaling Deep-Dive", instruction: "Design partitioned cache indexes for high traffic loads.", rewards: ["400 XP", "DB Professional Certification"], code: "DB-SCALE" }
                ]
              },
              { id: "research", name: "Research Challenges", desc: "Deconstruct research papers, formulate hypotheses, and submit drafts.", locked: true, unlockReq: "Requires verified academic domain credentials" },
              { id: "startup", name: "Startup Challenges", desc: "Build pitches, validate TAM estimates, and formulate financial runway templates.", locked: true, unlockReq: "Requires Startup founder OS level 2 status" },
              { id: "hackathons", name: "Ecosystem Hackathons", desc: "Participate in global developer sprints to solve real-world industry tasks.", locked: true, unlockReq: "Requires registration code from company advisors" }
            ].map((section) => (
              <div 
                key={section.id} 
                className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-slate-950/40 backdrop-blur-md ${
                  section.locked ? "border-white/5 opacity-55 hover:opacity-75" : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      {section.locked ? <Lock className="h-3.5 w-3.5 text-muted-foreground" /> : <Unlock className="h-3.5 w-3.5 text-emerald-400" />}
                      {section.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xl">{section.desc}</p>
                  </div>
                  {section.locked && (
                    <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[8px] font-mono font-bold uppercase tracking-wider">
                      LOCKED
                    </span>
                  )}
                </div>

                {/* Sub challenges display */}
                {!section.locked && section.challenges && (
                  <div className="mt-4 pt-4 border-t border-white/5 grid gap-4 md:grid-cols-2">
                    {section.challenges.map((c) => (
                      <div key={c.title} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-tight">{c.title}</h4>
                          <p className="text-[10px] text-slate-300 mt-1 leading-normal font-sans">{c.instruction}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <div className="text-[9px] font-mono text-slate-400">REWARDS:</div>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {c.rewards.map((r) => (
                              <span key={r} className="text-[9px] font-mono px-2 py-0.5 rounded border border-sky-400/20 bg-sky-400/5 text-sky-400 font-bold">
                                {r}
                              </span>
                            ))}
                          </div>
                          <button 
                            onClick={() => alert(`Starting quest code ${c.code}. Good luck!`)}
                            className="mt-3.5 w-full py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-400 text-[9.5px] font-bold transition cursor-pointer"
                          >
                            Launch Challenge
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.locked && (
                  <div className="mt-2 text-[9px] font-mono text-amber-500/80 flex items-center gap-1">
                    <span>âš  Unlock:</span>
                    <span>{section.unlockReq}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Page>
      )}

      {currentTab === "assessment" && (
        <Page title="AI Diagnostic Assessment" subtitle="Deep multi-domain analysis of your academic and technical readiness.">
          
          <div className="grid gap-6 lg:grid-cols-12 mt-4 items-stretch">
            
            {/* Left Column: Weighted Category Controls (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sky-500/5 blur-xl pointer-events-none" />
              
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight uppercase flex items-center gap-1.5 mb-2 font-display">
                  <Activity className="h-4.5 w-4.5 text-sky-400" /> Category Weights & Parameters
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Simulate scores to calculate your live normalized Student Health index.</p>

                <div className="space-y-4">
                  {[
                    { key: "academic", label: "Academic Performance", weight: "20%", val: academicRating, setVal: setAcademicRating, color: "accent-sky-400" },
                    { key: "tech", label: "Technical Skills", weight: "15%", val: techRating, setVal: setTechRating, color: "accent-indigo-400" },
                    { key: "comms", label: "Communication Skills", weight: "15%", val: commsRating, setVal: setCommsRating, color: "accent-violet-400" },
                    { key: "research", label: "Research Skills", weight: "15%", val: researchRating, setVal: setResearchRating, color: "accent-fuchsia-400" },
                    { key: "career", label: "Career Readiness", weight: "15%", val: careerRating, setVal: setCareerRating, color: "accent-rose-400" },
                    { key: "leadership", label: "Leadership", weight: "10%", val: leadershipRating, setVal: setLeadershipRating, color: "accent-amber-400" },
                    { key: "networking", label: "Networking", weight: "10%", val: networkingRating, setVal: setNetworkingRating, color: "accent-emerald-400" },
                  ].map((cat) => (
                    <div key={cat.key} className="p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition">
                      <div className="flex justify-between items-center text-xs font-semibold mb-1">
                        <span className="text-white/95">{cat.label} <span className="text-[10px] text-slate-400 font-normal">({cat.weight} weight)</span></span>
                        <span className="font-mono text-sky-400 font-bold">{cat.val}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={cat.val}
                        onChange={(e) => cat.setVal(Number(e.target.value))}
                        className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${cat.color}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 text-[9px] font-mono text-muted-foreground/40 text-center">
                Diagnostics system calibrated for standard Bangalore Tier-1 engineering criteria.
              </div>
            </div>

            {/* Right Column: AI Diagnostics Output Summary (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/5">
                    DIAGNOSTICS SUMMARY
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">Normalized Index</span>
                </div>

                {/* Score Dial */}
                <div className="flex items-center gap-5 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="url(#assessScoreGrad)"
                        strokeWidth="4.5"
                        fill="transparent"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * studentHealthScore) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="assessScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                      <span className="text-lg font-black text-white">{studentHealthScore}</span>
                      <span className="text-[7px] text-muted-foreground uppercase mt-0.5 font-semibold font-mono">HEALTH</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white font-display">Student Health Score</h4>
                    <p className="text-[10.5px] text-muted-foreground mt-1 leading-normal font-sans">
                      Calculated from weights. Standard baseline target is 75%.
                    </p>
                  </div>
                </div>

                {/* Diagnosis Text */}
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Diagnosis Report</div>
                  <p className="text-xs text-white/95 mt-1 leading-relaxed font-sans">
                    {studentHealthScore >= 80 
                      ? "Excellent overall readiness. High systems-architecture capabilities matched with solid academic backgrounds. High placement probability." 
                      : studentHealthScore >= 65 
                        ? "Competent domain baseline. Minor weaknesses detected in organizational communication and networking indices. Moderate placement probability."
                        : "Critical bottlenecks identified. Focus immediately on technical certifications and complete weekly checklist actions to secure streak bonuses."
                    }
                  </p>
                </div>

                {/* Strengths & Weaknesses Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                    <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Verified Strengths</div>
                    <ul className="mt-2 space-y-1 text-[10px] text-slate-300 font-sans">
                      {academicRating >= 75 && <li>â€¢ Academic track stability</li>}
                      {techRating >= 75 && <li>â€¢ Quantitative code logic</li>}
                      {commsRating >= 75 && <li>â€¢ Presentation diagnostics</li>}
                      {researchRating >= 75 && <li>â€¢ Scientific publication writing</li>}
                      {careerRating >= 75 && <li>â€¢ Resume ATS compatibility</li>}
                      {leadershipRating >= 75 && <li>â€¢ Group task co-ordination</li>}
                      {networkingRating >= 75 && <li>â€¢ Advisor board connections</li>}
                      {Math.max(academicRating, techRating, commsRating, researchRating, careerRating, leadershipRating, networkingRating) < 75 && (
                        <li>â€¢ Basic skill consistency</li>
                      )}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl border border-rose-500/10 bg-rose-500/[0.02]">
                    <div className="text-[9px] font-mono text-rose-400 font-bold uppercase tracking-wider">Identified Gaps</div>
                    <ul className="mt-2 space-y-1 text-[10px] text-slate-300 font-sans">
                      {academicRating < 65 && <li>â€¢ Course completion index</li>}
                      {techRating < 65 && <li>â€¢ Systems deployment gaps</li>}
                      {commsRating < 65 && <li>â€¢ Whiteboard panel simulations</li>}
                      {researchRating < 65 && <li>â€¢ Citation baseline numbers</li>}
                      {careerRating < 65 && <li>â€¢ Placement readiness checklist</li>}
                      {leadershipRating < 65 && <li>â€¢ Operations & project kanban</li>}
                      {networkingRating < 65 && <li>â€¢ Active expert session books</li>}
                      {Math.min(academicRating, techRating, commsRating, researchRating, careerRating, leadershipRating, networkingRating) >= 65 && (
                        <li>â€¢ No critical bottlenecks</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Actionable Improvement Plan */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Actionable Improvement Plan</div>
                  <div className="mt-2.5 space-y-2 text-[10px] text-slate-200 font-sans">
                    {techRating < 75 && (
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5">â€¢</span>
                        <span>Complete the monthly 'SaaS Capstone Deployment' challenge to close engineering gaps.</span>
                      </div>
                    )}
                    {commsRating < 75 && (
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5">â€¢</span>
                        <span>Book an interview prep slot with expert Marco Rossi to review behavioral matrices.</span>
                      </div>
                    )}
                    {networkingRating < 75 && (
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5">â€¢</span>
                        <span>Register and attend the upcoming community 'Pitch Mock Session' event.</span>
                      </div>
                    )}
                    {techRating >= 75 && commsRating >= 75 && networkingRating >= 75 && (
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">âœ“</span>
                        <span>Your improvement checks are clean. Prepare for direct placement matchmaking.</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* LeetCode Code Sandbox Verifier */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-955/40 p-5 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase flex items-center gap-1.5 mb-2 font-display">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 animate-pulse" /> LeetCode Code Sandbox Verifier
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Submit your algorithmic codes for automatic compile checking and XP verification triggers.
            </p>
            <textarea
              rows={4}
              value={leetCodeSnippet}
              onChange={(e) => setLeetCodeSnippet(e.target.value)}
              className="w-full bg-slate-950 font-mono text-xs text-emerald-400 p-4 rounded-xl border border-white/10 outline-none focus:border-sky-400 transition"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={runCodeVerification}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-955 hover:opacity-90 transition cursor-pointer border-none"
              >
                Verify Solution
              </button>
              {verificationResult === "running" && <span className="text-xs text-sky-400 font-mono self-center">Running...</span>}
              {verificationResult === "success" && <span className="text-xs text-emerald-400 font-mono self-center">âœ“ Verified! (+50 XP granted)</span>}
              {verificationResult === "failed" && <span className="text-xs text-rose-400 font-mono self-center">âœ— Solution Failed compile test</span>}
            </div>
          </div>
        </Page>
      )}

      {currentTab === "roadmap" && (() => {
        const p1Progress = Math.round(((roadmapTasks.phase1_basics ? 1 : 0) + (roadmapTasks.phase1_courses ? 1 : 0) + (roadmapTasks.phase1_resources ? 1 : 0)) / 3 * 100);
        const p2Progress = Math.round(((roadmapTasks.phase2_tech ? 1 : 0) + (roadmapTasks.phase2_soft ? 1 : 0) + (roadmapTasks.phase2_comm ? 1 : 0)) / 3 * 100);
        const p3Progress = Math.round(((roadmapTasks.phase3_beginner ? 1 : 0) + (roadmapTasks.phase3_intermediate ? 1 : 0) + (roadmapTasks.phase3_advanced ? 1 : 0)) / 3 * 100);
        const overallProgress = Math.round((p1Progress + p2Progress + p3Progress) / 3);

        const phases = [
          {
            phase: 1,
            title: "Foundation",
            desc: "Learn core basics, complete standard courses, and read verified academic/industry resources.",
            progress: p1Progress,
            status: p1Progress === 100 ? "Completed" : "In Progress",
            gradient: "from-emerald-400 to-teal-500",
            icon: GraduationCap,
            tasks: [
              { key: "phase1_basics", title: "Learn Basics" },
              { key: "phase1_courses", title: "Complete Courses" },
              { key: "phase1_resources", title: "Read Resources" },
            ]
          },
          {
            phase: 2,
            title: "Skill Development",
            desc: "Close diagnostic gaps in technical programming, soft skills, and peer presentation communication.",
            progress: p2Progress,
            status: p2Progress === 100 ? "Completed" : p1Progress === 100 ? "In Progress" : "Locked",
            gradient: "from-sky-400 to-blue-500",
            icon: Brain,
            tasks: [
              { key: "phase2_tech", title: "Technical Skills" },
              { key: "phase2_soft", title: "Soft Skills" },
              { key: "phase2_comm", title: "Communication" },
            ]
          },
          {
            phase: 3,
            title: "Projects",
            desc: "Launch functional fullstack codebases, deploying beginner, intermediate, and advanced capstones.",
            progress: p3Progress,
            status: p3Progress === 100 ? "Completed" : p2Progress === 100 ? "In Progress" : "Locked",
            gradient: "from-indigo-400 to-purple-500",
            icon: Compass,
            tasks: [
              { key: "phase3_beginner", title: "Beginner Projects" },
              { key: "phase3_intermediate", title: "Intermediate Projects" },
              { key: "phase3_advanced", title: "Advanced Projects" },
            ]
          }
        ];

        return (
          <Page title="Career Roadmap" subtitle="Navigate your 3-phase career roadmap blueprint.">
            
            {/* Objective Goal Header HUD */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-5 mb-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3 animate-pulse" /> Active Career Objective
                  </span>
                  <h3 className="text-base font-black text-white mt-1 leading-snug font-display">
                    Goal: {userCareerGoal}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold font-mono text-xs">
                    {overallProgress}%
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">Overall Blueprint</div>
                    <div className="text-[11px] font-bold text-white">
                      {phases.filter(p => p.progress === 100).length} of 3 Phases Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Phases visual lists (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-955/40 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sky-500/5 blur-xl pointer-events-none" />

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
                    Interactive Roadmap Timeline
                  </h3>

                  <div className="relative space-y-6 pl-4">
                    <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-1/2 z-0" />

                    {phases.map((p) => {
                      const isActive = selectedRoadmapPhase === p.phase;
                      const isCompleted = p.progress === 100;
                      const isLocked = p.status === "Locked";
                      const PhaseIcon = p.icon;

                      return (
                        <button
                          key={p.phase}
                          onClick={() => setSelectedRoadmapPhase(p.phase)}
                          className={`relative flex items-start gap-4 p-4 rounded-xl border w-full text-left transition-all duration-300 group z-10 focus:outline-none bg-transparent cursor-pointer ${
                            isActive
                              ? "border-sky-500/40 bg-sky-500/[0.02] shadow-[0_0_15px_rgba(56,189,248,0.1)] ring-1 ring-sky-500/10"
                              : isCompleted
                                ? "border-emerald-500/10 hover:border-emerald-500/20 bg-emerald-500/[0.005]"
                                : "border-white/5 bg-white/[0.002] hover:border-white/10"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-all duration-300 ${
                            isActive
                              ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                              : isCompleted
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                : "border-white/10 text-muted-foreground/40"
                          }`}>
                            {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : p.phase}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-xs font-black tracking-tight leading-none transition-all duration-300 ${isActive ? "text-sky-400" : "text-white"}`}>
                                Phase {p.phase}: {p.title}
                              </h4>
                              <span className="text-[8px] font-mono text-muted-foreground/60 shrink-0 font-semibold">{p.progress}% done</span>
                            </div>

                            <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed truncate group-hover:text-clip group-hover:whitespace-normal">
                              {p.desc}
                            </p>

                            <div className="flex items-center gap-1.5 mt-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                isCompleted
                                  ? "bg-emerald-400"
                                  : p.status === "In Progress"
                                    ? "bg-sky-400 animate-pulse"
                                    : "bg-muted-foreground/30"
                              }`} />
                              <span className={`text-[8px] font-mono font-bold uppercase tracking-wider ${
                                isCompleted
                                  ? "text-emerald-400"
                                  : p.status === "In Progress"
                                    ? "text-sky-400"
                                    : "text-muted-foreground/50"
                              }`}>
                                {p.status}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Phase Details Drawer (col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

                {phases.filter(p => p.phase === selectedRoadmapPhase).map((p) => {
                  const isLocked = p.status === "Locked";
                  const isCompleted = p.progress === 100;

                  return (
                    <div key={p.phase} className="flex flex-col h-full justify-between animate-fadeIn">
                      <div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <div>
                            <span className="text-[9px] font-mono text-muted-foreground uppercase">Selected Phase Profile</span>
                            <h3 className="text-sm font-black text-white mt-0.5">
                              Phase {p.phase}: {p.title}
                            </h3>
                          </div>
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold uppercase tracking-wider ${
                            isCompleted
                              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                              : p.status === "In Progress"
                                ? "border-sky-500/20 bg-sky-500/5 text-sky-400 animate-pulse"
                                : "border-white/10 bg-white/5 text-muted-foreground/60"
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                          {p.desc}
                        </p>

                        {/* Interactive Task Checklist */}
                        <div className="mt-6 space-y-3">
                          <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider font-semibold">
                            Phase Checklist (Interactive)
                          </div>
                          
                          {p.tasks.map((task) => {
                            const isChecked = (roadmapTasks as any)[task.key];
                            return (
                              <div key={task.key} className="flex items-center gap-2.5 text-[11px] leading-relaxed">
                                {isLocked ? (
                                  <div className="rounded border border-white/10 w-4 h-4 flex items-center justify-center bg-white/[0.01]">
                                    <Lock className="h-2 w-2 text-muted-foreground/30" />
                                  </div>
                                ) : (
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={(e) => {
                                      setRoadmapTasks(prev => ({
                                        ...prev,
                                        [task.key]: e.target.checked
                                      }));
                                    }}
                                    className="rounded border border-white/20 w-4 h-4 accent-sky-400 bg-slate-900 cursor-pointer"
                                  />
                                )}
                                <span className={`${
                                  isLocked
                                    ? "text-muted-foreground/40 line-through select-none"
                                    : isChecked
                                      ? "text-muted-foreground/80 line-through"
                                      : "text-white/80 font-medium"
                                }`}>
                                  {task.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Phase Status Report */}
                        <div className="mt-6 p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                          <div className="text-[9px] font-mono text-muted-foreground/60 uppercase">Ecosystem Report</div>
                          <p className="text-[10px] text-white/70 mt-1 leading-normal font-sans">
                            {isLocked 
                              ? "Phase locked. Complete the preceding checks in previous districts to release diagnostics credentials."
                              : isCompleted
                                ? "Great job! This phase is completely verified. Domain scores have successfully normalized."
                                : `Phase is active. Complete all checklists to scale domain preparedness to ${p.phase * 33}%.`
                            }
                          </p>
                        </div>
                      </div>

                      {/* Primary actions triggers */}
                      <div className="mt-8 pt-4 border-t border-white/5 font-display">
                        {isLocked ? (
                          <button disabled className="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-muted-foreground/40 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-not-allowed uppercase">
                            <Lock className="h-3.5 w-3.5" /> Complete Preceding Phases
                          </button>
                        ) : (
                          <button 
                            onClick={() => alert(`Redirecting to ${p.title} Workspace...`)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold text-slate-955 flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer border-none shadow-lg shadow-sky-500/10"
                          >
                            Explore {p.title} <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </Page>
        );
      })()}

      {/* TAB: SKILLS */}
      {currentTab === "skills" && (
        <Page title="Skill Builder" subtitle="Master target competency markers and level up your technical profile.">
          {/* Stats HUD Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Skills Tracked", value: "12", delta: "+2 this week", color: "sky" },
              { label: "Avg Proficiency", value: "68%", delta: "â†‘4% vs last month", color: "emerald" },
              { label: "Certifications", value: "3", delta: "1 pending review", color: "violet" },
              { label: "Learning Streak", value: "9 days", delta: "ðŸ”¥ Keep going!", color: "amber" },
            ].map((stat) => (
              <div key={stat.label} className={`relative overflow-hidden p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md`}>
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-30 ${stat.color === "sky" ? "bg-sky-400" : stat.color === "emerald" ? "bg-emerald-400" : stat.color === "violet" ? "bg-violet-400" : "bg-amber-400"
                  }`} />
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                <div className={`text-2xl font-black mt-1 ${stat.color === "sky" ? "text-sky-400" : stat.color === "emerald" ? "text-emerald-400" : stat.color === "violet" ? "text-violet-400" : "text-amber-400"
                  }`}>{stat.value}</div>
                <div className="text-[10px] text-muted-foreground/60 mt-0.5 font-mono">{stat.delta}</div>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { name: "System Engineering", level: "Advanced", pct: 78, color: "sky", gradient: "from-sky-400 to-blue-500", tags: ["Distributed", "Cloud", "Docker"], xp: 2400 },
              { name: "Database Scaling", level: "Intermediate", pct: 62, color: "indigo", gradient: "from-indigo-400 to-purple-500", tags: ["SQL", "Redis", "NoSQL"], xp: 1800 },
              { name: "ML Optimization", level: "Intermediate", pct: 55, color: "violet", gradient: "from-violet-400 to-fuchsia-500", tags: ["PyTorch", "ONNX", "TFLite"], xp: 1550 },
              { name: "API Architecture", level: "Advanced", pct: 85, color: "emerald", gradient: "from-emerald-400 to-teal-500", tags: ["REST", "GraphQL", "gRPC"], xp: 2800 },
              { name: "Algorithmic DSA", level: "Intermediate", pct: 70, color: "amber", gradient: "from-amber-400 to-orange-500", tags: ["Trees", "Graphs", "DP"], xp: 2100 },
              { name: "Security & Auth", level: "Beginner", pct: 35, color: "rose", gradient: "from-rose-400 to-pink-500", tags: ["OAuth", "JWT", "HTTPS"], xp: 900 },
            ].map((skill) => (
              <div key={skill.name} className="group relative p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 bg-gradient-to-br ${skill.gradient}`} />

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${skill.level === "Advanced" ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" :
                          skill.level === "Intermediate" ? "border-sky-500/30 bg-sky-500/5 text-sky-400" :
                            "border-amber-500/30 bg-amber-500/5 text-amber-400"
                        }`}>{skill.level}</span>
                    </div>
                    <h4 className="text-sm font-black text-white mt-2">{skill.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-black bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}>{skill.pct}%</div>
                    <div className="text-[8px] font-mono text-muted-foreground/50">{skill.xp} XP</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} transition-all duration-700`}
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground/60">{tag}</span>
                  ))}
                </div>

                {/* Hover CTA */}
                <button className="mt-4 w-full py-1.5 rounded-xl text-[10px] font-bold border border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-white transition cursor-pointer opacity-0 group-hover:opacity-100">
                  Practice Now â†’
                </button>
              </div>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: PROJECTS */}
      {currentTab === "projects" && (
        <Page title="Projects Vault" subtitle="Track capstone repositories, deployments, and code execution pipelines.">

          {/* CodeVimarsh Header Style */}
          <div className="relative mb-8 mt-2 p-6 rounded-3xl border border-white/5 bg-slate-900/40 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-extrabold block">
                  // community builds
                </span>
                <h1 className="text-3xl sm:text-4.5xl font-black text-white mt-1.5 tracking-tight font-display uppercase leading-none">
                  The Build <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(249,115,22,0.4)' }}>Vault.</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground/80 mt-3 leading-relaxed font-mono">
                  Explore projects built by the student community â€” from low-level systems to modern web apps.
                  <strong className="text-white ml-1 font-mono">{projectsList.length} Capstones Published</strong>.
                </p>
              </div>

              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="group flex items-center gap-2 whitespace-nowrap bg-orange-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.45)] active:scale-95 transition-all duration-200 border-none cursor-pointer"
              >
                <Plus size={14} className="transition-transform duration-200 group-hover:rotate-90 text-slate-950" />
                Submit Project
              </button>
            </div>

            {/* Search bar */}
            <div className="mt-6 relative max-w-lg">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by project name or tech stack..."
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-white/[0.08] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50 transition placeholder:text-muted-foreground/35"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Projects", value: projectsList.length.toString(), color: "sky" },
              { label: "Avg Progress", value: `${projectsList.length ? Math.round(projectsList.reduce((a, p) => a + p.progress, 0) / projectsList.length) : 0}%`, color: "emerald" },
              { label: "Deployed Live", value: projectsList.filter(p => p.deployStatus === "success").length.toString(), color: "violet" },
            ].map((s) => (
              <div key={s.label} className="relative overflow-hidden p-4 rounded-2xl border border-white/5 bg-slate-900/30 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-white/[0.01] blur-md rounded-full pointer-events-none" />
                <div className={`text-2xl font-black ${s.color === "sky" ? "text-sky-400" : s.color === "emerald" ? "text-emerald-400" : "text-violet-400"}`}>{s.value}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Projects Grid (3 columns matching CodeVimarsh layout) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsList
              .filter(p =>
                p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                p.techStack.some((t: string) => t.toLowerCase().includes(projectSearchQuery.toLowerCase())) ||
                (p.category || "").toLowerCase().includes(projectSearchQuery.toLowerCase())
              )
              .map((p, idx) => {
                const accent = CATEGORY_COLORS[p.category] ?? '#ff6a00';
                const preview = p.shortDescription ?? p.desc ?? p.description;
                const statusColor = p.progress >= 80 ? "emerald" : p.progress >= 40 ? "sky" : "amber";

                const deployPills: Record<string, { text: string; bg: string; glow: string }> = {
                  success: { text: "Live", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", glow: "bg-emerald-400" },
                  building: { text: "Building", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20", glow: "bg-amber-400 animate-ping" },
                  idle: { text: "Disconnected", bg: "bg-white/5 text-muted-foreground/60 border-white/10", glow: "bg-white/35" },
                };
                const deployPill = deployPills[p.deployStatus || "idle"] || deployPills.idle;

                const galleryImages: string[] =
                  p.images && p.images.length > 0
                    ? p.images
                    : p.image
                      ? [p.image]
                      : [];

                return (
                  <motion.article
                    key={p.id || idx}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="group relative bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:border-orange-500/30 hover:shadow-[0_8px_40px_rgba(249,115,22,0.1)] hover:-translate-y-0.5"
                  >
                    {/* Top Accent line gradient */}
                    <div
                      className="absolute top-0 inset-x-0 h-[2px] opacity-75 z-10"
                      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                    />

                    {/* Image / Carousel */}
                    <InlineImageCarousel
                      images={galleryImages}
                      alt={p.name}
                      className="h-44 shrink-0"
                      overlay={
                        <>
                          {/* Category badge */}
                          <div
                            className="absolute top-3.5 left-3.5 z-10 px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border font-mono"
                            style={{
                              background: `${accent}18`,
                              borderColor: `${accent}40`,
                              color: accent,
                            }}
                          >
                            {p.category || "Web"}
                          </div>

                          {/* Deploy status overlay */}
                          <span className={`absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded text-[8.5px] font-mono font-semibold uppercase tracking-wider bg-slate-950/85 border ${deployPill.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${deployPill.glow}`} />
                            {deployPill.text}
                          </span>

                          {/* Gradient fade at bottom */}
                          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

                          {/* Letter placeholder when no images */}
                          {galleryImages.length === 0 && (
                            <span
                              className="absolute inset-0 flex items-center justify-center text-7xl font-black font-display opacity-15 select-none"
                              style={{ color: accent }}
                            >
                              {p.name.charAt(0)}
                            </span>
                          )}
                        </>
                      }
                    />

                    {/* Card Content body */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Title */}
                        <h3 className="text-base font-black text-white group-hover:text-orange-400 transition leading-snug font-display truncate">
                          {p.name}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-muted-foreground/80 mt-2 leading-relaxed min-h-[36px] line-clamp-2 font-sans">
                          {preview}
                        </p>

                        {/* Tech Chips row (Sliced to first 3 + counter) */}
                        <div className="flex gap-1.5 flex-wrap my-3.5">
                          {p.techStack.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-muted-foreground/85 hover:text-white transition select-none">
                              {tech}
                            </span>
                          ))}
                          {p.techStack.length > 3 && (
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-muted-foreground/40">
                              +{p.techStack.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Code Pipeline Stats */}
                        <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono text-muted-foreground/70 py-2 px-2.5 bg-slate-950/40 border border-white/5 rounded-xl my-3.5">
                          <div className="flex items-center gap-1 min-w-0" title="Active Branch">
                            <GitBranch className="h-3 w-3 text-sky-400 shrink-0" />
                            <span className="truncate text-white/90">{p.branch || "main"}</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0" title="Total Commits">
                            <GitCommit className="h-3 w-3 text-emerald-400 shrink-0" />
                            <span className="truncate text-white/90">{p.commits || 1} Commits</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0" title="Tests Validation">
                            <CheckCircle2 className={`h-3 w-3 shrink-0 ${p.tests === "0/0" ? "text-muted-foreground/40" : "text-emerald-400"}`} />
                            <span className="truncate text-white/90">{p.tests || "0/0"} Tests</span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3.5 mb-2">
                          <div className="flex justify-between items-center text-[9px] font-mono mb-1 leading-none">
                            <span className="text-muted-foreground/60">Development Completion</span>
                            <span className={`font-black ${statusColor === "emerald" ? "text-emerald-400" : statusColor === "sky" ? "text-sky-400" : "text-amber-400"}`}>{p.progress}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${statusColor === "emerald" ? "from-emerald-400 to-teal-500" :
                                  statusColor === "sky" ? "from-sky-400 to-blue-500" :
                                    "from-amber-400 to-orange-500"
                                }`}
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Actions row */}
                      <div className="flex gap-2.5 mt-4 pt-3.5 border-t border-white/5">
                        <button
                          onClick={() => setSelectedDetailProject(p)}
                          className="flex-1 py-2 rounded-xl text-[10px] font-bold border border-orange-500/20 bg-orange-500/5 text-orange-400 hover:bg-orange-500/15 hover:border-orange-500/40 transition cursor-pointer flex items-center justify-center gap-1 bg-transparent"
                        >
                          More Info <ChevronRight size={13} className="text-orange-400" />
                        </button>
                        {p.github && (
                          <a
                            href={`https://${p.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-xl text-[10px] font-bold border border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Github className="h-3.5 w-3.5" /> View Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </div>

          {/* Details Modal overlay */}
          <ProjectDetailsModal
            project={selectedDetailProject}
            onClose={() => setSelectedDetailProject(null)}
          />

          {/* Project Submission Form modal */}
          <ProjectFormModal
            isOpen={isAddProjectModalOpen}
            onClose={() => setIsAddProjectModalOpen(false)}
            onSubmit={handleAddProject}
          />
        </Page>
      )}

      {/* TAB: INTERNSHIPS & JOBS */}
      {currentTab === "internships" && (
        <Page title="Internship Matchmaker" subtitle="AI-ranked internship opportunities tailored to your profile.">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Stat label="Active Matches" value="24" delta="+6 this week" tone="electric" />
            <Stat label="Applications Sent" value="12" delta="3 pending review" tone="violet" />
            <Stat label="Interview Rate" value="42%" delta="Above cohort avg" tone="electric" />
          </div>
          <div className="space-y-3">
            {[
              { role: "ML Engineering Intern", co: "OpenAI", match: 98, type: "Summer 2026", loc: "San Francisco" },
              { role: "Research Intern", co: "Anthropic", match: 92, type: "Fall 2026", loc: "Remote" },
              { role: "Backend Intern", co: "Stripe", match: 89, type: "Summer 2026", loc: "Bangalore" },
              { role: "Data Science Intern", co: "Google", match: 87, type: "Summer 2026", loc: "Hyderabad" },
            ].map((job) => (
              <Card key={job.role} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{job.role}</h4>
                  <p className="text-xs text-muted-foreground">{job.co} · {job.type} · {job.loc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-sky-400">{job.match}% Match</span>
                  <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 text-[10px] font-bold text-slate-950">Apply</button>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {currentTab === "jobs" && (
        <Page title="Full-Time Jobs" subtitle="Graduate roles and early-career positions matched to your readiness score.">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Stat label="Open Roles" value="18" delta="Updated today" tone="electric" />
            <Stat label="Readiness Score" value={`${successScore}%`} delta="Placement ready" tone="violet" />
            <Stat label="Referrals Active" value="4" delta="From mentors" tone="electric" />
          </div>
          <div className="space-y-3">
            {[
              { role: "SDE I", co: "Microsoft", match: 94, pkg: "₹28–32 LPA", loc: "Noida" },
              { role: "ML Engineer", co: "NVIDIA", match: 91, pkg: "₹35–40 LPA", loc: "Pune" },
              { role: "Product Analyst", co: "Razorpay", match: 88, pkg: "₹18–22 LPA", loc: "Bangalore" },
              { role: "Systems Engineer", co: "Jane Street", match: 85, pkg: "₹45+ LPA", loc: "Mumbai" },
            ].map((job) => (
              <Card key={job.role} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{job.role}</h4>
                  <p className="text-xs text-muted-foreground">{job.co} · {job.pkg} · {job.loc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-emerald-400">{job.match}% Fit</span>
                  <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-[10px] font-bold text-white hover:bg-white/[0.06]">View Role</button>
                </div>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: MENTORS */}
      {currentTab === "mentors" && (
        <Page title="Advisors Hub" subtitle="Connect with verified industry coaches matched to your career objectives.">
          {/* Header Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Matched Mentors", value: "5", icon: "ðŸ‘¥", color: "sky" },
              { label: "Sessions Booked", value: "3", icon: "ðŸ“…", color: "emerald" },
              { label: "Avg Success Rate", value: "93%", icon: "ðŸ“ˆ", color: "violet" },
              { label: "Next Session", value: "Tomorrow", icon: "â°", color: "amber" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
                <div className="text-lg mb-1">{stat.icon}</div>
                <div className={`text-xl font-black ${stat.color === "sky" ? "text-sky-400" : stat.color === "emerald" ? "text-emerald-400" : stat.color === "violet" ? "text-violet-400" : "text-amber-400"}`}>{stat.value}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mentors Grid */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              { name: "Dr. Helena Chen", domain: "ML Research", exp: "12 yrs Â· MIT PhD", rate: 97, rating: 5.0, avail: "Tomorrow", budget: "â‚¹2,400/hr", bio: "Specialist in neural architecture search and model compression. Mentored 40+ researchers to top-tier publications.", tags: ["Deep Learning", "NLP", "Research"] },
              { name: "Marco Rossi", domain: "SDE Placements", exp: "8 yrs Â· ex-Meta", rate: 94, rating: 4.9, avail: "This week", budget: "â‚¹1,800/hr", bio: "Senior engineer from Meta specializing in distributed systems. Expert in system design and behavioral rounds.", tags: ["DSA", "System Design", "FAANG"] },
              { name: "Priya Raghavan", domain: "Product Strategy", exp: "9 yrs Â· ex-Razorpay", rate: 96, rating: 4.9, avail: "This week", budget: "â‚¹1,800/hr", bio: "Product strategist focusing on growth loops and user research. Helped 30+ candidates land PM roles at top companies.", tags: ["PM", "Growth", "Strategy"] },
              { name: "Rohan Iyer", domain: "Startup Funding", exp: "6 yrs Â· 2 exits", rate: 90, rating: 4.8, avail: "Next week", budget: "â‚¹2,000/hr", bio: "Venture builder with 2 successful exits. Expert in pitch decks, financial modeling, and investor outreach.", tags: ["Fundraising", "Pitch", "Startup"] },
            ].map((mentor) => (
              <div key={mentor.name} className="group relative p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 bg-sky-400" />

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-sm font-black text-slate-950 shrink-0">
                    {mentor.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{mentor.name}</h4>
                    <p className="text-[10px] font-mono text-sky-400">{mentor.domain}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-0.5 justify-end">â­ {mentor.rating}</div>
                    <div className="text-[9px] font-mono text-emerald-400">{mentor.rate}% success</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">{mentor.bio}</p>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {mentor.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground/60">{tag}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-[9px] font-mono text-muted-foreground mb-4 bg-white/[0.01] border border-white/5 rounded-xl p-2.5">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {mentor.exp.split(" Â· ")[0]}</span>
                  <span className="flex items-center gap-1 text-emerald-400"><Calendar className="h-3 w-3" /> {mentor.avail}</span>
                  <span className="flex items-center gap-1">{mentor.budget}</span>
                </div>

                {/* Book button */}
                <button className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-[11px] font-bold text-slate-950 hover:opacity-90 transition cursor-pointer">
                  Book Session â†’
                </button>
              </div>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: AI COPILOT */}
      {currentTab === "copilot" && (
        <Page title="AI Copilot" subtitle="Interactive contextual help suite.">
          <div className="max-w-6xl mx-auto mt-2">
            <CopilotChat />
          </div>
        </Page>
      )}

      {/* TAB: REWARDS */}
      {currentTab === "rewards" && (
        <Page title="Reward Center" subtitle="Claim holographic passes and unlock premium career benefits.">
          {/* XP Header */}
          <div className="relative mb-6 overflow-hidden p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 bg-amber-400" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1">
                  <Sparkles className="h-3 w-3 animate-pulse" /> Reward Wallet
                </span>
                <h3 className="text-lg font-black text-white mt-1">Your Career Achievement Passes</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Unlock passes by completing milestones and maintaining streaks.</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xs">{xp > 999 ? `${(xp / 1000).toFixed(1)}k` : xp}</div>
                <div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase">Total XP Earned</div>
                  <div className="text-xs font-bold text-white">{level} Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* Passes Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            {/* Locked pass */}
            <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-white/10 to-white/5 overflow-hidden opacity-50">
              <div className="h-full bg-slate-950 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
                <Lock className="h-8 w-8 text-muted-foreground/40" />
                <h4 className="text-sm font-black text-white/50">Mock Interview Pass</h4>
                <p className="text-[10px] text-muted-foreground/40 leading-relaxed">Complete 15 Arena Challenges to unlock this premium interview pass.</p>
                <div className="text-[9px] font-mono text-muted-foreground/30 uppercase">Requires 15-day streak</div>
              </div>
            </div>
          </div>
        </Page>
      )}

      {/* FALLBACK: ACHIEVEMENTS TAB */}
      {currentTab === "achievements" && (
        <Page title="Achievement Vault" subtitle="Your milestone badges, XP records, and earned credentials.">
          {/* Summary HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Badges Earned", value: "14", icon: "ðŸ†", color: "amber" },
              { label: "Total XP", value: xp > 999 ? `${(xp / 1000).toFixed(1)}k` : xp.toString(), icon: "âš¡", color: "sky" },
              { label: "Current Level", value: level.toString(), icon: "ðŸŽ–ï¸", color: "violet" },
              { label: "Streak Record", value: "12 days", icon: "ðŸ”¥", color: "rose" },
            ].map((s) => (
              <div key={s.label} className="relative overflow-hidden p-4 rounded-2xl border border-white/5 bg-slate-900/40">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className={`text-xl font-black ${s.color === "amber" ? "text-amber-400" : s.color === "sky" ? "text-sky-400" : s.color === "violet" ? "text-violet-400" : "text-rose-400"}`}>{s.value}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { title: "First Commit", desc: "Pushed first GitHub repo", icon: "ðŸš€", earned: true, color: "sky" },
              { title: "Streak Warrior", desc: "7-day active learning streak", icon: "ðŸ”¥", earned: true, color: "rose" },
              { title: "Algo Master", desc: "Solved 50 coding challenges", icon: "ðŸ§ ", earned: true, color: "violet" },
              { title: "Team Player", desc: "Collaborated on 3 projects", icon: "ðŸ¤", earned: true, color: "emerald" },
              { title: "AI Pioneer", desc: "Completed AI Assessment", icon: "ðŸ¤–", earned: true, color: "indigo" },
              { title: "Pitch Perfect", desc: "Delivered first mock pitch", icon: "ðŸŽ¯", earned: false, color: "amber" },
              { title: "Published", desc: "Submit a research paper", icon: "ðŸ“„", earned: false, color: "teal" },
              { title: "Grand Finale", desc: "Land your target internship", icon: "ðŸŽ“", earned: false, color: "gold" },
            ].map((badge) => (
              <div key={badge.title} className={`relative p-4 rounded-2xl border text-center transition-all duration-300 overflow-hidden ${badge.earned
                  ? "border-white/10 bg-slate-900/40 hover:border-white/20 hover:-translate-y-1"
                  : "border-white/5 bg-slate-950/20 opacity-40"
                }`}>
                {!badge.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-3 w-3 text-muted-foreground/30" />
                  </div>
                )}
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className={`text-xs font-black ${badge.earned ? "text-white" : "text-white/30"}`}>{badge.title}</h4>
                <p className={`text-[9px] font-mono mt-1 leading-relaxed ${badge.earned ? "text-muted-foreground/60" : "text-muted-foreground/30"}`}>{badge.desc}</p>
                {badge.earned && (
                  <div className="mt-2 text-[8px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </Page>
      )}

      {/* TAB: COMMUNITY */}
      {currentTab === "community" && (
        <Page title="Student Community" subtitle="Events, discussions, and peer collaboration.">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Stat label="Active Members" value="2.4k" delta="+128 this month" tone="electric" />
            <Stat label="Events This Week" value="6" delta="2 live now" tone="violet" />
            <Stat label="Your Posts" value="12" delta="3 replies today" tone="electric" />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { title: "Resume Roast Workshop", date: "Today · 6:00 PM", attendees: 84, tag: "Live" },
              { title: "System Design Study Group", date: "Wed · 8:00 PM", attendees: 42, tag: "Registered" },
              { title: "Mock Interview Arena", date: "Fri · 5:30 PM", attendees: 56, tag: "Open" },
              { title: "Open Source Sprint", date: "Sat · 10:00 AM", attendees: 31, tag: "Open" },
            ].map((event, i) => (
              <Card key={event.title} className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">{event.tag}</span>
                  <span className="text-[10px] text-muted-foreground">{event.attendees} joined</span>
                </div>
                <h4 className="text-sm font-bold text-white">{event.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                <button
                  onClick={() => setRegisteredEvents((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                  className={`mt-4 w-full py-2 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                    registeredEvents.includes(i)
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                      : "bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950"
                  }`}
                >
                  {registeredEvents.includes(i) ? "Registered ✓" : "Register"}
                </button>
              </Card>
            ))}
          </div>
        </Page>
      )}

      {currentTab === "profile" && (
        <Page title="Profile" subtitle="View and manage your student identity.">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-lg font-black text-slate-950">AB</div>
              <div>
                <div className="text-lg font-bold text-white">Aryan Buha</div>
                <p className="text-xs text-muted-foreground">{educationDegree} · {educationYear}</p>
                <p className="text-[10px] text-sky-400 mt-1">Goal: {userCareerGoal}</p>
              </div>
            </div>
            <Link href="/profile" className="inline-flex mt-4 items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300">
              Open full profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </Page>
      )}
    </>
  );
}
export { StudentDashboard };

