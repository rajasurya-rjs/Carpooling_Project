import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Phone } from "lucide-react";
import "./Show_rides_card.css";

function Show_rides_card() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {}; // Receiving ride data from the previous page

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching the driver details using the driver_id from the ride data
  useEffect(() => {
    async function fetchDriverDetails() {
 

      try {
        // First, fetch the ride details (which you already have) - we use it for the ride display
        const response = await fetch(`http://localhost:8080/getUser?id=${ride.driver_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch driver details");
        }

        const data = await response.json();
        setDriver(data); // Set the driver details
      } catch (err) {
        console.error("Error fetching driver data:", err);
        setError("Unable to fetch driver details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    // If ride data and driver_id exist, fetch driver details
    if (ride?.driver_id) {
      fetchDriverDetails();
    } else {
      setLoading(false);
    }
  }, [ride]);

  // If ride data is missing
  if (!ride) {
    return (
      <div className="no-data">
        <h2>No ride data found</h2>
        <button onClick={() => navigate("/showrides")}>Back to rides</button>
      </div>
    );
  }

  return (
    <div className="ride-card-wrapper">
      <div className="ride-card-container">
        <h2>Ride Details</h2>

        {/* Ride details section */}
        <div className="ride-info">
          <div className="info-block"><strong>Date:</strong> {ride.time}</div>
          <div className="info-block"><strong>Time:</strong> {ride.time}</div>
          <div className="info-block"><strong>Duration:</strong> {ride.duration || "6h10"}</div>
          <div className="info-block"><strong>Price:</strong> ₹{ride.price}</div>

          <div className="info-block">
            <MapPin className="icon" />
            <div><strong>From:</strong> {ride.from}</div>
          </div>

          <div className="info-block">
            <MapPin className="icon" />
            <div><strong>To:</strong> {ride.to}</div>
          </div>
        </div>

        {/* Driver details section */}
        {loading ? (
          <p>Loading driver details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : driver ? (
          <div className="driver-details">
            <h3>Driver: {driver.name}</h3>
            <p>⭐ {driver.age ? `${driver.age} years old` : "Age not available"}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
            <p><strong>Gender:</strong> {driver.gender}</p>
            <p><strong>Language:</strong> {driver.language}</p>
            <p><strong>Occupation:</strong> {driver.occupation}</p>
            <p><strong>Address:</strong> {driver.address}</p>

            <h4>Contact Driver:</h4>
            <Phone className="icon" /> <strong>Phone:</strong> {driver.phone}

          </div>
        ) : (
          <p>Driver info not available</p>
        )}

        <button className="go-back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}

export default Show_rides_card;
