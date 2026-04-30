# Design Brief

## Direction

Clean & Trustworthy Fintech — A refined minimalist interface for subscription management that feels intelligent without overwhelming young Indian professionals.

## Tone

Refined minimalism inspired by Linear and Stripe: soft, trust-building surfaces with intentional depth and hierarchy. Friendly but never casual. Smart without pretense.

## Differentiation

Gradient accent on key metrics (total spend, savings potential) combined with intentional card stratification and soft shadows create visual hierarchy that communicates value without shouting.

## Color Palette

| Token      | OKLCH             | Role                                |
| ---------- | ----------------- | ----------------------------------- |
| background | 0.985 0.008 250   | Cool off-white base                 |
| foreground | 0.16 0.012 250    | Deep charcoal text                  |
| card       | 1.0 0.004 250     | Pure white surfaces                 |
| primary    | 0.50 0.20 280     | Indigo/blue accent (#5B42F3)        |
| accent     | 0.60 0.16 150     | Savings green (#10B981)             |
| muted      | 0.92 0.008 250    | Subtle backgrounds                  |
| destructive| 0.55 0.20 45      | Alert orange (#F97316)              |

## Typography

- Display: Space Grotesk — confident yet friendly, modern fintech aesthetic, section headings and hero metrics
- Body: General Sans — refined sans-serif, clean paragraphs and UI labels, approachable tone
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-2xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Soft shadow hierarchy (subtle xs-sm on cards, elevated md on modals) creates layered surfaces without visual noise. White card layer against cool off-white background with muted section dividers.

## Structural Zones

| Zone    | Background        | Border             | Notes                                         |
| ------- | ----------------- | ------------------ | --------------------------------------------- |
| Header  | bg-card/border-b  | border-border      | Clean top anchor, metric display              |
| Content | bg-background     | —                  | Spacious layout, card alternation             |
| Section | bg-muted/30       | —                  | Subtle background for grouped content         |
| Footer  | bg-card/border-t  | border-border      | Bottom nav, persistent in mobile              |

## Spacing & Rhythm

Generous vertical spacing (8px, 16px, 24px grid) with consistent 16px horizontal gutters on mobile. Section gaps 32px. Card padding 16-20px. Micro-interactions use 0.3s cubic-bezier transitions.

## Component Patterns

- Buttons: Primary (indigo bg, white text, rounded 8px), Secondary (muted bg, neutral text), Destructive (soft orange, rounded 8px)
- Cards: Rounded 12-16px, white background, subtle shadow, 16px padding, optional badge overlay
- Badges: Muted background, small rounded, semantic colors (green for savings, orange for renewal)
- Metric cards: Gradient accent background-clip text on primary number, subtext in muted-foreground

## Motion

- Entrance: Cards fade-in-up staggered 0.1s per card (0.4s total)
- Hover: Button bg shift 0.2s, card shadow elevate 0.2s on interactive elements
- Decorative: Pulse animation on savings highlight (3s soft breathe, optional on hero metric)

## Constraints

- Maintain 4.5:1 minimum text contrast on all surfaces
- Avoid full-page gradients; use subtle accent gradients only on metrics
- Primary indigo (#5B42F3) for CTAs; green (#10B981) reserved for savings/success only
- Mobile-first, responsive at 640px breakpoint

## Signature Detail

Subtle gradient text overlay on key metrics (₹3,450 monthly spend, ₹1,200 potential savings) using primary-to-accent gradient with background-clip, creating a premium fintech feel without overuse.
