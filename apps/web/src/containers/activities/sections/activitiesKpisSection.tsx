import { KpiCard } from "@/components";
import type { ActivityKpi } from "@/types";

type ActivitiesKpisSectionProps = {
  items: ActivityKpi[];
};

export const ActivitiesKpisSection = ({ items }: ActivitiesKpisSectionProps) => {
  return (
    <section className="relative z-10 -mt-10 px-4 md:-mt-12 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {items.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
};
