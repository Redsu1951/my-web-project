import React from "react";
import AddressModal from "./AddressModal";
import ToastNotification from "./ToastNotification";
import "../styles/cartSidebar.css";

const CartSidebar = ({ cart, deliveryAddress, onRemove, onGoToCart }) => {
  return (
    <div className="cart-sidebar">
      <h5>Cart</h5>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="list-group mb-3">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {item.name} x{item.quantity}
              <button className="btn btn-sm btn-danger" onClick={() => onRemove(item.name)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-warning w-100" onClick={onGoToCart} disabled={cart.length === 0}>
        Go to Cart
      </button>
    </div>
  );
};

export default CartSidebar;
