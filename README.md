# Personal Injury Hotline ; PI Lead Generation Platform

A modern, high-converting lead generation platform for personal injury case evaluation and legal services. Built with React, TypeScript, and Vite, featuring advanced compliance tracking, multi-step quiz flows, and optimized conversion paths.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Compliance Integration](#compliance-integration)
- [Routing & Navigation](#routing--navigation)
- [Development](#development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## Overview

The PI Lead Generation Platform is a Single Page Application (SPA) designed to help injury victims connect with qualified legal representation through personalized case evaluation. The platform features:

- Multi-step case evaluation quiz for personalized recommendations
- Compliance-ready form tracking (Jornaya LeadiD, TrustedForm)
- Multiple conversion funnels (TOFU, MOFU, BOFU)
- Dynamic outcome pages with legal service comparisons
- Mobile-responsive design with conversion optimization

## Features

### Core Functionality

- **Interactive Case Evaluation System**: Multi-step quiz with progress tracking and validation
- **Smart Form Validation**: Real-time validation with OTP verification support
- **Lead Capture**: Comprehensive form submission with webhook integration
- **Session Management**: Persistent session data across quiz steps
- **Case Type Matching**: Algorithm-based matching to qualified legal services

### Compliance & Tracking

- **Route-Based Compliance Loading**: Scripts only load on pages with forms
- **Jornaya LeadiD Integration**: Automatic lead tracking and verification
- **TrustedForm Certification**: Form submission certification on qualified domains
- **Microsoft Clarity**: User behavior analytics with virtual page views
- **ClickMagick Attribution**: Click tracking and conversion attribution

### User Experience

- **Multiple Landing Pages**: Optimized for different traffic sources
- **Mobile-First Design**: Responsive layouts with touch-optimized interactions
- **Loading States**: Smooth transitions and feedback during async operations
- **Error Boundaries**: Graceful error handling with fallback UI
- **Trust Elements**: Social proof, testimonials, and credibility indicators

## Technology Stack

### Frontend Framework
- **React 18.3**: Modern component-based architecture
- **TypeScript 5.5**: Type-safe development
- **Vite 5.4**: Lightning-fast build tool and dev server
- **React Router 7.8**: Client-side routing with nested routes

### Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework with PI brand colors
- **PostCSS**: CSS transformations and autoprefixer
- **Lucide React**: Beautiful icon library

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite Plugin React**: Fast refresh and JSX transformation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pi-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure environment variables (see [Environment Variables](#environment-variables))

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
pi-platform/
├── public/                      # Static assets
│   ├── firm-logos/              # Law firm logos
│   └── pi-logo-*.svg            # Site logos
├── src/
│   ├── config/                  # Configuration files
│   │   ├── compliance.config.ts        # Jornaya & TrustedForm settings
│   │   ├── compliance.content.config.ts # Compliance messaging
│   │   ├── content.config.ts           # Site content
│   │   ├── environment.config.ts       # Environment validation
│   │   ├── quiz.config.ts              # Quiz questions & logic
│   │   ├── site.config.ts              # Site metadata
│   │   └── tofuContent.config.ts       # TOFU page content
│   ├── core/                    # Core application logic
│   │   ├── components/          # Reusable components
│   │   │   ├── ComplianceProvider.tsx   # Route-based compliance wrapper
│   │   │   ├── ComplianceScripts.tsx    # Jornaya script loader
│   │   │   ├── TrustedFormProvider.tsx  # TrustedForm script manager
│   │   │   ├── ContactForm.tsx          # Lead capture form
│   │   │   ├── QuizOverlay.tsx          # Modal quiz interface
│   │   │   ├── QuizEmbedded.tsx         # Inline quiz interface
│   │   │   ├── ErrorBoundary.tsx        # Error handling
│   │   │   ├── Hero.tsx                 # Hero sections
│   │   │   ├── FAQ.tsx                  # FAQ accordion
│   │   │   └── Footer.tsx               # Site footer
│   │   ├── layouts/             # Page layout templates
│   │   │   ├── HomeLayout.tsx           # Homepage layout
│   │   │   ├── HeroLayout.tsx           # Hero-focused layout
│   │   │   ├── TOFULayout.tsx           # Top-of-funnel layout
│   │   │   └── OutcomeLayout.tsx        # Outcome page layout
│   │   ├── pages/               # Full page components
│   │   │   ├── QuoteLanding.tsx         # Case evaluation request page
│   │   │   ├── QuoteQuiz.tsx            # Standalone quiz page
│   │   │   ├── Contact.tsx              # Contact page
│   │   │   ├── PartnersPage.tsx         # Partners page
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   ├── TermsOfService.tsx
│   │   │   └── TCPADisclaimer.tsx
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── quiz.types.ts
│   │   └── utils/               # Utility functions
│   │       ├── compliance.ts            # Compliance field management
│   │       ├── session.ts               # Session storage utilities
│   │       ├── validation.ts            # Form validation logic
│   │       └── errorHandler.ts          # Error handling utilities
│   ├── custom/                  # Custom components per client
│   │   └── components/          # Client-specific components
│   │       ├── TOFUHero.tsx
│   │       ├── PainAgitation.tsx
│   │       ├── ComparisonSection.tsx
│   │       ├── SocialProofWall.tsx
│   │       └── EducationalValueProps.tsx
│   ├── pages/                   # Additional page routes
│   │   └── outcome/             # Outcome pages per case type
│   │       └── GenericOutcome.tsx
│   ├── services/                # External service integrations
│   │   └── form.service.ts      # Form submission service
│   ├── types/                   # Global type definitions
│   │   └── window.d.ts
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles with PI brand colors
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS with PI brand palette
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment variable template
├── COMPLIANCE_SETUP.md          # Compliance integration guide
├── DEPLOYMENT_SOP.md            # Deployment procedures
└── README.md                    # This file
```

## Configuration

### Site Configuration

Edit `src/config/site.config.ts`:

```typescript
export const siteConfig = {
  name: 'PI Lead Platform',
  title: 'Get Your Free Case Evaluation',
  description: 'Connect with qualified legal representation...',
  url: 'https://yourdomain.com',
  // ... other settings
};
```

### Quiz Configuration

Edit `src/config/quiz.config.ts` to customize case evaluation questions, validation rules, and logic flow.

### Content Configuration

Edit `src/config/content.config.ts` to update copy, CTAs, and messaging throughout the site.

### Brand Colors

The platform uses the PI brand color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'pi-navy': '#003366',
  'pi-teal': '#008080',
  'pi-primary': '#2C5282',
  'pi-green': '#38A169',
  'pi-green-muted': '#6BAE6B',
  'pi-orange': '#FF7B47',
  'pi-gold': '#DAA520',
}
```

## Compliance Integration

This platform includes built-in compliance tracking that automatically loads only on routes with forms.

### Route-Based Loading Architecture

**Conditional Script Loading**: Compliance scripts load conditionally based on the current route to optimize performance and prevent tracking errors. Scripts only initialize on routes containing forms:
- `/start-quiz`
- `/quiz`
- `/get-quote`
- `/quote`
- `/contact`

**Benefits**:
- Eliminates TrustedForm 204 errors (caused by script loading on non-form pages)
- Improves page load performance on informational pages
- Reduces unnecessary tracking overhead
- Cleaner separation of concerns

**How It Works**:
1. `ComplianceProvider` wraps all routes in `App.tsx`
2. On each navigation, `useLocation` hook detects current route
3. Route is checked against `ROUTES_WITH_FORMS` constant
4. If match found, compliance scripts are initialized:
   - `TrustedFormProvider` creates hidden form element
   - TrustedForm script loads and begins certificate generation
   - `ComplianceScripts` loads Jornaya LeadiD script
5. Both scripts populate hidden fields in the DOM
6. Form submission automatically includes compliance tokens
7. Non-form routes skip all compliance initialization

### Jornaya LeadiD Setup

1. Get your credentials from [jornaya.com](https://jornaya.com)
2. Edit `src/config/compliance.config.ts`:

```typescript
jornaya: {
  enabled: true,
  campaignId: 'YOUR_CAMPAIGN_ID',
  accountId: 'YOUR_ACCOUNT_ID',
  fieldName: 'universal_leadid'
}
```

### TrustedForm Setup

1. Register your domain at [trustedform.com](https://trustedform.com)
2. Complete domain verification
3. The framework is pre-configured:

```typescript
trustedForm: {
  enabled: true,
  scriptUrl: 'https://api.trustedform.com/trustedform.js',
  fieldName: 'xxTrustedFormCertUrl',
  pingFieldName: 'xxTrustedFormPingUrl',
  testMode: false,
  captureDelay: 2000
}
```

### Disabling Compliance

To disable compliance tracking:

```typescript
// In src/config/compliance.config.ts
export const complianceConfig = {
  jornaya: {
    enabled: false,
    // ...
  },
  trustedForm: {
    enabled: false,
    // ...
  }
};
```

### Compliance Data Capture

Form submissions automatically include:

```json
{
  "leadid_token": "jornaya_token_value",
  "leadid_timestamp": "2025-10-31T12:00:00Z",
  "xxTrustedFormCertUrl": "https://cert.trustedform.com/...",
  "page_url": "https://yourdomain.com/quiz"
}
```

## Journey Tracking Architecture

### Component Responsibilities

The platform follows a strict separation of concerns between **Layout Components** and **Quiz Components** to ensure clean journey tracking and prevent conflicts.

#### Layout Components (HomeLayout, HeroLayout, TOFULayout, etc.)
**Purpose**: Page structure and UI layout only

Layout components are responsible for:
- Rendering page layout (header, hero, footer)
- Displaying CTAs and state selectors
- Opening/closing modals or overlays
- Managing page-level state

Layout components **MUST NOT**:
- Import journey tracking utilities (`triggerJornayaHashEvent`, `quizStepMapping`)
- Manipulate URL hashes for tracking purposes
- Fire Jornaya tracking pixels
- Handle step-level navigation logic

#### Quiz Components (QuizEmbedded, QuizOverlay, PILandingPage, etc.)
**Purpose**: Quiz logic + journey tracking

Quiz components handle:
- Displaying quiz questions and options
- Capturing user answers
- Storing data in session
- **Journey tracking with Jornaya pixels**
- **Updating URL hashes** with semantic or encoded IDs
- **Firing tracking pixels** on step changes
- Handling browser back/forward navigation

### Route-Component-Tracking Mapping

| Route | Layout Component | Quiz Component | Journey Tracking Owner | Hash Strategy |
|-------|------------------|----------------|------------------------|---------------|
| `/` | HomeLayout | QuizOverlay (modal) | QuizOverlay | Component-controlled |
| `/quote` | QuoteLanding | None | None | None |
| `/quote/quiz` | QuoteQuiz | QuizEmbedded | QuizEmbedded | Semantic (state, accident_timing) |
| `/start-quiz` | TOFULayout | QuizOverlay | QuizOverlay | Component-controlled |
| `/startquiz/01` | PILandingPage | Inline quiz | PILandingPage | Semantic |

**Key Principle**: **Layouts render structure. Quiz components handle tracking.**

### Why Separation of Concerns?

**Problem (Before)**:
```
HomeLayout (Layout)
  ├─ Imports: triggerJornayaHashEvent, quizStepMapping
  ├─ Fires pixels with 'home' identifier
  ├─ Uses encoded hashes (ivtg0)
  └─ QuizOverlay (Quiz Component)
       └─ Tries to track but HomeLayout interferes ❌
```

**Solution (After)**:
```
HomeLayout (Layout)
  ├─ NO tracking imports ✓
  ├─ NO pixel firing ✓
  ├─ NO hash manipulation ✓
  └─ QuizOverlay (Quiz Component)
       └─ Full control of its own journey tracking ✓
```

### Journey Tracking Flow Examples

#### For QuizEmbedded at `/quote/quiz`
```
User navigates to /quote/quiz
  ↓
QuizEmbedded mounts
  ↓
Initial mount useEffect fires → Jornaya pixel (step 1)
  ↓
User answers question
  ↓
Step tracking useEffect fires:
  - Updates hash: #state
  - Fires Jornaya pixel (step 1, 'embedded_quiz')
  ↓
User clicks browser back
  ↓
Hash change listener detects #state
  ↓
Fires Jornaya pixel for that step
```

#### For QuizOverlay at `/`
```
User lands on /
  ↓
HomeLayout renders (NO tracking code)
  ↓
User clicks "Get Started" CTA
  ↓
QuizOverlay modal opens
  ↓
QuizOverlay handles its own journey tracking
  ↓
User answers questions
  ↓
QuizOverlay stores answers and tracks journey
  ↓
User submits → navigate to outcome
```

### Debugging Journey Tracking

**Check current route and active component:**
```javascript
console.log('Path:', window.location.pathname);
console.log('Hash:', window.location.hash);
console.log('QuizEmbedded active:', !!document.querySelector('[data-leadid-question-container]'));
console.log('QuizOverlay active:', !!document.querySelector('[class*="modal"]') || !!document.querySelector('[role="dialog"]'));
```

**Expected logs by route:**
- `/`: No `[Jornaya Hash - home]` logs (HomeLayout doesn't track)
  - QuizOverlay may have its own tracking logs
- `/quote/quiz`: `[Jornaya Hash - embedded_quiz]` with semantic IDs
- `/startquiz/01`: `[Jornaya Hash - pi_funnel]` with semantic IDs

**Unwanted logs (indicate a problem):**
- ❌ `[Jornaya Hash - home]` - Means HomeLayout is still tracking
- ❌ Encoded hashes like `ivtg0` from wrong component

## Routing & Navigation

### Route Structure

```typescript
/                     → HomeLayout (Homepage)
/get-quote           → HeroLayout (Direct case evaluation request)
/quiz                → HeroLayout (Quiz modal)
/start-quiz          → TOFULayout (Educational quiz flow)
/quote               → QuoteLanding (Case evaluation funnel entry)
/quote/quiz          → QuoteQuiz (Standalone quiz)
/outcome             → GenericOutcome (Generic result)
/contact             → Contact (Contact form)
/partners            → PartnersPage (Partner information)
/privacy-policy      → PrivacyPolicy
/terms-of-service    → TermsOfService
/tcpa-disclaimer     → TCPADisclaimer
```

### Adding New Routes

1. Create your page component in `src/core/pages/` or `src/pages/`
2. Add route to `src/App.tsx`:

```typescript
<Route path="/your-route" element={<YourComponent />} />
```

3. **If your route contains forms**, update `ROUTES_WITH_FORMS` in `src/core/components/ComplianceProvider.tsx`:

```typescript
const ROUTES_WITH_FORMS = [
  '/start-quiz',
  '/quiz',
  '/get-quote',
  '/quote',
  '/contact',
  '/your-route'  // Add your route here
];
```

**Route Matching Logic**:
- Exact match: `/quiz` matches `/quiz`
- Prefix match: `/quote` matches `/quote`, `/quote/quiz`, `/quote/anything`
- The route check uses `pathname.startsWith()` to catch nested routes

**Important**: Only add routes to `ROUTES_WITH_FORMS` if they contain forms that need compliance tracking. Informational pages should NOT be added.

## Development

### Code Organization Principles

1. **Single Responsibility**: Each file has one clear purpose
2. **Separation of Concerns**: Core vs. custom components
3. **Configuration Over Code**: Settings in config files
4. **Type Safety**: Comprehensive TypeScript usage

### Key Development Guidelines

- **No Comments Unless Necessary**: Code should be self-documenting
- **Reusable Components**: Build once, use everywhere
- **Mobile-First**: Design for mobile, enhance for desktop
- **Performance**: Lazy load heavy components, optimize images
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Brand Consistency**: Use PI color palette from Tailwind config

### Running Linting

```bash
npm run lint
```

### Component Development

Create new components in:
- `src/core/components/` - Reusable, project-agnostic components
- `src/custom/components/` - Client-specific, customized components

### Debugging

Enable debug mode in `.env`:

```
VITE_DEBUG_MODE=true
```

This enables verbose console logging for compliance, validation, and form submission.

## Deployment

### Build Process

```bash
npm run build
```

This creates optimized production files in `dist/`:
- Minified JavaScript bundles
- Optimized CSS
- Asset compression
- Source maps (optional)

### Deployment Targets

**Netlify** (Recommended):
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

**Vercel**:
1. Import project from Git
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

**Static Hosting** (AWS S3, Cloudflare Pages, etc.):
1. Run `npm run build`
2. Upload contents of `dist/` directory
3. Configure routing to serve `index.html` for all routes (SPA mode)

### Environment Configuration

Set these environment variables in your deployment platform:

```
VITE_ENV=production
VITE_LEAD_WEBHOOK=https://your-webhook-url.com
VITE_ZIP_VALIDATOR=https://your-api.com/validate/zip
VITE_EMAIL_VALIDATOR=https://your-api.com/validate/email
VITE_PHONE_VALIDATOR=https://your-api.com/validate/phone
VITE_N8N_WEBHOOK_BASE=https://your-n8n-instance.com/webhook
VITE_SEND_OTP=your-otp-endpoint
VITE_VERIFY_OTP=your-verify-endpoint
VITE_QUALIFICATION_API=your-qualification-api
VITE_DEBUG_MODE=false
```

### Post-Deployment Checklist

- [ ] Test all quiz flows
- [ ] Verify form submissions reach webhook
- [ ] Check Jornaya LeadiD token capture
- [ ] Confirm TrustedForm certificate generation
- [ ] Test mobile responsiveness
- [ ] Check ClickMagick attribution
- [ ] Test all navigation routes
- [ ] Confirm HTTPS is enabled
- [ ] Review analytics dashboard
- [ ] Verify PI brand colors render correctly

## Environment Variables

### Required Variables

**VITE_LEAD_WEBHOOK**: Endpoint for lead submissions
```
VITE_LEAD_WEBHOOK=https://your-crm.com/api/leads
```

**VITE_N8N_WEBHOOK_BASE**: Base URL for n8n webhooks
```
VITE_N8N_WEBHOOK_BASE=https://n8n.yourserver.com/webhook
```

### Optional Validation Variables

**VITE_ZIP_VALIDATOR**: ZIP code validation API
```
VITE_ZIP_VALIDATOR=https://api.yourservice.com/validate/zip
```

**VITE_EMAIL_VALIDATOR**: Email validation API
```
VITE_EMAIL_VALIDATOR=https://api.yourservice.com/validate/email
```

**VITE_PHONE_VALIDATOR**: Phone number validation API
```
VITE_PHONE_VALIDATOR=https://api.yourservice.com/validate/phone
```

### OTP Variables

**VITE_SEND_OTP**: Endpoint to send OTP codes
```
VITE_SEND_OTP=https://api.yourservice.com/otp/send
```

**VITE_VERIFY_OTP**: Endpoint to verify OTP codes
```
VITE_VERIFY_OTP=https://api.yourservice.com/otp/verify
```

### Other Variables

**VITE_QUALIFICATION_API**: Lead qualification scoring
```
VITE_QUALIFICATION_API=https://api.yourservice.com/qualify
```

**VITE_ENV**: Environment identifier
```
VITE_ENV=production
```

**VITE_DEBUG_MODE**: Enable verbose logging
```
VITE_DEBUG_MODE=false
```

## Additional Documentation

### Compliance & Tracking
- [START_HERE.md](./START_HERE.md) - Quick start guide for testing compliance scripts
- [COMPLIANCE_QUICK_REFERENCE.md](./COMPLIANCE_QUICK_REFERENCE.md) - Quick reference card for developers
- [COMPLIANCE_TESTING.md](./COMPLIANCE_TESTING.md) - Comprehensive testing guide (7 scenarios)
- [COMPLIANCE_FIX_SUMMARY.md](./COMPLIANCE_FIX_SUMMARY.md) - Implementation details and fix summary
- [COMPLIANCE_SETUP.md](./COMPLIANCE_SETUP.md) - Initial setup and configuration guide

### Deployment & History
- [DEPLOYMENT_SOP.md](./DEPLOYMENT_SOP.md) - Step-by-step deployment procedures
- [FRAMEWORK_CHANGELOG.md](./FRAMEWORK_CHANGELOG.md) - Version history and changes

### Design Documentation
- [PI_BRAND_COLORS.md](./PI_BRAND_COLORS.md) - PI brand color enhancements and usage guide

## Support & Troubleshooting

### Common Issues

**Compliance scripts not loading**:
- **Quick Test**: Open console and run `complianceMonitor.start()` to see real-time status
- Check that you're on a route with forms (`/start-quiz`, `/quiz`, etc.)
- Verify `compliance.config.ts` has `enabled: true`
- Run `complianceMonitor.checkRoute()` to verify route detection
- Check browser console for script loading errors
- See [START_HERE.md](./START_HERE.md) for detailed testing steps

**Compliance scripts timing out**:
- Disable ad blocker (they often block Jornaya)
- Check Network tab for failed requests to `create.lidstatic.com` or `trustedform.com`
- Wait 2-5 seconds for scripts to fully initialize
- Run `complianceMonitor.check()` to see detailed field status

**Build errors**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npx tsc --noEmit`

**Form submissions not working**:
- Verify `VITE_LEAD_WEBHOOK` is set correctly
- Check browser network tab for failed requests
- Enable debug mode and check console logs

**Brand colors not displaying correctly**:
- Verify `tailwind.config.js` includes PI color palette
- Check that components are using correct Tailwind classes (e.g., `bg-pi-navy`, `text-pi-teal`)
- Clear browser cache and rebuild: `npm run build`

### Getting Help

For issues or questions:
1. Check existing documentation
2. Review console logs with `VITE_DEBUG_MODE=true`
3. Verify environment variables are set correctly
4. Check network tab for API failures

## License

Private and proprietary. All rights reserved.

## Recent Updates

### October 31, 2025 - PI Brand Color Integration

**Brand Color System**:
- Implemented comprehensive PI brand color palette across all components
- Updated progress bars, buttons, form inputs, and validation states with PI colors
- Added gradient effects and animations using Navy, Teal, Primary Blue, Green, Orange, and Gold
- Enhanced visual hierarchy and user experience with brand-aligned design

**Component Updates**:
- QuizEmbedded and QuizOverlay components now feature PI brand styling
- Form validation indicators use PI color system
- Success, error, and loading states align with brand palette
- All interactive elements follow PI design guidelines

### October 23, 2025 - Email Encoding & Button Positioning Fixes

**Email Parameter Fix**:
- Fixed URL encoding issue where email addresses with special characters were being encoded incorrectly
- Updated quiz components to append email directly to query string without encoding
- Email addresses now preserve all characters, preventing flow breakage

**Submit Button Repositioning**:
- Repositioned submit buttons across all quiz components for better UX and compliance visibility
- Submit button now consistently appears after phone/email fields but BEFORE TCPA consent text
- Updated components: QuizOverlay.tsx, QuestionsFlow.tsx, QuizEmbedded.tsx
- Layout hierarchy: Phone field → Email field → Submit button → TCPA consent text

## Version

Current Version: 2.0.0 (October 2025)
