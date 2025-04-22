import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./UserNavbar.css"

function UserNavbar({isSignIn}) {
  return (
    <>
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
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="user-dash-feature-item">Home</div>
          </Link>
          
          {/* 👇 New link placeholder, replace '/new-route' with actual route */}
          <Link
            to="/user-dashboard/myrides"
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="user-dash-feature-item">My Rides</div>
          </Link>


          <Link
            to="/user-dashboard/notification"
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="user-dash-feature-item">Notifications</div>
          </Link>
        </div>

        <div className="user-dash-wrapper2">
          <Link
            to="/user-dashboard/help"
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="user-dash-help">Help</div>
          </Link>
          <Link
            to="/driver-dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="user-dash-switch-driver">Switch to Driver</div>
          </Link>
          <Link
            to="/user-dashboard/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="user-dash-profile">{isSignIn?'Sign in':'Profile'}</div>
          </Link>
        </div>
      </div>
    </>  
  )
}

export default UserNavbar