import { Input, Label, Select, Textarea } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "password";
  required?: boolean;
  error?: string;
  className?: string;
  as?: "input" | "textarea" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export function FormField(props: FormFieldProps) {
  const {
    label,
    name,
    required,
    error,
    className,
  } = props;

  const id = `field-${name}`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {props.as === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          placeholder={props.placeholder}
          error={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : props.as === "select" && props.options ? (
        <Select
          id={id}
          name={name}
          error={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="">Bitte wählen</option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={id}
          name={name}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          error={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
