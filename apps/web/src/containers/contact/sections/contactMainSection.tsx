"use client";

import {
  ContactInfoCard,
  ContactInputField,
  ContactStatusMessage,
  ContactTextareaField,
} from "@/components";
import { contactInfoItems } from "@/constants";
import { useContactForm } from "@/hooks";

const SendIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
};

export const ContactMainSection = () => {
  const {
    values,
    errors,
    status,
    feedbackMessage,
    isSubmitting,
    updateField,
    submit,
  } = useContactForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          <aside className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Parlons de votre projet
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Notre equipe est a votre ecoute pour repondre a vos questions.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfoItems.map((item) => (
                <ContactInfoCard key={item.label} item={item} />
              ))}
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-8 card-shadow lg:col-span-3"
            noValidate
          >
            <ContactStatusMessage status={status} message={feedbackMessage} />

            <div className="grid gap-5 sm:grid-cols-2">
              <ContactInputField
                id="name"
                label="Nom complet"
                value={values.name}
                placeholder="Votre nom"
                autoComplete="name"
                error={errors.name}
                onChange={(value) => updateField("name", value)}
              />
              <ContactInputField
                id="email"
                type="email"
                label="Email"
                value={values.email}
                placeholder="votre@email.com"
                autoComplete="email"
                error={errors.email}
                onChange={(value) => updateField("email", value)}
              />
            </div>

            <ContactInputField
              id="subject"
              label="Sujet"
              value={values.subject}
              placeholder="Benevolat, don, partenariat..."
              autoComplete="off"
              error={errors.subject}
              onChange={(value) => updateField("subject", value)}
            />

            <ContactTextareaField
              id="message"
              label="Message"
              value={values.message}
              placeholder="Votre message..."
              rows={6}
              error={errors.message}
              onChange={(value) => updateField("message", value)}
            />

            <div className="hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={values.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-accent px-4 text-base font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              <span className="ml-2 inline-flex">
                <SendIcon />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
