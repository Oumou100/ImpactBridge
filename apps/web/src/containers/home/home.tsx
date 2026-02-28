import { useHomeContent } from "@/hooks";
import {
  HomeActivitiesSection,
  HomeHeroSection,
  HomeMissionSection,
  HomeServicesSection,
  HomeStatsSection,
} from "./sections";

export const Home = () => {
  const {
    featuredActivities,
    heroImage,
    impactStats,
    missionImage,
    ngoServices,
  } = useHomeContent();

  return (
    <>
      <HomeHeroSection heroImage={heroImage} />
      <HomeStatsSection stats={impactStats} />
      <HomeMissionSection missionImage={missionImage} />
      <HomeServicesSection services={ngoServices} />
      <HomeActivitiesSection activities={featuredActivities} />
    </>
  );
};
