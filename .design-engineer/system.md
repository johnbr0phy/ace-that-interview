# Design System — JobWiz Interview Coach

## Direction

**Personality:** Warmth & Approachability + Multi-tenant Brand Theming
**Foundation:** Warm neutrals (stone/slate) with brand color overlays
**Depth:** Subtle shadows — soft lift without complexity
**Feel:** Like a supportive mentor, not a cold tool

## Product Context

This is progressive-disclosure onboarding for interview preparation. Users are job seekers — potentially anxious, seeking confidence. Every screen should feel calm, focused, and encouraging.

**Design job:** Build trust and confidence through warmth, reduce cognitive load with single-question screens, create anticipation with the coach character.

## Tokens

### Spacing (4px base)
```
4px   — micro (icon gaps, inline spacing)
8px   — tight (within components, close relationships)
12px  — standard (between related elements)
16px  — comfortable (component padding)
24px  — generous (section separation)
32px  — major (screen sections)
48px  — dramatic (hero spacing)
```

### Colors — Neutral Foundation
```css
--stone-50: #fafaf9
--stone-100: #f5f5f4
--stone-200: #e7e5e4
--stone-300: #d6d3d1
--stone-400: #a8a29e
--stone-500: #78716c
--stone-600: #57534e
--stone-700: #44403c
--stone-800: #292524
--stone-900: #1c1917

--foreground: var(--stone-900)
--secondary: var(--stone-600)
--muted: var(--stone-400)
--faint: var(--stone-200)
--surface: #ffffff
--surface-elevated: var(--stone-50)
```

### Colors — Brand Overlays
Each company theme provides:
- `--primary` — main brand color
- `--primary-light` — tinted background
- `--primary-dark` — hover/active states
- `--secondary` — supporting accent
- `--gradient-start/end` — brand gradient

### Radius (soft, friendly)
```
8px  — small elements (badges, chips)
12px — medium (buttons, inputs, small cards)
16px — large (cards, panels)
24px — feature (hero cards, coach bubble)
9999px — pill (coach avatar)
```

### Typography
**Font:** Geist Sans (geometric but readable, modern)
**Scale:** 13, 14, 15, 16 (base), 18, 20, 24, 32
**Weights:** 400 (body), 500 (emphasis), 600 (headlines)

```css
/* Headlines */
font-weight: 600;
letter-spacing: -0.02em;

/* Body */
font-weight: 400;
line-height: 1.6;

/* Labels/UI */
font-weight: 500;
font-size: 14px;
```

### Shadows (subtle, single-layer)
```css
--shadow-sm: 0 1px 2px rgba(28, 25, 23, 0.05);
--shadow-md: 0 2px 8px rgba(28, 25, 23, 0.08);
--shadow-lg: 0 4px 16px rgba(28, 25, 23, 0.10);
```

### Animation
```css
--ease-out: cubic-bezier(0.25, 1, 0.5, 1);
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

Typewriter effect for coach: 30ms per character

## Patterns

### Coach Avatar
- Size: 56px (14 × 4px grid)
- Radius: full (pill)
- Background: --primary
- Icon: white, 32px
- Shadow: --shadow-md
- Pulse animation when speaking

### Speech Bubble
- Background: --surface-elevated
- Padding: 20px (5 × 4px)
- Radius: 24px, top-left: 4px (tail effect)
- Shadow: --shadow-sm
- Max-width: 400px
- Font: 18px, weight 400, line-height 1.6

### Question Card / Option Button
- Background: --surface
- Border: 2px solid --faint
- Padding: 16px
- Radius: 12px
- Hover: border-color → --primary at 50% opacity
- Selected: border-color → --primary, background → --primary-light

### Primary Button
- Height: 52px (touch-friendly, 13 × 4px)
- Padding: 16px 24px
- Radius: 12px
- Font: 17px, weight 600
- Background: --primary
- Shadow: --shadow-md
- Hover: --primary-dark

### Input Field
- Height: 52px
- Padding: 16px 20px
- Radius: 12px
- Border: 2px solid --faint
- Focus: border-color → --primary, shadow ring

### Progress/Loading
- Bar height: 8px
- Radius: full
- Background: --surface-elevated
- Fill: brand gradient
- Smooth transitions

## Layout

### Screen Structure
```
┌─────────────────────────────────────┐
│           Coach (top)               │
│         [Avatar + Bubble]           │
├─────────────────────────────────────┤
│                                     │
│         Question / Content          │
│         (centered, max-w-lg)        │
│                                     │
├─────────────────────────────────────┤
│           CTA Button                │
│         (bottom, sticky)            │
└─────────────────────────────────────┘
```

- Vertical centering with flexbox
- Horizontal: max-width 512px (32rem), centered
- Padding: 24px mobile, 48px desktop
- One question per screen (progressive disclosure)

### Responsive
- Mobile-first
- Touch targets: minimum 48px
- Full-width buttons on mobile
- Generous vertical spacing

## Avoid

- Dramatic drop shadows (too heavy)
- Multiple accent colors per screen
- Thick decorative borders
- Pure white on white (use stone-50 for elevation)
- Excessive spacing (>64px)
- Bouncy/spring animations (keep it calm)
- Gradients for decoration (only for brand identity)

## Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Warmth direction | Interview prep is emotional, users need confidence | 2026-01-18 |
| Subtle shadows | Approachable depth, not flat or heavy | 2026-01-18 |
| 52px buttons/inputs | Mobile-friendly touch targets | 2026-01-18 |
| 24px bubble radius | Friendly, speech-bubble feel | 2026-01-18 |
| Stone neutrals | Warm foundation that works with any brand color | 2026-01-18 |
| Typewriter effect | Creates anticipation, human pacing | 2026-01-18 |
