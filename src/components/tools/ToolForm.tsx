import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/** Form pieces shared by the generator tools (QR code, barcode). */
export function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <>
      <div className="photo-step-title">
        <span>{index}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </>
  );
}

export function Options<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  className = '',
}: {
  legend: string;
  name: string;
  options: { value: T; label: string; hint?: string; icon?: LucideIcon }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <fieldset className="photo-field">
      <legend>{legend}</legend>
      <div className={`photo-options ${className}`}>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              {option.icon && <option.icon aria-hidden="true" />}
              <strong>{option.label}</strong>
              {option.hint && <small>{option.hint}</small>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {hint && <span>{hint}</span>}
      </label>
      {children}
    </div>
  );
}
