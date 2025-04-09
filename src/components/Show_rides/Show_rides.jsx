import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Show_rides.css";

function ShowRides() {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [rides, setRides] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(true); // Add a loading state to handle transitions

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(`http://localhost:8080/rides/filter?from=${from}&to=${to}&date=${date}`);
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Error fetching rides:", error);
        setError("Unable to fetch rides. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    }
    if (from && to && date) {
      fetchData();
    } else {
      setLoading(false); // No data to fetch, stop loading
    }
  }, [from, to, date]);

  return (
    <div className="show-rides-main">
      <h2 className="show-rides-title">Available Rides</h2>
      {loading ? (
        <p className="loading-message">Loading rides...</p>
      ) : error ? (
        <p>{error}</p>
      ) : rides.length === 0 ? (
        <p className="no-rides-message">No rides available at the moment. Please check back later.</p>
      ) : (
        <div className="show-rides-content">
          {rides.map((ride, index) => (
            <div key={index} className="show-rides-card">
              <h3>Ride Details</h3>
              <p><strong>From:</strong> {ride.from}</p>
              <p><strong>To:</strong> {ride.to}</p>
              <p><strong>Date:</strong> {ride.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowRides;
