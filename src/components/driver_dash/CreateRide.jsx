import React from 'react';
import './CreateRide.css';
import { Link } from 'react-router-dom';

function CreateRide() {
  return (
    <div className="page-wrapper">
      <div className="content-container">
        {/* Left: Ride Creation Form */}
        <div className="form-container">
          <h2>Create a Ride</h2>
          <form className="ride-form">
            <div className="form-group">
              <label>From</label>
              <input type="text" placeholder="Enter starting point" />
            </div>

            <div className="form-group">
              <label>To</label>
              <input type="text" placeholder="Enter destination" />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input type="time" />
            </div>

            <div className="form-group">
              <label>Available Seats</label>
              <input type="number" min="1" max="8" placeholder="Number of seats" />
            </div>

            <div className="form-group">
              <label>Price Per Passenger ($)</label>
              <input type="number" min="1" placeholder="Enter price" />
            </div>

            <button type="submit" className="submit-button">🚗 Create Ride</button>
          </form>
        </div>

        {/* Right: Extra Content (can be an image, text, or anything else) */}
        <div className="extra-content">
          <h2>Why Carpool?</h2>
          <p>Save money, reduce traffic, and help the environment by sharing your ride with others.</p>
        </div>
      </div>
    </div>
  );
}

export default CreateRide;