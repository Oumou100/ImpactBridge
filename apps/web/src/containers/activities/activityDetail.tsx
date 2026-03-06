"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePublicActivityDetail } from "@/hooks";
import { ActivityDetailMeta, ActivityEmptyState } from "@/components";
import { ROUTES } from "@/constants";

type ActivityDetailProps = {
  slug: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop";

export const ActivityDetail = ({ slug }: ActivityDetailProps) => {
  const { data, isLoading, isError } = usePublicActivityDetail(slug);

  const contentParagraphs = useMemo(() => {
    const rawContent = data?.content?.trim();
    if (!rawContent) {
      return [];
    }
    return rawContent.split(/\n+/g).filter(Boolean);
  }, [data?.content]);

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Chargement de l activite...
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
        <ActivityEmptyState title="Activite introuvable" description="Cette activite n est pas disponible ou a ete retiree." />
        <div className="mt-5 text-center">
          <Link
            href={ROUTES.ACTIVITIES}
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Retour aux activites
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden md:h-[50vh]">
        <Image
          src={data.coverImageUrl || DEFAULT_IMAGE}
          alt={data.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mx-auto w-full max-w-7xl">
            <Link
              href={ROUTES.ACTIVITIES}
              className="inline-flex items-center rounded-lg border border-border bg-background/85 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-background"
            >
              Retour aux activites
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
          <ActivityDetailMeta activityDate={data.activityDate} location={data.location} />

          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{data.title}</h1>

          <p className="mb-10 border-l-4 border-accent pl-5 text-lg leading-relaxed text-muted-foreground">
            {data.description}
          </p>

          {contentParagraphs.length > 0 ? (
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              {contentParagraphs.map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href={ROUTES.ACTIVITIES}
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Toutes les activites
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
