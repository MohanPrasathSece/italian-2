# Aethel Capital

A modern cryptocurrency investment firm website for Aethel Capital. Built with Vite + React + TypeScript, shadcn/ui, Tailwind CSS, and Vercel Blob storage-backed auth with CRM lead capture.

## Technologies Used

- Vite (SPA build)
- TypeScript
- React 18
- React Router v6
- shadcn/ui components
- Tailwind CSS (Navy / Gold / Ivory theme)
- Framer Motion animations
- Vercel Blob (public-access user/session store)
- Express backend proxy for CRM lead management

## Getting Started

### Prerequisites

- Node.js 18+ & npm

### Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Copy environment variables:
   ```sh
   cp .env.example .env
   ```
   Fill in CRM tokens, Vercel Blob `BLOB_READ_WRITE_TOKEN`, and site URL.

3. Start the development servers (frontend + backend express proxy):
   ```sh
   npm run dev
   ```

4. Or build for production:
   ```sh
   npm run build
   ```

## Deployment

For Vercel deployments:
- API routes live in `api/*.cjs` (signup/login/contact)
- Frontend builds to `dist/`
- Set environment variables in Vercel project dashboard
