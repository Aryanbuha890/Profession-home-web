import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/app/experts")({
  component: () => <Outlet />,
});
