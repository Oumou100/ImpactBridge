import { Skeleton } from "./Skeleton";

const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 border-b border-border px-4 py-3">
    <Skeleton className="hidden h-9 w-9 rounded-lg sm:block" />
    <Skeleton className="h-4 flex-1" />
    <Skeleton className="hidden h-4 w-32 md:block" />
    <Skeleton className="hidden h-4 w-24 sm:block" />
    <Skeleton className="h-6 w-20" />
    <div className="ml-auto flex gap-2">
      <Skeleton className="h-8 w-12" />
      <Skeleton className="h-8 w-14" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

export const AdminActivitiesTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-card">
    <div className="border-b border-border bg-muted/50 px-4 py-3">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="hidden h-4 w-20 md:block" />
        <Skeleton className="hidden h-4 w-14 sm:block" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="ml-auto h-4 w-16" />
      </div>
    </div>
    <div>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRowSkeleton key={index} />
      ))}
    </div>
  </div>
);
