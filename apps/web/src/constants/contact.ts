import type { ContactFormValues, ContactInfoItem } from "@/types";

export const initialContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export const contactInfoItems: ContactInfoItem[] = [
  {
    icon: "map",
    label: "Adresse",
    value: "Hay Salam\nCasablanca, Maroc",
  },
  {
    icon: "phone",
    label: "Telephone",
    value: "+212 6 12 34 56 78",
  },
  {
    icon: "mail",
    label: "Email",
    value: "contact@impactbridge.org",
  },
  {
    icon: "clock",
    label: "Horaires",
    value: "Lun - Ven : 9h - 18h",
  },
];
