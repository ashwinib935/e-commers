import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FilterContext } from "../../context/FilterContextProvider";
import { ProductContext } from "../../context/ProductContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

function Navbar() {
  const { handleHambergur } = useContext(ProductContext);
  const { state, filterDispatch } = useContext(FilterContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { isLogined, setIsLogined, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (searchValue) => {
    filterDispatch({ type: "SEARCH", payload: searchValue });
    navigate("/products");
  };
  return (
    <>
      <nav className="navbar nav-fixed">
        <div className="navbar-main">
          <div className="navbar-left">
            <div onClick={handleHambergur}>
              <i
                className="fa fa-bars drawer-hamberg-btn main-icon"
                aria-hidden="true"
              ></i>
            </div>

            <NavLink to="/" className="link">
              <h2 className="title">Book Store</h2>
            </NavLink>
          </div>
          <div className="search-container">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              type="search"
              name="search"
              className="search-bar"
              placeholder="Search for product"
              value={state.search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <ul className="navbar-right">
            <li>
              <div className="icon cart-badge">
                <NavLink to="/products" className="link">
                  <h3 className="title badge">Explore</h3>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="icon cart-badge">
                <NavLink to="/wishlist" className="badge link-cursor">
                  <i className="fa fa-heart" title="Wishlist"></i>
                  {wishlist.length > 0 && (
                    <div className="notification-icon flex-center">
                      <span>{wishlist.length}</span>
                    </div>
                  )}
                </NavLink>
              </div>
            </li>
            <li className="nav-cart">
              <div className="icon cart-badge">
                <NavLink to="/cart" className="badge link-cursor">
                  <i className="fa fa-shopping-cart" title="Cart"></i>
                  {cart.length > 0 && (
                    <div className="notification-icon flex-center">
                      <span>{cart.length}</span>
                    </div>
                  )}
                </NavLink>
              </div>
            </li>
            <li>
              <div className="icon cart-badge">
                <NavLink
                  to={isLogined ? "/user-profile" : "/login"}
                  className="badge link-cursor"
                >
                  <i className="fa fa-user-circle" title="User"></i>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
        <div className="search-container search-mob">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="search"
            name="search"
            className="search-bar"
            placeholder="Search for product"
            value={state.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
