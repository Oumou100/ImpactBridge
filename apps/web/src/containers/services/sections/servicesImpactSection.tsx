import { ImpactStatCard, SectionHeading } from "@/components";
import type { ServiceImpactNumber } from "@/types";

type ServicesImpactSectionProps = {
  items: ServiceImpactNumber[];
};

export const ServicesImpactSection = ({ items }: ServicesImpactSectionProps) => {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Transparence"
          title="Notre impact en chiffres"
          description="Des indicateurs clairs pour mesurer la performance et la portee de nos actions."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ImpactStatCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
