import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css"; // if you want custom hover effects

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/customer-menu", { state: { restaurant } });
  };

  return (
    <div
      className="card restaurant-card h-100"
      onClick={handleClick}
      style={{ cursor: "pointer", overflow: "hidden" }}
    >
      <img
        src={restaurant.image}
        className="card-img-top"
        alt={restaurant.name}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{restaurant.name}</h5>
        <p className="card-text">{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
