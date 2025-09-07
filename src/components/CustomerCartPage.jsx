// CustomerCartPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // import useNavigate for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customer.css'; // optional CSS for extra styling

const CustomerCartPage = () => {
  const location = useLocation(); // access data passed from previous page (menu)
  const navigate = useNavigate(); // for navigating to payment page

  // Initialize cart with data from previous page or hard-coded for now
  const initialCart = location.state?.cart || [
    { name: 'Margherita Pizza', price: 12.99, quantity: 2 },
    { name: 'Cheeseburger', price: 9.99, quantity: 1 }
  ];
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');


  const [cart, setCart] = useState(initialCart); // cart state
  const [tip, setTip] = useState(0); // tip state
  const serviceChargeRate = 0.0825; // 8.25% service charge

  // Function to handle quantity changes
  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = value;
    setCart(newCart);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1); // remove item at index
    setCart(newCart);
  };

  // Function to proceed to payment page
  const handleProceedToPayment = () => {
    // Navigate to /customer-payment and pass cart + tip
    navigate('/customer-payment', { state: { cart, tip } });
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = subtotal * serviceChargeRate;
  const grandTotal = subtotal + serviceCharge + tip;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/customer-menu')}>
  &larr; Back
</button>

      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart table */}
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    {/* Editable quantity input */}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                      className="form-control w-50"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    {/* Remove button */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals and tip input */}
          <div className="mt-3">
            <p><strong>Total:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Service Charge (8.25%):</strong> ${serviceCharge.toFixed(2)}</p>

            <div className="mb-3">
              <label className="form-label">Tip:</label>
              <input
                type="number"
                min="0"
                value={tip}
                onChange={(e) => setTip(parseFloat(e.target.value))}
                className="form-control w-25"
              />
            </div>

            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>

            {/* Buttons */}
            <div className="mt-3 d-flex gap-3">
              {/* Proceed to Payment */}
              <button
                className="btn btn-warning btn-lg w-100"
                onClick={() => setShowAddressModal(true)}
              >
              Proceed to Payment
              </button>


              {/* Back to Menu */}
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => window.history.back()}
              >
                Back to Menu
              </button>
              {showAddressModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h5>Enter Delivery Address</h5>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="123 Main St, City"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setShowAddressModal(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            if (address.trim() === '') {
              alert('Please enter an address!');
              return;
            }
            // Navigate to payment with cart + tip + address
            navigate('/customer-payment', { state: { cart, tip, address } });
          }}
        >
          Confirm Address
        </button>
      </div>
    </div>
  </div>
)}

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerCartPage;
