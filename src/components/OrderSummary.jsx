import React from "react";

const OrderSummary = ({ cart, subtotal, serviceCharge, tip, total, deliveryAddress }) => (
  <div className="card shadow-sm p-3">
    <h5>Order Summary</h5>
    <ul className="list-group mb-3">
      {cart.map((item, idx) => (
        <li key={idx} className="list-group-item d-flex justify-content-between">
          {item.name} (x{item.quantity})
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
      <li className="list-group-item d-flex justify-content-between">
        <strong>Subtotal</strong>
        <span>${subtotal.toFixed(2)}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <strong>Tax (8.25%)</strong>
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

    <div>
      <h6>Delivery Address</h6>
      <p>
        {deliveryAddress.street}, {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.zip}
      </p>
    </div>
  </div>
);

export default OrderSummary;
