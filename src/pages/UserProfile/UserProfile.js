import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import DisplayUserProfile from "../../components/UserProfile/DisplayUserProfile";
import DisplayUserAddress from "../../components/UserProfile/DisplayUserAddress";
import { useNavigate } from "react-router";
function UserProfile() {
  const encodedToken = localStorage.getItem("encodedToken");
  const [show, setShow] = useState({ userProfile: true, userAddress: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!encodedToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="user-profile-main-container">
      <div className="user-profile-main">
        <h2>My Profile</h2>
        <div className="user-profile">
          <div className="user-profile-header">
            <div
              className="user-profile-btn"
              onClick={() =>
                setShow({ ...show, userProfile: true, userAddress: false })
              }
              style={{
                backgroundColor: show.userProfile ? "#9333ea" : "transparent",
                color: show.userProfile ? "white" : "black",
              }}
            >
              Profile
            </div>
            <div
              className="user-address-btn"
              onClick={() =>
                setShow({ ...show, userAddress: true, userProfile: false })
              }
              style={{
                backgroundColor: show.userAddress ? "#9333ea" : "transparent",
                color: show.userAddress ? "white" : "black",
              }}
            >
              Address
            </div>
          </div>
          <div className="user-profile-details">
            {show.userProfile && <DisplayUserProfile />}
            {show.userAddress && <DisplayUserAddress />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
