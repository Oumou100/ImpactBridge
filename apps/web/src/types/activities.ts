import type { ActivityItem } from "./home";

export type ActivityKpi = {
  label: string;
  value: string;
  detail: string;
};

export type ActivityProgram = {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  beneficiaries: string;
};

export type ActivityMilestone = {
  title: string;
  description: string;
  period: string;
};

export type ActivitiesContent = {
  heroImage: string;
  featuredActivities: ActivityItem[];
  kpis: ActivityKpi[];
  programs: ActivityProgram[];
  milestones: ActivityMilestone[];
};
