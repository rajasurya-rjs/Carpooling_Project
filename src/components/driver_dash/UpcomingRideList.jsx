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
        if (!userId) throw new Error("User ID not found in local storage");

        const response = await fetch(
          `http://localhost:8080/driver/rides?id=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch rides");

        const data = await response.json();
        setRides(data);
        setError(null); // Clear any previous error
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
    const interval = setInterval(fetchRides, 5000);
    return () => clearInterval(interval);
  }, []);

  const sortedRides = useMemo(() => {
    if (!rides.length) return [];
    return [...rides].sort((a, b) => new Date(a.time) - new Date(b.time));
  }, [rides]);

  if (loading) {
    return (
      <div className="loading-message" role="status">
        Loading upcoming rides...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-message" role="status">
        <h3>No upcoming rides available for you at the moment.</h3>
        <h3>Complete the user and driver profile to publish a ride.</h3>
      </div>
    );
  }

  return (
    <div className="upcoming-ride-container">
      <h2 className="upcoming-ride-title">Your Upcoming Rides</h2>
      <div className="upcoming-ride-list">
        {sortedRides.length > 0 ? (
          sortedRides.map((ride) => (
            <div key={ride.id} className="upcoming-ride-card">
              <div className="upcoming-ride-content">
                <div className="upcoming-ride-details">
                  <div className="upcoming-ride-route">
                    <Car size={18} />
                    <span>
                      {ride.from} → {ride.to}
                    </span>
                  </div>
                  <div className="upcoming-ride-info">
                    <div className="upcoming-ride-date">
                      <Calendar size={16} />
                      <span>
                        {new Date(ride.time).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        @{" "}
                        {new Date(ride.time).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="upcoming-ride-seats">
                      <User size={16} />
                      <span>
                        {ride.seats} Seat{ride.seats !== 1 && "s"} Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-rides-message">
            <p>No upcoming rides available for you at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingRideList;
