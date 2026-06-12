import { Link } from "@tanstack/react-router";

export function Logo({ className = "", to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/Logo.png"
        alt="Professional Home Logo"
        className="h-8 w-8 object-contain rounded-lg shadow-sm"
      />
      <span className="font-sans text-[17px] font-semibold tracking-tight text-white">
        Professional{" "}
        <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
          Home
        </span>
      </span>
    </Link>
  );
}
