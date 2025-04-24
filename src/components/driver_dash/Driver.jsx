import React, { useEffect, useState } from "react";
import "./Driver.css";
import { Link } from "react-router-dom";
import { Car, Calendar, MapPin, Clock, Users, DollarSign, Shield, Award } from "lucide-react";
import UpcomingRideList from "./UpcomingRideList";
import CreateRide from "./CreateRide";

function Driver() {
  const [showCreateRide, setShowCreateRide] = useState(false);
  const [upcomingRides, setUpcomingRides] = useState([]);

  const handlePublishRideClick = () => {
    setShowCreateRide(true);
  };

  const handleCloseCreateRide = () => {
    setShowCreateRide(false);
  };

  const handleAddRide = (newRide) => {
    setUpcomingRides((prevRides) => [...prevRides, newRide]);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

  return (
    <div className="driver-page">
      <div
        className={`driver-main-container ${
          showCreateRide ? "driver-blur-background" : ""
        }`}
      >
        <div className="driver-hero-section">
          <div className="driver-content">
            <div className="driver-heading">
              <h1 className="driver-title">Welcome Back! Share your ride and earn money</h1>
              <p className="driver-subtitle">Join thousands of drivers who are making extra income while traveling</p>
            </div>
            
            <div className="driver-publish-wrapper">
              <button
                className="driver-publish-btn"
                onClick={handlePublishRideClick}
              >
                <Car className="driver-icon" size={20} />
                <span>Publish a Ride</span>
              </button>
            </div>
            
            <div className="driver-rides-section">
              <UpcomingRideList rides={upcomingRides} />
            </div>
            
            <div className="driver-benefits">
              <div className="driver-benefit-card driver-card-1">
                <div className="driver-benefit-icon">
                  <DollarSign size={28} />
                </div>
                <h3>Earn while you drive</h3>
                <p>Fill your empty seats and make extra money while traveling.</p>
              </div>
              
              <div className="driver-benefit-card driver-card-2">
                <div className="driver-benefit-icon">
                  <Calendar size={28} />
                </div>
                <h3>Flexible and convenient</h3>
                <p>Set your own schedule and choose who joins your ride.</p>
              </div>
              
              <div className="driver-benefit-card driver-card-3">
                <div className="driver-benefit-icon">
                  <Shield size={28} />
                </div>
                <h3>Safe and trusted</h3>
                <p>
                  We verify users and provide secure payments for a hassle-free
                  experience.
                </p>
              </div>
            </div>
            
            <div className="driver-how-it-works">
              <h2 className="driver-section-title">How It Works</h2>
              <div className="driver-steps">
                <div className="driver-step">
                  <div className="driver-step-number">1</div>
                  <h3>Create Your Ride</h3>
                  <p>Set your destination, date, time, and available seats</p>
                </div>
                <div className="driver-step">
                  <div className="driver-step-number">2</div>
                  <h3>Approve Passengers</h3>
                  <p>Review requests and choose who joins your journey</p>
                </div>
                <div className="driver-step">
                  <div className="driver-step-number">3</div>
                  <h3>Drive & Earn</h3>
                  <p>Enjoy the company and receive payment after the trip</p>
                </div>
              </div>
            </div>
            
            <div className="driver-stats">
              <div className="driver-stat-item">
                <span className="driver-stat-number">3000+</span>
                <span className="driver-stat-label">Active Drivers</span>
              </div>
              <div className="driver-stat-item">
                <span className="driver-stat-number">10000+</span>
                <span className="driver-stat-label">Rides Completed</span>
              </div>
              <div className="driver-stat-item">
                <span className="driver-stat-number">
                ₹30000</span>
                <span className="driver-stat-label">Avg. Monthly Earnings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreateRide && (
        <CreateRide
          onClose={handleCloseCreateRide}
          onAddRide={(newRide) => {
            handleAddRide(newRide);
            setShowCreateRide(false); // Close the popup after adding the ride
          }}
        />
      )}
    </div>
  );
}

export default Driver;