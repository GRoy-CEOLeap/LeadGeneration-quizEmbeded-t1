# Compliance Scripts Testing Guide

This guide provides step-by-step instructions to test and verify that Jornaya and TrustedForm compliance scripts are loading correctly and capturing data reliably.

## Quick Start - Browser Console Commands

Once the app is running, you have access to these console commands:

```javascript
// Start real-time monitoring (runs for 15 seconds)
complianceMonitor.start()

// Check current status of all compliance fields
complianceMonitor.check()

// Check if current route should load compliance scripts
complianceMonitor.checkRoute()
```

## Testing Scenarios

### Scenario 1: Fresh Page Load on /quiz Route

**Purpose**: Verify scripts load correctly when user lands directly on a form route.

**Steps**:
1. Open a new incognito/private browser window
2. Navigate to `http://localhost:5173/quiz`
3. Open DevTools Console (F12)
4. Run: `complianceMonitor.start()`

**Expected Results**:
- Within 2-3 seconds, you should see:
  - ✓ JORNAYA READY at ~500-2000ms
  - ✓ TRUSTEDFORM READY at ~1000-3000ms
  - ✓ ALL COMPLIANCE FIELDS READY

**Console Logs to Watch For**:
```
=== COMPLIANCE INITIALIZATION STARTED ===
📡 JORNAYA: Starting script load...
✓ JORNAYA: Script loaded in XXXms
✓ JORNAYA: Field created in DOM at XXXms
✓ JORNAYA: Token populated at XXXms
📡 TRUSTEDFORM: Monitoring field creation...
✓ TRUSTEDFORM: Field created in DOM at XXXms
✓ TRUSTEDFORM: Certificate populated at XXXms
=== COMPLIANCE INITIALIZATION SUMMARY ===
```

**If It Fails**:
- Check if ComplianceProvider detected the route: Look for "ComplianceProvider: Route check"
- Check if scripts are blocked by ad blocker
- Run `complianceMonitor.check()` to see detailed status

---

### Scenario 2: Route Change from Homepage to /quiz

**Purpose**: Verify scripts load when navigating to a form route from a non-form route.

**Steps**:
1. Open a new incognito window
2. Navigate to `http://localhost:5173/` (homepage)
3. Open DevTools Console
4. In console, run: `complianceMonitor.start()`
5. Click any link that goes to `/quiz` or `/start-quiz`
6. Watch the console for initialization logs

**Expected Results**:
- Scripts should initialize within 2-3 seconds of route change
- Same timing as Scenario 1

**If It Fails**:
- ComplianceProvider might not be detecting route change
- React Router might not be updating location properly

---

### Scenario 3: Open Modal Immediately (Rapid Modal Open)

**Purpose**: Test if modal can handle opening before scripts are fully loaded.

**Steps**:
1. Open a new incognito window
2. Navigate to `http://localhost:5173/quiz`
3. Open DevTools Console
4. **Immediately** click the button to open the QuizOverlay modal (within 1 second)
5. Advance through the quiz to the contact form step
6. Watch console logs

**Expected Results**:
- Modal should detect if scripts aren't loaded
- You should see: "⚠ QuizOverlay: Jornaya script not found, initializing fallback..."
- Fallback initialization should complete
- Loading indicator on contact form should wait for fields to be ready

**Console Logs to Watch For**:
```
🔐 QuizOverlay: Modal opened, checking if compliance scripts are initialized
⚠ QuizOverlay: Jornaya script not found, initializing fallback...
✓ QuizOverlay: Fallback Jornaya script loaded successfully
🔐 QuizOverlay: Contact form step detected, initializing compliance bridge
✓ QuizOverlay: Compliance fields ready in XXXms
```

**If It Fails**:
- Fallback mechanism might not be working
- Check if loadJornayaScript is being called

---

### Scenario 4: Modal on Non-Form Route (Homepage)

**Purpose**: Verify fallback initialization works when opening modal on a route without ComplianceProvider.

**Steps**:
1. Navigate to `http://localhost:5173/` (homepage - no compliance scripts)
2. Open DevTools Console
3. Run: `complianceMonitor.checkRoute()` - should say "Scripts SHOULD NOT load"
4. Open the quiz modal from homepage
5. Advance to contact form
6. Run: `complianceMonitor.check()`

**Expected Results**:
- Homepage doesn't initialize scripts (correct behavior)
- Modal detects missing scripts when opened
- Fallback initialization kicks in
- Fields are ready by the time you reach contact form

**Console Logs to Watch For**:
```
ComplianceProvider: No compliance needed for this route
🔐 QuizOverlay: Modal opened, checking if compliance scripts are initialized
⚠ QuizOverlay: Jornaya script not found, initializing fallback...
```

---

### Scenario 5: Close and Reopen Modal

**Purpose**: Verify fields persist and don't break when modal is closed and reopened.

**Steps**:
1. Navigate to `/quiz`
2. Wait 5 seconds for scripts to fully load
3. Open modal
4. Advance to contact form
5. Close modal
6. Wait 2 seconds
7. Reopen modal
8. Advance to contact form again
9. Run: `complianceMonitor.check()`

**Expected Results**:
- Fields should still be present in page DOM
- Modal should clone existing fields (no need to reinitialize)
- Values should be preserved

---

### Scenario 6: Verify Field Cloning into Modal

**Purpose**: Ensure compliance fields from page DOM are properly cloned into the modal form.

**Steps**:
1. Navigate to `/quiz`
2. Wait for scripts to load (watch for completion logs)
3. Run in console:
   ```javascript
   // Check page DOM fields
   const pageJ = document.getElementById('leadid_token');
   const pageTF = document.querySelector('[id^="xxTrustedFormCertUrl"]');
   console.log('Page DOM:', {
     jornaya: pageJ?.value?.substring(0, 50),
     trustedForm: pageTF?.value?.substring(0, 80)
   });
   ```
