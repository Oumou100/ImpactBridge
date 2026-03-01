import { useActivitiesContent } from "@/hooks";
import {
  ActivitiesFeedSection,
  ActivitiesHeroSection,
  ActivitiesKpisSection,
  ActivitiesMilestonesSection,
  ActivitiesProgramsSection,
} from "./sections";

export const Activities = () => {
  const { featuredActivities, heroImage, kpis, milestones, programs } =
    useActivitiesContent();

  return (
    <>
      <ActivitiesHeroSection heroImage={heroImage} />
      <ActivitiesKpisSection items={kpis} />
      <ActivitiesProgramsSection items={programs} />
      <ActivitiesFeedSection items={featuredActivities} />
      <ActivitiesMilestonesSection items={milestones} />
    </>
  );
};
