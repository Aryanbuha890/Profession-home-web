import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/app/investor")({
  component: () => <Outlet />,
});
