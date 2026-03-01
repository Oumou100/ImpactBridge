import { ProgramCard, SectionHeading } from "@/components";
import type { ActivityProgram } from "@/types";

type ActivitiesProgramsSectionProps = {
  items: ActivityProgram[];
};

export const ActivitiesProgramsSection = ({
  items,
}: ActivitiesProgramsSectionProps) => {
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Programmes en cours"
          title="Interventions prioritaires"
          description="Des actions rapides, structurees et mesurables co-construites avec nos partenaires locaux."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <ProgramCard key={`${item.title}-${item.date}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
