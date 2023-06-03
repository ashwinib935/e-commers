import { Routes, Route, Navigate } from "react-router";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import MockAPI from "./components/MockAPI";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import UserProfile from "./pages/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SingleProduct from "./pages/Products/SingleProduct";
function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose="500"
        limit="1"
        style={{ top: "4.5em", right: "0em" }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
        <Route path="/mock-api" element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
