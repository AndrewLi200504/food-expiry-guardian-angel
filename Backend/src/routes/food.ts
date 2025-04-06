import { Router } from 'express';
import { FoodManager } from '../FoodManager.ts';
// import type { Food } from '../FoodInterface.ts';

const router = Router();
const manager = new FoodManager();

// GET all foods
router.get('/', (req, res) => {
  const foods = manager.getAllFoods();
  res.status(200).json(foods);
});

// POST a new food item
router.post('/', (req, res) => {
  const { name, expiryDate } = req.body;

  if (!name || !expiryDate) {
    return res.status(400).json({ message: 'Name and expiryDate are required.' });
  }

  try {
    const date = new Date(expiryDate);
    const newFood = manager.addFood(name, date);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: 'Error adding food', error });
  }
});

// DELETE a food item by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const removed = manager.removeFood(id);
    res.status(200).json(removed);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// PATCH to update expiry date
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { newExpiryDate } = req.body;

  if (!newExpiryDate) {
    return res.status(400).json({ message: 'newExpiryDate is required.' });
  }

  try {
    manager.updateExpiryDate(id, new Date(newExpiryDate));
    res.status(200).json({ message: 'Expiry date updated.' });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
