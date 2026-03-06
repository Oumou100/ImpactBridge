"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { AdminLoginCredentials } from "@impact-bridge/shared";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";

type FormErrors = Partial<Record<keyof AdminLoginCredentials, string>>;

export const AdminLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkIsUserLoggedIn, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<AdminLoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const syncSession = async () => {
      const isLoggedIn = await checkIsUserLoggedIn();
      if (isLoggedIn) {
        router.replace(ROUTES.ADMIN_DASHBOARD);
      }
    };

    void syncSession();
  }, [checkIsUserLoggedIn, router]);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "L adresse email est obligatoire.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Le mot de passe est obligatoire.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Le mot de passe doit contenir au moins 8 caracteres.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(form);
      const redirectTarget = searchParams.get("redirect");
      const safeTarget =
        redirectTarget && redirectTarget.startsWith("/admin")
          ? redirectTarget
          : ROUTES.ADMIN_DASHBOARD;

      router.replace(safeTarget);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Echec de connexion. Veuillez reessayer.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
            <Image
              src="/assets/logo/impactbridge.png"
              alt="ImpactBridge"
              fill
              sizes="64px"
              className="object-contain p-1"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold">Connexion administration</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accedez au tableau de bord ImpactBridge.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => {
                setForm((previous) => ({ ...previous, email: event.target.value }));
                if (errors.email) {
                  setErrors((previous) => ({ ...previous, email: undefined }));
                }
              }}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
              placeholder="admin@impactbridge.org"
            />
            {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-sm font-medium">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => {
                  setForm((previous) => ({ ...previous, password: event.target.value }));
                  if (errors.password) {
                    setErrors((previous) => ({ ...previous, password: undefined }));
                  }
                }}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-12 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password}</p>
            ) : null}
          </div>

          {errorMessage ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Retour au site public ?{" "}
          <Link href={ROUTES.HOME} className="font-semibold text-primary hover:underline">
            Accueil
          </Link>
        </p>
      </div>
    </section>
  );
};
