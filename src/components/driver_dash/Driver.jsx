import React, { useEffect, useState } from "react";
import "./Driver.css";
import { Link } from "react-router-dom";
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
          showCreateRide ? "blur-background" : ""
        }`}
      >
        <div className="driver-nav-container">
          <div className="wrapper1">
            <img
              className="user-dash-logo"
              src="/logo.png"
              alt="User Logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <Link
              to="/driver_dash"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="driver-nav-buttons">Home</div>
            </Link>
            <div className="driver-nav-buttons">My Rides</div>
            <Link to ="/notification"   style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="driver-nav-buttons">Notifications</div>
            </Link>
          </div>

          <div className="wrapper2">
            <Link to ="/help" style ={{textDecoration:"none", color:"inherit"}}>
            <div className="help">Help</div>
            </Link>
         
            <Link
              to="/user-dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="driver-switch-user">Switch to User</div>
            </Link>
            <Link to ="/DriverProfile" style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="profile">Profile</div>
            </Link>
          </div>
        </div>

        <div className="driver-content">
          <div className="heading">
            <div>
              <h1>Welcome Back! Share your ride and earn money</h1>
            </div>
          </div>
          <div
            className="input-filed"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="driver-publish-container">
              <button
                className="driver-publish-btn"
                onClick={handlePublishRideClick}
              >
                🚗 Publish a Ride
              </button>
            </div>
          </div>
          <UpcomingRideList rides={upcomingRides} />
          <div className="context">
            <div className="cont1">
              <h3>Earn while you drive</h3>
              <p>Fill your empty seats and make extra money while traveling.</p>
            </div>
            <div className="cont2">
              <h3>Flexible and convenient</h3>
              <p>Set your own schedule and choose who joins your ride.</p>
            </div>
            <div className="cont3">
              <h3>Safe and trusted</h3>
              <p>
                We verify users and provide secure payments for a hassle-free
                experience.
              </p>
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
