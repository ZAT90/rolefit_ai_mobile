# RoleFit AI

<p align="center">
  <strong>Mobile career intelligence for serious job seekers.</strong>
</p>

<p align="center">
  RoleFit AI turns raw job descriptions into structured role-fit analysis, skill-gap insights, interview preparation, and recruiter outreach strategy.
</p>

<p align="center">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-0B1220?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-1E3A8A?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-14532D?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-1E40AF?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-111827?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="OpenAI" src="https://img.shields.io/badge/AI_Workflow-7C3AED?style=for-the-badge&logo=openai&logoColor=white" />
</p>

---

## Product Vision

Job seekers often paste job descriptions into AI tools and receive a long, generic response. RoleFit AI turns that habit into a product workflow.

Instead of acting like a chatbot, the app compares a saved candidate profile against a role and returns structured decision cards:

- fit score
- role summary
- required skills
- matched skills
- missing skills
- seniority signals
- resume positioning advice
- interview preparation questions
- recruiter outreach message
- next actions

The portfolio message behind this project is simple:

> I build AI-powered product workflows, not AI wrappers.

## Demo

The MVP is designed as a mobile-first workflow: profile context, role analysis, saved history, status tracking, and recurring skill-gap insights.

[Watch the demo video](docs/demo/rolefit-demo.mp4)

<p align="center">
  <img src="docs/screenshots/dashboard.png" width="220" alt="RoleFit AI dashboard" />
  <img src="docs/screenshots/new-analysis.png" width="220" alt="New analysis form" />
  <img src="docs/screenshots/analysis-detail.png" width="220" alt="Analysis detail screen" />
</p>

<p align="center">
  <img src="docs/screenshots/profile.png" width="220" alt="Candidate profile screen" />
  <img src="docs/screenshots/analyses-list.png" width="220" alt="Saved analyses list" />
  <img src="docs/screenshots/top-missing-skills.png" width="220" alt="Top missing skills screen" />
</p>

## Core Features

### Mobile App

- First-launch intro flow
- JWT-backed signup and login
- Secure token storage with `react-native-keychain`
- Candidate profile setup
- Chip-based profile inputs for skills, industries, and target roles
- New job analysis form
- AI-generated analysis detail screen
- Saved role analyses list
- Status tracking: saved, applied, interviewing, rejected, offer, ghosted
- Top missing skills chart
- Copy actions for outreach, job URL, and job description
- Loading, empty, and error states

### Backend API

- Express API written in TypeScript
- PostgreSQL persistence through Prisma
- JWT authentication middleware
- Profile create/update/read flow
- Job analysis persistence
- AI provider abstraction
- OpenAI provider integration
- Structured prompt builder
- AI response parser before database save
- Analysis status transition rules
- Aggregated missing-skill insights

## Tech Stack

| Area | Technology |
| --- | --- |
| Mobile | React Native, TypeScript, React Navigation |
| State | Redux Toolkit, RTK Query, redux-persist, redux-logger |
| Forms/UI | Custom mobile components, reducer-driven form state |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma |
| Auth | JWT, bcrypt, secure token storage |
| AI | OpenAI provider behind an AI service layer |
| Tooling | Postman collection, Prisma migrations, ESLint |

## Architecture

```txt
rolefit_ai_mobile/
  mobile/
    src/
      app/
        navigation/
      features/
        auth/
        profile/
        analyses/
      shared/
        components/
        lib/
        state/
      store/

  backend/
    src/
      config/
      middleware/
      modules/
        auth/
        users/
        profiles/
        analyses/
        ai/
      utils/
    prisma/
      schema.prisma
      migrations/

  docs/
    demo/
    screenshots/
```

## AI Workflow

The controller does not call the model directly. The backend keeps the AI workflow layered so it is easier to test, replace, and debug.

```txt
analysis.controller
  -> analysis.service
    -> get candidate profile
    -> buildJobAnalysisPrompt()
    -> aiProvider.generateText()
    -> parseAnalysisResponse()
    -> save structured result with Prisma
```

