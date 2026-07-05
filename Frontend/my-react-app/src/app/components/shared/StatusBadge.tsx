import type { Status } from "../../types/project";
import { STATUS_CLS } from "../../lib/constants";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium leading-none ${STATUS_CLS[status]}`}
    >
      {status}
    </span>
  );
}
