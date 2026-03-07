import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@impact-bridge/shared";
import { ROUTES } from "@/constants";

type ActivityListCardProps = {
  activity: Activity;
};

const formatDate = (value?: string | null) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const ActivityListCard = ({ activity }: ActivityListCardProps) => {
  const formattedDate = formatDate(activity.activityDate);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`${ROUTES.ACTIVITIES}/${activity.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={
              activity.coverImageUrl ||
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop"
            }
            alt={activity.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold">
          <Link href={`${ROUTES.ACTIVITIES}/${activity.slug}`} className="hover:text-primary">
            {activity.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{activity.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {formattedDate ? <span>{formattedDate}</span> : null}
          {activity.location ? <span>{activity.location}</span> : null}
        </div>
      </div>
    </article>
  );
};
