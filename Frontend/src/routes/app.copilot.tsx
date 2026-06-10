import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Bot, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot — Professional Home" }] }),
  component: Copilot,
});

function Copilot() {
  return (
    <Page title="AI Copilot" subtitle="Persistent assistant across every workflow">
      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <Card className="min-h-[60vh] flex flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
            <div className="max-w-[80%] rounded-2xl border border-border bg-surface/60 p-3">
              Welcome back, Alex. I drafted your weekly review — 3 milestones hit, 2 risks to
              address. Want a summary?
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl bg-foreground/10 p-3">
              Yes, summarize and propose next 3 actions.
            </div>
            <div className="max-w-[80%] rounded-2xl border border-border bg-surface/60 p-3">
              <div className="font-medium">Weekly review</div>
              <ul className="mt-2 list-disc pl-4 text-muted-foreground">
                <li>Submitted abstract to NeurIPS workshop</li>
                <li>Closed 2 design-partner LOIs</li>
                <li>Mentor sessions: Chen, Rossi</li>
              </ul>
              <div className="mt-2 font-medium">Suggested next actions</div>
              <ol className="mt-2 list-decimal pl-4">
                <li>Send budget v3 to Dr. Chen by Tue.</li>
                <li>Book diligence call with Sarah Levin.</li>
                <li>Refresh pitch deck slides 6–9.</li>
              </ol>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-3 py-2">
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Ask anything…"
            />
            <button
              className="rounded-lg p-2 text-background"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Capabilities</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Document & meeting summaries",
              "Roadmap generation",
              "Research assistance",
              "Startup assistance",
              "Career advice",
              "Task recommendations",
            ].map((c) => (
              <li key={c} className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-[var(--electric)]" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-border bg-surface/40 p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground">
              <Bot className="h-4 w-4" /> Context
            </div>
            <p className="mt-2">
              Copilot sees your roadmap, calendar, documents, and mentor messages with your
              permission.
            </p>
          </div>
        </Card>
      </div>
    </Page>
  );
}
