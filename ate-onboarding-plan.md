# JobWiz Narrative Onboarding: Claude Code Implementation Plan

## Overview

Build a Lemonade-style progressive disclosure onboarding for interview preparation. User arrives at `jobwiz.com/google/software-engineer` and enters a guided, conversational experience that feels like meeting a coach - not filling out forms.

**Core principle**: Every screen earns the right to ask for more. Value first, registration last.

---

## Phase 1: Foundation Setup

### Chunk 1.1: Project Scaffolding
**Goal**: Base Next.js 14+ project with strict TypeScript, Tailwind, and folder structure

- Initialize Next.js 14 with App Router
- Configure `tsconfig.json` with `strict: true` and `noUncheckedIndexedAccess: true`
- Set up Tailwind CSS with CSS variables approach (not hardcoded colors)
- Create folder structure:
  ```
  src/
  ├── app/
  │   ├── [company]/
  │   │   ├── [role]/
  │   │   │   └── page.tsx
  │   │   └── layout.tsx
  │   ├── api/health/route.ts
  │   └── globals.css
  ├── components/
  │   ├── ui/
  │   ├── onboarding/
  │   └── coach/
  ├── lib/
  │   ├── themes/
  │   ├── constants/
  │   └── utils/
  └── hooks/
  ```
- Add `.github/workflows/ci.yml` for lint/type-check/build
- Stub Supabase client files (not implemented yet)

**Acceptance**: `npm run build && npm run lint && npm run type-check` passes

---

### Chunk 1.2: shadcn/ui + Multi-Tenant Theming System
**Goal**: Component library foundation with company-aware theming

- Install and configure shadcn/ui with CSS variables
- Create base theme in `globals.css` using CSS custom properties:
  - `--primary`, `--primary-foreground`
  - `--accent`, `--accent-foreground`
  - `--background`, `--foreground`
  - `--muted`, `--muted-foreground`
  - `--card`, `--card-foreground`
  - `--border`, `--ring`
- Create `lib/themes/companies.ts` with theme definitions for:
  - Google (blue/green/red/yellow palette)
  - Meta (blue dominant)
  - Amazon (orange/black)
  - Apple (grayscale with blue accent)
  - Microsoft (blue/green/orange/yellow)
  - Netflix (red/black)
  - Default/fallback theme
- Create `ThemeProvider` component that:
  - Reads company from route params
  - Applies corresponding CSS class to body/html
  - Falls back to default theme for unknown companies
- Update `app/[company]/layout.tsx` to wrap children in ThemeProvider

**Acceptance**: Visiting `/google/swe` shows Google colors, `/meta/pm` shows Meta colors

---

### Chunk 1.3: Animation Infrastructure
**Goal**: Framer Motion setup with reusable animation variants

- Install `framer-motion`
- Create `lib/animations/variants.ts` with:
  - `fadeSlideIn` - for screen transitions (slide from right)
  - `fadeSlideOut` - for exiting screens (slide to left)
  - `staggerContainer` - for staggering child elements
  - `staggerChild` - individual items in a stagger group
  - `scaleIn` - for buttons/cards appearing
  - `typewriter` - for coach message reveals
- Create `components/ui/AnimatedContainer.tsx`:
  - Wraps `AnimatePresence` with `mode="wait"`
  - Accepts `layoutId` for shared element transitions
- Create `components/ui/StaggerGroup.tsx`:
  - Container that staggers children with configurable delay

**Acceptance**: Demo page showing all animation variants working

---

## Phase 2: Coach System

### Chunk 2.1: Coach Avatar Component
**Goal**: The "Maya" equivalent - a friendly presence throughout

- Create `components/coach/CoachAvatar.tsx`:
  - Circular avatar image (use placeholder initially)
  - Subtle idle animation (gentle float/pulse)
  - Size variants: `sm`, `md`, `lg`
  - Optional "speaking" state with animation
- Create `components/coach/CoachPresence.tsx`:
  - Fixed position component showing avatar
  - Configurable position (top-right default for desktop, bottom for mobile)
  - Responsive sizing
- Design decision: Coach is gender-neutral, friendly, professional
  - Use abstract/illustrated style, not photorealistic
  - Consider using a simple geometric avatar initially

**Acceptance**: Avatar renders, animates on idle, has speaking state

