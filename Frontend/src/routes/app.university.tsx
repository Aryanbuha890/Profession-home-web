import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/app/university")({
  component: () => (
    <div className="flex-1 flex flex-col min-h-screen bg-[#05060F] text-slate-100">
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 relative">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  ),
});
