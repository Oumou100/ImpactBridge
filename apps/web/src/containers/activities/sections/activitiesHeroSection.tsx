import Image from "next/image";
import { CtaButton } from "@/components";
import { ROUTES } from "@/constants";

type ActivitiesHeroSectionProps = {
  heroImage: string;
};

export const ActivitiesHeroSection = ({ heroImage }: ActivitiesHeroSectionProps) => {
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Equipes ImpactBridge en intervention"
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/35" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
            Activites terrain
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            Nos actions concretes pour un impact durable
          </h1>
          <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Chaque mission est concue avec les communautes locales pour repondre
            aux besoins reels, renforcer l autonomie et proteger les plus vulnerables.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href={ROUTES.CONTACT} variant="accent">
              Rejoindre une mission
            </CtaButton>
            <CtaButton
              href={ROUTES.SERVICES}
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-white/10"
            >
              Voir nos services
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};
