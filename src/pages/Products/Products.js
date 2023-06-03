import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContextProvider";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";
import Filter from "../../components/Filter/Filter";
import { FilterContext } from "../../context/FilterContextProvider";
import Loader from "../../components/Loader/Loader";
import { CartContext } from "../../context/CartContextProvider";
import { WishlistContext } from "../../context/WishlistContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

function Products() {
  const { products, isLoading, getProducts } = useContext(ProductContext);
  const { token } = useContext(AuthContext);
  const { state } = useContext(FilterContext);
  const { getCartData, cart, setCart } = useContext(CartContext);
  const { getWishlistData, wishlist } = useContext(WishlistContext);

  useEffect(() => {
    if (token) {
      getCartData();
      getWishlistData();
    }
    getProducts();
  }, []);

  const getProductsBySearch = (products, search) => {
    const sortedProducts = products.filter((product) =>
      search
        ? product.name.toLowerCase().includes(search.toLowerCase())
        : products
    );
    return sortedProducts;
  };

  const getProductsByPriceRange = (products, price) => {
    const sortedProducts = products.filter((product) =>
      price ? product.newPrice <= Number(price) : products
    );
    return sortedProducts;
  };
  const getProductsByCategory = (products, category) => {
    const sortedProducts = products.filter((product) =>
      category.length > 0 ? category.includes(product.category) : products
    );
    return sortedProducts;
  };
  const getProductsByRating = (products, rating) => {
    const sortedProducts = products.filter((product) =>
      rating ? product.rating >= Number(rating) : products
    );
    return sortedProducts;
  };
  const getSortedProducts = (products, sort) => {
    const sortedProducts = [...products].sort((product1, product2) =>
      sort === "LTH"
        ? product1.newPrice - product2.newPrice
        : sort === "HTL"
        ? product2.newPrice - product1.newPrice
        : products
    );
    return sortedProducts;
  };
  const sortedProductsBySearch = getProductsBySearch(products, state.search);
  const sortedProductsByPriceRange = getProductsByPriceRange(
    sortedProductsBySearch,
    state.priceRange
  );
  const sortedProductsByCategory = getProductsByCategory(
    sortedProductsByPriceRange,
    state.category
  );

  const sortedProductsByRating = getProductsByRating(
    sortedProductsByCategory,
    state.rating
  );
  const sortedProducts = getSortedProducts(sortedProductsByRating, state.sort);

  return (
    <div className="products-main-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Filter />
          <div className="product-list-container">
            <div className="product-list-header">
              <h3>
                {sortedProducts.length > 0
                  ? "Showing All Products"
                  : "Sorry,No product to display!"}
              </h3>
            </div>
            <div className="products-grid">
              {sortedProducts &&
                sortedProducts.length > 0 &&
                sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
