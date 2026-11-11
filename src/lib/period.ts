export type Cadence = 'daily' | 'weekly' | 'monthly';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** ISO 8601 week number, so a "weekly" habit resets every Monday. */
export function isoWeek(date: Date): { year: number; week: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((+d - +yearStart) / 86_400_000 + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

/** A key that changes when the period rolls over: 2026-11-11, 2026-W46, 2026-11. */
export function periodKey(cadence: Cadence, date = new Date()): string {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  if (cadence === 'daily') return `${y}-${m}-${pad(date.getDate())}`;
  if (cadence === 'monthly') return `${y}-${m}`;
  const { year, week } = isoWeek(date);
  return `${year}-W${pad(week)}`;
}
