# Form Validation Integration - Next Steps

## Status
✅ **Infrastructure Ready** - React Hook Form + Zod installed and validation schema created
⏳ **Form Integration Pending** - Need to integrate validation with forms

## What's Been Prepared

### 1. Validation Schema Created
- **File:** [src/lib/validation/referred-form.ts](src/lib/validation/referred-form.ts)
- **Contents:** Complete Zod schema with all fields validated
- **Features:**
  - Business name (1-100 chars)
  - Email validation with proper regex
  - Phone number validation (`/^[\d\s\-\+\(\)]+$/`)
  - URL validation for website
  - Goals (10-500 chars)
  - Field-specific error messages

### 2. Dependencies Installed
```json
{
  "react-hook-form": "^7.x.x",
  "@hookform/resolvers": "^3.x.x",
  "zod": "^3.x.x"
}
```

### 3. Helper Components Created
- **File:** [src/components/referred/FormField.tsx](src/components/referred/FormField.tsx)
- **Purpose:** Reusable form field component with error display
- **Features:** Icon support, error display, responsive styling

## Integration Steps for ReferredApplicationForm

### Step 1: Update Component Imports and Setup

Current state ([src/components/referred/ReferredApplicationForm.tsx:1-35](src/components/referred/ReferredApplicationForm.tsx#L1-L35)):
```typescript
// Already added:
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { referredApplicationSchema, type ReferredApplicationFormData } from "@/lib/validation/referred-form";

// Already added hook:
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<ReferredApplicationFormData>({
  resolver: zodResolver(referredApplicationSchema),
  defaultValues: {
    ambassadorId,
    businessId,
    referralCode,
    website: "",
    referralSource: "",
  },
});
```

### Step 2: Update Form Submit Handler

**Current:**
```typescript
<form onSubmit={handleSubmit} className="space-y-6">
```

**Change to:**
```typescript
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
```

### Step 3: Update Each Input Field

For each field, replace `name="fieldName"` with `{...register("fieldName")}` and add error display.

**Example Pattern for Text Input:**
```typescript
// BEFORE:
<input
  type="text"
  name="businessName"
  required
  className="w-full px-4 py-3 border border-slate-300 rounded-lg..."
  placeholder="Your Company Pty Ltd"
/>

// AFTER:
<input
  type="text"
  {...register("businessName")}
  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
    errors.businessName ? 'border-red-500' : 'border-slate-300'
  }`}
  placeholder="Your Company Pty Ltd"
/>
{errors.businessName && (
  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    {errors.businessName.message}
  </p>
)}
```

**Example Pattern for Select:**
```typescript
// BEFORE:
<select name="industry" required className="...">

// AFTER:
<select
  {...register("industry")}
  className={`w-full px-4 py-3 border rounded-lg... ${
    errors.industry ? 'border-red-500' : 'border-slate-300'
  }`}
>
```

**Example Pattern for Textarea:**
```typescript
// BEFORE:
<textarea name="goals" required rows={4} className="...">

// AFTER:
<textarea
  {...register("goals")}
  rows={4}
  className={`w-full px-4 py-3 border rounded-lg... ${
    errors.goals ? 'border-red-500' : 'border-slate-300'
  }`}
/>
{errors.goals && (
  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    {errors.goals.message}
  </p>
)}
```

### Step 4: Update Button State

**Current:**
```typescript
<Button
  type="submit"
  disabled={loading}
  ...
>
  {loading ? (...) : (...)}
</Button>
```

**Change to:**
```typescript
<Button
  type="submit"
  disabled={isSubmitting}
  ...
>
  {isSubmitting ? (...) : (...)}
</Button>
```

## Fields to Update

### Business Information Section (lines 187-281)
- [ ] businessName (input) - line 191
- [ ] industry (select) - line 211
- [ ] website (input) - line 236
- [ ] monthlyRevenue (select) - line 250
- [ ] teamSize (select) - line 268

### Contact Information Section (lines 284-348)
- [ ] fullName (input) - line 295
- [ ] email (input) - line 310
- [ ] phone (input) - line 326
- [ ] role (input) - line 340

### Goals Section (lines 350-376)
- [ ] goals (textarea) - line 356
- [ ] referralSource (input) - line 369

## Quick Add Customer Form

Similar integration needed for QuickAddCustomerForm - create schema and integrate.

## Testing Checklist

After integration:
- [ ] Test required field validation
- [ ] Test email format validation
- [ ] Test phone format validation
- [ ] Test URL validation for website
- [ ] Test character limits (businessName max 100, goals min 10 max 500)
- [ ] Test form submission with valid data
- [ ] Test error display for each field
- [ ] Test mobile responsiveness of error messages

## Benefits of This Integration

1. **Real-time Validation** - Users see errors as they type
2. **Type Safety** - TypeScript ensures correct data structure
3. **Better UX** - Field-specific error messages vs generic "fill all fields"
4. **Consistent Validation** - Same rules on client and server
5. **Accessibility** - Error messages properly associated with inputs

## Estimated Time
- **ReferredApplicationForm:** ~30 minutes
- **QuickAddCustomerForm:** ~20 minutes
- **Testing:** ~15 minutes
- **Total:** ~1 hour

## Commands to Run After Integration

```bash
# Test build
npm run build

# Test locally
npm run dev

# Deploy
git add -A
git commit -m "feat: integrate React Hook Form validation in application forms"
git push
npm run deploy:prod
```
