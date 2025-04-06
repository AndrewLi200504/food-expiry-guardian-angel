import type { Food } from './FoodInterface.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'myData.json');

export class FoodManager  {
  private foods: Food[] = [];
  private nextId: number = 1;


  constructor() {
    this.loadFromFile();
  }

  private loadFromFile(): void {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed: Food[] = JSON.parse(raw, (key, value) => {
          if (key === 'expiryDate') return new Date(value);
          return value;
        });
  
        this.foods = parsed;
        this.nextId = this.foods.reduce((max, food) => Math.max(max, food.id), 0) + 1;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }




  private saveToFile(): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.foods, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  addFood(name: string, expiryDate : Date): Food {
    const newFood: Food = {
      id: this.nextId++,
      name,
      expiryDate,
    };
    this.foods.push(newFood);
    this.saveToFile();
    return newFood;
  }

  removeFood(id: number): Food {
    const index = this.foods.findIndex(food => food.id === id);
    if (index === -1) {
      throw new Error(`Food item with id ${id} not found.`);
    }
    const [removed] = this.foods.splice(index, 1);
    this.saveToFile();
    return removed;
  }

  updateExpiryDate(id: number, newExpiryDate: Date): void {
    const food = this.foods.find(food => food.id === id);
    if (!food) {
      throw new Error(`Food item with id ${id} not found.`);
    }
    food.expiryDate = newExpiryDate;

    this.saveToFile();

  }

  getAllFoods(): Food[] {
    return this.foods;
  }


}
