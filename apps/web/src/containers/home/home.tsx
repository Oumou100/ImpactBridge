"use client";

import { useMemo } from "react";
import { useHomeContent, usePublicActivities } from "@/hooks";
import type { ActivityItem } from "@/types";
import {
  HomeActivitiesSection,
  HomeHeroSection,
  HomeMissionSection,
  HomeServicesSection,
  HomeStatsSection,
} from "./sections";

const HOME_ACTIVITIES_PREVIEW_COUNT = 3;

const formatActivityDate = (value?: string | null) => {
  if (!value) {
    return "Date non precisee";
  }

  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const Home = () => {
  const { heroImage, impactStats, missionImage, ngoServices } = useHomeContent();
  const { filteredItems: publicActivities, isLoading: isActivitiesLoading } = usePublicActivities({
    search: "",
    filter: "all",
  });

  const featuredActivities = useMemo<ActivityItem[]>(
    () =>
      publicActivities.slice(0, HOME_ACTIVITIES_PREVIEW_COUNT).map((activity) => ({
        slug: activity.slug,
        title: activity.title,
        description: activity.description,
        date: formatActivityDate(activity.activityDate),
        image:
          activity.coverImageUrl ||
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
      })),
    [publicActivities],
  );

  return (
    <>
      <HomeHeroSection heroImage={heroImage} />
      <HomeStatsSection stats={impactStats} />
      <HomeMissionSection missionImage={missionImage} />
      <HomeServicesSection services={ngoServices} />
      <HomeActivitiesSection
        activities={featuredActivities}
        isLoading={isActivitiesLoading}
      />
    </>
  );
};
