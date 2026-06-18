import React from "react";
import { ArrowUp, Sparkles, Play, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";

interface HeroProps {
  activeProduct: "questly" | "nexora";
}

export function Hero({ activeProduct }: HeroProps) {
  // Questly Specifics
  const questlyBgImage =
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85";
  const grassOverlayImage =
    "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png";

  // Nexora Specifics
  const nexoraVideoUrl =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4";

  return (
    <div className="relative w-full flex-1 flex flex-col overflow-hidden min-h-0">
      {/* ═══════════════════════════════════════════════════════
         BACKGROUNDS (Toggled with animations)
         ═══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {activeProduct === "questly" ? (
          <motion.div
            key="questly-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${questlyBgImage})` }}
          />
        ) : (
          <motion.div
            key="nexora-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 bg-slate-50"
          >
            {/* Nexora Fullscreen Video */}
            <video
              src={nexoraVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
            />
            {/* Dynamic Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-white/30 backdrop-blur-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
         GRASS OVERLAY (Only for Questly)
         ═══════════════════════════════════════════════════════ */}
      {activeProduct === "questly" && (
        <img
          src={grassOverlayImage}
          alt="Grass Bottom Overlay"
          className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
        />
      )}

      {/* ═══════════════════════════════════════════════════════
         CONTENT LAYOUTS
         ═══════════════════════════════════════════════════════ */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-between w-full h-full min-h-0">
        <AnimatePresence mode="wait">
          {activeProduct === "questly" ? (
            /* ═══════════════════════════════════════════════════════
               Questly Hero Section Content
               ═══════════════════════════════════════════════════════ */
            <motion.div
              key="questly-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full flex-1 flex flex-col items-center text-center justify-between min-h-0"
            >
              {/* Spacer */}
              <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

              {/* Central Copy & Actions */}
              <div className="w-full max-w-4xl px-5 flex flex-col items-center shrink-0">
                {/* Headline */}
                <h1 className="text-gray-900 font-normal leading-[1.05] tracking-tight font-nimbus text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
                  <span className="block animate-fade-up">Get cited.</span>
                  <span className="block animate-fade-up [animation-delay:100ms]">
                    Effortlessly.
                  </span>
                </h1>

                {/* Search Bar Form */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="animate-fade-up [animation-delay:220ms] mt-5 sm:mt-6 w-full max-w-xl shrink-0"
                >
                  <div className="flex items-center gap-3 rounded-full bg-white/60 backdrop-blur-md ring-1 ring-gray-200 pl-5 pr-1.5 py-1.5 shadow-sm hover:shadow-md transition-shadow">
                    <input
                      type="text"
                      placeholder="What makes content rank in AI search?"
                      className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 outline-none py-2"
                    />
                    <button
                      type="submit"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </form>

                {/* Description */}
                <p className="animate-fade-up [animation-delay:340ms] mt-4 sm:mt-5 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-sans">
                  Ship articles that answer actual customer questions
                  <br />
                  -- and be seen on <Sparkles className="inline w-4 h-4 -mt-1 text-yellow-500 animate-pulse" /> ChatGPT
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-up [animation-delay:460ms] mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <button className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all cursor-pointer">
                    Try It Free
                  </button>
                  <button className="text-gray-700 text-sm font-medium px-6 py-2.5 rounded-full ring-1 ring-gray-300 hover:bg-gray-100 transition-colors bg-white/40 backdrop-blur-xs cursor-pointer">
                    Talk to sales
                  </button>
                </div>
              </div>

              {/* Spacer before dashboard */}
              <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

              {/* Dashboard Mockup */}
              <div className="animate-hero-rise [animation-delay:620ms] relative z-20 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 -mb-10 sm:-mb-20 lg:-mb-32">
                <DashboardMockup activeProduct="questly" />
              </div>
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════
               Nexora Hero Section Content
               ═══════════════════════════════════════════════════════ */
            <motion.div
              key="nexora-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full flex-1 flex flex-col items-center text-center justify-between min-h-0 font-body"
            >
              {/* Spacer */}
              <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

              {/* Central Copy & Actions */}
              <div className="w-full max-w-4xl px-6 flex flex-col items-center shrink-0">
                {/* GPT-5 Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm text-slate-500 font-medium shadow-xs"
                >
                  Now with GPT-5 support <span className="animate-pulse">✨</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-instrument text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-slate-900 max-w-xl font-normal"
                >
                  The Future of <span className="italic block sm:inline font-serif font-light text-indigo-600">Smarter</span> Automation
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-slate-500 text-base md:text-lg max-w-[650px] leading-relaxed font-normal"
                >
                  Automate your busywork with intelligent agents that learn,
                  adapt, and execute—so your team can focus on what matters
                  most.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-5 flex items-center gap-3 shrink-0"
                >
                  <button className="rounded-full px-6 py-3.5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg transition-all cursor-pointer">
                    Book a demo
                  </button>
                  <button
                    className="h-11 w-11 rounded-full border-0 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-slate-50 transition-colors flex items-center justify-center text-slate-700 cursor-pointer"
                    aria-label="Play Demo"
                  >
                    <Play className="h-4 w-4 fill-slate-700 text-slate-700 translate-x-0.5" />
                  </button>
                </motion.div>
              </div>

              {/* Spacer before dashboard */}
              <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

              {/* Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 -mb-10 sm:-mb-20 lg:-mb-32"
              >
                <DashboardMockup activeProduct="nexora" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