---

### Chunk 2.2: Speech Bubble / Message System
**Goal**: Coach "speaks" to users in conversational bubbles

- Create `components/coach/SpeechBubble.tsx`:
  - Chat bubble styling with tail pointing to avatar
  - Typewriter text animation (character by character)
  - Configurable typing speed
  - Shows cursor while typing, hides when complete
  - Support for emoji rendering
- Create `components/coach/CoachMessage.tsx`:
  - Combines avatar + speech bubble
  - Handles layout (avatar left/right)
  - Accepts `message` string and optional `delay` before typing starts
- Create `hooks/useTypewriter.ts`:
  - Custom hook for typewriter effect
  - Returns `{ displayText, isTyping, isComplete }`
  - Configurable characters per second

**Acceptance**: Coach message types out character by character with cursor

---

### Chunk 2.3: Contextual Coach Responses
**Goal**: Coach reacts to user choices with personality

- Create `lib/constants/coach-messages.ts`:
  - Organized by flow step and context
  - Structure:
    ```typescript
    type CoachMessages = {
      welcome: (company: string, role: string) => string;
      experienceResponse: (level: string) => string;
      timelineResponse: (urgency: string) => string;
      // etc.
    }
    ```
  - Messages should feel warm, encouraging, slightly playful
  - Include relevant emoji sparingly
  - Reference the specific company/role where appropriate
- Examples:
  - Welcome: "Hey! So you're preparing for {role} at {company}? Let's make sure you nail it. 💪"
  - Timeline (urgent): "This week? No pressure! Let's focus on what matters most."
  - Experience (none): "Everyone starts somewhere. I've helped hundreds of first-timers ace their interviews."

**Acceptance**: Different inputs produce different, contextual coach responses

---

## Phase 3: Question Components

### Chunk 3.1: Base Question Layout
**Goal**: Consistent, minimal one-question-per-screen layout

- Create `components/onboarding/QuestionLayout.tsx`:
  - Full viewport height, centered content
  - Coach message at top
  - Question/input area in middle
  - Subtle gradient background using theme colors
  - No visible navigation chrome (back button hidden but functional)
  - Keyboard navigation support (Enter to proceed)
- Create `components/onboarding/QuestionTitle.tsx`:
  - Large, readable typography
  - Animated entrance
  - Optional subtitle/helper text
- Mobile-first responsive design:
  - Stack vertically on mobile
  - More horizontal space usage on desktop

**Acceptance**: Clean, minimal question screen matching Lemonade aesthetic

---

