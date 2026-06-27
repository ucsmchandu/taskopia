# Taskopia Frontend

Taskopia is a Vite + React frontend for a local task marketplace. It connects hosts who post tasks with allies who browse, apply, complete work, and manage their task history.

The app includes Firebase authentication, role-based protected routes, host and ally dashboards, profile setup, task posting and applications, notifications, AI assisted task posting, AI task translation, and deployment support for Vercel or Docker/Nginx.

## Tech Stack

- **React 19** for the UI
- **Vite 7** for local development and production builds
- **React Router 7** for client-side routing
- **Firebase Web SDK** for authentication and Firestore setup
- **Axios** for backend API calls
- **TanStack React Query** for server state, caching, and invalidation
- **Tailwind CSS 4** for styling
- **React Toastify** for user feedback
- **Lucide React** for icons
- **Framer Motion, Motion, GSAP, Three.js, OGL** for motion and visual effects
- **Recharts** for dashboard analytics

## Frontend Setup

### Prerequisites

- Node.js 22 or a compatible current Node.js version
- npm
- Running Taskopia backend
- Firebase web app configuration

### Install Dependencies

From the frontend folder:

```bash
cd taskopia
npm install
```

### Environment Variables

Create a `.env` file in `taskopia/`.

```env
VITE_BACKEND_BASE=http://localhost:3000

VITE_FIREBASE_API_KEY=firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=firebase_app_id
```

Notes:

- Vite only exposes variables prefixed with `VITE_`.
- `VITE_BACKEND_BASE` should contain only the origin, for example `http://localhost:3000`. The code appends `/taskopia/u1/api` and `/taskopia/ai/api`.
- Firebase config is read in [src/Firebase/Firebase.jsx](src/Firebase/Firebase.jsx).
- Do not commit `.env` or production secrets.
- The backend uses HTTP-only cookies, so requests that need auth pass `withCredentials: true`.

### Run Locally

Start the backend first, then run:

```bash
npm run dev
```

The Vite dev server usually runs at:

```text
http://localhost:5173
```

The backend CORS config must allow this origin and credentials.

### Build and Preview

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Docker

The frontend Dockerfile builds the Vite app with Node and serves the generated `dist` folder through Nginx.

From the repository root:

```bash
docker compose up --build
```

The compose file maps the frontend container to:

```text
http://localhost:5173
```

Important Docker note: Vite environment variables are embedded during `npm run build`. If you build with Docker, make sure the required `VITE_*` values are available during the image build. The current [Dockerfile](Dockerfile) does not define build args, and `.dockerignore` excludes `.env`, so production Docker builds may need Docker build arguments or another environment injection strategy.

Also note that the Nginx image currently serves static files directly. If deep links like `/host/dashboard` are refreshed in Docker, Nginx may need an SPA fallback config similar to the Vercel rewrite.

## Deployment

The project includes [vercel.json](vercel.json):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This allows Vercel to serve React Router routes from `index.html`.

For Vercel deployment, set the same `VITE_*` variables in the Vercel project settings before building.

## Project Structure

```text
taskopia/
  index.html                    Vite HTML entry
  vite.config.js                Vite config with React and Tailwind plugins
  src/
    main.jsx                    React root and QueryClientProvider
    App.jsx                     Router, lazy-loaded pages, protected routes
    index.css                   Tailwind imports and shared CSS
    Firebase/Firebase.jsx       Firebase app, auth, and Firestore setup
    AuthContextApi/             Auth provider and backend session lookup
    ProtectedRoutes/            Role and auth route guard
    MainLayout/                 Shared page layout
    pages/                      Top-level route pages
    components/                 Shared and feature-specific components
```

Important component groups:

- `components/AllyDashboardComponents/`: ally dashboard views
- `components/HostDashboard.componets/`: host dashboard and task management views
- `components/AllyProfileComponents/`: ally profile setup, edit, and public profile
- `components/HostProfileComponents/`: host profile setup, edit, and public profile
- `components/ApplyingJobs/`: task detail, application, and applied-task screens
- `components/Chatting-Components/`: chat UI components
- `components/Notifications/`: notification icon, panel, and service functions
- `components/JobPostingComponents/`: post task button and styling

## Routing

Routes are defined in [src/App.jsx](src/App.jsx). Most pages are lazy-loaded with `React.lazy` and wrapped in `Suspense`.

Public routes:

| Path | Description |
| --- | --- |
| `/` | Home |
| `/login` | Login |
| `/signup` | Signup |
| `/job/listings` | Public task listings |
| `/password_reset` | Firebase password reset |
| `/about` | About page |
| `/how/it/works` | How it works page |
| `/contact` | Contact page |
| `/help-center` | Help center |
| `/safety-trust` | Safety and trust page |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms page |
| `/refund-policy` | Refund policy |

Protected host routes:

| Path | Description |
| --- | --- |
| `/post/job` | Host task posting form |
| `/profile/host` | Host profile setup and profile page |
| `/host/dashboard` | Host dashboard |
| `/task/details/:id` | Host task details |
| `/task/:id/applications` | Applicants for a host task |

Protected ally routes:

