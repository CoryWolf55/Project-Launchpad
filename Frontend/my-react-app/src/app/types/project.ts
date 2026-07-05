export type Status = "Assigned" | "Pending" | "Delayed" | "Completed" | "Upcoming";
export type ProjectType = "PIE" | "IMO" | "Standard" | "Lifecycle" | "Sunset";

export interface Project {
  id: string;
  name: string;
  owner: string;
  bu: string;
  type: ProjectType;
  lifecycle: string;
  pilotDate: string;
  gaDate: string;
  status: Status;
  lastUpdated: string;
  gate: string;
  comments: string;
}

export interface DatasetVersion {
  v: string;
  date: string;
  projects: number;
  changes: number;
  file: string;
}

export interface DiffRow {
  project: string;
  field: string;
  prev: string;
  curr: string;
}
