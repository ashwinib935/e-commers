import React, { createContext, useState } from "react";
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [hamburgerMenu, setHambugerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleHambergur = () => {
    setHambugerMenu((prev) => !prev);
  };

  const getProducts = async () => {
    try {
      const data = await fetch("api/products");
      const { products } = await data.json();
      setProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        handleHambergur,
        hamburgerMenu,
        isLoading,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
