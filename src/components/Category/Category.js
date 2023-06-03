import React, { useContext } from "react";
import "./Category.css";
import { useNavigate } from "react-router";
import { FilterContext } from "../../context/FilterContextProvider";
function Category({ category }) {
  const navigate = useNavigate();
  const { filterDispatch } = useContext(FilterContext);
  const handleCategory = (categoryName) => {
    filterDispatch({ type: "HOME_CATEGORY", payload: categoryName });
    navigate("/products");
  };
  return (
    <>
      <div
        className="card-category-container"
        onClick={() => handleCategory(category.categoryName)}
      >
        <div className="card-category-horizontal">
          <div className="category-img-container">
            <div className="category-img">
              <h4>{category.categoryName}</h4>
            </div>
          </div>
          <div className="card-info">
            <div className="card-title">
              <div>
                <h3 className="category-title">{category.categoryName}</h3>
                <p className="card-description">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
