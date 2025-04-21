import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import "./UserdashMyrides.css";

const UserdashMyrides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const userId = parseInt(localStorage.getItem("UserId"));
        const response = await fetch(`http://localhost:8080/user/rides?id=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch rides");
        const data = await response.json();
        setRides(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError("Unable to fetch your rides. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="myrides-main">
      <h2 className="myrides-title">My Booked Rides</h2>

      {loading ? (
        <div className="myrides-loading">
          <div className="myrides-spinner"></div>
          <p>Loading your rides...</p>
        </div>
      ) : error ? (
        <div className="myrides-error">
          <h3>Oops!</h3>
          <p>{error}</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="myrides-empty">
          <h3>No Rides Found</h3>
          <p>You haven’t booked any rides yet.</p>
        </div>
      ) : (
        <div className="myrides-content">
          {rides.map((ride, index) => (
            <div
              key={index}
              className="myrides-card"
              onClick={() => navigate("/userdashcard", { state: { ride } })}
              style={{ cursor: "pointer" }}
            >
              <div className="myrides-card-header">
                <h3>Ride Details</h3>
              </div>

              <div className="myrides-card-content">
                <div className="myrides-location-container">
                  <div className="myrides-location-point">
                    <MapPin className="myrides-location-icon from-icon" />
                    <div className="myrides-location-details">
                      <span className="myrides-location-label">From</span>
                      <p className="myrides-location-value">{ride.from}</p>
                    </div>
                  </div>

                  <div className="myrides-route-connector">
                    <div className="myrides-route-line"></div>
                  </div>

                  <div className="myrides-location-point">
                    <MapPin className="myrides-location-icon to-icon" />
                    <div className="myrides-location-details">
                      <span className="myrides-location-label">To</span>
                      <p className="myrides-location-value">{ride.to}</p>
                    </div>
                  </div>
                </div>

                <div className="myrides-time-container">
                  <Calendar className="myrides-time-icon" />
                  <div className="myrides-time-details">
                    <span className="myrides-time-label">Date & Time</span>
                    <p className="myrides-time-value">{ride.time}</p>
                  </div>
                </div>

                <div className="myrides-price-container">
                  <span className="myrides-price-label">Price</span>
                  <p className="myrides-price-value">₹{ride.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserdashMyrides;
