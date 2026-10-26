# PE-I syllabus mapping

This document maps the syllabus supplied for this revision to the actual implementation. See [FLOW_OF_CONTROL.md](FLOW_OF_CONTROL.md) for the execution trace, every file and viva answers, and [DECISIONS.md](DECISIONS.md) for implementation tradeoffs.

| Supplied topic | Project example | Where to explain it |
| --- | --- | --- |
| HTML | Semantic page sections, labels, forms, buttons and links | index.html, Pages, components/ui |
| CSS | Variables, responsive Grid/Flexbox, shared controls and page styles | styles/global.css, styles/ReviewsPage.css |
| JavaScript | Modules, arrays/objects, map/filter/some/sort, spread, event handlers, Promises | services/bookings.js, services/api.js, data/mockData.js |
| DOM manipulation | Root mounting, dialog focus/keyboard handling, outside-click detection | main.jsx, Modal.jsx, CampusSelector.jsx |
| React basics | Components, JSX, props, state, lists/keys, conditional rendering | StudentCard.jsx, RatingDisplay.jsx, MySkills.jsx |
| React Router basics | BrowserRouter, Routes, Route, Link, NavLink, params, query strings and navigation | App.jsx, AppLayout.jsx, Search.jsx, StudentProfile.jsx |
| Navigation layout and page structure | Shared sidebar/top bar with a matching page rendered as children | AppLayout.jsx, App.jsx |
| Multi-page SPA / portfolio-routing learning objective | Distinct URLs and page components within one HTML app shell | Route table in App.jsx; no separate HTML file for each page |
| Context API | Shared booking/skill state and global notifications | WorkspaceProvider.jsx, workspaceContext.js, Toasts.jsx, toastContext.js |
| State architecture: global versus local | Context for shared workspace; App props for user/campus; local form/tab/modal state | App.jsx, Bookings.jsx, Register.jsx |
| Intro to Redux Toolkit or Zustand | Conceptual alternatives and reasons to keep Context for this scope | DECISIONS.md section 2; viva answers in FLOW_OF_CONTROL.md |
| Async state and loading/error handling | Promise loaders, real fetch, stale-result cleanup and retry | useFetchData.js, Community.jsx, Loading.jsx, ErrorState.jsx |
| Shopping cart/dashboard learning objective | A booking dashboard demonstrates adding, listing, updating, removing and sharing records | BookingRequest.jsx, Bookings.jsx, WorkspaceProvider.jsx |
| Form handling in React | Controlled profile, login, booking and review forms | Register.jsx, Login.jsx, BookingRequest.jsx, ReviewsPage.jsx |
| Validation strategies | Blur/touched/submit validation, duplicate checks and date/time rules | Register.jsx, MySkills.jsx, services/bookings.js |
| Reusable input components | Shared labels, hints, errors, selects and text inputs | components/ui/Field.jsx, TextField.jsx, SelectField.jsx, TextAreaField.jsx |

## Useful supporting concepts

Custom hooks avoid repeating storage, loading and debounce logic. Context does not replace useState: the provider owns state and distributes it. localStorage does not replace Context: it saves data between page loads. CRUD does not require REST: workspace mutations here are local immutable updates. The Community page is the real HTTP fetch example.

Protected routes, pagination, toasts and dialogs support the core syllabus. Secure backend authentication, real teacher approval, a database, complex state libraries and distributed synchronization are outside this implementation.

## Recommended reading order

1. main.jsx and App.jsx: mounting and routing.
2. AppLayout.jsx and StudentCard.jsx: composition, props and navigation.
3. WorkspaceProvider.jsx and MySkills.jsx: shared versus local state.
4. Register.jsx and components/ui: controlled forms and validation.
5. BookingRequest.jsx, Bookings.jsx and services/bookings.js: event-to-state flow and CRUD.
6. useFetchData.js, Students.jsx and Community.jsx: async state and array transformations.
7. Modal.jsx and CampusSelector.jsx: deliberate DOM interaction and cleanup.
8. FLOW_OF_CONTROL.md and DECISIONS.md: prepare the viva explanation.
