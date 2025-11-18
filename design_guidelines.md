# H2 Bombs Landing Page Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from drinkh2tab.com, waterandwellness.com, and modern Japanese skincare brands (Tatcha, Shiseido). Ultra-minimalist premium aesthetic with extreme white space, restrained elegance, and scientific credibility.

## Core Design Principles
- **Extreme minimalism**: Maximum breathing room between elements
- **Premium restraint**: Less is more - every element earns its place
- **Scientific trust**: Clean, precise, credible presentation
- **Japanese aesthetic**: Soft, harmonious, contemplative

## Color Palette
- **Primary**: Soft lavender (#E6E0FF) for accents and highlights
- **Secondary**: Ice-blue gradient (ice-blue → white) for hero background
- **Base**: Pure white (#FFFFFF) dominant across all sections
- **Text**: Near-black for headlines, soft gray for body copy

## Typography
- **Font Family**: Inter or Satoshi (premium sans-serif via Google Fonts)
- **Hierarchy**:
  - Hero headline: 48-64px, bold weight, generous line-height
  - Section headlines: 32-40px, semibold
  - Subheadlines: 18-20px, regular weight
  - Body text: 16-18px, regular weight
  - Fine print: 14px, light weight

## Layout System
- **Spacing**: Tailwind units of 4, 8, 12, 16, 20, 24, 32 for consistent vertical rhythm
- **Container**: Max-width 1200px, centered with generous horizontal padding
- **Section padding**: py-24 to py-32 for desktop, py-16 for mobile
- **Extreme whitespace**: Double typical spacing between sections

## Page Sections

### 1. Hero Section (Full Viewport)
- **Background**: Ice-blue to white vertical gradient
- **Animation**: 3-5 floating nano-bubble circles (soft, slow, organic movement)
- **Content**: Centered vertical alignment
  - Large headline with emphasis on "Most Powerful"
  - Subheadline with technical specs (up to 10,000+ ppb • Natural lavender • EU GMP • Coming Q1 2026)
  - Prominent CTA button with smooth scroll behavior
- **Button**: Large, rounded, soft lavender background with white text, subtle shadow

### 2. Science Section
- **Layout**: 4-column grid on desktop (2x2 on tablet, single column on mobile)
- **Cards**: Clean white cards with subtle border, generous padding (p-8)
- **Icons**: Minimal, line-based icons for each benefit
- **Badge**: Small pill-shaped badge "Backed by 2000+ clinical studies" centered below grid
- **Card structure**: Icon top, headline, short description

### 3. Product Showcase
- **Visual**: Large centered glowing sphere (200g mockup) - soft purple gradient with subtle glow effect
- **Layout**: Single column, centered content
- **Bullet list**: Clean checkmarks or minimal dots, generous line spacing
- **Typography**: Emphasize technical specifications (H₂ ppb, weights, percentages)
- **CTA context**: "Launching Q1 2026 – be the first" in elegant small caps

### 4. Mission Section
- **Layout**: Centered text block, max-width 600px
- **Typography**: Larger body text (20px), increased line-height for readability
- **Emphasis**: Bold key phrases ("strongest, cleanest", "Science-first", "No compromises")

### 5. Waitlist Section
- **Layout**: Centered form, max-width 500px
- **Form elements**: 
  - Single email input with soft rounded corners, light border
  - Submit button matching hero CTA style
  - Subtext in smaller font below form
- **Spacing**: Extra vertical space around form for emphasis

### 6. Footer
- **Layout**: Centered content, minimal height
- **Typography**: Small, light weight text (14px)
- **Links**: Inline, minimal underline on hover
- **Spacing**: Moderate padding, separated from content with subtle top border

## Component Library

### Buttons
- **Primary CTA**: Large (px-8 py-4), rounded-full, lavender background, white text, subtle shadow, smooth hover lift
- **Form submit**: Medium size, matching primary style

### Cards
- **Background**: Pure white
- **Border**: 1px subtle gray
- **Shadow**: Minimal, soft (shadow-sm)
- **Padding**: p-8
- **Radius**: rounded-xl

### Form Inputs
- **Border**: Light gray, 1px
- **Padding**: px-4 py-3
- **Radius**: rounded-lg
- **Focus state**: Lavender border, subtle glow

## Animations
- **Nano-bubbles**: Floating animation (3-5 circles, 15-30s duration, slight vertical movement)
- **Scroll behavior**: Smooth scroll on CTA click
- **Scroll reveals**: Subtle fade-in on section entry (optional, very gentle)
- **Hover states**: Minimal - slight button lift, subtle link underline

## Responsive Behavior
- **Mobile-first approach**: Single column layouts, stack grids
- **Breakpoints**: 
  - Mobile: Base styles
  - Tablet (md:): 2-column grids where appropriate
  - Desktop (lg:): Full multi-column layouts
- **Typography scaling**: Reduce heading sizes 30-40% on mobile
- **Spacing reduction**: py-16 instead of py-32 on mobile

## Images
**Hero section**: No large hero image - uses ice-blue gradient background with animated nano-bubbles instead
**Product showcase**: Placeholder for 200g sphere mockup - soft purple glowing circle or actual product render

## SEO & Performance
- Meta description highlighting molecular hydrogen benefits and EU quality
- Favicon placeholder support
- Fast-loading (Tailwind CDN, minimal JS)
- Semantic HTML structure