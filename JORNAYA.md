# Jornaya LeadID Journey Tracking Analysis

## Executive Summary

This document provides a complete technical diagnosis of why Jornaya LeadID successfully captures the entire user journey in **Quiz Overlay** but struggles to capture the journey in **Quiz Embedded**.

### The Core Issue

**Quiz Overlay**: ✅ Captures complete journey with 7-8 tracking pixels
**Quiz Embedded**: ❌ Captures 0-1 tracking pixels, missing journey data

### Initial Hypothesis (DISPROVEN)
Initially suspected page redirects were causing script context loss. Implemented SPA anchor strategy to eliminate redirects. **This did not fix the issue.**

### Actual Root Cause
The problem is **NOT navigation-related**. The issue is:
1. **Missing Journey Tracking Infrastructure** - Quiz Embedded never calls `triggerJornayaHashEvent()`
2. **State-Based Navigation** - React state changes are invisible to Jornaya
3. **No Hash Modifications** - URL stays static, no step progression signals
4. **Potential HTML Structure Issues** - Button elements vs radio inputs, missing data attributes

---

## How Jornaya LeadID Works

### Core Tracking Mechanism

Jornaya LeadID is a compliance tracking service that captures user behavior through forms to provide TCPA (Telephone Consumer Protection Act) compliance proof. It works through three primary components:

#### 1. Script Injection & Token Generation

**Loading Pattern:**
```javascript
// Wrapper script dynamically loads campaign script
(function() {
  var s = document.createElement('script');
  s.id = 'LeadiDscript_campaign';
  s.src = '//create.lidstatic.com/campaign/CAMPAIGN_ID.js?snippet_version=2';
  s.type = 'text/javascript';
  document.body.appendChild(s);
})();
```

**Token Population:**
```html
<!-- Hidden field MUST exist BEFORE script loads -->
<input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
```

The Jornaya script:
- Loads asynchronously from `create.lidstatic.com`
- Finds the pre-existing `#leadid_token` field in DOM
- Generates a unique session token (128-256 characters)
- Populates the hidden field with the token
- Token encodes: account ID, campaign ID, session start, user agent hash, IP hash

**Token Structure:**
```
abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567ABC890DEF123GHI456JKL789...
(Base64-encoded, typically 128-256 characters)
```

#### 2. Journey Tracking via Hash Events

Jornaya captures the user's journey through "hash events" - tracking pixels that fire as the user progresses through form steps.

**Hash Event Pixel Structure:**
```
//create.leadid.com/capture.gif?
  lac=6923                           // LeadID Account ID
  &lck=1ht5g35                       // LeadID Campaign Key
  &token=abc123def456...             // Session token
  &event=step_2                      // Event identifier
  &hash=accident_type                // Step hash/identifier
  &route=homelayout                  // Route context (optional)
  &url=https://example.com/%23step2  // Current page URL
  &t=1705320600000                   // Timestamp (cache buster)
```

**What This Captures:**
- **Step Number**: Which question the user is on
- **Step Identifier**: What type of question (state, accident_type, etc.)
- **Timestamp**: When the user reached this step
- **Page URL**: Full URL including hash/anchor
- **Route Context**: Where in the application this occurred

**Journey Example:**
```
Step 1: event=step_1, hash=state,         timestamp=10:30:00
Step 2: event=step_2, hash=accident_type, timestamp=10:30:15
Step 3: event=step_3, hash=accident_date, timestamp=10:30:30
Step 4: event=step_4, hash=at_fault,      timestamp=10:30:45
Step 5: event=step_5, hash=zip,           timestamp=10:31:00
```

This creates a timestamped sequence proving the user progressed through the form organically, not via bot or auto-fill.

#### 3. TCPA Disclosure Tracking

Jornaya monitors for TCPA consent disclosure visibility:

```html
<div id="leadid_tcpa_disclosure">
  By clicking submit, you agree to be contacted by phone...
</div>
```

The script tracks:
- When the TCPA disclosure became visible
- How long it was displayed before submission
- Whether the user could reasonably see the consent text
- Form field interactions after disclosure appeared

#### 4. Form Interaction Monitoring

Jornaya may also track:
- Input field focus/blur events
- Radio button/checkbox selections
- Form field values (question IDs and answers)
- Time spent on each field
- Keystroke patterns (to detect bots)

**Potential DOM Scanning:**
The script likely scans for semantic HTML structures:
```html
<!-- Recognized patterns -->
<input type="radio" name="step-2-accident_type" value="car_accident" />
<input type="checkbox" data-question-id="treatment_type" />
<select name="state" data-leadid-capture="true">
```

It may look for:
- Standard form input elements (`<input>`, `<select>`, `<textarea>`)
- `name` attributes with recognizable patterns
- `data-*` attributes indicating question metadata
- Form structure within/near `#leadid_tcpa_disclosure`

---

## Implementation Files & Architecture

### Core Compliance Files

```
src/core/
├── components/
│   ├── ComplianceProvider.tsx       # Wraps entire app
│   ├── ComplianceScripts.tsx        # Loads Jornaya script on mount
│   ├── JornayaField.tsx             # Hidden input field component
│   ├── QuizOverlay.tsx              # Modal quiz (WORKING)
│   └── QuizEmbedded.tsx             # Embedded quiz (BROKEN)
├── utils/
│   ├── compliance.ts                # Core compliance utilities
│   ├── leadidMonitor.ts             # Token detection & storage
│   ├── jornayaHashTracking.ts       # Journey pixel tracking
│   └── complianceMonitor.ts         # Console debugging tools
└── pages/
    ├── QuoteLanding.tsx             # ZIP entry page
    └── QuoteQuiz.tsx                # Embedded quiz wrapper
```

### Application Structure

```
App.tsx
  └── ComplianceProvider (wraps all routes)
      └── ComplianceScripts (loads on mount)
          ├── Jornaya script load
          └── LeadID monitor start

Routes:
  / → HomeLayout (uses QuizOverlay modal)
  /quote → QuoteLanding (ZIP entry)
  /quote/quiz → QuoteQuiz → QuizEmbedded
```

---

## Quiz Overlay Implementation (WORKING ✅)

### Architecture Overview

