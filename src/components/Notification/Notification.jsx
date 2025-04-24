import { useEffect, useState } from "react";
import { BellRing, Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import "./Notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const fetchRides = async () => {
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
          (ride) =>
            ride.time === formattedTomorrow || ride.time === formattedToday
        );

        const newNotifications = upcomingRides.map((ride) => ({
          id: ride.id,
          type: "ride",
          title: `Upcoming ${
            ride.time === formattedTomorrow ? "Tomorrow" : "Today"
          }`,
          message: `Ride from ${ride.from} to ${ride.to}`,
          isToday: ride.time === formattedToday,
          from: ride.from,
          to: ride.to,
          time: ride.time,
          timestamp: new Date().toISOString(),
        }));

        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error fetching rides:", error);
        setNotifications([
          {
            id: "error-1",
            type: "error",
            title: "Connection Error",
            message:
              "Unable to fetch your scheduled rides. Please try again later.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    fetchRides();
    const interval = setInterval(fetchRides, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp) => {
    return "just now";
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notification-app-container">
      <main className="notification-main-content">
        <div className="notification-hero-section">
          <h1 className="notification-main-title">
            <BellRing size={24} className="notification-bell-icon" />{" "}
            Notifications Center
          </h1>
          <p className="notification-subtitle">
            Stay updated with your upcoming rides and important alerts
          </p>
        </div>

        <div className="notification-features-container">
          <div className="notification-features-card">
            {notifications.length > 0 ? (
              <div className="notifications-list">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    className={`notification-item ${
                      notification.isToday ? "notification-today" : ""
                    }`}
                  >
                    <div className="notification-icon">
                    <BellRing size={20}  />
                    </div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h3>{notification.title}</h3>
                        <span className="notification-time">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      <p className="notification-message">
                        {notification.message}
                      </p>

                      {notification.type === "ride" && (
                        <div className="notification-details">
                          <div className="notification-detail">
                            <MapPin size={16} />
                            <span>From: {notification.from}</span>
                          </div>
                          <div className="notification-detail">
                            <MapPin size={16} />
                            <span>To: {notification.to}</span>
                          </div>
                          <div className="notification-detail">
                            <Calendar size={16} />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="notification-empty">
                <BellRing size={20} className="notification-empty-icon" />
                <h3>No notifications</h3>
                <p>You don't have any notifications at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notification;
