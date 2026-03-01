import type { ActivityKpi } from "@/types";

type KpiCardProps = {
  item: ActivityKpi;
};

export const KpiCard = ({ item }: KpiCardProps) => {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 card-shadow">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
        {item.label}
      </p>
      <p className="mt-3 text-4xl font-extrabold text-primary">{item.value}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.detail}
      </p>
    </article>
  );
};
