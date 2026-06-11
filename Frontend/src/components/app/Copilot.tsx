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
        <div className="fixed bottom-24 right-6 z-40 w-[22rem] animate-scale-in rounded-2xl bg-[#080a16] border border-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 px-1 pb-3">
            <span
              className="grid h-7 w-7 place-items-center rounded-md"
              style={{ background: "linear-gradient(135deg, #38bdf8, #8b5cf6)" }}
            >
              <Bot className="h-4 w-4 text-slate-950 font-bold" />
            </span>
            <div className="text-sm font-semibold text-white">AI Copilot</div>
            <div className="ml-auto text-[10px] text-muted-foreground font-mono">always-on</div>
          </div>
          
          <div className="max-h-72 space-y-3.5 overflow-y-auto rounded-xl bg-white/[0.02] border border-white/5 p-3.5 text-xs">
            <div className="text-white/80 leading-relaxed italic bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
              How can I help with your roadmap, research, or career today?
            </div>
            
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-slate-950 font-semibold leading-relaxed">
                Draft my fellowship application outline.
              </div>
            </div>
            
            <div className="max-w-[85%] rounded-xl border border-white/5 bg-white/[0.01] px-3 py-2 text-white/90 leading-relaxed">
              <p className="text-[9px] font-mono font-semibold uppercase text-sky-400 mb-0.5">Copilot</p>
              Sure — based on your roadmap, I'd suggest structuring it around 3 aims…
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] focus-within:border-sky-400 px-3.5 py-2 transition">
            <input
              className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-muted-foreground"
              placeholder="Ask anything…"
            />
            <button
              className="rounded-md p-1.5 text-slate-950 font-bold hover:opacity-90 transition cursor-pointer"
              style={{ background: "linear-gradient(135deg, #38bdf8, #8b5cf6)" }}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
