import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";
import PaymentConfirmationModal from "./PaymentConfirmationModal";

const CustomerPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get all data from previous page
  const cart = location.state?.cart || [];
  const tip = location.state?.tip || 0;
  const deliveryAddress = location.state?.deliveryAddress || {};
  const restaurant = location.state?.restaurant || { name: "Restaurant" };

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceCharge = subtotal * 0.0825;
  const total = subtotal + serviceCharge + tip;

  // Payment modal state
  const [showModal, setShowModal] = useState(false);

  // Payment data from PaymentForm
  const [paymentData, setPaymentData] = useState({});

  // Handle form submission
  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setShowModal(true);
  };

  // Modal complete callback
  const handleModalComplete = () => {
    setShowModal(false);
    navigate("/"); // back to main page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{restaurant.name} - Payment</h2>

      <div className="row">
        {/* Order Summary (fully intact) */}
        <div className="col-md-6 mb-4">
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            serviceCharge={serviceCharge}
            tip={tip}
            total={total}
            deliveryAddress={deliveryAddress}
          />
        </div>

        {/* Payment Form */}
        <div className="col-md-6 mb-4">
          <PaymentForm onSubmit={handlePaymentSubmit} />
        </div>
      </div>

      {/* Cancel button */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>

      {/* Payment confirmation modal */}
      <PaymentConfirmationModal
        show={showModal}
        onComplete={handleModalComplete}
        estimatedTime="30-40 mins"
      />
    </div>
  );
};

export default CustomerPaymentPage;
