"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  success?: string;
  required?: boolean;
  showValidation?: boolean;
  children?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      hint,
      success,
      required,
      showValidation = true,
      className,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold text-slate-900"
        >
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>

        {children ? (
          children
        ) : (
          <input
            ref={ref}
            id={fieldId}
            className={cn(
              "w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              hasError
                ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-rose-200"
                : hasSuccess
                  ? "border-emerald-300 bg-emerald-50/50 focus:border-emerald-400 focus:ring-emerald-200"
                  : "border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-200",
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${fieldId}-error`
                : hint
                  ? `${fieldId}-hint`
                  : undefined
            }
            {...props}
          />
        )}

        {showValidation && (
          <div className="min-h-[20px]">
            {hasError && (
              <p
                id={`${fieldId}-error`}
                className="flex items-center gap-1.5 text-xs text-rose-600"
                role="alert"
              >
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {error}
              </p>
            )}
            {hasSuccess && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                {success}
              </p>
            )}
            {!hasError && !hasSuccess && hint && (
              <p
                id={`${fieldId}-hint`}
                className="flex items-center gap-1.5 text-xs text-slate-500"
              >
                <Info className="h-3.5 w-3.5 flex-shrink-0" />
                {hint}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

/**
 * Inline validation message component
 */
export function ValidationMessage({
  type,
  message,
}: {
  type: "error" | "success" | "info";
  message: string;
}) {
  const config = {
    error: {
      icon: AlertCircle,
      className: "text-rose-600",
    },
    success: {
      icon: CheckCircle2,
      className: "text-emerald-600",
    },
    info: {
      icon: Info,
      className: "text-slate-500",
    },
  };

  const { icon: Icon, className } = config[type];

  return (
    <p className={cn("flex items-center gap-1.5 text-xs", className)}>
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

/**
 * Form validation rules
 */
export const validationRules = {
  required: (value: string) =>
    value.trim() ? null : "This field is required",

  email: (value: string) => {
    if (!value.trim()) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Please enter a valid email address";
  },

  url: (value: string) => {
    if (!value.trim()) return null;
    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  },

  minLength: (min: number) => (value: string) =>
    value.length >= min ? null : `Must be at least ${min} characters`,

  maxLength: (max: number) => (value: string) =>
    value.length <= max ? null : `Must be no more than ${max} characters`,

  number: (value: string) => {
    if (!value.trim()) return null;
    return isNaN(Number(value)) ? "Please enter a valid number" : null;
  },

  positiveNumber: (value: string) => {
    if (!value.trim()) return null;
    const num = Number(value);
    return isNaN(num) || num < 0 ? "Please enter a positive number" : null;
  },

  percentage: (value: string) => {
    if (!value.trim()) return null;
    const num = Number(value);
    return isNaN(num) || num < 0 || num > 100
      ? "Please enter a percentage between 0 and 100"
      : null;
  },

  hexColor: (value: string) => {
    if (!value.trim()) return null;
    const hex = value.startsWith("#") ? value : `#${value}`;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)
      ? null
      : "Please enter a valid hex color (e.g., #FF5733)";
  },
};

/**
 * Hook for form validation
 */
export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  validationSchema: Partial<Record<keyof T, ((value: string) => string | null)[]>>
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (name: keyof T, value: string) => {
    const rules = validationSchema[name];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

  const handleChange = (name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
  };

  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key of Object.keys(validationSchema) as (keyof T)[]) {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(validationSchema).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      ) as Partial<Record<keyof T, boolean>>
    );

    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
