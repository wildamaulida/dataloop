# 📊 DataLoop — Complete Project Structure & Logic Flow (WEB MVP)

> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · PostgreSQL
> **Architecture:** Feature-based (domain-driven) · Monorepo-friendly layout

---

## 📁 Project Tree Structure

```
dataloop/
│
├── frontend/                                   # Next.js App (src/ layout)
│   ├── public/
│   │   ├── assets/
│   │   │   ├── images/                         # Static images (logo, hero, etc.)
│   │   │   ├── icons/                          # SVG icons
│   │   │   └── fonts/                          # Self-hosted fonts (if any)
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   │
│   │   ├── app/                                # Next.js App Router (pages & layouts)
│   │   │   ├── layout.tsx                      # Root layout (font, metadata, providers)
│   │   │   ├── page.tsx                        # Landing Page (/)
│   │   │   ├── not-found.tsx                   # 404 Page
│   │   │   ├── loading.tsx                     # Global loading skeleton
│   │   │   │
│   │   │   ├── (auth)/                         # Route Group — no prefix in URL
│   │   │   │   ├── layout.tsx                  # Auth-specific layout (centered card)
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx                # /login
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx                # /register
│   │   │   │   └── onboarding/
│   │   │   │       └── page.tsx                # /onboarding (Respondent profile setup)
│   │   │   │
│   │   │   ├── (researcher)/                   # Route Group — Researcher-only
│   │   │   │   ├── layout.tsx                  # Researcher shell (sidebar + header)
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx                # /dashboard (Researcher overview)
│   │   │   │   ├── survey/
│   │   │   │   │   ├── page.tsx                # /survey (Survey list)
│   │   │   │   │   ├── create/
│   │   │   │   │   │   └── page.tsx            # /survey/create
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx            # /survey/[id] (Detail)
│   │   │   │   │       ├── targeting/
│   │   │   │   │       │   └── page.tsx        # /survey/[id]/targeting
│   │   │   │   │       ├── distribution/
│   │   │   │   │       │   └── page.tsx        # /survey/[id]/distribution
│   │   │   │   │       ├── monitoring/
│   │   │   │   │       │   └── page.tsx        # /survey/[id]/monitoring
│   │   │   │   │       └── qc/
│   │   │   │   │           └── page.tsx        # /survey/[id]/qc
│   │   │   │   │
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx                # /settings (Researcher profile)
│   │   │   │
│   │   │   └── (respondent)/                   # Route Group — Respondent-only
│   │   │       ├── layout.tsx                  # Respondent shell (bottom nav + header)
│   │   │       ├── home/
│   │   │       │   └── page.tsx                # /home (Available surveys)
│   │   │       ├── survey/
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx            # /survey/[id] (Survey detail)
│   │   │       │       └── submit/
│   │   │       │           └── page.tsx        # /survey/[id]/submit (Proof upload)
│   │   │       ├── points/
│   │   │       │   └── page.tsx                # /points (Point history & balance)
│   │   │       └── profile/
│   │   │           └── page.tsx                # /profile
│   │   │
│   │   ├── components/                         # Shared, reusable UI components
│   │   │   ├── ui/                             # Primitive / Base UI elements
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Textarea.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── Avatar.tsx
│   │   │   │   └── Skeleton.tsx
│   │   │   │
│   │   │   ├── layout/                         # App-level layout shells
│   │   │   │   ├── Navbar.tsx                  # Top navigation bar
│   │   │   │   ├── Sidebar.tsx                 # Researcher sidebar
│   │   │   │   ├── BottomNav.tsx               # Respondent mobile nav
│   │   │   │   └── Footer.tsx
│   │   │   │
│   │   │   └── shared/                         # Cross-feature composite components
│   │   │       ├── SurveyCard.tsx              # Used in both roles
│   │   │       ├── StatsCard.tsx               # Metric display card
│   │   │       ├── EmptyState.tsx              # Zero-data placeholder
│   │   │       ├── ErrorBoundary.tsx
│   │   │       └── RoleGuard.tsx               # Conditional render by role
│   │   │
│   │   ├── features/                           # Domain modules (feature-based)
│   │   │   │
│   │   │   ├── auth/                           # Authentication domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   └── OnboardingForm.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.ts              # Login, logout, session state
│   │   │   │   ├── services/
│   │   │   │   │   └── authService.ts          # API calls: login, register, me
│   │   │   │   ├── types/
│   │   │   │   │   └── auth.types.ts           # User, Role, Session types
│   │   │   │   └── utils/
│   │   │   │       └── authHelpers.ts          # Token decode, role check
│   │   │   │
│   │   │   ├── survey/                         # Survey management domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── SurveyForm.tsx          # Create/edit form
│   │   │   │   │   ├── SurveyList.tsx          # List view for researcher
│   │   │   │   │   ├── SurveyDetail.tsx        # Detail view
│   │   │   │   │   └── SurveyStatusBadge.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useSurvey.ts            # Fetch single survey
│   │   │   │   │   └── useSurveyList.ts        # Fetch survey list
│   │   │   │   ├── services/
│   │   │   │   │   └── surveyService.ts        # CRUD API calls
│   │   │   │   ├── types/
│   │   │   │   │   └── survey.types.ts
│   │   │   │   └── utils/
│   │   │   │       └── surveyHelpers.ts        # Status label, date format
│   │   │   │
│   │   │   ├── targeting/                      # Respondent targeting domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── TargetingForm.tsx       # Age, gender, location filters
│   │   │   │   │   └── TargetingPreview.tsx    # Match count preview
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useTargeting.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── targetingService.ts     # Match API, save targeting
│   │   │   │   └── types/
│   │   │   │       └── targeting.types.ts
│   │   │   │
│   │   │   ├── distribution/                   # Survey distribution domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── DistributionSummary.tsx # Target vs. available count
│   │   │   │   │   └── RespondentTable.tsx     # Assigned respondent list + status
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useDistribution.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── distributionService.ts  # Start/stop distribution
│   │   │   │   └── types/
│   │   │   │       └── distribution.types.ts
│   │   │   │
│   │   │   ├── response/                       # Respondent submission domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── SurveyFillView.tsx      # Embedded form / redirect
│   │   │   │   │   └── ProofUpload.tsx         # Submission proof uploader
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useResponse.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── responseService.ts      # Submit, fetch responses
│   │   │   │   └── types/
│   │   │   │       └── response.types.ts
│   │   │   │
│   │   │   ├── points/                         # Point / reward domain
│   │   │   │   ├── components/
│   │   │   │   │   ├── PointBalance.tsx        # Current point display
│   │   │   │   │   └── PointHistoryList.tsx    # Transaction history
│   │   │   │   ├── hooks/
│   │   │   │   │   └── usePoints.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── pointsService.ts        # Fetch balance, history
│   │   │   │   └── types/
│   │   │   │       └── points.types.ts
│   │   │   │
│   │   │   └── quality-control/                # QC / validation domain
│   │   │       ├── components/
│   │   │       │   ├── QCResultTable.tsx       # Valid / Suspicious / Rejected table
│   │   │       │   └── QCStatusBadge.tsx
│   │   │       ├── hooks/
│   │   │       │   └── useQC.ts
│   │   │       ├── services/
│   │   │       │   └── qcService.ts            # Fetch QC results, flag response
│   │   │       ├── types/
│   │   │       │   └── qc.types.ts
│   │   │       └── utils/
│   │   │           └── qcRules.ts              # Business rules: min duration, consistency check
│   │   │
│   │   ├── hooks/                              # Global / shared hooks
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useToast.ts
│   │   │
│   │   ├── lib/                                # Core library utilities
│   │   │   ├── api.ts                          # Axios/fetch base instance + interceptors
│   │   │   ├── auth.ts                         # Session helpers (NextAuth or JWT)
│   │   │   └── queryClient.ts                  # React Query / SWR client setup
│   │   │
│   │   ├── context/                            # React Context providers
│   │   │   ├── AuthContext.tsx                 # User session & role
│   │   │   └── ToastContext.tsx                # Global toast/notification
│   │   │
│   │   ├── types/                              # Global shared TypeScript types
│   │   │   ├── api.types.ts                    # ApiResponse<T>, PaginatedResponse<T>
│   │   │   ├── common.types.ts                 # Pagination, Status enums
│   │   │   └── index.ts                        # Re-exports all types
│   │   │
│   │   ├── constants/                          # App-wide constants
│   │   │   ├── routes.ts                       # ROUTES object (all URL paths)
│   │   │   ├── roles.ts                        # ROLES enum: RESEARCHER, RESPONDENT
│   │   │   ├── status.ts                       # Survey/QC/Distribution status enums
│   │   │   └── config.ts                       # API base URL, feature flags
│   │   │
│   │   ├── utils/                              # Pure utility functions
│   │   │   ├── formatDate.ts
│   │   │   ├── formatPoints.ts
│   │   │   ├── cn.ts                           # Tailwind class merge (clsx + twMerge)
│   │   │   └── validators.ts                   # Zod schemas / form validation
│   │   │
│   │   └── styles/
│   │       └── globals.css                     # Tailwind directives + CSS variables
│   │
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── .env.local                              # Local env vars (gitignored)
│   ├── .env.example                            # Template for env vars
│   └── package.json
│
├── backend/                                    # Node.js — Express (modular)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                           # PostgreSQL pool connection
│   │   │   ├── env.ts                          # Validated env config (zod/dotenv)
│   │   │   └── cors.ts                         # CORS configuration
│   │   │
│   │   ├── modules/                            # Domain-based modular architecture
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts             # Business logic: login, register, token
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.middleware.ts           # JWT verify, role guard
│   │   │   │   └── auth.validator.ts           # Request body validation (zod/joi)
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── user.model.ts               # DB query layer (no ORM / raw SQL)
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── user.routes.ts
│   │   │   │
│   │   │   ├── survey/
│   │   │   │   ├── survey.model.ts
│   │   │   │   ├── survey.controller.ts
│   │   │   │   ├── survey.service.ts
│   │   │   │   ├── survey.routes.ts
│   │   │   │   └── survey.validator.ts
│   │   │   │
│   │   │   ├── targeting/
│   │   │   │   ├── targeting.model.ts
│   │   │   │   ├── targeting.controller.ts
│   │   │   │   ├── targeting.service.ts        # Match algorithm: filter users by criteria
│   │   │   │   └── targeting.routes.ts
│   │   │   │
│   │   │   ├── distribution/
│   │   │   │   ├── distribution.model.ts
│   │   │   │   ├── distribution.controller.ts
│   │   │   │   ├── distribution.service.ts     # Assign respondents, track status
│   │   │   │   └── distribution.routes.ts
│   │   │   │
│   │   │   ├── response/
│   │   │   │   ├── response.model.ts
│   │   │   │   ├── response.controller.ts
│   │   │   │   ├── response.service.ts
│   │   │   │   └── response.routes.ts
│   │   │   │
│   │   │   ├── quality-control/
│   │   │   │   ├── qc.model.ts
│   │   │   │   ├── qc.controller.ts
│   │   │   │   ├── qc.service.ts               # QC scoring: duration, consistency
│   │   │   │   └── qc.routes.ts
│   │   │   │
│   │   │   └── points/
│   │   │       ├── points.model.ts
│   │   │       ├── points.controller.ts
│   │   │       ├── points.service.ts           # Add/deduct points, fetch history
│   │   │       └── points.routes.ts
│   │   │
│   │   ├── middleware/                         # Global Express middleware
│   │   │   ├── errorHandler.ts                 # Centralized error handler
│   │   │   ├── authenticate.ts                 # JWT auth middleware
│   │   │   ├── roleGuard.ts                    # Role-based access control
│   │   │   └── rateLimiter.ts                  # Rate limiting  
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.ts                # JWT sign & verify
│   │   │   ├── hashPassword.ts                 # bcrypt wrapper
│   │   │   ├── apiResponse.ts                  # Standardized API response helper
│   │   │   └── logger.ts                       # Winston / pino logger
│   │   │
│   │   ├── types/
│   │   │   └── express.d.ts                    # Augment req.user type
│   │   │
│   │   └── app.ts                              # Express app setup (routes mounted)
│   │
│   ├── server.ts                               # HTTP server entry point
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── database/
│   ├── schema.sql                              # Full PostgreSQL schema (DDL)
│   ├── seed.sql                                # Dev seed data
│   └── migrations/                             # Versioned migration files
│       ├── 001_create_users.sql
│       ├── 002_create_surveys.sql
│       ├── 003_create_targeting.sql
│       ├── 004_create_distribution.sql
│       ├── 005_create_responses.sql
│       ├── 006_create_qc_results.sql
│       └── 007_create_points.sql
│
├── .gitignore
├── .prettierrc
├── .eslintrc.json
└── README.md
```

