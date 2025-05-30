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


  const fetchFoods = async () => {
    try {

      const response = await fetch('http://localhost:3000/api/food/show');
      
      if (!response.ok) {
      }

      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };


  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  // const [updatedExpiryDate, setupdatedExpiryDate] = useState('');


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

      const newFood: Food = await response.json();
      console.log('Food added successfully:', newFood);
      fetchFoods();
      
      setName('');
      setExpiryDate('');
    } catch (err) {
      console.error('Failed to add food:', err);
    }
  };

 

  useEffect(() => {
    

    fetchFoods();
  }, []); 



  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/food/${id}`, {
        method: 'DELETE',
      });
      fetchFoods(); 
    } catch (err) {
      console.error('Failed to delete food:', err);
    }
  };

  return (
    <div>
      <h1>Food List</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
  {foods.map((food) => {
    const expiry = new Date(food.expiryDate);
    const today = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let statusClass = '';
    if (daysLeft < 0) {
      statusClass = 'red';
    } else if (daysLeft <= 3) {
      statusClass = 'orange';
    } else {
      statusClass = 'green';
    }

//     function openInputField(id : number): import("react").ReactNode {
     
//      return <div>
//       <label>Expiry Date (YYYY-MM-DD): </label>
//       <input
//         value={updatedExpiryDate}
//         onChange={(e) => setupdatedExpiryDate(e.target.value)}
//         placeholder="2025-12-31"
//         required

//       />
//   <button onClick={() => handleUpdate(id, updatedExpiryDate)}>Save</button>
// </div>
//       }

    return (
      <li key={food.id} className={`food-card ${statusClass}`}>
        <div className="food-left">
          <strong>{food.name}</strong>
          <div className="expiry">Expires: {expiry.toISOString().slice(0, 10)}</div>
        </div>
        <div className="food-right">
        
        
        {/* <button> */}

        {/* <button onClick={() => openInputField(food.id)}>Update</button> */}
        {/* </button> */}

          <button className="delete-btn" onClick={() => handleDelete(food.id)}>X</button>
        </div>
      </li>
    );
  })}
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
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="2025-12-31"
          required
        />
      </div>

      <button type="submit">Add Food</button>
    </form>

    <WebcamCapture fetchFoods={fetchFoods} />
    </div>
  );


}

export default App;

// function handleUpdate(id: number, updatedExpiryDate: string): import("react").ReactNode {
//   fetch("/:id/:updated",(res,rep)=>{


//   })