**Component:** `src/core/components/QuizOverlay.tsx`
**Display:** Modal overlay on top of existing page
**Navigation:** Hash-based (#state, #accident_type, #zip, etc.)
**Route:** Stays on same route (/, /get-quote, /start-quiz)

### User Journey Flow

```
1. User lands on page (/)
   ↓
2. ComplianceProvider wraps app (App.tsx:50)
   ↓
3. ComplianceScripts loads Jornaya script (ComplianceScripts.tsx:36-63)
   ↓
4. Script finds #leadid_token field in page DOM
   ↓
5. Token generated and populated (~1-2 seconds)
   ↓
6. User clicks "Start Free Case Review" button
   ↓
7. QuizOverlay modal opens (stays on same page/route)
   ↓
8. User sees qualifying question #1: State selection
   ↓
9. User selects state → Hash changes to #state
   ↓
10. Hash change triggers: triggerJornayaHashEvent(1, 'state', 'homelayout')
    ↓
11. Pixel sent: //create.leadid.com/capture.gif?...&event=step_1&hash=state
    ↓
12. User proceeds to question #2: Accident Type
    ↓
13. Hash changes to #accident_type
    ↓
14. Pixel sent: ...&event=step_2&hash=accident_type
    ↓
15. [Process repeats for each question: 3, 4, 5, 6, 7...]
    ↓
16. User reaches contact form (final step)
    ↓
17. ComplianceBridge clones fields from page DOM to modal
    ↓
18. User fills contact details (first, last, email, phone)
    ↓
19. TCPA disclosure visible with id="leadid_tcpa_disclosure"
    ↓
20. User submits form
    ↓
21. Payload includes: leadid_token with full journey data
```

### Network Traffic (Successful)

```
[Initial Page Load]
GET //create.lidstatic.com/campaign/1ht5g35.js
Status: 200 OK (234ms)

[Token Population - Automatic]
DOM Field Updated: #leadid_token = "abc123def456..." (1456ms after load)
Session Storage: compliance_data.leadid_token stored

[Question 1: State]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_1&hash=state&url=...
Status: 200 OK (45ms)

[Question 2: Accident Type]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_2&hash=accident_type&url=...
Status: 200 OK (42ms)

[Question 3: Accident Date]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_3&hash=accident_date&url=...
Status: 200 OK (48ms)

[Question 4: At Fault]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_4&hash=at_fault&url=...
Status: 200 OK (43ms)

[Question 5: Treatment Window]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_5&hash=treatment_window&url=...
Status: 200 OK (46ms)

[Question 6: Attorney Status]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_6&hash=attorney_status&url=...
Status: 200 OK (44ms)

[Question 7: ZIP Code]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_7&hash=zip&url=...
Status: 200 OK (47ms)

[Question 8: Contact Form]
GET //create.leadid.com/capture.gif?lac=6923&lck=1ht5g35&token=abc123...&event=step_8&hash=contact&url=...
Status: 200 OK (45ms)

[Final Submission]
POST https://n8n-webhook.com/api/leads
Payload includes: leadid_token: "abc123def456..." (with journey timestamps)
```

**Result:** ✅ 8 pixels fired, one per step. Complete journey captured.

### Code Implementation Details

#### 1. Compliance Script Initialization

**File:** `src/App.tsx` (lines 48-60)
```typescript
return (
  <ErrorBoundary>
    <Router>
      <ComplianceProvider>  {/* Wraps entire app */}
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          {/* Other routes */}
        </Routes>
      </ComplianceProvider>
    </Router>
  </ErrorBoundary>
);
```

**File:** `src/core/components/ComplianceProvider.tsx`
```typescript
export const ComplianceProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ComplianceScripts />  {/* Loads compliance scripts on mount */}
      {children}
    </>
  );
};
```

**File:** `src/core/components/ComplianceScripts.tsx` (lines 36-69)
```typescript
useEffect(() => {
  // Load Jornaya script if enabled
  if (complianceConfig.jornaya.enabled) {
    loadJornayaScript()
      .then(() => {
        console.log('✓ JORNAYA: Script loaded');
        startLeadIdMonitor(); // Start monitoring for token
      })
      .catch(error => {
        console.error('✗ JORNAYA: Script failed to load', error);
      });
  }
}, []); // Runs once on mount
```

**File:** `src/core/utils/leadidMonitor.ts` (lines 14-46)
```typescript
export function startLeadIdMonitor(): void {
  console.log('[LeadID Monitor] Starting real-time monitoring');

  monitorInterval = window.setInterval(() => {
    const leadIdField = document.getElementById('leadid_token') as HTMLInputElement;

    if (!leadIdField) return;

    const token = leadIdField.value?.trim();

    if (token && token.length > 0) {
      console.log('[LeadID Monitor] ✓ Token detected:', token.substring(0, 20) + '...');
      storeLeadId(token); // Store in sessionStorage
      stopLeadIdMonitor(); // Stop checking
    }
  }, 500); // Check every 500ms
}
```

#### 2. Hidden Field Creation

**File:** `src/core/components/JornayaField.tsx`
```typescript
/**
 * CRITICAL: This field MUST exist in the form BEFORE the Jornaya script loads.
 * The Jornaya script will populate the value of this pre-existing field.
 */
export const JornayaField: React.FC = () => {
  return (
    <input
      id="leadid_token"
      name="universal_leadid"
      type="hidden"
      value=""
    />
  );
};
```

**File:** `src/core/components/QuizOverlay.tsx` (line 1050)
```typescript
<form ref={formRef} id="lead-capture-form">
  {/* Jornaya LeadID Hidden Field - Must exist before script loads */}
  <JornayaField />

  {/* Other form fields */}
</form>
```

#### 3. Hash-Based Journey Tracking

**File:** `src/core/layouts/HomeLayout.tsx` (lines 140-166)
```typescript
// Listen for hash changes in URL
useEffect(() => {
  const trackHashChange = () => {
    const hash = window.location.hash.slice(1); // Remove '#'
    const stepNumber = getStepNumber(hash, totalSteps);

    if (stepNumber && stepNumber >= 1 && stepNumber <= totalSteps) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        triggerJornayaHashEvent(stepNumber, hash, 'home');
      }, 100);
    }
  };

  window.addEventListener('hashchange', trackHashChange);

  return () => {
    window.removeEventListener('hashchange', trackHashChange);
  };
}, [totalSteps]);

// Navigate to specific step
const goToStep = (step: number) => {
  const stepId = getStepId(step, totalSteps);
  if (stepId) {
    window.location.hash = stepId; // Change URL hash
    setTimeout(() => {
      triggerJornayaHashEvent(step, stepId, 'home');
    }, 150);
  }
};
```

**File:** `src/core/utils/jornayaHashTracking.ts` (lines 94-159)
```typescript
export function triggerJornayaHashEvent(
  stepNumber: number,
  stepHash: string,
  route: string = 'unknown'
): void {
  if (!complianceConfig.jornaya.enabled) {
    console.log(`[Jornaya Hash - ${route}] Jornaya disabled, skipping`);
    return;
  }

  console.log(`[Jornaya Hash - ${route}] Hash changed to: ${stepHash} (step ${stepNumber})`);

  // Get token from session storage or DOM
  const token = getTokenFromAllSources(route);

  if (!token) {
    console.warn(`[Jornaya Hash - ${route}] No token available, skipping pixel`);
    return;
  }

  // Build pixel URL
  const { accountId, campaignId } = getJornayaCredentials();
  const img = new Image();
  img.src = `//create.leadid.com/capture.gif?` +
            `lac=${accountId}&` +
            `lck=${campaignId}&` +
            `token=${token}&` +
            `event=step_${stepNumber}&` +
            `hash=${encodeURIComponent(stepHash)}&` +
            `route=${route}&` +
            `url=${encodeURIComponent(window.location.href)}&` +
            `t=${Date.now()}`;

  img.style.display = 'none';

  img.onload = () => {
    console.log(`[Jornaya Hash - ${route}] ✓ Pixel sent: step ${stepNumber} (${stepHash})`);
    document.body.removeChild(img);
  };

  img.onerror = () => {
    console.error(`[Jornaya Hash - ${route}] ✗ Pixel failed: step ${stepNumber}`);
    document.body.removeChild(img);
  };

  document.body.appendChild(img);
}
```

#### 4. Semantic HTML Structure (Radio Inputs)

**File:** `src/core/components/QuizOverlay.tsx` (lines 1003-1030)
```typescript
{getOptions(currentStep).map((option, index) => {
  const currentQuestion = qualifyingQuestions[currentStep];
  const optionConfig = currentQuestion.options?.find(opt => opt.label === option);
  const isSelected = quizData[currentQuestion.id] === optionConfig?.value;

  return (
    <label
      key={index}
      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer
        ${isSelected ? 'border-navy bg-gradient-to-r from-teal-50' : 'border-primary-200'}`}
    >
      <input
        type="radio"
        name={`step-${currentStep}-${steps[currentStep].id}`}
        value={option}
        checked={isSelected}
        onChange={(e) => handleOptionSelect(e.target.value)}
        className="w-4 h-4 text-teal mr-3"
      />
      <div className="flex items-center justify-between flex-1">
        <span className="font-semibold">{option}</span>
        {isSelected && (
          <div className="bg-secondary text-white rounded-full p-1">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
    </label>
  );
})}
```

**Key Elements:**
- `<label>` wrapper for accessibility
- `<input type="radio">` semantic form element
- `name` attribute with pattern: `step-{stepNumber}-{questionId}`
- `value` attribute with option text
- `checked` state tied to quiz data

#### 5. TCPA Disclosure Marking

**File:** `src/core/components/QuizOverlay.tsx` (lines 1207-1214)
```typescript
<div id="leadid_tcpa_disclosure" className="mt-3 sm:mt-4 p-3 sm:p-4">
  <div
    className="text-xs text-gray-700"
    dangerouslySetInnerHTML={{ __html: complianceContent.consent.text }}
  />
</div>
```

**Critical Attributes:**
- `id="leadid_tcpa_disclosure"` - Jornaya looks for this exact ID
- Contains the full TCPA consent text
- Visible when phone field appears
- Jornaya tracks visibility duration

#### 6. ComplianceBridge System

The ComplianceBridge ensures compliance fields from the page DOM are synced to the modal form.

**File:** `src/core/components/QuizOverlay.tsx` (lines 154-211)
```typescript
// Wait for compliance fields on contact step
useEffect(() => {
  if (currentStep !== steps.length - 1) return; // Only on contact step

  console.log('🔐 QuizOverlay: Contact form step, initializing compliance bridge');
  setComplianceLoading(true);

  waitForComplianceFields(10000)
    .then((status) => {
      console.log('✓ QuizOverlay: Compliance fields ready', status);

      // Clone fields from page DOM into modal form
      if (formRef.current) {
        cloneComplianceFieldsToForm(formRef.current);
        console.log('✓ QuizOverlay: Fields cloned to modal form');
      }

      setComplianceFieldsReady(status.allReady);
      setComplianceLoading(false);
      setComplianceSuccess(true);
    })
    .catch((error) => {
      console.error('✗ QuizOverlay: Error waiting for compliance fields', error);
      setComplianceLoading(false);
      setComplianceFieldsReady(true); // Continue anyway
    });
}, [currentStep, steps.length]);
```

**Why This Matters:**
- Jornaya script loads in page DOM
- Modal is separate DOM context
- Hidden field must exist in modal form for submission
- ComplianceBridge copies the populated token from page → modal

#### 7. Final Submission with Token

**File:** `src/core/components/QuizOverlay.tsx` (lines 715-814)
```typescript
const handleFinalSubmission = async () => {
  try {
    // Store TCPA consent
    storeTCPAConsent(complianceContent.consent.text, true);

    // Sync compliance fields one last time
    if (formRef.current) {
      console.log('QuizOverlay: Syncing compliance fields before submission');
      syncComplianceFieldsBeforeSubmit(formRef.current);
    }

    // Get LeadID token (from session or DOM)
    const leadidToken = getLeadIdToken() || '';

    console.log('QuizOverlay: Compliance data for submission', {
      leadidToken,
      leadidTokenLength: leadidToken.length,
      leadidTokenSource: leadidToken ? 'session_or_dom' : 'not_found'
    });

    // Build payload with all quiz answers + compliance data
    const payload = getFinalSubmissionPayload();

    // Ensure token is in payload
    if (leadidToken && !payload.leadid_token) {
      payload.leadid_token = leadidToken;
    }

    // Submit to webhook
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // Show success
    setShowThankYou(true);
  } catch (error) {
    console.error('Submission error:', error);
    reportError(error as Error, { context: 'final_submission' });
  }
};
```

### Why Quiz Overlay Works Perfectly

✅ **Scripts loaded at page mount** - Full journey captured from page load
✅ **Modal stays on same page** - No route changes, no script reinitialization
✅ **Hash changes tracked** - Every step modifies `window.location.hash`
✅ **Pixels sent explicitly** - `triggerJornayaHashEvent()` called on every step change
✅ **Semantic HTML structure** - Radio inputs with proper `name` attributes
✅ **TCPA disclosure properly marked** - `id="leadid_tcpa_disclosure"` present
✅ **ComplianceBridge syncs fields** - Token copied from page DOM to modal DOM
✅ **Fallback mechanisms** - Token retrievable from session storage if DOM fails
✅ **Token includes journey** - All 8 step pixels associated with the token

### Console Logs (Successful Run)

```
=== COMPLIANCE INITIALIZATION STARTED ===
📡 JORNAYA: Starting script load...
✓ JORNAYA: Field exists in DOM, ready for script to populate
✓ JORNAYA: Script loaded in 234ms (attempt 1)
[LeadID Monitor] Starting real-time monitoring
✓ JORNAYA: Token populated at 1456ms

[User clicks Start Free Case Review]
🔐 QuizOverlay: Opening modal

[User selects state: California]
[Jornaya Hash - homelayout] Hash changed to: state (step 1)
[Jornaya Hash - homelayout] ✓ Token found from: session storage
[Jornaya Hash - homelayout] Sending pixel for step 1 (state)
[Jornaya Hash - homelayout] ✓ Pixel sent successfully: step 1 (state)

[User selects accident type: Car Accident]
[Jornaya Hash - homelayout] Hash changed to: accident_type (step 2)
[Jornaya Hash - homelayout] ✓ Token found from: session storage
[Jornaya Hash - homelayout] ✓ Pixel sent successfully: step 2 (accident_type)

[... continues for each step ...]

[Contact form step]
🔐 QuizOverlay: Contact form step, initializing compliance bridge
✓ QuizOverlay: Compliance fields ready
✓ QuizOverlay: Fields cloned to modal form

[User submits form]
QuizOverlay: Syncing compliance fields before final submission
QuizOverlay: Compliance data for submission {
  leadidToken: "abc123def456...",
  leadidTokenLength: 128,
  leadidTokenSource: "session_or_dom"
}
```

---

## Quiz Embedded Implementation (BROKEN ❌)

### Architecture Overview

**Component:** `src/core/components/QuizEmbedded.tsx`
**Display:** Full-page embedded quiz
**Navigation:** React state counter (`currentStep: 1 → 2 → 3`)
**Route:** Separate route (`/quote/quiz`)

### User Journey Flow

```
1. User lands on /quote page
   ↓
2. ComplianceProvider wraps app (App.tsx:50)
   ↓
3. ComplianceScripts loads Jornaya script (on /quote page)
   ↓
4. User enters ZIP code: 90210
   ↓
5. ZIP validated via API
   ↓
6. ⚠️ NAVIGATION: User redirected to /quote/quiz (NEW ROUTE)
   ↓
7. QuoteQuiz.tsx renders (wrapper page)
   ↓
8. QuizEmbedded component mounts
   ↓
9. ⚠️ NO ComplianceScripts on this route!
   ↓
10. User sees question #1: Home Status (Own/Rent)
    ↓
11. User selects "Own"
    ↓
12. ⚠️ currentStep updates: 1 → 2 (React state only)
    ↓
13. ⚠️ NO hash change (URL still: /quote/quiz)
    ↓
14. ⚠️ NO triggerJornayaHashEvent() call
    ↓
15. ⚠️ NO pixel sent
    ↓
16. User sees question #2: Install Preference
    ↓
17. User selects "Professional Installation"
    ↓
18. ⚠️ Same issue: state update only, no tracking
    ↓
19. [Process repeats for questions 3, 4, 5...]
    ↓
20. User reaches contact form
    ↓
21. Hidden field exists: <input id="leadid_token" />
    ↓
22. User fills contact details
    ↓
23. TCPA disclosure visible with id="leadid_tcpa_disclosure"
    ↓
24. User submits form
    ↓
25. Token may exist but has NO journey data
    ↓
26. Payload sent with incomplete compliance proof
```

### Network Traffic (Broken)

```
[Initial Page Load on /quote]
GET //create.lidstatic.com/campaign/1ht5g35.js
Status: 200 OK (234ms)

[Token Population - Automatic]
DOM Field Updated: #leadid_token = "abc123def456..." (1456ms after load)
Session Storage: compliance_data.leadid_token stored

[Navigation to /quote/quiz]
(No additional Jornaya requests)

[User answers Question 1: Home Status]
❌ NO capture.gif request

[User answers Question 2: Install Preference]
❌ NO capture.gif request

[User answers Question 3: Intent Timing]
❌ NO capture.gif request

[User answers Question 4: Existing System]
❌ NO capture.gif request

[User answers Question 5: Contact Info]
❌ NO capture.gif request

[Final Submission]
POST https://n8n-webhook.com/api/leads
Payload includes: leadid_token: "abc123def456..."
BUT: Token has NO associated journey events
```

**Result:** ❌ 0-1 pixels fired. Journey data missing or incomplete.

### Code Analysis: What's Missing

#### 1. No Compliance Script Initialization on Route

**File:** `src/core/pages/QuoteQuiz.tsx` (lines 1-70)
```typescript
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionData } from '../utils/session';
import { QuizEmbedded } from '../components/QuizEmbedded';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

// ❌ NO import of ComplianceScripts!
// ❌ NO import of compliance utilities!

export const QuoteQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const session = getSessionData();

    if (!session.quiz_answers?.zip) {
      navigate('/quote');
      return;
    }

    setInitialData(session.quiz_answers);
  }, [navigate]);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ❌ NO <ComplianceScripts /> component! */}

      <header className="hidden md:block bg-white border-b">
        {/* Header content */}
      </header>

      <main className="md:max-w-3xl md:mx-auto md:px-4 md:py-8">
        <div className="bg-white md:rounded-lg md:shadow-lg md:p-6">
          <QuizEmbedded
            initialZip={initialData.zip}
            onComplete={handleQuizComplete}
          />
        </div>
      </main>

      <FAQ />
      <Footer />
    </div>
  );
};
```

**Problem:**
- ComplianceProvider wraps the app, but scripts load once on initial mount
- When user navigates from `/quote` to `/quote/quiz`, it's a new route
- QuoteQuiz component doesn't re-initialize scripts or monitoring
- Even though token may exist in session, monitoring may have stopped
- No guarantee that Jornaya script is still active on this route

#### 2. No Journey Tracking Implementation

**File:** `src/core/components/QuizEmbedded.tsx` (lines 1-100)
```typescript
import React, { useState, useEffect } from 'react';
import { quizConfig } from '../../config/quiz.config';
import { complianceContent } from '../../config/compliance.content.config';
import { storeQuizAnswer, storeFormField, getFinalSubmissionPayload } from '../utils/session';
import { getLeadIdToken } from '../utils/leadidMonitor';
import { config } from '../../config/environment.config';

// ❌ NO import of triggerJornayaHashEvent!
// ❌ NO import of getStepId/getStepNumber utilities!

interface Props {
  initialZip: string;
  onComplete: () => void;
}

export const QuizEmbedded: React.FC<Props> = ({ initialZip, onComplete }) => {
  // State-based navigation (invisible to Jornaya)
  const [currentStep, setCurrentStep] = useState(1);

  // ❌ NO useEffect listening to hash changes
  // ❌ NO useEffect tracking step changes

  const [quizData, setQuizData] = useState({
    zip: initialZip,
    home_status: '',
    install_pref: '',
    intent_timing: '',
    existing_system: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  // ... rest of component
};
```

**File:** `src/core/components/QuizEmbedded.tsx` (lines 222-238)
```typescript
const handleNext = async () => {
  if (!canProceed()) {
    return;
  }

  if (isFinalContactStep && canProceed()) {
    await handleSubmit();
    return;
  }

  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1); // ❌ Just updates React state
    // ❌ MISSING: window.location.hash = `step_${currentStep + 1}`;
    // ❌ MISSING: triggerJornayaHashEvent(currentStep + 1, hash, 'embedded');
  }
};
```

**Problem:**
- Step progression is React state only
- No URL hash modifications
- No explicit pixel tracking calls
- Jornaya has no visibility into user progression
- From Jornaya's perspective: user loaded one page and stayed there

#### 3. Button-Based UI (Not Semantic Radio Inputs)

**File:** `src/core/components/QuizEmbedded.tsx` (lines 382-419)
```typescript
{isQuizStep && currentStepConfig ? (
  <div className="space-y-3">
    {currentStepConfig.options?.map((option, idx) => {
      const isSelected = quizData[currentStepConfig.id as keyof typeof quizData] === option.value;
      const isRecommended = option.recommended === true;

      return (
        <button  {/* ❌ Button element, not radio input */}
          key={idx}
          onClick={() => handleOptionSelect(option.label)}
          className={`w-full text-left px-6 py-4 rounded-lg border-2
            ${isSelected ? 'border-navy bg-gradient-to-r from-teal-50' : 'border-primary-200'}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{option.label}</span>
            {isSelected && (
              <div className="bg-secondary text-white rounded-full p-1">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
        </button>
      );
    })}
  </div>
) : null}
```

**Comparison with QuizOverlay (working):**
```typescript
// QuizOverlay uses semantic HTML
<label>
  <input
    type="radio"
    name={`step-${currentStep}-${steps[currentStep].id}`}
    value={option}
    checked={isSelected}
    onChange={(e) => handleOptionSelect(e.target.value)}
  />
  <span>{option}</span>
