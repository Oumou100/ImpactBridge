import Image from "next/image";
import type { TestimonialItem } from "@/types";

type TestimonialCardProps = {
  item: TestimonialItem;
};

export const TestimonialCard = ({ item }: TestimonialCardProps) => {
  return (
    <article className="rounded-2xl border border-border bg-card p-7 card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover">
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">&quot;{item.quote}&quot;</p>
      <div className="flex items-center gap-4">
        <Image
          src={item.image}
          alt={item.name}
          width={48}
          height={48}
          unoptimized
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.role}</p>
        </div>
      </div>
    </article>
  );
};
