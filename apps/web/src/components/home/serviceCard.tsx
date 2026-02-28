import type { ServiceIconKey, ServiceItem } from "@/types";

const ArrowIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
};

const ServiceIcon = ({ icon }: { icon: ServiceIconKey }) => {
  if (icon === "aid") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
      </svg>
    );
  }

  if (icon === "education") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m3 9 9-4 9 4-9 4-9-4Z" />
        <path d="M7 11.5V16c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c.8-2.6 3.3-4 7-4s6.2 1.4 7 4" />
    </svg>
  );
};

type ServiceCardProps = {
  item: ServiceItem;
};

export const ServiceCard = ({ item }: ServiceCardProps) => {
  return (
    <article className="group relative rounded-2xl border border-border bg-card p-8 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-hover">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <ServiceIcon icon={item.icon} />
      </div>
      <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        En savoir plus
        <ArrowIcon />
      </div>
    </article>
  );
};
