import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";
import { Award, BookOpen, FileText, Medal, Star } from "lucide-react";

export const Route = createFileRoute("/app/achievements")({
  head: () => ({ meta: [{ title: "Achievement Vault — Professional Home" }] }),
  component: Achievements,
});

function Achievements() {
  const items = [
    { i: Medal, t: "Marie Curie Fellowship", d: "2026" },
    { i: BookOpen, t: "Nature Methods Paper", d: "2025" },
    { i: Award, t: "Best Poster · NeurIPS Workshop", d: "2024" },
    { i: FileText, t: "Patent — US 11/482,221", d: "2024" },
    { i: Star, t: "Forbes 30 Under 30 (Science)", d: "2025" },
  ];
  return (
    <Page
      title="Achievement Vault"
      subtitle="Certificates, papers, patents, awards, and your professional profile"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ i: Icon, t, d }) => (
          <Card key={t}>
            <div className="flex items-start gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Icon className="h-5 w-5 text-background" />
              </div>
              <div>
                <div className="font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Pill tone="success">verified</Pill>
              <Pill>portfolio</Pill>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
