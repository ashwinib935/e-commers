import React, { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";
import { Link } from "react-router-dom";

function WishlistCard({ wishlistItem }) {
  const { handleAddToCart, isInCart } = useContext(CartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  return (
    <div className="card horizontal-container" key={wishlistItem._id}>
      <div className="card-horizontal">
        <div className="wishlist-icon-container">
          {isInWishlist(wishlistItem._id) >= 0 ? (
            <button onClick={() => handleRemoveFromWishlist(wishlistItem)}>
              <i
                className="fa fa-solid fa-heart"
                aria-hidden="true"
                style={{ color: "#fb7185", display: "block" }}
              ></i>
            </button>
          ) : (
            <button onClick={() => handleAddToWishlist(wishlistItem)}>
              <i className="fa fa-regular fa-heart"></i>
            </button>
          )}
        </div>
        <img
          className="card-img horizontal-img"
          src={wishlistItem.image}
          alt=""
        />
        <div className="card-info">
          <div className="card-title">
            <div>
              <h2>{wishlistItem.name}</h2>
              <p className="card-description">{wishlistItem.author}</p>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">{wishlistItem.newPrice}</p>
            <p className="actual-price">{wishlistItem.oldPrice}</p>
            <p className="price-percentage">({wishlistItem.discount}% OFF)</p>
          </div>
        </div>
      </div>
      <div className="horizontal-btn">
        <div className="bottom-btn cart wishlist">
          {isInCart(wishlistItem._id) >= 0 ? (
            <button className="btn-cart">
              <Link to="/cart" className="gotoCartLink">
                <span>
                  <i className="fa fa-shopping-cart shopping-cart-icon"></i>
                </span>{" "}
                Already In Cart
              </Link>
            </button>
          ) : (
            <button
              className="btn-cart"
              onClick={() => handleAddToCart(wishlistItem)}
            >
              <span>
                <i className="fa fa-shopping-cart shopping-cart-icon"></i>
              </span>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