The AI receives structured context:

```json
{
  "candidateProfile": {
    "currentTitle": "Senior Full Stack Engineer",
    "yearsExperience": 8,
    "coreSkills": ["React Native", "React", "TypeScript", "Node.js"],
    "industries": ["Fintech", "SaaS", "Marketplace Platforms"]
  },
  "job": {
    "title": "Senior AI Product Engineer",
    "company": "Northstar AI",
    "description": "Full job description..."
  }
}
```

The backend expects structured analysis output, parses it, and stores the fields separately so the mobile app can render cards instead of one long AI paragraph.

## API Endpoints

### Auth

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create user account |
| `POST` | `/api/auth/login` | Login and receive access token |
| `GET` | `/api/auth/me` | Validate authenticated session |

### Profile

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/profile` | Create candidate profile |
| `GET` | `/api/profile/me` | Get current user's profile |
| `PUT` | `/api/profile/me` | Update candidate profile |

### Analyses

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/analyses` | Create AI role analysis |
| `GET` | `/api/analyses` | List saved analyses |
| `GET` | `/api/analyses/:id` | Get one analysis |
| `DELETE` | `/api/analyses/:id` | Delete analysis |
| `PATCH` | `/api/analyses/:id/status` | Update analysis status |
| `GET` | `/api/analyses/missingskills` | Get top repeated missing skills |

## Status Workflow

Role statuses are intentionally constrained so the app behaves like a real job-search tracker.

```txt
SAVED
  -> APPLIED
  -> INTERVIEWING
  -> REJECTED / OFFER / GHOSTED
```

The backend enforces allowed transitions, while the mobile UI only shows the next valid options.

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL
- Xcode and iOS Simulator for the mobile app
- OpenAI API key if using the real provider

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run prisma:generate
npm run build
npm start
```

For local development:

```bash
cd backend
npm run dev
```

### Mobile Setup

```bash
cd mobile
npm install
cd ios
pod install
cd ..
npm start
```

In another terminal:

```bash
cd mobile
npm run ios
```

## Environment Variables

Backend environment values live in `backend/.env`.

```bash
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rolefit_ai?schema=public"
JWT_SECRET="replace-this-with-a-long-random-development-secret"
JWT_EXPIRES_IN="7d"
AI_PROVIDER="mock"
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4o-mini"
```

Use `AI_PROVIDER="mock"` for local UI/backend testing without model cost. Use `AI_PROVIDER="openai"` when testing the real structured AI workflow.

## Prisma Migration Workflow

Whenever `backend/prisma/schema.prisma` changes, update the database and regenerate the Prisma client.

```bash
cd backend
npm run prisma:migrate -- --name descriptive_migration_name
npm run prisma:generate
npm run typecheck
npm run build
```

Examples:

```bash
npm run prisma:migrate -- --name add_recruiter_contacts
npm run prisma:migrate -- --name add_ghosted_analysis_status
npm run prisma:migrate -- --name add_analysis_stats
```

This same workflow applies when adding a new table, adding a relation, changing an enum, or updating constraints.

## What This Project Demonstrates

- React Native product workflow design
- Mobile-first AI UX with structured cards
- Redux Toolkit and RTK Query architecture
- Secure mobile auth session handling
- Express API layering
- Prisma/PostgreSQL persistence
- AI provider abstraction
- Prompt and parser separation
- Backend-owned status transition rules
- Product-minded portfolio storytelling

## Future Improvements

- Add refresh token rotation and logout endpoint
- Add AI response evaluation and regression tests
- Add provider fallback and retry strategy
- Add cost controls, caching, and usage limits for model calls
- Add resume import as a later workflow, not V1 scope
- Add richer analytics for missing skills over time
- Add result-sharing and PDF export
- Add automated mobile E2E tests

## Repository

This project is open for feedback from engineers, founders, recruiters, and product builders interested in mobile AI workflows and career-tech products.

Issues, suggestions, and thoughtful PRs are welcome.

```txt
https://github.com/ZAT90/rolefit_ai_mobile
```
