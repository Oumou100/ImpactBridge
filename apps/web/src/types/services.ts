export type ServicePillarIconKey =
  | "aid"
  | "education"
  | "community"
  | "water"
  | "health"
  | "environment";

export type ProcessStepIconKey = "identify" | "design" | "deploy" | "impact";

export type ServicePillar = {
  title: string;
  description: string;
  icon: ServicePillarIconKey;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
  icon: ProcessStepIconKey;
};

export type ServiceImpactNumber = {
  value: string;
  label: string;
  description: string;
};

export type ServicesContent = {
  heroImage: string;
  pillars: ServicePillar[];
  processSteps: ServiceProcessStep[];
  impactNumbers: ServiceImpactNumber[];
};