</label>
```

**Hypothesis:**
Jornaya's DOM scanning may look for:
- Standard form inputs: `<input type="radio">`, `<input type="checkbox">`
- `name` attributes with recognizable patterns
- Form structure (labels, fieldsets, etc.)

Button elements may not be recognized as form interactions by Jornaya's tracking script.

#### 4. Missing Data Attributes

**File:** `src/core/components/QuizEmbedded.tsx` (lines 382-501)
```typescript
// Question container - no metadata
<div className="space-y-3">
  {/* ❌ No data-question-id attribute */}
  {/* ❌ No data-question-step attribute */}
  {/* ❌ No data-leadid-capture attribute */}

  {currentStepConfig.options?.map((option, idx) => (
    <button onClick={() => handleOptionSelect(option.label)}>
      {/* ❌ No data-option-value attribute */}
      {/* ❌ No data-option-label attribute */}
      <span>{option.label}</span>
    </button>
  ))}
</div>
```

**Potential best practice (not implemented):**
```typescript
<div
  className="space-y-3"
  data-leadid-question-container="true"
  data-question-id={currentStepConfig.id}
  data-question-step={currentStep}
  data-question-text={currentStepConfig.label}
>
  {currentStepConfig.options?.map((option, idx) => (
    <button
      data-option-value={option.value}
      data-option-label={option.label}
      onClick={() => handleOptionSelect(option.label)}
    >
      {option.label}
    </button>
  ))}
