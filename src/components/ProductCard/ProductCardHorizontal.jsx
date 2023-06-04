import React, { useContext } from "react";
import "./ProductCard.css";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";

function ProductCardHorizontal({ carItem }) {
  const { handleQuantity, handleRemoveFromCart } = useContext(CartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const handleQuantityAndRemove = (quantityType, item) => {
    if (item.qty <= 0) {
      handleRemoveFromCart(carItem._id);
    } else {
      handleQuantity(quantityType, item._id);
    }
  };
  return (
    <div className="card horizontal-container" key={carItem._id}>
      <div className="card-horizontal">
        <img className="card-img horizontal-img" src={carItem.image} alt="" />
        <div className="card-info">
          <div className="card-title">
            <div>
              <h3>{carItem.name}</h3>
              <p className="card-description">{carItem.author}</p>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">{carItem.newPrice}</p>
            <p className="actual-price">{carItem.oldPrice}</p>
            <p className="price-percentage">({carItem.discount}% OFF)</p>
          </div>
          <div className="qty">
            <button
              className="minus"
              onClick={() => handleQuantityAndRemove("decrement", carItem)}
              disabled={carItem.qty === 1}
            >
              -
            </button>
            <span className="qty-count" type="number">
              {carItem.qty}
            </span>
            <button
              className="add"
              onClick={() => handleQuantity("increment", carItem._id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="horizontal-btn">
        <button
          className="remove-btn"
          onClick={() => handleRemoveFromCart(carItem._id)}
        >
          REMOVE
        </button>
        {isInWishlist(carItem._id) >= 0 ? (
          <button
            className="later-btn"
            onClick={() => handleRemoveFromWishlist(carItem)}
          >
            REMOVE FROM WISHLIST
          </button>
        ) : (
          <button
            className="later-btn"
            onClick={() => handleAddToWishlist(carItem)}
          >
            MOVE TO WISHLIST
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCardHorizontal;