---

## 🗂️ Folder Explanation (Major Sections)

### Frontend (`frontend/src/`)

| Folder | Purpose |
|---|---|
| `app/` | All routes via Next.js App Router. Route groups `(auth)`, `(researcher)`, `(respondent)` keep URLs clean and allow role-specific layouts |
| `components/ui/` | Base UI primitives — Button, Input, Card, Modal, etc. Think of these as your design system atoms |
| `components/layout/` | App shells — Navbar, Sidebar, Footer. Mounted in `layout.tsx` files |
| `components/shared/` | Composite components used across features (SurveyCard, EmptyState) |
| `features/` | **Core of the app.** Each domain (auth, survey, targeting…) owns its own components, hooks, services, and types |
| `hooks/` | Global utility hooks (debounce, pagination, local storage) shared across features |
| `lib/` | Infrastructure utilities — API client, auth helpers, query client config |
| `context/` | React Context for global state (session, toast notifications) |
| `types/` | Global TypeScript interfaces — shared across features |
| `constants/` | App-wide enums and static values. Never hardcode strings inline |
| `utils/` | Pure functions — date formatting, class merging, form validators |
| `styles/` | Tailwind globals + CSS custom properties (design tokens) |

### Backend (`backend/src/`)

| Folder | Purpose |
|---|---|
| `config/` | DB connection, env validation, CORS |
| `modules/` | Each module = one domain. Controllers → Services → Models (layered) |
| `middleware/` | Global Express middleware: auth, error handler, rate limiter |
| `utils/` | Shared helpers: token generation, password hashing, standardized API responses |

