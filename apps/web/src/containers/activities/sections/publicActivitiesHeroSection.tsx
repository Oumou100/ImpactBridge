export const PublicActivitiesHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%)",
          }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 text-center md:px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
          Sur le terrain
        </p>
        <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
          Nos activites
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
          Decouvrez nos actions concretes et l impact de votre soutien sur le terrain.
        </p>
      </div>
    </section>
  );
};
