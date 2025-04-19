import React, { useEffect, useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = parseInt(localStorage.getItem("UserId"));
        const response = await fetch(`http://localhost:8080/getUser?id=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
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
      age: parseInt(e.target.age.value),
      age: parseInt(e.target.age.value),
      gender: e.target.gender.value,
      language: e.target.language.value,
      address: e.target.address.value,
      occupation: e.target.occupation.value,
    };

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit user profile");

      const result = await response.json();
      console.log(result.message);
      alert(result.message);
      localStorage.setItem("UserId", result.UserId);
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <div className="user-profile-container-unique">
      {isEditing || !userData ? (
        <>
          <h2 className="user-profile-title-unique">Fill Your Profile</h2>
          <form className="user-profile-form-unique" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={userData?.name || ""}
              required
              className="user-profile-input-unique"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={userData?.email || ""}
              required
              className="user-profile-input-unique"
            />
            <input
              name="phone"
              type="tel"
              pattern="\+91 [0-9]{10}"
              placeholder="+91 XXXXXXXXXX"
              defaultValue={userData?.phone || ""}
              required
              className="user-profile-input-unique"
            />
            <input
              name="age"
              type="number"
              min="5"
              max="80"
              placeholder="Age"
              defaultValue={userData?.age || ""}
              required
              className="user-profile-input-unique"
            />
            <select
              name="gender"
              defaultValue={userData?.gender || ""}
              required
              className="user-profile-select-unique"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="language"
              type="text"
              placeholder="Language"
              defaultValue={userData?.language || ""}
              required
              className="user-profile-input-unique"
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              defaultValue={userData?.address || ""}
              className="user-profile-input-unique"
            />
            <input
              name="occupation"
              type="text"
              placeholder="Occupation"
              defaultValue={userData?.occupation || ""}
              className="user-profile-input-unique"
            />
            <button type="submit" className="user-profile-btn-unique">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="user-profile-title-unique">User Profile</h2>
          <div className="user-profile-info-unique">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>Age:</strong> {userData.age}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>Language:</strong> {userData.language}
            </p>
            <p>
              <strong>Address:</strong> {userData.address}
            </p>
            <p>
              <strong>Occupation:</strong> {userData.occupation}
            </p>
          </div>
          <button onClick={handleEdit} className="user-profile-btn-unique">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;