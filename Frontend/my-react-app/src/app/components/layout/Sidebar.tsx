import { ChevronLeft, ChevronRight, Database } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../config/navigation";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div
      className={`flex flex-col bg-card border-r border-border h-full shrink-0 transition-all duration-200 ${collapsed ? "w-12" : "w-52"}`}
    >
      <div className="flex items-center h-12 border-b border-border px-3 gap-2.5 shrink-0">
        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center shrink-0">
          <Database size={13} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-[13px] font-semibold text-foreground truncate">
            Velera CRM
          </span>
        )}
      </div>

      <nav className="flex-1 py-2 space-y-0.5 px-1.5 overflow-y-auto">
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 px-2 py-2 rounded text-[12px] transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Icon size={15} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-2 py-1.5 rounded text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <>
              <ChevronLeft size={14} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
