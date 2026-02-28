import { CtaButton, SectionHeading, ServiceCard } from "@/components";
import type { ServiceItem } from "@/types";

type HomeServicesSectionProps = {
  services: ServiceItem[];
};

export const HomeServicesSection = ({ services }: HomeServicesSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-background via-[#f8f9ff] to-background py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Nos domaines d action"
          title="Ce que nous faisons"
          description="Des programmes concrets qui transforment des vies et renforcent les communautes."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <CtaButton href="/services" variant="outline">
            Tous nos services
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
