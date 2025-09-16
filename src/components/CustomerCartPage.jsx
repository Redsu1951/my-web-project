import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import AddressSection from "./AddressSection";
import AddressModal from "./AddressModal";

const CustomerCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = location.state?.cart || [];
  const restaurant = location.state?.restaurant || { name: "Restaurant" };
  const initialTip = location.state?.tip || 0;

  const [tip, setTip] = useState(initialTip);
  const [deliveryAddress, setDeliveryAddress] = useState(location.state?.deliveryAddress || {});
  const [showAddressModal, setShowAddressModal] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax + tip;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{restaurant.name} - Your Cart</h2>

      <CartItems cart={cart} />

      <AddressSection address={deliveryAddress} onEdit={() => setShowAddressModal(true)} />

      <CartSummary subtotal={subtotal} tax={tax} tip={tip} setTip={setTip} total={total} />

      <div className="text-center mt-3">
        <button
          className="btn btn-warning btn-lg"
          onClick={() => {
            if (!deliveryAddress.street) {
              setShowAddressModal(true);
            } else {
              navigate("/customer-payment", {
                state: { cart, tip, deliveryAddress, restaurant },
              });
            }
          }}
        >
          Confirm Order
        </button>
      </div>

      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          address={deliveryAddress}
          onClose={() => setShowAddressModal(false)}
          onSave={(newAddress) => {
            setDeliveryAddress(newAddress);
            setShowAddressModal(false);
            navigate("/customer-payment", {
              state: { cart, tip, deliveryAddress: newAddress, restaurant },
            });
          }}
        />
      )}
    </div>
  );
};

export default CustomerCartPage;
