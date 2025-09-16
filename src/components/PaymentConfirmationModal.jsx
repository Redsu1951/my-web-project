import React, { useEffect, useState } from "react";
import "../styles/PaymentConfirmationModal.css"; // optional for custom styles

const PaymentConfirmationModal = ({ show, onComplete, estimatedTime }) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      setLoading(true);
      setSuccess(false);

      const timer1 = setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 3000); // 3 seconds loading

      const timer2 = setTimeout(() => {
        onComplete();
      }, 7000); // total 7 seconds before redirect

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal-content">
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Processing Payment...</p>
          </div>
        )}
        {success && (
          <div className="success-container">
            <div className="green-tick">✔</div>
            <p>Order Placed!</p>
            <p>Estimated Delivery: {estimatedTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
