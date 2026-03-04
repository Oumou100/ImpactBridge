import type { ContactSubmitStatus } from "@/types";

type ContactStatusMessageProps = {
  status: ContactSubmitStatus;
  message: string;
};

export const ContactStatusMessage = ({
  status,
  message,
}: ContactStatusMessageProps) => {
  if (!message || status === "idle") {
    return null;
  }

  const className =
    status === "success"
      ? "rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-foreground"
      : "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive";

  return (
    <p className={className} role={status === "success" ? "status" : "alert"}>
      {message}
    </p>
  );
};
