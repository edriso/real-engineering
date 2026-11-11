import { useTheme, type ThemeChoice } from '../lib/theme';
import { Icon, type IconName } from './Icon';

const icon: Record<ThemeChoice, IconName> = {
  system: 'monitor',
  light: 'sun',
  dark: 'moon',
};

export function ThemeToggle() {
  const { choice, cycle, next } = useTheme();
  return (
    <button
      type="button"
      className="icon-button"
      onClick={cycle}
      aria-label={`Theme: ${choice}. Switch to ${next}.`}
      title={`Theme: ${choice}`}
    >
      <Icon name={icon[choice]} />
    </button>
  );
}
