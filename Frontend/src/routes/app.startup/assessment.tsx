import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/startup/assessment")({
  component: StartupAssessmentPage,
});

const ASSESSMENT_DATA = [
  { subject: 'Product', A: 85, fullMark: 100 }, { subject: 'Market', A: 90, fullMark: 100 },
  { subject: 'Team', A: 75, fullMark: 100 }, { subject: 'Traction', A: 60, fullMark: 100 },
  { subject: 'Financials', A: 70, fullMark: 100 }, { subject: 'Legal/IP', A: 80, fullMark: 100 },
];

function StartupAssessmentPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Startup Assessment</h1>
          <p className="text-sm text-slate-400 mt-1">AI-driven diagnostic of your business fundamentals.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-2 self-start">Health Vector</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={ASSESSMENT_DATA}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Health" dataKey="A" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <h4 className="text-emerald-400 font-semibold mb-2 flex gap-2"><CheckCircle2 className="w-5 h-5"/> Strong Signals</h4>
            <p className="text-sm text-slate-300">Your Product Architecture and Market Size score in the top 10%.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5">
            <h4 className="text-rose-400 font-semibold mb-2 flex gap-2"><ShieldAlert className="w-5 h-5"/> Vulnerabilities</h4>
            <p className="text-sm text-slate-300">Your Traction metrics are lagging behind expectations for a Seed round.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
