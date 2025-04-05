
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDate: Date;
  addedDate: Date;
  quantity: number;
  unit: string;
  notes?: string;
}

export type ExpiryStatus = 'fresh' | 'soon' | 'expired';

export type FoodCategory =
  | 'dairy'
  | 'meat'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'beverages'
  | 'snacks'
  | 'leftovers'
  | 'other';
