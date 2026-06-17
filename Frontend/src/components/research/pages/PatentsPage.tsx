import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield, FileCheck } from "lucide-react";
import { Page, Card } from "@/components/app/Page";
import { patents as initialPatents } from "../mockData";
import type { Patent } from "../types";
import { FadeIn, SectionLabel, ShimmerBar, VioletButton } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

export function ResearchPatentsPage() {
  const [patents, setPatents] = useState<Patent[]>(initialPatents);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    setPatents((prev) => [
      ...prev,
      {
        id: `pat-${Date.now()}`,
        title: newTitle.trim(),
        stage: "Idea Submission",
        progress: 10,
        filingDate: "TBD",
        inventors: ["A. Buha"],
      },
    ]);
    setNewTitle("");
  };

  return (
    <Page title="Patent Intelligence" subtitle="Track IP filings, prior art searches, and validation stages.">
      <PageHero
        badge="IP Protection · 3 Sequences"
        title="Patent Filing Pipeline"
        subtitle="Track provisional filings, prior art searches, and research validation stages. Submit new invention sequences instantly."
      />
      <FadeIn>
        <div className="mb-6 p-5 rounded-2xl border border-rose-500/10 bg-gradient-to-r from-rose-500/5 via-violet-500/5 to-transparent relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <Shield className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <SectionLabel>IP Protection Suite</SectionLabel>
              <h2 className="text-lg font-black text-white mt-1">{patents.length} Patent Sequences Active</h2>
              <p className="text-xs text-muted-foreground">1 pending examination · 2 in validation pipeline</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-3 text-left">
        <div className="lg:col-span-2 space-y-4">
          {patents.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 hover:border-rose-500/20 transition-all group">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 h-fit">
                    <FileCheck className="h-5 w-5 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition">{p.title}</h4>
                      <span className="text-[9px] font-mono text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded shrink-0">
                        {p.stage}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">
                      Inventors: {p.inventors.join(", ")} · Filing: {p.filingDate}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                        <span>Pipeline Progress</span>
                        <span>{p.progress}%</span>
                      </div>
                      <ShimmerBar value={p.progress} color="from-rose-400 to-violet-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <Card className="p-5 sticky top-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono flex items-center gap-2">
              <Plus size={14} className="text-violet-400" /> New Patent Filing
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Patent title or invention name..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-violet-400"
              />
              <VioletButton onClick={handleAdd} className="w-full">
                Submit Idea Sequence
              </VioletButton>
            </div>
            <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Prior art search and provisional filing typically take 4–6 weeks. Connect with legal counsel before
                submission.
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>
    </Page>
  );
}
