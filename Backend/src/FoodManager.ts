import { Food, FoodInterface } from './FoodInterface';

export class FoodManager implements FoodInterface {
  private foods: Food[] = [];
  private nextId: number = 1;

  addFood(name: string, expiryDate: Date): Food {
    const newFood: Food = {
      id: this.nextId++,
      name,
      expiryDate,
    };
    this.foods.push(newFood);
    return newFood;
  }

  removeFood(id: number): Food {
    const index = this.foods.findIndex(food => food.id === id);
    if (index === -1) {
      throw new Error(`Food item with id ${id} not found.`);
    }
    const [removed] = this.foods.splice(index, 1);
    return removed;
  }

  updateExpiryDate(id: number, newExpiryDate: Date): void {
    const food = this.foods.find(food => food.id === id);
    if (!food) {
      throw new Error(`Food item with id ${id} not found.`);
    }
    food.expiryDate = newExpiryDate;
  }

  getAllFoods(): Food[] {
    return this.foods;
  }
}
