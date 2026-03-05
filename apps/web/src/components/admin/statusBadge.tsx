import type { ContactMessageStatus } from "@impact-bridge/shared";

const statusMap: Record<
  ContactMessageStatus,
  { label: string; className: string; showPulse: boolean }
> = {
  NEW: {
    label: "Nouveau",
    className: "border-accent/30 bg-accent/15 text-accent-foreground",
    showPulse: true,
  },
  READ: {
    label: "Lu",
    className: "border-primary/20 bg-primary/10 text-primary",
    showPulse: false,
  },
  ARCHIVED: {
    label: "Archive",
    className: "border-border bg-muted text-muted-foreground",
    showPulse: false,
  },
};

type StatusBadgeProps = {
  status: ContactMessageStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.showPulse ? <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> : null}
      {config.label}
    </span>
  );
};
