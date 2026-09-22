# TradeCraft — Topics Covered & How They Are Implemented

TradeCraft is a campus peer-to-peer skill marketplace built with React 19 and Vite.
Students search for skills, browse teachers, check ratings and book sessions. On top
of the core marketplace it now includes a student directory with search/filter/sort,
a full CRUD booking workflow, toast notifications, modals, a validated registration
form, a simulated REST API layer, and a community page that consumes a real
third-party API (GitHub). This document lists every concept the project teaches,
explains it, then shows exactly where and how it is used in the code.

---

## Table of Contents

1. [Project Setup with Vite](#1-project-setup-with-vite)
2. [JSX and the React Entry Point](#2-jsx-and-the-react-entry-point)
3. [Components and Props](#3-components-and-props)
4. [Reusable Components with Default Props](#4-reusable-components-with-default-props)
5. [Rendering Lists with `map()` and Keys](#5-rendering-lists-with-map-and-keys)
6. [Conditional Rendering](#6-conditional-rendering)
7. [React State with `useState`](#7-react-state-with-usestate)
8. [Controlled Forms](#8-controlled-forms)
9. [Lifting State Up](#9-lifting-state-up)
10. [React Router — Routes and Navigation](#10-react-router--routes-and-navigation)
11. [URL Parameters with `useParams`](#11-url-parameters-with-useparams)
12. [Query Strings with `useSearchParams`](#12-query-strings-with-usesearchparams)
13. [Programmatic Navigation with `useNavigate`](#13-programmatic-navigation-with-usenavigate)
14. [Nested Layouts and Route Outlets](#14-nested-layouts-and-route-outlets)
15. [Protected Routes and Authentication](#15-protected-routes-and-authentication)
16. [Custom Hook — `useFetchData`](#16-custom-hook--usefetchdata)
17. [Custom Hook — `useLocalStorage`](#17-custom-hook--uselocalstorage)
18. [The `useEffect` Hook](#18-the-useeffect-hook)
19. [The `useRef` Hook](#19-the-useref-hook)
20. [Simulating an Async API with Promises](#20-simulating-an-async-api-with-promises)
21. [Array Methods for Data Transformation](#21-array-methods-for-data-transformation)
22. [The Context-free Data Layer](#22-the-context-free-data-layer)
23. [CSS Variables and Theming](#23-css-variables-and-theming)
24. [Responsive Layout with Flexbox and Grid](#24-responsive-layout-with-flexbox-and-grid)
25. [Accessibility in the UI](#25-accessibility-in-the-ui)
26. [Error Handling and Loading States](#26-error-handling-and-loading-states)
27. [The 404 Not Found Page](#27-the-404-not-found-page)
28. [Reusable Form Components](#28-reusable-form-components)
29. [Form Handling and Validation Strategies](#29-form-handling-and-validation-strategies)
30. [Toast Notifications](#30-toast-notifications)
31. [Modal Dialogs](#31-modal-dialogs)
32. [Search, Filter and Sort Patterns](#32-search-filter-and-sort-patterns)
33. [Debouncing Input with a Custom Hook](#33-debouncing-input-with-a-custom-hook)
34. [Pagination](#34-pagination)
35. [Consuming a REST API](#35-consuming-a-rest-api)
36. [Loading, Error and Retry States](#36-loading-error-and-retry-states)
37. [CRUD App Workflows](#37-crud-app-workflows)
38. [Working with Third-Party APIs](#38-working-with-third-party-apis)

---

## 1. Project Setup with Vite

**Topic:** Vite is a fast build tool and dev server for modern web apps. It uses
native ES modules during development for instant hot reload, and Rollup for
optimized production builds. A Vite project is configured through `vite.config.js`
and scripts in `package.json`.

**Implementation:** The project declares `dev`, `build`, `preview` and `lint`
scripts in `package.json:6-11` and registers the React plugin in `vite.config.js:5-7`.

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

```json
// package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

---

## 2. JSX and the React Entry Point

**Topic:** JSX lets you write HTML-like markup inside JavaScript. It compiles to
`React.createElement` calls. A React app mounts into a single DOM node using
`createRoot`, and `StrictMode` enables extra development checks.

**Implementation:** `index.html:10` provides the `<div id="root">` mount point.
`src/main.jsx` finds that node, imports the global stylesheet, and renders `<App />`.

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## 3. Components and Props

**Topic:** Components are reusable, self-contained pieces of UI. Props are
read-only inputs passed from a parent component to a child, similar to function
arguments. This keeps UI modular and testable.

**Implementation:** `StudentCard` receives a `student` object as a prop and
renders its name, ratings, taught skills and sessions. `SkillPage` maps over its
`teachers` array and passes each one down.

```jsx
// src/components/StudentCard.jsx
export default function StudentCard({ student }) {
  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <article className="list-item student-row">
      <span className="student-avatar">{initials}</span>
      <Link to={`/student/${student.id}`} className="student-name">
        {student.name}
      </Link>
      ...
    </article>
  )
}
```

```jsx
// src/Pages/SkillPage.jsx — parent passing props
{teachers.map((student) => (
  <StudentCard key={student.id} student={student} />
))}
```

---

## 4. Reusable Components with Default Props

**Topic:** Default parameter values make a component flexible without forcing
every caller to pass every prop. Destructuring with defaults is the idiomatic
React way to do this.

**Implementation:** `SearchBar` accepts `placeholder`, `large` and `initialQuery`
with sensible defaults, so it can be reused on the Home page, Search page and
elsewhere with different sizes.

```jsx
// src/components/SearchBar.jsx
export default function SearchBar({
  placeholder = 'Search skills...',
  large = false,
  initialQuery = '',
}) {
  const [query, setQuery] = useState(initialQuery)
  ...
}
```

```jsx
// Home page uses the large variant
<SearchBar placeholder="Search skills..." large />

// Search page seeds the input with the current query
<SearchBar placeholder="Search skills, categories, students..." initialQuery={query} />
```

---

## 5. Rendering Lists with `map()` and Keys

**Topic:** React renders arrays of elements by calling `.map()` on data. Each
element needs a stable, unique `key` prop so React can efficiently track which
items changed, were added or removed.

**Implementation:** Categories, skills, students, tags and reviews are all
rendered with `.map()` and a unique `key`.

```jsx
// src/Pages/Categories.jsx
{categories.map((category) => (
  <Link key={category.id} to={`/categories/${category.id}`} className="category-card">
    <span className="category-name">{category.name}</span>
    <span className="category-meta">{category.skills.length} skills</span>
  </Link>
))}
```

```jsx
// src/Pages/MySkills.jsx — keys from the skill name
{skills[column.key].map((skill) => (
  <div key={skill} className="skill-item">
    <span>{skill}</span>
  </div>
))}
```

---

## 6. Conditional Rendering

**Topic:** React renders different UI based on conditions using the `&&`
operator, the ternary operator, or early returns. This is how loading screens,
empty states and logged-in/logged-out views are handled.

**Implementation:** Pages early-return a `<Loading />` component while data is
being fetched. `Home` shows the greeting only when a user exists. `Search`
renders different sections depending on the results.

```jsx
// src/Pages/Home.jsx — early return for loading
const { data, loading } = useFetchData(() => fetchHomeData(), [])
if (loading) {
  return (
    <div className="page-content">
      <Loading full label="Loading your campus..." />
    </div>
  )
}
```

```jsx
// src/Pages/Home.jsx — && for a logged-in greeting
{user && <p className="hero-user">Signed in as roll no {user.rollNo}</p>}
```

```jsx
// src/Pages/SkillPage.jsx — ternary for empty state
{teachers.length > 0 ? (
  <section className="section">
    <h2 className="section-title">
      {teachers.length} student{teachers.length !== 1 ? 's' : ''} teaching this
    </h2>
    {teachers.map((student) => <StudentCard key={student.id} student={student} />)}
  </section>
) : (
  <p className="empty-state">
    No students teaching {decodedName} on {campus.name} yet.
  </p>
)}
```

---

## 7. React State with `useState`

**Topic:** `useState` adds local, reactive state to a function component.
Calling the setter triggers a re-render with the new value. State should be
updated immutably, never mutated directly.

**Implementation:** State drives the sidebar, tabs, form fields, dropdowns and
the campus selection. Note the immutable spread update in `BookingRequest`.

```jsx
// src/App.jsx
const [campusId, setCampusId] = useState(campuses[0].id)
const [user, setUser] = useLocalStorage('tradecraft_user', null)
```

```jsx
// src/Pages/Bookings.jsx
const [activeTab, setActiveTab] = useState('upcoming')
```

```jsx
// src/Pages/BookingRequest.jsx — immutable state update
setBookings((current) => ({
  ...current,
  pending: [booking, ...current.pending],
}))
```

---

## 8. Controlled Forms

**Topic:** A controlled form stores every input's value in React state and
updates it through `onChange`. The form's DOM value is always driven by state,
which makes validation and resetting straightforward.

**Implementation:** The Login form, Booking request form, Reviews form and
My Skills add-skill form all bind `value` to state and update via `onChange`,
with `e.preventDefault()` on submit.

```jsx
// src/Pages/Login.jsx
const [rollNo, setRollNo] = useState('')
const [password, setPassword] = useState('')

function handleSubmit(event) {
  event.preventDefault()
  const account = authenticate(rollNo, password)
  if (!account) {
    setError('Invalid roll number or password. Please try again.')
    return
  }
  setError('')
  onLogin({ rollNo: account.rollNo, name: account.name })
  navigate('/')
}
```

```jsx
// src/Pages/BookingRequest.jsx — a select and radio-style buttons
<select
  id="skill"
  className="form-select"
  value={skill}
  onChange={(event) => setSkill(event.target.value)}
  required
>
  <option value="">Select a skill</option>
  {student.teaches.map((option) => (
    <option key={option} value={option}>{option}</option>
  ))}
</select>
```

---

## 9. Lifting State Up

**Topic:** When two or more components need to share state, the state is moved
to their closest common parent and passed down via props plus a setter callback.
This is called "lifting state up".

**Implementation:** The selected campus lives in `App.jsx`, not inside
`CampusSelector`. It is passed to the layout and every page, and pages re-fetch
data whenever the campus changes.

```jsx
// src/App.jsx — state lives in the parent
const [campusId, setCampusId] = useState(campuses[0].id)
const campus = getCampusById(campusId)

<AppLayout campus={campus} onCampusChange={setCampusId} ...>
  <Routes>
    <Route path="/search" element={<Search campus={campus} />} />
    <Route path="/skill/:skillName" element={<SkillPage campus={campus} />} />
  </Routes>
</AppLayout>
```

```jsx
// src/components/CampusSelector.jsx — child reports the change upward
onClick={() => {
  onCampusChange(option.id)
  setOpen(false)
}}
```

---

## 10. React Router — Routes and Navigation

**Topic:** React Router maps URL paths to components, enabling client-side
navigation without full page reloads. `BrowserRouter` wraps the app, `Routes`
holds the route table, and `Link`/`NavLink` create navigable links.

**Implementation:** `App.jsx` defines all routes. `AppLayout` builds the sidebar
with `NavLink` (which knows when it is active) and `Link`.

```jsx
// src/App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home campus={campus} user={user} />} />
    <Route path="/search" element={<Search campus={campus} />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/categories/:categoryId" element={<CategoryDetail />} />
    <Route path="/skill/:skillName" element={<SkillPage campus={campus} />} />
    <Route path="/student/:studentId" element={<StudentProfile />} />
    <Route path="/book/:studentId" element={<BookingRequest />} />
    <Route path="/reviews" element={<ReviewsPage />} />
    <Route path="/login" element={<Login onLogin={setUser} />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

```jsx
// src/layouts/AppLayout.jsx — active link styling
<NavLink
  to={link.to}
  end={link.end}
  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
>
  {link.icon}
  {link.label}
</NavLink>
```

---

## 11. URL Parameters with `useParams`

**Topic:** Dynamic segments like `:studentId` in a route become accessible in the
component through the `useParams` hook. This lets one component render data for
many different records.

**Implementation:** `StudentProfile`, `CategoryDetail` and `SkillPage` all read
their dynamic segment and fetch the matching record.

```jsx
// src/Pages/StudentProfile.jsx
import { Link, useParams } from 'react-router-dom'

export default function StudentProfile() {
  const { studentId } = useParams()
  const { data: student, loading } = useFetchData(() => fetchStudent(studentId), [studentId])
  ...
}
```

```jsx
// src/Pages/SkillPage.jsx — decoding an encoded URL segment
const { skillName } = useParams()
const decodedName = decodeURIComponent(skillName)
```

---

## 12. Query Strings with `useSearchParams`

**Topic:** The `useSearchParams` hook reads and writes the query string (the
part after `?`). It is ideal for search terms, filters and pagination because the
URL stays shareable and bookmarkable.

**Implementation:** The Search page reads `?q=` from the URL and re-runs the
search whenever it changes.

```jsx
// src/Pages/Search.jsx
const [params] = useSearchParams()
const query = params.get('q') || ''

const { data, loading } = useFetchData(
  () => fetchSearchResults(query, campus.id),
  [query, campus.id]
)
```

---

## 13. Programmatic Navigation with `useNavigate`

**Topic:** `useNavigate` returns a function that changes the route from inside
event handlers or effects, rather than through a clickable link.

**Implementation:** `SearchBar` navigates to the search results URL when the form
is submitted. `Login` navigates home after a successful sign-in.

```jsx
// src/components/SearchBar.jsx
const navigate = useNavigate()

function handleSubmit(e) {
  e.preventDefault()
  if (query.trim()) {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }
}
```

```jsx
// src/Pages/Login.jsx
onLogin({ rollNo: account.rollNo, name: account.name })
navigate('/')
```

---

## 14. Nested Layouts and Route Outlets

**Topic:** A layout component wraps shared UI (sidebar, top bar) around the
active route. In this project the layout receives `children` and renders them
inside `<main>`, so every page keeps the same chrome.

**Implementation:** `AppLayout` renders the sidebar and top bar and places the
route content in a `<main>` element. It also special-cases the login page to hide
the chrome entirely.

```jsx
// src/layouts/AppLayout.jsx
export function AppLayout({ children, campus, onCampusChange, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const isLoginPage = pathname === '/login'
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} ... />
      <div className="main-area">
        <TopBar onMenuToggle={() => setSidebarOpen(true)} user={user} onLogout={onLogout} />
        <main>{children}</main>
      </div>
    </div>
  )
}
```

---

## 15. Protected Routes and Authentication

**Topic:** A protected route checks whether a user is authenticated before
rendering a page. If not, it redirects using `<Navigate replace />` so the
browser history is not polluted with the blocked page.

**Implementation:** `ProtectedRoute` guards `/my-skills` and `/bookings`. The
logged-in user is persisted in localStorage so a refresh keeps you signed in.

```jsx
// src/App.jsx
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

<Route
  path="/my-skills"
  element={
    <ProtectedRoute user={user}>
      <MySkills />
    </ProtectedRoute>
  }
/>
<Route
  path="/bookings"
  element={
    <ProtectedRoute user={user}>
      <Bookings />
    </ProtectedRoute>
  }
/>
```

```js
// src/data/loginCredentials.js — authentication logic
export function authenticate(rollNo, password) {
  return loginCredentials.find(
    (account) => account.rollNo === rollNo.trim() && account.password === password
  )
}
```

---

## 16. Custom Hook — `useFetchData`

**Topic:** A custom hook is a JavaScript function whose name starts with `use`
and that calls other hooks. It extracts and reuses stateful logic. This project's
`useFetchData` wraps an async loader and returns `{ data, loading, error, retry }`.

**Implementation:** It tracks a "request key" derived from the dependencies. If
the latest result's key does not match the current key, it is still loading. A
`cancelled` flag prevents setting state after unmount. A `retry` function bumps an
internal `attempt` counter so the same request can be re-run from an error state.

```js
// src/hooks/useFetchData.js
import { useEffect, useState, useCallback } from 'react'

export function useFetchData(load, deps) {
  const requestKey = JSON.stringify(deps)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ key: null, data: null, error: null })

  useEffect(() => {
    let cancelled = false

    load()
      .then((data) => {
        if (!cancelled) setResult({ key: requestKey, data, error: null })
      })
      .catch((error) => {
        if (!cancelled) setResult({ key: requestKey, data: null, error })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  return {
    data: result.data,
    loading: result.key !== requestKey,
    error: result.error,
    retry,
  }
}
```

```jsx
// src/Pages/Categories.jsx — consuming the hook
const { data: categories, loading } = useFetchData(() => fetchCategories(), [])
```

---

## 17. Custom Hook — `useLocalStorage`

**Topic:** This hook makes component state persistent by reading from and writing
to `localStorage`. It mirrors the `useState` API — returning `[value, setter]` —
so it is a drop-in replacement. The initializer function means localStorage is
read only once.

**Implementation:** Used for the logged-in user, saved bookings and My Skills
data, so they survive a page refresh.

```js
// src/hooks/useLocalStorage.js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  function updateValue(nextValue) {
    setValue((current) => {
      const resolved = typeof nextValue === 'function' ? nextValue(current) : nextValue
      localStorage.setItem(key, JSON.stringify(resolved))
      return resolved
    })
  }

  return [value, updateValue]
}
```

```jsx
// src/App.jsx — persistent login
const [user, setUser] = useLocalStorage('tradecraft_user', null)

// src/Pages/Bookings.jsx — persistent bookings
const [bookings, setBookings] = useLocalStorage('tradecraft_bookings', initialBookings)
```

---

## 18. The `useEffect` Hook

**Topic:** `useEffect` runs side effects after render — things like subscriptions,
DOM listeners, timers and data fetching. The dependency array controls when it
re-runs, and the returned cleanup function runs before the next effect or on
unmount.

**Implementation:** `CampusSelector` adds a document-level click listener to close
the dropdown when clicking outside, and removes it in cleanup. `ReviewsPage`
persists review changes to localStorage. `useFetchData` uses it to run the async
loader.

```jsx
// src/components/CampusSelector.jsx
useEffect(() => {
  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
}, [])
```

```jsx
// src/Pages/ReviewsPage.jsx — sync state to localStorage
useEffect(() => {
  try {
    localStorage.setItem('tradecraft_reviews', JSON.stringify(reviewsData))
  } catch (error) {
    console.error('Failed to save reviews to localStorage:', error)
  }
}, [reviewsData])
```

---

## 19. The `useRef` Hook

**Topic:** `useRef` holds a mutable value that persists across renders without
causing a re-render when changed. It is commonly used to reference a DOM node
directly.

**Implementation:** `CampusSelector` stores a reference to its wrapper element so
the outside-click handler can check whether the click happened inside it.

```jsx
// src/components/CampusSelector.jsx
const ref = useRef(null)

useEffect(() => {
  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
}, [])

return (
  <div className="campus-selector" ref={ref}>
    ...
  </div>
)
```

---

## 20. Simulating an Async API with Promises

**Topic:** Real apps fetch data over the network, which is asynchronous. This
project mocks that with `Promise`-returning functions and a `setTimeout` delay so
the UI genuinely exercises loading states.

**Implementation:** `mockData.js` defines a `delay` helper and exports async
`fetch*` functions. Every page consumes them through `useFetchData`.

```js
// src/data/mockData.js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchHomeData() {
  await delay(500)
  const dayNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  return {
    skillOfTheDay: skills[dayNumber % skills.length],
    discoverSkills,
    campusActivity,
  }
}

export async function fetchStudent(id) {
  await delay(400)
  return getStudentById(id) || null
}
```

---

## 21. Array Methods for Data Transformation

**Topic:** Modern JavaScript array methods — `filter`, `map`, `find`, `some`,
`sort`, `reduce` — form the backbone of data logic in React. They avoid manual
loops and keep logic declarative.

**Implementation:** `mockData.js` uses `filter` + `some` + `sort` to find teachers
for a skill. Search uses `includes` for fuzzy matching. `ReviewsPage` uses
`reduce` to total star votes.

```js
// src/data/mockData.js — filter, some, sort
export function getStudentsBySkill(skillName, campusId) {
  return students
    .filter(
      (student) =>
        student.campus === campusId &&
        student.teaches.some((skill) => skill.toLowerCase() === skillName.toLowerCase())
    )
    .sort((a, b) => b.teachingRating - a.teachingRating)
}
```

```js
// src/data/mockData.js — find
export function getStudentById(id) {
  return students.find((student) => student.id === id)
}
```

```jsx
// src/Pages/ReviewsPage.jsx — reduce for a total
const totalStarVotes = Object.values(summary.starDistribution || {}).reduce(
  (acc, curr) => acc + curr,
  0
) || 1
```

---

## 22. The Context-free Data Layer

**Topic:** Separating data and business logic from presentation is a core
architectural pattern. Components should not know where data comes from. This
project keeps all mock records and lookup functions in `src/data/` and all
reusable UI in `src/components/`.

**Implementation:** `mockData.js` exports raw arrays (`campuses`, `categories`,
`students`) plus pure helper functions (`getStudentById`, `getStudentsBySkill`)
and async fetchers. Pages import only what they need.

```js
// src/data/mockData.js — pure lookup helpers
export function getCampusById(id) {
  return campuses.find((campus) => campus.id === id) || campuses[0]
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id)
}

export function getSkillByName(name) {
  return skills.find((skill) => skill.name.toLowerCase() === name.toLowerCase())
}
```

```jsx
// src/Pages/CategoryDetail.jsx — page depends on the data layer, not the reverse
import { fetchCategory } from '../data/mockData'
const { data: category, loading } = useFetchData(() => fetchCategory(categoryId), [categoryId])
```

---

## 23. CSS Variables and Theming

**Topic:** CSS custom properties (`--name`) define reusable design tokens such as
colors, spacing and fonts. Because they live on `:root`, changing one variable
rethemes the whole app and keeps the design consistent.

**Implementation:** `global.css` defines a "Zed-inspired dark theme" with surface,
text, accent and spacing scales. Components reference these variables instead of
hard-coded values.

```css
/* src/styles/global.css */
:root {
  --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'Cascadia Mono', 'JetBrains Mono', 'Consolas', monospace;

  --bg: #0a0a0d;
  --surface: #101014;
  --border: #1e1e24;

  --text: #d4d4da;
  --text-secondary: #9b9ba6;

  --accent: #ff9e64;
  --accent-hover: #ffb07c;

  --radius: 6px;
  --space-md: 16px;
  --space-lg: 24px;
}
```

```css
/* Consumed elsewhere */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

## 24. Responsive Layout with Flexbox and Grid

**Topic:** Flexbox arranges items along one axis, while CSS Grid handles two
dimensions. Combined with media queries, they create layouts that adapt from
mobile to desktop.

**Implementation:** The app shell uses flex for the sidebar + main split, grid for
card collections like categories and stats, and the README notes the CSS is
mobile-first.

```css
/* src/styles/global.css — flex shell */
.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
}
```

```css
/* grid for card collections */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-md);
}
```

---

## 25. Accessibility in the UI

**Topic:** Accessible UI helps screen readers and keyboard users. Key practices:
use semantic HTML, label form controls, and use ARIA attributes (`aria-label`,
`aria-expanded`, `aria-hidden`, `role`) for custom widgets.

**Implementation:** The sidebar toggle has `aria-label`, the campus dropdown
reports `aria-expanded`, decorative icons are `aria-hidden`, and the loading
spinner uses `role="status"` with `aria-live`.

```jsx
// src/components/Loading.jsx
<div className={`loading ${full ? 'loading-full' : ''}`} role="status" aria-live="polite">
  <span className="loading-spinner" aria-hidden="true" />
  {label && <span className="loading-label">{label}</span>}
</div>
```

```jsx
// src/components/CampusSelector.jsx
<button
  type="button"
  className="campus-selector-btn"
  onClick={() => setOpen((current) => !current)}
  aria-expanded={open}
>
  {campus.name}
</button>
```

```jsx
// src/layouts/AppLayout.jsx
<button type="button" className="menu-toggle" onClick={onMenuToggle} aria-label="Open menu">
  &#9776;
</button>
```

---

## 26. Error Handling and Loading States

**Topic:** Async UIs need three states: loading, success and error. Good error
handling prevents crashes and gives users feedback. `try/catch` guards against
malformed persisted data, and `useFetchData` captures rejected promises.

**Implementation:** `useFetchData` stores any error thrown by the loader.
`ReviewsPage` wraps localStorage parsing and writing in `try/catch`, falling back
to default data.

```js
// src/hooks/useFetchData.js
load()
  .then((data) => {
    if (!cancelled) setResult({ key: requestKey, data, error: null })
  })
  .catch((error) => {
    if (!cancelled) setResult({ key: requestKey, data: null, error })
  })
```

```jsx
// src/Pages/ReviewsPage.jsx — defensive parsing with fallback
const [reviewsData, setReviewsData] = useState(() => {
  try {
    const saved = localStorage.getItem('tradecraft_reviews')
    return saved ? JSON.parse(saved) : defaultData
  } catch (error) {
    console.error('Failed to load reviews from localStorage:', error)
    return defaultData
  }
})
```

---

## 27. The 404 Not Found Page

**Topic:** A catch-all route (`path="*"`) handles any URL that does not match a
defined route. It keeps users inside the app instead of showing a browser error.

**Implementation:** `App.jsx` maps the wildcard path to `NotFound`, which shows a
friendly message and a link back home.

```jsx
// src/App.jsx
<Route path="*" element={<NotFound />} />
```

```jsx
// src/Pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="page-content">
      <div className="not-found">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  )
}
```

---

## 28. Reusable Form Components

**Topic:** A form is built from small, reusable input components instead of raw
`<input>`/`<select>`/`<textarea>` tags scattered across pages. Each primitive
owns its label, placeholder, hint and inline validation error, so every form gets
consistent markup, styling and accessibility for free.

**Implementation:** `src/components/ui/` holds four primitives. `Field` renders the
label + error wrapper, and `TextField`, `SelectField` and `TextAreaField` wrap real
inputs. They accept an `error` string, an `onBlur` handler (for blur validation) and
set `aria-invalid` when invalid.

```jsx
// src/components/ui/TextField.jsx — every primitive follows this shape
export default function TextField({
  label, id, value, onChange, onBlur, error, hint,
  type = 'text', placeholder = '', required = false, autoComplete = 'off',
}) {
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
    </Field>
  )
}
```

```jsx
// src/Pages/Register.jsx — composing primitives into a real form
<TextField
  label="Roll number"
  id="rollNo"
  value={values.rollNo}
  onChange={handleChange('rollNo')}
  onBlur={handleBlur('rollNo')}
  error={errors.rollNo}
  hint="10-digit college roll number"
/>
```

---

## 29. Form Handling and Validation Strategies

**Topic:** Forms are handled in React as controlled components — every value lives
in state and updates through `onChange`. Validation can run at different moments:
per-field on blur (immediate feedback), live while typing after a field was touched,
and a full pass on submit. A table of validator functions keeps the rules declarative.

**Implementation:** `Register.jsx` centralizes rules in a `validators` object and a
`validateField(name, value, allValues)` helper. Fields are validated on blur and
live once touched; `handleSubmit` runs `validateAll` and shows errors only if any
rule failed. The form uses `noValidate` to disable native browser popups so the
custom messages always show.

```js
// src/Pages/Register.jsx — declarative validator table
const validators = {
  rollNo(value) {
    if (!value.trim()) return 'Roll number is required.'
    if (!/^\d{10}$/.test(value.trim())) return 'Roll number must be exactly 10 digits.'
    return ''
  },
  password(value) {
    if (!value) return 'Password is required.'
    if (value.length < 8) return 'Password must be at least 8 characters.'
    if (!/[A-Z]/.test(value)) return 'Password needs at least one uppercase letter.'
    if (!/[0-9]/.test(value)) return 'Password needs at least one number.'
    return ''
  },
  confirmPassword(value, allValues) {
    if (value !== allValues.password) return 'Passwords do not match.'
    return ''
  },
}
```

```jsx
// Blur validation gives immediate feedback per field
function handleBlur(name) {
  return () => {
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, values[name], values),
    }))
  }
}
```

```jsx
// Submit validates everything and blocks on failure
function handleSubmit(event) {
  event.preventDefault()
  const nextErrors = validateAll(values)
  setErrors(nextErrors)
  const hasErrors = Object.values(nextErrors).some(Boolean)
  if (hasErrors) {
    toast.error('Please fix the highlighted fields and try again.')
    return
  }
  // persist profile + navigate home
}
```

---

## 30. Toast Notifications

**Topic:** Toast notifications are transient, non-blocking messages that confirm an
action (success), flag a problem (error) or share neutral info. They are usually
global — one provider renders a stack of toasts and any component can push one
through a hook.

**Implementation:** `ToastProvider` in `src/components/Toasts.jsx` keeps a `toasts`
array in state, auto-dismisses each toast after a duration using `setTimeout`
(cleaned up via a ref map), and renders them in a fixed top-right container.
The `useToast` hook (in `toastContext.js`) exposes `show`, `success`, `error` and
`dismiss`. `App.jsx` wraps the whole router with the provider.

```jsx
// src/components/Toasts.jsx — pushing and auto-dismissing
const push = useCallback((message, type = 'info', duration = 4200) => {
  const id = ++toastId
  setToasts((current) => [...current, { id, message, type }])
  timers.current.set(
    id,
    setTimeout(() => dismiss(id), duration)
  )
}, [dismiss])
```

```jsx
// Any page can raise a toast through the hook
import { useToast } from '../components/toastContext'
const toast = useToast()
toast.success(`Session request sent to ${student.name}.`)
```

```jsx
// src/App.jsx — provider wraps the whole app
<ToastProvider>
  <AppLayout ...>
    <Routes>...</Routes>
  </AppLayout>
</ToastProvider>
```

Toasts are used across `Login`, `Register`, `BookingRequest`, `Bookings`,
`ReviewsPage`, `MySkills` and `Community`.

---

## 31. Modal Dialogs

**Topic:** A modal is a dialog that blocks interaction with the page behind it until
it is closed. Good modals are accessible: `role="dialog"` + `aria-modal="true"`,
an `aria-label`, focus moved into the dialog on open, and close via the Escape key,
an explicit button, or a click on the overlay.

**Implementation:** `src/components/Modal.jsx` renders an overlay + panel only when
`open` is true. It focuses the panel on open, listens for `Escape` (with a cleanup),
and stops the overlay `mousedown` from bubbling when the panel itself is clicked.
`Bookings.jsx` uses it for two flows: confirming a cancellation and editing a
reschedule (an update).

```jsx
// src/components/Modal.jsx — Escape close + focus on open
useEffect(() => {
  if (!open) return undefined
  panelRef.current?.focus()
  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [open, onClose])
```

```jsx
// src/Pages/Bookings.jsx — a confirmation dialog
<Modal
  open={Boolean(confirmCancel)}
  onClose={() => setConfirmCancel(null)}
  title="Cancel this booking?"
  footer={
    <>
      <button type="button" className="btn-ghost" onClick={() => setConfirmCancel(null)}>
        Keep booking
      </button>
      <button type="button" className="btn btn-primary" onClick={cancelBooking}>
        Cancel booking
      </button>
    </>
  }
>
  <p className="modal-note">
    This will remove the {confirmCancel?.skill} session with {confirmCancel?.teacher}.
  </p>
</Modal>
```

---

## 32. Search, Filter and Sort Patterns

**Topic:** Real list UIs combine a search box, dropdown filters and a sort control.
The cleanest pattern is to describe the request declaratively (query string style
params: `q`, `department`, `sort`, `order`, `page`) and let one data layer apply
filtering, sorting and pagination — keeping the component dumb.

**Implementation:** The Students page keeps `query`, `department`, `campusFilter`,
`sort` and `page` in state and passes them as `params` to `api.get('students', ...)`.
The API layer filters with fuzzy `includes`, sorts numerically or lexically, and
slices the page. Changing any control resets the page to 1.

```jsx
// src/Pages/Students.jsx — declarative params drive the request
const { data, loading, error, retry } = useFetchData(
  () =>
    api.get('students', {
      params: {
        q: debouncedQuery,
        department,
        campus: campusFilter,
        sort: sortKey,
        order,
        page,
        pageSize: PAGE_SIZE,
      },
    }),
  [debouncedQuery, department, campusFilter, sortKey, order, page]
)
```

```js
// src/services/api.js — one layer does filter + sort + paginate
if (q) {
  items = items.filter(
    (item) =>
      matches(q, item.name) ||
      (item.teaches || []).some((s) => matches(q, s))
  )
}
if (department) items = items.filter((item) => item.department === department)
if (sort) {
  items.sort((a, b) => {
    const cmp = typeof a[sort] === 'number' ? a[sort] - b[sort] : String(a[sort]).localeCompare(String(b[sort]))
    return order === 'desc' ? -cmp : cmp
  })
}
const total = items.length
const start = (page - 1) * pageSize
const paged = Number.isFinite(pageSize) ? items.slice(start, start + pageSize) : items
return { items: paged, total }
```

---

## 33. Debouncing Input with a Custom Hook

**Topic:** Debouncing delays a value-changing operation until the input has stopped
changing for a short period. It prevents firing a search request on every keystroke.
The classic implementation uses `setTimeout` inside an effect, with cleanup clearing
the pending timer.

**Implementation:** `useDebouncedValue(value, delayMs)` returns the latest value that
has been stable for `delayMs`. Students uses a 350 ms delay for its search box;
Community uses 300 ms for its repo filter.

```js
// src/hooks/useDebouncedValue.js
import { useEffect, useState } from 'react'

export function useDebouncedValue(value, delayMs = 350) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
```

```jsx
// src/Pages/Students.jsx — the raw input updates instantly, the API query lags
const [query, setQuery] = useState('')
const debouncedQuery = useDebouncedValue(query, 350)
```

---

## 34. Pagination

**Topic:** Pagination splits a large result set into pages so the UI stays fast and
readable. The component receives the current page and the total page count, renders
numbered buttons (with ellipses for large ranges), and calls back when the user
changes the page.

**Implementation:** `src/components/Pagination.jsx` builds a "window" of page numbers
around the active page (1, last, neighbours) and inserts `…` gaps. The Students page
uses `PAGE_SIZE = 6` and renders the control below the list.

```jsx
// src/components/Pagination.jsx — numbered window with prev/next
const pages = []
for (let i = 1; i <= totalPages; i += 1) {
  if (i === 1 || i === totalPages || Math.abs(i - page) <= window) {
    pages.push({ type: 'page', value: i })
  } else if (pages[pages.length - 1]?.type !== 'gap') {
    pages.push({ type: 'gap' })
  }
}
```

```jsx
// src/Pages/Students.jsx — wired to the result set
const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
<Pagination page={page} totalPages={totalPages} onChange={setPage} />
```

---

## 35. Consuming a REST API

**Topic:** REST APIs expose resources through HTTP verbs: `GET` (read), `POST`
(create), `PUT` (update) and `DELETE` (remove). An app talks to them through a
service/client module that returns Promises, so components never touch raw network
code. The client also centralises latency, error types and auth headers.

**Implementation:** `src/services/api.js` is a small in-memory REST layer with the
exact shape of a real client. Every method goes through a shared `request()` wrapper
that adds simulated latency (and a configurable failure rate for demoing retries).
The database seeds from `mockData.js` and persists the `bookings` resource to
`localStorage`.

```js
// src/services/api.js — the HTTP-verb-shaped client
export const api = {
  // GET /students?q=&department=&sort=&page=&pageSize=
  async get(resource, { params = {} } = {}) { ... return { items, total } },
  async getOne(resource, id) { ... },
  // POST /bookings
  async create(resource, payload) { ... },
  // PUT /bookings/:id
  async update(resource, id, payload) { ... },
  // DELETE /bookings/:id
  async remove(resource, id) { ... },
}
```

```js
// src/services/api.js — shared wrapper adds latency + failures
async function request(fn) {
  await delay(LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN))
  if (Math.random() < FAILURE_RATE) {
    throw new ApiError('The request could not be completed. Please try again.', 503)
  }
  return fn()
}
```

```jsx
// src/Pages/Students.jsx — consuming a GET endpoint
const { data, loading, error, retry } = useFetchData(
  () => api.get('students', { params }),
  [debouncedQuery, department, campusFilter, sortKey, order, page]
)
```

---

## 36. Loading, Error and Retry States

**Topic:** Every asynchronous UI needs three states: loading, success and error.
Errors should not be silent — show a friendly message and give the user a way to
recover, usually a Retry button that re-runs the failed request.

**Implementation:** `src/components/ErrorState.jsx` renders a styled alert with a
`Retry` button wired to the `retry` function returned by `useFetchData`. The
Students page, Bookings page and Community page all branch on `loading`, `error`
and empty data.

```jsx
// src/components/ErrorState.jsx
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state-code">error</p>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
          &#8635; Retry
        </button>
      )}
    </div>
  )
}
```

```jsx
// src/Pages/Students.jsx — the three-state branch
{loading ? (
  <Loading full label="Loading students..." />
) : error ? (
  <ErrorState message={error.message || 'Failed to load students.'} onRetry={retry} />
) : students.length === 0 ? (
  <p className="empty-state">No students match those filters.</p>
) : (
  students.map((student) => <StudentCard key={student.id} student={student} />)
)}
```

---

## 37. CRUD App Workflows

**Topic:** CRUD (Create, Read, Update, Delete) is the foundation of most data-driven
apps. The same four operations map cleanly onto REST verbs: a create form is
`POST`, listing is `GET`, editing is `PUT` and removing is `DELETE`.

**Implementation:** The booking lifecycle is a complete CRUD workflow:
- **Create** — `BookingRequest.jsx` submits a new pending booking.
- **Read** — `Bookings.jsx` lists bookings in three tabs.
- **Update** — the Reschedule modal edits date/time of an upcoming session; the
  Complete action moves a session to `completed`.
- **Delete** — Cancel (guarded by a confirmation modal) removes a booking.

Mutations are written through pure state updaters that persist to `localStorage`
so the whole collection survives a refresh.

```jsx
// src/Pages/Bookings.jsx — update (PUT) via the reschedule flow
function saveReschedule(event) {
  event.preventDefault()
  if (!rescheduleTarget) return
  applyChange((current) => ({
    ...current,
    upcoming: current.upcoming.map((booking) =>
      booking.id === rescheduleTarget.id
        ? { ...booking, date: rescheduleDate, time: rescheduleTime }
        : booking
    ),
  }), 'Session rescheduled.')
  setRescheduleTarget(null)
}
```

```jsx
// src/Pages/Bookings.jsx — delete (DELETE) guarded by a confirmation modal
function cancelBooking() {
  if (!confirmCancel) return
  const id = confirmCancel.id
  applyChange((current) => ({
    ...current,
    pending: current.pending.filter((booking) => booking.id !== id),
    upcoming: current.upcoming.filter((booking) => booking.id !== id),
  }), 'Booking cancelled.')
  setConfirmCancel(null)
}
```

`MySkills.jsx` is a second, lighter CRUD example: create (Add), read (list),
update (per-column lists) and delete (remove a skill).

---

## 38. Working with Third-Party APIs

**Topic:** Real apps call external REST APIs from other services. The browser `fetch`
function performs the request; `response.ok` and `response.json()` handle the result.
Third-party calls can fail (offline, rate limits, 5xx), so robust UIs show loading,
surface errors with a retry, and fall back to cached/offline data.

**Implementation:** The Community page calls the **GitHub Search API** with `fetch`,
mapping the response to small repo objects. It uses tabs per topic, a debounced
filter, and the `useFetchData` hook. On failure it shows an `ErrorState` with a
Retry button *and* a curated fallback dataset (`githubFallbackRepos` in
`mockData.js`), so the page always has content.

```js
// src/Pages/Community.jsx — a real third-party request via fetch
async function fetchTrendingRepos(topicQuery) {
  const url = `${GITHUB_API}?q=${encodeURIComponent(topicQuery)}&sort=stars&order=desc&per_page=6`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`)
  }
  const payload = await response.json()
  return payload.items.map((repo) => ({
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description || 'No description provided.',
    stargazers_count: repo.stargazers_count ?? 0,
    language: repo.language || 'Unknown',
  }))
}
```

```jsx
// Loading, error-with-retry, then a live (or fallback) repo grid
{loading ? (
  <Loading full label={`Fetching ${topic.label} repos from GitHub...`} />
) : error ? (
  <>
    <ErrorState message={error.message} onRetry={handleRetry} />
    <p className="offline-note">Showing cached community data while the live API is unavailable.</p>
    <div className="repo-grid">
      {displayed.map((repo) => <RepoCard key={repo.full_name} repo={repo} />)}
    </div>
  </>
) : (
  <div className="repo-grid">
    {displayed.map((repo) => <RepoCard key={repo.full_name} repo={repo} />)}
  </div>
)}
```

---

## Summary Map

| Topic | Primary File(s) |
| --- | --- |
| Vite setup | `vite.config.js`, `package.json` |
| JSX / entry point | `src/main.jsx`, `index.html` |
| Components & props | `src/components/StudentCard.jsx`, `RatingDisplay.jsx` |
| Default props | `src/components/SearchBar.jsx`, `Loading.jsx` |
| Lists & keys | `src/Pages/Categories.jsx`, `src/Pages/MySkills.jsx` |
| Conditional rendering | `src/Pages/Home.jsx`, `Search.jsx`, `SkillPage.jsx` |
| `useState` | `src/App.jsx`, `src/Pages/Bookings.jsx`, `BookingRequest.jsx` |
| Controlled forms | `src/Pages/Login.jsx`, `BookingRequest.jsx`, `ReviewsPage.jsx` |
| Lifting state up | `src/App.jsx`, `src/components/CampusSelector.jsx` |
| React Router | `src/App.jsx`, `src/layouts/AppLayout.jsx` |
| `useParams` | `src/Pages/StudentProfile.jsx`, `SkillPage.jsx`, `CategoryDetail.jsx` |
| `useSearchParams` | `src/Pages/Search.jsx` |
| `useNavigate` | `src/components/SearchBar.jsx`, `src/Pages/Login.jsx` |
| Layouts | `src/layouts/AppLayout.jsx` |
| Protected routes | `src/App.jsx`, `src/data/loginCredentials.js` |
| `useFetchData` | `src/hooks/useFetchData.js` |
| `useLocalStorage` | `src/hooks/useLocalStorage.js` |
| `useEffect` | `src/components/CampusSelector.jsx`, `src/Pages/ReviewsPage.jsx` |
| `useRef` | `src/components/CampusSelector.jsx` |
| Async / Promises | `src/data/mockData.js` |
| Array methods | `src/data/mockData.js`, `src/Pages/ReviewsPage.jsx` |
| Data layer | `src/data/*.js` |
| CSS variables / theming | `src/styles/global.css` |
| Flexbox & Grid | `src/styles/global.css` |
| Accessibility | `src/components/Loading.jsx`, `CampusSelector.jsx` |
| Error & loading states | `src/hooks/useFetchData.js`, `src/Pages/ReviewsPage.jsx` |
| 404 page | `src/Pages/NotFound.jsx`, `src/App.jsx` |
| Reusable form components | `src/components/ui/Field.jsx`, `TextField.jsx`, `SelectField.jsx`, `TextAreaField.jsx` |
| Form handling & validation | `src/Pages/Register.jsx`, `Login.jsx`, `BookingRequest.jsx` |
| Toast notifications | `src/components/Toasts.jsx`, `toastContext.js` |
| Modal dialogs | `src/components/Modal.jsx`, `src/Pages/Bookings.jsx` |
| Search / filter / sort | `src/Pages/Students.jsx`, `src/services/api.js` |
| Debounce | `src/hooks/useDebouncedValue.js`, `Students.jsx`, `Community.jsx` |
| Pagination | `src/components/Pagination.jsx`, `src/Pages/Students.jsx` |
| REST API consumption | `src/services/api.js` |
| Loading / error / retry | `src/components/ErrorState.jsx`, `useFetchData.js`, `Students.jsx`, `Community.jsx` |
| CRUD workflows | `src/Pages/Bookings.jsx`, `BookingRequest.jsx`, `MySkills.jsx` |
| Third-party APIs | `src/Pages/Community.jsx`, `src/data/mockData.js` |
