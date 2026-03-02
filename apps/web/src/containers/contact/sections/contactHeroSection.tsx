export const ContactHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/85">
            Contact
          </p>
          <span className="h-2 w-2 rounded-full bg-accent" />
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
          Contactez-nous
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/90">
          Une question, une suggestion ou envie de nous rejoindre ? Ecrivez-nous
          et notre equipe vous repondra rapidement.
        </p>
      </div>
    </section>
  );
};
