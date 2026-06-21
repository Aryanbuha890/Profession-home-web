import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDENT_TAB_ROUTES: Record<string, string> = {
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

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/dashboard") {
    const role = request.cookies.get("ph_role")?.value;

    // Only redirect when role cookie is explicitly student
    if (role === "student") {
      const tab = searchParams.get("tab") || "home";
      const target = STUDENT_TAB_ROUTES[tab] ?? "/app/student";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
