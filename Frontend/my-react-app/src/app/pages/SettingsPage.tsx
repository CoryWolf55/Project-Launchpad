import { useState } from "react";

export function SettingsPage() {
  const [interval, setInterval2] = useState("24");
  const [notifs, setNotifs] = useState(true);
  const [tz, setTz] = useState("America/New_York");

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-2xl space-y-5">
        {[
          {
            title: "Scheduler Configuration",
            fields: (
              <div className="space-y-4 text-[13px]">
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Refresh Interval (hours)</label>
                  <input value={interval} onChange={e => setInterval2(e.target.value)}
                    className="w-[120px] px-3 py-2 border border-border rounded bg-background text-[12px] focus:outline-none focus:ring-1 focus:ring-primary" />
                  <p className="text-[11px] text-muted-foreground mt-1">Next refresh: Tomorrow 2:00 AM</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-medium">Email notifications</div>
                    <div className="text-[11px] text-muted-foreground">Alert on import failure or data quality issues</div>
                  </div>
                  <button onClick={() => setNotifs(n => !n)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${notifs ? "bg-primary" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              </div>
            ),
          },
          {
            title: "User Preferences",
            fields: (
              <div className="space-y-4 text-[13px]">
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Timezone</label>
                  <select value={tz} onChange={e => setTz(e.target.value)}
                    className="w-[240px] px-3 py-2 border border-border rounded bg-background text-[12px] focus:outline-none focus:ring-1 focus:ring-primary">
                    {["America/New_York","America/Chicago","America/Denver","America/Los_Angeles"].map(t => (
                      <option key={t} value={t}>{t.replace("America/","").replace("_"," ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Default Landing Page</label>
                  <select className="w-[180px] px-3 py-2 border border-border rounded bg-background text-[12px] focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Dashboard</option>
                    <option>Projects</option>
                    <option>Timeline</option>
                  </select>
                </div>
              </div>
            ),
          },
          {
            title: "System Information",
            fields: (
              <div className="space-y-2 text-[12px]">
                {[
                  { l: "Application Version", v: "2.4.1" },
                  { l: "API Version", v: "v3" },
                  { l: "Last Full Sync", v: "Jan 15, 2025 · 2:03 AM" },
                  { l: "Database", v: "PostgreSQL 15.2" },
                  { l: "Total Datasets Stored", v: "47 versions" },
                ].map(r => (
                  <div key={r.l} className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="font-medium font-mono text-[11px]">{r.v}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ].map(s => (
          <div key={s.title} className="bg-card border border-border rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider">{s.title}</h3>
            </div>
            <div className="p-4">{s.fields}</div>
          </div>
        ))}

        <div className="flex gap-2">
          <button className="px-4 py-2 text-[12px] bg-primary text-primary-foreground rounded hover:opacity-90">Save Changes</button>
          <button className="px-4 py-2 text-[12px] border border-border rounded hover:bg-muted">Reset to Defaults</button>
        </div>
      </div>
    </div>
  );
}
