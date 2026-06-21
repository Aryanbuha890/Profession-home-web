'use client';
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#05060F] px-6 text-center font-sans selection:bg-violet-500/30 selection:text-white">
      {/* Background ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md">
        {/* Error Code */}
        <h1 className="text-9xl font-black tracking-tighter text-white font-display">
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-white/50 leading-relaxed">
          The page you are looking for doesn't exist or has been relocated to another orbit in our network.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500/10 border border-violet-500/20 px-5 py-3 text-sm font-semibold text-violet-300 hover:bg-violet-500/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