| Path | Description |
| --- | --- |
| `/profile/ally` | Ally profile setup and profile page |
| `/ally/dashboard` | Ally dashboard |
| `/apply/job/:applyTaskId` | Apply to a task |
| `/task/:taskId` | Ally task details |
| `/applied-tasks` | Ally applied tasks |
| `/view/applied/task/details/:taskId` | Applied task details |

Protected shared routes:

| Path | Description |
| --- | --- |
| `/ally/public/profile/:id` | Ally public profile |
| `/host/public/profile/:id` | Host public profile |
| `/chat/:taskId/:hostId` | Chat screen |
| `/report-problem` | Report problem page |

## Authentication and Protected Routes

Authentication state is managed in [src/AuthContextApi/AuthContext.jsx](src/AuthContextApi/AuthContext.jsx).

On app load, the frontend calls:

```text
GET {VITE_BACKEND_BASE}/taskopia/u1/api/auth/auth/me
```

The backend checks the `jwt` HTTP-only cookie and returns the current user. React Query stores this as the `authData` query.

[src/ProtectedRoutes/ProtectedRoute.jsx](src/ProtectedRoutes/ProtectedRoute.jsx) handles:

- Redirecting unauthenticated users to `/login`
- Redirecting users without completed profile setup to `/profile/ally` or `/profile/host`
- Blocking role-restricted routes when `allowedRoutes` does not include the user type

## Backend API Integration

Most backend calls use:

```js
`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/...`
```

Authenticated calls include:

```js
{ withCredentials: true }
```

Main backend areas used by the frontend:

- Auth: register, login, logout, auto sign-in, current user
- Host profile and ally profile setup/edit/read
- Task listing, task posting, task editing, task deletion
- Applications and completion requests
- Notifications
- AI task generation and translation

## AI Features

The frontend uses backend AI routes. Gemini keys are never stored in the frontend.

### AI Task Posting

File: [src/pages/HostPages/JobPosting.jsx](src/pages/HostPages/JobPosting.jsx)

Hosts can enter a rough task prompt and click **Generate with AI**. The frontend calls:

```text
POST {VITE_BACKEND_BASE}/taskopia/ai/api/post-task
```

Request body:

```json
{
  "userPrompt": "I need a person to help me move furniture from one house to another"
}
```

The response is applied to the task form:

- `taskTitle` -> title
- `taskDescription` -> description
- `category` -> category
- `taskBudget` -> budget
- `estimatedTimeHours` -> working hours

### AI Task Translation

File: [src/components/ApplyingJobs/TaskDetailsPage.jsx](src/components/ApplyingJobs/TaskDetailsPage.jsx)

Allies can translate a task description into Telugu, Hindi, Tamil, Kannada, Malayalam, or a custom language. The frontend calls:

```text
POST {VITE_BACKEND_BASE}/taskopia/ai/api/translate-task
```

Request body:

```json
{
  "taskDescription": "Need help moving household items from one home to another.",
  "requestedLanguage": "Telugu"
}
```

The translated text is displayed below the original task description.

## Location Features

The task posting page uses browser geolocation before allowing a host to post a task. It also calls OpenStreetMap Nominatim reverse geocoding:

```text
https://nominatim.openstreetmap.org/reverse
```

Location access is required for task posting because latitude and longitude are submitted with the task form.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Development Notes

- Keep reusable UI in `src/components`.
- Keep route-level pages in `src/pages`.
- Keep API calls using `VITE_BACKEND_BASE` so environments can change without code edits.
- Use `withCredentials: true` for backend routes that require the JWT cookie.
- Invalidate related React Query keys after mutations so dashboards and notifications refresh.
- Keep Firebase browser config in Vite env variables.
- Do not expose backend secrets, Gemini keys, Firebase service accounts, or JWT secrets in frontend env variables.

## Testing

There is no test script configured yet.

Recommended tests to add:

- Auth provider loading and unauthenticated redirect behavior
- `ProtectedRoute` role checks
- Login and signup form behavior
- Profile setup form submission
- Task posting form validation and AI field population
- Task listing filters and task details page
- Application submission and cancellation flows
- Notification panel read/mark-all-read behavior
- AI translation success and error states

## Useful Files

- [src/App.jsx](src/App.jsx): router and protected route wiring
- [src/main.jsx](src/main.jsx): React root and QueryClient setup
- [src/AuthContextApi/AuthContext.jsx](src/AuthContextApi/AuthContext.jsx): current user lookup
- [src/ProtectedRoutes/ProtectedRoute.jsx](src/ProtectedRoutes/ProtectedRoute.jsx): auth and role guard
- [src/Firebase/Firebase.jsx](src/Firebase/Firebase.jsx): Firebase setup
- [src/pages/HostPages/JobPosting.jsx](src/pages/HostPages/JobPosting.jsx): task posting and AI generation
- [src/components/ApplyingJobs/TaskDetailsPage.jsx](src/components/ApplyingJobs/TaskDetailsPage.jsx): task details and AI translation
- [src/components/Notifications/NotificationService.jsx](src/components/Notifications/NotificationService.jsx): notification API helpers
