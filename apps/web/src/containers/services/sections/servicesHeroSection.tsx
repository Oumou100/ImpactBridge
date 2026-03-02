import Image from "next/image";
import { CtaButton } from "@/components";
import { ROUTES } from "@/constants";

type ServicesHeroSectionProps = {
  heroImage: string;
};

export const ServicesHeroSection = ({ heroImage }: ServicesHeroSectionProps) => {
  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Nos domaines d action"
          fill
          sizes="100vw"
          unoptimized
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-6 md:pb-20 md:pt-40">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/15 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/95">
              Ce que nous faisons
            </span>
          </div>
          <h1 className="mb-5 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
            Nos services
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-primary-foreground/90">
            Des interventions ciblees et durables pour repondre aux besoins fondamentaux des communautes les plus vulnerables.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
    </section>
  );
};
