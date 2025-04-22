import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, User } from 'lucide-react';
import "./Show_rides.css";
import UserNavbar from "../User_dasboard/UserNavbar";
function ShowRides() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/rides/filter?from=${from}&to=${to}&date=${date}`);
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log(rides);
          setRides(data);
        } else {
          setRides([]);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
        setError("Unable to fetch rides. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    if (from && to && date) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [from, to, date]);

  return (
    <div className="show-rides-main">
      <UserNavbar />

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading available rides...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <h3>Oops!</h3>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h2 className="show-rides-title">Available Rides</h2>
          {rides.length === 0 ? (
            <div className="empty-state">
              <h3>No Rides Available</h3>
              <p>We couldn't find any rides matching your criteria. Try adjusting your search or check back later.</p>
            </div>
          ) : (
            <div className="show-rides-content">
              {rides.map((ride, index) => (
                <div
                  key={index}
                  className="show-rides-card"
                  onClick={() => navigate("/showridescard", { state: { ride } })}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-header">
                    <h3>Ride Details</h3>
                  </div>
                  <div className="card-content">
                    <div className="location-container">
                      <div className="location-point">
                        <MapPin className="location-icon from-icon" />
                        <div className="location-details">
                          <span className="location-label">From</span>
                          <p className="location-value">{ride.from}</p>
                        </div>
                      </div>

                      <div className="route-connector">
                        <div className="route-line"></div>
                      </div>

                      <div className="location-point">
                        <MapPin className="location-icon to-icon" />
                        <div className="location-details">
                          <span className="location-label">To</span>
                          <p className="location-value">{ride.to}</p>
                        </div>
                      </div>
                    </div>

                    <div className="time-container">
                      <Calendar className="time-icon" />
                      <div className="time-details">
                        <span className="time-label">Date & Time</span>
                        <p className="time-value">{ride.time}</p>
                      </div>
                    </div>

                    <div className="price-container">
                      <span className="price-label">Price</span>
                      <p className="price-value">₹{ride.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShowRides;
