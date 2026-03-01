import {
  activitiesHeroImage,
  activityFeed,
  activityKpis,
  activityMilestones,
  activityPrograms,
} from "@/constants";
import type { ActivitiesContent } from "@/types";

export const useActivitiesContent = (): ActivitiesContent => {
  return {
    heroImage: activitiesHeroImage,
    featuredActivities: activityFeed,
    kpis: activityKpis,
    programs: activityPrograms,
    milestones: activityMilestones,
  };
};
