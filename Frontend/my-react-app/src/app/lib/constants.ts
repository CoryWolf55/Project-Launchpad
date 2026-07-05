import type { ProjectType, Status } from "../types/project";

export const STATUS_CLS: Record<Status, string> = {
  Assigned: "bg-blue-50 text-blue-700 border border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Delayed: "bg-red-50 text-red-700 border border-red-200",
  Completed: "bg-green-50 text-green-700 border border-green-200",
  Upcoming: "bg-purple-50 text-purple-700 border border-purple-200",
};

export const TYPE_CLS: Record<ProjectType, string> = {
  PIE: "bg-blue-100 text-blue-800",
  IMO: "bg-purple-100 text-purple-800",
  Standard: "bg-gray-100 text-gray-600",
  Lifecycle: "bg-teal-100 text-teal-800",
  Sunset: "bg-orange-100 text-orange-700",
};

export const STATUS_BAR: Record<Status, string> = {
  Assigned: "#3B82F6",
  Pending: "#F59E0B",
  Delayed: "#EF4444",
  Completed: "#22C55E",
  Upcoming: "#A855F7",
};

export const PIE_COLORS = ["#0078D4", "#8764B8", "#6B7280", "#0D7377", "#EA580C"];

export const ALL_STATUSES: Status[] = [
  "Assigned",
  "Pending",
  "Delayed",
  "Completed",
  "Upcoming",
];

export const ALL_PROJECT_TYPES: ProjectType[] = [
  "PIE",
  "IMO",
  "Standard",
  "Lifecycle",
  "Sunset",
];
