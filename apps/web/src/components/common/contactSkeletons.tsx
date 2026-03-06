import { Skeleton } from "./Skeleton";

export const ContactListSkeleton = () => (
  <section className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-2">
    <div className="max-h-[620px] divide-y divide-border overflow-y-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3 px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  </section>
);

export const ContactDetailSkeleton = () => (
  <section className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
    <div className="mb-6 flex items-start justify-between gap-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-3 w-44" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="mb-8 space-y-3 rounded-lg bg-muted/50 p-5">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-9 w-28" />
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-20" />
    </div>
  </section>
);
