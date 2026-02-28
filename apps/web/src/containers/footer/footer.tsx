import Link from "next/link";
import { navItems } from "@/constants";

const engagementLinks = [
  "Faire un don",
  "Devenir benevole",
  "Nos partenaires",
  "Rapport annuel",
];

const ArrowIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
};

const HeartIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Restez connecte a notre impact
            </h3>
            <p className="mb-8 leading-relaxed text-primary-foreground/75">
              Recevez nos nouvelles, nos histoires d impact et nos opportunites de benevolat directement par email.
            </p>

            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" action="#" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="h-12 flex-1 rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/45 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90"
              >
                S inscrire
                <span className="ml-2 inline-flex"><ArrowIcon /></span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">IB</span>
                </div>
                <span className="text-lg font-bold">ImpactBridge</span>
              </div>
              <p className="text-sm leading-relaxed text-background/55">
                Ensemble, construisons des ponts vers un avenir meilleur pour les communautes les plus vulnerables.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                Navigation
              </h4>
              <div className="flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-sm text-background/55 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                S engager
              </h4>
              <div className="flex flex-col gap-2.5">
                {engagementLinks.map((item) => (
                  <span
                    key={item}
                    className="w-fit cursor-pointer text-sm text-background/55 transition-colors hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                Contact
              </h4>
              <div className="space-y-2.5 text-sm text-background/55">
                <p className="flex items-center gap-2">
                  <span className="text-accent"><MailIcon /></span>
                  contact@impactbridge.org
                </p>
                <p>+212 6 12 34 56 78</p>
                <p>
                  Hay Salam
                  <br />
                  Casablanca, Maroc
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
            <p className="text-xs text-background/35">
              © {new Date().getFullYear()} ImpactBridge. Tous droits reserves.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-background/35">
              <span>By</span>
              <Link
                href="https://oumou100.github.io/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent transition-opacity hover:opacity-80"
              >
                OumouDev
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
