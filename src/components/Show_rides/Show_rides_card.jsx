import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Phone } from "lucide-react";
import UserNavbar from "../User_dasboard/UserNavbar";
import "./Show_rides_card.css";

function Show_rides_card() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    if (!userId) {
      alert("Please complete your user profile first.");
      navigate("/UserProfile");
      return;
    }

    async function fetchDriverDetails() {
      try {
        const response = await fetch(`http://localhost:8080/getUser?id=${ride.driver_id}`);
        if (!response.ok) throw new Error("Failed to fetch driver details");
        const data = await response.json();
        setDriver(data);
      } catch (err) {
        console.error("Error fetching driver data:", err);
        setError("Unable to fetch driver details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (ride?.driver_id) {
      fetchDriverDetails();
    } else {
      setLoading(false);
    }
  }, [ride, userId, navigate]);

  const handleBookRide = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/addRider?rideId=${ride.id}&riderId=${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Booking failed.");
      }

      alert("Ride booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book ride. Please try again.");
    }
  };

  if (!ride) {
    return (
      <div className="no-data">
        <h2>No ride data found</h2>
        <button onClick={() => navigate("/showrides")}>Back to rides</button>
      </div>
    );
  }

  return (<>
    <UserNavbar />
    <div className="ride-card-wrapper">

      <div className="ride-card-container">
        <h2>Ride Details</h2>

        <div className="ride-info">
          <div className="info-block"><Calendar className="icon" /><strong>Date:</strong> {ride.time}</div>
          <div className="info-block"><strong>Duration:</strong> {ride.duration || "6h10"}</div>
          <div className="info-block"><strong>Price:</strong> ₹{ride.price}</div>
          <div className="info-block"><MapPin className="icon" /><strong>From:</strong> {ride.from}</div>
          <div className="info-block"><MapPin className="icon" /><strong>To:</strong> {ride.to}</div>
        </div>

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

            <h4>Contact Driver:</h4>
            <Phone className="icon" /> <strong>Phone:</strong> {driver.phone}
          </div>
        ) : (
          <p>Driver info not available</p>
        )}

        <button className="book-btn" onClick={handleBookRide}>
          Book Ride
        </button>

        <button className="go-back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>

  </>
      );
}

export default Show_rides_card;
