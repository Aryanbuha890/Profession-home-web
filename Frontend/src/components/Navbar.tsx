import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  activeProduct: "questly" | "nexora";
  setActiveProduct: (product: "questly" | "nexora") => void;
}

export function Navbar({ activeProduct, setActiveProduct }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {activeProduct === "questly" ? (
        /* ═══════════════════════════════════════════════════════
           Questly Navbar Style
           ═══════════════════════════════════════════════════════ */
        <header className="animate-fade-down relative z-50 w-full">
          <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 sm:py-5">
            {/* Logo Left */}
            <div className="flex items-center gap-2 text-gray-900">
              <Logo className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold text-lg sm:text-xl tracking-tight font-sans">
                Questly
              </span>
            </div>

            {/* Desktop Nav Links Center */}
            <nav className="hidden md:flex items-center gap-8 text-[13px] text-gray-700 font-medium">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                Toolkit <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <a href="#plans" className="hover:text-gray-900 transition-colors">
                Plans
              </a>
              <a href="#news" className="hover:text-gray-900 transition-colors">
                News
              </a>
            </nav>

            {/* Right: Product Switcher & CTA / Hamburger */}
            <div className="flex items-center gap-3">
              {/* Product Switcher inside Navbar */}
              <div className="flex items-center rounded-full bg-gray-100 p-0.5 border border-gray-200">
                <button
                  onClick={() => setActiveProduct("questly")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    activeProduct === "questly"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Questly
                </button>
                <button
                  onClick={() => setActiveProduct("nexora")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    activeProduct === "nexora"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Nexora
                </button>
              </div>

              {/* CTA Button */}
              <button className="hidden sm:inline-block bg-gray-900 text-white text-[13px] font-medium px-4 sm:px-5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
                Try It Free
              </button>

              {/* Hamburger Button (md:hidden) */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-900 hover:bg-gray-900/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute left-4 right-4 top-full rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-gray-200 px-5 py-3 animate-fade-up z-50 shadow-lg">
              <nav className="flex flex-col text-[15px] font-medium text-gray-700">
                <a
                  href="#toolkit"
                  className="py-2.5 hover:text-gray-900 border-b border-gray-200 last:border-b-0"
                >
                  Toolkit
                </a>
                <a
                  href="#plans"
                  className="py-2.5 hover:text-gray-900 border-b border-gray-200 last:border-b-0"
                >
                  Plans
                </a>
                <a
                  href="#news"
                  className="py-2.5 hover:text-gray-900 border-b border-gray-200 last:border-b-0"
                >
                  News
                </a>
                <div className="pt-2">
                  <button className="w-full bg-gray-900 text-white text-sm font-medium py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Try It Free
                  </button>
                </div>
              </nav>
            </div>
          )}
        </header>
      ) : (
        /* ═══════════════════════════════════════════════════════
           Nexora Navbar Style
           ═══════════════════════════════════════════════════════ */
        <header className="relative z-50 w-full font-body">
          <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
            {/* Logo Left */}
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
              <span className="text-xl font-semibold tracking-tight">
                ✦ Nexora
              </span>
            </div>

            {/* Desktop Nav Links (hidden on mobile) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {["Home", "Pricing", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Side: Switcher + CTA */}
            <div className="flex items-center gap-4">
              {/* Product Switcher inside Navbar */}
              <div className="flex items-center rounded-full bg-slate-100 dark:bg-white/10 p-0.5 border border-slate-200/50 dark:border-white/5">
                <button
                  onClick={() => setActiveProduct("questly")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    activeProduct === "questly"
                      ? "bg-white dark:bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  Questly
                </button>
                <button
                  onClick={() => setActiveProduct("nexora")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    activeProduct === "nexora"
                      ? "bg-white dark:bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  Nexora
                </button>
              </div>

              {/* CTA Button */}
              <button className="rounded-full px-5 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm">
                Book a demo
              </button>

              {/* Hamburger for Nexora Mobile */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Nexora Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute left-4 right-4 top-full rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-white/5 px-5 py-3 animate-fade-up z-50 shadow-xl">
              <nav className="flex flex-col text-sm font-medium">
                {["Home", "Pricing", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="py-2.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-b border-slate-100 dark:border-white/5 last:border-b-0"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-2">
                  <button className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                    Book a demo
                  </button>
                </div>
              </nav>
            </div>
          )}
        </header>
      )}
    </>
  );
}
