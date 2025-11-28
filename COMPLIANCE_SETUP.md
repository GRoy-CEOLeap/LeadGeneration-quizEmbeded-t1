# Compliance Setup Guide

## Overview

This framework includes built-in support for two major compliance tracking services:
- **Jornaya LeadiD**: Lead tracking and verification
- **TrustedForm**: Form submission certification

Both services load automatically when the quiz opens and capture data during form submission.

## Jornaya LeadiD Setup

### 1. Create Account
- Visit [jornaya.com](https://jornaya.com)
- Sign up for a business account
- Complete account verification

### 2. Get Your Credentials
- Log into your Jornaya dashboard
- Navigate to "Campaigns" section
- Create a new campaign or use existing
- Copy your **Campaign ID** and **Account ID**

### 3. Update Configuration
Edit `src/config/compliance.config.ts`:

```typescript
jornaya: {
  enabled: true,
  campaignId: 'YOUR_CAMPAIGN_ID_HERE',
  accountId: 'YOUR_ACCOUNT_ID_HERE',
  fieldName: 'universal_leadid'
}
```

### 4. Verify Implementation
- The LeadiD script loads when quiz opens
- Token captures automatically during form interaction
- Data included in final submission as `leadid_token`

## TrustedForm Setup

### 1. Create Account
- Visit [trustedform.com](https://trustedform.com)
- Sign up for a business account
- Complete account verification

### 2. Domain Verification
- Add your domain to TrustedForm dashboard
- Complete domain verification process
- No code changes needed - framework handles everything

### 3. Configuration (Already Set)
The framework is pre-configured for TrustedForm:

```typescript
trustedForm: {
  enabled: true,
  fieldName: 'xxTrustedFormCertUrl',
  provideReferrer: true,
  invertFieldSensitivity: false
}
```

### 4. Verify Implementation
- TrustedForm script loads when quiz opens
- Certificate generates automatically on verified domains
- Data included in final submission as `xxTrustedFormCertUrl`

## How It Works

### Script Loading
- Both scripts load when the quiz modal opens (not on page load)
- Loading happens in parallel for better performance
- Scripts are cached after first load

### Data Capture
- **Jornaya**: Captures LeadiD token from hidden form field
- **TrustedForm**: Captures certificate URL from generated field
- Both capture page URL and timestamp

### Form Submission
Final payload includes compliance data:

```json
{
  "leadid_token": "jornaya_token_here",
  "leadid_timestamp": "2025-01-XX...",
  "xxTrustedFormCertUrl": "https://cert.trustedform.com/...",
  "page_url": "https://yourdomain.com/",
  // ... other form data
}
```

## Troubleshooting

### Jornaya Issues

**Problem**: LeadiD token not capturing
- **Check**: Campaign ID and Account ID are correct
- **Check**: Script loads without errors in browser console
- **Check**: Hidden input field `leadid_token` exists in DOM

**Problem**: Script not loading
- **Verify**: `jornaya.enabled` is `true` in config
- **Check**: No ad blockers interfering
- **Test**: Try in incognito mode

### TrustedForm Issues

**Problem**: Certificate not generating
- **Check**: Domain is verified in TrustedForm dashboard
- **Check**: Using HTTPS (required for TrustedForm)
- **Wait**: Certificates can take 2-3 seconds to generate

**Problem**: Certificate field empty
- **Verify**: `trustedForm.enabled` is `true` in config
- **Check**: Script loads without errors
- **Test**: Wait longer - certificates generate after user interaction

### General Debugging

Enable debug mode to see detailed logging:

```bash
# In your .env file
VITE_DEBUG_MODE=true
```

This will show:
- Script loading status
- Token/certificate capture attempts
- Final submission payload details

## Production Checklist

### Before Launch
- [ ] Jornaya Campaign ID and Account ID configured
- [ ] TrustedForm domain verified
- [ ] Both services tested on staging environment
- [ ] Debug mode disabled (`VITE_DEBUG_MODE=false`)
- [ ] HTTPS enabled (required for TrustedForm)

### Testing
- [ ] Complete quiz flow and check final payload
- [ ] Verify tokens/certificates in submission data
- [ ] Test with different browsers
- [ ] Test with ad blockers enabled
- [ ] Confirm data reaches your webhook correctly

### Monitoring
- Monitor your webhook logs for compliance data
- Check Jornaya dashboard for lead tracking
- Verify TrustedForm certificates in their dashboard
- Set up alerts for missing compliance data

## Support

### Framework Issues
- Check browser console for JavaScript errors
- Verify configuration in `compliance.config.ts`
- Test with debug mode enabled

### Service-Specific Issues
- **Jornaya**: Contact Jornaya support with Campaign ID
- **TrustedForm**: Contact TrustedForm support with domain info

### Common Solutions
1. **Clear browser cache** after configuration changes
2. **Disable ad blockers** during testing
3. **Use HTTPS** for both development and production
4. **Wait 2-3 seconds** after form interaction for certificate generation