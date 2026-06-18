import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, FileText, ExternalLink } from "lucide-react";
import { Page, Card, Pill } from "@/components/app/Page";
import { publications } from "../mockData";
import { FadeIn, VioletButton, SectionLabel } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

const defaultLatex = `\\begin{abstract}
This paper introduces a novel ML architecture utilizing sparse graph nodes to optimize
parsing efficiency while maintaining state-of-the-art accuracy on benchmark datasets...
\\end{abstract}`;

export function ResearchPublicationsPage() {
  const [latexInput, setLatexInput] = useState(defaultLatex);
  const [latexOutput, setLatexOutput] = useState("");
  const [optimizing, setOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const runOptimizer = () => {
    setOptimizing(true);
    setTimeout(() => {
      setLatexOutput(
        `\\begin{abstract}
We present a state-of-the-art sparse graph representation parser achieving 42% faster citation indexing while retaining high-fidelity compilation accuracy under tight memory constraints. Our methodology introduces novel pruning strategies validated across three benchmark suites.
\\end{abstract}`,
      );
      setOptimizing(false);
    }, 1200);
  };

  const copyOutput = () => {
    if (!latexOutput) return;
    navigator.clipboard.writeText(latexOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Page title="Publication Center" subtitle="Draft manuscripts and use LaTeX abstract text optimizers.">
      <PageHero
        badge="Manuscript Studio · LaTeX AI"
        title="Publication Command Center"
        subtitle="Draft NeurIPS-ready manuscripts, optimize abstracts with AI, and track your publication portfolio with live citation counts."
      />
      <FadeIn>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          {[
            { label: "Published", count: publications.filter((p) => p.status === "published").length, tone: "success" as const },
            { label: "Under Review", count: publications.filter((p) => p.status === "review").length, tone: "warn" as const },
            { label: "Drafts", count: publications.filter((p) => p.status === "draft").length, tone: "default" as const },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-4 text-center">
                <div className="text-2xl font-black text-white">{s.count}</div>
                <Pill tone={s.tone}>{s.label}</Pill>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-5 text-left mb-8">
        <FadeIn className="lg:col-span-3">
          <Card className="p-5 flex flex-col">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-violet-400" /> LaTeX Abstract Draft Editor
            </h3>
            <div className="flex-1 flex gap-3 bg-slate-950 p-4 rounded-xl border border-white/10 font-mono text-xs">
              <div className="text-muted-foreground/30 text-right select-none text-[10px] space-y-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={latexInput}
                onChange={(e) => setLatexInput(e.target.value)}
                className="flex-1 bg-transparent text-violet-400 outline-none resize-none leading-normal font-mono text-xs min-h-[160px]"
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground font-mono">LaTeX Compiler: Ready</span>
              <VioletButton onClick={runOptimizer} disabled={optimizing}>
                {optimizing ? "Optimizing..." : "Optimize Abstract"}
              </VioletButton>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <Card className="p-5 flex flex-col justify-between bg-slate-950/60 min-h-[280px]">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-mono">Optimized Output</h3>
              <motion.div
                key={latexOutput}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-emerald-400 border border-white/5 min-h-[160px] leading-relaxed"
              >
                {latexOutput || "% Click optimize to execute AI abstract modifications..."}
              </motion.div>
            </div>
            {latexOutput && (
              <button
                type="button"
                onClick={copyOutput}
                className="mt-3 w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] rounded-xl cursor-pointer transition flex items-center justify-center gap-2"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            )}
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.15}>
        <SectionLabel>Publication Portfolio</SectionLabel>
        <div className="grid gap-4 mt-4">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <Card className="p-5 hover:border-violet-500/20 transition-all group">
                <div className="flex flex-wrap gap-3 justify-between items-start">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 shrink-0">
                      <FileText className="h-5 w-5 text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition">{pub.title}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono mt-1">
                        {pub.authors.join(", ")} · {pub.journal} · {pub.year}
                      </p>
                      {pub.doi && (
                        <p className="text-[9px] text-sky-400 font-mono mt-1 flex items-center gap-1">
                          DOI: {pub.doi} <ExternalLink size={8} />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-white">{pub.citations}</span>
                    <span className="text-[9px] font-mono text-muted-foreground uppercase">Citations</span>
                    <Pill tone={pub.status === "published" ? "success" : pub.status === "review" ? "warn" : "default"}>
                      {pub.status}
                    </Pill>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </Page>
  );
}
