# Taskopia

Taskopia is a Vite + React application that matches task hosts with allies. It includes authentication, Firebase integration, dashboards for hosts and allies, task posting & application flows, in-app chat, notifications, and protected routes.

## Features

- Authentication using `AuthContext` and Firebase
- Host and Ally dashboards, profiles, and analytics
- Task posting, application, and management flows
- Real-time chat and notifications
- Protected routes for authenticated pages
- Ready for Vercel deployment (`vercel.json` present)

## Prerequisites

- Node.js 16+ (or compatible)
- npm (or yarn)

## Quick Setup

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure (important items in `src/`)

- `src/App.jsx` — App entry and router setup
- `src/main.jsx` — React entry point
- `src/AuthContextApi/AuthContext.jsx` — Authentication context/provider
- `src/Firebase/Firebase.jsx` — Firebase initialization
- `src/MainLayout/Layout.jsx` — App layout (header/footer/sidebar)
- `src/components/` — Reusable UI components and grouped feature components
  - `AllyDashboardComponents/` — Ally dashboard pages and widgets
  - `HostDashboard.componets/` — Host dashboard pages and management tools
  - `AllyProfileComponents/`, `HostProfileComponents/` — Profile views and editors
  - `ApplyingJobs/` — Task application flows and details
  - `Chatting-Components/` — Chat UI and helpers
  - `Notifications/` — Notification UI and service
- `src/pages/` — Top-level route pages (Home, About, Contact, Login, Signup, etc.)
- `src/ProtectedRoutes/ProtectedRoute.jsx` — Route protection wrapper

## Notable files

- `vercel.json` — deployment config for Vercel
- `vite.config.js` — Vite configuration
- `package.json` — scripts and dependencies

## Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint across the project

## Dependencies (high-level)

Key runtime dependencies (see `package.json` for the full list and versions):

- `react` / `react-dom` — UI framework (React 19.x)
- `react-router-dom` — client-side routing
- `firebase` — Firebase SDK and integrations
- `axios` — HTTP client for API calls
- `tailwindcss` — utility-first CSS framework
- `@tanstack/react-query` — server state & data fetching
- `framer-motion`, `gsap`, `three` — animation / 3D libs used by UI
- `recharts` — charts and analytics components

## Dev Dependencies (high-level)

- `vite` — dev server and build tooling
- `@vitejs/plugin-react` — React plugin for Vite
- `eslint` and related plugins — linting
- TypeScript types for React (`@types/react`, `@types/react-dom`) — type support in editors

For exact versions, refer to `package.json` in the project root.

## Development notes

- UI is component-driven; many components are grouped by feature under `src/components/`.
- Authentication logic lives in `src/AuthContextApi/` and integrates with Firebase in `src/Firebase/`.
- Protected routes use `src/ProtectedRoutes/ProtectedRoute.jsx` to guard private pages.

## Deploy

This project is suitable for Vercel. You can deploy by connecting the repository to Vercel or running `vercel` from the CLI (project has `vercel.json`).

## Contributing

Please open issues or pull requests. Keep changes focused and include small, testable commits.

## License

Add license information here.
