# ImpactBridge API

Express + Prisma backend for ImpactBridge NGO platform.

## Stack

- Node.js + Express
- PostgreSQL + Prisma
- JWT access/refresh auth
- Cloudinary uploads
- Swagger docs
- Vitest + Supertest integration tests

## Setup

1. Copy `.env.example` to `.env`
2. Configure PostgreSQL and Cloudinary credentials
3. Install dependencies:

```bash
pnpm install
```

4. Run migrations and seed:

```bash
pnpm --filter impact-bridge-api prisma:migrate
pnpm --filter impact-bridge-api prisma:seed
```

5. Start API:

```bash
pnpm --filter impact-bridge-api dev
```

## Useful Commands

```bash
pnpm --filter impact-bridge-api test
pnpm --filter impact-bridge-api build
pnpm --filter impact-bridge-api start
pnpm --filter impact-bridge-api prisma:generate
pnpm --filter impact-bridge-api prisma:deploy
```

## Docs

Swagger UI is exposed at:

`http://localhost:4000/docs`
