import { CtaButton } from "@/components";

type HomeMissionSectionProps = {
  missionImage: string;
};

export const HomeMissionSection = ({ missionImage }: HomeMissionSectionProps) => {
  return (
    <section className="bg-card py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Notre mission
            </p>
          </div>

          <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Renforcer les communautes,
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              transformer les vies
            </span>
          </h2>

          <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
            Depuis notre creation, ImpactBridge agit pour un acces durable a l education, aux soins et aux ressources essentielles.
          </p>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Notre approche participative garantit que chaque projet repond aux besoins reels des populations et cree un impact mesurable.
          </p>

          <CtaButton href="/services" variant="outline">
            Decouvrir nos domaines d action
          </CtaButton>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border card-shadow">
            <img
              src={missionImage}
              alt="Enfants et enseignants soutenus par ImpactBridge"
              className="h-[420px] w-full object-cover md:h-[520px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-4 rounded-xl border border-border bg-card p-5 card-shadow md:-left-6 md:p-6">
            <p className="text-3xl font-bold text-primary">15+</p>
            <p className="text-sm font-medium text-muted-foreground">Annees d experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};