</div>
```

These attributes could help Jornaya extract:
- Which question was asked
- What the question text was
- What step number it was
- What options were available
- Which option was selected

#### 5. TCPA Disclosure Present (But Questions Not Tagged)

**File:** `src/core/components/QuizEmbedded.tsx` (lines 530-537)
```typescript
{/* ✅ TCPA Disclosure properly marked */}
<div id="leadid_tcpa_disclosure" className="mt-3 sm:mt-4 p-3 sm:p-4">
  <div
    className="text-xs text-gray-700"
    dangerouslySetInnerHTML={{ __html: complianceContent.consent.text }}
  />
</div>

{/* ✅ Hidden field exists */}
<input
  id="leadid_token"
  name="leadid_token"
  type="hidden"
  value=""
/>
```

**Good:**
- TCPA disclosure has correct ID
- Hidden token field exists
- Field is in the form DOM

**Problem:**
- Questions leading up to this point have no tracking
- No journey data to associate with the token
- Token may be populated but journey is empty

### Why Quiz Embedded Struggles

❌ **No script initialization on route** - Scripts loaded on previous page, may not be active
❌ **No journey tracking** - `triggerJornayaHashEvent()` never called
❌ **No hash modifications** - URL stays static at `/quote/quiz`
❌ **No pixel events sent** - 0 capture.gif requests during quiz
❌ **Button-based UI** - Not semantic radio inputs
❌ **Missing data attributes** - No metadata for Jornaya to extract
❌ **State-based navigation** - React state changes invisible to Jornaya
❌ **Single page from Jornaya's view** - Appears as one page load, not multi-step journey

### Console Logs (Broken Run)

```
[On /quote page]
=== COMPLIANCE INITIALIZATION STARTED ===
📡 JORNAYA: Starting script load...
✓ JORNAYA: Script loaded in 234ms
[LeadID Monitor] Starting real-time monitoring
✓ JORNAYA: Token populated at 1456ms

