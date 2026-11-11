import { describe, expect, it } from 'vitest';
import { isoWeek, periodKey } from '../src/lib/period';

describe('periodKey', () => {
  const date = new Date(2026, 10, 11); // 11 Nov 2026, a Wednesday

  it('keys days, weeks and months', () => {
    expect(periodKey('daily', date)).toBe('2026-11-11');
    expect(periodKey('weekly', date)).toBe('2026-W46');
    expect(periodKey('monthly', date)).toBe('2026-11');
  });

  it('follows ISO weeks across the new year', () => {
    // 1 Jan 2027 is a Friday, so it still belongs to 2026's last week.
    expect(isoWeek(new Date(2027, 0, 1))).toEqual({ year: 2026, week: 53 });
    // 29 Dec 2025 is a Monday that starts 2026-W01.
    expect(isoWeek(new Date(2025, 11, 29))).toEqual({ year: 2026, week: 1 });
  });

  it('starts a new week on Monday', () => {
    const sunday = new Date(2026, 10, 15);
    const monday = new Date(2026, 10, 16);
    expect(periodKey('weekly', sunday)).not.toBe(periodKey('weekly', monday));
  });
});
