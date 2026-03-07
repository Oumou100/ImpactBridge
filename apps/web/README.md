# ImpactBridge Web

Application Next.js pour la partie front-end de la plateforme ImpactBridge.

Elle comprend :
- le site public
- la liste des activités et la page détail
- les pages services et contact
- l interface d administration connectée à l API backend

## Stack technique

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Query
- Zustand

## Variables d environnement

Créer `apps/web/.env.local` avec :

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/v1
```

En production, utiliser l URL publique de l API.

## Lancer en local

Depuis la racine du dépôt :

```bash
pnpm --filter impact-bridge-web dev
```

L application sera disponible sur :

`http://localhost:3000`

## Build

```bash
pnpm --filter impact-bridge-web build
pnpm --filter impact-bridge-web start
```

## Parties principales

- Pages publiques : accueil, activités, services, contact
- Pages admin : connexion, tableau de bord, gestion des activités, gestion des messages
- Métadonnées SEO et Open Graph
- Interface responsive desktop et mobile

## Notes

- Les routes admin dépendent de l API backend et d une session valide.
- Les activités visibles sur le site public sont filtrées selon leur statut de publication.
- Le front-end consomme les types partagés définis dans `packages/shared`.
