# Deployment Standard Operating Procedure (SOP)

## Overview

This document outlines the complete process for deploying the framework for a new client. Follow these steps in order to ensure proper configuration and compliance setup.

## Prerequisites

- Access to client's branding materials
- Client's legal entity information
- Compliance requirements (TCPA, GDPR, CCPA)
- API endpoints and credentials
- Domain information

---

## STEP 1: Initial Setup

### 1.1 Fork Repository
```bash
git clone [framework-repo]
cd [project-name]
npm install
```

### 1.2 Environment Configuration
```bash
cp .env.example .env
```

Update `.env` with client-specific values:
```env
VITE_ENV=development
VITE_LEAD_WEBHOOK=https://client-webhook.com/leads
VITE_ZIP_VALIDATOR=https://api.client.com/validate-zip
VITE_EMAIL_VALIDATOR=https://api.client.com/validate-email
VITE_PHONE_VALIDATOR=https://api.client.com/validate-phone
VITE_QUALIFICATION_API=https://api.client.com/qualify
VITE_DEBUG_MODE=true
```

---

## STEP 2: Client Configuration

### 2.1 Update Site Configuration
**File:** `src/config/site.config.ts`

```typescript
export const siteConfig = {
  // Client Identity
  client: {
    name: "[CLIENT_NAME]",
    legalName: "[CLIENT_LEGAL_NAME]", 
    domain: "[CLIENT_DOMAIN]",
    established: "[YEAR]"
  },
  
  // Compliance Configuration
  compliance: {
    contact: {
      email: "[CLIENT_EMAIL]",
    },
    messaging: {
      companyName: "[CLIENT_NAME]",
      replyKeywords: {
        stop: "STOP",
        help: "HELP"
      }
    },
    legal: {
      lastUpdated: "[MONTH YEAR]",
      jurisdiction: "[STATE/COUNTRY]",
      arbitrationLocation: "[CITY, STATE]"
    }
  },
  
  // Feature Flags for Compliance
  features: {
    requiresGDPR: false, // Enable for EU clients
    requiresCCPA: true,  // Enable for California
    requiresTCPA: true,  // SMS consent
    cookieConsent: true, // Cookie banner
    ageVerification: false // If needed
  }
}
```

### 2.2 Update Content Configuration
**File:** `src/config/content.config.ts`

Update hero section:
```typescript
hero: {
  headline: "[CLIENT_SPECIFIC_HEADLINE]",
  subheadline: "[CLIENT_SPECIFIC_SUBHEADLINE]",
  cta: {
    text: "[CLIENT_CTA_TEXT]",
    action: "openQuiz"
  },
  trustBadges: [
    "[TRUST_BADGE_1]",
    "[TRUST_BADGE_2]", 
    "[TRUST_BADGE_3]"
  ]
}
```

### 2.3 Update Quiz Configuration
**File:** `src/config/quiz.config.ts`

Review and update:
- Question text for client's industry
- Helper text
- Sidebar content
- Submission webhook endpoint

---

## STEP 3: Compliance Setup

### 3.1 Update Compliance Configuration
**File:** `src/config/compliance.config.ts`

```typescript
export const complianceConfig: ComplianceConfig = {
  jornaya: {
    enabled: true, // Set to true if client uses Jornaya
    campaignId: '[CLIENT_JORNAYA_CAMPAIGN_ID]',
    accountId: '[CLIENT_JORNAYA_ACCOUNT_ID]',
    fieldName: 'universal_leadid'
  },
  trustedForm: {
    enabled: true, // Set to true if client uses TrustedForm
    fieldName: 'xxTrustedFormCertUrl',
    provideReferrer: true,
    invertFieldSensitivity: false
  }
};
```

### 3.2 Review Compliance Content
**File:** `src/config/compliance.content.config.ts`

Verify consent templates match client's legal requirements:
- TCPA consent text
- Privacy policy links
- Terms of service links
- Opt-out instructions

---

## STEP 4: Branding & Assets

### 4.1 Logo Replacement
Replace logo file in `public/` directory:
- Update filename in Hero component
- Ensure proper dimensions (recommended: 330x330px)
- Use SVG format for scalability

### 4.2 Color Scheme Updates
**File:** `tailwind.config.js`

Update brand colors:
```javascript
colors: {
  primary: {
    // Client's primary color palette
    500: '#[CLIENT_PRIMARY_COLOR]',
    600: '#[CLIENT_PRIMARY_DARK]',
  },
  secondary: {
    // Client's secondary color palette
    500: '#[CLIENT_SECONDARY_COLOR]',
  },
  accent: {
    // Client's accent color palette
    500: '#[CLIENT_ACCENT_COLOR]',
  }
}
```

---

## STEP 5: Legal Pages Setup

