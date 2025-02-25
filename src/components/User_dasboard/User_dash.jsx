import React from "react";
import "./User_dash.css";
import { Link } from "react-router-dom";
function User_dash() {
  return (
    <div className="main">
      <div className="nav">
        <div className="wrapper1">
          <div className="logo">Logo </div>
          <div className="feature-item">Home</div>
          <div className="feature-item">Messages </div>
          <div className="feature-item">Calendar</div>
          <div className="feature-item">Notifications</div>
        </div>

        <div className="wrapper2">
          <div className="help">Help</div>
          <div className="switch-driver">
            <Link to="/driver">Switch to Driver</Link></div>
            
          <div className="profile">Profile</div>
        </div>
      </div>

      <div className="content">
        <div className="heading">
          <h1>
            Welcome Back! Travel to thousands of destinations at low prices
          </h1>
        </div>
        <div className="input-filed">
          <input
            className="from1"
            type="text"
            placeholder="Leaving from"
          ></input>
          <input
            className="destination1"
            type="text"
            placeholder="Going to "
          ></input>
          <input
            className="destination1"
            type="date"
            placeholder="Today"
          ></input>
          <input
            className="count"
            type="number"
            placeholder="No of passenger"
          ></input>
          <button className="search">Search</button>
        </div>
        <div className="context">
          <div className="cont1">
            <h3>Travel at low prices</h3>
            <p>
              Wherever you’re going, there’s a carpool that will get you there
              for less.
            </p>
          </div>
          <div className="cont2">
            <h3>Trustworthy and simple</h3>
            <p>
              We check reviews, profiles and IDs, so you know who you’re
              travelling with; and our app is both simple and secure thanks to
              powerful technology.
            </p>
          </div>
          <div className="cont3">
            <h3>Proximity makes it easier</h3>
            <p>
              Wherever you’re going, there’s a carpool that will get you there
              for less.
            </p>
          </div>
        </div>
        <div className="drive">
          <h2>Where do you want to drive to?</h2>
          <p>
            Sharing a carpool is a great way to travel. It's affordable,
            comfortable and eco-friendly! If you're driving with an empty car,
            consider publishing a carpool ride on BlaBlaCar to save costs and
            travel with some company. Our community of carpoolers is the most
            trustworthy in the world.
          </p>
          <button className="offerride">Offer Ride</button>
        </div>
      </div>
    </div>
  );
}

export default User_dash
