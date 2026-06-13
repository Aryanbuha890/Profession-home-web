import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, User, ArrowRight, AlertCircle, Sparkles
} from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Professional Home" },
      { name: "description", content: "Create your personalized Command Center account." },
    ],
  }),
  component: SignupPage,
});

/* ───────────────────────── MAIN PAGE ───────────────────────── */
function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("ph_onboarding_completed", "false");
      }
      navigate({ to: "/app", search: { tab: "home" } as any });
    }, 1400);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col lg:flex-row bg-[#030208] text-white overflow-hidden">
      
      {/* Global CSS to hide the ugly browser scrollbar track */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Form Section */}
      <section className="flex flex-col flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:max-w-xl lg:px-16 bg-[#06050d] border-r border-white/[0.02] overflow-y-auto no-scrollbar">
        <div className="w-full max-w-sm space-y-5 py-4">
          
          {/* Brand Logo */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md">
                <Sparkles className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Professional Home
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-display">
              Create an Account
            </h1>
            <p className="text-white/40 text-xs">
              Get started by creating your workspace profile.
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                if (typeof window !== "undefined") {
                  localStorage.setItem("ph_onboarding_completed", "false");
                }
                navigate({ to: "/app", search: { tab: "home" } as any });
              }, 1000);
            }}
            className="w-full h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-default group"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
              <path fill="#34A853" d="M16.04 18.013C14.95 18.72 13.56 19.091 12 19.091c-3.062 0-5.674-2.072-6.6-4.862L1.346 17.39C3.28 21.31 7.26 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
              <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
              <path fill="#FBBC05" d="M5.398 14.229A7.127 7.127 0 0 1 4.909 12c0-.782.136-1.533.366-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.936.463 3.768 1.346 5.39l4.052-3.161Z" />
            </svg>
            <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-white/20 text-[10px] font-mono uppercase tracking-widest shrink-0">
              or register with email
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2.5 text-[11px] text-red-300 font-medium">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-white/60">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/10 focus:border-violet-500/50 rounded-xl h-10 pl-10 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-white/60">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/10 focus:border-violet-500/50 rounded-xl h-10 pl-10 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-white/60">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/10 focus:border-violet-500/50 rounded-xl h-10 pl-10 pr-10 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 cursor-default"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-white/60">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/10 focus:border-violet-500/50 rounded-xl h-10 pl-10 pr-10 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 cursor-default"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-0.5">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-white/15 bg-transparent accent-violet-500 cursor-default"
              />
              <label htmlFor="agree-terms" className="text-[10.5px] text-white/40 leading-normal cursor-default select-none">
                I agree to the{" "}
                <Link to="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">Terms</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>.
              </label>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-1.5 transition duration-200 cursor-default"
            >
              {loading ? "Creating..." : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Sign In link */}
          <div className="text-center text-[12px] text-white/30">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="relative hidden flex-1 flex-col items-center justify-center overflow-hidden lg:flex bg-[#030208]">
        {/* Placeholder image layer - REPLACE the URL inside "src" with the image you want to show */}
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
          alt="Visual asset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Ambient fade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#030208] via-transparent to-transparent pointer-events-none" />
      </section>

    </div>
  );
}
