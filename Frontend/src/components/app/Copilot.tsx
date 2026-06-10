import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

export function CopilotFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Copilot"
        className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-background shadow-xl glow"
        style={{ background: "var(--gradient-primary)" }}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[22rem] animate-scale-in rounded-2xl glass-strong p-3 shadow-2xl">
          <div className="flex items-center gap-2 px-1 pb-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Bot className="h-4 w-4 text-background" />
            </span>
            <div className="text-sm font-medium">AI Copilot</div>
            <div className="ml-auto text-[10px] text-muted-foreground">always-on</div>
          </div>
          <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl bg-surface/60 p-3 text-sm">
            <div className="text-muted-foreground">
              How can I help with your roadmap, research, or career today?
            </div>
            <div className="ml-auto max-w-[85%] rounded-xl bg-foreground/10 px-3 py-2">
              Draft my fellowship application outline.
            </div>
            <div className="max-w-[85%] rounded-xl border border-border px-3 py-2">
              Sure — based on your roadmap, I'd suggest structuring it around 3 measurable aims…
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2">
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Ask anything…"
            />
            <button
              className="rounded-md p-1.5 text-background"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
