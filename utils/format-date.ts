import { format, formatRelative, isValid, parseISO } from 'date-fns';

export type DateFormat = 'short' | 'relative';

export const formatTransactionDate = (isoDate: string, formatType: DateFormat = 'short'): string => {
  try {
    const date = parseISO(isoDate);
    if (!isValid(date)) {
      return 'Invalid Date';
    }

    switch (formatType) {
      case 'short':
        return format(date, 'MMM d, yyyy, h:mm a'); // e.g., "Aug 20, 2025, 12:39 PM"
      case 'relative':
        return formatRelative(date, new Date()); // e.g., "2 hours ago", "Yesterday"
      default:
        return format(date, 'MMM d, yyyy, h:mm a');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};