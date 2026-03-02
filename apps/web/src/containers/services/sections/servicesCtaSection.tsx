import { CtaButton } from "@/components";
import { ROUTES } from "@/constants";

export const ServicesCtaSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-10 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary blur-3xl" />
          </div>
          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                Un projet en tete ?
              </h2>
              <p className="leading-relaxed text-primary-foreground/90">
                Que vous soyez un particulier, une entreprise ou une institution,
                nous pouvons collaborer pour creer un impact positif et mesurable.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <CtaButton href={ROUTES.CONTACT} variant="accent">
                Nous contacter
              </CtaButton>
              <CtaButton
                href={ROUTES.ACTIVITIES}
                variant="outline"
                className="border-primary-foreground/60 text-primary-foreground hover:bg-white/15"
              >
                Voir nos projets
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
