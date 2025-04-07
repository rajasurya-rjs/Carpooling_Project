import React, { useState } from "react";
import "./CreateRide.css";

function CreateRide({ onClose }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    time: "",
    seats: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert time to yyyy-mm-dd format
    const formattedTime = new Date(formData.time).toISOString().split("T")[0];
    const updatedFormData = { ...formData, time: formattedTime };

    try {
      const response = await fetch(
        "http://localhost:8080/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create ride");
      }

      const data = await response.json();
      console.log("Ride created successfully:", data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className="create-ride-modal">
      <div className="create-ride-form-container">
        <button className="create-ride-close-icon" onClick={onClose}>
          ✖
        </button>
        <h2>Create a Ride</h2>
        <form className="create-ride-ride-form" onSubmit={handleSubmit}>
          <div className="create-ride-form-group">
            <label>From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter starting point"
            />
          </div>
          <div className="create-ride-form-group">
            <label>To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter destination"
            />
          </div>
          <div className="create-ride-form-group">
            <label>Date</label>
            <input
              type="date"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="create-ride-form-group">
            <label>Available Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              min="1"
              max="8"
              placeholder="Number of seats"
            />
          </div>
          <div className="create-ride-form-group">
            <label>Price Per Passenger ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              placeholder="Enter price"
            />
          </div>
          <button type="submit" className="create-ride-submit-button" onClick={onClose}>
            🚗 Create Ride
          </button>
          <button
            type="button"
            className="create-ride-close-button"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRide;
