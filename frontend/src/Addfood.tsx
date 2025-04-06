import React, { useState, FormEvent, useEffect } from 'react';

interface Food {
  id: number;
  name: string;
  expiryDate: string;
}

export default function AddFood() {
 


 

  return (
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
  );
}