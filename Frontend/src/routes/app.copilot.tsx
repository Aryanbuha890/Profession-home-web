import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Bot, Send, FileText, Calendar, Map as MapIcon, ScrollText, ListChecks, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot — Professional Home" }] }),
  component: Copilot,
});

const suggested = [
  "Summarize my assessment report",
  "Generate a 30-day internship roadmap",
  "What should I do next?",
  "Review my research idea",
  "Create project execution tasks",
];

const tools = [
  { icon: FileText, t: "Document summary", d: "Auto-summarize any uploaded file." },
  { icon: Calendar, t: "Meeting summary", d: "Recap action items from your last call." },
  { icon: MapIcon, t: "Roadmap generator", d: "Turn a goal into a phased plan." },
  { icon: ScrollText, t: "Report drafting", d: "Draft your weekly progress report." },
  { icon: ListChecks, t: "Task recommendations", d: "Get the right 3 tasks for today." },
];

function Copilot() {
  return (
    <Page title="AI Copilot" subtitle="Your personal student strategist">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex h-[560px] flex-col p-0 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-sm font-semibold text-white">
            <Bot className="h-4 w-4 text-sky-400" /> Copilot Chat
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto p-5 text-xs">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3.5 py-2 text-slate-950 font-medium">
                Summarize my assessment report
              </div>
            </div>
            
            <div className="max-w-[85%] space-y-2 rounded-2xl bg-white/5 border border-white/5 px-3.5 py-2">
              <p className="text-[9px] font-mono font-semibold uppercase text-sky-400">Copilot</p>
              <p className="text-white/95 leading-relaxed">
                You're strongest in problem-solving and weakest in shipping deployed projects. Success probability for a top-tier internship is 78% if you ship 1 MVP and complete 12 mock interviews in 6 weeks.
              </p>
              <p className="text-[10px] text-muted-foreground mt-1.5">Next: I'll generate your 30-day plan when you say go.</p>
            </div>
          </div>
          
          <div className="border-t border-white/5 p-4 bg-white/[0.01]">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {suggested.map((s) => (
                <button 
                  key={s} 
                  className="rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] px-2.5 py-1 text-[10px] text-muted-foreground hover:text-white transition cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                className="flex-1 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] focus:bg-white/[0.03] focus:border-sky-400 px-3.5 py-2 text-xs text-white outline-none transition" 
                placeholder="Ask Copilot anything…" 
              />
              <Button size="sm" className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 cursor-pointer">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-sky-400/5 to-transparent border border-sky-400/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-400">
              <Sparkles className="h-4 w-4 animate-pulse" /> Copilot Tools
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">One-click workflows tuned to your roadmap.</p>
          </Card>
          
          {tools.map((t) => {
            const ToolIcon = t.icon;
            return (
              <button 
                key={t.t} 
                className="flex w-full items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-4 text-left shadow-sm transition hover:border-sky-400/30 cursor-pointer"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400">
                  <ToolIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white leading-tight">{t.t}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{t.d}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

