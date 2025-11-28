# Quick Start: Using Validation Fields

## Step 1: Import

```typescript
import { ZipField, EmailField, PhoneField } from './core/components/fields';
```

## Step 2: Replace Old Input

### ZIP Field

**Old (100+ lines):**
```tsx
const [zipValidation, setZipValidation] = useState({});
// 50 lines of validation logic
<input value={zip} onChange={handleZipChange} />
// 50 lines of UI logic
```

**New (5 lines):**
```tsx
<ZipField
  initialValue={quizData.zip}
  onValidationComplete={(isValid, value) => {
    setQuizData(prev => ({ ...prev, zip: value }));
  }}
/>
```

### Email Field

**Old (80+ lines):**
```tsx
const [emailValidation, setEmailValidation] = useState({});
// 40 lines of validation logic
<input value={email} onChange={handleEmailChange} />
// 40 lines of UI logic
```

**New (6 lines):**
```tsx
<EmailField
  initialValue={quizData.email}
  onValidationComplete={(isValid, value) => {
    setQuizData(prev => ({ ...prev, email: value }));
  }}
  autoFocus={true}
/>
```

### Phone Field (with OTP)

**Old (150+ lines):**
```tsx
const [phoneValidation, setPhoneValidation] = useState({});
const [otpState, setOtpState] = useState({});
// 70 lines of validation logic
// 40 lines of OTP logic
<input value={phone} onChange={handlePhoneChange} />
// 40 lines of UI logic
```

**New (8 lines):**
```tsx
<PhoneField
  initialValue={quizData.phone}
  onValidationComplete={(isValid, value) => {
    setQuizData(prev => ({ ...prev, phone: value }));
  }}
  onOTPVerified={() => setShowEmailField(true)}
/>
```

## Step 3: Delete Old Code

Remove these from your component:

```typescript
// ❌ Delete validation state
const [zipValidation, setZipValidation] = useState({});
const [emailValidation, setEmailValidation] = useState({});
const [phoneValidation, setPhoneValidation] = useState({});

// ❌ Delete validation handlers
const handleZipValidation = async (zip) => { ... };
const handleEmailValidation = async (email) => { ... };
const handlePhoneValidation = async (phone) => { ... };

// ❌ Delete timeout refs
const emailValidationTimeout = useRef(null);
const phoneValidationTimeout = useRef(null);

// ❌ Delete typing states
const [emailTyping, setEmailTyping] = useState(false);
const [phoneTyping, setPhoneTyping] = useState(false);

// ❌ Delete validation imports
import { validateField } from '../utils/validation';
```

## Step 4: Check Your Button Logic

Update your "Next" or "Submit" button to use the validation callbacks:

```typescript
const [isZipValid, setIsZipValid] = useState(false);
const [isEmailValid, setIsEmailValid] = useState(false);
const [isPhoneValid, setIsPhoneValid] = useState(false);

// In your JSX:
<ZipField
  initialValue={quizData.zip}
  onValidationComplete={(isValid) => setIsZipValid(isValid)}
/>

<button
  disabled={!isZipValid}
  onClick={handleNext}
>
  Next
</button>
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { ZipField, EmailField, PhoneField } from './core/components/fields';

export const MyQuiz = () => {
  const [quizData, setQuizData] = useState({
    zip: '',
    email: '',
    phone: ''
  });

  const [validations, setValidations] = useState({
    zip: false,
    email: false,
    phone: false
  });

  const [showEmailField, setShowEmailField] = useState(false);

  const canProceed = validations.zip && validations.email && validations.phone;

  return (
    <form>
      <ZipField
        initialValue={quizData.zip}
        onValidationComplete={(isValid, value) => {
          setQuizData(prev => ({ ...prev, zip: value }));
          setValidations(prev => ({ ...prev, zip: isValid }));
        }}
      />

      <PhoneField
        initialValue={quizData.phone}
        onValidationComplete={(isValid, value) => {
          setQuizData(prev => ({ ...prev, phone: value }));
          setValidations(prev => ({ ...prev, phone: isValid }));
        }}
        onOTPVerified={() => setShowEmailField(true)}
      />

      <EmailField
        initialValue={quizData.email}
        showField={showEmailField}
        onValidationComplete={(isValid, value) => {
          setQuizData(prev => ({ ...prev, email: value }));
          setValidations(prev => ({ ...prev, email: isValid }));
        }}
        autoFocus={true}
      />

      <button disabled={!canProceed} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
```

## That's It!

✅ Zero validation logic in your component
✅ Zero API calls to write
✅ Zero debounce logic
✅ Zero loading states to manage
✅ Zero OTP workflow code
✅ Everything handled by the field components

## Need Help?

See `VALIDATION_FIELD_INTEGRATION_GUIDE.md` for complete documentation.
