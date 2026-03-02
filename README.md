# Booking Component – Emdula Test Assignment

A high-fidelity booking component for a real estate CRM landing page, implemented from a Figma design. Allows clients to select a consultation date and time slot, fill in contact details, and receive a booking confirmation.

**Live demo:** https://schedule-xd8p.onrender.com

---

## Tech Stack

| Layer         | Choice                       | Rationale                                                            |
| ------------- | ---------------------------- | -------------------------------------------------------------------- |
| UI            | React 18                     | Component model aligns with Figma's atomic structure                 |
| Styling       | Tailwind CSS + design tokens | Figma token system mapped directly to `tailwind.config.js`           |
| State         | Zustand + `persist`          | Lightweight, no boilerplate; drafts survive accidental refresh       |
| Data fetching | TanStack React Query         | Handles loading/error/caching for slot fetching and booking mutation |
| API mock      | MSW 2                        | Service Worker intercepts; runs in both dev and demo deploy          |
| Testing       | Vitest + Testing Library     | 13 unit tests covering atom components                               |
| CI            | GitHub Actions               | lint + test on every push                                            |

---

## Architecture

Follows **Atomic Design** (`atoms → molecules → organisms`):

```
src/
├── components/
│   ├── atoms/        – Button, CalendarDay, SlotButton, InputField, TextArea
│   ├── molecules/    – BookingHeader, SlotPanel
│   └── organisms/    – DatePicker, BookingForm, SuccessScreen
├── constants/        – layout.js (single source of truth for all sizing values)
├── mocks/            – MSW handlers (GET /api/slots, POST /api/book)
├── store/            – useBookingStore (Zustand: step, draft, selectedDate, timezone)
└── utils/            – calendar.js, datetime.js
```

**Booking flow (3 steps):**

```
selection  →  form  →  success
```

- `selection` → calendar + slot panel (slide in on date pick)
- `form` → animated `translateX` slide; calendar/slots height collapse to `0`
- `success` → "You are scheduled" confirmation; same box, same animation system

**Layout system:** all pixel values live in `src/constants/layout.js` (`BOX_WIDTH`, `CALENDAR_WIDTH`, `getBoxHeight(rows)`, etc.) – no magic numbers in components.

---

## Running Locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run lint         # ESLint
npm run format       # Prettier
npm run test         # Vitest (watch mode)
npm run build        # production bundle
npm start            # serve production build (used by Render)
```

---

## Implementation Stages

The component was built in 6 iterative stages, each ending with a commit:

| #   | Branch                   | Scope                                                                  |
| --- | ------------------------ | ---------------------------------------------------------------------- |
| 1   | `main`                   | Project init: Vite + React + Tailwind + Zustand + React Query + MSW    |
| 2   |                          | UI Kit: color palette, Button atom (all states)                        |
| 3   |                          | DatePicker: calendar grid, timezone detection, navigation              |
| 4   | `feature/timeslots`      | SlotPanel, dynamic box height (4/5/6-row months), transitions          |
| 5   | `feature/booking-form`   | BookingForm, slide animation, BookingHeader, InputField/TextArea atoms |
| 6   | `feature/success-screen` | `POST /api/book` mutation, loading state, SuccessScreen component      |

---

## Known Limitations

- **Past time slots on today's date** are not yet automatically disabled. The calendar correctly blocks past _dates_, but slot generation for the current day does not yet filter out past hours. This is the remaining ~5% of the original spec.

---

## Development Process

The component was built using an **agentic development workflow**:

- An AI coding agent handled iterative code generation, refactoring, and debugging across all 6 stages.
- A CI-integrated **AI reviewerbot** ran on every PR and provided detailed feedback – covering code style, duplicate logic, prop contracts, and accessibility.
- Reviewerbot suggestions were evaluated and applied selectively (e.g., extracting `getTimezoneLabel` into a shared utility, fixing `allowedHosts` config).
- Human oversight was maintained throughout: architecture decisions, UX direction, and final judgment on all changes.

This workflow demonstrates how agent collaboration + automated review can accelerate delivery while keeping code quality accountable.

---

## Notes

Created as a test assignment for Emdula. Provided for evaluation purposes only.
