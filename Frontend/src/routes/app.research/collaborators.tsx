import { createFileRoute } from "@tanstack/react-router";
import { ResearchCollaboratorsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/collaborators")({
  head: () => ({ meta: [{ title: "Collaborators — Professional Home" }] }),
  component: ResearchCollaboratorsPage,
});
