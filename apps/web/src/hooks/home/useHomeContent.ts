import {
  featuredActivities,
  heroImage,
  impactStats,
  missionImage,
  navItems,
  ngoServices
} from "@/constants";

export const useHomeContent = () => {
  return {
    navItems,
    impactStats,
    ngoServices,
    featuredActivities,
    heroImage,
    missionImage,
  };
};
