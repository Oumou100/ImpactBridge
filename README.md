# ImpactBridge

ImpactBridge est un monorepo pour une plateforme d ONG comprenant :
- un site public
- une API backend dédiée
- un espace d administration pour la gestion des activités et des messages de contact

Le projet a été conçu avec une séparation claire entre le front-end et le back-end, en mettant l accent sur l organisation du code, la sécurité et une interface responsive.

## Stack technique

- Front-end : Next.js, TypeScript, Tailwind CSS
- Back-end : Node.js, Express, Prisma
- Base de données : PostgreSQL
- Authentification : JWT access + refresh tokens
- Upload d images : Cloudinary
- Documentation API : Swagger
- Récupération de données : React Query
- State management : Zustand

## Structure du monorepo

```text
apps/
  api/        API Express + Prisma
  web/        Application Next.js
packages/
  shared/     Types partagés entre le front et le back
```

## Lancement du projet

1. Installer les dépendances à la racine du dépôt :

```bash
pnpm install
```

2. Configurer les variables d environnement :
- `apps/api/.env`
- `apps/web/.env.local`

3. Lancer le backend :

```bash
pnpm --filter impact-bridge-api dev
```

4. Lancer le frontend :

```bash
pnpm --filter impact-bridge-web dev
```

## Commandes utiles

```bash
pnpm --filter impact-bridge-web build
pnpm --filter impact-bridge-api build
pnpm --filter impact-bridge-api test
pnpm --filter impact-bridge-api prisma:deploy
pnpm --filter impact-bridge-api prisma:seed
```

## Documentation

- Front-end : voir apps/web/README.md
- API : voir apps/api/README.md

## Notes

- Le site public n affiche que les activités publiées.
- L espace d administration permet de créer des activités en brouillon, de les publier, de gérer les messages de contact et d envoyer des images vers le service d upload.
- Les types partagés sont centralisés dans `packages/shared` afin d éviter la duplication entre le client et l API.
