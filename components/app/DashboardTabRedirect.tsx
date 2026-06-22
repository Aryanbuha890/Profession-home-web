'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole, type Role } from "@/hooks/useRole";

export function DashboardTabRedirect({
  role,
  tab,
}: {
  role: Role;
  tab: string;
}) {
  const router = useRouter();
  const { setRole } = useRole();

  useEffect(() => {
    setRole(role);
    document.cookie = `ph_role=${role}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    router.replace(`/dashboard?tab=${encodeURIComponent(tab)}`);
  }, [role, tab, router, setRole]);

  return (
    <div className="flex flex-1 items-center justify-center bg-[#05060F] text-xs font-mono text-slate-400">
      Loading dashboard…
    </div>
  );
}
