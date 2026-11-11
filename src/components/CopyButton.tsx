import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  return (
    <button type="button" className="button button--quiet" onClick={copy}>
      <Icon name={state === 'copied' ? 'check' : 'copy'} size={16} />
      <span aria-live="polite">
        {state === 'copied'
          ? 'Copied'
          : state === 'failed'
            ? 'Copy failed'
            : label}
      </span>
    </button>
  );
}
