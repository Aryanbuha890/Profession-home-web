import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Ecosystem, Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem — Professional Home" },
      {
        name: "description",
        content:
          "One network connecting students, universities, researchers, startups, experts, and investors.",
      },
      { property: "og:title", content: "Professional Home Ecosystem" },
      {
        property: "og:description",
        content: "Talent graph, verified outcomes, AI-driven introductions across institutions.",
      },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-28" />
      <Ecosystem />
      <Footer />
    </div>
  ),
});
