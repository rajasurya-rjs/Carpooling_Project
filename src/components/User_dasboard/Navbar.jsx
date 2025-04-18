import React from "react";
import { Link } from "react-router-dom";
import "./Navbarr.css";

function Navbar() {
  return (
    <div className="user-dash-nav">
      <div className="user-dash-wrapper1">
        <Link
          to="/user-dashboard"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img className="user-dash-logo" src="/logo.png" alt="User Logo" />
        </Link>

        <Link
          to="/user-dashboard"
          className="user-dash-feature-item no-underline"
        >
          Home
        </Link>
        <div className="user-dash-feature-item">Messages</div>
        <div className="user-dash-feature-item">Calendar</div>
        <div className="user-dash-feature-item">Notifications</div>
      </div>

      <div className="user-dash-wrapper2">
        <div className="user-dash-help">Help</div>
        <Link
          to="/driver_dash"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="user-switch-driver">Switch to Driver</div>
        </Link>
        <Link
          to="/user-dashboard/profile"
          className="user-dash-profile no-underline"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
