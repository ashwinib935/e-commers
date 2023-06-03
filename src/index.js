import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import CartContextProvider from "./context/CartContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import FilterContextProvider from "./context/FilterContextProvider";
import WishlistContextProvider from "./context/WishlistContextProvider";
import AddressContextProvider from "./context/AddressContextProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <FilterContextProvider>
                <AddressContextProvider>
                  <App />
                </AddressContextProvider>
              </FilterContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
