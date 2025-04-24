import React, { useState, useEffect } from "react";
import "./User_dash.css";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function User() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRidesForNotification = async () => {
      const userID = localStorage.getItem("UserId");
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const formattedToday = today.toISOString().split("T")[0];
      const formattedTomorrow = tomorrow.toISOString().split("T")[0];

      try {
        const response = await fetch(
          `http://localhost:8080/user/rides?id=${userID}`
        );
        if (!response.ok) throw new Error("Failed to fetch rides");
        const data = await response.json();

        const upcomingRides = data.filter(
          (ride) => ride.time === formattedTomorrow || ride.time === formattedToday
        );

        if (upcomingRides.length > 0) {
          const ride = upcomingRides[0]; // Show the first upcoming ride
          const message = `You have a ride scheduled ${
            ride.time === formattedTomorrow ? "tomorrow" : "today"
          } from ${ride.from} to ${ride.to}.`;

          // Check if the notification has already been shown
          const notificationKey = `notification_shown_${ride.time}`;
          if (!localStorage.getItem(notificationKey)) {
            setNotification(message);
            localStorage.setItem(notificationKey, "true"); // Mark as shown
          }
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRidesForNotification(); // Initial fetch
    const interval = setInterval(fetchRidesForNotification, 5000); // Run every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

  function closeNotification() {
    setNotification(null);
  }


  return (
    <div className="user-dash-main">
      <UserNavbar />
      <div className="user-dash-content">
        {notification && (
          <div className="user-dash-notification">
            <button className="close-btn" onClick={closeNotification}>&times;</button>
            <p>{notification}</p>
          </div>
        )}

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
            <p>Wherever you’re going, there’s a carpool that will get you there for less.</p>
          </div>
          <div className="user-dash-cont2">
            <h3>Trustworthy and simple</h3>
            <p>We check reviews, profiles and IDs, so you know who you’re travelling with.</p>
          </div>
          <div className="user-dash-cont3">
            <h3>Proximity makes it easier</h3>
            <p>Choose your exact pick-up and drop-off locations for the perfect ride.</p>
          </div>
        </div>

        <div className="user-dash-drive">
          <h2>Where do you want to drive to?</h2>
          <p>
            Sharing a carpool is a great way to travel. It's affordable, comfortable
            and eco-friendly! If you're driving with an empty car, consider publishing
            a carpool ride to save costs and travel with some company.
          </p>
          <Link to="/driver-dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            <button className="user-dash-offerride">Offer Ride</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default User;
