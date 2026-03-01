import { MilestoneItem, SectionHeading } from "@/components";
import type { ActivityMilestone } from "@/types";

type ActivitiesMilestonesSectionProps = {
  items: ActivityMilestone[];
};

export const ActivitiesMilestonesSection = ({
  items,
}: ActivitiesMilestonesSectionProps) => {
  return (
    <section className="section-alt py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Suivi et planification"
          title="Feuille de route des actions"
          description="Une gouvernance claire, des jalons periodiques et des objectifs suivis avec rigueur."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <MilestoneItem key={`${item.period}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
