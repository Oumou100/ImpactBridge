import Image from "next/image";
import { CtaButton } from "@/components";

type HomeHeroSectionProps = {
  heroImage: string;
};

const ChevronIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
};

export const HomeHeroSection = ({ heroImage }: HomeHeroSectionProps) => {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Communautes soutenues par ImpactBridge"
          fill
          sizes="100vw"
          priority
          className="scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-overlay))/0.85] via-[hsl(var(--hero-overlay))/0.6] to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-6 md:py-36">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/85">
              Organisation non gouvernementale
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.03] text-primary-foreground md:text-6xl lg:text-7xl">
            Construisons des ponts vers un avenir meilleur
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            ImpactBridge connecte les ressources aux communautes qui en ont le plus besoin. Ensemble, creons un monde plus juste et solidaire.
          </p>

          <div className="flex flex-wrap gap-4">
            <CtaButton href="/contact" variant="accent" className="h-14 px-8 text-base font-bold">
              Soutenir notre mission
            </CtaButton>
            <CtaButton
              href="/activites"
              variant="outline"
              className="inline-flex h-14 items-center gap-1 border-primary-foreground/35 px-8 text-base text-primary-foreground hover:bg-white/10"
            >
              Decouvrir nos actions
              <ChevronIcon />
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};
