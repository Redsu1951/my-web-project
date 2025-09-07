import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customer.css';
import { useNavigate } from 'react-router-dom';

const CustomerMenuPage = () => {
  const navigate = useNavigate();

  const foodItems = [
    { name: 'Margherita Pizza', image: 'https://via.placeholder.com/150', price: 12.99, available: true },
    { name: 'Cheeseburger', image: 'https://via.placeholder.com/150', price: 9.99, available: true },
    { name: 'California Roll', image: 'https://via.placeholder.com/150', price: 8.5, available: false },
    { name: 'Spaghetti Bolognese', image: 'https://via.placeholder.com/150', price: 11.5, available: true }
  ];

  const [quantities, setQuantities] = useState(foodItems.map(() => 1));
  const [cart, setCart] = useState([]); // store added items

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (item, quantity) => {
    const newItem = { ...item, quantity };
    setCart([...cart, newItem]);
    alert(`Added ${quantity} x ${item.name} to cart (UI only)`);
  };

  const goToCart = () => {
    // For now, pass cart items via state (hardcoded for frontend)
    navigate('/customer-cart', { state: { cart } });
  };

  return (
    
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/customer-login')}>
        &larr; Back
      </button>

      <h2 className="mb-4 text-center">Menu</h2>
      <div className="row">
        {foodItems.map((item, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card shadow-sm h-100">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price.toFixed(2)}</p>
                <p className={`card-text ${item.available ? 'text-success' : 'text-danger'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
                {item.available && (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      className="form-control mb-2"
                    />
                    <button
                      className="btn btn-warning mb-2"
                      onClick={() => handleAddToCart(item, quantities[index])}
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Go to Cart button only if items added */}
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-warning btn-lg" onClick={goToCart}>
            Go to Cart ({cart.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerMenuPage;