### Database (`database/`)

| File / Folder | Purpose |
|---|---|
| `schema.sql` | Full table definitions (source of truth) |
| `seed.sql` | Dev/test dummy data |
| `migrations/` | Ordered, versioned SQL migration files |

---

## 📍 Where Does What Live?

| Concern | Location |
|---|---|
| **UI components (Button, Card)** | `frontend/src/components/ui/` |
| **Page layout (Sidebar, Navbar)** | `frontend/src/components/layout/` |
| **Feature UI (SurveyForm, QCTable)** | `frontend/src/features/<domain>/components/` |
| **API calls** | `frontend/src/features/<domain>/services/` |
| **Business rules / validation** | `frontend/src/features/<domain>/utils/` & `backend/src/modules/<domain>/service` |
| **Global state** | `frontend/src/context/` |
| **Feature-local state** | `frontend/src/features/<domain>/hooks/` |
| **Shared hooks** | `frontend/src/hooks/` |
| **Type definitions** | `frontend/src/features/<domain>/types/` + `frontend/src/types/` (global) |
| **QC scoring logic** | `frontend/src/features/quality-control/utils/qcRules.ts` + `backend/src/modules/quality-control/qc.service.ts` |
| **Constants & Enums** | `frontend/src/constants/` |
| **DB schema** | `database/schema.sql` + `database/migrations/` |

