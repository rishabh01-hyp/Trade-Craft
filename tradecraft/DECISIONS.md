# Implementation decisions and review findings

These decisions describe the revised project, not an invented history of the original implementation. Read [FLOW_OF_CONTROL.md](FLOW_OF_CONTROL.md) for the execution trace, complete file map and viva questions.

## 1. Keep the existing marketplace and align it with PE-I

The supplied syllabus covers HTML/CSS/JavaScript, DOM interaction, React and basic routing, SPA navigation/layout, global versus local state, Context, introductory Redux Toolkit/Zustand, async state and reusable validated forms. The marketplace already demonstrates these concepts, so changing it into a portfolio or shopping cart would discard useful working features. The mini-project examples describe learning objectives; this application demonstrates equivalent routing and dashboard/state workflows.

**Viva answer:** "I used a skill marketplace to combine routed pages, shared workspace state and validated forms in one application."

## 2. Use Context and useState instead of adding a state library

`WorkspaceProvider` owns bookings and skills. `ToastProvider` owns notifications. Form inputs, tabs and modal flags stay in their pages. Campus and user state remain in App and use props because the path to consumers is short.

Redux Toolkit would add a store, slices and dispatch conventions; Zustand would add another dependency and store API. Both are useful alternatives for larger applications, but Context already meets the current needs and is explicitly in the syllabus. Context updates can rerender consumers; for this small dataset that is acceptable. More granular stores or context splitting can be introduced if measured performance requires them.

## 3. Remove the second booking data source

The old mock API read localStorage once when its module loaded. BookingRequest wrote new data directly to storage, while Bookings later read the old in-memory API copy. This could hide a newly created booking or overwrite newer changes.

Both pages now use the same Context state. `useLocalStorage` handles persistence after React commits, keeping updater functions pure. The unused generic API create/update/delete methods were removed: they expected array-shaped resources, but bookings were an object of three arrays. The remaining API module only queries the student directory.

**Viva answer:** "One source of truth prevents two screens from disagreeing. CRUD is implemented with immutable React state; it is not a real REST backend."

## 4. Keep account workspaces separate

Keys use `tradecraft_bookings_<rollNo>`, `tradecraft_skills_<rollNo>` and `tradecraft_reviews_<rollNo>`. The workspace provider's React key changes with the user so local state cannot carry across account changes. New users start with empty bookings and their registered teaching skills.

Older unscoped keys are left untouched and are not automatically assigned to an account, because their owner cannot be determined. Old sample booking fixtures remain in the data file for reference but no longer populate personal workspaces. This deliberately changes the initial Bookings screen from sample sessions to an empty state.

This is data organization within one browser, not a privacy boundary. A user with browser access can inspect or change localStorage. Separate tabs do not synchronize live; refreshing reloads stored state.

## 5. Make registration useful without pretending to implement secure auth

The old form validated passwords, saved only a profile and navigated home without signing in. The new profile could not use the sample-credential login.

Registration now explicitly creates a browser-only demo profile, signs it in and initializes its teaching skills. It does not collect a password. Login offers sample credentials and a button to continue the latest saved profile. The sample password form remains a controlled-form example. Real authentication, password storage, account recovery and authorization need a backend and are outside this syllabus-focused implementation.

Only the latest registered profile has a quick-continue button. Other per-roll workspace data remains stored. A future real account service should replace this demo mechanism.

## 6. Protect every workspace entry point and preserve the destination

The old `/book/:studentId` route allowed guests to create a request before encountering a protected Bookings page. Booking creation and Reviews now use the same guard as My Skills and Bookings. The guard saves the requested path/query in navigation state. Successful sign-in or registration returns to it.

**Viva answer:** "The guard demonstrates conditional rendering and navigation. It does not authorize server requests, because this project has no application server."

## 7. Make the booking lifecycle demonstrable