[User enters ZIP, navigates to /quote/quiz]
(No Jornaya logs)

[User answers Question 1: Home Status]
(No Jornaya logs)

[User answers Question 2: Install Preference]
(No Jornaya logs)

[User answers Question 3: Intent Timing]
(No Jornaya logs)

[User answers Question 4: Existing System]
(No Jornaya logs)

[User reaches contact form]
QuizEmbedded: LeadiD token before submission: {
  token: "abc123def456...",
  tokenLength: 128,
  source: "session_or_dom"
}

[User submits]
(Form submitted with token but NO journey data)
```

---

## Funnel Engineering Comparison

### Quiz Overlay Funnel (Home Security)

**Entry Points:**
- `/` - HomeLayout with embedded quiz
- `/get-quote` - PIHeroLayout with quiz modal
- `/start-quiz` - TOFULayout with quiz modal

**User Flow:**
```
Landing Page → Click CTA → Modal Opens → Quiz → Contact Form → Submit → Thank You
(Same Page) (Overlay)    (Hash Nav)   (Hash Nav)  (Modal)      (Modal)
```

**Technical Architecture:**
```
ComplianceProvider (App-level)
  └── ComplianceScripts (loads on app mount)
      └── Jornaya script active for entire session
          └── Layout Component
              └── User clicks CTA
                  └── QuizOverlay opens
                      └── Hash navigation (#state, #accident_type, etc.)
                          └── triggerJornayaHashEvent() on each step
                              └── Pixels sent: 8 events captured
```

**Advantages:**
- Single page load = continuous script context
- Modal overlay = no route changes
- Hash navigation = trackable URL changes
- Explicit pixel calls = complete journey captured
- ComplianceBridge = reliable field syncing

**Journey Capture:**
✅ Page load event
✅ Step 1: State selection
✅ Step 2: Accident type
✅ Step 3: Accident date
✅ Step 4: At fault status
✅ Step 5: Treatment window
✅ Step 6: Attorney status
✅ Step 7: ZIP code
✅ Step 8: Contact form
✅ TCPA disclosure visibility
✅ Form submission

### Quiz Embedded Funnel (Home Security Alternative)

**Entry Points:**
- `/quote` - QuoteLanding page (ZIP entry)

**User Flow:**
```
Landing → Enter ZIP → Validate → Navigate → Quiz Questions → Contact → Submit → Result
(/quote)  (ZIP Form)   (API)    (/quote/quiz) (React State)   (Form)  (POST)  (/quote/quiz/result)
```

**Technical Architecture:**
```
ComplianceProvider (App-level)
  └── ComplianceScripts (loads on app mount)
      └── Jornaya script loads on /quote
          └── User enters ZIP
              └── Navigation to /quote/quiz (NEW ROUTE)
                  └── QuoteQuiz component (NO ComplianceScripts)
                      └── QuizEmbedded component
                          └── React state navigation (currentStep++)
                              └── ❌ NO hash changes
                                  └── ❌ NO triggerJornayaHashEvent() calls
                                      └── ❌ NO pixels sent
```

**Disadvantages:**
- Route change = potential script context loss
- No hash navigation = no trackable URL changes
- No explicit pixel calls = no journey captured
- React state only = invisible to Jornaya
- Button UI = potentially not recognized as form input

**Journey Capture:**
✅ Page load event (on /quote)
❌ ZIP entry (may be tracked)
❌ Question 1: Home status
❌ Question 2: Install preference
❌ Question 3: Intent timing
❌ Question 4: Existing system
❌ Contact form steps
✅ TCPA disclosure visibility (maybe)
✅ Form submission (token exists but no journey)

---

## Root Cause Analysis

### Hypothesis Testing

#### Hypothesis #1: Page Redirects Cause Script Loss ❌ DISPROVEN

**Initial Theory:**
Navigating from `/quote` → `/quote/quiz` causes the Jornaya script to lose context or reinitialize improperly.

**Test:**
Implemented SPA anchor strategy to eliminate page redirects. Changed navigation to hash-based single-page application.

**Result:**
❌ **FAILED** - The issue persists even with SPA architecture.

**Why it failed:**
- The problem is NOT about script reinitialization
- Hash changes alone don't trigger Jornaya tracking
- Jornaya requires EXPLICIT pixel calls via `triggerJornayaHashEvent()`
- Even on the same page, step changes must be manually tracked

**Lesson Learned:**
SPA architecture helps avoid script reload issues, but doesn't automatically enable journey tracking. Journey tracking requires:
1. Explicit hash changes for each step
2. Explicit pixel calls to Jornaya's capture endpoint
3. Proper event metadata (step number, hash ID)

#### Hypothesis #2: HTML Structure & Data Layer ✅ LIKELY CONTRIBUTING FACTOR

**Theory:**
Jornaya's script scans the DOM for form interactions. Quiz Embedded uses buttons instead of semantic radio inputs, and lacks data attributes that might help Jornaya extract question/answer metadata.

**Evidence:**

**Quiz Overlay (working):**
```html
<label>
  <input
    type="radio"
    name="step-2-accident_type"
    value="Car Accident"
    checked={true}
  />
  <span>Car Accident</span>
</label>
```

**Quiz Embedded (struggling):**
```html
<button onClick={handleSelect}>
  <span>Professional Installation</span>
  <CheckCircle />
</button>
```

**Analysis:**
- Jornaya likely scans for `<input type="radio">` and `<input type="checkbox">` elements
- The `name` attribute pattern (`step-X-questionId`) may be parsed for metadata
- Button elements may not be recognized as form interactions
- Missing data attributes mean Jornaya can't extract question context

**Evidence from other implementations:**
Many compliance tracking scripts look for:
- `data-question-id` - Question identifier
- `data-question-text` - Human-readable question
- `data-question-step` - Step number
- `data-option-value` - Selected value
- `data-leadid-capture` - Flag indicating trackable element

**Conclusion:**
This is LIKELY a contributing factor, but **NOT the primary issue**. Even with perfect HTML structure, without explicit `triggerJornayaHashEvent()` calls, the journey will not be tracked.

#### Hypothesis #3: Missing Journey Tracking Infrastructure ✅ PRIMARY ROOT CAUSE

**Theory:**
Quiz Embedded lacks the core infrastructure to send journey tracking pixels to Jornaya.

**Evidence:**

1. **No imports of tracking utilities:**
```typescript
// ❌ Missing in QuizEmbedded.tsx:
import { triggerJornayaHashEvent } from '../utils/jornayaHashTracking';
import { getStepId, getStepNumber } from '../utils/quizStepMapping';
```

2. **No hash change listeners:**
```typescript
// ❌ Missing in QuizEmbedded.tsx:
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1);
    const stepNumber = getStepNumber(hash, totalSteps);
    triggerJornayaHashEvent(stepNumber, hash, 'embedded');
  };

  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, [totalSteps]);
