const GANTT_START = new Date("2025-01-01").getTime();
const GANTT_END = new Date("2025-12-31").getTime();
const GANTT_RANGE = GANTT_END - GANTT_START;

export const GANTT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function pct(dateStr: string) {
  const t = new Date(dateStr).getTime();
  return Math.max(0, Math.min(100, ((t - GANTT_START) / GANTT_RANGE) * 100));
}

export function monthLeft(m: number) {
  return ((new Date(2025, m, 1).getTime() - GANTT_START) / GANTT_RANGE) * 100;
}