Pending requests can be explicitly confirmed with a **Confirm (demo)** action. `moveBooking` moves a record between arrays and updates its status. This prevents duplicate copies across tabs. Cancellation requires confirmation; rescheduling changes date/time; completion enables feedback.

Dates are stored as `YYYY-MM-DD` and times as `HH:mm` to match native inputs. Validation rejects missing/past timestamps and identical pending/upcoming time slots. Rescheduling excludes its own ID from the conflict check. Dates use the browser's local timezone. Duration overlap, teacher calendar constraints and cross-user scheduling are not implemented. Immediate completion is allowed for a classroom walkthrough.

## 8. Separate reviews given from reviews received

Previously, giving a teacher feedback also increased the user's own received-review distribution. Reviews now derive eligible sessions from completed bookings, store the booking ID and allow one review per session. New feedback appears under Reviews you gave and leaves sample received scores unchanged.

Sample received ratings are clearly identified as demo data. There is no server aggregating ratings across users.

## 9. Preserve asynchronous teaching examples while fixing retry

The mock loaders retain a short delay so loading states are visible. Community remains a real fetch example with error/retry and a bundled fallback. The retry attempt is now part of the request key, so pressing Retry shows loading and clears the obsolete error. Promise wrapping also catches synchronous loader failures. Cleanup ignores outdated requests.

The existing `useFetchData(load, dependencies)` interface is retained to keep page code small. It assumes simple serializable dependencies and requires callers to include every value the loader reads. An AbortController-based hook or query library would be an extension, not necessary for the current syllabus.

## 10. Keep storage failures recoverable

`storage.js` catches malformed JSON and unavailable browser storage, and checks the top-level expected shape. `useLocalStorage` returns a save-status flag so workspace/review pages can warn about unpersisted changes. Registration requires a successful profile write before declaring success.

This is intentionally lightweight validation, not a complete record schema validator. Manually edited records inside an otherwise valid array are not comprehensively validated. The browser remains a demo persistence layer, not a database.

## 11. Keep necessary DOM interactions and reusable forms

React handles content rendering. Direct DOM work is limited to mounting, focusing dialogs, trapping keyboard focus, restoring scroll/focus and detecting clicks outside the campus menu. The modal uses useRef and useEffect plus a normal keyboard event handler. Separating opening/closing effects from typing prevents the dialog from refocusing whenever a form field changes.

Native form elements provide keyboard behaviour and date/time controls. Shared Field/TextField/SelectField/TextAreaField components centralize labels, errors and accessibility links. Profile validation runs on blur, after touched-field edits and again on submit. No form library is needed for this form size.

## 12. Fix small failures with user-visible effects

- Added the missing `toast.info` alias used by skill removal and Community retry.
- Cleaned toast timers on provider unmount.
- Persisted campus choice; a changed campus remounts Students so its local filter resets consistently.
- Keyed the search input by the URL query and removed unnecessary double decoding of skill parameters.
- Added error/retry branches to all async discovery pages.
- Prevented duplicate registration skills and retained case-insensitive duplicate checks in My Skills.
- Changed Community wording from trending/cache claims to popular repositories and bundled samples.

## 13. Verification strategy

`npm test` uses Node's built-in test runner: no test dependency was added. Tests cover immutable booking transitions, slot conflicts, storage corruption/failure and filtering before pagination. `npm run lint` checks hooks and JavaScript issues. `npm run build` verifies compilation and production bundling.

These checks do not prove visual layout, browser keyboard behaviour or live GitHub availability. Use the demonstration checklist in FLOW_OF_CONTROL.md for those checks. No deployment or external account integration is part of this change.

## 14. What to improve next, beyond this submission

Introduce a backend for users, authorization, teacher availability and shared bookings; then replace mock reads and local mutations with real API calls. Add verified reviews, cross-device persistence and real session notifications. Introduce Redux Toolkit, Zustand or a query library only when the expanded state and server-data requirements justify them.
