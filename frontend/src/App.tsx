import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AddFood from './Addfood';
import CameraUpload from './WebcamCapture';
import WebcamCapture from './WebcamCapture';


interface Food {
  id: number;
  name: string;
  expiryDate: string;
}


function App() {

  const [foods, setFoods] = useState<Food[]>([]);

  // Fetch foods once when the component mounts

  const fetchFoods = async () => {
    try {

      const response = await fetch('http://localhost:3000/api/food/show');
      
      // If there's a chance for non-200 responses, check response.ok
      if (!response.ok) {
        // throw new Error(Server error: ${response.status} ${response.statusText});
      }

      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };


  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expiryDate }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Error adding food');
      }

      // The server returns the newly created food item
      const newFood: Food = await response.json();
      console.log('Food added successfully:', newFood);
      fetchFoods();
      
      // Clear the inputs
      setName('');
      setExpiryDate('');
    } catch (err) {
      console.error('Failed to add food:', err);
    }
  };




  useEffect(() => {
    

    fetchFoods();
  }, []); // Empty dependency array => run once on mount



  return (
    <div>
      <h1>Food List</h1>

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <strong>{food.name}</strong> (expires {food.expiryDate})
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
      <div>
        <label>Food Name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bananas"
          required
        />
      </div>

      <div>
        <label>Expiry Date (YYYY-MM-DD): </label>
        <input
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="2025-12-31"
          required
        />
      </div>

      <button type="submit">Add Food</button>
    </form>

    <WebcamCapture/>
    </div>
  );


}

export default App;