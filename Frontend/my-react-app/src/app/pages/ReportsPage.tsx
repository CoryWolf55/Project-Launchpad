import { useMemo } from "react";
import { CheckCircle, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PROJECTS } from "../data/projects";
import { PIE_COLORS } from "../lib/constants";
import { daysUntil, fmtDate } from "../lib/format";

export function ReportsPage() {
  const pieData = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach(p => { m[p.type] = (m[p.type] ?? 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, []);

  const ownerData = useMemo(() => {
    const m: Record<string, number> = {};
    PROJECTS.forEach(p => { m[p.owner] = (m[p.owner] ?? 0) + 1; });
    return Object.entries(m).sort((a,b) => b[1]-a[1]).map(([name, value]) => ({ name: name.split(" ")[1] ?? name, value }));
  }, []);

  const upcoming = useMemo(() =>
    [...PROJECTS].filter(p => p.status !== "Completed")
      .sort((a,b) => new Date(a.pilotDate).getTime() - new Date(b.pilotDate).getTime())
      .slice(0, 5), []);

  const missing = PROJECTS.filter(p => !p.pilotDate || !p.gaDate);

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Project Health", value: "87%", color: "text-green-600", sub: "13 of 20 on track" },
          { label: "Avg Days to Pilot", value: "48", color: "text-blue-600", sub: "across active projects" },
          { label: "Completion Rate", value: "5%", color: "text-purple-600", sub: "1 of 20 completed" },
        ].map(c => (
          <div key={c.label} className="bg-card border border-border rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{c.label}</div>
            <div className={`text-[28px] font-bold ${c.color}`}>{c.value}</div>
            <div className="text-[11px] text-muted-foreground">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-card border border-border rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider">Lifecycle Distribution</h3>
            <button className="text-[11px] border border-border rounded px-2 py-1 hover:bg-muted flex items-center gap-1"><Download size={11} /> Export</button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="45%" cy="50%" outerRadius={68}
                label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`} labelLine={false}>
                {pieData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider">Resource Allocation</h3>
            <button className="text-[11px] border border-border rounded px-2 py-1 hover:bg-muted flex items-center gap-1"><Download size={11} /> Export</button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ownerData} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={48} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="value" fill="#0078D4" radius={[0,2,2,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider">Upcoming Pilot Dates</h3>
            <button className="text-[11px] border border-border rounded px-2 py-1 hover:bg-muted flex items-center gap-1"><Download size={11} /> Export</button>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                {["Project","Owner","Pilot Date","Days"].map(h => (
                  <th key={h} className="text-left px-4 py-2 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upcoming.map(p => {
                const days = daysUntil(p.pilotDate);
                return (
                  <tr key={p.id} className="border-b border-border/40 hover:bg-muted/20">
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{p.owner}</td>
                    <td className="px-4 py-2 font-mono text-[11px]">{fmtDate(p.pilotDate)}</td>
                    <td className={`px-4 py-2 font-mono text-[11px] font-medium ${days < 0 ? "text-red-600" : days <= 30 ? "text-amber-600" : "text-foreground"}`}>
                      {days < 0 ? `${Math.abs(days)}d late` : `${days}d`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider">Missing Dates</h3>
            <span className="text-[11px] text-amber-600 font-medium">{missing.length} flagged</span>
          </div>
          {missing.length > 0 ? (
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  {["Project","ID","Missing Field"].map(h => (
                    <th key={h} className="text-left px-4 py-2 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {missing.map(p => (
                  <tr key={p.id} className="border-b border-border/40 hover:bg-muted/20">
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2 font-mono text-[11px] text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-2 text-amber-600 font-medium">{!p.pilotDate ? "Pilot Date" : "GA Date"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-muted-foreground text-[12px]">
              <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
              All projects have complete date records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
