import { Router } from 'express';
import { FoodManager } from '../FoodManager.ts';
// import type { Food } from '../FoodInterface.ts';

const router = Router();
const manager = new FoodManager();

// GET all foods
router.get('/show', (req, res) => {
    console.log("Before");
  const foods = manager.getAllFoods();
  console.log("After");
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
router.post('/analyze-image', async (req, res) => {
    const { base64 } = req.body;
  
    if (!base64) {
      return res.status(400).json({ message: 'No image provided' });
    }
  
    const PAT = '9d8fb27aed0a499ab46b00425dd1e390';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'food-item-recognition';
    const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: base64.replace(/^data:image\/(png|jpeg);base64,/, '')
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT,
        'Content-Type': 'application/json'
      },
      body: raw
    };
  
    try {
      const clarifaiRes = await fetch(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        requestOptions
      );
      const clarifaiData = await clarifaiRes.json();
    const topPrediction = clarifaiData.outputs[0].data.concepts.reduce((best, current) => {
        return current.value > best.value ? current : best;
      });
    console.log("hua?")
    manager.addFood(topPrediction.name, null);
    console.log("ha");
      console.log("Most likely food item:", topPrediction.name);
      // Optionally send a small response to frontend (you can remove this if not needed)
    
    res.status(200).json({
    message: '✅ Clarifai analysis complete',
    predictedFood: topPrediction.name
  });
  
    } catch (err) {
      console.error('Error calling Clarifai API:', err);
      res.status(500).json({ message: 'Clarifai API call failed' });
    }
  });

export default router;
