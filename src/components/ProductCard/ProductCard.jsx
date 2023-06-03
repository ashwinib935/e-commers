import React, { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { WishlistContext } from "../../context/WishlistContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
function ProductCard({ product }) {
  const { handleAddToCart, isInCart } = useContext(CartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  const { _id, name, author, image, oldPrice, newPrice, discount, rating } =
    product;

  const handleCart = (product) => {
    if (token) {
      handleAddToCart(product);
    } else {
      toast.warning("Please login first");
      navigate("/login");
    }
  };
  const handleWishlist = (product) => {
    if (token) {
      handleAddToWishlist(product);
    } else {
      toast.warning("Please login first");
      navigate("/login");
    }
  };
  const handleRemoveWishlist = (product) => {
    if (token) {
      handleRemoveFromWishlist(product);
    } else {
      toast.warning("Please login first");
      navigate("/login");
    }
  };
  const handleProductDetails = () => {
    navigate(`/product/${_id}`);
  };
  return (
    <>
      <div className="card">
        <div className="image-container">
          <img
            className="card-img"
            src={image}
            alt=""
            onClick={handleProductDetails}
          />
        </div>
        <div className="wishlist-icon-container">
          {isInWishlist(product._id) >= 0 ? (
            <button onClick={() => handleRemoveWishlist(product)}>
              <i
                className="fa fa-solid fa-heart"
                aria-hidden="true"
                style={{ color: "#fb7185", display: "block" }}
              ></i>
            </button>
          ) : (
            <button onClick={() => handleWishlist(product)}>
              <i className="fa fa-regular fa-heart"></i>
            </button>
          )}
        </div>

        <div className="card-info">
          <div className="card-title">
            <div>
              <h3>{name}</h3>
              <p className="card-description">{author}</p>
            </div>

            <div className="card-star">
              <p>{rating}</p>
              <i className="fa fa-star"></i>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">₹{newPrice}</p>
            <p className="actual-price">₹{oldPrice}</p>
            <p className="price-percentage">({discount}% OFF)</p>
          </div>
        </div>
        <div className="bottom-btn cart">
          {isInCart(product._id) >= 0 ? (
            <button className="btn default btn-add-cart">
              <Link to="/cart" className="gotoCartLink">
                <i className="fa fa-shopping-cart shopping-cart-icon"></i> Go to
                Cart
              </Link>
            </button>
          ) : (
            <button
              className="btn default btn-add-cart"
              onClick={() => handleCart(product)}
            >
              <i className="fa fa-shopping-cart shopping-cart-icon"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
