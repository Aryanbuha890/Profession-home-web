import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { useState } from "react";
import {
  Award,
  BookOpen,
  FileText,
  Medal,
  Star,
  Plus,
  ShieldCheck,
  Share2,
  ExternalLink,
  Search,
  Copy,
  Check,
  Filter,
  Trash2,
  Calendar,
  FileDown,
  Sparkles,
  Link as LinkIcon,
  X,
  Lock,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/app/achievements")({
  head: () => ({ meta: [{ title: "Achievement Vault — Professional Home" }] }),
  component: Achievements,
});

interface AchievementItem {
  id: string;
  category: "Fellowship" | "Publication" | "Award" | "Patent";
  title: string;
  issuer: string;
  year: string;
  desc: string;
  hash: string;
  status: "verified" | "pending";
  portfolio: boolean;
  score?: number;
}

function Achievements() {
  const [items, setItems] = useState<AchievementItem[]>([
    {
      id: "1",
      category: "Fellowship",
      title: "Marie Curie Fellowship",
      issuer: "European Commission",
      year: "2026",
      desc: "Prestigious research grant awarded for excellence in scientific investigation, research leadership, and international mobility.",
      hash: "0x7a8d9b1c2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
      status: "verified",
      portfolio: true,
      score: 98,
    },
    {
      id: "2",
      category: "Publication",
      title: "Nature Methods Journal",
      issuer: "Nature Publishing Group",
      year: "2025",
      desc: "Published research paper 'High-throughput single-cell spatial transcriptomics optimization' with 42+ verified citations.",
      hash: "0x12c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1",
      status: "verified",
      portfolio: true,
      score: 95,
    },
    {
      id: "3",
      category: "Award",
      title: "Best Poster · NeurIPS Workshop",
      issuer: "NeurIPS Foundation",
      year: "2024",
      desc: "Selected as top 1% presentation in the Machine Learning for Structural Biology workshop amongst 450+ submissions.",
      hash: "0x98f5e71c2d3a4b5c6e7f8a9b0c1d2e3f4a5b6c7d",
      status: "verified",
      portfolio: true,
      score: 92,
    },
    {
      id: "4",
      category: "Patent",
      title: "Patent — US 11/482,221",
      issuer: "USPTO",
      year: "2024",
      desc: "Distributed ledger verification systems for decentralized digital assets, verifiable academic credentials, and identity.",
      hash: "0x3b8ac40d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
      status: "verified",
      portfolio: true,
      score: 96,
    },
    {
      id: "5",
      category: "Award",
      title: "Forbes 30 Under 30 (Science)",
      issuer: "Forbes Magazine",
      year: "2025",
      desc: "Recognized in the Science & Healthcare category for contributions to neural-network based protein folding predictions.",
      hash: "0xe24ad55e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
      status: "verified",
      portfolio: true,
      score: 99,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedFlashId, setVerifiedFlashId] = useState<string | null>(null);

  // Add Achievement Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newYear, setNewYear] = useState("2026");
  const [newCategory, setNewCategory] = useState<"Fellowship" | "Publication" | "Award" | "Patent">("Award");
  const [newDesc, setNewDesc] = useState("");

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerifyOnChain = (id: string) => {
    setVerifyingId(id);
    setTimeout(() => {
      setVerifyingId(null);
      setVerifiedFlashId(id);
      setTimeout(() => setVerifiedFlashId(null), 2500);
    }, 1500);
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    const newObj: AchievementItem = {
      id: String(Date.now()),
      category: newCategory,
      title: newTitle,
      issuer: newIssuer,
      year: newYear,
      desc: newDesc || "No description provided.",
      hash: "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      status: "pending",
      portfolio: true,
      score: Math.floor(Math.random() * 15) + 85,
    };

    setItems([newObj, ...items]);
    setIsModalOpen(false);
    // Reset form
    setNewTitle("");
    setNewIssuer("");
    setNewYear("2026");
    setNewCategory("Award");
    setNewDesc("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = ["All", "Fellowship", "Publication", "Award", "Patent"];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Fellowship":
        return Medal;
      case "Publication":
        return BookOpen;
      case "Patent":
        return FileText;
      case "Award":
      default:
        return Award;
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Fellowship":
        return {
          bg: "bg-sky-500/10 text-sky-400 border-sky-500/25",
          accent: "from-sky-400 to-blue-500",
          glow: "shadow-sky-500/20"
        };
      case "Publication":
        return {
          bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
          accent: "from-emerald-400 to-teal-500",
          glow: "shadow-emerald-500/20"
        };
      case "Patent":
        return {
          bg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
          accent: "from-indigo-400 to-purple-500",
          glow: "shadow-indigo-500/20"
        };
      case "Award":
      default:
        return {
          bg: "bg-amber-500/10 text-amber-400 border-amber-500/25",
          accent: "from-amber-400 to-orange-500",
          glow: "shadow-amber-500/20"
        };
    }
  };

  return (
    <Page
      title="Achievement Vault"
      subtitle="Cryptographically verified certificates, papers, patents, and global accolades."
    >
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header Metrics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Verified Credentials",
              value: items.filter(i => i.status === "verified").length.toString(),
              sub: "100% Cryptographic Trust",
              color: "text-emerald-400",
              badge: "SECURE"
            },
            {
              label: "Global Accolades",
              value: items.filter(i => i.category === "Award").length.toString(),
              sub: "Forbes & Global Awards",
              color: "text-amber-400",
              badge: "TOP tier"
            },
            {
              label: "Avg. Credential Score",
              value: `${Math.round(items.reduce((acc, curr) => acc + (curr.score || 0), 0) / items.length)}%`,
              sub: "Percentile normalizer index",
              color: "text-sky-400",
              badge: "EXCELLENT"
            },
            {
              label: "IP & Intellectual Assets",
              value: (items.filter(i => i.category === "Patent" || i.category === "Publication").length).toString(),
              sub: "Patents & journal papers",
              color: "text-indigo-400",
              badge: "RESEARCH"
            }
          ].map((stat, idx) => (
            <div key={idx} className="relative rounded-2xl border border-white/5 bg-slate-950/40 p-5 shadow-xl backdrop-blur-md overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">{stat.label}</span>
                <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5 uppercase">{stat.badge}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className={`text-3xl font-black tracking-tight font-display ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Interactive Tool Bar (Search, Filters, Action) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-slate-950/25 backdrop-blur-md">
          {/* Left filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-tight transition cursor-pointer select-none ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold shadow-lg shadow-sky-500/10"
                    : "border border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {cat === "All" ? "All Assets" : cat + "s"}
              </button>
            ))}
          </div>

          {/* Right search & add */}
          <div className="flex items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-all font-medium"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-md shadow-sky-400/10 flex items-center gap-1.5 text-xs cursor-pointer select-none"
            >
              <Plus className="w-4 h-4 shrink-0" /> Add Achievement
            </button>
          </div>
        </div>

        {/* 3. Grid List */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-slate-950/10"
            >
              <Award className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">No matching achievements</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                No verified records found matching "{searchQuery}" under the current filter selection.
              </p>
            </motion.div>
          ) : (
            <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => {
                const ItemIcon = getCategoryIcon(item.category);
                const styles = getCategoryStyles(item.category);
                const isVerifying = verifyingId === item.id;
                const isVerifiedFlash = verifiedFlashId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl border border-white/10 bg-slate-950/30 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-all duration-300"
                  >
                    {/* Glowing highlight indicator */}
                    <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${styles.accent}`} />
                    
                    {/* Card Top */}
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${styles.accent} text-slate-950 shadow-md ${styles.glow}`}>
                          <ItemIcon className="h-5.5 w-5.5" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-bold font-mono tracking-wide px-2 py-0.5 rounded-full border ${styles.bg}`}>
                            {item.category.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">{item.year}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-sky-400 transition-colors font-display">
                          {item.title}
                        </h3>
                        <p className="text-xs text-sky-400/80 font-semibold mt-0.5 flex items-center gap-1 font-mono uppercase tracking-wider">
                          <Globe className="w-3 h-3 text-sky-400/80" /> {item.issuer}
                        </p>
                        <p className="text-[12px] text-muted-foreground mt-2.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom / Actions */}
                    <div className="mt-6 pt-4 border-t border-white/5 space-y-3.5">
                      {/* Cryptographic Ledger Block */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex items-center justify-between text-[10px] font-mono">
                        <div className="min-w-0 flex-1">
                          <span className="text-white/30 uppercase text-[9px] block">Ledger Verification ID</span>
                          <span className="text-white/70 block truncate pr-2 mt-0.5">{item.hash}</span>
                        </div>
                        <button
                          onClick={() => handleCopyHash(item.id, item.hash)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition cursor-pointer shrink-0"
                          title="Copy Tx Hash"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Pill badging */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.status === "verified" ? (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono px-2 py-0.5 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> VERIFIED
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold font-mono px-2 py-0.5 flex items-center gap-1">
                            <Lock className="w-3 h-3 animate-pulse" /> PENDING
                          </span>
                        )}
                        {item.portfolio && (
                          <span className="rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-medium font-mono px-2 py-0.5">
                            PORTFOLIO SYNC
                          </span>
                        )}
                        {item.score && (
                          <span className="ml-auto text-[10px] font-bold font-mono text-sky-400/80">
                            Rank Score: {item.score}
                          </span>
                        )}
                      </div>

                      {/* Interactive Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleVerifyOnChain(item.id)}
                          disabled={isVerifying}
                          className={`w-full py-2 rounded-xl text-[10px] font-bold font-mono border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            isVerifiedFlash
                              ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                              : isVerifying
                                ? "bg-white/5 border-white/5 text-white/30 cursor-wait"
                                : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-white"
                          }`}
                        >
                          {isVerifying ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              VERIFYING...
                            </>
                          ) : isVerifiedFlash ? (
                            <>
                              <Check className="w-3 h-3" />
                              VERIFIED
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-sky-400" />
                              VERIFY ON-CHAIN
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => alert(`Launching official credential verification drawer for ${item.title}`)}
                          className="w-full py-2 rounded-xl text-[10px] font-bold font-mono border border-white/5 bg-slate-900/60 hover:bg-slate-900/90 text-sky-400 flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          VIEW CREDENTIAL
                        </button>
                      </div>

                      {/* Delete action for custom items */}
                      {item.id.length > 5 && (
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-[10px] text-red-400/60 hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer transition"
                          >
                            <Trash2 className="w-3 h-3" /> Remove Record
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Custom Add Modal Overlay */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl z-10"
              >
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-400" />
                    Register Verified Achievement
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white cursor-pointer transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddAchievement} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">Asset Category</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["Award", "Fellowship", "Publication", "Patent"] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewCategory(cat)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer select-none ${
                            newCategory === cat
                              ? "bg-sky-500/10 border-sky-400 text-sky-400"
                              : "border-white/5 bg-white/[0.02] text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marie Curie Fellowship"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">Issuer / Institution</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. European Commission"
                        value={newIssuer}
                        onChange={(e) => setNewIssuer(e.target.value)}
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">Year</label>
                      <select
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500/50 transition-all font-medium"
                      >
                        {["2026", "2025", "2024", "2023", "2022", "2021"].map((yr) => (
                          <option key={yr} value={yr} className="bg-slate-950 text-white">
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">Brief Description</label>
                    <textarea
                      placeholder="Detail the significance of this credential..."
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all font-medium resize-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/5 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-white cursor-pointer select-none transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer select-none text-xs"
                    >
                      Submit Asset
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </Page>
  );
}
