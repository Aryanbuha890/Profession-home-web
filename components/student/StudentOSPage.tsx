'use client';

import { useEffect } from "react";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { useRole } from "@/hooks/useRole";

export type StudentTab =
  | "home"
  | "arena"
  | "challenges"
  | "assessment"
  | "roadmap"
  | "skills"
  | "projects"
  | "internships"
  | "jobs"
  | "mentors"
  | "copilot"
  | "rewards"
  | "achievements"
  | "community"
  | "profile";

export function StudentOSPage({ tab }: { tab: StudentTab }) {
  const { role, setRole } = useRole();

  useEffect(() => {
    if (role !== "student") {
      setRole("student");
    }
  }, [role, setRole]);

  return <StudentDashboard currentTab={tab} />;
}
