# WhyChooseUsSection Component

A professionally structured, modular component showcasing key benefits with animated graphics.

## Structure

```
WhyChooseUs/
├── index.tsx                    # Component barrel export
├── WhyChooseUsSection.tsx       # Main section component
├── animations.ts                # Re-exports animations from centralized location
├── types.ts                     # TypeScript type definitions
├── styles.css                   # Component-specific styles (neumorphism design)
└── components/                  # Sub-components
    ├── index.ts                 # Component barrel exports
    ├── BenefitCard.tsx          # Main benefit card router component
    ├── DefaultBenefitCard.tsx   # Card layout for Analytics & Sync
    ├── GrowthBenefitCard.tsx    # Standalone card layout with animation
    ├── AnalyticsGraphic.tsx     # Rotating gauge graphic with dots
    └── SyncGraphic.tsx          # Connecting circles SVG graphic
```

## Features

- **Neumorphism Design**: Soft UI design with #f5f5f5 base color
- **Framer Motion Animations**: Smooth, physics-based animations
- **Modular Architecture**: Each sub-component in its own file
- **Type Safety**: Full TypeScript support with proper interfaces
- **Centralized Animations**: Reusable animation variants from `/src/animations`
- **Separation of Concerns**: Logic, styles, and animations in separate files

## Usage

```tsx
import WhyChooseUsSection from '@/components/sections/WhyChooseUs';

function Page() {
  return <WhyChooseUsSection />;
}
```

## Animation Details

### Growth Card
- **Cycle**: 4 seconds (BEFORE → AFTER)
- **Elements**: Chart bars, metric pills, BEFORE/AFTER label
- **Transition**: Spring physics for smooth motion

### Analytics Card
- **Sequence**: Needle rotation → Dots appear → Return
- **Timing**: 0.6s rotation, 2s pause at endpoints
- **Elements**: Rotating gauge needle, 3 decorative dots

### Sync Card
- **Animation**: Sequential appearance of circles, line, and arrow
- **Delays**: 0.2s, 0.4s, 0.6s, 0.8s for each element
- **Transition**: Spring for circles, smooth for line/arrow

## Customization

### Colors
Edit `styles.css` to change the neumorphism colors:
```css
--base-color: #f5f5f5;
--shadow-dark: #d1d1d1;
--shadow-light: #ffffff;
```

### Animation Timing
Edit `/src/animations/whyChooseUsSection.ts` to adjust timing:
```ts
export const cardVariants: Variants = {
  visible: {
    transition: {
      duration: 0.6, // Adjust this
      stiffness: 300, // Or this
    },
  },
};
```

### Content
Edit the `benefits` array in `WhyChooseUsSection.tsx`:
```ts
const benefits: Benefit[] = [
  {
    title: 'Your Title',
    description: 'Your description',
    graphic: 'analytics', // or 'growth' or 'sync'
  },
];
```

## Dependencies

- `framer-motion` - Animation library
- `react` - UI library
- TypeScript - Type safety

## File Sizes

- WhyChooseUsSection.tsx: ~3KB
- Components (total): ~8KB
- Styles: ~6KB
- Animations: ~4KB (shared)

## Performance

- ✅ Code splitting ready (default export)
- ✅ Tree-shakeable imports
- ✅ CSS Modules compatible
- ✅ Animation optimized with `useInView`
- ✅ No layout shift (fixed dimensions)
