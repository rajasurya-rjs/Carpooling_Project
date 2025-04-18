import React, { useEffect, useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user-profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsEditing(true);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      language: e.target.language.value,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user-profile", { //Have to replace Backend API endpoint comes here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit user profile");
      }

      const result = await response.json();
      console.log("Profile submitted successfully:", result);
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="container">
        {isEditing || !userData ? (
          <>
            <div className="title">Fill Your Profile</div>
            <form onSubmit={handleSubmit}>
              <div className="info">
                <label className="label" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={userData?.name || ""}
                  required
                />

                <label className="label" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={userData?.email || ""}
                  required
                />

                <label className="label" htmlFor="phone">
                  Phone No.:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="\+91 [0-9]{10}"
                  placeholder="+91 XXXXXXXXXX"
                  defaultValue={userData?.phone || ""}
                  required
                />

                <label className="label" htmlFor="age">
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="5"
                  max="80"
                  defaultValue={userData?.age || ""}
                  required
                />

                <label className="label" htmlFor="gender">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={userData?.gender || ""}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <label className="label" htmlFor="language">
                  Language:
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  placeholder="Enter your language"
                  defaultValue={userData?.language || ""}
                  required
                />
              </div>
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="title">User Profile</div>
            <div className="info">
              <div className="label">Name:</div>
              <div className="value">{userData.name}</div>
              <div className="label">Email:</div>
              <div className="value">{userData.email}</div>
              <div className="label">Phone No.:</div>
              <div className="value">{userData.phone}</div>
              <div className="label">Age:</div>
              <div className="value">{userData.age}</div>
              <div className="label">Gender:</div>
              <div className="value">{userData.gender}</div>
              <div className="label">Language:</div>
              <div className="value">{userData.language}</div>
            </div>
            <button
              className="btn"
              style={{ marginTop: "2rem" }}
              onClick={handleEdit}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
