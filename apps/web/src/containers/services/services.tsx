import { useServicesContent } from "@/hooks";
import {
  ServicesCtaSection,
  ServicesHeroSection,
  ServicesImpactSection,
  ServicesPillarsSection,
  ServicesProcessSection,
} from "./sections";

export const Services = () => {
  const { heroImage, impactNumbers, pillars, processSteps } = useServicesContent();

  return (
    <>
      <ServicesHeroSection heroImage={heroImage} />
      <ServicesPillarsSection items={pillars} />
      <ServicesProcessSection items={processSteps} />
      <ServicesImpactSection items={impactNumbers} />
      <ServicesCtaSection />
    </>
  );
};
