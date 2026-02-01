# AGENTS.md

## Purpose

This document defines **how work should be done** in the Salarly (Expenses App) codebase. It exists to align human contributors and AI agents on structure, boundaries, and decision-making so the system stays coherent as it grows.

The rules below are intentionally **short, sharp, and opinionated**.

---

## What the App Is About

Salarly is a **personal finance platform** that helps users track, understand, and automate their money.

At its core, the app records **all money movement as transactions** (costs and revenues), then builds higher-level features—reports, insights, automation—on top of that single source of truth.

The goal is not just tracking expenses, but enabling **clarity, predictability, and future automation** across web and mobile.

---

## Mental Model (Read This First)

- Salarly is a **platform**, not a single app.
- The **Transaction** is the core business primitive.
- Apps are thin. **Packages hold the truth**.
- Mobile-first, API-first, automation-ready.

If a change violates one of these ideas, it is probably wrong.

---

## Monorepo Rules

1. **This is a PNPM monorepo**
   - `apps/*` contain product UIs (web, mobile).
   - `packages/*` contain shared logic, domain, and infrastructure.

2. **Do not duplicate logic across apps**
   - If logic is reused by more than one app, it belongs in `packages/`.
   - Apps should mostly orchestrate, not decide.

3. **Respect package boundaries**
   - Apps may depend on packages.
   - Packages must not depend on apps.

---

## Domain & Data Modeling

4. **Transaction is the single money primitive**
   - No separate `Expense` or `Income` models.
   - All money movement = `Transaction` with `type: cost | revenue`.

5. **Extend concepts, never fork them**
   - New ideas (tags, accounts, sources, imports) extend `Transaction`.
   - Do not introduce parallel models with overlapping responsibility.

6. **Relational integrity is non-negotiable**
   - Every transaction belongs to a user.
   - Categories are optional by design.
   - Prefer schema-level cascades over manual cleanup logic.

---

## Computed Recurring Transactions

Recurring transactions are treated as **computed, not duplicated** data.

- A recurring rule describes _how_ a transaction repeats.
- Individual occurrences are **derived at query or processing time**, not blindly stored in advance.
- This avoids data duplication, allows retroactive rule changes, and supports automation.

Agents should model **rules**, not pre-generated rows, unless there is a clear performance or accounting reason.

---

## Backend & Schema Rules

7. **Schema-first always**
   - Start with the data model.
   - If a field exists, it must have a clear reason.
   - Prefer enums and relations over free-form strings.

8. **Migrations are production events**
   - Any Prisma schema change must be migration-safe.
   - No experimental or throwaway schema edits.

9. **Errors are data**
   - Prefer structured error returns over throwing.
   - Be explicit and predictable.

10. **Design for future automation**

- Assume recurring rules, agents, and background jobs will exist.
- Avoid hard-coded assumptions (dates, frequencies, fixed categories).

---

## API, Web, and Mobile Rules

11. **API-first thinking**

- Backend changes must support multiple clients.
- UI convenience must never leak into the data model.

12. **Mobile auth is temporary scaffolding**

- Expo auth logic is mocked by design.
- Do not treat it as authoritative or permanent.

13. **Respect routing architecture**

- Auth rules live in layouts and middleware.
- Avoid ad-hoc redirects inside components.

---

## UI & Design System

14. **Design system first**

- If a component exists in `@salarly/ui`, use it.
- If it doesn’t exist, add it there—don’t bypass it.

15. **Consistency beats customization**

- Avoid one-off UI patterns inside apps.
- Shared look and behavior matter more than local polish.

---

## React Rules (Mandatory)

16. **Follow React best practices at all times**

- Keep components small and focused.
- Avoid unnecessary state and effects.
- Derive state instead of duplicating it.
- Never cause side effects during render.
- Prefer composition over prop drilling hacks.

17. **Hooks discipline**

- Follow the Rules of Hooks strictly.
- Custom hooks must do one thing clearly.
- No conditional hooks, no hidden side effects.

---

## Testing & Confidence

18. **Prefer user-level confidence**

- End-to-end and flow-based tests are preferred.
- Test behavior, not implementation details.

---

## Contribution Style

19. **Small, composable changes**

- One conceptual change per iteration.
- Avoid large, mixed-scope PRs or agent tasks.

20. **Name things carefully**

- Names must reflect domain language.
- If naming is unclear, add documentation.

21. **Optimize for clarity over cleverness**

- This codebase is meant to be read, not admired.
- Boring, explicit solutions are preferred.

---

## Non-Goals (Do Not Do These)

- Do not introduce duplicate domain concepts.
- Do not embed business logic inside UI components.
- Do not add mobile-only or web-only rules to shared models.
- Do not "quick-fix" schema problems in application code.

---

## Final Rule

When unsure, choose the option that:

- Preserves the Transaction-centric model
- Keeps logic centralized and explicit
- Makes future agents’ work easier

If a change makes the system harder to reason about, it is the wrong change.
