import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/app/Page";
import { CopilotChat } from "@/components/app/CopilotChat";

export const Route = createFileRoute("/app/copilot")({
  head: () => ({ meta: [{ title: "AI Copilot — Professional Home" }] }),
  component: Copilot,
});

function Copilot() {
  return (
    <Page title="AI Copilot" subtitle="Interactive Copilot assistant">
      <div className="max-w-6xl mx-auto mt-2">
        <CopilotChat />
      </div>
    </Page>
  );
}


