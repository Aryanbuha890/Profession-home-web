import React, { useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PHDashboardMockup } from "./PHDashboardMockup";

export function PHHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari/iOS native play support
      video.src = videoUrl;
    } else {
      // Use hls.js for Chrome/Firefox/Edge
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@1";
      script.async = true;
      script.onload = () => {
        const Hls = (window as any).Hls;
        if (Hls && Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch((err) => console.log("HLS Play blocked", err));
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [videoUrl]);

  return (
    <section
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-12 overflow-hidden bg-slate-50"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white pointer-events-none">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.22] mix-blend-multiply"
          muted
          loop
          playsInline
          autoPlay
        />
        {/* Soft premium radial and linear blending masks */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/40 to-white/95" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Stripe-style gradient mesh blob overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-50/30 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* Aurora Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-200/15 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-violet-200/10 rounded-full blur-[100px] pointer-events-none z-[1]" />

      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none z-[1]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-6xl px-6 flex flex-col justify-center items-center z-10 text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-semibold text-indigo-600 tracking-wide shadow-2xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The Operating System for Professional Growth
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px] md:leading-[1.05]"
        >
          Turn{" "}
          <span className="font-instrument italic font-light text-indigo-600">Ambition</span>
          {" "}Into Achievement.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-500 sm:text-lg leading-relaxed"
        >
          Professional Home combines AI Assessment, Expert Mentorship, Research Tools, Startup
          Operations, and Outcome Analytics into one unified command center — from
          your first milestone to your greatest achievement.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 shrink-0"
        >
          <Link
            href="/dashboard?tab=home"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.4)] transition-all hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
          >
            <span className="relative z-10">Launch Command Center</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <button className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
            <Play className="h-4 w-4 text-slate-400 fill-slate-400" /> Watch 90-sec Demo
          </button>
        </motion.div>

        {/* Dashboard Mockup (Fades and rises up) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto mt-16 relative z-20"
        >
          <PHDashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
