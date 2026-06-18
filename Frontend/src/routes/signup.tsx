import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye, EyeOff, Mail, User, AlertCircle
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Professional Home" },
      { name: "description", content: "Create your personalized Command Center account." },
    ],
  }),
  component: SignupPage,
});

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

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("ph_onboarding_completed", "false");
      }
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
            Build your personalized career command center.
          </h2>
          <p className="text-slate-400/90 text-sm leading-relaxed">
            Join thousands of professionals tracking achievements, executing career roadmaps, and getting AI-powered coaching.
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
        <div className="w-full max-w-[360px] sm:max-w-[380px] space-y-4 sm:space-y-5">
          
          {/* Header */}
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Create an account
            </h1>
            <p className="text-slate-400 text-xs">
              Enter your details below to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2 text-[10px] text-red-300 font-medium">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  suppressHydrationWarning={true}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-violet-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-violet-500/80"
                />
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
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
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create password (min. 6 chars)"
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

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  suppressHydrationWarning={true}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-violet-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-violet-500/80"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  suppressHydrationWarning={true}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-start gap-2.5 pt-0.5">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                suppressHydrationWarning={true}
                className="mt-0.5 h-3.5 w-3.5 rounded border-white/10 bg-white/[0.02] text-violet-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-violet-600"
              />
              <label htmlFor="agree-terms" className="text-[10.5px] text-slate-400 leading-normal select-none cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">Terms</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>.
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning={true}
              className="w-full h-9 sm:h-10 bg-white hover:bg-slate-100 text-black font-semibold rounded-full flex items-center justify-center transition duration-200 cursor-pointer shadow-lg shadow-white/5 pt-[1px] text-xs sm:text-sm"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/[0.06]"></div>
            <span className="flex-shrink mx-3 text-[9px] text-slate-500 font-mono uppercase tracking-widest">Or sign up with</span>
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
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition duration-200">
              Sign In
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
