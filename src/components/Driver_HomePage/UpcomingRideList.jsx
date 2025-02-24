import React, { useMemo } from "react";
import { Car, User, Calendar } from "lucide-react";
import "./UpcomingRideList.css";

function UpcomingRideList() {
  const dummyRides = [
    { from: "Kashmir", to: "Kanyakumari", date: "2025-02-23", seats: 2 },
    { from: "Karur", to: "Madurai", date: "2025-03-15", seats: 3 },
    { from: "BLR", to: "Chennai", date: "2025-03-01", seats: 1 },
  ];

  const sortedRides = useMemo(
    () => [...dummyRides].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [dummyRides]
  );

  return (
    <div className="rides-container">
      <h2 className="rides-title">Upcoming Rides:</h2>
      <div className="rides-list">
        {sortedRides.map((ride) => (
          <div key={ride.id} className="ride-card">
            <div className="ride-content">
              <div className="ride-details">
                <div className="ride-route">
                  <Car size={16} />
                  <span>
                    {ride.from} → {ride.to}
                  </span>
                </div>
                <div className="ride-info">
                  <div className="ride-date">
                    <Calendar size={16} />
                    <span>
                      {new Date(ride.date).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <div className="ride-seats">
                    <User size={16} />
                    <span>{ride.seats} seats booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingRideList;