4. Open modal and advance to contact form
5. Run in console:
   ```javascript
   // Check modal form fields
   const form = document.getElementById('lead-capture-form');
   const modalJ = form?.querySelector('#leadid_token');
   const modalTF = form?.querySelector('[id^="xxTrustedFormCertUrl"]');
   console.log('Modal Form:', {
     jornaya: modalJ?.value?.substring(0, 50),
     trustedForm: modalTF?.value?.substring(0, 80)
   });
   ```

**Expected Results**:
- Both page DOM and modal form should have the same values
- Values should match exactly

**If They Don't Match**:
- Clone function might not be working
- Check console for: "✓ QuizOverlay: Fields cloned to modal form"

---

### Scenario 7: Submit Form and Verify Data

**Purpose**: Ensure compliance tokens are included in the final submission payload.

**Steps**:
1. Navigate to `/quiz`
2. Complete entire quiz flow
3. Fill out contact form
4. Before clicking "Get My Options", open DevTools Network tab
5. Click submit
6. Find the POST request to your webhook
7. Check Request Payload

**Expected Results**:
- Payload should include:
  ```json
  {
    "leadid_token": "eyJ0eXAiOiJKV1Q...",
    "leadid_timestamp": "2025-10-06T...",
    "xxTrustedFormCertUrl": "https://cert.trustedform.com/..."
  }
  ```

**Console Logs to Watch For**:
```
QuizOverlay: Syncing compliance fields before final submission
QuizOverlay: Compliance data for submission
Final submission payload: { ... }
```

---

## Debugging Commands

### Check Script Tags in DOM

```javascript
// Check if Jornaya script tag exists
const jScript = document.getElementById('LeadiDscript_campaign');
console.log('Jornaya Script:', {
  exists: !!jScript,
  src: jScript?.src
});

// Check if TrustedForm script exists
const allScripts = Array.from(document.querySelectorAll('script'));
const tfScript = allScripts.find(s => s.src.includes('trustedform.com'));
console.log('TrustedForm Script:', {
  exists: !!tfScript,
  src: tfScript?.src
});
```

### Check Field Values

```javascript
// Quick field check
const j = document.getElementById('leadid_token');
const tf = document.querySelector('[id^="xxTrustedFormCertUrl"]');
console.log({
  jornaya: { exists: !!j, hasValue: !!j?.value, length: j?.value?.length },
  trustedForm: { exists: !!tf, hasValue: !!tf?.value, length: tf?.value?.length }
});
```

### Monitor Field Population in Real-Time

```javascript
// Set up continuous monitoring
let count = 0;
const monitor = setInterval(() => {
  count++;
  const j = document.getElementById('leadid_token');
  const tf = document.querySelector('[id^="xxTrustedFormCertUrl"]');

  console.log(`Check ${count}:`, {
    jornaya: j?.value ? '✓ HAS VALUE' : '✗ NO VALUE',
    trustedForm: tf?.value ? '✓ HAS VALUE' : '✗ NO VALUE'
  });

  if ((j?.value && tf?.value) || count > 30) {
    clearInterval(monitor);
    console.log('Monitoring stopped');
  }
}, 500);
```

---

## Common Issues and Solutions

### Issue: "✗ JORNAYA: Token not populated after 15 seconds"

**Possible Causes**:
- Ad blocker blocking Jornaya domain
- Network firewall blocking script
- Incorrect campaign ID or account ID in config

**Solutions**:
1. Disable ad blocker and retry
2. Check browser DevTools Network tab for failed requests
3. Verify config values in `src/config/compliance.config.ts`

---

### Issue: Scripts load on wrong routes

**Check**:
```javascript
complianceMonitor.checkRoute()
```

**Solution**:
- Edit `ROUTES_WITH_FORMS` in `src/core/components/ComplianceProvider.tsx`
- Add or remove routes as needed

---

### Issue: Fields exist but have empty values

**Possible Causes**:
- Script loaded but API failed to generate token
- Too quick - checked before token was generated
- Network delay

**Solutions**:
1. Wait longer (use `complianceMonitor.start()` to track timing)
2. Check Network tab for API calls to Jornaya/TrustedForm
3. Check for JavaScript errors in Console

---

### Issue: Modal form doesn't have cloned fields

**Check if fields exist in page DOM first**:
```javascript
complianceMonitor.check()
```

**If page DOM has fields but modal doesn't**:
- Check console for: "✓ QuizOverlay: Fields cloned to modal form"
- Verify form ref exists: `document.getElementById('lead-capture-form')`
- Check if bridge system ran: Look for "🔐 QuizOverlay: Contact form step detected"

---

## Success Criteria

For a **99% success rate**, you should see:

1. ✅ Scripts load within 2-3 seconds on form routes
2. ✅ Fields populated within 3-5 seconds max
3. ✅ Fallback initialization works when opening modal early
4. ✅ Fields clone correctly into modal form
5. ✅ Submission payload includes compliance tokens
6. ✅ Works across all scenarios (fresh load, route change, modal open, etc.)

---

## Quick Test Checklist

Run through these quickly to verify everything:

- [ ] Navigate to `/quiz` - scripts load automatically
- [ ] Run `complianceMonitor.start()` - both fields ready within 5s
- [ ] Open modal immediately after page load - fallback works
- [ ] Complete quiz and submit - tokens in payload
- [ ] Close and reopen modal - fields still work
- [ ] Navigate from `/` to `/quiz` - scripts initialize on route change
- [ ] Check modal form fields - matches page DOM values

If all checkboxes pass, your compliance implementation is working at 99% reliability! 🎉
