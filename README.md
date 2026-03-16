# AXON: Autonomous Career Engine

AXON is a full-stack professional career engine built for AI/Data Science students and professionals. It functions as an autonomous agent to help tailor resumes, identify skill gaps, and provide daily technical challenges.

## 🚀 Mission
Create a full-stack monorepo (Next.js 15+ + FastAPI) that functions as an autonomous career agent, leveraging Gemini 2.5 Flash for core intelligence.

## 🏗 Architecture
- **Monorepo**: Managed with Turborepo and pnpm.
- **Frontend (`apps/web`)**: 
  - Next.js 16 (App Router)
  - Tailwind CSS + Shadcn UI
  - `@react-pdf/renderer` for dynamic PDF generation.
- **Backend (`apps/api`)**:
  - FastAPI
  - `google-genai` SDK (Gemini 2.5 Flash)
- **Shared (`packages/shared`)**:
  - `master-profile.json`: Contains master project data and skill sets.

## ✨ Key Features
- **Tailor Engine**: Analyzes a Job Description and your Master Profile to select the top 2 relevant projects and rewrite their bullets for maximum ATS impact.
- **PDF Generator**: Renders your tailored profile into a clean, professional PDF template directly in the browser.
- **Daily Challenge**: Fetches a 15-minute coding challenge from the backend based on identified "Skill Gaps" in your profile.
- **Intelligence Dashboard**: Visualizes your career readiness and active growth sprints.

## 🛠 Tech Stack
- **AI**: Google Gemini 2.5 Flash
- **Frontend**: React, Next.js, Lucide React, Framer Motion
- **Backend**: Python, FastAPI, Pydantic
- **Styling**: Tailwind CSS
- **CI/CD**: GitHub Actions (`axon-ci.yml`)

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+
- Python 3.11+

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   - Create `apps/api/.env`:
     ```env
     GEMINI_API_KEY=your_key_here
     ```

### Running Locally
Run both apps simultaneously:
```bash
pnpm dev
```
Or individually:
- Frontend: `cd apps/web && pnpm dev`
- Backend: `cd apps/api && python main.py`

## 🧪 Verification & Testing
- **Frontend Build**: `cd apps/web && pnpm build`
- **Backend Lint**: `cd apps/api && flake8 .`

## 📄 License
MIT
