'use client';

import { Page } from "@/components/app/Page";

export default function SettingsPage() {
  return (
    <Page title="Settings" subtitle="Configure your professional workspace settings">
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 min-h-[400px] text-white">
        <h2 className="text-xl font-bold mb-4">Workspace Preferences</h2>
        <p className="text-slate-400 text-sm">Theme: Midnight & Neon (System Default)</p>
      </div>
    </Page>
  );
}
