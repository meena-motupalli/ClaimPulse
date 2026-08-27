import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates days elapsed between submission date and target date (defaults to demo date 2026-08-26 or current date)
 */
export function calculateDaysElapsed(submissionDateStr: string, targetDateStr: string = '2026-08-26'): number {
  try {
    const subDate = new Date(submissionDateStr);
    const targetDate = new Date(targetDateStr);
    const diffTime = targetDate.getTime() - subDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  } catch (err) {
    return 0;
  }
}

/**
 * Format ISO date string into readable Indian standard date (e.g. "12 August 2026")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (err) {
    return dateString;
  }
}
