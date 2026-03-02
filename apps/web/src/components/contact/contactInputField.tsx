type ContactInputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email";
  value: string;
  placeholder: string;
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
};

export const ContactInputField = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
}: ContactInputFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};