---

## 🏷️ Naming Conventions

| Category | Convention | Example |
|---|---|---|
| React Components | `PascalCase` | `SurveyForm.tsx`, `QCResultTable.tsx` |
| Hooks | `camelCase` prefixed `use` | `useSurvey.ts`, `useAuth.ts` |
| Services | `camelCase` suffixed `Service` | `surveyService.ts`, `pointsService.ts` |
| Types / Interfaces | `PascalCase` suffixed `Type` or `Props` | `SurveyType`, `LoginFormProps` |
| Constants | `SCREAMING_SNAKE_CASE` | `ROLES.RESEARCHER`, `ROUTES.DASHBOARD` |
| API Routes (Backend) | `kebab-case` | `/api/survey-targeting`, `/api/quality-control` |
| Module files (Backend) | `<domain>.<layer>.ts` | `survey.service.ts`, `auth.controller.ts` |
| Database tables | `snake_case` | `survey_targeting`, `qc_results` |
| Migration files | `NNN_<description>.sql` | `003_create_targeting.sql` |

---

## ✅ Best Practices

### Feature Isolation
> Each feature folder (`auth`, `survey`, `targeting`, etc.) is **self-contained**.
> It holds its own components, hooks, services, and types.
> This makes features deletable and replaceable without ripple effects.

### No Business Logic in Components
> - Components = **render only**
> - Hooks = **state + side effects**
> - Services = **API calls**
> - Utils = **pure transformations**

### Shared vs. Feature Components
> - If a component is used by **2+ features** → move to `components/shared/`
> - If it's used by **1 feature only** → keep inside `features/<domain>/components/`

### Centralized API Client
> All API calls go through `lib/api.ts` (Axios instance).
> Never call `fetch()` directly in components.
> Services import from `lib/api.ts` and handle endpoint logic.

