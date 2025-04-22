import "./Notification.css";
import { Link } from "react-router-dom";
function ConstructionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 12h.01" />
      <path d="M17 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  );
}

function Notification() {
  return (<>
    <div className="notification-app-container">
      <main className="notification-main-content">
        <div className="notification-app-wrapper">
          <main className="notification-main-wrapper">
            <div className="notification-hero-section">
              <h1 className="notification-main-title fade-in">Notification Feature Coming Soon</h1>
              <p className="notification-subtitle">
                We're working hard to bring you an amazing notification experience. Stay tuned!
              </p>
            </div>

            <div className="notification-features-container">
              <div className="notification-features-card">
                <div className="notification-construction-icon">
                  <ConstructionIcon />
                </div>
                <h2 className="notification-section-title">Under Construction</h2>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  </>
    
  );
}

export default Notification;