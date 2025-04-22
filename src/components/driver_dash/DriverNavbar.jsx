import React from 'react'
import { Link } from 'react-router-dom'
import './DriverNavbar.css'
function DriverNavbar() {
  return (
    <div className="driver-nav-container">
        
      
    <div className="wrapper1">
    <Link to="/driver-dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      > <img
        className="user-dash-logo"
        src="/logo.png"
        alt="User Logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      /></Link>
      <Link
        to="/driver-dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="driver-nav-buttons">Home</div>
      </Link>
      <Link
        to="/driver-dashboard/message"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="driver-nav-buttons">Message</div>
      </Link>      <Link
        to="/driver-dashboard/notification"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="driver-nav-buttons">Notifications</div>
      </Link>
    </div>

    <div className="wrapper2">
      <Link
        to="/driver-dashboard/help"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="help">Help</div>
      </Link>

      <Link
        to="/user-dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="driver-switch-user">Switch to User</div>
      </Link>
      <Link
        to="/driver-dashboard/profile"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="profile">Profile</div>
      </Link>
    </div>
  </div>
  )
}

export default DriverNavbar