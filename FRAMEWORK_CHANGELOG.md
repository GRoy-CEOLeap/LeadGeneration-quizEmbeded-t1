# Framework Changelog

## [1.3.0] - 2025-10-05

### Route-Based Compliance Loading System
- Implemented conditional compliance script loading based on active route
- Added `ComplianceProvider` wrapper component with route detection logic
- Created `ROUTES_WITH_FORMS` constant to define form-enabled routes
- Integrated React Router's `useLocation` hook for route monitoring
- Scripts now load only on routes containing forms: `/start-quiz`, `/quiz`, `/get-quote`, `/quote`, `/contact`

### TrustedForm 204 Error Resolution
- Fixed TrustedForm 204 errors caused by script loading on non-form pages
- TrustedForm certificate generation now only occurs on form-enabled routes
- Hidden form element creation moved to route-conditional logic
- Improved TrustedForm field detection with proper timing

### Performance Improvements
- Eliminated unnecessary script loading on informational pages
- Reduced page load overhead on non-form routes
- Improved initial page render performance
- Cleaner separation between form and non-form route behavior

### Architecture Enhancements
- `ComplianceProvider` wraps all application routes in `App.tsx`
- Route matching supports both exact and prefix matching for nested routes
- `TrustedFormProvider` conditionally renders based on route context
- `ComplianceScripts` component only mounts on form-enabled routes

### Developer Experience
- Clear documentation for adding new form-enabled routes
- Console logging for route detection and compliance initialization
- Simplified debugging with route-specific compliance behavior
- Better maintainability with centralized route configuration

## [1.2.0] - 2025-01-XX

### Footer Enhancement
- Redesigned footer layout to match professional standards
- Added company logo integration in footer branding
- Implemented "Contact Us" link in footer navigation
- Enhanced contact information display with email button styling
- Reduced description text size for better visual hierarchy
- Added Facebook disclaimer for legal compliance
- Improved responsive design and hover effects
- Maintained all existing legal links and compliance disclaimers

### UI/UX Improvements
- Professional dark slate background design
- Clean typography with proper spacing
- Responsive grid layout for different screen sizes
- Enhanced accessibility with proper link styling

## [1.1.0] - 2025-01-XX

### Compliance System Enhancement
- Added comprehensive compliance tracking system
- Integrated Jornaya LeadiD for lead verification
- Integrated TrustedForm for form submission certification
- Scripts load when quiz opens (not page load) for better performance
- Automatic token/certificate capture during form interaction
- Clean production code with debug mode support
- Complete setup documentation and troubleshooting guide

### Code Quality Improvements
- Removed all debug console.log statements from production code
- Added debug mode toggle for development logging
- Cleaned up compliance utility functions
- Enhanced error handling with silent fallbacks
- Production-ready compliance configuration template

### Documentation
- Added COMPLIANCE_SETUP.md with complete setup guide
- Step-by-step instructions for both services
- Troubleshooting section for common issues
- Production checklist and monitoring guidelines

## [1.0.0] - 2024-12-XX

### Initial Release
- Multi-step quiz with validation
- Multiple layout templates (Home, Hero)
- Real-time field validation (ZIP, email, phone)
- Session tracking and management
- Error handling and reporting
- Responsive design
- Legal pages framework
- Configuration-driven architecture

### Core Components
- QuizOverlay with multi-step flow
- Hero section with CTA
- Value Propositions
- How It Works
- Trust & Transparency
- FAQ section
- Footer with legal links

### Layouts
- HomeLayout: Full homepage experience
- HeroLayout: Minimal high-conversion layout

### Utilities
- ZIP validation with blacklist
- Email validation with MX checking
- Phone formatting and validation
- Session management
- Error boundary and reporting

### Framework Structure
- src/core/ - Framework components (never modified by clients)
- src/config/ - Client configuration files
- src/custom/ - Client-specific customizations
- netlify/functions/ - Serverless functions

### Configuration Files
- content.config.ts - All text and copy
- theme.config.ts - Colors and styling
- quiz.config.ts - Quiz questions and flow
- site.config.ts - Site metadata
- legal.config.ts - Legal page content
- layout.config.ts - Layout selection
- routes.config.ts - Routing configuration
- environment.config.ts - API endpoints