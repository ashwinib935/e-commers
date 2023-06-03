import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContextProvider";
import "./Cart.css";
import ProductCardHorizontal from "../../components/ProductCard/ProductCardHorizontal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
function Cart() {
  const { cart, totalOnNewPrice, totalOnOldPrice, discount, getCartData } =
    useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      getCartData();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="cart-main-container">
      <div className="cart-container">
        <h3>My Cart ({cart && cart.length})</h3>
        <div className="cart-items-price-card">
          <div className="cart-items">
            {cart && cart.length === 0 ? (
              <h3>Your Cart is empty...</h3>
            ) : (
              cart &&
              cart.map((carItem) => (
                <ProductCardHorizontal key={carItem._id} carItem={carItem} />
              ))
            )}
          </div>
          {cart && cart.length > 0 && (
            <div className="price-details">
              <h4 className="text-center">PRICE DETAILS</h4>
              <div className="price-calculate">
                <li>
                  <ul>
                    <p>Price ({cart.length})</p>
                    <p>₹ {totalOnOldPrice}</p>
                  </ul>
                  <ul>
                    <p>Discount</p>
                    <p>-₹ {discount}</p>
                  </ul>
                  <ul>
                    <p>Delivery Charges</p>
                    <p>FREE</p>
                  </ul>
                </li>
              </div>
              <ul className="price-totalAmt">
                <h4>Total Amount</h4>
                <h4>₹ {totalOnNewPrice}</h4>
              </ul>
              <p className="save-msg">
                You will save ₹ {discount} on this order
              </p>
              <div className="primary-btn text-center">
                <button
                  className="link-btn checkout-btn"
                  fdprocessedid="snyuzx"
                >
                  <Link to="/checkout" className="checkout-link">
                    Checkout
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
