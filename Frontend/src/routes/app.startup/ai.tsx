import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/app/startup/ai")({
  component: AICoFounderPage,
});

function AICoFounderPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello Alex. I've analyzed your latest MRR data. You have a 15% drop in enterprise retention. Shall I draft a recovery email sequence or run a churn cohort analysis?" }
  ]);
  const [input, setInput] = useState("");
  
  return (
    <div className="h-[75vh] flex flex-col animate-in fade-in zoom-in duration-500">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Co-Founder</h1>
          <p className="text-sm text-slate-400">GPT-4 Strategic Assistant</p>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex flex-col overflow-hidden backdrop-blur-md">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={"flex " + (m.role === 'ai' ? "justify-start" : "justify-end")}>
              <div className={"max-w-[80%] rounded-2xl p-4 " + (m.role === 'ai' ? "bg-slate-800/60 text-slate-200 border border-slate-700/50" : "bg-coral-500 text-white")}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-full px-4 py-2">
            <input 
              value={input} onChange={(e)=>setInput(e.target.value)}
              placeholder="Ask for strategic advice, financial modeling, or drafting..." 
              className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-slate-500" 
              onKeyDown={(e) => {
                if(e.key === 'Enter' && input) {
                  setMessages([...messages, { role: 'user', content: input }]);
                  setInput('');
                  setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'ai', content: "I'm analyzing that request now. I'll provide a framework based on Y-Combinator best practices shortly." }]);
                  }, 1000);
                }
              }}
            />
            <button className="w-8 h-8 rounded-full bg-coral-500 flex items-center justify-center text-white hover:bg-coral-600 transition">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
