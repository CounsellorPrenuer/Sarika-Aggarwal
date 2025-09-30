# DreamBridge Portfolio Website - Design Guidelines

## Design Philosophy & Inspiration

This website draws inspiration from modern consulting websites with premium UI/UX patterns. The design must balance professional credibility with energetic vibrancy to reflect Sarika Agrawal's approachable yet expert coaching style.

## Color Palette

**Primary Colors:**
- Base: Sophisticated deep blue (220 75% 25%) or teal green (175 65% 30%) for backgrounds, primary text, and trust-building elements
- Brand Authority: Use these as foundation colors for headers and content sections

**Vibrant Accents:**
- Orange (25 95% 55%): Primary CTA buttons, important highlights, hover states
- Yellow (45 100% 60%): Secondary accents, icons, subtle highlights
- Gradient Combinations: Blue-to-green backgrounds with orange/yellow CTAs for maximum contrast and energy

**Neutrals:**
- White/Off-white for clean content backgrounds
- Light grays (220 10% 95%) for subtle section separations
- Dark slate (220 20% 15%) for text with high readability

## Typography

**Font Families:**
- Headings: "Poppins" (600-700 weight) - modern, friendly, professional
- Body Text: "Source Sans Pro" (400-600 weight) - highly readable, approachable
- Import via Google Fonts CDN

**Type Scale:**
- Hero Headline: 4xl to 6xl (56-72px desktop)
- Section Headings: 3xl to 4xl (36-48px)
- Subheadings: xl to 2xl (20-28px)
- Body: base to lg (16-18px)
- Small text: sm (14px) for captions and footer

## Layout System

**Spacing Strategy:**
- Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Component spacing: gap-6 to gap-8 for grids, space-y-4 to space-y-6 for vertical stacks
- Container max-width: max-w-7xl with px-6 to px-8

**Grid Patterns:**
- Services: 3-column grid on desktop (lg:grid-cols-3), 2-column on tablet (md:grid-cols-2), single column on mobile
- Stats: 3-column inline display with dividers
- Blog/Testimonials: 3-column masonry or carousel
- Pricing: 3-card horizontal layout with featured card highlighted

## Component Library

### Navigation Bar
- Sticky positioned with backdrop-blur-lg glassmorphism effect
- Semi-transparent white background (bg-white/80) that solidifies on scroll
- Logo left-aligned, navigation center, vibrant "Start Your Journey" CTA button right
- Shadow intensifies on scroll (shadow-lg to shadow-xl transition)
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- Full viewport height (min-h-screen) with decorative gradient shapes
- Layered background: Blue-green gradient with organic blob shapes in orange/yellow (opacity 10-20%)
- Z-index layering: Background shapes → Content → Floating elements
- Two CTA buttons: Primary (orange gradient with shadow-lg), Secondary (outline with backdrop blur)
- Stats bar: Three icon-based metrics with large numbers, positioned below CTAs or as floating cards

### Service Cards
- Premium card design with rounded-2xl borders
- White background with shadow-xl and border (border-slate-200)
- Icon containers: Gradient backgrounds (blue-to-teal) with white icons, rounded-xl
- Hover effect: Scale (scale-105), deeper shadow (shadow-2xl), subtle upward translation (-translate-y-1)
- Smooth transitions (transition-all duration-300)

### About Me Section
- Two-column layout: Profile image left (40%), content right (60%)
- Profile image: Large circular or rounded-2xl frame with subtle shadow and border
- Content: Generous line-height (leading-relaxed), organized with headings and paragraphs
- Desktop: side-by-side, Mobile: stacked with image first

### Pricing Cards
- Three cards: left/right standard size, center card featured (scale-105, shadow-2xl, border-orange-500)
- Each card: White background, rounded-3xl, generous padding (p-8 to p-10)
- Price display: Large, bold numbers with currency symbol
- Feature list: Check icons (vibrant green), spaced list items
- CTA buttons: Full-width, gradient backgrounds matching accent colors
- Hover: Lift effect with enhanced shadow

