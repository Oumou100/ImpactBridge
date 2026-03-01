import { ActivityCard, CtaButton, SectionHeading } from "@/components";
import { ROUTES } from "@/constants";
import type { ActivityItem } from "@/types";

type ActivitiesFeedSectionProps = {
  items: ActivityItem[];
};

export const ActivitiesFeedSection = ({ items }: ActivitiesFeedSectionProps) => {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Dernieres interventions"
          title="Ce qui a ete realise sur le terrain"
          description="Un apercu transparent de nos actions recentes, avec dates et zones d intervention."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <ActivityCard key={item.title} item={item} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaButton href={ROUTES.CONTACT} variant="outline">
            Proposer une collaboration
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
