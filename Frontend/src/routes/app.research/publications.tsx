import { createFileRoute } from "@tanstack/react-router";
import { ResearchPublicationsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/publications")({
  head: () => ({ meta: [{ title: "Publications — Professional Home" }] }),
  component: ResearchPublicationsPage,
});
