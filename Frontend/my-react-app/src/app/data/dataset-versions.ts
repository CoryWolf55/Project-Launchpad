import type { DatasetVersion, DiffRow } from "../types/project";

export const VERSIONS: DatasetVersion[] = [
  { v: "v47", date: "Jan 15, 2025 · 2:03 AM", projects: 20, changes: 3, file: "projects_master_v47.xlsx" },
  { v: "v46", date: "Jan 14, 2025 · 2:01 AM", projects: 18, changes: 7, file: "projects_master_v46.xlsx" },
  { v: "v45", date: "Jan 13, 2025 · 2:04 AM", projects: 18, changes: 2, file: "projects_master_v45.xlsx" },
  { v: "v44", date: "Jan 12, 2025 · 2:01 AM", projects: 17, changes: 5, file: "projects_master_v44.xlsx" },
  { v: "v43", date: "Jan 11, 2025 · 2:02 AM", projects: 17, changes: 1, file: "projects_master_v43.xlsx" },
  { v: "v42", date: "Jan 10, 2025 · 2:00 AM", projects: 16, changes: 4, file: "projects_master_v42.xlsx" },
];

export const DIFF_ROWS: DiffRow[] = [
  { project: "Customer Data Platform", field: "Status", prev: "Pending", curr: "Assigned" },
  { project: "Fraud Detection Upgrade", field: "Pilot Date", prev: "Feb 01, 2025", curr: "Feb 20, 2025" },
  { project: "Mobile Wallet v2", field: "Owner", prev: "Admin", curr: "James Park" },
  { project: "Core Banking Integration", field: "Gate", prev: "Gate 2", curr: "Gate 3" },
  { project: "ATM Fleet Upgrade", field: "Status", prev: "Upcoming", curr: "Upcoming" },
  { project: "Business Banking Portal", field: "Comments", prev: "", curr: "Awaiting business case approval." },
  { project: "Legacy Core Sunset", field: "Lifecycle", prev: "Active", curr: "Winding Down" },
];
