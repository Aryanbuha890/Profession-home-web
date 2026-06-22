import type { Role } from "@/hooks/useRole";
import type { AuthUser } from "@/lib/auth/test-credentials";
import { getDashboardRouteForRole } from "@/lib/auth/dashboard-routes";

const SESSION_KEY = "ph_auth_user";

export function persistAuthSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem("ph_dashboard_role", user.role);
  localStorage.setItem("ph_onboarding_completed", "true");
  document.cookie = `ph_role=${user.role}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function getAuthSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  document.cookie = "ph_role=; path=/; max-age=0; SameSite=Lax";
}

export function redirectPathForRole(role: Role | string): string {
  return getDashboardRouteForRole(role as Role);
}
