# CodeDog

CodeDog is a GitHub-connected code review and repository management app built with Next.js, Prisma, Better Auth, Inngest, Pinecone, OpenRouter, and Razorpay.

## What it does

- GitHub sign-in and session management
- GitHub App installation and webhook handling
- Repository sync and pull request review workflows
- AI-powered review features
- Billing and subscription handling through Razorpay
- Background job processing with Inngest
- Theme-aware dashboard UI

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma with PostgreSQL
- Better Auth
- Inngest
- Pinecone
- OpenRouter AI SDK
- Razorpay
- Tailwind CSS and shadcn-style UI components

## Project Structure

- `app/` - App Router pages, layouts, and API routes
- `components/` - Shared UI and provider components
- `features/` - Feature-based application logic
- `lib/` - Core app utilities such as auth and database setup
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets

## Getting Started

### Prerequisites

- Bun
- PostgreSQL database
- GitHub OAuth app or GitHub App setup, depending on the flow you are using

### Install dependencies

```bash
bun install
```

### Configure environment variables

Create a `.env` file in the project root and set the required values.

```bash
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
OPENROUTER_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX=
NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID=
RAZORPAY_TEST_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_PLAN_ID=
```

Depending on your deployment and local workflow, you may also need any additional provider variables used by your GitHub, billing, or background job setup.

### Run database migrations

```bash
bun run prisma:migrate
```

### Generate Prisma client

```bash
bun run prisma:generate
```

### Start the development server

```bash
bun run dev
```

## Available Scripts

- `bun run dev` - Start the local development server
- `bun run build` - Build the production app
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint
- `bun run prisma:migrate` - Run Prisma migrations
- `bun run prisma:generate` - Generate the Prisma client

## Main Routes

- `/` - Landing page
- `/sign-in` - GitHub sign-in flow
- `/dashboard` - App overview
- `/dashboard/repos` - Repository management
- `/dashboard/pull-request` - Pull request workflow
- `/dashboard/github` - GitHub App connection status and controls
- `/dashboard/settings` - Application settings

## Notes

- The app uses server-side auth helpers in `lib/auth.ts` and `features/auth/actions`.
- PostgreSQL is required for Prisma and Better Auth persistence.
- Webhooks and background jobs are wired through `app/api/github`, `app/api/razorpay`, and `app/api/inngest`.