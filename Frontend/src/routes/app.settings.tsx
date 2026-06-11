import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Professional Home" }] }),
  component: Settings,
});

function Settings() {
  return (
    <Page title="Settings" subtitle="Account, notifications, and billing settings">
      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Profile">
          <Field label="Full Name" v="Aarav Sharma" />
          <Field label="Email Address" v="aarav@example.com" />
          <Field label="College / Institution" v="IIT Delhi · CSE · 2026" />
          <div className="pt-2">
            <Button size="sm" className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 transition cursor-pointer">
              Save Changes
            </Button>
          </div>
        </Section>
        
        <Section title="Notifications">
          {["Meeting reminders", "Task deadlines", "Mentor messages", "Weekly digest"].map((n) => (
            <label key={n} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2 text-sm text-white/80 transition cursor-pointer">
              <span>{n}</span>
              <input type="checkbox" defaultChecked className="accent-sky-400 h-4 w-4 rounded border-white/10" />
            </label>
          ))}
        </Section>
        
        <Section title="Billing & Subscription">
          <p className="text-sm text-white/90">Current Plan: <span className="font-semibold text-sky-400">Student Growth</span></p>
          <p className="text-xs text-muted-foreground mt-1">Next invoice: ₹1,999 on Jul 10</p>
          <div className="pt-4">
            <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white transition cursor-pointer">
              Manage Billing
            </Button>
          </div>
        </Section>
      </div>
    </Page>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-white border-b border-white/5 pb-2">{title}</p>
      <div className="space-y-3">{children}</div>
    </Card>
  );
}

function Field({ label, v }: { label: string; v: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
      <input 
        defaultValue={v} 
        className="w-full rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] focus:bg-white/[0.03] focus:border-sky-400 px-3.5 py-2 text-sm text-white outline-none transition" 
      />
    </div>
  );
}
