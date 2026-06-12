import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Sparkles
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Professional Home" },
      { name: "description", content: "Access your personalized Command Center." },
    ],
  }),
  component: LoginPage,
});

/* ───────────────────────── MAIN PAGE ───────────────────────── */
function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Forgot password modal
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/app", search: { tab: "home" } as any });
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotOpen(false);
      setForgotSent(false);
      setForgotEmail("");
      alert("Password reset code sent to " + forgotEmail);
    }, 1500);
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
        <div className="w-full max-w-sm space-y-6 py-4">
          
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
              Welcome back
            </h1>
            <p className="text-white/40 text-xs">
              Sign in to continue to your workspace.
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
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
              or continue with email
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2.5 text-[11px] text-red-300 font-medium">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
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
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-white/60">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-[10px] text-violet-400 hover:text-violet-300 font-medium transition cursor-default"
                >
                  Forgot password?
                </button>
              </div>
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

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-white/15 bg-transparent accent-violet-500 cursor-default"
              />
              <label htmlFor="remember-me" className="text-xs text-white/40 cursor-default select-none">
                Keep me signed in
              </label>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-1.5 transition duration-200 cursor-default"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center text-[12px] text-white/30">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-400 hover:underline">
              Create one for free
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

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-sm relative rounded-[24px] overflow-hidden border border-violet-500/30"
              style={{
                boxShadow:
                  "0 40px 100px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(139,92,246,0.08)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background: "linear-gradient(170deg, rgba(22,18,40,0.95) 0%, rgba(14,11,26,0.98) 100%)",
                  backdropFilter: "blur(60px)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-[24px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.35) 30%, rgba(232,210,255,0.55) 50%, rgba(167,139,250,0.35) 70%, transparent)",
                }}
              />

              <div className="relative p-7">
                <h3 className="text-lg font-bold text-white mb-1.5">Reset Password</h3>
                <p className="text-[12px] text-white/40 mb-5 leading-relaxed">
                  Enter your email and we'll send you a recovery link.
                </p>
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="relative group">
                    <label
                      className="absolute left-4 top-1.5 text-[9px] text-violet-400 font-mono uppercase tracking-widest pointer-events-none"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full text-[13px] text-white bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 pt-6 pb-2.5 focus:border-violet-500/40 focus:outline-none focus:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotOpen(false)}
                      className="px-5 py-2.5 border border-white/[0.06] hover:bg-white/5 text-white text-xs font-semibold rounded-xl cursor-default transition"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 text-white text-xs font-semibold rounded-xl cursor-default transition"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #4f46e5, #7c3aed, #8b5cf6)",
                        boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                      }}
                    >
                      {forgotSent ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
