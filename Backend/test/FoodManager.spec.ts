import { expect } from 'chai';
import { FoodManager } from '../src/FoodManager';

describe('FoodManager', () => {
  let foodManager: FoodManager;
  

  beforeEach(() => {
    foodManager = new FoodManager();
  });

  it('should add a food item with an auto-generated ID', () => {
    const food = foodManager.addFood('Apples', new Date('2025-05-01'));
    expect(food.id).to.be.a('number');
    expect(food.name).to.equal('Apples');
  });

  it('should remove a food item by ID', () => {
    const food = foodManager.addFood('Bread', new Date('2025-05-10'));
    const removed = foodManager.removeFood(food.id);
    expect(removed.id).to.equal(food.id);
  });

  it('should update the expiry date of an existing food item', () => {
    const food = foodManager.addFood('Eggs', new Date('2025-04-01'));
    const newDate = new Date('2025-04-30');
    foodManager.updateExpiryDate(food.id, newDate);
    const updatedFood = foodManager.getAllFoods().find(f => f.id === food.id);
    expect(updatedFood?.expiryDate.toISOString()).to.equal(newDate.toISOString());
  });

  it('should throw error when removing non-existent item', () => {
    expect(() => foodManager.removeFood(999)).to.throw();
  });

  it('should throw error when updating non-existent item', () => {
    expect(() => foodManager.updateExpiryDate(999, new Date())).to.throw();
  });
});