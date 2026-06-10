import type { ReactNode } from "react";
import { AppTopbar } from "@/components/app/Sidebar";

export function Page({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <>
      <AppTopbar title={title} subtitle={subtitle} />
      <div className="flex-1 px-6 py-6">
        {actions && <div className="mb-4 flex flex-wrap gap-2">{actions}</div>}
        {children}
      </div>
    </>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-5 ${className}`}>{children}</div>;
}

export function Stat({
  label,
  value,
  delta,
  tone = "electric",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "electric" | "violet";
}) {
  const color = tone === "electric" ? "var(--electric)" : "var(--violet)";
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-semibold" style={{ color }}>
        {value}
      </div>
      {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
    </Card>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warn";
}) {
  const map = {
    default: "bg-foreground/10 text-foreground",
    success: "bg-emerald-500/15 text-emerald-300",
    warn: "bg-amber-500/15 text-amber-300",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[11px] ${map[tone]}`}>{children}</span>;
}

export function Bar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: "var(--gradient-primary)" }}
        />
      </div>
    </div>
  );
}
