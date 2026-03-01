import Image from "next/image";
import type { ActivityProgram } from "@/types";

type ProgramCardProps = {
  item: ActivityProgram;
};

export const ProgramCard = ({ item }: ProgramCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-all hover:-translate-y-1 hover:card-shadow-hover">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={900}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {item.date}
        </p>
        <h3 className="mt-3 text-xl font-bold text-foreground">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
            {item.location}
          </span>
          <span className="rounded-full bg-accent/20 px-3 py-1 text-foreground">
            {item.beneficiaries}
          </span>
        </div>
      </div>
    </article>
  );
};
