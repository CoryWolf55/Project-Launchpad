import { useState } from "react";
import { RefreshCw, Search, Upload, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getNavTitle } from "../../config/navigation";

export function TopNav() {
  const [searchVal, setSearchVal] = useState("");
  const { pathname } = useLocation();
  const title = getNavTitle(pathname);

  return (
    <div className="h-12 bg-card border-b border-border flex items-center px-4 gap-4 shrink-0">
      <h1 className="text-[14px] font-semibold text-foreground w-32 shrink-0">
        {title}
      </h1>

      <div className="relative flex-1 max-w-[320px]">
        <Search
          size={12}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search…"
          className="w-full pl-8 pr-3 py-1.5 text-[12px] border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="text-[11px] text-muted-foreground">
          <span>Last sync: </span>
          <span className="font-medium text-foreground">5 min ago</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-[12px] border border-border rounded px-2.5 py-1.5 hover:bg-muted transition-colors"
        >
          <RefreshCw size={12} /> Refresh
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 text-[12px] bg-primary text-primary-foreground rounded px-2.5 py-1.5 hover:opacity-90 transition-opacity"
        >
          <Upload size={12} /> Upload Excel URL
        </button>

        <button
          type="button"
          className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
        >
          <User size={14} />
        </button>
      </div>
    </div>
  );
}
