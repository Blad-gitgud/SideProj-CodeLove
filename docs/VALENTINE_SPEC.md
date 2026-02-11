# Valentine’s Interactive Website

Developer-style spec and Copilot prompt for building a playful, interactive Valentine's Day site using Next.js + TypeScript.

## Project Overview

Goal: Build a multi-page, interaction-driven Valentine’s site with a cute romantic UI, smooth animations, and playful interactions.

Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS (recommended)
- Framer Motion (recommended)

## Flow (high-level)

Landing Page → "Will You Be My Valentine?" → Activity Selection → (optional) Final message

### 1) Landing Page (Home)
- Purpose: Strong emotional first impression.
- Features: Large heading `Happy Valentine’s Day!`, pink/red gradient, floating hearts, soft animations, rounded shapes, cute typography, large heart-shaped CTA button.
- Behavior: Heart button `onClick` → `router.push('/valentine-question')`. Hover: slight scale; click: small press animation.

### 2) "Will You Be My Valentine?" Page
- Layout: Question centered, large text.
- Buttons: `YES` and `NO`.
- `YES` behavior: `onClick` → `router.push('/activity-choice')`.
- `NO` behavior (playful): The NO button moves to a random position inside the container when clicked.
  - Positioning: container = `position: relative`; NO button = `position: absolute`.
  - Movement logic: compute `randomX/randomY` based on container width/height and set state `setPosition({ x, y })`.
  - Constraints: avoid overlapping question text, YES button, and container edges. Smooth transitions and optional bounce.
  - Add teasing microcopy like: “Are you sure? 👀” or “Try again 😌”. Keep it playful, not annoying.

### 3) Activity Selection Page
- Prompt: "What do you wanna do this Valentine’s Day?"
- Options: Two clickable cards (Cafe, Picnic) with image, text, rounded edges, shadow, hover scale.
- On click: show confirmation, trigger confetti, notification, or redirect to a final sweet message page.

## Design System (direction)
- Color palette: soft pink `#ffafcc`, rose red `#ff4d6d`, white, light pastels.
- UI: large border-radius (20px+), soft drop shadows, smooth transitions, floating background elements.
- Typography: rounded, friendly font (use Google Fonts or Tailwind + custom font).

## Technical Suggestions
- Use `useRouter()` for client-side navigation (`next/navigation`).
- Use `useState` and `useRef` to manage the NO button position and container bounds.
- Use Framer Motion for entrance/exit and playful micro-interactions.
- Use Tailwind CSS for rapid styling and responsive layouts.
- Consider accessibility: focusable buttons, reduced-motion preference, and sufficient contrast.

## Implementation Checklist
- [x] Landing page with heart CTA
- [x] Question page with YES/NO behavior
- [x] Activity-selection page with two option cards
- [ ] Confetti/celebration effect on successful YES
- [ ] Optional: background music toggle

## Copilot / Developer Prompt
Paste this at the top of a page file (e.g. `app/valentine-question/page.tsx`) to give Copilot a clear instruction set:

```tsx
/*
Valentine's Interactive Website - Copilot prompt

Flow:
1. Landing page with animated Valentine's theme and heart-shaped button that navigates to `/valentine-question`.
2. Question page: "Will you be my Valentine?"
   - `YES` navigates to `/activity-choice`.
   - `NO` moves to a random position inside the question container without overlapping the question text or the YES button.
     Use `position: absolute` for NO, container `position: relative`.
     Use state like `const [pos, setPos] = useState({ x: 0, y: 0 })` and update with safe random coords.
3. Activity selection page with two clickable cards (Cafe, Picnic) with images, hover scale and subtle shadow.

Styling: Tailwind CSS. Animations: Framer Motion for smooth transitions.
Keep interactions playful and accessible; respect `prefers-reduced-motion`.
*/
```

## Next steps (suggested)
- Create page scaffolds: `app/landing`, `app/valentine-question`, `app/activity-choice`.
- Build a small `ui/HeartButton` component and `ui/OptionCard` component.
- Add Framer Motion animations and Tailwind utilities.

---
Made to be copy-paste friendly for GitHub Copilot and quick developer onboarding.
