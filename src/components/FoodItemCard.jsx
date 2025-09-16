// src/components/FoodItemCard.jsx
import React, { useState } from "react";

const FoodItemCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card shadow-sm h-100">
      <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">${item.price.toFixed(2)}</p>
        <p className={`card-text ${item.available ? "text-success" : "text-danger"}`}>
          {item.available ? "Available" : "Unavailable"}
        </p>
        {item.available && (
          <>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control mb-2"
            />
            <button className="btn btn-warning" onClick={() => onAdd(quantity)}>
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
