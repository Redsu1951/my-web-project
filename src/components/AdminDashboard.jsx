// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/admin.css'; // minimal CSS for purple theme

const AdminDashboard = () => {
  // Hardcoded data
  const [restaurantRequests, setRestaurantRequests] = useState([
    { name: 'Pasta Palace', status: 'Pending' },
    { name: 'Sushi World', status: 'Pending' },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { name: 'Burger Barn', status: 'Pending' },
  ]);

  const [staffList, setStaffList] = useState([
    { fullName: 'Alice Johnson', username: 'johnson01', password: 'auto1234' },
  ]);

  const [drivers, setDrivers] = useState(['John Driver']);

  // Handlers
  const handleApproveRestaurant = (index) => {
    const updated = [...restaurantRequests];
    updated[index].status = 'Approved';
    setRestaurantRequests(updated);
    alert(`${updated[index].name} approved`);
  };

  const handleDisapproveRestaurant = (index) => {
    const updated = [...restaurantRequests];
    updated[index].status = 'Disapproved';
    setRestaurantRequests(updated);
    alert(`${updated[index].name} disapproved`);
  };

  const handleApproveWithdrawal = (index) => {
    const updated = [...withdrawalRequests];
    updated[index].status = 'Approved';
    setWithdrawalRequests(updated);
    alert(`${updated[index].name} withdrawal approved`);
  };

  const handleDisapproveWithdrawal = (index) => {
    const updated = [...withdrawalRequests];
    updated[index].status = 'Disapproved';
    setWithdrawalRequests(updated);
    alert(`${updated[index].name} withdrawal disapproved`);
  };

  const handleAddStaff = () => {
    const fullName = prompt('Enter full name of staff:');
    const username = prompt('Enter username (lastname + two digits):');
    const password = `auto${Math.floor(Math.random() * 10000)}`;
    if (fullName && username) {
      setStaffList([...staffList, { fullName, username, password }]);
      alert(`Staff added: ${fullName}, username: ${username}`);
    }
  };

  const handleDeleteStaff = (index) => {
    const updated = [...staffList];
    const removed = updated.splice(index, 1);
    setStaffList(updated);
    alert(`Deleted staff: ${removed[0].fullName}`);
  };

  const handleHireDriver = () => {
    const driverName = prompt('Enter driver name:');
    if (driverName) {
      setDrivers([...drivers, driverName]);
      alert(`Driver hired: ${driverName}`);
    }
  };

  const handleFireDriver = (index) => {
    const updated = [...drivers];
    const removed = updated.splice(index, 1);
    setDrivers(updated);
    alert(`Driver fired: ${removed[0]}`);
  };

  const handleLogout = () => {
    alert('Logging out...');
    // Redirect to main page if needed
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4 text-purple">Admin Dashboard</h2>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Restaurant Registration Requests */}
      <div className="mb-4">
        <h4 className="text-purple">Restaurant Registration Requests</h4>
        <div className="row">
          {restaurantRequests.map((req, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card border-purple p-2">
                <h5>{req.name}</h5>
                <p>Status: {req.status}</p>
                {req.status === 'Pending' && (
                  <>
                    <button className="btn btn-purple me-2" onClick={() => handleApproveRestaurant(index)}>Approve</button>
                    <button className="btn btn-outline-purple" onClick={() => handleDisapproveRestaurant(index)}>Disapprove</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Withdrawal Requests */}
      <div className="mb-4">
        <h4 className="text-purple">Restaurant Withdrawal Requests</h4>
        <div className="row">
          {withdrawalRequests.map((req, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card border-purple p-2">
                <h5>{req.name}</h5>
                <p>Status: {req.status}</p>
                {req.status === 'Pending' && (
                  <>
                    <button className="btn btn-purple me-2" onClick={() => handleApproveWithdrawal(index)}>Approve</button>
                    <button className="btn btn-outline-purple" onClick={() => handleDisapproveWithdrawal(index)}>Disapprove</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Management */}
      <div className="mb-4">
        <h4 className="text-purple">Staff Management</h4>
        <button className="btn btn-purple mb-2" onClick={handleAddStaff}>Add Staff</button>
        <table className="table table-striped">
          <thead className="table-purple">
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, index) => (
              <tr key={index}>
                <td>{staff.fullName}</td>
                <td>{staff.username}</td>
                <td>{staff.password}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStaff(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Driver Management */}
      <div className="mb-4">
        <h4 className="text-purple">Driver Management</h4>
        <button className="btn btn-purple mb-2" onClick={handleHireDriver}>Hire Driver</button>
        <table className="table table-striped">
          <thead className="table-purple">
            <tr>
              <th>Driver Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleFireDriver(index)}>Fire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
