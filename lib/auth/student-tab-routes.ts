import type { StudentTab } from "@/components/student/StudentOSPage";

export const STUDENT_TAB_ROUTES: Record<StudentTab, string> = {
  home: "/app/student",
  arena: "/app/student/arena",
  challenges: "/app/student/challenges",
  assessment: "/app/student/assessment",
  roadmap: "/app/student/roadmap",
  skills: "/app/student/skills",
  projects: "/app/student/projects",
  internships: "/app/student/internships",
  jobs: "/app/student/jobs",
  mentors: "/app/student/mentors",
  copilot: "/app/student/copilot",
  rewards: "/app/student/rewards",
  achievements: "/app/student/achievements",
  community: "/app/student/community",
  profile: "/profile",
};

export function getStudentRouteForTab(tab: string): string {
  return STUDENT_TAB_ROUTES[tab as StudentTab] ?? STUDENT_TAB_ROUTES.home;
}
