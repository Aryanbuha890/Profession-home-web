'use client';

import { DashboardTabRedirect } from "@/components/app/DashboardTabRedirect";
import { getFounderTabForPath } from "@/lib/auth/founder-tab-routes";

export default function FounderTabRedirectPage({ segment }: { segment: string }) {
  return (
    <DashboardTabRedirect role="founder" tab={getFounderTabForPath(segment)} />
  );
}
