// src/components/MainPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantCard from "./RestaurantCard";

const MainPage = () => {
  const [search, setSearch] = useState("");

  const restaurants = [
    { id: 1, name: "Pizza Palace", address: "123 Main St", image: "/images/pizza.jpg" },
    { id: 2, name: "Burger Hub", address: "456 Market St", image: "/images/burger.jpg" },
    { id: 3, name: "Sushi World", address: "789 Ocean Ave", image: "/images/sushi.jpg" },
    { id: 4, name: "Taco Town", address: "321 Elm St", image: "/images/taco.jpg" },
  ];

  const filteredRestaurants = restaurants.filter((res) =>
    res.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="main-page-container"
      style={{
        backgroundImage: "url('/food-bg.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top bar with login */}
      <div className="d-flex justify-content-end align-items-center p-3">
        <button className="btn btn-primary">Login</button>
      </div>

      {/* Logo normal size, centered */}
      <div className="text-center my-4">
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ height: "100px" }} // normal height
        />
      </div>

      {/* Search Bar */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="form-control w-50 mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Restaurant Grid */}
      <div className="container">
        <div className="row">
          {filteredRestaurants.map((restaurant) => (
            <div className="col-md-3 mb-4" key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
