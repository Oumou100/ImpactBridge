import type { StatItem } from "@/types";

type StatCardProps = {
  item: StatItem;
};

export const StatCard = ({ item }: StatCardProps) => {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 text-center card-shadow transition-shadow hover:card-shadow-hover">
      <p className="text-3xl font-extrabold text-primary md:text-4xl">{item.value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
    </article>
  );
};
