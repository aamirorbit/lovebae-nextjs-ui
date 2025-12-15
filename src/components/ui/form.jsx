import * as React from "react";
import { cn } from "@/lib/utils";

const Form = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    />
  );
});
Form.displayName = "Form";

const FormField = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  );
});
FormField.displayName = "FormField";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-gray-700", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
});
FormInput.displayName = "FormInput";

const FormSelect = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
});
FormSelect.displayName = "FormSelect";

const FormCheckbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-red-600",
        "focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
});
FormCheckbox.displayName = "FormCheckbox";

const FormError = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-500", className)}
      {...props}
    />
  );
});
FormError.displayName = "FormError";

export { Form, FormField, FormLabel, FormInput, FormSelect, FormCheckbox, FormError }; 