```

3. **No hash modifications on step change:**
```typescript
// ❌ Missing in handleNext():
const nextStep = currentStep + 1;
const nextStepHash = getStepId(nextStep, totalSteps);
window.location.hash = nextStepHash; // Not implemented
```

4. **No pixel tracking calls:**
```typescript
// ❌ Missing in QuizEmbedded.tsx:
triggerJornayaHashEvent(currentStep, stepHash, 'embedded_quiz');
```

5. **No ComplianceScripts on route:**
```typescript
// ❌ Missing in QuoteQuiz.tsx:
import { ComplianceScripts } from '../components/ComplianceScripts';
return (
  <div>
    <ComplianceScripts />  {/* Not present */}
    <QuizEmbedded />
  </div>
);
```

**Conclusion:**
This is the **PRIMARY ROOT CAUSE**. The embedded quiz simply doesn't have the code to:
- Modify URL hashes on step changes
- Listen for hash changes
- Send tracking pixels to Jornaya
- Re-initialize compliance scripts on the route

---

## Recommended Solutions

### Solution #1: Add Compliance Initialization to QuoteQuiz Route

**Priority:** CRITICAL
**Effort:** Low (15-30 minutes)
**Impact:** Ensures Jornaya script is active when quiz loads

**Implementation:**

**File:** `src/core/pages/QuoteQuiz.tsx`

Add ComplianceScripts import and component:

```typescript
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionData } from '../utils/session';
import { QuizEmbedded } from '../components/QuizEmbedded';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { ComplianceScripts } from '../components/ComplianceScripts';  // ✅ ADD THIS

export const QuoteQuiz: React.FC = () => {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ ADD COMPLIANCE SCRIPTS */}
      <ComplianceScripts />

      <header className="hidden md:block bg-white border-b">
        {/* Header content */}
      </header>

      <main className="md:max-w-3xl md:mx-auto md:px-4 md:py-8">
        <div className="bg-white md:rounded-lg md:shadow-lg md:p-6">
          <QuizEmbedded
            initialZip={initialData.zip}
            onComplete={handleQuizComplete}
          />
        </div>
      </main>

      <FAQ />
      <Footer />
    </div>
  );
};
```

**Why this helps:**
- Ensures Jornaya script is loaded when quiz page renders
- Re-initializes leadidMonitor for this route
- Guarantees compliance fields exist in DOM before quiz renders
- Provides fallback if script was lost during navigation

### Solution #2: Implement Hash-Based Journey Tracking

**Priority:** CRITICAL
**Effort:** Medium (2-3 hours)
**Impact:** Captures complete user journey through quiz

**Implementation:**

**File:** `src/core/components/QuizEmbedded.tsx`

Add imports:
```typescript
import { triggerJornayaHashEvent } from '../utils/jornayaHashTracking';
import { getStepId, getStepNumber } from '../utils/quizStepMapping';
```

Add hash change listener:
```typescript
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1);

    if (!hash) return;

    const stepNumber = getStepNumber(hash, totalSteps);

    if (stepNumber > 0 && stepNumber !== currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, [currentStep, totalSteps]);
