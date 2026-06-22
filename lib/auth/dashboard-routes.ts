import type { Role } from "@/hooks/useRole";

export const DASHBOARD_OPTIONS: Array<{
  value: Role;
  label: string;
  description: string;
}> = [
  {
    value: "student",
    label: "Student OS",
    description: "Career growth, skills, internships & placements",
  },
  {
    value: "researcher",
    label: "Researcher OS",
    description: "Research projects, publications & collaborations",
  },
  {
    value: "founder",
    label: "Founder OS",
    description: "Startup roadmap, funding & execution",
  },
  {
    value: "admin",
    label: "Admin Control Tower",
    description: "Platform operations & user management",
  },
];

export const ROLE_HOME_ROUTES: Record<Role, string> = {
  student: "/app/student",
  researcher: "/app/research",
  founder: "/app/startup",
  admin: "/app/admin",
};

export function getDashboardRouteForRole(role: Role): string {
  return ROLE_HOME_ROUTES[role] ?? ROLE_HOME_ROUTES.student;
}
