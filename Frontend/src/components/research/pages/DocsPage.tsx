import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, Search, Brain, Quote } from "lucide-react";
import { Page, Card } from "@/components/app/Page";
import { FadeIn, SectionLabel } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

interface UploadedFile {
  name: string;
  size: string;
  status: string;
  citations?: number;
}

const demoInsights = [
  { label: "Documents Parsed", value: "847", icon: FileText },
  { label: "Citations Extracted", value: "2,341", icon: Quote },
  { label: "AI Summaries", value: "156", icon: Brain },
];

export function ResearchDocsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "NeurIPS_2025_SparseGraph.pdf", size: "2.4 MB", status: "Analyzed ✓", citations: 47 },
    { name: "references.bib", size: "128 KB", status: "Analyzed ✓", citations: 312 },
  ]);
  const [search, setSearch] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      status: "Analyzing",
    }));
    setUploadedFiles((prev) => [...fileList, ...prev]);
    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.status === "Analyzing"
            ? { ...f, status: "Analyzed ✓", citations: Math.floor(Math.random() * 80) + 10 }
            : f,
        ),
      );
    }, 2000);
  };

  const filtered = uploadedFiles.filter((f) => !search.trim() || f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Page title="Document Intelligence" subtitle="Chat with datasets, extract citations automatically.">
      <PageHero
        badge="Citation Parser · 847 Docs"
        title="Document Intelligence Engine"
        subtitle="Upload PDF, BibTeX, CSV, LaTeX files. Auto-extract citations, parse datasets, and build your research knowledge base."
      />
      <FadeIn>
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          {demoInsights.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-4 flex items-center gap-3">
                <s.icon className="h-5 w-5 text-violet-400" />
                <div>
                  <div className="text-lg font-black text-white">{s.value}</div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase">{s.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <SectionLabel>Citation Parser</SectionLabel>
            <h4 className="text-sm font-bold text-white font-display mt-2 mb-4">Upload Research Documents</h4>
            <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 bg-slate-900/30 text-center hover:border-violet-500/30 hover:bg-violet-500/[0.02] transition duration-300 relative group">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Upload className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3 group-hover:text-violet-400 transition" />
              </motion.div>
              <span className="text-xs text-muted-foreground block">Click or drag files here to upload</span>
              <span className="text-[10px] text-muted-foreground/40 mt-1 block">PDF, BibTeX, CSV, LaTeX</span>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search uploaded files..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>
            </div>
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              <AnimatePresence>
                {filtered.map((f, idx) => (
                  <motion.div
                    key={`${f.name}-${idx}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl p-3 font-mono hover:border-violet-500/20 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText size={14} className="text-violet-400 shrink-0" />
                      <span className="text-white truncate text-xs">{f.name}</span>
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      {f.citations !== undefined && (
                        <span className="text-[10px] text-sky-400">{f.citations} cites</span>
                      )}
                      <span className="text-[10px] text-muted-foreground">{f.size}</span>
                      <span
                        className={`text-[10px] font-bold ${f.status.includes("Analyzed") ? "text-emerald-400" : "text-violet-400 animate-pulse"}`}
                      >
                        {f.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </FadeIn>
      </div>
    </Page>
  );
}
