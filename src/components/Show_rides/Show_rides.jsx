import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ShowRides() {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [rides, setRides] = useState([g]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080?from=${from}&to=${to}&date=${date}`);
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    }
    if (from && to && date) {
      fetchData();
    }
  }, [from, to, date]);

  return (
    <div>
      <h2>Available Rides</h2>
      {rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <ul>
          {rides.map((ride, index) => (
            <li key={index}>
              <strong>From:</strong> {ride.from} | <strong>To:</strong> {ride.to} | <strong>Date:</strong> {ride.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowRides;
