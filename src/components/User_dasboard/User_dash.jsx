import React, { useState } from "react";
import "./User_dash.css";
import { Link, useNavigate } from "react-router-dom";

function User() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const formData = { from, to, date: formattedDate, passengerCount };
    setFrom("");
    setTo("");
    setDate("");
    setPassengerCount("");
    navigate("/show_rides", { state: formData });
  }

  return (
    <div className="user-dash-main">
      <div className="user-dash-nav">
        <div className="user-dash-wrapper1">
        <Link to="/user-dashboard" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img className="user-dash-logo" src="/logo.png" alt="User Logo" />
</Link>

          <div className="user-dash-feature-item">Home</div>
          <div className="user-dash-feature-item">Messages</div>
          <div className="user-dash-feature-item">Calendar</div>
          <div className="user-dash-feature-item">Notifications</div>
        </div>

        <div className="user-dash-wrapper2">
          <div className="user-dash-help">Help</div>
          <Link to="/driver_dash" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="user-dash-switch-driver">Switch to Driver</div>
          </Link>
          <div className="user-dash-profile">Profile</div>
        </div>
      </div>

      <div className="user-dash-content">
        <div className="user-dash-heading">
          <h1>
            Welcome Back! Travel to thousands of destinations at low prices
          </h1>
        </div>

        <form className="user-dash-input-field" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Leaving from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Going to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="No of passengers"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
          />
          <button type="submit" className="user-dash-search">
            Search
          </button>
        </form>

        <div className="user-dash-context">
          <div className="user-dash-cont1">
            <h3>Travel at low prices</h3>
            <p>
              Wherever you’re going, there’s a carpool that will get you there
              for less.
            </p>
          </div>
          <div className="user-dash-cont2">
            <h3>Trustworthy and simple</h3>
            <p>
              We check reviews, profiles and IDs, so you know who you’re
              travelling with; and our app is both simple and secure thanks to
              powerful technology.
            </p>
          </div>
          <div className="user-dash-cont3">
            <h3>Proximity makes it easier</h3>
            <p>
              Wherever you’re going, there’s a carpool that will get you there
              for less.
            </p>
          </div>
        </div>

        <div className="user-dash-drive">
          <h2>Where do you want to drive to?</h2>
          <p>
            Sharing a carpool is a great way to travel. It's affordable,
            comfortable and eco-friendly! If you're driving with an empty car,
            consider publishing a carpool ride to save costs and travel with
            some company.
          </p>
          <Link
            to="/driver_dash"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="user-dash-offerride">Offer Ride</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default User;
