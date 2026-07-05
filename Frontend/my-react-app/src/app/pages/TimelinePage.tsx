import { useMemo, useState } from "react";
import { StatusBadge } from "../components/shared/StatusBadge";
import { PROJECTS } from "../data/projects";
import { STATUS_BAR } from "../lib/constants";
import { GANTT_MONTHS, monthLeft, pct } from "../lib/gantt";
import { fmtDate } from "../lib/format";
import type { Project, ProjectType } from "../types/project";

export function TimelinePage() {
  const [typeF, setTypeF]   = useState<ProjectType | "">("");
  const [ownerF, setOwnerF] = useState("");
  const [hovered, setHovered] = useState<Project | null>(null);

  const owners = useMemo(() => [...new Set(PROJECTS.map(p => p.owner))].sort(), []);
  const rows = useMemo(() =>
    PROJECTS.filter(p => (!typeF || p.type === typeF) && (!ownerF || p.owner === ownerF))
      .sort((a,b) => new Date(a.pilotDate).getTime() - new Date(b.pilotDate).getTime()),
    [typeF, ownerF]
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Filter bar */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2.5 shrink-0">
        {[
          { val: typeF,  set: setTypeF  as (v: string) => void, opts: ["PIE","IMO","Standard","Lifecycle","Sunset"], label: "Type" },
          { val: ownerF, set: setOwnerF, opts: owners, label: "Owner" },
        ].map(f => (
          <select key={f.label} value={f.val} onChange={e => f.set(e.target.value)}
            className="text-[12px] border border-border rounded px-2 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="">All {f.label}s</option>
            {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 bg-blue-400 rounded-full" /> Pilot → GA
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 bg-foreground/50" /> Pilot date
          </div>
        </div>
      </div>

      {/* Gantt */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[900px]">
          {/* Month headers */}
          <div className="flex border-b border-border sticky top-0 bg-muted/90 backdrop-blur-sm z-10">
            <div className="w-[220px] shrink-0 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Project</div>
            <div className="flex-1 relative h-8">
              {GANTT_MONTHS.map((m, i) => (
                <span key={m}
                  className="absolute top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium"
                  style={{ left: `${monthLeft(i)}%` }}>
                  {m}
                </span>
              ))}
            </div>
            <div className="w-[100px] shrink-0 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</div>
          </div>

          {/* Rows */}
          {rows.map((p, i) => {
            const pilotX = pct(p.pilotDate);
            const gaX    = pct(p.gaDate);
            const barW   = Math.max(0.5, gaX - pilotX);
            return (
              <div key={p.id}
                className={`flex items-center border-b border-border/40 h-9 hover:bg-muted/20 transition-colors group ${i % 2 === 0 ? "" : "bg-muted/5"}`}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}>
                <div className="w-[220px] shrink-0 px-3 text-[12px] text-foreground truncate" title={p.name}>
                  {p.name}
                </div>
                <div className="flex-1 relative h-full">
                  {/* Month dividers */}
                  {GANTT_MONTHS.map((m, mi) => (
                    <div key={m} className="absolute top-0 bottom-0 w-px bg-border/60" style={{ left: `${monthLeft(mi)}%` }} />
                  ))}
                  {/* Bar */}
                  <div
                    className="absolute top-2 bottom-2 rounded-sm opacity-75 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${pilotX}%`, width: `${barW}%`, backgroundColor: STATUS_BAR[p.status] }}
                  />
                  {/* Pilot marker */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-foreground/50 opacity-70"
                    style={{ left: `${pilotX}%` }} />
                </div>
                <div className="w-[100px] shrink-0 px-3">
                  <StatusBadge status={p.status} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip */}
        {hovered && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[11px] rounded px-3 py-2 shadow-lg z-50 pointer-events-none">
            <div className="font-semibold">{hovered.name}</div>
            <div className="text-background/70">{hovered.owner} · {hovered.bu}</div>
            <div>Pilot: {fmtDate(hovered.pilotDate)} · GA: {fmtDate(hovered.gaDate)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
