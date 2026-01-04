import { AlertCircle } from "lucide-react";
import { type FieldError } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  required?: boolean;
  icon?: React.ReactNode;
  as?: 'input' | 'select' | 'textarea';
  children?: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  icon,
  as = 'input',
  children,
  className = '',
  ...props
}: FormFieldProps) {
  const baseClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
    error ? 'border-red-500' : 'border-slate-300'
  }`;

  const Element = as;

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && '*'}
      </label>
      {icon ? (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
          <Element
            {...(props as any)}
            className={`${baseClassName} pl-11 ${className}`}
          >
            {children}
          </Element>
        </div>
      ) : (
        <Element
          {...(props as any)}
          className={`${baseClassName} ${className}`}
        >
          {children}
        </Element>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error.message}
        </p>
      )}
    </div>
  );
}
