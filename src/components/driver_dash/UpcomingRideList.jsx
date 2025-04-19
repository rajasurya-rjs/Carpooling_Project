import React, { useEffect, useMemo, useState } from "react";
import { Car, User, Calendar } from "lucide-react";
import "./UpcomingRideList.css";

function UpcomingRideList() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const userId = parseInt(localStorage.getItem("UserId"), 10);
        if (!response.ok) console.error("User ID not found in local storage");

        const response = await fetch(
          `http://localhost:8080/driver/rides?id=${userId}`
        );
        if (!response.ok) console.error("Failed to fetch rides");

        const data = await response.json();
        setRides(data);
      } catch (err) {
        console.error("Error fetching rides:", err);

      } finally {
        setLoading(false);
      }
    };

    fetchRides();
    const interval = setInterval(fetchRides, 5000); // Fetch rides every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const sortedRides = useMemo(
    () => rides.sort((a, b) => new Date(a.date) - new Date(b.date)),
    [rides]
  );

  if (loading) {
    return <div className="loading-message">Loading upcoming rides...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="upcoming-ride-container">
      <h2 className="upcoming-ride-title">Upcoming Rides</h2>
      <div className="upcoming-ride-list">
        {sortedRides.length > 0 ? (
          sortedRides.map((ride) => (
            <div key={ride.id} className="upcoming-ride-card">
              <div className="upcoming-ride-content">
                <div className="upcoming-ride-details">
                  <div className="upcoming-ride-route">
                    <Car size={16} />
                    <span>
                      {ride.from} → {ride.to}
                    </span>
                  </div>
                  <div className="upcoming-ride-info">
                    <div className="upcoming-ride-date">
                      <Calendar size={16} />
                      <span>
                        {new Date(ride.date).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                    <div className="upcoming-ride-seats">
                      <User size={16} />
                      <span>{ride.seats} seats booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-rides-message">No upcoming rides available for you.</div>
        )}
      </div>
    </div>
  );
}

export default UpcomingRideList;
