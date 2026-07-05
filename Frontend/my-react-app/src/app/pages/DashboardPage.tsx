import { useMemo } from "react";
import { AlertTriangle, CheckCircle, Clock, Layers } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KPICard } from "../components/shared/KPICard";
import { StatusBadge } from "../components/shared/StatusBadge";
import { PROJECTS } from "../data/projects";
import { ALL_STATUSES, PIE_COLORS, STATUS_BAR } from "../lib/constants";
import { daysUntil, fmtDate } from "../lib/format";
import type { Status } from "../types/project";

export function DashboardPage() {
  const upcomingPilots = useMemo(() =>
    [...PROJECTS].filter(p => p.status !== "Completed")
      .sort((a, b) => new Date(a.pilotDate).getTime() - new Date(b.pilotDate).getTime())
      .slice(0, 6), []);

  const pieData = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach(p => { m[p.type] = (m[p.type] ?? 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, []);

  const barData = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach(p => { m[p.status] = (m[p.status] ?? 0) + 1; });
    return (ALL_STATUSES).map(s => ({ name: s, value: m[s] ?? 0 }));
  }, []);

  const recentChanges = [
    { time: "10:03 AM", project: "Core Banking Integration", change: "Status Updated", user: "System" },
    { time: "9:47 AM",  project: "Mobile Wallet v2",         change: "Pilot Date Changed", user: "J. Park" },
    { time: "9:12 AM",  project: "Fraud Detection Upgrade",  change: "Status → Delayed", user: "System" },
    { time: "8:55 AM",  project: "Payments Hub v3",          change: "Marked Complete", user: "J. Park" },
    { time: "8:30 AM",  project: "Identity Verification v2", change: "Owner Changed", user: "Admin" },
  ];

  return (
    <div className="p-6 space-y-5 overflow-auto h-full">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Total Projects" value={20} delta={2}  deltaLabel="since last import" color="text-blue-500"   Icon={Layers} />
        <KPICard label="Pending Projects" value={6}  delta={1}  deltaLabel="since last import" color="text-amber-500"  Icon={Clock} />
        <KPICard label="Assigned Projects" value={9} delta={-1} deltaLabel="since last import" color="text-blue-600"   Icon={CheckCircle} />
        <KPICard label="Delayed Projects" value={2}  delta={0}  deltaLabel="since last import" color="text-red-500"    Icon={AlertTriangle} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded p-4">
          <h3 className="text-[12px] font-semibold text-foreground mb-3 uppercase tracking-wider">Project Distribution</h3>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="40%" cy="50%" outerRadius={72}
                label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`}
                labelLine={{ stroke: "#ccc" }}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded p-4">
          <h3 className="text-[12px] font-semibold text-foreground mb-3 uppercase tracking-wider">Status Overview</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={barData} margin={{ left: -24, right: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="value" radius={[2,2,0,0]}>
                {barData.map((e, i) => <Cell key={i} fill={STATUS_BAR[e.name as Status] ?? "#999"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card border border-border rounded overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider">Upcoming Pilot Dates</h3>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                {["Project","Owner","Pilot Date","Days","Status"].map(h => (
                  <th key={h} className="text-left px-4 py-2 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upcomingPilots.map(p => {
                const days = daysUntil(p.pilotDate);
                const late = days < 0;
                return (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-medium text-foreground">{p.name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{p.owner}</td>
                    <td className="px-4 py-2 font-mono text-[11px]">{fmtDate(p.pilotDate)}</td>
                    <td className={`px-4 py-2 font-medium font-mono text-[11px] ${late ? "text-red-600" : days <= 30 ? "text-amber-600" : "text-foreground"}`}>
                      {late ? `${Math.abs(days)}d overdue` : `${days}d`}
                    </td>
                    <td className="px-4 py-2"><StatusBadge status={p.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          {/* Recent Changes */}
          <div className="bg-card border border-border rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider">Recent Changes</h3>
            </div>
            <div className="p-4 space-y-2.5">
              {recentChanges.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[11px]">
                  <span className="text-muted-foreground w-14 shrink-0 tabular-nums">{c.time}</span>
                  <div>
                    <div className="font-medium text-foreground leading-tight">{c.project}</div>
                    <div className="text-muted-foreground">{c.change} · {c.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduler */}
          <div className="bg-card border border-border rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider">Scheduler Status</h3>
            </div>
            <div className="p-4 space-y-2 text-[12px]">
              {[
                { label: "Last Refresh", value: "2:03 AM today" },
                { label: "Next Refresh", value: "Tomorrow 2:00 AM" },
                { label: "Source File", value: "projects_v47.xlsx" },
              ].map(row => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="flex items-center gap-1 text-green-600 font-medium text-[11px]">
                  <CheckCircle size={11} /> Healthy
                </span>
              </div>
            </div>
          </div>

          {/* Data Quality */}
          <div className="bg-card border border-border rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider">Data Quality</h3>
            </div>
            <div className="p-4">
              <div className="text-[22px] font-bold text-green-600 mb-2">98.7% Complete</div>
              <div className="space-y-1 text-[11px]">
                {[
                  { label: "Missing Pilot Dates", val: "6", cls: "text-amber-600" },
                  { label: "Missing GA Dates",    val: "2", cls: "text-amber-600" },
                  { label: "Duplicate IDs",       val: "0", cls: "text-green-600" },
                  { label: "Import Errors",       val: "1", cls: "text-red-600"   },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className={`font-semibold tabular-nums ${r.cls}`}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
