
import { ExpiryStatus, FoodItem } from "@/types";

// Calculate days until expiry
export function daysUntilExpiry(expiryDate: Date): number {
  const currentDate = new Date();
  const timeDiff = expiryDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Determine expiry status based on days remaining
export function getExpiryStatus(expiryDate: Date): ExpiryStatus {
  const daysRemaining = daysUntilExpiry(expiryDate);
  
  if (daysRemaining < 0) {
    return 'expired';
  } else if (daysRemaining <= 3) {
    return 'soon';
  } else {
    return 'fresh';
  }
}

// Format days remaining text
export function formatDaysRemaining(expiryDate: Date): string {
  const days = daysUntilExpiry(expiryDate);
  
  if (days < 0) {
    return `Expired ${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'} ago`;
  } else if (days === 0) {
    return 'Expires today';
  } else {
    return `${days} ${days === 1 ? 'day' : 'days'} remaining`;
  }
}

// Format date to display in a readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Get expiry message based on status
export function getExpiryMessage(status: ExpiryStatus): string {
  switch (status) {
    case 'fresh':
      return 'Still fresh';
    case 'soon':
      return 'Expiring soon';
    case 'expired':
      return 'Expired';
    default:
      return '';
  }
}

// Sort food items by expiry date (soonest first)
export function sortByExpiry(items: FoodItem[]): FoodItem[] {
  return [...items].sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());
}

// Filter items by expiry status
export function filterByStatus(items: FoodItem[], status: ExpiryStatus | 'all'): FoodItem[] {
  if (status === 'all') return items;
  
  return items.filter(item => getExpiryStatus(item.expiryDate) === status);
}

// Get emoji for food category
export function getCategoryEmoji(category: string): string {
  switch (category.toLowerCase()) {
    case 'dairy':
      return '🥛';
    case 'meat':
      return '🥩';
    case 'vegetables':
      return '🥦';
    case 'fruits':
      return '🍎';
    case 'grains':
      return '🍞';
    case 'beverages':
      return '🥤';
    case 'snacks':
      return '🍪';
    case 'leftovers':
      return '🍱';
    default:
      return '🍴';
  }
}
