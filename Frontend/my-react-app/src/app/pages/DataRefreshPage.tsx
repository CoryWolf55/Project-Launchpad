import { useEffect, useState } from "react";
import { CheckCircle, FileSpreadsheet, Play } from "lucide-react";

export function DataRefreshPage() {
  const [url, setUrl] = useState("https://sharepoint.velera.com/sites/CRM/Shared%20Documents/projects_master.xlsx");
  const [state, setState] = useState<"idle"|"running"|"done">("idle");
  const [progress, setProgress] = useState([0,0,0,0,0]);

  const steps = ["Downloading","Parsing","Validating","Saving","Completed"];

  useEffect(() => {
    if (state !== "running") return;
    const id = setInterval(() => {
      setProgress(prev => {
        const next = [...prev];
        for (let i = 0; i < steps.length; i++) {
          if (i > 0 && next[i-1] < 100) break;
          if (next[i] < 100) {
            next[i] = Math.min(100, next[i] + Math.random() * 14 + 4);
            break;
          }
        }
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === "running" && progress[4] >= 100) setState("done");
  }, [progress, state]);

  function startImport() {
    setProgress([0,0,0,0,0]);
    setState("running");
  }

  const logLines = steps.map((s, i) => ({
    step: s,
    time: `10:0${i+2}`,
    active: progress[i] > 0,
    done: progress[i] >= 100,
  })).filter(l => l.active);

  return (
    <div className="p-6 overflow-auto h-full space-y-5">
      {/* URL */}
      <div className="bg-card border border-border rounded p-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-3">Excel Data Source</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FileSpreadsheet size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={url} onChange={e => setUrl(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-[12px] border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://sharepoint.velera.com/..." />
          </div>
          <button className="px-3 py-2 text-[12px] border border-border rounded hover:bg-muted transition-colors whitespace-nowrap">
            Validate
          </button>
          <button onClick={startImport} disabled={state === "running"}
            className="px-3 py-2 text-[12px] bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap">
            <Play size={12} /> Start Import
          </button>
        </div>
      </div>

      {/* Dataset info */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Current Dataset", version: "v47", time: "Jan 15, 2025 · 2:03 AM", file: "projects_master_v47.xlsx", count: 20 },
          { label: "Previous Dataset", version: "v46", time: "Jan 14, 2025 · 2:01 AM", file: "projects_master_v46.xlsx", count: 18 },
        ].map(d => (
          <div key={d.version} className="bg-card border border-border rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{d.label}</h3>
              <span className="text-[11px] font-mono font-semibold text-blue-600">{d.version}</span>
            </div>
            <div className="space-y-1.5 text-[12px]">
              {[
                { l: "Upload Time", v: d.time },
                { l: "Projects", v: String(d.count) },
                { l: "Source File", v: d.file },
              ].map(r => (
                <div key={r.l} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-medium text-right truncate">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress + Log */}
      {state !== "idle" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded p-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-4">Pipeline Progress</h3>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={s}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className={`font-medium ${progress[i] >= 100 ? "text-green-600" : progress[i] > 0 ? "text-blue-600" : "text-muted-foreground"}`}>
                      {s}
                    </span>
                    {progress[i] >= 100 ? (
                      <CheckCircle size={13} className="text-green-600" />
                    ) : (
                      <span className="text-muted-foreground tabular-nums">{Math.round(progress[i])}%</span>
                    )}
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${progress[i] >= 100 ? "bg-green-500" : "bg-primary"}`}
                      style={{ width: `${progress[i]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded p-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-4">Import Log</h3>
            <div className="font-mono text-[11px] space-y-2">
              {logLines.map((l, i) => (
                <div key={i} className={`flex items-center gap-3 ${l.done ? "text-green-600" : "text-blue-600"}`}>
                  <span className="text-muted-foreground w-10 tabular-nums">{l.time}</span>
                  <span>{l.done ? "✓" : "⟳"}</span>
                  <span>{l.step}{!l.done ? "…" : ""}</span>
                </div>
              ))}
              {state === "done" && (
                <div className="mt-3 pt-3 border-t border-border text-green-600 font-medium flex items-center gap-2">
                  <CheckCircle size={12} /> Import completed — 20 projects loaded
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
