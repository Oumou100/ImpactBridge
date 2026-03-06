import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className = "", ...props }: SkeletonProps) => {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} {...props} />;
};
