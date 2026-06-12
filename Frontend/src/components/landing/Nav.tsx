import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 18,
        paddingBottom: scrolled ? 10 : 18,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 860 : 1180,
          paddingLeft: scrolled ? 12 : 20,
          paddingRight: scrolled ? 6 : 10,
          paddingTop: scrolled ? 5 : 9,
          paddingBottom: scrolled ? 5 : 9,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15,23,42,0.72) 0%, rgba(30,27,75,0.62) 45%, rgba(15,23,42,0.72) 100%)",
        }}
        className="relative mx-auto flex items-center gap-6 rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.65),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04)]"
      >
        {/* Top gloss reflection sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Soft colorful background glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 0%, rgba(167,139,250,0.22) 0%, rgba(167,139,250,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0) 55%)",
          }}
        />
        {/* Gradient border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            background:
              "linear-gradient(120deg, rgba(167,139,250,0.55), rgba(34,211,238,0.4), rgba(99,102,241,0.5))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: 0.7,
          }}
        />
        {/* Logo */}
        <div className="relative flex items-center">
          <Logo />
        </div>
        {/* Navigation Links */}
        <nav className="relative hidden md:flex items-center gap-0.5 text-sm">
          {[
            { hash: "how", t: "How" },
            { hash: "ecosystem", t: "Ecosystem" },
            { hash: "platform", t: "Platform" },
            { hash: "pricing", t: "Pricing" },
          ].map((i) => (
            <Link
              key={i.t}
              to="/"
              hash={i.hash}
              className="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
            >
              {i.t}
            </Link>
          ))}
        </nav>
        {/* Call to Actions */}
        <div className="relative ml-auto flex items-center gap-1.5">
          <Link
            to="/login"
            className="hidden sm:inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            search={{ tab: "home" }}
            className="group relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.7),inset_0_1px_0_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-px"
            style={{
              backgroundImage: "linear-gradient(120deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 110%)",
            }}
          >
            <span className="relative z-10">Launch Platform</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            {/* Glossy hover shimmer slide-across effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          {/* Hamburger Menu Toggle on Mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 p-6 rounded-3xl border border-white/10 backdrop-blur-3xl bg-slate-950/95 shadow-2xl flex flex-col gap-4 md:hidden z-50"
            >
              {[
                { hash: "how", t: "How" },
                { hash: "ecosystem", t: "Ecosystem" },
                { hash: "platform", t: "Platform" },
                { hash: "pricing", t: "Pricing" },
              ].map((i) => (
                <Link
                  key={i.t}
                  to="/"
                  hash={i.hash}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-white/70 hover:text-white transition py-2 border-b border-white/5 last:border-b-0"
                >
                  {i.t}
                </Link>
              ))}
              <div className="flex flex-col gap-2.5 mt-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/70 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/app"
                  search={{ tab: "home" }}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white"
                  style={{
                    backgroundImage: "linear-gradient(120deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 110%)",
                  }}
                >
                  Launch Platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
