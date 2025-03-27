import React from "react";
import "./Driver.css";
import { Link } from "react-router-dom";
import UpcomingRideList from "./UpcomingRideList";

function Driver() {
  return (
    <div className="main">
      <div className="nav">
        <div className="wrapper1">
          <div className="logo">Logo</div>
          <div className="feature-item">Home</div>
          <div className="feature-item">My Rides</div>
          <div className="feature-item">Calendar</div>
          <div className="feature-item">Notifications</div>
        </div>

        <div className="wrapper2">
          <div className="help">Help</div>
          <Link
            to="/user-dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="switch-user">Switch to User</div>
          </Link>
          <div className="profile">Profile</div>
        </div>
      </div>

      <div className="content">
        <div className="heading">
          <h1>Welcome Back, Driver! Manage your rides with ease.</h1>
        </div>
        <div className="input-filed" style={{display :"flex",justifyContent: "center"}}>
          <Link
            to="/crete-ride"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="publish-btn" >🚗 Publish a Ride</button>
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

