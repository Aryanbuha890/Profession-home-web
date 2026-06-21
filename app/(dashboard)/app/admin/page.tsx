'use client';

import { Page, Card } from "@/components/app/Page";
import { Users, ShieldCheck, IndianRupee, BarChart3, LifeBuoy, FileWarning, TrendingUp, Trophy } from "lucide-react";



function Admin() {
  return (
    <Page title="Admin Panel" subtitle="Platform operations control center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Users} label="Total Users" v="14,238" />
        <Kpi icon={ShieldCheck} label="Verified Consultants" v="312" />
        <Kpi icon={IndianRupee} label="Platform Revenue (MTD)" v="₹38.6L" />
        <Kpi icon={Trophy} label="Outcome Achievement Rate" v="71%" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Block icon={ShieldCheck} title="Consultant Verification" body="12 mentor applications awaiting review" />
        <Block icon={IndianRupee} title="Payments Status" body="₹4.2L in pending payouts · 0 failures" />
        <Block icon={BarChart3} title="System Analytics" body="Weekly active students up 9.4%" />
        <Block icon={LifeBuoy} title="Support Tickets" body="7 open · Avg first response 32 min" />
        <Block icon={FileWarning} title="Content Moderation" body="3 reports flagged · 0 high severity" />
        <Block icon={TrendingUp} title="Growth Velocity" body="Conversions to paid +4.1% week over week" />
      </div>

      <Card className="mt-4">
        <p className="text-sm font-semibold text-white mb-4">User Management</p>
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.01]">
          <table className="w-full text-xs text-left">
            <thead className="bg-white/5 text-[10px] font-semibold font-mono uppercase tracking-wider text-muted-foreground border-b border-white/5">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {[
                ["Aarav S.", "Student", "Growth", "May 2", "Active"],
                ["Priya R.", "Consultant", "—", "Jan 18", "Verified"],
                ["Meera K.", "Student", "Free", "Jun 1", "Active"],
                ["Vikram J.", "Consultant", "—", "Mar 24", "Pending"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3 font-semibold text-white">{r[0]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                  <td className="px-4 py-3 font-mono">{r[2]}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">{r[3]}</td>
                  <td className={`px-4 py-3 text-right font-semibold font-mono ${r[4] === "Pending" ? "text-amber-400" : "text-emerald-400"}`}>{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}

function Kpi({ icon: Icon, label, v }: { icon: any; label: string; v: string }) {
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground font-mono uppercase tracking-wider">
        <span>{label}</span>
        <Icon className="h-4 w-4 text-sky-400" />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-white font-display">{v}</p>
    </Card>
  );
}

function Block({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
        <Icon className="h-4.5 w-4.5 text-sky-400" /> {title}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </Card>
  );
}

export default Admin;
