import React, { useContext } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";
function DisplayUserProfile() {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const { setToken, setIsLogined } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const { setWishlist } = useContext(WishlistContext);
  const { firstName, lastName, email } = userProfile;
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogined(false);
    setCart([]);
    setWishlist([]);
    setToken("");
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="user-details-main">
      <h3>Profile Details</h3>
      <h4>
        Name:{" "}
        <span>
          {firstName} {lastName}
        </span>
      </h4>
      <h4>Email: {email}</h4>
      <div className="profile-action">
        <button className="btn danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DisplayUserProfile;
