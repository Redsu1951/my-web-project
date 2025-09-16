import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodItemCard from "./FoodItemCard";
import CartSidebar from "./CartSidebar";
import AddressModal from "./AddressModal";
import ToastNotification from "./ToastNotification";

const CustomerMenuPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

  const foodItems = [
    { name: "Margherita Pizza", image: "/images/pizza.jpg", price: 12.99, available: true },
    { name: "Cheeseburger", image: "/images/burger.jpg", price: 9.99, available: true },
    { name: "California Roll", image: "/images/sushi.jpg", price: 8.5, available: false },
    { name: "Spaghetti Bolognese", image: "/images/taco.jpg", price: 11.5, available: true },
  ];

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 2000);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    showToast(`${item.name} added to cart`);
  };

  const handleRemoveFromCart = (itemName) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName));
    showToast(`${itemName} removed from cart`, "error");
  };

  const handleGoToCart = () => {
    if (!deliveryAddress) {
      setShowAddressModal(true);
      return;
    }
    navigate("/customer-cart", { state: { cart, deliveryAddress, restaurant: { name: "Restaurant" } } });
  };

  return (
    <div className="container mt-5 d-flex">
      <ToastNotification message={toast.message} type={toast.type} visible={toast.visible} />

      <div className="flex-grow-1">
        <h2 className="mb-4 text-center">Menu</h2>
        <div className="row">
          {foodItems.map((item, index) => (
            <div key={index} className="col-md-3 mb-4">
              <FoodItemCard item={item} onAdd={() => handleAddToCart(item)} />
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <CartSidebar
          cart={cart}
          deliveryAddress={deliveryAddress}
          onRemove={handleRemoveFromCart}
          onGoToCart={handleGoToCart}
        />
      )}

      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          address={deliveryAddress || {}}
          onClose={() => setShowAddressModal(false)}
          onSave={(address) => {
            setDeliveryAddress(address);
            setShowAddressModal(false);
            navigate("/customer-cart", { state: { cart, deliveryAddress: address, restaurant: { name: "Restaurant" } } });
          }}
        />
      )}
    </div>
  );
};

export default CustomerMenuPage;
