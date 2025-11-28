# Compliance Scripts - Quick Reference Card

## 🚀 Quick Start

```bash
npm run dev
# Open http://localhost:5173/quiz in browser
# Open DevTools Console (F12)
```

## 🔍 Console Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `complianceMonitor.start()` | Real-time monitoring | Track field loading timing |
| `complianceMonitor.check()` | Instant status check | Debug field issues |
| `complianceMonitor.checkRoute()` | Route detection | Verify route logic |

## ✅ Success Indicators

**In Console**:
```
✓ JORNAYA READY at ~1000ms
✓ TRUSTEDFORM READY at ~2000ms
✓ ALL COMPLIANCE FIELDS READY
```

**In Network Tab**:
- ✅ GET `create.lidstatic.com/campaign/...` → 200 OK
- ✅ GET `api.trustedform.com/trustedform.js` → 200 OK

## ⚡ Expected Timing

| Event | Normal Time | Max Time |
|-------|-------------|----------|
| Script load | 300-800ms | 2000ms |
| Field creation | 500-1500ms | 3000ms |
| Token population | 1000-3000ms | 5000ms |
| Total ready | 2000-4000ms | 10000ms |

## 🎯 Routes with Compliance

Scripts auto-load on these routes:
- `/start-quiz`
- `/quiz`
- `/get-quote`
- `/quote`
- `/contact`

Scripts DON'T load on:
- `/` (homepage)
- `/privacy-policy`
- `/terms-of-service`
- `/outcome/*`

## 🛠️ Quick Debug Checks

### Check if scripts loaded:
```javascript
!!document.getElementById('LeadiDscript_campaign')  // Jornaya
!!document.querySelector('script[src*="trustedform"]')  // TrustedForm
```

### Check if fields exist:
```javascript
!!document.getElementById('leadid_token')  // Jornaya field
!!document.querySelector('[id^="xxTrustedFormCertUrl"]')  // TF field
```

### Check if fields have values:
```javascript
document.getElementById('leadid_token')?.value?.length > 0
document.querySelector('[id^="xxTrustedFormCertUrl"]')?.value?.length > 0
```

### One-liner status check:
```javascript
complianceMonitor.check()
```

## 🐛 Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Token not populated after 15s" | Ad blocker | Disable ad blocker |
| Scripts not loading | Wrong route | Check `complianceMonitor.checkRoute()` |
| Fields empty | Too fast | Wait 2-3 seconds |
| Modal missing fields | Not cloned | Check console for clone logs |

## 📊 Testing Checklist

Quick 5-minute test:
- [ ] Navigate to `/quiz`
- [ ] Run `complianceMonitor.start()`
- [ ] Wait for "ALL FIELDS READY"
- [ ] Open modal, advance to contact form
- [ ] Run `complianceMonitor.check()`
- [ ] Verify modal form has values
- [ ] Submit form
- [ ] Check Network tab for tokens in payload

## 🔧 Configuration

**Enable/Disable Jornaya**:
`src/config/compliance.config.ts`
```typescript
jornaya: {
  enabled: true,  // Set to false to disable
  ...
}
```

**Enable/Disable TrustedForm**:
```typescript
trustedForm: {
  enabled: true,  // Set to false to disable
  ...
}
```

## 📈 What Gets Logged

**Page Load**:
```
=== COMPLIANCE INITIALIZATION STARTED ===
📡 JORNAYA: Starting script load...
✓ JORNAYA: Script loaded in XXXms
✓ JORNAYA: Field created in DOM at XXXms
✓ JORNAYA: Token populated at XXXms
```

**Modal Opens**:
```
🔐 QuizOverlay: Modal opened, checking...
✓ QuizOverlay: Jornaya script already initialized
```

**Contact Form Shows**:
```
🔐 QuizOverlay: Contact form step detected
✓ QuizOverlay: Compliance fields ready in XXXms
✓ QuizOverlay: Fields cloned to modal form
```

**Form Submitted**:
```
QuizOverlay: Syncing compliance fields
QuizOverlay: Compliance data for submission
Final submission payload: {...}
```

## 🎨 Console Log Colors

- 🟢 Green `✓` = Success
- 🔴 Red `✗` = Error/Timeout
- 🟡 Yellow `⚠` = Warning/Fallback
- 🔵 Blue `📡` = In Progress
- 🟣 Purple `🔐` = Security/Compliance

## 📞 When to Ask for Help

Contact developer if:
1. "ALL FIELDS READY" never appears (after 10s+)
2. `complianceMonitor.check()` shows `allReady: false` consistently
3. Submission payload missing `leadid_token` or `xxTrustedFormCertUrl`
4. Console shows repeated timeout errors
5. Ad blocker disabled but still not working

## 💡 Pro Tips

1. **Use incognito mode** for clean testing (no extension interference)
2. **Check Network tab** to see actual script requests/responses
3. **Throttle to 3G** to test slow network scenarios
4. **Clear browser cache** between tests for consistency
5. **Open console BEFORE page load** to see initialization logs

## 📚 Full Documentation

- **Testing Guide**: `COMPLIANCE_TESTING.md`
- **Fix Summary**: `COMPLIANCE_FIX_SUMMARY.md`
- **Setup Guide**: `COMPLIANCE_SETUP.md`
- **README**: `README.md`

---

**Last Updated**: October 2025
**Version**: 1.0.0
