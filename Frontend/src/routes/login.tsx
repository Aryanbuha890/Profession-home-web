import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, AlertCircle
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Professional Home" },
      { name: "description", content: "Access your personalized Command Center." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/app", search: { tab: "home" } as any });
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full bg-[#05060F] text-white flex p-3 sm:p-4 md:p-6 lg:p-8 justify-center items-stretch overflow-hidden box-border">
      
      {/* Global CSS to hide the browser scrollbar track */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Left Visual Card Section */}
      <section 
        className="relative hidden md:flex md:w-[42%] lg:w-[46%] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-white/[0.04] p-8 lg:p-12 flex-col justify-between shadow-2xl shrink-0"
        style={{
          background: "linear-gradient(180deg, #161138 0%, #070514 100%)",
        }}
      >
        {/* Ambient glows inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Dotted grid background overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 z-10">
          <Logo to="/" />
        </div>

        {/* Mid Heading & Copy */}
        <div className="space-y-4 my-auto z-10 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-xs font-medium tracking-wide">
            <span>AI Career Operating System</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Review, assess, and execute across every milestone.
          </h2>
          <p className="text-slate-400/90 text-sm leading-relaxed">
            Professional Home combines AI diagnostics, expert mentorship, and execution tracking to accelerate your growth.
          </p>
        </div>

        {/* Bottom Status Branding */}
        <div className="flex items-center gap-2 text-xs text-slate-500 z-10 font-mono">
          <span>✦ PLATFORM OPERATIONAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </section>

      {/* Right Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center py-4 px-4 md:px-8 z-10 overflow-hidden h-full">
        <div className="w-full max-w-[360px] sm:max-w-[380px] space-y-5 sm:space-y-6">
          
          {/* Header */}
          <div className="space-y-1.5 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="text-slate-400 text-xs">
              Welcome back! Please enter your details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2.5 text-[11px] text-red-300 font-medium">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning={true}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-violet-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-violet-500/80"
                />
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  suppressHydrationWarning={true}
                  className="text-xs text-violet-400 hover:text-violet-300 font-medium transition cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  suppressHydrationWarning={true}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-violet-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-violet-500/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  suppressHydrationWarning={true}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                suppressHydrationWarning={true}
                className="h-3.5 w-3.5 rounded border-white/10 bg-white/[0.02] text-violet-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-violet-600"
              />
              <label htmlFor="remember-me" className="text-xs text-slate-400 select-none cursor-pointer">
                Remember me on this device
              </label>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning={true}
              className="w-full h-9 sm:h-10 bg-white hover:bg-slate-100 text-black font-semibold rounded-full flex items-center justify-center transition duration-200 cursor-pointer shadow-lg shadow-white/5 pt-[1px] text-xs sm:text-sm"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 sm:py-1.5 items-center">
            <div className="flex-grow border-t border-white/[0.06]"></div>
            <span className="flex-shrink mx-3 text-[9px] text-slate-500 font-mono uppercase tracking-widest">Or sign in with</span>
            <div className="flex-grow border-t border-white/[0.06]"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={handleSocialLogin}
              suppressHydrationWarning={true}
              className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/15 flex items-center justify-center transition duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              title="Google"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                <path fill="#34A853" d="M16.04 18.013C14.95 18.72 13.56 19.091 12 19.091c-3.062 0-5.674-2.072-6.6-4.862L1.346 17.39C3.28 21.31 7.26 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                <path fill="#FBBC05" d="M5.398 14.229A7.127 7.127 0 0 1 4.909 12c0-.782.136-1.533.366-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.936.463 3.768 1.346 5.39l4.052-3.161Z" />
              </svg>
            </button>

            {/* Discord */}
            <button
              type="button"
              onClick={handleSocialLogin}
              suppressHydrationWarning={true}
              className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/15 flex items-center justify-center transition duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              title="Discord"
            >
              <svg className="h-4.5 w-4.5 fill-[#5865F2]" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.79-.58,1.56-1.2,2.3-1.84a74.37,74.37,0,0,0,73.42,0c.74.64,1.51,1.26,2.3,1.84a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129,54.65,122.94,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleSocialLogin}
              suppressHydrationWarning={true}
              className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/15 flex items-center justify-center transition duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              title="GitHub"
            >
              <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </button>

            {/* X */}
            <button
              type="button"
              onClick={handleSocialLogin}
              suppressHydrationWarning={true}
              className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/15 flex items-center justify-center transition duration-200 cursor-pointer shadow-md hover:scale-[1.02]"
              title="X"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-400">
            New to Nexis?{" "}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-semibold transition duration-200">
              Create account
            </Link>
          </div>

        </div>
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
