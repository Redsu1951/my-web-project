// src/components/RestaurantDashboard.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const RestaurantDashboard = () => {
  const navigate = useNavigate();

  // --- Hardcoded Order Queue ---
  const [pendingOrders, setPendingOrders] = useState([
    { id: 1, customer: "John Doe", items: ["Burger", "Fries"] },
    { id: 2, customer: "Alice Smith", items: ["Pizza", "Coke"] },
  ]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  // --- Hardcoded Menu ---
  const [menu, setMenu] = useState([
    { id: 1, name: "Burger", price: 8.99, availability: "Available" },
    { id: 2, name: "Pizza", price: 12.5, availability: "Unavailable" },
    { id: 3, name: "Fries", price: 3.5, availability: "Available" },
  ]);

  // --- Hardcoded Opening Hours ---
  const [hours, setHours] = useState({
    Monday: "9:00 AM - 9:00 PM",
    Tuesday: "9:00 AM - 9:00 PM",
    Wednesday: "9:00 AM - 9:00 PM",
    Thursday: "9:00 AM - 9:00 PM",
    Friday: "9:00 AM - 11:00 PM",
    Saturday: "10:00 AM - 11:00 PM",
    Sunday: "10:00 AM - 8:00 PM",
  });

  // --- Hardcoded Contact Info ---
  const [contact, setContact] = useState({
    phone: "1234567890",
    email: "restaurant@example.com",
    address: "123 Main St, City, State",
    contactPerson: "Alice Manager",
  });

  const [activeTab, setActiveTab] = useState("menu");

  // --- Handlers ---
  const handleChangePassword = () => {
    const current = prompt("Enter current password:");
    const newPass = prompt("Enter new password:");
    const confirmPass = prompt("Confirm new password:");
    if (newPass && newPass === confirmPass) alert("Password changed successfully!");
    else alert("Passwords do not match. Try again.");
  };

  const handleLogout = () => navigate("/");

  const handleAcceptOrder = (order, eta) => {
    setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
    setAcceptedOrders([...acceptedOrders, { ...order, eta: eta || "30 min" }]);
  };

  const handleAddMenuItem = () => {
    const name = prompt("Enter food name:");
    const price = parseFloat(prompt("Enter price:"));
    const availability = prompt("Availability (Available/Unavailable):", "Available");
    if (name && !isNaN(price)) setMenu([...menu, { id: menu.length + 1, name, price, availability }]);
  };

  const handleEditMenuItem = (item) => {
    const name = prompt("Edit name:", item.name) || item.name;
    const price = parseFloat(prompt("Edit price:", item.price)) || item.price;
    const availability = prompt("Edit availability:", item.availability) || item.availability;
    setMenu(menu.map((m) => (m.id === item.id ? { ...m, name, price, availability } : m)));
  };

  const handleDeleteMenuItem = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) setMenu(menu.filter((m) => m.id !== item.id));
  };

  const handleUpdateContact = () => {
    const phone = prompt("Phone:", contact.phone) || contact.phone;
    const email = prompt("Email:", contact.email) || contact.email;
    const address = prompt("Address:", contact.address) || contact.address;
    const contactPerson = prompt("Contact Person:", contact.contactPerson) || contact.contactPerson;
    setContact({ phone, email, address, contactPerson });
  };

  const handleUpdateHours = (day) => {
    const newHours = prompt(`Hours for ${day}:`, hours[day]) || hours[day];
    setHours({ ...hours, [day]: newHours });
  };

  const handleWithdraw = () => {
    if (window.confirm("Are you sure you want to withdraw from FrontDash?"))
      alert("Withdrawal request sent to FrontDash!");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-end mb-2">
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="light" id="profile-dropdown" className="rounded-circle border">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setActiveTab("menu")}>Menu</Dropdown.Item>
            <Dropdown.Item onClick={() => setActiveTab("hours")}>Opening Hours</Dropdown.Item>
            <Dropdown.Item onClick={() => setActiveTab("contact")}>Contact Info</Dropdown.Item>
            <Dropdown.Item onClick={() => setActiveTab("withdraw")} className="text-danger">Withdraw</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleChangePassword}>Change Password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="row">
        {/* Main Dashboard Area */}
        <div className="col-md-9">
          <h2 className="mb-4 text-center">Restaurant Dashboard</h2>

          <div className="card p-4">
            {activeTab === "menu" && (
              <div>
                <h5>Menu Items</h5>
                <button className="btn btn-success mb-2" onClick={handleAddMenuItem}>Add Item</button>
                <ul className="list-group">
                  {menu.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name} - ${item.price} ({item.availability})</span>
                      <div>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditMenuItem(item)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMenuItem(item)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "hours" && (
              <div>
                <h5>Opening Hours</h5>
                <ul className="list-group">
                  {Object.entries(hours).map(([day, time]) => (
                    <li key={day} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{day}: {time}</span>
                      <button className="btn btn-sm btn-primary" onClick={() => handleUpdateHours(day)}>Edit</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "contact" && (
              <div>
                <h5>Contact Information</h5>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Address:</strong> {contact.address}</p>
                <p><strong>Contact Person:</strong> {contact.contactPerson}</p>
                <button className="btn btn-primary" onClick={handleUpdateContact}>Edit Contact Info</button>
              </div>
            )}

            {activeTab === "withdraw" && (
              <div className="text-center">
                <h5>Withdraw from FrontDash</h5>
                <button className="btn btn-danger mt-3" onClick={handleWithdraw}>Withdraw</button>
              </div>
            )}
          </div>
        </div>

        {/* Order Queue Sidebar */}
        <div className="col-md-3">
          <h5 className="mb-3">Order Queue</h5>
          <div className="card mb-3 p-2" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {pendingOrders.length === 0 ? (
              <p className="text-muted">No pending orders.</p>
            ) : (
              pendingOrders.map((order) => (
                <div key={order.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div>
                    <strong>{order.customer}</strong><br />
                    Items: {order.items.join(", ")}
                  </div>
                  <div className="d-flex align-items-center">
                    <select className="form-select me-2" style={{ width: "100px" }} defaultValue="30 min" id={`eta-${order.id}`}>
                      <option value="15 min">15 min</option>
                      <option value="30 min">30 min</option>
                      <option value="45 min">45 min</option>
                      <option value="1 hour">1 hour</option>
                    </select>
                    <button className="btn btn-success btn-sm" onClick={() => {
                      const eta = document.getElementById(`eta-${order.id}`).value;
                      handleAcceptOrder(order, eta);
                    }}>Accept</button>
                  </div>
                </div>
              ))
            )}

            {acceptedOrders.length > 0 && (
              <>
                <hr />
                <h6>Accepted Orders</h6>
                {acceptedOrders.map((order) => (
                  <div key={order.id} className="border-bottom py-2">
                    <strong>{order.customer}</strong> <br />
                    ETA: <span className="fw-bold">{order.eta}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