### 5.1 Privacy Policy
**File:** `src/core/pages/PrivacyPolicy.tsx`
- Update with client's privacy policy content
- Ensure compliance with local laws (CCPA, GDPR)
- Include proper contact information

### 5.2 Terms of Service
**File:** `src/core/pages/TermsOfService.tsx`
- Update with client's terms
- Include proper jurisdiction clauses
- Update arbitration location

### 5.3 TCPA Disclaimer
**File:** `src/core/pages/TCPADisclaimer.tsx`
- Update with client-specific TCPA compliance text
- Include proper opt-out instructions
- Update contact information

---

## STEP 6: API Integration

### 6.1 Webhook Configuration
Update webhook endpoints in environment config:
- Lead submission endpoint
- Validation endpoints
- Analytics endpoints

### 6.2 Third-Party Integrations
Configure integrations in `FormService`:
- CRM integration (HubSpot, Salesforce)
- Email service provider
- Analytics platforms

---

## STEP 7: Testing & Validation

### 7.1 Local Testing
```bash
npm run dev
```

Test all functionality:
- Quiz flow completion
- Form submissions
- Validation services
- Compliance tracking

### 7.2 Compliance Testing
- Verify Jornaya LeadiD capture
- Test TrustedForm certificate generation
- Validate consent capture
- Check TCPA compliance

### 7.3 Cross-Browser Testing
Test on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

---

## STEP 8: Production Deployment

### 8.1 Environment Variables
Update production `.env`:
```env
VITE_ENV=production
VITE_DEBUG_MODE=false
# Update all endpoints to production URLs
```

### 8.2 Build & Deploy
```bash
npm run build
# Deploy to hosting platform
```

### 8.3 Domain Configuration
- Configure custom domain
- Set up SSL certificate
- Update DNS records

---

## New Client Deployment Checklist

### 1. Configuration Updates
- [ ] Update `site.config.ts` with client details
- [ ] Set compliance email
- [ ] Configure legal jurisdiction
- [ ] Enable required feature flags

### 2. Content Updates  
- [ ] Review consent templates
- [ ] Update form field labels if needed
- [ ] Set success/error messages
- [ ] Update hero section content
- [ ] Review quiz questions and helpers

### 3. Environment Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Set API endpoints
- [ ] Configure analytics IDs
- [ ] Set feature toggles
- [ ] Update webhook URLs

### 4. Branding
- [ ] Replace logo files
- [ ] Update color scheme in Tailwind config
- [ ] Test responsive design
- [ ] Verify brand consistency

### 5. Compliance Setup
- [ ] Configure Jornaya (if required)
- [ ] Configure TrustedForm (if required)
- [ ] Update consent templates
- [ ] Set compliance feature flags
- [ ] Test compliance data capture

### 6. Legal Pages
- [ ] Update Privacy Policy content
- [ ] Update Terms of Service content
- [ ] Update TCPA Disclaimer content
- [ ] Verify all legal links work
- [ ] Check jurisdiction information

### 7. Testing
- [ ] Test form submission end-to-end
- [ ] Verify email delivery
- [ ] Check analytics tracking
- [ ] Validate consent capture
- [ ] Test all validation services
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

### 8. Legal Review
- [ ] Confirm TCPA text accuracy
- [ ] Verify privacy policy link
- [ ] Check terms of service link
- [ ] Validate jurisdiction details
- [ ] Review opt-out mechanisms

### 9. Production Deployment
- [ ] Update production environment variables
- [ ] Build and deploy application
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test production deployment
- [ ] Monitor error logs

### 10. Post-Deployment
- [ ] Verify all forms work in production
- [ ] Check compliance data flow
- [ ] Monitor analytics
- [ ] Test email notifications
- [ ] Document any client-specific customizations

---

## Troubleshooting

### Common Issues

1. **Compliance Scripts Not Loading**
   - Check network requests in browser dev tools
   - Verify campaign IDs and account IDs
   - Ensure HTTPS is enabled

2. **Form Submissions Failing**
   - Check webhook endpoint URLs
   - Verify API credentials
   - Check CORS settings

3. **Validation Services Not Working**
   - Verify API endpoints in environment config
   - Check API credentials
   - Test endpoints directly

4. **Styling Issues**
   - Clear browser cache
   - Rebuild Tailwind CSS
   - Check for conflicting styles

### Support Contacts

- **Framework Issues**: [FRAMEWORK_SUPPORT_EMAIL]
- **Compliance Questions**: [COMPLIANCE_SUPPORT_EMAIL]
- **Technical Support**: [TECH_SUPPORT_EMAIL]

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial SOP creation |
| 1.1 | [DATE] | Added compliance checklist |
| 1.2 | [DATE] | Updated for new client requirements |

---

*This document should be updated with each framework version release.*