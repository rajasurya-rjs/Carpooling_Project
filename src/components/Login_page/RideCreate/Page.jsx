import React from 'react';
import './Page.css';
import { Link } from 'react-router-dom';

function Page() {
  return (
    <div className="ride-create-page-wrapper">
      <h1 className="ride-create-main-heading">Create Your Ride !!!</h1>
      <p className="ride-create-heading-p">Share your journey with others! </p>
      <div className="ride-create-content-container">
        <div className="ride-create-form-container">
          <h2>Create a Ride</h2>
          <form className="ride-create-ride-form">
            <div className="ride-create-form-group">
              <label>From</label>
              <input type="text" placeholder="Enter starting point" />
            </div>
            <div className="ride-create-form-group">
              <label>To</label>
              <input type="text" placeholder="Enter destination" />
            </div>
            <div className="ride-create-form-group">
              <label>Date</label>
              <input type="date" />
            </div>
            <div className="ride-create-form-group">
              <label>Time</label>
              <input type="time" />
            </div>
            <div className="ride-create-form-group">
              <label>Available Seats</label>
              <input type="number" min="1" max="8" placeholder="Number of seats" />
            </div>
            <div className="ride-create-form-group">
              <label>Price Per Passenger ($)</label>
              <input type="number" min="1" placeholder="Enter price" />
            </div>
            <button type="submit" className="ride-create-submit-button">🚗 Create Ride</button>
          </form>
        </div>
        <div className="ride-create-extra-content">
          <h2>Why Carpool?</h2>
          <p>Save money, reduce traffic, and help the environment by sharing your ride with others.</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
