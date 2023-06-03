import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { AuthContext } from "../../context/AuthContextProvider";
import Category from "../../components/Category/Category";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
function Home() {
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const result = await response.json();
      setCategories(result.categories);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="home-container">
        <div className="home-img-container">
          <div className="background-image-container">
            <div className="home-page-btn">
              <button className="btn-home-page">
                <Link to="/products" className="btn-home-page">
                  Shop Now
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="category-container">
          <div className="category-heading text-center">
            <h2>Shop By Category</h2>
            <div className="categories">
              {categories.length > 0 &&
                categories.map((category) => (
                  <Category category={category} key={category._id}></Category>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
