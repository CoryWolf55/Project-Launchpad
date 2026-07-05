import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Download, Search, X } from "lucide-react";
import { StatusBadge } from "../components/shared/StatusBadge";
import { TypeBadge } from "../components/shared/TypeBadge";
import { PROJECTS } from "../data/projects";
import { daysUntil, fmtDate } from "../lib/format";
import type { Project, ProjectType, Status } from "../types/project";

export function ProjectsPage() {
  const [search, setSearch]     = useState("");
  const [statusF, setStatusF]   = useState<Status | "">("");
  const [typeF, setTypeF]       = useState<ProjectType | "">("");
  const [ownerF, setOwnerF]     = useState("");
  const [sortCol, setSortCol]   = useState<keyof Project>("name");
  const [sortDir, setSortDir]   = useState<"asc"|"desc">("asc");
  const [selected, setSelected] = useState<Project | null>(null);

  const owners = useMemo(() => [...new Set(PROJECTS.map(p => p.owner))].sort(), []);

  const rows = useMemo(() => {
    return PROJECTS.filter(p => {
      if (statusF && p.status !== statusF) return false;
      if (typeF   && p.type   !== typeF)   return false;
      if (ownerF  && p.owner  !== ownerF)  return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) &&
            !p.id.toLowerCase().includes(q) &&
            !p.owner.toLowerCase().includes(q) &&
            !p.bu.toLowerCase().includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      const av = String(a[sortCol]), bv = String(b[sortCol]);
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [search, statusF, typeF, ownerF, sortCol, sortDir]);

  function toggleSort(col: keyof Project) {
    if (col === sortCol) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  }

  function SortIcon({ col }: { col: keyof Project }) {
    if (col !== sortCol) return <ChevronDown size={11} className="opacity-25 ml-0.5" />;
    return sortDir === "asc"
      ? <ChevronUp size={11} className="text-primary ml-0.5" />
      : <ChevronDown size={11} className="text-primary ml-0.5" />;
  }

  const cols: { key: keyof Project; label: string; w: string }[] = [
    { key: "name",        label: "Project Name",   w: "min-w-[180px]" },
    { key: "id",          label: "ID",             w: "w-[96px]" },
    { key: "owner",       label: "Owner",          w: "w-[120px]" },
    { key: "bu",          label: "Business Unit",  w: "w-[130px]" },
    { key: "type",        label: "Type",           w: "w-[90px]" },
    { key: "lifecycle",   label: "Lifecycle",      w: "w-[90px]" },
    { key: "pilotDate",   label: "Pilot Date",     w: "w-[110px]" },
    { key: "gaDate",      label: "GA Date",        w: "w-[110px]" },
    { key: "status",      label: "Status",         w: "w-[100px]" },
    { key: "lastUpdated", label: "Last Updated",   w: "w-[110px]" },
  ];

  const hasFilter = search || statusF || typeF || ownerF;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Filter Bar */}
        <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2.5 flex-wrap shrink-0">
          <div className="relative min-w-[200px] max-w-[260px]">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search projects, IDs, owners…"
              className="w-full pl-8 pr-2.5 py-1.5 text-[12px] border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          {([
            { val: statusF, set: setStatusF as (v: string) => void, opts: ["Assigned","Pending","Delayed","Completed","Upcoming"], label: "Status" },
            { val: typeF,   set: setTypeF   as (v: string) => void, opts: ["PIE","IMO","Standard","Lifecycle","Sunset"], label: "Type" },
            { val: ownerF,  set: setOwnerF, opts: owners, label: "Owner" },
          ] as const).map(f => (
            <select key={f.label} value={f.val} onChange={e => f.set(e.target.value)}
              className="text-[12px] border border-border rounded px-2 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">All {f.label}s</option>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}

          {hasFilter && (
            <button onClick={() => { setSearch(""); setStatusF(""); setTypeF(""); setOwnerF(""); }}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
              <X size={11} /> Clear
            </button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground tabular-nums">{rows.length} of {PROJECTS.length}</span>
            <button className="flex items-center gap-1.5 text-[12px] border border-border rounded px-2.5 py-1.5 hover:bg-muted transition-colors">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead className="sticky top-0 z-10 bg-muted/90 backdrop-blur-sm">
              <tr>
                {cols.map(c => (
                  <th key={c.key}
                    className={`text-left px-3 py-2 font-medium text-muted-foreground border-b border-border cursor-pointer select-none hover:text-foreground text-[11px] uppercase tracking-wider ${c.w}`}
                    onClick={() => toggleSort(c.key)}>
                    <div className="flex items-center">
                      {c.label}<SortIcon col={c.key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const late = p.status !== "Completed" && daysUntil(p.pilotDate) < 0;
                const active = selected?.id === p.id;
                return (
                  <tr key={p.id}
                    onClick={() => setSelected(prev => prev?.id === p.id ? null : p)}
                    className={`border-b border-border/40 cursor-pointer transition-colors
                      ${active ? "bg-blue-50" : i % 2 === 0 ? "bg-card" : "bg-muted/10"}
                      hover:bg-blue-50/60`}>
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{p.name}</td>
                    <td className="px-3 py-2 text-muted-foreground font-mono text-[11px]">{p.id}</td>
                    <td className="px-3 py-2 text-foreground">{p.owner}</td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{p.bu}</td>
                    <td className="px-3 py-2"><TypeBadge type={p.type} /></td>
                    <td className="px-3 py-2 text-muted-foreground">{p.lifecycle}</td>
                    <td className={`px-3 py-2 font-mono text-[11px] ${late ? "text-red-600 font-medium" : ""}`}>{fmtDate(p.pilotDate)}</td>
                    <td className="px-3 py-2 font-mono text-[11px]">{fmtDate(p.gaDate)}</td>
                    <td className="px-3 py-2"><StatusBadge status={p.status} /></td>
                    <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{fmtDate(p.lastUpdated)}</td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground text-[13px]">
                    No projects match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {selected && (
        <div className="w-72 border-l border-border bg-card flex flex-col shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-card z-10">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Project Details</span>
            <button onClick={() => setSelected(null)} className="hover:bg-muted p-1 rounded text-muted-foreground hover:text-foreground">
              <X size={13} />
            </button>
          </div>
          <div className="p-4 space-y-5 text-[12px]">
            <div>
              <h2 className="text-[14px] font-semibold text-foreground leading-snug">{selected.name}</h2>
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{selected.id}</p>
            </div>

            {[
              { title: "General", rows: [
                { label: "Business Unit", value: selected.bu },
                { label: "Owner", value: selected.owner },
                { label: "Type", value: <TypeBadge type={selected.type} /> },
                { label: "Lifecycle", value: selected.lifecycle },
              ]},
              { title: "Commercialization", rows: [
                { label: "Pilot Date", value: fmtDate(selected.pilotDate) },
                { label: "GA Date", value: fmtDate(selected.gaDate) },
                { label: "Current Gate", value: selected.gate },
              ]},
              { title: "Status", rows: [
                { label: "Status", value: <StatusBadge status={selected.status} /> },
                { label: "Last Updated", value: fmtDate(selected.lastUpdated) },
              ]},
            ].map(s => (
              <section key={s.title}>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 pb-1 border-b border-border">
                  {s.title}
                </h4>
                <div className="space-y-1.5">
                  {s.rows.map(row => (
                    <div key={row.label} className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">{row.label}</span>
                      <span className="font-medium text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {selected.comments && (
              <section>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 pb-1 border-b border-border">Comments</h4>
                <p className="text-foreground leading-relaxed">{selected.comments}</p>
              </section>
            )}

            <section>
              <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 pb-1 border-b border-border">Change History</h4>
              <div className="space-y-1.5">
                {[
                  { date: "Jan 10", field: "Status", from: "Pending", to: selected.status },
                  { date: "Jan 5",  field: "Gate",   from: "Gate 1",  to: selected.gate },
                  { date: "Dec 18", field: "Owner",  from: "TBD",     to: selected.owner },
                ].map((h, i) => (
                  <div key={i} className="bg-muted/50 rounded p-2 text-[11px]">
                    <div className="flex justify-between text-muted-foreground mb-0.5">
                      <span>{h.date}</span><span className="font-medium">{h.field}</span>
                    </div>
                    <div className="text-foreground">{h.from} <span className="text-muted-foreground">→</span> {h.to}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
