export interface Food {
    id: number;
    name: string;
    expiryDate: Date;
  }
  
  export interface FoodInterface {
    // Adds a food item with auto-generated ID
    addFood(name: string, expiryDate: Date): Food;
  
    // Removes food item by ID and returns it
    removeFood(id: number): Food;
  
    // Updates expiry date by ID
    updateExpiryDate(id: number, newExpiryDate: Date): void;
  
    // Optional helper to get all items
    getAllFoods(): Food[];
  }