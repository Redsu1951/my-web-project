// src/components/MainPage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // SPA navigation

const MainPage = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row text-center w-100">
        <h1 className="mb-5">Welcome to FrontDash</h1>

        {/* Restaurant */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h3 className="card-title mb-3">Restaurant</h3>
              <p className="card-text">Manage your menu, hours, and orders.</p>
              <div className="d-flex justify-content-around mt-auto">
                <Link to="/restaurant-dashboard" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/restaurant-register" className="btn btn-outline-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Admin */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h3 className="card-title mb-3">Admin</h3>
              <p className="card-text">Approve restaurants, manage staff and drivers.</p>
              <div className="d-flex justify-content-around mt-auto">
                <Link to="/admin-dashboard" className="btn btn-success">
                  Login
                </Link>
                {/* Usually admin register is handled internally */}
              </div>
            </div>
          </div>
        </div>

        {/* Customer */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h3 className="card-title mb-3">Customer</h3>
              <p className="card-text">Order food from your favorite restaurants.</p>
              <div className="d-flex justify-content-around mt-auto">
                <Link to="/customer-login" className="btn btn-warning">
                  Login
                </Link>
                <Link to="/customer-register" className="btn btn-outline-warning">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainPage;
