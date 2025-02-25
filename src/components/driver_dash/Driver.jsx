import React from "react";
import { Car, User } from "lucide-react";
import UpcomingRideList from "./UpcomingRideList";
import { Link } from "react-router-dom";
import "./Driver.css";


function Driver() {
  return (
    <div className="main-container">
      <nav className="nav-container">
        <h1 className="nav-title">Carpooling</h1>
        <div className="nav-buttons">
          <button className="publish-btn">
            <Car size={20} />
            <span>
            <Link to="/crete-ride" style={{ textDecoration: "none", color: "inherit" }}>
  Publish a ride
</Link>

            </span>
          </button>
          <button className="switch-btn">
            <User size={20} />
            <span>
            <Link to="/user-dashboard" style={{ textDecoration: "none", color: "inherit" }}>
  Switch to User
</Link>

            </span>
          </button>
        </div>
      </nav>
      <main className="content-container">
        <UpcomingRideList />
      </main>
    </div>
  );
}

export default Driver;