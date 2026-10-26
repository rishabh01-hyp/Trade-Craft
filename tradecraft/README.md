# TradeCraft

A campus skill-exchange SPA aligned with PE-I: HTML, CSS, JavaScript, DOM interaction, React, React Router, Context API, async state and validated reusable forms.

## Start here

- [Flow of control and viva guide](FLOW_OF_CONTROL.md): startup, every route, state ownership, complete file map, crucial decisions and viva questions.
- [Implementation decisions](DECISIONS.md): review findings, fixes, alternatives and limitations.
- [Syllabus mapping](PROJECT_TOPICS.md): each supplied topic and where to demonstrate it.

## Run locally

From this directory:

```sh
npm install
npm run dev
```

If PowerShell blocks npm.ps1, use `npm.cmd` for the same commands.

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Features

- Routed discovery pages, categories, student profiles and campus search.
- Student directory with debounce, filters, sorting and pagination.
- Reusable profile inputs with inline validation.
- Browser-only demo profiles and sample login with return-to-requested-page navigation.
- Shared Context workspace with per-user persisted bookings and skills.
- Booking request, demo confirmation, rescheduling, completion and cancellation.
- Future-date and duplicate-slot checks.
- One review per completed session; given feedback separated from sample received ratings.
- Keyboard-friendly dialogs, toast notifications and loading/error/retry states.
- Community repositories loaded with fetch, with bundled fallback data.

## Try the workflow

Use sample login **2510990316 / Rishabh@123**, or register a new demo profile with a different ten-digit roll number. Registration does not collect a password; Login can continue the latest saved browser profile.

Browse a teacher, request a future session, open Bookings and select Pending. Use **Confirm (demo)**, then reschedule or complete the session from Upcoming. Open Reviews to give feedback. Refresh to check persistence.

## Architecture

`main.jsx → App → BrowserRouter → ToastProvider → WorkspaceProvider → AppLayout → active page`

App owns campus and demo user. Context owns bookings/skills and notifications. Pages own forms and UI flags. Custom hooks handle storage, async data and debounce. Plain CSS provides responsive layouts. No Redux, Zustand, form library or application backend is required.

## Demo boundaries

- Browser storage is local and editable; route guards and sample passwords are teaching examples, not secure authentication.
- Teacher confirmation/completion is simulated. No booking request is sent to another person.
- Sample students and received ratings are fixtures. Registered profiles and personal skills do not change the public student directory.
- Slot checks compare start times, not duration overlap or real teacher calendars.
- Workspace keys include the roll number. Older unscoped storage is preserved but not automatically assigned to an account. New workspaces start empty.
- Only the latest registered profile has a continue button. Tabs do not synchronize live.
- GitHub may be offline or rate-limited; the fallback is bundled sample content.
- Hosting must serve index.html for SPA routes such as /students.

Automated checks cover data workflows, lint and production build. The browser walkthrough in FLOW_OF_CONTROL.md covers visual and interactive verification.
