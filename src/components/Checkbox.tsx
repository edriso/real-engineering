import { useId, type ReactNode } from 'react';
import { Icon } from './Icon';

export function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="check" data-checked={checked || undefined}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="check__box" aria-hidden="true">
        <Icon name="check" size={14} strokeWidth={2.6} />
      </span>
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