### Type Safety End-to-End
> - Use `types/api.types.ts` for consistent response wrappers (`ApiResponse<T>`)
> - Each feature defines its own domain types in `features/<domain>/types/`
> - Never use `any` — use `unknown` and narrow

### Environment Config
> - Never hardcode URLs or secrets
> - Use `constants/config.ts` to read from `process.env`
> - Separate `.env.local` (frontend) and `.env` (backend), both gitignored

### Scalability Notes
> - **Landing page** lives at `app/page.tsx` — completely separate from dashboard layouts
> - **Route groups** `(researcher)` and `(respondent)` allow completely different UX shells
> - **Features folder** maps 1:1 to backend modules — easy to trace the full stack per feature
> - **Migrations** folder enables safe DB evolution without resetting schema

---

## 🔄 Logic Flow Documentation

### 1. User Authentication Flow

```
START
  ↓
Landing Page (app/page.tsx)
  ↓
User clicks CTA → /login
  ↓
LoginForm.tsx → authService.login()
  ↓
POST /api/auth/login → auth.service.ts
  ↓
Verify credentials → Return JWT + role
  ↓
AuthContext.tsx: set user session
  ↓
Redirect based on role:
  ├─ RESEARCHER → /dashboard
  └─ RESPONDENT → /home (+ /onboarding if first time)
```

---

### 2. Create & Upload Survey Flow

```
Researcher Dashboard (/dashboard)
  ↓
Click "Buat Survey Baru"
  ↓
/survey/create → SurveyForm.tsx
  ↓
Input: Title, Description, Form Link, Target Count
  ↓
surveyService.createSurvey() → POST /api/surveys
  ↓
survey.service.ts → INSERT into surveys table
  ↓
Status: draft → published
  ↓
Redirect → /survey/[id]/targeting
```

---

### 3. Targeting Respondent Flow

```
/survey/[id]/targeting → TargetingForm.tsx
  ↓
Input: Age Range, Gender, Location, Status
  ↓
targetingService.saveTargeting() → POST /api/surveys/:id/targeting
  ↓
targeting.service.ts → INSERT into survey_targeting
  ↓
TargetingPreview.tsx → GET /api/targeting/match-count
  ↓
targeting.service.ts → SELECT count(*) FROM users WHERE criteria match
  ↓
Preview: "X respondents available"
```

---

### 4. Survey Distribution Flow

```
/survey/[id]/distribution → DistributionSummary.tsx
  ↓
Button: "Mulai Distribusi"
  ↓
distributionService.start() → POST /api/surveys/:id/distribute
  ↓
distribution.service.ts:
  ├─ Query eligible respondents (match targeting)
  ├─ INSERT into survey_distribution (status: assigned)
  └─ Return assigned count
  ↓
RespondentTable.tsx shows assigned list with status
```

---

### 5. Submit Response + QC Flow

```
Respondent: /survey/[id]/submit → ProofUpload.tsx
  ↓
responseService.submit() → POST /api/responses
  ↓
response.service.ts → INSERT into responses
  ↓
Trigger QC automatically:
  ↓
qc.service.ts → QC Check:
  ├─ duration >= min threshold
  ├─ completionRate == 1.0
  └─ consistency score (anti-straight-lining)
  ↓
INSERT into qc_results:
  ├─ valid → award points
  ├─ suspicious → flag for review
  └─ rejected → no points
  ↓
points.service.ts → INSERT into points (if valid)
```

---

### 6. Points / Reward Flow

```
Response validated as VALID
  ↓
points.service.ts → addPoints(userId, surveyId, amount)
  ↓
INSERT into points table
  ↓
Respondent: /points → PointBalance.tsx + PointHistoryList.tsx
  ↓
pointsService.getHistory() → GET /api/points
  ↓
Display balance + per-survey history
```

---

### 7. Researcher Monitoring Flow

```
/survey/[id]/monitoring
  ↓
distributionService.getStatus() → GET /api/surveys/:id/distribution
  ↓
RespondentTable.tsx: assigned / completed / rejected per respondent
  ↓
ProgressBar.tsx: completed / target_count
  ↓
/survey/[id]/qc → QCResultTable.tsx
  ↓
qcService.getResults() → GET /api/surveys/:id/qc
  ↓
Show: valid ✅ / suspicious ⚠️ / rejected ❌
```

---

## 🔴 ERD Database DataLoop (MVP)

### 🧩 Entities

