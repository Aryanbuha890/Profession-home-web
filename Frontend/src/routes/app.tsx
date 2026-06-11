import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar, SidebarProvider } from "@/components/app/Sidebar";
import { CopilotFab } from "@/components/app/Copilot";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <main className="flex min-w-0 flex-1 flex-col">
          <Outlet />
        </main>
        <CopilotFab />
      </div>
    </SidebarProvider>
  );
}
