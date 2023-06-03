import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/WishlistContextProvider";
import WishlistCard from "../../components/ProductCard/WishlistCard";
import "./Wishlist.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router";
function Wishlist() {
  const { wishlist, getWishlistData } = useContext(WishlistContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      getWishlistData();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="wishlist-main-container">
      <div className="wishlist-container">
        <h3>My Wishlist ({wishlist.length})</h3>
        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <h3>Your Wishlist is empty...</h3>
          ) : (
            wishlist.map((wishlistItem) => (
              <WishlistCard
                key={wishlistItem._id}
                wishlistItem={wishlistItem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
