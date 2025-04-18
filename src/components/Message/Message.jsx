import "./Message.css"
import { Link } from "react-router-dom";

  function ConstructionIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    );
  }
  
  function App() {
    return (
      <div className="message-app-container">
        <nav className="message-nav-bar"></nav>

        <div className="message-back-button">
          <Link to="/user-dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <main className="message-main-content">
          <div className="app-container">
            <main className="main-content">
              <div className="hero-section">
                <h1 className="main-title fade-in">Message Feature Coming Soon</h1>
                <p className="subtitle">
                  We're working hard to bring you an amazing messaging experience. Stay tuned!
                </p>
              </div>
    
              <div className="features-container">
                <div className="features-card">
                  <div className="construction-icon">
                    <ConstructionIcon />
                  </div>
                  <h2 className="section-title">Under Construction</h2>

                </div>
              </div>
    

            </main>
          </div>
        </main>
      </div>
    );
  }
  
  export default App;