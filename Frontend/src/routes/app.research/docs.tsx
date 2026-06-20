import { createFileRoute } from "@tanstack/react-router";
import { ResearchDocsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/docs")({
  head: () => ({ meta: [{ title: "Document Intelligence — Professional Home" }] }),
  component: ResearchDocsPage,
});
