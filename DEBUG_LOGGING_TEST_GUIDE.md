# Debug Logging Test Guide

**Date**: November 26, 2025
**Purpose**: Identify why Jornaya is not capturing steps 2-7
**Status**: ✅ Debug logging added, build successful

---

## What Was Added

Comprehensive debug logging at three critical points:

### 1. Component Render (PRIORITY 2)
**Location**: Line 22
**Trigger**: Every time QuizEmbedded re-renders

**Expected Log**:
```
🔄 QuizEmbedded RENDER - currentStep: 1
```

This tells us if React is re-rendering with the new step value.

---

### 2. Step Tracking useEffect (PRIORITY 1)
**Location**: Lines 104-142
**Trigger**: When `currentStep` or `totalSteps` changes

**Expected Logs**:
```
🔥 STEP TRACKING useEffect TRIGGERED
  📊 currentStep: 2
  📊 totalSteps: 7
  📋 currentConfig: {id: "accident_timing", type: "button-group", ...}
  📋 currentConfig.id: accident_timing
  🏷️ stepHash: accident_timing
  🔗 currentHash: state
  ✅ PROCEEDING with hash update and pixel fire
  🔗 Updating URL hash to: accident_timing
  🚀 CALLING triggerJornayaHashEvent - step: 2 hash: accident_timing
```

**If something fails, you'll see**:
```
❌ EXITING: step out of range (X not in 1-7)
OR
❌ EXITING: no config.id
```

---

### 3. Answer Selection & Step Advancement (PRIORITY 3)
**Location**: Lines 234-258 (handleOptionSelect), Lines 301-356 (handleNext)

**Expected Flow**:
```
🎯 handleOptionSelect CALLED - value: Arizona | currentStep: 1
  📝 Answer value: AZ | question: state
  💾 Stored answer in session
  ⏩ Auto-advancing (button-group type) in 300ms
📈 handleNext CALLED
  📍 currentStep BEFORE: 1
  ✅ Advancing to next step
  🔺 FROM step: 1
  🔺 TO step: 2
  ✅ setCurrentStep called with: 2
```

**If step doesn't advance**:
```
⏹️ NOT advancing - already at final step (X/7)
```

---

## Testing Procedure

### Setup (BEFORE Starting Quiz)

