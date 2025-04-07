import React, { useEffect } from "react";
import "./Driver.css";
import { Link } from "react-router-dom";
import UpcomingRideList from "./UpcomingRideList";

function Driver() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

  return (
    <div className="driver-main-container">
      <div className="driver-nav-container">
        <div className="wrapper1">
          <div className="driver-nav-title">Logo</div>
          <div className="driver-nav-buttons">Home</div>
          <div className="driver-nav-buttons">My Rides</div>
          <div className="driver-nav-buttons">Calendar</div>
          <div className="driver-nav-buttons">Notifications</div>
        </div>

        <div className="wrapper2">
          <div className="help">Help</div>
          <Link
            to="/user-dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="driver-switch-user">Switch to User</div>
          </Link>
          <div className="profile">Profile</div>
        </div>
      </div>

      <div className="driver-content">
        <div className="heading">
          <h1>Welcome Back, Driver! Manage your rides with ease.</h1>
        </div>
        <div className="input-filed" style={{display :"flex",justifyContent: "center"}}>
          <Link
            to="/crete-ride"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="driver-publish-btn" >🚗 Publish a Ride</button>
          </Link>
        </div>
        <UpcomingRideList />
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
  );
}

export default Driver;

