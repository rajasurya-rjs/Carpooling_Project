import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Phone, Star, Clock, Mail, User, Info, AlertTriangle, Heart, Share2, Shield, MapIcon, Languages as Language } from "lucide-react";
import "./Usermyridescard.css";

function Usermyridescard() {
  const [driver, setDriver] = useState(null);
  const [loadingDriver, setLoadingDriver] = useState(true);
  const [driverError, setDriverError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  console.log(driver)
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};
  
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    // Fetch driver details
    async function fetchDriverDetails() {
      try {
        const response = await fetch(`http://localhost:8080/getUser?id=${ride?.driver_id}`);
        if (!response.ok) throw new Error("Failed to fetch driver details");
        const data = await response.json();
        setDriver(data);
      } catch (err) {
        console.error("Error fetching driver data:", err);
        setDriverError("Unable to load driver info.");
      } finally {
        setLoadingDriver(false);
      }
    }

    // Calculate distance and duration
    async function geocode(place) {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json`);
        const data = await res.json();
        return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      }
      
      async function calculateRouteDetails() {
        try {
          const fromCoords = await geocode(ride.from);  // [lon, lat]
          const toCoords = await geocode(ride.to);
      
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?overview=false`);
          const data = await res.json();
      
          if (data.routes && data.routes[0]) {
            const distanceKm = (data.routes[0].distance / 1000).toFixed(1);
            const durationMin = Math.round(data.routes[0].duration / 60);
            setDistance(`${distanceKm} km`);
            setDuration(`${Math.floor(durationMin / 60)}h ${durationMin % 60}m`);
          }
        } catch (err) {
          console.error("Error with OSRM routing:", err);
          setDistance("38.5 km");
          setDuration("1h 45m");
        }
      }
      

    if (ride?.driver_id) {
      fetchDriverDetails();
      calculateRouteDetails();
    }
  }, [ride]);

  const handleRateDriver = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitFeedback = () => {
    alert(`Thank you for your feedback! Your ${rating}-star rating has been submitted.`);
    setShowFeedbackForm(false);
  };

  const handleEmergencyCall = () => {
    alert("Connecting to emergency services. Please stay calm.");
  };

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`usermyridescard-star ${i < count ? "usermyridescard-star-filled" : ""}`} 
        size={16} 
      />
    ));
  };

  if (!ride) {
    return (
      <div className="usermyridescard-no-data">
        <Info size={32} className="usermyridescard-info-icon" />
        <h2>No ride data found</h2>
        <p>We couldn't find the ride you're looking for.</p>
        <button 
          className="usermyridescard-button" 
          onClick={() => navigate("/showrides")}
        >
          Back to rides
        </button>
      </div>
    );
  }

  return (
    <div className={`usermyridescard-wrapper ${isAnimated ? 'animated' : ''}`}>
      <div className="usermyridescard-header">
        <div className="usermyridescard-header-content">
          <h1 style={{color:"white"}}>Ride Details</h1>
        </div>
        <div className="usermyridescard-status-badge">
          <span className={`usermyridescard-status usermyridescard-status-${ride.status || 'confirmed'}`}>
            {(ride.status || 'confirmed').charAt(0).toUpperCase() + (ride.status || 'confirmed').slice(1)}
          </span>
        </div>
      </div>

      <div className="usermyridescard-tabs">
        <button 
          className={`usermyridescard-tab ${activeTab === 'details' ? 'active' : ''}`} 
          onClick={() => setActiveTab('details')}
        >
          Trip Details
        </button>
        <button 
          className={`usermyridescard-tab ${activeTab === 'driver' ? 'active' : ''}`} 
          onClick={() => setActiveTab('driver')}
        >
          Driver Profile
        </button>
      </div>

      <div className="usermyridescard-container">
        {activeTab === 'details' && (
          <div className="usermyridescard-content-tab fade-in">
            <div className="usermyridescard-journey">
              <div className="usermyridescard-journey-points">
                <div className="usermyridescard-from">
                  <div className="usermyridescard-point-marker usermyridescard-start-point"></div>
                  <div className="usermyridescard-location-details">
                    <h3>Pickup Location</h3>
                    <p>{ride.from}</p>

                  </div>
                </div>
                <div className="usermyridescard-journey-line"></div>
                <div className="usermyridescard-to">
                  <div className="usermyridescard-point-marker usermyridescard-end-point"></div>
                  <div className="usermyridescard-location-details">
                    <h3>Destination</h3>
                    <p>{ride.to}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="usermyridescard-info-grid">
              <div className="usermyridescard-info-card">
                <div className="usermyridescard-info-icon-container">
                  <Calendar className="usermyridescard-icon" />
                </div>
                <div className="usermyridescard-info-content">
                  <h4>Date & Time</h4>
                  <p>{ride.time}</p>
                </div>
              </div>
              
              <div className="usermyridescard-info-card">
                <div className="usermyridescard-info-icon-container">
                  <Clock className="usermyridescard-icon" />
                </div>
                <div className="usermyridescard-info-content">
                  <h4>Duration</h4>
                  <p>{duration || 'Calculating...'}</p>
                </div>
              </div>
              
              <div className="usermyridescard-info-card">
                <div className="usermyridescard-info-icon-container">
                  <MapPin className="usermyridescard-icon" />
                </div>
                <div className="usermyridescard-info-content">
                  <h4>Distance</h4>
                  <p>{distance || 'Calculating...'}</p>
                </div>
              </div>
              
              <div className="usermyridescard-info-card usermyridescard-price-card">
                <div className="usermyridescard-info-icon-container">
                  <div className="usermyridescard-price-icon">₹</div>
                </div>
                <div className="usermyridescard-info-content">
                  <h4>Fare</h4>
                  <p className="usermyridescard-price">₹{ride.price}</p>
                </div>
              </div>
            </div>
{/* 
            <div className="usermyridescard-payment-card">
              <h3>Payment Information</h3>
              <p className="usermyridescard-payment-method">Online Payment</p>
              <div className="usermyridescard-fare-breakdown">
                <div className="usermyridescard-fare-row">
                  <span>Base fare</span>
                  <span>₹{parseInt(ride.price) - 60}</span>
                </div>
                <div className="usermyridescard-fare-row">
                  <span>Taxes & fees</span>
                  <span>₹60</span>
                </div>
                <div className="usermyridescard-fare-row usermyridescard-fare-total">
                  <span>Total</span>
                  <span>₹{ride.price}</span>
                </div>
              </div>
            </div> */}

            <div className="usermyridescard-cancellation-policy">
              <h3>Cancellation Policy</h3>
              <p>Free cancellation until 2 hours before pickup</p>
            </div>
          </div>
        )}

        {activeTab === 'driver' && (
          <div className="usermyridescard-content-tab fade-in">
            {loadingDriver ? (
              <div className="usermyridescard-loader-container">
                <div className="usermyridescard-loader"></div>
                <p>Loading driver details...</p>
              </div>
            ) : driverError ? (
              <div className="usermyridescard-error-message">
                <AlertTriangle size={20} />
                <p>{driverError}</p>
              </div>
            ) : driver ? (
              <div className="usermyridescard-driver-details">
                <div className="usermyridescard-driver-header">
                  <div className="usermyridescard-driver-avatar">
                    <img src="/profile.jpg" alt={driver.name} />
                    <div className="usermyridescard-verified-badge" title="Verified Driver">
                      <Shield size={12} />
                    </div>
                  </div>
                  <div className="usermyridescard-driver-intro">
                    <h3>{driver.name}</h3>
                    <div className="usermyridescard-driver-rating">
                      <div className="usermyridescard-stars">
                        {renderStars(4)}
                      </div>
                      <span className="usermyridescard-rating-number">4.0</span>
                      <span className="usermyridescard-total-rides">(500+ rides)</span>
                    </div>
                  </div>
                </div>

                <div className="usermyridescard-driver-info-grid">
                  <div className="usermyridescard-driver-info-item">
                    <Phone className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Contact</h4>
                      <p>{driver.phone}</p>
                    </div>
                  </div>
                  
                  <div className="usermyridescard-driver-info-item">
                    <Mail className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Email</h4>
                      <p>{driver.email}</p>
                    </div>
                  </div>
                  <div className="usermyridescard-driver-info-item">
                  <User className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Gender</h4>
                      <p>{driver.gender}</p>
                    </div>
                  </div>
                  
                  <div className="usermyridescard-driver-info-item">
                    <User className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Age</h4>
                      <p>{driver.age} years</p>
                    </div>
                  </div>

                  <div className="usermyridescard-driver-info-item">
                    <Language className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Language</h4>
                      <p>{driver.language}</p>
                    </div>
                  </div>
                  <div className="usermyridescard-driver-info-item">
                    <Info className="usermyridescard-icon" />
                    <div className="usermyridescard-driver-info-content">
                      <h4>Occupation</h4>
                      <p>{driver.occupation}</p>
                    </div>
                  </div>
                </div>

                <div className="usermyridescard-driver-actions">
                  <button 
                    className="usermyridescard-action-button usermyridescard-call-button"
                    onClick={() => window.location.href = `tel:${driver.phone}`}
                  >
                    <Phone size={16} /> Call Driver
                  </button>
                  <button 
                    className="usermyridescard-action-button usermyridescard-feedback-button"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Star size={16} /> Rate & Review
                  </button>
                </div>

                {showFeedbackForm && (
                  <div className="usermyridescard-feedback-form">
                    <h3>Rate Your Experience with {driver.name}</h3>
{/*                     
                    <div className="usermyridescard-rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`usermyridescard-rating-star ${rating >= star ? 'active' : ''}`}
                          onClick={() => handleRateDriver(star)}
                        />
                      ))}
                    </div> */}
                    
                    <textarea 
                      className="usermyridescard-feedback-textarea"
                      placeholder="Share your experience..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                    
                    <div className="usermyridescard-feedback-buttons">
                      <button 
                        className="usermyridescard-button usermyridescard-cancel-button"
                        onClick={() => setShowFeedbackForm(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="usermyridescard-button usermyridescard-submit-button"
                        onClick={submitFeedback}
                        disabled={rating === 0}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>    

      <div className="usermyridescard-action-bar">
        <div className="usermyridescard-actions">
          {(ride.status || 'confirmed') === 'confirmed' && (
            <button className="usermyridescard-action-button usermyridescard-cancel-ride-button">
              <X size={16} /> Cancel Ride
            </button>
          )}
        </div>
        <button 
          className="usermyridescard-back-button" 
          onClick={() => navigate(-1)}
        >
          ← Back to My Rides
        </button>
      </div>
    </div>
  );
}

const X = (props) => <div {...props} className={props.className || ''}>✕</div>;

export default Usermyridescard;