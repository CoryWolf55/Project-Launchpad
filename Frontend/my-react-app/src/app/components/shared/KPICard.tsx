import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: number;
  delta?: number;
  deltaLabel?: string;
  color: string;
  Icon: LucideIcon;
}

export function KPICard({
  label,
  value,
  delta,
  deltaLabel,
  color,
  Icon,
}: KPICardProps) {
  const positive = (delta ?? 0) >= 0;

  return (
    <div className="bg-card border border-border rounded p-4 flex flex-col gap-2 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <Icon size={15} className={color} />
      </div>
      <div className="text-[32px] font-semibold leading-none text-foreground">
        {value}
      </div>
      {delta !== undefined && (
        <div
          className={`flex items-center gap-1 text-[11px] ${positive ? "text-green-600" : "text-red-600"}`}
        >
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>
            {positive ? "+" : ""}
            {delta} {deltaLabel}
          </span>
        </div>
      )}
    </div>
  );
}
