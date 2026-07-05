import { useState } from "react";
import { Eye, GitCompare } from "lucide-react";
import { DIFF_ROWS, VERSIONS } from "../data/dataset-versions";

export function DatasetHistoryPage() {
  const [comparing, setComparing] = useState(false);

  return (
    <div className="p-6 overflow-auto h-full space-y-5">
      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="text-[12px] font-semibold uppercase tracking-wider">Dataset Versions</h3>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {["Version","Upload Date","Projects","Changes","Source File","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-2 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VERSIONS.map((v, i) => (
              <tr key={v.v} className={`border-b border-border/40 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/5"}`}>
                <td className="px-4 py-2.5 font-mono font-semibold text-blue-600">{v.v}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{v.date}</td>
                <td className="px-4 py-2.5 font-medium tabular-nums">{v.projects}</td>
                <td className="px-4 py-2.5">
                  <span className={`font-medium tabular-nums ${v.changes > 5 ? "text-amber-600" : "text-foreground"}`}>{v.changes}</span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground font-mono text-[11px]">{v.file}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <button className="text-[11px] flex items-center gap-1 text-blue-600 hover:underline">
                      <Eye size={11} /> View
                    </button>
                    {i < VERSIONS.length - 1 && (
                      <button onClick={() => setComparing(c => !c)}
                        className="text-[11px] flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <GitCompare size={11} /> Compare
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {comparing && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Added Projects",    value: "+2",  color: "text-green-600" },
              { label: "Removed Projects",  value: "−0",  color: "text-muted-foreground" },
              { label: "Modified Projects", value: "7",   color: "text-blue-600" },
            ].map(c => (
              <div key={c.label} className="bg-card border border-border rounded p-4 text-center">
                <div className={`text-[28px] font-bold ${c.color}`}>{c.value}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider">Change Details · v46 → v47</h3>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  {["Project","Field Changed","Previous Value","New Value"].map(h => (
                    <th key={h} className="text-left px-4 py-2 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DIFF_ROWS.map((r, i) => (
                  <tr key={i} className={`border-b border-border/40 hover:bg-muted/20 ${i%2===0?"":"bg-muted/5"}`}>
                    <td className="px-4 py-2 font-medium">{r.project}</td>
                    <td className="px-4 py-2 text-muted-foreground">{r.field}</td>
                    <td className="px-4 py-2 text-red-600 line-through decoration-red-300">{r.prev || <span className="text-muted-foreground no-underline italic">empty</span>}</td>
                    <td className="px-4 py-2 text-green-700 font-medium">{r.curr || <span className="text-muted-foreground font-normal italic">empty</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
