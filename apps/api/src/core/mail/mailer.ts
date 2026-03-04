import { createTransport } from "nodemailer";
import { env } from "@/core/config/env";

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: env.SMTP_USER
    ? {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      }
    : undefined,
});

export const sendContactNotification = async (input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: env.SMTP_FROM,
    subject: `[Contact] ${input.subject}`,
    text: `Nom: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
  });
};
