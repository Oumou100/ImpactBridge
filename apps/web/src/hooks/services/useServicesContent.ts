import {
  serviceImpactNumbers,
  servicePillars,
  serviceProcessSteps,
  servicesHeroImage,
} from "@/constants";
import type { ServicesContent } from "@/types";

export const useServicesContent = (): ServicesContent => {
  return {
    heroImage: servicesHeroImage,
    pillars: servicePillars,
    processSteps: serviceProcessSteps,
    impactNumbers: serviceImpactNumbers,
  };
};
