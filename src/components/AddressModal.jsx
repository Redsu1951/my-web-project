// src/components/AddressModal.jsx
import React, { useState, useEffect } from "react";
import "../styles/addressModal.css";

const AddressModal = ({ isOpen = true, address = {}, onSave, onClose, title = "Enter Delivery Address" }) => {
  const [street, setStreet] = useState(address.street || "");
  const [city, setCity] = useState(address.city || "");
  const [stateVal, setStateVal] = useState(address.state || "");
  const [zip, setZip] = useState(address.zip || "");

  useEffect(() => {
    // Update fields if address prop changes
    setStreet(address.street || "");
    setCity(address.city || "");
    setStateVal(address.state || "");
    setZip(address.zip || "");
  }, [address]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ street, city, state: stateVal, zip });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-glass">
        <h3 className="mb-3">{title}</h3>

        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="State"
          value={stateVal}
          onChange={(e) => setStateVal(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="form-control mb-2"
        />

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
