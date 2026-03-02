import { ProcessStepCard, SectionHeading } from "@/components";
import type { ServiceProcessStep } from "@/types";

type ServicesProcessSectionProps = {
  items: ServiceProcessStep[];
};

export const ServicesProcessSection = ({ items }: ServicesProcessSectionProps) => {
  return (
    <section className="section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Methodologie"
          title="Notre approche"
          description="Un processus rigoureux pour garantir l efficacite et la durabilite de chaque intervention."
        />

        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute top-12 right-[12.5%] left-[12.5%] hidden h-px bg-border md:block" />
          {items.map((item, index) => (
            <ProcessStepCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
