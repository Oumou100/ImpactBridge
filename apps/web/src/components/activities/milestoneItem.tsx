import type { ActivityMilestone } from "@/types";

type MilestoneItemProps = {
  item: ActivityMilestone;
};

export const MilestoneItem = ({ item }: MilestoneItemProps) => {
  return (
    <article className="relative rounded-2xl border border-border bg-card p-6 card-shadow">
      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {item.period}
      </span>
      <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </article>
  );
};
