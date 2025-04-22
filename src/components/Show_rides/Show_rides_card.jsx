import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Phone, Star, Clock, Mail, User, Info, 
         Languages, AlertTriangle, Shield, ArrowLeft } from "lucide-react";
import "./Show_rides_card.css";

function Show_rides_card() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isAnimated, setIsAnimated] = useState(false);

  const userId = localStorage.getItem("UserId");
  
  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);

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

    async function checkIfAlreadyBooked() {
      try {
        const response = await fetch(
          `http://localhost:8080/ride/hasRider?rideId=${ride.id}&riderId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to check booking status");
        const data = await response.json();
        setIsBooked(data.isInRide);
      } catch (error) {
        console.error("Error checking ride booking status:", error);
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
        const fromCoords = await geocode(ride.from);
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
    } else {
      setLoading(false);
    }

    if (ride?.id && userId) {
      checkIfAlreadyBooked();
      calculateRouteDetails();
    }
  }, [ride?.id, ride?.driver_id, userId, navigate, ride?.from, ride?.to]);

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

      // Re-check booking status
      const checkResponse = await fetch(
        `http://localhost:8080/ride/hasRider?rideId=${ride.id}&riderId=${userId}`
      );
      const checkData = await checkResponse.json();
      setIsBooked(checkData.isInRide);
    
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book ride. Please try again.");
    }
  };

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`showridescard-star ${i < count ? "showridescard-star-filled" : ""}`} 
        size={16} 
      />
    ));
  };

  if (!ride) {
    return (
      <div className="showridescard-no-data">
        <Info size={32} className="showridescard-info-icon" />
        <h2>No ride data found</h2>
        <p>We couldn't find the ride you're looking for.</p>
        <button 
          className="showridescard-button" 
          onClick={() => navigate("/showrides")}
        >
          Back to rides
        </button>
      </div>
    );
  }

  return (
    <div className={`showridescard-wrapper ${isAnimated ? 'animated' : ''}`}>
      <div className="showridescard-header">
        <div className="showridescard-header-content">
          <h1>Ride Details</h1>
        </div>
        <div className="showridescard-status-badge">
          <span className={`showridescard-status showridescard-status-${isBooked ? 'confirmed' : 'available'}`}>
            {isBooked ? 'Confirmed' : 'Available'}
          </span>
        </div>
      </div>

      <div className="showridescard-tabs">
        <button 
          className={`showridescard-tab ${activeTab === 'details' ? 'active' : ''}`} 
          onClick={() => setActiveTab('details')}
        >
          Trip Details
        </button>
        <button 
          className={`showridescard-tab ${activeTab === 'driver' ? 'active' : ''}`} 
          onClick={() => setActiveTab('driver')}
        >
          Driver Profile
        </button>
      </div>

      <div className="showridescard-container">
        {activeTab === 'details' && (
          <div className="showridescard-content-tab fade-in">
            <div className="showridescard-journey">
              <div className="showridescard-journey-points">
                <div className="showridescard-from">
                  <div className="showridescard-point-marker showridescard-start-point"></div>
                  <div className="showridescard-location-details">
                    <h3>Pickup Location</h3>
                    <p>{ride.from}</p>
                  </div>
                </div>
                <div className="showridescard-journey-line"></div>
                <div className="showridescard-to">
                  <div className="showridescard-point-marker showridescard-end-point"></div>
                  <div className="showridescard-location-details">
                    <h3>Destination</h3>
                    <p>{ride.to}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="showridescard-info-grid">
              <div className="showridescard-info-card">
                <div className="showridescard-info-icon-container">
                  <Calendar className="showridescard-icon" />
                </div>
                <div className="showridescard-info-content">
                  <h4>Date & Time</h4>
                  <p>{ride.time}</p>
                </div>
              </div>
              
              <div className="showridescard-info-card">
                <div className="showridescard-info-icon-container">
                  <Clock className="showridescard-icon" />
                </div>
                <div className="showridescard-info-content">
                  <h4>Duration</h4>
                  <p>{duration || ride.duration || 'Calculating...'}</p>
                </div>
              </div>
              
              <div className="showridescard-info-card">
                <div className="showridescard-info-icon-container">
                  <MapPin className="showridescard-icon" />
                </div>
                <div className="showridescard-info-content">
                  <h4>Distance</h4>
                  <p>{distance || 'Calculating...'}</p>
                </div>
              </div>
              
              <div className="showridescard-info-card showridescard-price-card">
                <div className="showridescard-info-icon-container">
                  <div className="showridescard-price-icon">₹</div>
                </div>
                <div className="showridescard-info-content">
                  <h4>Fare</h4>
                  <p className="showridescard-price">₹{ride.price}</p>
                </div>
              </div>
            </div>

            <div className="showridescard-cancellation-policy">
              <h3>Cancellation Policy</h3>
              <p>Free cancellation until 2 hours before pickup</p>
            </div>
          </div>
        )}

        {activeTab === 'driver' && (
          <div className="showridescard-content-tab fade-in">
            {loading ? (
              <div className="showridescard-loader-container">
                <div className="showridescard-loader"></div>
                <p>Loading driver details...</p>
              </div>
            ) : error ? (
              <div className="showridescard-error-message">
                <AlertTriangle size={20} />
                <p>{error}</p>
              </div>
            ) : driver ? (
              <div className="showridescard-driver-details">
                <div className="showridescard-driver-header">
                  <div className="showridescard-driver-avatar">
                    <img src="/profile.jpg" alt={driver.name || 'Driver'} />
                    <div className="showridescard-verified-badge" title="Verified Driver">
                      <Shield size={12} />
                    </div>
                  </div>
                  <div className="showridescard-driver-intro">
                    <h3>{driver.name}</h3>
                    <div className="showridescard-driver-rating">
                      <div className="showridescard-stars">
                        {renderStars(4)}
                      </div>
                      <span className="showridescard-rating-number">4.0</span>
                      <span className="showridescard-total-rides">(500+ rides)</span>
                    </div>
                  </div>
                </div>

                <div className="showridescard-driver-info-grid">
                  <div className="showridescard-driver-info-item">
                    <Phone className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Contact</h4>
                      <p>{driver.phone}</p>
                    </div>
                  </div>
                  
                  <div className="showridescard-driver-info-item">
                    <Mail className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Email</h4>
                      <p>{driver.email}</p>
                    </div>
                  </div>

                  <div className="showridescard-driver-info-item">
                    <User className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Gender</h4>
                      <p>{driver.gender}</p>
                    </div>
                  </div>
                  
                  <div className="showridescard-driver-info-item">
                    <User className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Age</h4>
                      <p>{driver.age ? `${driver.age} years` : 'Not available'}</p>
                    </div>
                  </div>

                  <div className="showridescard-driver-info-item">
                    <Languages className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Language</h4>
                      <p>{driver.language}</p>
                    </div>
                  </div>

                  <div className="showridescard-driver-info-item">
                    <Info className="showridescard-icon" />
                    <div className="showridescard-driver-info-content">
                      <h4>Occupation</h4>
                      <p>{driver.occupation}</p>
                    </div>
                  </div>
                </div>

                <div className="showridescard-driver-actions">
                  <button 
                    className="showridescard-action-button showridescard-call-button"
                    onClick={() => window.location.href = `tel:${driver.phone}`}
                  >
                    <Phone size={16} /> Call Driver
                  </button>
                </div>
              </div>
            ) : (
              <p>Driver info not available</p>
            )}
          </div>
        )}
      </div>    

      <div className="showridescard-action-bar">
        <div className="showridescard-actions">
          <button 
            className={`showridescard-book-button ${isBooked ? 'already-booked' : ''}`} 
            onClick={handleBookRide}
            disabled={isBooked}
          >
            {isBooked ? "Already Booked" : "Book Ride"}
          </button>
        </div>
        <button 
          className="showridescard-back-button" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  );
}

export default Show_rides_card;