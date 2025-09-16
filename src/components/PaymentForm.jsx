import React, { useState, useEffect } from "react";

const PaymentForm = ({ onSubmit }) => {
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    if (!cardType) newErrors.cardType = "Select card type";
    if (cardNumber && !/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!firstName) newErrors.firstName = "Enter first name";
    if (!lastName) newErrors.lastName = "Enter last name";
    if (expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be MM/YY";
    if (cvv && !/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits";
    if (!street) newErrors.street = "Enter street";
    if (!city) newErrors.city = "Enter city";
    if (!state) newErrors.state = "Enter state";
    if (!zip) newErrors.zip = "Enter zip code";
    if (phone && !/^\d{10}$/.test(phone)) newErrors.phone = "Phone must be 10 digits";
    setErrors(newErrors);
  }, [cardType, cardNumber, firstName, lastName, expiry, cvv, street, city, state, zip, phone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit only if no errors
    if (Object.keys(errors).length === 0 &&
        cardType && cardNumber && firstName && lastName &&
        expiry && cvv && street && city && state && zip && phone) {
      onSubmit({ cardType, cardNumber, firstName, lastName, expiry, cvv, street, city, state, zip, phone });
    } else {
      alert("Please fix all errors before submitting");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Card Details</h5>
      <div className="mb-3">
        <label>Card Type</label>
        <select className="form-control" value={cardType} onChange={e => setCardType(e.target.value)}>
          <option value="">Select Card Type</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Discover">Discover</option>
        </select>
        {errors.cardType && <small className="text-danger">{errors.cardType}</small>}
      </div>

      <div className="mb-3">
        <label>Card Number</label>
        <input type="text" className="form-control" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
        {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
      </div>

      <div className="row">
        <div className="col mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
        </div>
        <div className="col mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label>Expiry (MM/YY)</label>
          <input type="text" className="form-control" value={expiry} onChange={e => setExpiry(e.target.value)} />
          {errors.expiry && <small className="text-danger">{errors.expiry}</small>}
        </div>
        <div className="col mb-3">
          <label>CVV</label>
          <input type="text" className="form-control" value={cvv} onChange={e => setCvv(e.target.value)} />
          {errors.cvv && <small className="text-danger">{errors.cvv}</small>}
        </div>
      </div>

      <h5>Billing Address</h5>
      <div className="mb-3">
        <label>Street</label>
        <input type="text" className="form-control" value={street} onChange={e => setStreet(e.target.value)} />
        {errors.street && <small className="text-danger">{errors.street}</small>}
      </div>

      <div className="row">
        <div className="col mb-3">
          <label>City</label>
          <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} />
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>
        <div className="col mb-3">
          <label>State</label>
          <input type="text" className="form-control" value={state} onChange={e => setState(e.target.value)} />
          {errors.state && <small className="text-danger">{errors.state}</small>}
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label>ZIP</label>
          <input type="text" className="form-control" value={zip} onChange={e => setZip(e.target.value)} />
          {errors.zip && <small className="text-danger">{errors.zip}</small>}
        </div>
        <div className="col mb-3">
          <label>Phone</label>
          <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>
      </div>

      <button type="submit" className="btn btn-warning mt-3">Confirm Payment</button>
    </form>
  );
};

export default PaymentForm;
