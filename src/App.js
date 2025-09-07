import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CustomerCartPage from './components/CustomerCartPage';
import CustomerMainPage from './components/CustomerMainPage';
import CustomerMenuPage from './components/CustomerMenuPage';
import CustomerPaymentPage from './components/CustomerPaymentPage';
import RestaurantDashboard from './components/RestaurantDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/customer-login" element={<CustomerMainPage />} />
        <Route path="/customer-menu" element={<CustomerMenuPage />} />
        <Route path="/customer-cart" element={<CustomerCartPage />} />
        <Route path="/customer-payment" element={<CustomerPaymentPage />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
