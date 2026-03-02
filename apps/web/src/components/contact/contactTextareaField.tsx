type ContactTextareaFieldProps = {
  id: string;
  label: string;
  rows?: number;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
};

export const ContactTextareaField = ({
  id,
  label,
  rows = 6,
  value,
  placeholder,
  error,
  onChange,
}: ContactTextareaFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35"
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
