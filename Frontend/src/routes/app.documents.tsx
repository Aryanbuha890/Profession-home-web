import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Upload, Search, FileText, Sparkles, History, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/app/documents")({
  head: () => ({ meta: [{ title: "Document Intelligence — Professional Home" }] }),
  component: Documents,
});

const files = [
  { name: "Assessment_Report_v2.pdf", type: "PDF", size: "1.2 MB", updated: "2h ago" },
  { name: "Resume_Aarav.docx", type: "DOCX", size: "84 KB", updated: "Yesterday" },
  { name: "MVP_Plan.pptx", type: "PPTX", size: "3.4 MB", updated: "2 days ago" },
  { name: "Research_Refs.xlsx", type: "XLSX", size: "212 KB", updated: "Last week" },
  { name: "Whiteboard.png", type: "IMG", size: "640 KB", updated: "Last week" },
  { name: "Mentor_Notes.md", type: "MD", size: "12 KB", updated: "Last week" },
];

const badgeColor = (t: string) => {
  const map: Record<string, string> = {
    PDF: "bg-red-500/10 text-red-400 border border-red-500/20",
    DOCX: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    PPTX: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    XLSX: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    IMG: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    MD: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  };
  return map[t] || "bg-white/5 text-white/70";
};

function Documents() {
  return (
    <Page
      title="Document Intelligence"
      subtitle="Upload, search, annotate, and let AI analyze your files"
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] focus-within:border-sky-400 px-3.5 py-2 text-sm text-white transition">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder="Search across PDFs, DOCX, PPTX, XLSX, images…"
          />
        </div>
        <Button className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 transition cursor-pointer">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((f) => (
          <Card key={f.name} className="flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sky-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{f.size} · {f.updated}</p>
                </div>
              </div>
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${badgeColor(f.type)}`}>
                {f.type}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-white/5">
              <Button size="sm" variant="outline" className="h-7 text-[10px] py-1 border-white/5 text-white/80 hover:bg-white/5 transition cursor-pointer">
                <Sparkles className="mr-1 h-3 w-3 text-sky-400" /> AI summary
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-[10px] py-1 text-muted-foreground hover:text-white transition cursor-pointer">
                <History className="mr-1 h-3 w-3" /> Versions
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-[10px] py-1 text-muted-foreground hover:text-white transition cursor-pointer">
                <MessageSquare className="mr-1 h-3 w-3" /> Annotate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

