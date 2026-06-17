import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar, SidebarProvider } from "@/components/app/Sidebar";
import { CopilotFab } from "@/components/app/Copilot";
import { RoleProvider } from "@/hooks/useRole";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <RoleProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
          <AppSidebar />
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            <Outlet />
          </main>
          <CopilotFab />
        </div>
      </SidebarProvider>
    </RoleProvider>
  );
}

