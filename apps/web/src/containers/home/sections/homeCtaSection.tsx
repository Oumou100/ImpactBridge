import { CtaButton } from "@/components";

export const HomeCtaSection = () => {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Pret a faire la difference ?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Chaque contribution compte. Rejoignez notre communaute de benevoles et de donateurs engages pour changer des vies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton href="/contact" variant="accent">
              Nous rejoindre
            </CtaButton>
            <CtaButton
              href="/contact"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-white/10"
            >
              Nous contacter
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};
