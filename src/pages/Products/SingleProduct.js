import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function SingleProduct() {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams();

  const { handleAddToCart, isInCart } = useContext(CartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const { isLogined, token } = useContext(AuthContext);

  const navigate = useNavigate();
  const getProductDetails = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const result = await response.json();
      setProductDetails(result.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  const {
    _id,
    name,
    author,
    image,
    oldPrice,
    newPrice,
    discount,
    rating,
    isInStock,
  } = productDetails;
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
  return (
    <div className="singleproduct">
      <div className="singleproduct-card card">
        <div className="image-container">
          <img className="single-product-img card-img" src={image} alt="" />
          <div className="wishlist-icon-container">
            {isInWishlist(productDetails._id) >= 0 ? (
              <button onClick={() => handleRemoveWishlist(productDetails)}>
                <i
                  className="fa fa-solid fa-heart"
                  aria-hidden="true"
                  style={{ color: "#fb7185", display: "block" }}
                ></i>
              </button>
            ) : (
              <button onClick={() => handleWishlist(productDetails)}>
                <i className="fa fa-regular fa-heart"></i>
              </button>
            )}
          </div>
        </div>

        <div className="single-card-details">
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
            {isInCart(productDetails._id) >= 0 ? (
              <button className="btn default btn-add-cart">
                <Link to="/cart" className="gotoCartLink">
                  <i className="fa fa-shopping-cart"></i> Go to Cart
                </Link>
              </button>
            ) : (
              <button
                className="btn default btn-add-cart"
                onClick={() => handleCart(productDetails)}
              >
                <i className="fa fa-shopping-cart"></i>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