```

Add step change tracker:
```typescript
useEffect(() => {
  if (currentStep > 0 && currentStep <= totalSteps) {
    const stepHash = getStepId(currentStep, totalSteps) || `step_${currentStep}`;

    // Small delay to ensure DOM is updated
    setTimeout(() => {
      triggerJornayaHashEvent(currentStep, stepHash, 'embedded_quiz');
    }, 150);
  }
}, [currentStep, totalSteps]);
```

Modify navigation to use hash:
```typescript
const handleNext = async () => {
  if (!canProceed()) {
    return;
  }

  if (isFinalContactStep && canProceed()) {
    await handleSubmit();
    return;
  }

  if (currentStep < totalSteps) {
    const nextStep = currentStep + 1;
    const nextStepHash = getStepId(nextStep, totalSteps) || `step_${nextStep}`;

    // Update URL hash (will trigger useEffect above)
    window.location.hash = nextStepHash;

    // Also update state as fallback
    setCurrentStep(nextStep);
  }
};
```

**Why this helps:**
- Each step change modifies URL hash
- Hash change triggers Jornaya pixel event
- Jornaya receives complete journey with timestamps
- Token becomes associated with full user journey

### Solution #3: Convert to Semantic HTML with Data Attributes

**Priority:** MEDIUM
**Effort:** Medium (2-3 hours)
**Impact:** Helps Jornaya extract question/answer metadata

**Implementation:**

**File:** `src/core/components/QuizEmbedded.tsx`

Replace button-based questions with radio inputs:

```typescript
{isQuizStep && currentStepConfig ? (
  <div
    className="space-y-3"
    data-leadid-question-container="true"
    data-question-id={currentStepConfig.id}
    data-question-step={currentStep}
    data-question-text={currentStepConfig.label}
  >
    {currentStepConfig.options?.map((option, idx) => {
      const isSelected = quizData[currentStepConfig.id as keyof typeof quizData] === option.value;
      const isRecommended = option.recommended === true;

      return (
        <label
          key={idx}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer
            ${isSelected ? 'border-navy bg-gradient-to-r from-teal-50' : 'border-primary-200'}`}
        >
          <input
            type="radio"
            name={`quiz-step-${currentStep}-${currentStepConfig.id}`}
            value={option.value}
            checked={isSelected}
            onChange={() => handleOptionSelect(option.label)}
            className="w-4 h-4 text-teal mr-3"
            data-option-value={option.value}
            data-option-label={option.label}
          />
          <div className="flex items-center justify-between flex-1">
            <span className="font-semibold">{option.label}</span>
            {isSelected && (
              <div className="bg-secondary text-white rounded-full p-1">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            {isRecommended && !isSelected && (
              <span className="text-xs font-bold text-accent-600">RECOMMENDED</span>
            )}
          </div>
        </label>
      );
    })}
  </div>
) : null}
```

**Why this helps:**
- Semantic `<input type="radio">` matches Jornaya expectations
- `name` attributes follow recognizable pattern
- `data-*` attributes provide metadata for Jornaya's DOM scanner
- More similar to overlay structure that works
- Better accessibility and screen reader support

### Solution #4: Hybrid Approach (RECOMMENDED)

**Priority:** CRITICAL
**Effort:** High (4-6 hours)
**Impact:** Complete fix addressing all identified issues

**Implementation combines all solutions:**

1. ✅ **Add ComplianceScripts to QuoteQuiz route** (Solution #1)
2. ✅ **Implement hash-based tracking** (Solution #2)
3. ✅ **Improve HTML semantics** (Solution #3)
4. ✅ **Add explicit monitoring restart**

**Additional code for monitoring restart:**

**File:** `src/core/components/QuizEmbedded.tsx`

```typescript
import { startLeadIdMonitor, getLeadIdStatus } from '../utils/leadidMonitor';

export const QuizEmbedded: React.FC<Props> = ({ initialZip, onComplete }) => {
  // Restart monitoring when component mounts
  useEffect(() => {
    console.log('QuizEmbedded: Checking LeadID monitor status');
    const status = getLeadIdStatus();

    if (!status.captured || !status.token) {
      console.log('QuizEmbedded: Token not captured, restarting monitor');
      startLeadIdMonitor();
    } else {
      console.log('QuizEmbedded: Token already captured', {
        token: status.token?.substring(0, 30) + '...',
        timestamp: status.timestamp
      });
    }
  }, []);

  // Rest of component implementation from Solutions #2 and #3...
};
```

**Verification Checklist:**
- [ ] ComplianceScripts present on `/quote/quiz` route
- [ ] Hash changes on each step advancement
- [ ] `triggerJornayaHashEvent()` called on step change
- [ ] Radio inputs with semantic structure
- [ ] Data attributes on question containers
- [ ] Network tab shows capture.gif pixels for each step (4-5 pixels expected)
- [ ] Console shows "Pixel sent successfully" logs
- [ ] Token includes journey timestamp data
- [ ] Final submission payload includes full compliance data

---

## Testing & Validation

### Post-Implementation Testing Procedure

#### Step 1: Clear Browser State

```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
// Hard reload: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

#### Step 2: Open DevTools

- **Network Tab** → Filter by "leadid" or "capture.gif"
- **Console Tab** → Look for Jornaya logs
- **Application Tab** → Session Storage → Look for "compliance_data"

#### Step 3: Test Quiz Embedded Flow

```
1. Navigate to /quote
2. Open DevTools Network tab
3. Enter ZIP code: 90210
4. Click "Get Quotes"
5. Verify: Navigated to /quote/quiz
6. Verify: URL hash changes to #step_1 or similar
7. Answer Question 1 (Home Status)
8. Verify:
   - Hash changes to #step_2
   - Network shows: capture.gif?event=step_2
   - Console shows: "✓ Pixel sent successfully: step 2"
9. Continue through all questions (4-5 total)
10. Verify: One pixel per step
11. Submit form
12. Verify: Payload includes leadid_token with full journey
```

#### Step 4: Compare with Quiz Overlay (Baseline)

```
1. Navigate to /
2. Click "Start Free Case Review"
3. Complete quiz flow
4. Count pixels: Should be 7-8
5. Compare token structure with embedded quiz
6. Compare timestamps: Should show similar intervals
```

#### Step 5: Cross-Browser Testing

Test on:
- ✅ Chrome/Brave (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

Verify pixels fire in all browsers.

### Success Criteria

#### Network Traffic

✅ **4-5 capture.gif requests** (one per quiz step)
✅ **Each pixel includes:** `event=step_X`, `hash=question_id`, `token=...`
✅ **Pixels fire 150-500ms after step change**
✅ **Status: 200 OK on all pixels**

#### Console Logs

```
✓ JORNAYA: Script loaded in XXXms
✓ JORNAYA: Token populated at XXXms
QuizEmbedded: Checking LeadID monitor status
QuizEmbedded: Token already captured
[Jornaya Hash - embedded_quiz] Hash changed to: home_status (step 1)
[Jornaya Hash - embedded_quiz] ✓ Token found from: session storage
[Jornaya Hash - embedded_quiz] Sending pixel for step 1 (home_status)
[Jornaya Hash - embedded_quiz] ✓ Pixel sent successfully: step 1 (home_status)
[Jornaya Hash - embedded_quiz] Hash changed to: install_pref (step 2)
[Jornaya Hash - embedded_quiz] ✓ Pixel sent successfully: step 2 (install_pref)
[... continues for each step ...]
```

#### Session Storage

```javascript
// compliance_data
{
  "leadid_token": "abc123def456...",  // 128+ characters
  "leadid_timestamp": "2024-01-15T10:30:00.000Z",
  "leadid_captured": true
}

// quiz_session
{
  "journey_events": [  // ✅ NOW POPULATED
    {"step": 1, "hash": "home_status", "timestamp": "2024-01-15T10:30:05.000Z"},
    {"step": 2, "hash": "install_pref", "timestamp": "2024-01-15T10:30:15.000Z"},
    {"step": 3, "hash": "intent_timing", "timestamp": "2024-01-15T10:30:25.000Z"},
    {"step": 4, "hash": "existing_system", "timestamp": "2024-01-15T10:30:35.000Z"}
  ]
}
```

#### Final Payload

```javascript
{
  "leadid_token": "abc123def456...",
  "leadid_timestamp": "2024-01-15T10:30:00.000Z",
  "form_fields": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "5555555555"
  },
  "quiz_answers": {
    "zip": "90210",
    "home_status": "own",
    "install_pref": "professional",
    "intent_timing": "within_week",
    "existing_system": "no"
  },
  "metadata": {
    "page_url": "https://example.com/quote/quiz#step_4",
    "journey_complete": true,
    "total_steps": 4
  }
}
```

---

## Troubleshooting

### Issue: No Pixels Firing

**Symptoms:**
- Network tab shows no capture.gif requests
- Console has no "Pixel sent" logs
- Hash changes visible but no tracking

**Check:**
1. ✅ ComplianceScripts imported in QuoteQuiz.tsx
2. ✅ triggerJornayaHashEvent imported in QuizEmbedded
3. ✅ Hash changes visible in URL bar
4. ✅ Token exists: `document.getElementById('leadid_token').value`
5. ✅ Network tab not filtering out requests
6. ✅ Jornaya enabled in config: `complianceConfig.jornaya.enabled`

**Fix:**
```typescript
// Verify Jornaya is enabled
import { complianceConfig } from '../../config/compliance.config';
console.log('Jornaya enabled:', complianceConfig.jornaya.enabled);

// Manually trigger pixel
import { triggerJornayaHashEvent } from '../utils/jornayaHashTracking';
triggerJornayaHashEvent(1, 'test_step', 'manual_test');
```

### Issue: Pixels Fire But No Token

**Symptoms:**
- capture.gif requests show in network
- Console shows "No token available" warnings
- Hidden field empty

**Check:**
1. ✅ JornayaField component rendered in form
2. ✅ Hidden input exists: `<input id="leadid_token">`
3. ✅ Script loaded: `document.getElementById('LeadiDscript_campaign')`
4. ✅ Console for script errors
5. ✅ Ad blocker disabled

**Fix:**
```javascript
// Check script status
const script = document.getElementById('LeadiDscript_campaign');
console.log('Jornaya script exists:', !!script);

// Check field status
const field = document.getElementById('leadid_token');
console.log('Field exists:', !!field);
console.log('Field value:', field?.value || 'EMPTY');

// Restart monitor
import { startLeadIdMonitor } from '../utils/leadidMonitor';
startLeadIdMonitor();
```

### Issue: Token Exists But Journey Incomplete

**Symptoms:**
- Token populated in field
- Only 1-2 pixels fired instead of 4-5
- Journey data incomplete

**Check:**
1. ✅ Hash events called for EACH step
2. ✅ Event parameter increments: step_1, step_2, step_3
3. ✅ Hash parameter varies: home_status, install_pref, etc.
4. ✅ Timestamps show progression (not all same time)

**Fix:**
```typescript
// Verify step tracking
useEffect(() => {
  console.log('Step changed to:', currentStep);
  const stepHash = getStepId(currentStep, totalSteps);
  console.log('Step hash:', stepHash);

  triggerJornayaHashEvent(currentStep, stepHash, 'embedded_quiz');
}, [currentStep, totalSteps]);
```

---

## Conclusion

### Summary of Findings

#### Quiz Overlay Works Because:

1. ✅ **Scripts load at page mount** - Full journey captured from initial page load
2. ✅ **Modal stays on same page** - No route changes, no script reinitialization
3. ✅ **Hash-based navigation** - Every step modifies `window.location.hash`
4. ✅ **Explicit pixel tracking** - `triggerJornayaHashEvent()` called on every step
5. ✅ **Semantic HTML** - Radio inputs with proper `name` attributes
6. ✅ **TCPA disclosure marked** - `id="leadid_tcpa_disclosure"` present
7. ✅ **ComplianceBridge** - Fields synced from page DOM to modal
8. ✅ **Fallback mechanisms** - Token retrievable from session storage

#### Quiz Embedded Struggles Because:

1. ❌ **No script init on route** - Scripts loaded on previous page
2. ❌ **No journey tracking** - `triggerJornayaHashEvent()` never called
3. ❌ **No hash modifications** - URL stays static
4. ❌ **No pixel events** - 0 capture.gif requests
5. ❌ **Button-based UI** - Not semantic radio inputs
6. ❌ **Missing data attributes** - No metadata for extraction
7. ❌ **State-based navigation** - React state changes invisible to Jornaya

### Primary Recommendation

**Implement Solution #4: Hybrid Approach**

This comprehensive fix includes:
1. Add ComplianceScripts to QuoteQuiz route
2. Implement hash-based journey tracking
3. Convert to semantic HTML with radio inputs
4. Add data attributes for question metadata
5. Restart LeadID monitoring on component mount

**Expected Outcome:**
- 4-5 tracking pixels fired (one per quiz step)
- Complete journey captured with timestamps
- Full TCPA compliance documentation
- Parity with Quiz Overlay performance
- Higher lead quality scores from buyers

### Implementation Priority

**Phase 1 (Critical - 4 hours):**
- Add ComplianceScripts to QuoteQuiz.tsx
- Implement hash-based tracking in QuizEmbedded
- Add explicit `triggerJornayaHashEvent()` calls

**Phase 2 (Important - 2 hours):**
- Convert buttons to radio inputs
- Add data attributes to questions
- Test across browsers

**Phase 3 (Optimization - 1 hour):**
- Add monitoring restart logic
- Implement automated testing
- Create monitoring dashboard

---

**Document Version:** 2.0
**Last Updated:** 2025-01-26
**Author:** Technical Analysis - Jornaya Implementation
**Status:** Complete Diagnostic with Recommended Solutions