1. **Open Browser** to landing page (/)
2. **Open DevTools** (F12)
3. **Open Console tab**
4. **Clear console** (trash icon)
5. **Keep Network tab ready** (we'll check it after)

---

### Test Flow: Answer Step 1 (STATE)

**ACTION**: Select a state (e.g., Arizona)

**EXPECTED CONSOLE OUTPUT**:
```
🔄 QuizEmbedded RENDER - currentStep: 1
🔥 STEP TRACKING useEffect TRIGGERED
  📊 currentStep: 1
  📊 totalSteps: 7
  📋 currentConfig: {id: "state", ...}
  📋 currentConfig.id: state
  🏷️ stepHash: state
  🔗 currentHash: (empty)
  ✅ Step 1 initial load - firing pixel only (no hash update)
  🚀 CALLING triggerJornayaHashEvent - step: 1 hash: state

[Jornaya Hash - embedded_quiz] Hash changed to: state (step 1)
[Jornaya Hash - embedded_quiz] ✓ Token found from: ...
[Jornaya Hash - embedded_quiz] Sending pixel for step 1 (state)
[Jornaya Hash - embedded_quiz] ✓ Pixel sent successfully: step 1 (state)

🎯 handleOptionSelect CALLED - value: Arizona | currentStep: 1
  📝 Answer value: AZ | question: state
  💾 Stored answer in session
  ⏩ Auto-advancing (button-group type) in 300ms

📈 handleNext CALLED
  📍 currentStep BEFORE: 1
  ✅ Advancing to next step
  🔺 FROM step: 1
  🔺 TO step: 2
  ✅ setCurrentStep called with: 2

🔄 QuizEmbedded RENDER - currentStep: 2    ← KEY: This should appear!

🔥 STEP TRACKING useEffect TRIGGERED       ← KEY: This should fire!
  📊 currentStep: 2
  📊 totalSteps: 7
  📋 currentConfig: {id: "accident_timing", ...}
  📋 currentConfig.id: accident_timing
  🏷️ stepHash: accident_timing
  🔗 currentHash: state
  ✅ PROCEEDING with hash update and pixel fire
  🔗 Updating URL hash to: accident_timing
  🚀 CALLING triggerJornayaHashEvent - step: 2 hash: accident_timing

[Jornaya Hash - embedded_quiz] Hash changed to: accident_timing (step 2)
[Jornaya Hash - embedded_quiz] ✓ Token found from: ...
[Jornaya Hash - embedded_quiz] Sending pixel for step 2 (accident_timing)
[Jornaya Hash - embedded_quiz] ✓ Pixel sent successfully: step 2 (accident_timing)
```

---

### Critical Checkpoints

After selecting state and seeing the screen change to step 2:

#### ✅ CHECKPOINT 1: Did Component Re-render?
**Look for**: `🔄 QuizEmbedded RENDER - currentStep: 2`

- **If YES**: Component state updated correctly ✅
- **If NO**: React didn't re-render, state update failed ❌

---

#### ✅ CHECKPOINT 2: Did useEffect Fire?
**Look for**: `🔥 STEP TRACKING useEffect TRIGGERED` with `currentStep: 2`

- **If YES**: useEffect dependency working ✅
- **If NO**: useEffect not triggered by state change ❌

---

#### ✅ CHECKPOINT 3: Did getCurrentStepConfig() Work?
**Look for**: `📋 currentConfig.id: accident_timing`

- **If YES**: Config lookup working ✅
- **If shows undefined**: Array indexing broken ❌
- **If shows wrong step**: Index calculation wrong ❌

---

#### ✅ CHECKPOINT 4: Was Tracking Pixel Sent?
**Look for**: `🚀 CALLING triggerJornayaHashEvent - step: 2 hash: accident_timing`

- **If YES**: Tracking call made ✅
- **If NO**: Exited early (check for ❌ EXITING logs) ❌

---

#### ✅ CHECKPOINT 5: Did Jornaya Receive It?
**Look for**: `[Jornaya Hash - embedded_quiz] ✓ Pixel sent successfully: step 2`

- **If YES**: Network request succeeded ✅
- **If shows error**: Network failure (ad blocker? CORS?) ❌

---

## Network Tab Verification

After answering all questions:

1. **Open Network tab**
2. **Filter by**: `capture.gif`
3. **Count requests**

**Expected**: 7 requests total
- step_1 (state)
- step_2 (accident_timing)
- step_3 (at_fault)
- step_4 (injury_severity)
- step_5 (medical_treatment)
- step_6 (contact_info)
- step_7 (phone)

**Each request should show**:
- URL: `//create.leadid.com/capture.gif?...`
- Query params: `event=step_X`, `hash=XXXX`, `route=embedded_quiz`

---

## Diagnostic Scenarios

### SCENARIO A: No re-render after step 1
**Symptoms**:
- ✅ `🎯 handleOptionSelect CALLED`
- ✅ `📈 handleNext CALLED`
- ✅ `✅ setCurrentStep called with: 2`
- ❌ NO `🔄 QuizEmbedded RENDER - currentStep: 2`

**Diagnosis**: React state update failed or component unmounted
**Next Step**: Check if QuizEmbedded is being unmounted/remounted

---

### SCENARIO B: Re-render happens but useEffect doesn't fire
**Symptoms**:
- ✅ `🔄 QuizEmbedded RENDER - currentStep: 2`
- ❌ NO `🔥 STEP TRACKING useEffect TRIGGERED`

**Diagnosis**: useEffect dependencies not triggering
**Next Step**: Check if `currentStep` or `totalSteps` is actually changing

---

### SCENARIO C: useEffect fires but exits early
**Symptoms**:
- ✅ `🔥 STEP TRACKING useEffect TRIGGERED`
- ✅ `📊 currentStep: 2`
- ❌ `❌ EXITING: no config.id`

**Diagnosis**: `getCurrentStepConfig()` returning undefined for step 2
**Next Step**: Check `quizSteps` array length and indexing

---

### SCENARIO D: Everything logs but no network request
**Symptoms**:
- ✅ All logs appear including `🚀 CALLING triggerJornayaHashEvent`
- ❌ NO `[Jornaya Hash - embedded_quiz]` logs
- ❌ NO `capture.gif` in Network tab

**Diagnosis**: `triggerJornayaHashEvent` function failing silently or Jornaya disabled
**Next Step**: Check `compliance.config.ts` → `jornaya.enabled: true`

---

### SCENARIO E: Pixel sent but Jornaya reports error
**Symptoms**:
- ✅ `🚀 CALLING triggerJornayaHashEvent`
- ❌ `[Jornaya Hash - embedded_quiz] ✗ Pixel failed: step 2`

**Diagnosis**: Network issue (CORS, ad blocker, invalid credentials)
**Next Step**: Check browser ad blockers, verify Jornaya credentials

---

## What To Report Back

Please provide:

1. **Complete console output** from clicking state through step 2 appearing
2. **Which checkpoint failed** (if any)
3. **Network tab screenshot** showing capture.gif requests (or lack thereof)
4. **URL in address bar** after selecting state

Copy/paste the ENTIRE console output starting from:
```
🔄 QuizEmbedded RENDER - currentStep: 1
```

Through to wherever it stops or fails.

---

## Quick Reference: What Should Happen

**Step 1 → Step 2 transition:**
```
User clicks state option
  ↓
handleOptionSelect fires → stores answer
  ↓
Auto-advance (300ms delay)
  ↓
handleNext fires → validates → calls setCurrentStep(2)
  ↓
React re-renders with currentStep: 2
  ↓
useEffect fires (dependency: currentStep changed)
  ↓
Gets currentConfig for step 2 (accident_timing)
  ↓
Updates URL hash to #accident_timing
  ↓
Calls triggerJornayaHashEvent(2, 'accident_timing', 'embedded_quiz')
  ↓
Creates <img> tag with Jornaya pixel URL
  ↓
Browser makes GET request to create.leadid.com/capture.gif
  ↓
Jornaya records step 2 in their system
```

**This should repeat for ALL 7 steps.**

---

## Build Information

- ✅ Build completed successfully
- ✅ No TypeScript errors
- ✅ No linting errors
- 📦 Bundle size: 580.20 kB (156.46 kB gzipped)
- 🕐 Build time: 9.12s

**To test**: Navigate to `/quote` → enter ZIP → system redirects to `/quote/quiz`

---

## Next Steps

1. ✅ **RUN THE TEST** following the procedure above
2. ✅ **COPY console output** starting from first render
3. ✅ **CHECK Network tab** for capture.gif requests
4. ✅ **REPORT BACK** which checkpoint failed (if any)

Once we see the actual console output, we'll know exactly where the tracking is failing.
