'use client';

import { ReactNode, Suspense } from "react";
import { AppSidebar, SidebarProvider } from "@/components/app/Sidebar";
import { CopilotFab } from "@/components/app/Copilot";
import { RoleProvider } from "@/hooks/useRole";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-[#05060F] text-foreground">
          <Suspense fallback={<div className="w-66 bg-[#090b16] shrink-0 border-r border-white/5" />}>
            <AppSidebar />
          </Suspense>
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            {children}
          </main>
          <CopilotFab />
        </div>
      </SidebarProvider>
    </RoleProvider>
  );
}
