import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "accent";
  className?: string;
};

const variants: Record<NonNullable<CtaButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  outline:
    "bg-transparent text-primary border border-primary/30 hover:bg-primary/10",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent/90 border border-accent",
};

export const CtaButton = ({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};
