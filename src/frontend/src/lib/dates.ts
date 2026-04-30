/**
 * Returns today's date as ISO string (YYYY-MM-DD).
 */
export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Computes days until a given ISO date string from today.
 * Returns negative if past, 0 if today, positive if future.
 */
export function daysUntil(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Returns a human-friendly label for days until renewal.
 */
export function renewalLabel(isoDate: string): string {
  const days = daysUntil(isoDate);
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days <= 7) return `In ${days} days`;
  return formatDisplayDate(isoDate);
}

/**
 * Formats ISO date to "Jul 15" style.
 */
export function formatDisplayDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns true if renewal is within `withinDays` days.
 */
export function isRenewalSoon(isoDate: string, withinDays = 7): boolean {
  const days = daysUntil(isoDate);
  return days >= 0 && days <= withinDays;
}