### Chunk 3.2: Multiple Choice Question Component
**Goal**: Large, tappable option buttons (Lemonade's primary input)

- Create `components/onboarding/MultipleChoice.tsx`:
  - Props: `options: Array<{ id, label, emoji?, description? }>`
  - Props: `onSelect: (id) => void`
  - Props: `selected?: string` (for showing selection state)
  - Large pill/card buttons, full width on mobile
  - Staggered entrance animation
  - Selection state: fills with primary color
  - Hover/focus states with subtle scale
  - Auto-advance after selection (configurable delay ~300ms)
- Variants:
  - `default` - simple text options
  - `withEmoji` - emoji + text
  - `withDescription` - label + smaller description

**Acceptance**: Options animate in, selection highlights and triggers callback

---

### Chunk 3.3: Text Input Question Component
**Goal**: For open-ended inputs (name, specific details)

- Create `components/onboarding/TextInput.tsx`:
  - Large, minimal input field
  - Animated label that floats on focus
  - Clear button when has value
  - Enter key submits
  - Explicit "Continue" button appears when valid
- Create `components/onboarding/CompanyAutocomplete.tsx`:
  - Extends TextInput with autocomplete dropdown
  - Shows company logos in suggestions
  - Debounced search
  - Keyboard navigation (up/down/enter)
  - For "Are you targeting specific companies?" question
- Validation states:
  - Subtle error messaging (not aggressive red)
  - Inline validation hints

**Acceptance**: Text input with smooth interactions, autocomplete works

---

### Chunk 3.4: Multi-Select Question Component  
**Goal**: For "select all that apply" questions (e.g., weak areas)

- Create `components/onboarding/MultiSelect.tsx`:
  - Similar to MultipleChoice but toggle selection
  - Shows checkmark on selected items
  - "Continue" button appears when at least one selected
  - Optional "Skip" affordance for optional questions
  - Maximum selection limit (configurable)
- Use case: "Where do you feel least confident?"
  - [ ] Data Structures & Algorithms
  - [ ] System Design  
  - [ ] Behavioral Questions
  - [ ] Coding Under Pressure
  - [ ] Technical Communication

**Acceptance**: Multi-select with toggle behavior, continue when valid

---

### Chunk 3.5: Slider/Scale Question Component
**Goal**: For numeric ranges (experience level, confidence)

- Create `components/onboarding/SliderQuestion.tsx`:
  - Custom styled range slider using theme colors
  - Large touch target for mobile
  - Value label follows thumb
  - Optional tick marks with labels
  - Animated value changes
- Use case: "How many technical interviews have you done?"
  - 0 --- 5 --- 10 --- 20+
  - With contextual labels: "None yet" ... "I've lost count"

**Acceptance**: Slider works smoothly on touch and mouse

---

## Phase 4: Onboarding Flow Engine

### Chunk 4.1: Flow State Management
**Goal**: Manage onboarding state with branching logic support

- Install `zustand` for state management
- Create `lib/stores/onboarding-store.ts`:
  ```typescript
  type OnboardingState = {
    // Context from URL
    company: string;
    role: string;
    
    // Collected answers
    answers: Record<string, unknown>;
    
    // Flow state
    currentStep: string;
    stepHistory: string[];
    
    // Actions
    setAnswer: (key: string, value: unknown) => void;
    nextStep: () => void;
    previousStep: () => void;
    reset: () => void;
  }
  ```
- Persist to localStorage for resume capability
- Include timestamp for session expiry (24 hours)

**Acceptance**: State persists across refresh, can navigate back

---

### Chunk 4.2: Flow Definition Schema
**Goal**: Declarative flow definition with conditional branching

- Create `lib/flows/onboarding-flow.ts`:
  ```typescript
  type FlowStep = {
    id: string;
    type: 'multiple-choice' | 'text' | 'multi-select' | 'slider' | 'loading' | 'result';
    question?: string;
    coachMessage: string | ((context: FlowContext) => string);
    options?: Array<{ id: string; label: string; emoji?: string }>;
    next: string | ((answers: Record<string, unknown>) => string);
    skip?: boolean; // Can this step be skipped?
  };
  
  type Flow = {
    id: string;
    initialStep: string;
    steps: Record<string, FlowStep>;
  };
  ```
- Define the main onboarding flow (see Phase 5 for specific steps)
- Support for:
  - Static next step: `next: 'step-2'`
  - Conditional next: `next: (answers) => answers.urgency === 'this-week' ? 'fast-track' : 'standard'`

**Acceptance**: Flow can be defined declaratively, branching works

---

### Chunk 4.3: Flow Renderer Component
**Goal**: Orchestrates rendering the current step

- Create `components/onboarding/FlowRenderer.tsx`:
  - Reads current step from store
  - Looks up step definition from flow
  - Renders appropriate question component
  - Handles transitions between steps
  - Wraps in AnimatePresence for smooth transitions
- Create `components/onboarding/OnboardingContainer.tsx`:
  - Full-page container
  - Includes CoachPresence
  - Includes subtle progress indication (dots, not numbers)
  - Handles keyboard shortcuts (Enter to continue, Escape to go back)
- Progress indication:
  - Small dots at bottom showing rough progress
  - No numbers or percentages (can't calculate with branching)
  - Dots fill as sections complete

**Acceptance**: Flow renders, transitions smoothly, progress shows

---

## Phase 5: The Actual Flow Steps

### Chunk 5.1: Welcome & Value Proposition
**Goal**: First impression - hook them immediately

**Screen: Welcome**
- No question yet - just coach introduction
- Coach message: "Hey! I'm here to help you land that {role} position at {company}. Let's build your personalized prep plan - it takes about 2 minutes."
- Company logo displayed prominently
- Single CTA: "Let's do it" (large, inviting button)
- Subtle background animation (gradient shift, particles, something premium)
- Auto-advance after brief pause if they don't click

**Acceptance**: Welcome screen with company branding, feels premium

---

### Chunk 5.2: Core Discovery Questions
**Goal**: Gather essential personalization data

**Screen: Timeline**
- Coach: "First things first - when's your interview?"
- Options:
  - "This week 🔥" 
  - "2-4 weeks"
  - "1-2 months"
  - "Just exploring 🔍"
- Contextual response based on selection

**Screen: Experience Level**
- Coach: "Got it. How familiar are you with technical interviews?"
- Options:
  - "Never done one"
  - "Done a few"
  - "Quite experienced"
  - "Interview veteran"
- Response adapts to selection

**Screen: Interview Type** (conditional - skip if obvious from role)
- Coach: "What type of interview are you prepping for?"
- Options vary by role:
  - SWE: "Coding" / "System Design" / "Both" / "Not sure yet"
  - PM: "Product Sense" / "Analytical" / "Technical" / "All of the above"

**Acceptance**: Core questions flow smoothly, answers stored

---

### Chunk 5.3: Depth Questions (Conditional)
**Goal**: Dig deeper based on previous answers

**Screen: Weak Areas** (if experienced)
- Coach: "Where do you want to focus most?"
- Multi-select:
  - Data Structures & Algorithms
  - System Design
  - Behavioral / Leadership
  - Coding Speed & Accuracy
  - Technical Communication
- Skip option available

**Screen: Past Attempts** (if experienced)
- Coach: "Have you interviewed at {company} before?"
- Options:
  - "Yes, didn't get the offer"
  - "Yes, but different role"
  - "No, first time"
- Different coaching approach based on retry vs first attempt

**Screen: Specific Concerns** (optional, text input)
- Coach: "Anything specific you're worried about? (optional)"
- Free text input
- Skip prominently available
- Character limit ~200

**Acceptance**: Conditional questions appear based on prior answers

---

### Chunk 5.4: Anticipation Builder
**Goal**: The "crunching numbers" moment - build perceived value

**Screen: Loading/Analysis**
- Coach avatar shows "thinking" animation
- Staged messages appear over 4-5 seconds:
  1. "Analyzing {company}'s interview patterns..."
  2. "Reviewing recent {role} questions..."
  3. "Building your personalized roadmap..."
  4. "Almost there..."
- Progress bar or animated visualization
- No user input needed - auto-advances
- Background: subtle data visualization animation

**Acceptance**: Loading screen with staged messages, feels like real work

---

### Chunk 5.5: Personalized Plan Reveal
**Goal**: The payoff - show them their custom plan

**Screen: Your Plan**
- Dramatic reveal animation
- Coach: "Here's your game plan for {company} 🎯"
- Visual roadmap showing:
  - Estimated prep time based on timeline
  - Key focus areas (weighted by their weak areas)
  - Number of practice questions recommended
  - Suggested daily commitment
- Cards/sections for each focus area:
  - "System Design: 5 core patterns to master"
  - "Coding: 20 high-frequency problems"
  - "Behavioral: STAR method + 10 {company} favorites"
- Large CTA: "Start Preparing"
- Smaller secondary: "Save this plan"

**Acceptance**: Plan displays with personalized content, clear next steps

---

### Chunk 5.6: Soft Registration Gate
**Goal**: Capture email AFTER showing value

**Screen: Save Progress** (appears after they click Start or Save)
- Coach: "Want me to save this and track your progress?"
- Options:
  - Continue with Google (OAuth button)
  - Continue with Email (magic link input)
  - "Maybe later" (small text link - lets them continue without account)
- No password creation - low friction
- Benefits listed subtly:
  - "Pick up where you left off"
  - "Track your improvement"
  - "Get reminders before your interview"

**Post-registration**: Redirect to dashboard/first lesson

**Acceptance**: Registration is optional, OAuth and magic link work

---

## Phase 6: Polish & Production

### Chunk 6.1: Mobile Optimization
**Goal**: Perfect mobile experience (likely majority of traffic)

- Audit all components for touch targets (min 44px)
- Ensure smooth 60fps animations on mobile
- Test gesture interactions (swipe to go back?)
- Optimize for notch/safe areas
- Test on actual devices:
  - iPhone SE (small)
  - iPhone 14 Pro (notch)
  - Android mid-range (performance)
- Reduce motion for `prefers-reduced-motion`

**Acceptance**: Full flow works perfectly on mobile Safari and Chrome

---

### Chunk 6.2: Loading States & Error Handling
**Goal**: Graceful handling of edge cases

- Create skeleton loaders for initial page load
- Handle unknown company gracefully:
  - "We don't have specific data for {company} yet, but we can still help!"
  - Fall back to generic interview prep
- Handle unknown role similarly
- Network error states with retry
- Session recovery from localStorage
- Analytics events for drop-off points

**Acceptance**: No blank screens, all errors handled gracefully

---

### Chunk 6.3: SEO & Performance
**Goal**: Fast initial load, good SEO for company/role pages

- Implement metadata for dynamic routes:
  - Title: "Prepare for {Role} Interview at {Company} | JobWiz"
  - Description: Dynamic based on role type
- Open Graph images (can be phase 2)
- Ensure critical CSS is inlined
- Lazy load non-critical animations
- Measure and optimize:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

**Acceptance**: Lighthouse score > 90, proper meta tags

---

### Chunk 6.4: Analytics Integration
**Goal**: Understand funnel and optimize

- Set up Mixpanel or similar
- Track events:
  - `onboarding_started` (with company, role)
  - `step_completed` (with step_id, time_spent)
  - `step_skipped` (with step_id)
  - `onboarding_completed` (with total_time, answers_summary)
  - `registration_shown`
  - `registration_completed` (with method)
  - `registration_skipped`
- Set up funnel visualization
- Identify drop-off points

**Acceptance**: Events firing, funnel visible in dashboard

---

## Implementation Order (Recommended)

### Sprint 1: Foundation (Chunks 1.1-1.3)
Get the project running with theming and animations infrastructure.

### Sprint 2: Coach + Basic Questions (Chunks 2.1-2.3, 3.1-3.2)
Coach system and multiple choice questions - the core interaction pattern.

### Sprint 3: Flow Engine + Welcome (Chunks 4.1-4.3, 5.1)
Wire up state management and get first screen working end-to-end.

### Sprint 4: Full Flow (Chunks 5.2-5.6)
Implement all question screens and the reveal.

### Sprint 5: Polish (Chunks 3.3-3.5, 6.1-6.4)
Additional input types, mobile polish, analytics.

---

## Key Files to Generate

```
src/
├── app/
│   ├── [company]/
│   │   ├── [role]/
│   │   │   └── page.tsx              # Main onboarding page
│   │   └── layout.tsx                 # Theme provider wrapper
│   ├── globals.css                    # CSS variables, base themes
│   └── api/health/route.ts
├── components/
│   ├── ui/
│   │   ├── AnimatedContainer.tsx
│   │   ├── StaggerGroup.tsx
│   │   └── Button.tsx                 # shadcn + customization
│   ├── onboarding/
│   │   ├── FlowRenderer.tsx
│   │   ├── OnboardingContainer.tsx
│   │   ├── QuestionLayout.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── TextInput.tsx
│   │   ├── MultiSelect.tsx
│   │   ├── SliderQuestion.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── PlanReveal.tsx
│   └── coach/
│       ├── CoachAvatar.tsx
│       ├── CoachPresence.tsx
│       ├── SpeechBubble.tsx
│       └── CoachMessage.tsx
├── lib/
│   ├── themes/
│   │   ├── companies.ts               # Company theme definitions
│   │   └── ThemeProvider.tsx
│   ├── flows/
│   │   └── onboarding-flow.ts         # Flow definition
│   ├── constants/
│   │   └── coach-messages.ts
│   ├── animations/
│   │   └── variants.ts
│   └── stores/
│       └── onboarding-store.ts
└── hooks/
    ├── useTypewriter.ts
    └── useOnboarding.ts
```

---

## Notes for Claude Code

1. **Start minimal**: Each chunk should produce working code. Don't stub things out.

2. **Test as you go**: Each chunk has acceptance criteria - verify before moving on.

3. **Mobile-first**: Write mobile styles first, then enhance for desktop.

4. **Animations are important**: Don't skip them - they're core to the experience.

5. **Type everything**: With strict mode on, be explicit about types.

6. **Copy shadcn components**: Don't install - copy and customize.

7. **CSS variables for theming**: Never hardcode colors. Always use `var(--primary)` etc.

8. **Keep coach messages warm**: The tone is friendly mentor, not corporate bot.
