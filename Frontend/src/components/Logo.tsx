import { Link } from "@tanstack/react-router";

export function Logo({ className = "", to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] shadow-[0_6px_20px_-6px_rgba(37,99,235,0.6)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M3 17l9-12 9 12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="font-sans text-[17px] font-semibold tracking-tight text-white">
        Professional{" "}
        <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
          Home
        </span>
      </span>
    </Link>
  );
}
