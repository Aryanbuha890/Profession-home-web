import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, ExternalLink } from "lucide-react";
import { Page, Card } from "@/components/app/Page";
import { collaborators } from "../mockData";
import { FadeIn, VioletButton, SectionLabel } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

export function ResearchCollaboratorsPage() {
  const [scholar1, setScholar1] = useState("Dr. Helena Chen");
  const [scholar2, setScholar2] = useState("Dr. Aryan Buha");
  const [matchingScore, setMatchingScore] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [search, setSearch] = useState("");

  const calculateMatching = () => {
    setIsScanning(true);
    setMatchingScore(null);
    setTimeout(() => {
      setMatchingScore(scholar1 === scholar2 ? 100 : Math.round(70 + Math.random() * 28));
      setIsScanning(false);
    }, 1500);
  };

  const filtered = collaborators.filter(
    (c) =>
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <Page title="Collaboration Hub" subtitle="Find academic co-authors and configure compatibility ratios.">
      <PageHero
        badge="Co-Author Intelligence · AI Matcher"
        title="Collaboration Command Hub"
        subtitle="Verify scholar compatibility with AI-powered domain overlap analysis. Search global researchers by expertise, h-index, and institution."
      />
      <div className="grid gap-6 lg:grid-cols-3 text-left mb-8">
        <FadeIn>
          <SpotlightCard className="p-5">
            <SectionLabel>Co-Author Matcher</SectionLabel>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-3 mb-4 font-mono">
              Verification Matrix
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">Scholar Profile 1</label>
                <select
                  value={scholar1}
                  onChange={(e) => setScholar1(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-violet-400"
                >
                  {collaborators.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                  <option>Dr. Aryan Buha</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">Scholar Profile 2</label>
                <select
                  value={scholar2}
                  onChange={(e) => setScholar2(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-violet-400"
                >
                  {collaborators.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                  <option>Dr. Aryan Buha</option>
                </select>
              </div>
              <VioletButton onClick={calculateMatching} disabled={isScanning} className="w-full">
                {isScanning ? "Verifying Crossovers..." : "Verify Matching Ratio"}
              </VioletButton>
            </div>
          </SpotlightCard>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <SpotlightCard className="flex flex-col justify-center items-center text-center p-8 relative overflow-hidden min-h-[280px]">
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="h-0.5 w-full bg-violet-400/80 blur-[2px] shadow-[0_0_8px_#a78bfa] absolute"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
            {matchingScore === null && !isScanning ? (
              <div className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Select co-authors and trigger the matching comparison matrix checks.
              </div>
            ) : matchingScore !== null ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-6xl font-black text-violet-400 font-display tracking-tight">{matchingScore}%</div>
                <div className="text-sm text-white font-bold">Domain Overlap Similarity</div>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  AI analysis detects high co-author alignment based on citation intersections, shared ArXiv bibliography
                  maps, and joint NSF grant project scopes.
                </p>
              </motion.div>
            ) : null}
          </SpotlightCard>
        </FadeIn>
      </div>

      <FadeIn delay={0.15}>
        <div className="relative mb-4 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-400 transition"
          />
        </div>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <SpotlightCard className="p-5 hover:border-violet-500/20 transition-colors group">
              <div className="flex items-start gap-3">
                <img
                  src={c.avatar}
                  alt=""
                  className="w-12 h-12 rounded-xl border border-white/10 object-cover group-hover:border-violet-400/40 transition"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{c.title}</p>
                  <p className="text-[10px] text-violet-400 font-mono mt-0.5">{c.institution}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-[10px] font-mono">
                <span className="text-muted-foreground">
                  h-index <span className="text-white font-bold">{c.hIndex}</span>
                </span>
                <span className="text-muted-foreground">
                  citations <span className="text-white font-bold">{c.citations.toLocaleString()}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {c.expertise.map((e) => (
                  <span
                    key={e}
                    className="text-[8px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="flex-1 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold hover:bg-violet-500/20 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Mail size={10} /> Connect
                </button>
                <button
                  type="button"
                  className="py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition cursor-pointer"
                >
                  <ExternalLink size={12} />
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}
