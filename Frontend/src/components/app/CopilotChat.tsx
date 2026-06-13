import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Image as ImageIcon,
  Video as VideoIcon,
  Terminal as TerminalIcon,
} from "lucide-react";

// Volumetric animated 3D Glowing Orb matching the Syntrix reference visual
export const GlowingOrb = () => (
  <div className="relative w-28 h-28 mx-auto flex items-center justify-center animate-bounce duration-[4000ms] select-none pointer-events-none">
    {/* Volumetric outer glowing glow pools */}
    <div className="absolute inset-0 rounded-full bg-cyan-400/35 blur-2xl animate-pulse duration-[2500ms]" />
    <div className="absolute inset-2 rounded-full bg-indigo-500/25 blur-xl" />
    <div className="absolute -inset-1 rounded-full bg-teal-500/15 blur-3xl animate-pulse duration-[3500ms]" />
    
    {/* Glassmorphic 3D sphere container */}
    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-gradient-to-tr from-indigo-900/60 via-cyan-950/40 to-emerald-800/50 shadow-2xl flex items-center justify-center">
      {/* Dynamic spinning gradients inside */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-transparent to-pink-500/30 animate-spin duration-[25s]" />
      <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-sky-400/30 via-teal-400/20 to-transparent blur-sm animate-pulse duration-[1500ms]" />
      
      {/* High-fidelity fluid energy fields */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-cyan-300/45 blur-md animate-pulse duration-[2000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-indigo-400/40 blur-md animate-pulse duration-[3000ms]" />
      
      {/* Specular glare overlays for realistic 3D glass physics */}
      <div className="absolute top-1.5 left-5 w-8 h-4 bg-white/55 rounded-full rotate-[-25deg] blur-[0.5px]" />
      <div className="absolute bottom-2.5 right-6.5 w-3 h-1.5 bg-white/20 rounded-full rotate-[35deg] blur-[0.5px]" />
    </div>
  </div>
);

interface Message {
  sender: "user" | "copilot";
  text: string;
}

const PRESET_ANSWERS: Record<string, string> = {
  "create an image": "I've loaded the DALL-E image generation engine. Here is a custom mockup prompt for Professional Home:\n\n`A premium dark dashboard interface, glassmorphism UI, 3D glowing volumetric sphere in the center, modern typography, high contrast, clean minimalist layout, 8k resolution, volumetric lighting.`\n\nReady to generate?",
  "analyse data": "I've initialized the AI workspace data analyzer. Let's inspect the metrics for your Student OS progress. You currently have:\n\n- Active Roadmap modules: 3\n- Skill points: 480\n- Level: 4 (PRO)\n- Endorsements pending: 1\n\nWhat specific sector of your analytics should we forecast today?",
  "image generator": "I've loaded the DALL-E image generation engine. Here is a custom mockup prompt for Professional Home:\n\n`A premium dark dashboard interface, glassmorphism UI, 3D glowing volumetric sphere in the center, modern typography, high contrast, clean minimalist layout, 8k resolution, volumetric lighting.`\n\nReady to generate?",
  "video generator": "I've launched the Sora video composition tool. Prompt outline:\n\n`A smooth cinematic tracking shot hovering through a futuristic developer workspace. In the center, a 3D glass glowing energy orb floats above a keyboard. Soft neon blue and electric purple volumetric lighting.`\n\nWould you like to customize the camera angle?",
  "dev assistant": "I've initialized the AI Dev Agent. Let's write the production deployment script. For a Vite project, we can deploy using a simple Node script or Docker container. What is your target host (Vercel, AWS, or Netlify)?",
};

export function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages or typing states update
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerResponse = (query: string) => {
    setIsTyping(true);
    const normalized = query.toLowerCase().trim();
    
    setTimeout(() => {
      let reply = "I've received your query and am analyzing the workspace data. Let's customize a strategy to achieve this goal!";
      
      // Match predefined suggestions
      for (const key of Object.keys(PRESET_ANSWERS)) {
        if (normalized.includes(key)) {
          reply = PRESET_ANSWERS[key];
          break;
        }
      }

      setMessages((prev) => [...prev, { sender: "copilot", text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setInputValue("");
    triggerResponse(query);
  };

  const resetChat = () => {
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <div className="relative flex flex-col h-[650px] w-full rounded-3xl border border-white/5 bg-[#0a0c14] overflow-hidden text-white font-sans shadow-2xl">
      {/* CSS Styles block reproducing the exact glass effect styling and animations */}
      <style>{`
        .container_chat_bot {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .container_chat_bot .container-chat-options {
          position: relative;
          display: flex;
          background: linear-gradient(
            to bottom right,
            #7e7e7e,
            #363636,
            #363636,
            #363636,
            #363636
          );
          border-radius: 16px;
          padding: 1.5px;
          overflow: hidden;
        }

        .container_chat_bot .container-chat-options::after {
          position: absolute;
          content: "";
          top: -10px;
          left: -10px;
          background: radial-gradient(
            circle at center,
            #ffffff,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1),
            transparent
          );
          width: 30px;
          height: 30px;
          filter: blur(1px);
        }

        .container_chat_bot .container-chat-options .chat {
          display: flex;
          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(16px);
          border-radius: 15px;
          width: 100%;
          overflow: hidden;
        }

        .container_chat_bot .container-chat-options .chat .chat-bot {
          position: relative;
          display: flex;
        }

        .container_chat_bot .chat .chat-bot textarea {
          background-color: transparent;
          border-radius: 16px;
          border: none;
          width: 100%;
          height: 55px;
          color: #ffffff;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 400;
          padding: 12px 14px;
          resize: none;
          outline: none;
        }

        .container_chat_bot .chat .chat-bot textarea::placeholder {
          color: #f3f6fd;
          opacity: 0.6;
          transition: all 0.3s ease;
        }
        
        .container_chat_bot .chat .chat-bot textarea:focus::placeholder {
          color: #363636;
          opacity: 0;
        }

        .container_chat_bot .chat .options {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 10px 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
        }

        .container_chat_bot .chat .options .btns-add {
          display: flex;
          gap: 12px;
          margin-bottom: 2px;
        }

        .container_chat_bot .chat .options .btns-add button {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.3);
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 4px;
        }

        .container_chat_bot .chat .options .btns-add button:hover {
          transform: translateY(-3px);
          color: #06b6d4;
        }

        .container_chat_bot .chat .options .btn-submit {
          display: flex;
          padding: 2px;
          background-image: linear-gradient(to top, #292929, #555555, #292929);
          border-radius: 10px;
          box-shadow: inset 0 6px 2px -4px rgba(255, 255, 255, 0.5);
          cursor: pointer;
          border: none;
          outline: none;
          transition: all 0.15s ease;
        }

        .container_chat_bot .chat .options .btn-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .container_chat_bot .chat .options .btn-submit i {
          width: 30px;
          height: 30px;
          padding: 6px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(3px);
          color: #8b8b8b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container_chat_bot .chat .options .btn-submit svg {
          transition: all 0.3s ease;
          width: 14px;
          height: 14px;
        }

        .container_chat_bot .chat .options .btn-submit:not(:disabled):hover svg {
          color: #f3f6fd;
          filter: drop-shadow(0 0 5px #ffffff);
        }

        .container_chat_bot .chat .options .btn-submit:not(:disabled):focus svg {
          color: #f3f6fd;
          filter: drop-shadow(0 0 5px #ffffff);
          transform: scale(1.15) rotate(15deg) translateX(-1px);
        }

        .container_chat_bot .chat .options .btn-submit:not(:disabled):active {
          transform: scale(0.92);
        }

        .container_chat_bot .tags {
          padding: 10px 0;
          display: flex;
          color: #ffffff;
          font-size: 10px;
          gap: 6px;
        }

        .container_chat_bot .tags span {
          padding: 5px 11px;
          background-color: #111116;
          border: 1px solid #27272a;
          border-radius: 10px;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.8);
        }

        .container_chat_bot .tags span:hover {
          background-color: #1e1e24;
          border-color: #3f3f46;
          color: #22d3ee;
        }
      `}</style>

      {/* Background glow meshes to match visual references */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row (Syntrix v4.2 Reference layout) */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/[0.04] bg-[#07090f]/80 backdrop-blur-md z-10">
        {/* Left Brand Badge Dropdown */}
        <div className="flex items-center gap-2">
          <button 
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 transition duration-200 cursor-pointer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Syntrix v4.2</span>
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </button>
        </div>

        {/* Right Navigation Links + User Profile */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-5 text-xs font-semibold tracking-wide text-slate-400">
            <button 
              onClick={resetChat}
              className="text-white hover:text-white transition cursor-pointer border-b-2 border-cyan-400 pb-0.5"
            >
              Dashboard
            </button>
            <button className="hover:text-white transition cursor-pointer">
              Settings
            </button>
            <button className="hover:text-white transition cursor-pointer flex items-center gap-1">
              Help & Support
            </button>
          </nav>
          
          {/* Avatar Profile */}
          <div className="h-7 w-7 rounded-full overflow-hidden border border-white/20 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="User profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Container Area */}
      <div className="relative flex-1 flex flex-col min-h-0 z-10">
        
        {messages.length === 0 ? (
          /* Empty / Welcome State matching Syntrix layout with New Glass Input box */
          <div className="flex-1 flex flex-col justify-between p-6 max-w-3xl mx-auto w-full animate-fade-in select-none">
            {/* Center Header & Volumetric Orb */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 mt-4">
              <GlowingOrb />
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase">
                  WELCOME BACK
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
                  Bring your ideas to life today
                </h1>
              </div>
            </div>

            {/* Premium Custom Glass Input Container (translated styled wrapper) */}
            <div className="w-full max-w-2xl mx-auto space-y-3">
              <div className="container_chat_bot">
                <div className="container-chat-options">
                  <div className="chat">
                    <div className="chat-bot">
                      <textarea 
                        id="chat_bot" 
                        name="chat_bot" 
                        placeholder="Imagine Something...✦˚" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                    </div>
                    <div className="options">
                      <div className="btns-add">
                        <button title="Add attachment">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                          </svg>
                        </button>
                        <button title="Tools">
                          <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" />
                          </svg>
                        </button>
                        <button title="Deep Think">
                          <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleSend()}
                        disabled={!inputValue.trim()}
                        className="btn-submit"
                        title="Send message"
                      >
                        <i>
                          <svg viewBox="0 0 512 512">
                            <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" />
                          </svg>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tags">
                  <span onClick={() => handleSend("Create An Image")}>Create An Image</span>
                  <span onClick={() => handleSend("Analyse Data")}>Analyse Data</span>
                  <span onClick={() => handleSend("More suggestions")}>More</span>
                </div>
              </div>
            </div>

            {/* Bottom Row of 3 Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-2xl mx-auto">
              <div 
                onClick={() => handleSend("Image Generator")}
                className="relative flex flex-col justify-between p-4 h-[120px] rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-cyan-500/20 cursor-pointer transition-all duration-300 group/card"
              >
                <div className="flex justify-between items-start">
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-cyan-400">
                    <ImageIcon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover/card:text-cyan-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wide text-white">Image Generator</h4>
                  <p className="text-[10px] text-slate-500 leading-snug mt-1">Turn ideas into stunning visuals in seconds.</p>
                </div>
              </div>

              <div 
                onClick={() => handleSend("Video Generator")}
                className="relative flex flex-col justify-between p-4 h-[120px] rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-cyan-500/20 cursor-pointer transition-all duration-300 group/card"
              >
                <div className="flex justify-between items-start">
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-indigo-400">
                    <VideoIcon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover/card:text-indigo-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wide text-white">Video Generator</h4>
                  <p className="text-[10px] text-slate-500 leading-snug mt-1">Create cinematic videos from simple prompts.</p>
                </div>
              </div>

              <div 
                onClick={() => handleSend("Dev Assistant")}
                className="relative flex flex-col justify-between p-4 h-[120px] rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/70 hover:border-cyan-500/20 cursor-pointer transition-all duration-300 group/card"
              >
                <div className="flex justify-between items-start">
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-emerald-400">
                    <TerminalIcon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover/card:text-emerald-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wide text-white">Dev Assistant</h4>
                  <p className="text-[10px] text-slate-500 leading-snug mt-1">Accelerate development with intelligent assistance.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Thread State with New Glass Input box at bottom */
          <div className="flex-1 flex flex-col min-h-0 bg-[#07090f]/40 relative">
            {/* Scroll view of messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              <div className="space-y-4 max-w-2xl mx-auto w-full">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-sm ${
                        msg.sender === "user"
                          ? "bg-cyan-600/80 text-white font-medium shadow-lg"
                          : "bg-white/[0.03] border border-white/5 text-white/95"
                      }`}
                    >
                      {msg.sender === "copilot" && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          <span className="text-[10px] font-semibold text-cyan-400 font-mono tracking-wider uppercase">
                            Copilot
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-line text-xs">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-up">
                    <div className="max-w-[85%] rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 text-white/90">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[10px] font-semibold text-cyan-400 font-mono tracking-wider uppercase">
                          Copilot
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={feedEndRef} />
              </div>
            </div>

            {/* Bottom Input Box for follow ups */}
            <div className="px-6 pb-4 pt-2 max-w-2xl mx-auto w-full">
              <div className="container_chat_bot">
                <div className="container-chat-options">
                  <div className="chat">
                    <div className="chat-bot">
                      <textarea 
                        id="chat_bot" 
                        name="chat_bot" 
                        placeholder="Imagine Something...✦˚" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                    </div>
                    <div className="options">
                      <div className="btns-add">
                        <button title="Add attachment">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                          </svg>
                        </button>
                        <button title="Tools">
                          <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" />
                          </svg>
                        </button>
                        <button title="Deep Think">
                          <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleSend()}
                        disabled={!inputValue.trim()}
                        className="btn-submit"
                        title="Send message"
                      >
                        <i>
                          <svg viewBox="0 0 512 512">
                            <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" />
                          </svg>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tags">
                  <span onClick={() => handleSend("Create An Image")}>Create An Image</span>
                  <span onClick={() => handleSend("Analyse Data")}>Analyse Data</span>
                  <span onClick={() => handleSend("More suggestions")}>More</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
