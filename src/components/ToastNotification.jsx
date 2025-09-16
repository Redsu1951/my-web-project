// src/components/ToastNotification.jsx
import React from "react";

const ToastNotification = ({ message, type, visible }) => {
  return visible ? (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: type === "success" ? "green" : "red",
        color: "#fff",
        borderRadius: "5px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
        zIndex: 1001,
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  ) : null;
};

export default ToastNotification;
