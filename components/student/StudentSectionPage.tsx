'use client';

import { StudentOSPage, StudentTab } from "@/components/student/StudentOSPage";

export default function StudentSectionPage({ tab }: { tab: StudentTab }) {
  return <StudentOSPage tab={tab} />;
}