#### 1. users
| Field | Type | Description |
|---|---|---|
| `user_id` | UUID (PK) | Primary key |
| `name` | VARCHAR | Full name |
| `email` | VARCHAR (UNIQUE) | Email address |
| `password` | TEXT | Hashed (bcrypt) |
| `role` | ENUM('researcher', 'respondent') | User role |
| `created_at` | TIMESTAMP | Auto-generated |

#### 2. respondent_profiles
| Field | Type | Description |
|---|---|---|
| `profile_id` | UUID (PK) | Primary key |
| `user_id` | UUID (FK → users) | One-to-one |
| `age` | INT | Age |
| `gender` | VARCHAR | Gender |
| `location` | VARCHAR | Domisili |
| `status` | VARCHAR | Mahasiswa / umum / etc. |

#### 3. surveys
| Field | Type | Description |
|---|---|---|
| `survey_id` | UUID (PK) | Primary key |
| `user_id` | UUID (FK → users) | Researcher owner |
| `title` | VARCHAR | Survey title |
| `description` | TEXT | Survey description |
| `form_link` | TEXT | External form URL |
| `target_count` | INT | Target respondent count |
| `reward_points` | INT | Points per valid response |
| `status` | ENUM('draft', 'active', 'completed') | Survey state |
| `created_at` | TIMESTAMP | Auto-generated |

#### 4. survey_targeting
| Field | Type | Description |
|---|---|---|
| `target_id` | UUID (PK) | Primary key |
| `survey_id` | UUID (FK → surveys) | Linked survey |
| `min_age` | INT | Minimum age |
| `max_age` | INT | Maximum age |
| `gender` | VARCHAR | Gender filter (null = any) |
| `location` | VARCHAR | Location filter (null = any) |
| `status` | VARCHAR | Respondent status filter |

#### 5. survey_distribution
| Field | Type | Description |
|---|---|---|
| `distribution_id` | UUID (PK) | Primary key |
| `survey_id` | UUID (FK → surveys) | Linked survey |
| `respondent_id` | UUID (FK → users) | Assigned respondent |
| `status` | ENUM('assigned', 'completed', 'rejected') | Progress state |
| `assigned_at` | TIMESTAMP | When assigned |
| `completed_at` | TIMESTAMP | When submitted |

#### 6. responses
| Field | Type | Description |
|---|---|---|
| `response_id` | UUID (PK) | Primary key |
| `survey_id` | UUID (FK → surveys) | Linked survey |
| `user_id` | UUID (FK → users) | Respondent |
| `submitted_at` | TIMESTAMP | Submission time |
| `duration_seconds` | INT | Time spent on survey |
| `proof_url` | TEXT | Uploaded proof (optional) |

#### 7. qc_results
| Field | Type | Description |
|---|---|---|
| `qc_id` | UUID (PK) | Primary key |
| `response_id` | UUID (FK → responses) | One-to-one |
| `status` | ENUM('valid', 'suspicious', 'rejected') | QC verdict |
| `score` | FLOAT | QC confidence score (0–1) |
| `notes` | TEXT | Auto-generated QC notes |
| `reviewed_at` | TIMESTAMP | When QC ran |

#### 8. points
| Field | Type | Description |
|---|---|---|
| `point_id` | UUID (PK) | Primary key |
| `user_id` | UUID (FK → users) | Respondent |
| `amount` | INT | Points earned |
| `source_survey_id` | UUID (FK → surveys) | Source survey |
| `created_at` | TIMESTAMP | Transaction time |

---

### 🔗 Entity Relationships

```
users (researcher)    ──1:N──►  surveys
surveys               ──1:1──►  survey_targeting
surveys               ──1:N──►  survey_distribution
users (respondent)    ──1:N──►  survey_distribution
users (respondent)    ──1:1──►  respondent_profiles
users (respondent)    ──1:N──►  responses
responses             ──1:1──►  qc_results
users (respondent)    ──1:N──►  points
```

---

## 🧠 Key Notes (Product Perspective)

| Feature | Value |
|---|---|
| **Targeting** | Core differentiator — precision matching over mass broadcast |
| **QC** | What separates DataLoop from Google Form — data quality guarantee |
| **Points** | Engagement loop — drives respondent retention & return |
| **Distribution** | Semi-automated MVP → can evolve into AI-driven matching |
| **Route Groups** | `(researcher)` and `(respondent)` enable fully different UX without URL nesting |
| **Feature isolation** | Each domain folder is independently testable and replaceable |