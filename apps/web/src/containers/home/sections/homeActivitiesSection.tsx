import { ActivityCard, CtaButton, SectionHeading } from "@/components";
import type { ActivityItem } from "@/types";

type HomeActivitiesSectionProps = {
  activities: ActivityItem[];
  isLoading?: boolean;
};

export const HomeActivitiesSection = ({
  activities,
  isLoading = false,
}: HomeActivitiesSectionProps) => {
  return (
    <section className="bg-card py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Sur le terrain"
          title="Notre impact en action"
          description="Decouvrez nos dernieres interventions et l impact concret de votre soutien."
        />

        {isLoading ? (
          <div className="rounded-2xl border border-border bg-background px-6 py-10 text-center text-sm text-muted-foreground">
            Chargement des activites...
          </div>
        ) : null}

        {!isLoading && activities.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {activities.map((item) => (
              <ActivityCard key={item.title} item={item} />
            ))}
          </div>
        ) : null}

        {!isLoading && activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-10 text-center text-sm text-muted-foreground">
            Aucune activite publiee pour le moment.
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <CtaButton href="/activites" variant="outline">
            Toutes nos activites
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
