import type { Role } from "@/hooks/useRole";
import { getDashboardRouteForRole } from "@/lib/auth/dashboard-routes";
import { getAuthSession } from "@/lib/auth/session";

export const DEFAULT_PLATFORM_ENTRY = "/login?next=/app/student";

export function getPlatformLaunchHref(): string {
  if (typeof window === "undefined") {
    return DEFAULT_PLATFORM_ENTRY;
  }

  const session = getAuthSession();
  if (session) {
    return getDashboardRouteForRole(session.role);
  }

  return DEFAULT_PLATFORM_ENTRY;
}

export function resolvePostAuthRedirect(
  nextParam: string | null,
  role: Role | string
): string {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return getDashboardRouteForRole(role as Role);
}
