# Make Search Expand as Overlay

## Problem
Currently in `src/components/Navbar.tsx`, when the search icon is clicked, the search input animates from a 40px circle to a 256px-wide pill **inline within the navbar flex row**. Because it lives in the same flex container as the nav links and the language/login buttons, expanding it pushes neighboring elements around (nav links shift / get squeezed).

## Goal
The search should **overlay** on top of the navbar when expanded — neighboring elements stay perfectly still, and the expanded search pill floats above them, anchored to where the search icon sits.

## Approach

In `src/components/Navbar.tsx`, change the search wrapper (`searchWrapRef` block in the desktop right-side cluster) so that:

1. The wrapper keeps a fixed 40×40 footprint in the layout (so flex siblings never move).
2. The expanding form is **absolutely positioned** inside the wrapper, anchored to the right edge of the icon, expanding leftward as a floating overlay above the nav links.
3. Add a subtle shadow + solid background on the expanded state so it reads as floating above content.
4. The dropdown results panel stays anchored to the same right edge (already `right-0` — keep as-is).

### Technical details

- Wrapper: `relative w-10 h-10` (fixed slot, no growth).
- Form: `absolute right-0 top-0 h-10 rounded-full ...` with width transitioning from `w-10` (collapsed) to `w-72` (expanded).
- Add `z-10` so it overlays the nav links to its left.
- When expanded: `bg-background shadow-md border-border` for visual separation; when collapsed: transparent / matches current pill style so it looks identical at rest.
- Direction: expansion grows leftward naturally because the element is right-anchored and width increases.
- Mobile search (inside the mobile menu) is unchanged.
- No changes to search logic, results dropdown contents, or keyboard/escape behavior.

## Files
- `src/components/Navbar.tsx` — only the desktop search wrapper/form classes.

## Out of scope
- No changes to search results, ranking, or the `/search` page.
- No changes to the dropdown panel structure.
