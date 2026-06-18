import { createFileRoute } from "@tanstack/react-router";
import { ResearchGrantsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/grants")({
  head: () => ({ meta: [{ title: "Grants — Professional Home" }] }),
  component: ResearchGrantsPage,
});
