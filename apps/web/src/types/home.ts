export type NavigationItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ServiceIconKey = "aid" | "education" | "community";

export type ServiceItem = {
  title: string;
  description: string;
  icon: ServiceIconKey;
};

export type ActivityItem = {
  title: string;
  description: string;
  date: string;
  image: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
};
