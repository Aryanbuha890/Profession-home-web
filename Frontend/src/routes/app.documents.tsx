import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";
import { FileText, Upload } from "lucide-react";

export const Route = createFileRoute("/app/documents")({
  head: () => ({ meta: [{ title: "Document Intelligence — Professional Home" }] }),
  component: Documents,
});

function Documents() {
  const docs = [
    { n: "Grant Proposal v4.pdf", t: "PDF · 18 pages", s: "Summarized" },
    { n: "Pitch Deck Q3.pptx", t: "PPTX · 22 slides", s: "Annotated" },
    { n: "Methods draft.docx", t: "DOCX · 9 pages", s: "AI search" },
    { n: "Patent draft.pdf", t: "PDF · 31 pages", s: "Knowledge extracted" },
  ];
  return (
    <Page
      title="Document Intelligence"
      subtitle="Upload, summarize, annotate, and search across your knowledge"
      actions={
        <button
          className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-background"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((d) => (
          <Card key={d.n}>
            <div className="flex items-start gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                <FileText className="h-5 w-5 text-background" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{d.n}</div>
                <div className="text-xs text-muted-foreground">{d.t}</div>
              </div>
            </div>
            <div className="mt-3">
              <Pill tone="success">{d.s}</Pill>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <button className="flex-1 rounded-full glass px-3 py-1.5">Open</button>
              <button className="rounded-full glass px-3 py-1.5">Summary</button>
              <button className="rounded-full glass px-3 py-1.5">Search</button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
