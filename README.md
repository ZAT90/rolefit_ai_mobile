# RoleFit AI

RoleFit AI is a mobile career intelligence platform that turns raw job descriptions into structured role-fit analysis, skill-gap insights, interview preparation, and recruiter outreach strategy.

The goal of this project is to demonstrate a production-style AI product workflow, not a basic chatbot or resume checker. The product is designed around structured mobile decision cards, backend-owned AI orchestration, and persistent user history.

## Positioning

RoleFit AI is built to show senior-level execution across:

- React Native mobile architecture
- TypeScript-first full-stack development
- Redux Toolkit state management
- RTK Query API orchestration
- Node.js and Express backend design
- PostgreSQL persistence with Prisma
- JWT authentication
- AI provider abstraction and structured response parsing
- Product-focused AI workflows

The portfolio message is:

> I build AI-powered product workflows, not AI wrappers.

## Monorepo Structure

```txt
rolefit_ai_mobile/
  mobile/      React Native app
  backend/     Express API, Prisma, AI workflow
  postman/     Local API testing collection
```

## Current MVP Status

Implemented:

- Mobile project scaffold
- Backend project scaffold
- PostgreSQL and Prisma schema
- JWT register/login backend flow
- Postman collection for API testing
- Redux Toolkit store
- RTK Query auth API slice
- Persisted auth state with AsyncStorage and redux-persist
- Redux logger in development
- Splash/auth/app stack navigation based on Redux auth state
- Centralized route name constants
- Custom `ScreenWrapper` with navigation-based back button
- Mobile login and signup screens wired to backend auth

Next:

- Candidate profile form integration
- Analysis submission screen integration
- Structured result cards
- History/dashboard API integration
- Real AI provider implementation

## Tech Stack

### Mobile

- React Native
- TypeScript
- React Navigation
- Redux Toolkit
- RTK Query
- redux-persist
- redux-logger
- AsyncStorage

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma
- JWT
- Bcrypt
- Zod

## Mobile Architecture

```txt
mobile/src/
  app/
    navigation/
      AppNavigator.tsx
      AppStack.tsx
      AuthNavigator.tsx
      MainTabs.tsx
      navigation.types.ts
      screenNames.ts

  features/
    auth/
      screens/
      services/
      store/
      types/

    profile/
      screens/

    analyses/
      screens/

  shared/
    components/
    lib/

  store/
    apiSlice.ts
    hooks.ts
    store.ts
```

### Navigation Model

The app uses Redux auth state to choose the visible navigation tree:

```txt
Splash
  -> if unauthenticated: AuthNavigator
  -> if authenticated: AppStack
```

Signup sets `needsProfileSetup: true`, which routes authenticated users into the profile setup flow before the main tabs.

Route names are centralized in:

```txt
mobile/src/app/navigation/screenNames.ts
```

### Redux Model

The mobile app uses:

- RTK Query for API calls
- regular Redux slices for app/session state
- persisted auth state only
- unpersisted API cache
- redux-logger in development

Auth persistence stores:

- `user`
- `token`
- `isAuthenticated`
- `needsProfileSetup`

## Backend Architecture

```txt
backend/src/
  app.ts
  server.ts

  config/
    env.ts
    prisma.ts

  middleware/
    authMiddleware.ts
    errorMiddleware.ts
    validateRequest.ts

  modules/
    auth/
    users/
    profiles/
    analyses/
    ai/

  utils/
    ApiError.ts
    asyncHandler.ts
    logger.ts
```

The analysis flow is intentionally layered:

```txt
analysis.controller
  -> analysis.service
    -> buildJobAnalysisPrompt()
    -> aiProvider.generateStructuredOutput()
    -> parseAnalysisResponse()
    -> save result with Prisma
```

This keeps the controller thin and makes the AI workflow testable, replaceable, and easier to debug.

## Database Schema

Core models:

- `User`
- `Profile`
- `JobAnalysis`
- `AnalysisStatus`

The schema is defined in:

```txt
backend/prisma/schema.prisma
```

## API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Profile

```http
POST /api/profile
GET  /api/profile/me
PUT  /api/profile/me
```

### Analyses

```http
POST   /api/analyses
GET    /api/analyses
GET    /api/analyses/:id
PATCH  /api/analyses/:id/status
DELETE /api/analyses/:id
```

## AI Workflow

The backend currently includes a mock AI provider so the full analysis pipeline can be exercised without external API keys.

AI infrastructure lives in:

```txt
backend/src/modules/ai/
```

RoleFit-specific prompt and parsing logic lives in:

```txt
backend/src/modules/analyses/
```

The intended structured output includes:

- fit score
- role summary
- required skills
- matched skills
- missing skills
- seniority signals
- resume positioning advice
- interview questions
- outreach message
- next actions

## Local Setup

### Prerequisites

- Node.js
- npm
- Xcode and iOS Simulator
- CocoaPods
- PostgreSQL

This project was developed against local Homebrew PostgreSQL using the macOS user:

```env
DATABASE_URL="postgresql://zat_km@localhost:5432/rolefit_ai?schema=public"
```

Adjust that value if your local PostgreSQL user is different.

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run build
npm start
```

The backend runs on:

```txt
http://localhost:4000
```

Health check:

```http
GET /health
```

## Mobile Setup

```bash
cd mobile
npm install
cd ios
pod install
cd ..
npm run ios
```

The mobile app currently calls:

```txt
http://localhost:4000/api
```

## Postman Collection

The local Postman collection is available at:

```txt
postman/rolefit_ai.postman_collection.json
```

It includes requests for:

- health check
- register
- login
- authenticated user
- profile create/update/get
- analysis create/list/detail/status/delete

The collection stores `token` and `analysisId` as variables after successful auth and analysis requests.

## Validation

Current checks used:

```bash
cd mobile
npx tsc --noEmit
npm run lint
```

```bash
cd backend
npm run typecheck
npm run build
```

## Portfolio Roadmap

This is Project 1 in a 2-month AI portfolio roadmap.

The two-week MVP target is:

- authentication
- candidate profile setup
- job description analysis
- AI-generated structured result
- result screen
- saved analysis history
- clean README
- screenshots
- short demo video
- LinkedIn build notes

## Product Principle

Most AI tools stop at generated text.

RoleFit AI is designed around a different principle:

> AI output should become structured, scannable, and actionable product workflow.
