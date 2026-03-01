import Image from "next/image";
import type { ActivityItem } from "@/types";

type ActivityCardProps = {
  item: ActivityItem;
};

export const ActivityCard = ({ item }: ActivityCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-all hover:-translate-y-1 hover:card-shadow-hover">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={750}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-secondary">
          {item.date}
        </p>
        <h3 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </article>
  );
};
