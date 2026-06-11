import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Video, MicOff, MessageSquare, FileText, CheckCircle2, Send } from "lucide-react";

export const Route = createFileRoute("/app/workspace")({
  head: () => ({ meta: [{ title: "Workspace — Professional Home" }] }),
  component: Workspace,
});

function Workspace() {
  return (
    <Page title="Consulting Workspace" subtitle="Private HQ · Aarav × Priya">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Video panel */}
        <Card className="flex flex-col gap-0 p-0 overflow-hidden">
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#0c0d1b] to-[#1a1b35] text-white">
            <div className="text-center">
              <Video className="mx-auto h-10 w-10 text-sky-400 opacity-80" />
              <p className="mt-3 text-sm font-semibold opacity-90">Discovery session — Live in 18:42</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-white/[0.01]">
            <Button size="sm" variant="outline" className="border-white/5 text-muted-foreground hover:text-white cursor-pointer"><MicOff className="h-4 w-4" /></Button>
            <Button size="sm" variant="outline" className="border-white/5 text-muted-foreground hover:text-white cursor-pointer"><Video className="h-4 w-4" /></Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer transition">Leave Call</Button>
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex flex-col h-[380px] lg:h-auto">
          <div className="border-b border-white/5 pb-2.5 text-sm font-semibold text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-sky-400" /> Live Chat
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto py-3 text-xs">
            <Msg who="Priya" text="Let's start with your current roadmap." />
            <Msg who="You" text="Shared the project doc above." mine />
            <Msg who="Priya" text="Great — focus this week on shipping the MVP feature." />
          </div>
          <div className="flex items-center gap-2 border-t border-white/5 pt-3">
            <input 
              className="flex-1 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] focus:bg-white/[0.03] focus:border-sky-400 px-3.5 py-2 text-xs text-white outline-none transition" 
              placeholder="Type a message…" 
            />
            <Button size="sm" className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 cursor-pointer">
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Live Notes">
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Aarav strong in algorithms.</li>
            <li>• Needs deployed project + 2 case studies.</li>
            <li>• Plan: 4-week MVP sprint.</li>
          </ul>
        </Panel>
        
        <Panel title="Tasks & Milestones">
          <ul className="space-y-2.5 text-xs text-white/80">
            {[["Define MVP scope", true], ["Build auth flow", false], ["Ship v1 to Vercel", false]].map(([t, d]) => (
              <li key={t as string} className="flex items-center gap-2">
                <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 ${d ? "text-emerald-400" : "text-muted-foreground/35"}`} />
                <span className={d ? "line-through text-muted-foreground" : ""}>{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
        
        <Panel title="Shared Documents">
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            {["Project_brief.docx", "Resume_Aarav.pdf", "Mentor_notes.md"].map((d) => (
              <li key={d} className="flex items-center gap-2 hover:text-white transition">
                <FileText className="h-4.5 w-4.5 text-sky-400 shrink-0" /> {d}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Page>
  );
}

function Msg({ who, text, mine }: { who: string; text: string; mine?: boolean }) {
  return (
    <div className={`flex ${mine ? "justify-end" : ""}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${mine ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-medium" : "bg-white/5 text-white/90 border border-white/5"}`}>
        {!mine && <p className="text-[9px] font-mono font-semibold uppercase tracking-wide text-sky-400 mb-0.5">{who}</p>}
        <p>{text}</p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <p className="text-sm font-semibold text-white border-b border-white/5 pb-2">{title}</p>
      <div className="mt-3">{children}</div>
    </Card>
  );
}
