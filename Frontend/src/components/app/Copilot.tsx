import { useState, useEffect } from "react";
import { Send, X, Sparkles, Bot } from "lucide-react";

export function CopilotFab() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "system",
      text: "Welcome Aryan 👋. I've updated your Student Growth OS command suite. What are we accomplishing today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");

    // Simulate Streaming response
    setTimeout(() => {
      let botResponse = "";
      if (userMsg.toLowerCase().includes("career") || userMsg.toLowerCase().includes("roadmap")) {
        botResponse =
          "According to your current level (Lv. 4), you should focus on completing the 'Build AI Project' mission to unlock the Interview District in the Career Arena.";
      } else if (userMsg.toLowerCase().includes("arena") || userMsg.toLowerCase().includes("district")) {
        botResponse =
          "The Foundation, Skills, and Project districts are unlocked. You need +2 completed missions to unlock the Interview District.";
      } else if (userMsg.toLowerCase().includes("internship") || userMsg.toLowerCase().includes("job")) {
        botResponse =
          "I found 3 new internship recommendations. Your match score is highest for the ML Intern role at OpenAI (98%). Check out the Opportunities tab.";
      } else {
        botResponse =
          "I've cataloged that goal in your Career Roadmap. Let's connect with Dr. Helena Chen in the Mentors Hub to review your progress.";
      }

      setMessages((prev) => [...prev, { sender: "copilot", text: botResponse }]);
    }, 800);
  };

  return (
    <>
      {/* Floating AI Orb */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Copilot Orb"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl focus:outline-none cursor-pointer group"
      >
        {/* Pulsing Orb Background Glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 opacity-70 blur-md group-hover:opacity-100 group-hover:scale-110 transition duration-300 animate-pulse-glow" />

        {/* Orbiting Ring */}
        <span className="absolute -inset-1 rounded-full border border-sky-400/30 group-hover:border-sky-400/50 animate-orbit pointer-events-none" />

        {/* Inner Glass Orb */}
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 border border-white/20 backdrop-blur-xl group-active:scale-95 transition-transform duration-150">
          {open ? (
            <X className="h-5 w-5 text-white animate-scale-in" />
          ) : (
            <Sparkles className="h-5 w-5 text-sky-400 group-hover:text-indigo-300 transition-colors animate-float" />
          )}
        </span>
      </button>

      {/* Copilot Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[24rem] max-w-[calc(100vw-2rem)] animate-scale-in rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-2 px-1 pb-3 border-b border-white/5">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 text-slate-950 font-bold">
              <Sparkles className="h-4 w-4 text-slate-950" />
            </span>
            <div>
              <div className="text-sm font-bold text-white leading-none">AI Copilot Orb</div>
              <div className="text-[9px] text-sky-400 font-mono mt-1 font-semibold tracking-wider uppercase">
                Active & Intelligent
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-muted-foreground font-mono">sync active</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="mt-3 h-72 space-y-3 overflow-y-auto rounded-xl bg-white/[0.01] border border-white/5 p-3.5 text-xs scrollbar-thin">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-up`}
              >
                {msg.sender === "user" ? (
                  <div className="max-w-[85%] rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3.5 py-2.5 text-slate-950 font-semibold leading-relaxed shadow-md">
                    {msg.text}
                  </div>
                ) : (
                  <div className="max-w-[85%] rounded-2xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-white/90 leading-relaxed">
                    <p className="text-[9px] font-mono font-semibold uppercase text-sky-400 mb-1">
                      {msg.sender === "system" ? "Daily Guidance" : "Copilot"}
                    </p>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              "Check Career Score",
              "Next Arena Mission",
              "Internships Match",
              "Book Dr. Chen",
            ].map((shortcut) => (
              <button
                key={shortcut}
                onClick={() => {
                  setInputValue(shortcut);
                }}
                className="whitespace-nowrap rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 px-2.5 py-1 text-[10px] text-muted-foreground hover:text-white transition cursor-pointer"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] focus-within:border-sky-400/50 px-3.5 py-1.5 transition">
            <input
              className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-muted-foreground"
              placeholder="Ask for career tips, mock prep..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              onClick={handleSend}
              className="rounded-lg p-2 text-slate-950 hover:opacity-90 transition cursor-pointer"
              style={{ background: "linear-gradient(135deg, #38bdf8, #8b5cf6)" }}
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
