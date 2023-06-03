import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
export const CartContext = createContext();
function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { token } = useContext(AuthContext);
  const location = useLocation();
  const newPath = location.pathname;
  const putData = async (product) => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          product: product,
        }),
      });

      const result = await response.json();
      setCart([...result.cart]);
      toast.success("Added In Cart !");
    } catch (error) {
      toast.error("Something Went Wrong !");
      console.error("Error:", error);
    }
  };

  const getCartData = async () => {
    try {
      const response = await fetch("/api/user/cart", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const result = await response.json();
      setCart(result.cart);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddToCart = (product) => {
    putData(product);
  };
  let totalOnNewPrice = 0;
  let totalOnOldPrice = 0;
  let discount = 0;
  if (cart) {
    totalOnNewPrice = cart.reduce(
      (acc, curr) => (acc = acc + curr.qty * curr.newPrice),
      0
    );
    totalOnOldPrice = cart.reduce(
      (acc, curr) => (acc = acc + curr.qty * curr.oldPrice),
      0
    );
    discount = totalOnOldPrice - totalOnNewPrice;
  }

  const updateQuantity = async (quantity, id) => {
    try {
      const {
        data: { cart },
      } = await axios.post(
        `api/user/cart/${id}`,
        {
          action: {
            type: quantity === "increment" ? "increment" : "decrement",
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      setCart(cart);
    } catch (error) {
      toast.error("Unable to update quantity!");
      console.log(error);
    }
  };
  const handleQuantity = (quantity, id) => {
    updateQuantity(quantity, id);
  };
  const isInCart = (id) => {
    if (cart) {
      return cart.findIndex((cartItem) => cartItem._id === id);
    }
  };
  const handleRemoveFromCart = async (id) => {
    try {
      const {
        data: { cart },
      } = await axios.delete(`api/user/cart/${id}`, {
        headers: {
          authorization: token,
        },
      });
      setCart(cart);
      if (newPath !== "/checkout") {
        toast.warning("Item removed from cart!");
      }
    } catch (error) {
      toast.error("Something Went Wrong !");
      console.log(error);
    }
  };
  const handlecheckoutCart = (cart) => {
    cart.map((item) => handleRemoveFromCart(item._id));
  };
  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        cart,
        setCart,
        isInCart,
        handleQuantity,
        handleRemoveFromCart,
        getCartData,
        totalOnNewPrice,
        totalOnOldPrice,
        discount,
        handlecheckoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
