import { SectionHeading, ServicePillarCard } from "@/components";
import type { ServicePillar } from "@/types";

type ServicesPillarsSectionProps = {
  items: ServicePillar[];
};

export const ServicesPillarsSection = ({ items }: ServicesPillarsSectionProps) => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Domaines d action"
          title="Six piliers pour un impact durable"
          description="Notre approche holistique couvre les besoins essentiels pour permettre aux communautes de s epanouir durablement."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ServicePillarCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
