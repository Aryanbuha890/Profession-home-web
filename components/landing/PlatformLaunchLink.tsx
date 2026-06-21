'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getPlatformLaunchHref } from "@/lib/auth/platform-entry";

type PlatformLaunchLinkProps = {
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
  shimmer?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export function PlatformLaunchLink({
  className = "",
  children,
  showArrow = true,
  shimmer = false,
  style,
  onClick,
}: PlatformLaunchLinkProps) {
  const [href, setHref] = useState("/login?next=/app/student");

  useEffect(() => {
    setHref(getPlatformLaunchHref());
  }, []);

  return (
    <Link href={href} onClick={onClick} className={className} style={style}>
      {showArrow || shimmer ? (
        <>
          <span className="relative z-10">{children}</span>
          {showArrow && (
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          )}
          {shimmer && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}
        </>
      ) : (
        children
      )}
    </Link>
  );
}
