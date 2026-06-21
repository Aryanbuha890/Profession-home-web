'use client';

import { DashboardTabRedirect } from "@/components/app/DashboardTabRedirect";
import { getResearchTabForPath } from "@/lib/auth/research-tab-routes";

export default function ResearchSectionPage({ segment }: { segment: string }) {
  return (
    <DashboardTabRedirect role="researcher" tab={getResearchTabForPath(segment)} />
  );
}