### Testimonials
- Slider/carousel format with 3 visible cards on desktop
- Card design: Italic quote, star ratings (yellow), circular profile image, name and role
- Subtle background with border, not floating in empty space

### Contact Form
- Two-column layout: Form left (60%), contact info right (40%)
- Input fields: Clean borders, focus states with orange/blue accent color
- Labels: Above inputs, clear typography
- Submit button: Vibrant gradient, full-width within form column
- Validation: Red error states, green success message

### Footer
- Comprehensive multi-column layout (4 columns on desktop)
- Logo and tagline, Quick Links, Services, Contact Info columns
- Social media icons: Circular buttons with brand colors on hover
- Copyright bar: Centered, subtle gray background

## Visual Effects & Animations

**Glassmorphism:**
- Navbar and overlay elements: backdrop-blur-lg with bg-white/80
- Buttons on hero images: backdrop-blur-md with semi-transparent backgrounds

**Shadow Strategy:**
- Cards: shadow-lg default, shadow-xl hover, shadow-2xl for featured elements
- Depth hierarchy: Subtle shadows for secondary elements, dramatic shadows for primary focus

**Hover Animations:**
- Buttons: Scale (scale-105), enhanced shadow, color intensity increase
- Cards: Lift effect (scale-105 and -translate-y-1)
- Links: Color transition, underline animation from left to right
- All transitions: duration-300 for smooth, premium feel

**Scroll Animations:**
- Fade-in for section headings: opacity 0 to 1 with slight upward movement
- Slide-in for cards: Staggered entrance from bottom or sides
- Stats counter: Animated number count-up on viewport entry
- Use intersection observer patterns for triggering

## Images

**Hero Section:**
- NO large hero background image - use vibrant gradient backgrounds with decorative geometric shapes
- Abstract shapes in brand colors create energy without competing with content

**Profile Image:**
- Sarika's professional photo in About Me section
- Circular or rounded-square frame, minimum 300px width on desktop
- High-quality, well-lit headshot with professional yet approachable expression

**Service Icons:**
- Use icon library (Heroicons or Lucide) with custom gradient backgrounds
- Career Guidance: Compass or map icon
- Workshops: Users or presentation icon
- Admission Guidance: Academic cap or document icon

**Blog Placeholder Images:**
- Abstract, professional stock images related to career/education
- Consistent aspect ratio (16:9) across all blog cards
- Rounded corners matching card design

## Responsiveness

**Breakpoints:**
- Mobile: < 768px (single column, stacked layouts, full-width CTAs)
- Tablet: 768px-1024px (2-column grids, adjusted spacing)
- Desktop: > 1024px (full 3-column grids, side-by-side layouts)

**Mobile Optimizations:**
- Hero: Reduce headline size, stack CTA buttons vertically
- Navigation: Hamburger menu with smooth slide-in drawer
- Cards: Full-width with adequate padding
- Stats: Stack vertically or 2-column grid
- Forms: Single column with full-width inputs

## Interaction Design

**CTA Hierarchy:**
- Primary: "Start Your Journey," "Begin Now" - vibrant orange/yellow gradients
- Secondary: "Explore Services," "Request Quote" - outline style with blur on images
- Tertiary: Text links with hover underline animations

**Form Validation:**
- Real-time validation with inline error messages
- Success state: Green checkmark icon with confirmation message
- Loading state: Spinner in button during Razorpay processing

**Micro-interactions:**
- Button press: Slight scale-down (scale-95) for tactile feedback
- Card hover: Lift with shadow enhancement
- Icon hover: Color shift and rotation for playfulness
- Navigation links: Smooth color transition with underline slide-in

This design creates a sophisticated, energetic, and trustworthy digital presence that positions DreamBridge as a modern, professional career coaching service while maintaining approachability and warmth through vibrant accents and friendly typography.