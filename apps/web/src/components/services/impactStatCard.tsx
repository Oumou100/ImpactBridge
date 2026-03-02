import type { ServiceImpactNumber } from "@/types";

type ImpactStatCardProps = {
  item: ServiceImpactNumber;
};

export const ImpactStatCard = ({ item }: ImpactStatCardProps) => {
  return (
    <article className="rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:card-shadow-hover">
      <p className="mb-2 text-4xl font-bold text-primary">{item.value}</p>
      <p className="mb-1 text-sm font-semibold text-foreground">{item.label}</p>
      <p className="text-xs text-muted-foreground">{item.description}</p>
    </article>
  );
};
