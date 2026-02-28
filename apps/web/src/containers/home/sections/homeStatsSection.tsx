import { AnimatedCounter } from "@/components";
import type { StatItem } from "@/types";

type HomeStatsSectionProps = {
  stats: StatItem[];
};

export const HomeStatsSection = ({ stats }: HomeStatsSectionProps) => {
  return (
    <section className="relative z-20 -mt-10 px-4 md:-mt-12 md:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-card p-8 card-shadow md:p-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
};
