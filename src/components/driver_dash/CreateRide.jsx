import React, { useState, useEffect } from "react";
import "./CreateRide.css";
import { X, Calendar, MapPin, Users, DollarSign, Car } from "lucide-react";

function CreateRide({ onClose, onAddRide }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    time: "",
    seats: "",  // Keep as string for input handling
    price: "",
    driver_id: parseInt(localStorage.getItem("UserId") || "0", 10),
    rider_ids: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "seats" || name === "price") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAnimateOut(true);

    const formattedTime = new Date(formData.time).toISOString().split("T")[0];

    const updatedFormData = {
      ...formData,
      time: formattedTime,
      seats: parseInt(formData.seats, 10),
      price: parseInt(formData.price, 10),
    };

    try {
      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create ride: ${errorText}`);
      }

      const data = await response.json();
      console.log("Ride created successfully:", data);

      if (onAddRide) {
        onAddRide(updatedFormData);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      alert("There was an error publishing your ride. Please try again.");
    }
  };

  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animateOut, onClose]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setAnimateOut(true);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setAnimateOut(true);
    }
  };

  return (
    <div
      className={`cr-modal ${animateOut ? "cr-modal-exit" : "cr-modal-enter"}`}
      onClick={handleBackdropClick}
    >
      <div className="cr-modal-content">
        <button className="cr-close-button" onClick={() => setAnimateOut(true)}>
          <X size={24} />
        </button>

        <div className="cr-header">
          <div className="cr-header-icon">
            <Car size={28} />
          </div>
          <h2 className="cr-title">Create a Ride</h2>
          <p className="cr-subtitle">Share your journey and connect with travelers</p>
        </div>

        <form className="cr-form" onSubmit={handleSubmit}>
          <div className="cr-form-group">
            <label className="cr-label">
              <MapPin size={18} className="cr-input-icon" />
              <span>Starting Point</span>
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter city or location"
              className="cr-input"
              required
            />
          </div>

          <div className="cr-form-group">
            <label className="cr-label">
              <MapPin size={18} className="cr-input-icon" />
              <span>Destination</span>
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter destination city"
              className="cr-input"
              required
            />
          </div>

          <div className="cr-form-group">
            <label className="cr-label">
              <Calendar size={18} className="cr-input-icon" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="cr-input"
              required
            />
          </div>

          <div className="cr-form-row">
            <div className="cr-form-group">
              <label className="cr-label">
                <Users size={18} className="cr-input-icon" />
                <span>Available Seats</span>
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="Enter between 2-6"
                className="cr-input"
                required
              />
            </div>

            <div className="cr-form-group">
              <label className="cr-label">
                <DollarSign size={18} className="cr-input-icon" />
                <span>Price per Seat</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                placeholder="Enter your price"
                className="cr-input"
                required
              />
            </div>
          </div>

          <div className="cr-button-group">
            <button type="submit" className="cr-submit-button" disabled={submitted}>
              <Car size={18} />
              <span>Publish Ride</span>
            </button>
            <button
              type="button"
              className="cr-cancel-button"
              onClick={() => setAnimateOut(true)}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="cr-footer"></div>
      </div>
    </div>
  );
}

export default CreateRide;
