import { createFileRoute } from "@tanstack/react-router";
import { ResearchHomePage } from "@/components/research";

export const Route = createFileRoute("/app/research/")({
  head: () => ({ meta: [{ title: "Research Command Center — Professional Home" }] }),
  component: ResearchHomePage,
});
