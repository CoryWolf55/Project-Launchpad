import type { ProjectType } from "../../types/project";
import { TYPE_CLS } from "../../lib/constants";

interface TypeBadgeProps {
  type: ProjectType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium leading-none ${TYPE_CLS[type]}`}
    >
      {type}
    </span>
  );
}
