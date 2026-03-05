import type { ReactNode } from "react";

type AdminStatCardProps = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
  iconColorClassName?: string;
  icon: ReactNode;
};

export const AdminStatCard = ({
  label,
  value,
  detail,
  trend,
  iconColorClassName = "text-primary",
  icon,
}: AdminStatCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${iconColorClassName}`}
        >
          {icon}
        </div>
        {trend ? (
          <span className="text-xs font-medium text-secondary">{trend}</span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label} - {detail}</p>
    </div>
  );
};
