# TradeCraft

A campus peer-to-peer skill marketplace. Students teach what they know and learn from
each other — search skills, browse teachers, check ratings and book sessions.

## Features

- Campus selector for Chitkara Punjab and Himachal
- Skill of the day on the home page
- Search across skills, categories and students
- Browse skills by category
- Student profiles with teaching/learning ratings and availability
- Booking requests that are saved in the browser
- My Skills page to manage what you teach and want to learn
- Demo login that protects the workspace pages

## Tech Stack

- React 19 + Vite
- React Router v7
- Plain CSS (mobile-first, Flexbox and Grid)
- Browser localStorage for saved data
- A mock data layer that simulates async API calls with Promises

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
├── components/   # SearchBar, StudentCard, RatingDisplay, CampusSelector, Loading
├── data/         # mockData.js (data + simulated async API)
├── hooks/        # useFetchData, useLocalStorage
├── layouts/      # AppLayout
├── Pages/        # Home, Search, Categories, CategoryDetail, SkillPage,
│                 # StudentProfile, BookingRequest, MySkills, Bookings, Login, NotFound
├── styles/       # global.css
└── App.jsx       # campus state, auth state and routes
```

## Notes

- Campus and login state are kept in `App.jsx` and passed down through props.
- `useFetchData` wraps the async data calls and exposes `{ data, loading, error }`.
- `useLocalStorage` keeps bookings and skills in the browser so they survive a refresh.

## Scripts

| Script    | Description          |
| --------- | -------------------- |
| `dev`     | Start dev server     |
| `build`   | Production build     |
| `preview` | Preview the build    |
| `lint`    | Run ESLint           |
