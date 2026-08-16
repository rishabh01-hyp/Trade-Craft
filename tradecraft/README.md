# TradeCraft

A campus peer-to-peer skill marketplace. Students teach what they know and learn from each other — search skills, browse teachers, check ratings, and book sessions across campuses.

## Features

- **Campus selector** — switch between Chitkara Punjab & Himachal
- **Skill of the Day** — daily rotating highlight
- **Search** — find skills and students by keyword
- **Categories** — browse Academic, Technology, Creative, Co-curricular, Sports & Fitness, and Professional skills
- **Student profiles** — teaching/learning ratings, session counts, availability, and modes (Google Meet, in-person, etc.)
- **Bookings** — request and track upcoming, pending, and completed sessions
- **My Skills** — view what you teach and what you're learning

## Tech Stack

- React 19 + Vite
- React Router v7
- React Context (campus state)
- Mock data layer (`src/data/mockData.js`) — swap in a real API later

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/   # SearchBar, StudentCard, RatingDisplay, CampusSelector
├── context/      # CampusContext (campus state)
├── data/         # mockData.js (skills, students, categories, bookings)
├── layouts/      # AppLayout
├── Pages/        # Home, Search, Categories, SkillPage, StudentProfile, BookingRequest, MySkills, Bookings
└── styles/       # global.css
```

## Scripts

| Script    | Description          |
| --------- | -------------------- |
| `dev`     | Start dev server     |
| `build`   | Production build     |
| `preview` | Preview the build    |
| `lint`    | Run ESLint           |
