export function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function daysUntil(d: string, referenceDate = "2025-01-15") {
  return Math.ceil(
    (new Date(d).getTime() - new Date(referenceDate).getTime()) / 86400000,
  );
}
