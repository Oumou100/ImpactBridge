import { Skeleton } from "./Skeleton";

const ActivityCardSkeleton = () => (
  <div className="space-y-3 rounded-lg border border-border bg-card p-4">
    <Skeleton className="h-48 w-full rounded-lg" />
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-3 pt-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-24" />
    </div>
  </div>
);

export const ActivityListSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <ActivityCardSkeleton key={index} />
    ))}
  </div>
);
