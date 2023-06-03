import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";
import { toast } from "react-toastify";
export const WishlistContext = createContext();
function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(AuthContext);

  const putDataInWishlist = async (product) => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          product: product,
        }),
      });

      const result = await response.json();
      setWishlist([...result.wishlist]);
      toast.success("Item added In Wishlist !");
    } catch (error) {
      toast.error("Something Went Wrong !");
      console.error("Error:", error);
    }
  };
  const isInWishlist = (id) => {
    if (wishlist) {
      return wishlist.findIndex((item) => item._id === id);
    }
  };

  const handleAddToWishlist = (product) => {
    putDataInWishlist(product);
  };
  const handleRemoveFromWishlist = async (product) => {
    try {
      const {
        data: { wishlist },
      } = await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: {
          authorization: token,
        },
      });
      setWishlist(wishlist);
      toast.warning("Item removed from wishlist!");
    } catch (error) {
      toast.error("Something Went Wrong !");
      console.log(error);
    }
  };
  const getWishlistData = async () => {
    try {
      const response = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const result = await response.json();
      setWishlist(result.wishlist);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <WishlistContext.Provider
      value={{
        handleAddToWishlist,
        isInWishlist,
        handleRemoveFromWishlist,
        wishlist,
        setWishlist,
        getWishlistData,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;
