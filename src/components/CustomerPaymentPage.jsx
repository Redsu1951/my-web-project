// src/pages/CustomerPaymentPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customer.css';

const CustomerPaymentPage = () => {
  const navigate = useNavigate(); // for Back button
  const location = useLocation();
  const cart = location.state?.cart || [];
  const tip = location.state?.tip || 0;

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const serviceChargeRate = 0.0825;
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceCharge = subtotal * serviceChargeRate;
  const total = subtotal + serviceCharge + tip;

  const handleConfirmPayment = () => {
    console.log('Payment Confirmed!');
    console.log('Name:', name);
    console.log('Card Number:', cardNumber);
    console.log('Expiry:', expiry);
    console.log('CVV:', cvv);
    console.log('Total Amount Paid:', total.toFixed(2));
    alert('Payment Successful!');

    // Redirect to main customer page after payment
    navigate('/customer-menu');
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/customer-cart')}
      >
        &larr; Back to Cart
      </button>

      <h2 className="mb-4 text-center">Payment</h2>

      {/* Order Summary */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          {cart.length > 0 ? (
            <ul className="list-group mb-3">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.name} (x{item.quantity})
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Subtotal</strong>
                <span>${subtotal.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Service Charge (8.25%)</strong>
                <span>${serviceCharge.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Tip</strong>
                <span>${tip.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <span>${total.toFixed(2)}</span>
              </li>
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}
        </div>
      </div>

      {/* Payment Form */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Payment Details</h5>
          <form>
            <div className="mb-3">
              <label className="form-label">Name on Card</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-warning btn-lg w-100"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerPaymentPage;
