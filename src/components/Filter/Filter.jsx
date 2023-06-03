import React, { useContext } from "react";
import "./Filter.css";
import { FilterContext } from "../../context/FilterContextProvider";
import { ProductContext } from "../../context/ProductContextProvider";
function Filter() {
  const { hamburgerMenu } = useContext(ProductContext);
  const { state, filterDispatch } = useContext(FilterContext);

  const handleSortChange = (sortValue) => {
    filterDispatch({ type: "SORT", payload: sortValue });
  };
  const handleCategory = (e, option) => {
    let check = e.target.checked;
    filterDispatch({ type: "CATEGORY", payload: { option, check } });
  };
  const handlePriceRange = (rangeValue) => {
    filterDispatch({ type: "PRICE_RANGE", payload: rangeValue });
  };
  const handleRating = (ratingValue) => {
    filterDispatch({ type: "RATING", payload: ratingValue });
  };
  const handleClear = (clear) => {
    filterDispatch({ type: "CLEAR", payload: clear });
  };
  return (
    <div
      className={`filter-container ${hamburgerMenu ? "trans-on" : "trans-off"}`}
    >
      <div className="filter-head">
        <h4>Filters</h4>
        <p
          className="filter-btn-clear"
          value="clear"
          onClick={(e) => handleClear(e.target.value)}
        >
          Clear
        </p>
      </div>
      <div className="filter-price">
        <h4>Price</h4>
        <div className="price-range-and-slider">
          <div className="price-range">
            <p>100</p>
            <p>500</p>
            <p>1000</p>
          </div>
          <input
            type="range"
            name="rangeInput"
            className="slider"
            min="100"
            max="1000"
            defaultValue={state.priceRange}
            onChange={(e) => handlePriceRange(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-category">
        <h4>Category</h4>
        <div className="filter-subcontainer">
          <label className="select-input">
            <input
              type="checkbox"
              name="light"
              className="checkbox-input"
              value="Motivation"
              checked={state.category.includes("Motivation")}
              onChange={(e) => handleCategory(e, "Motivation")}
            />
            <span className="text">Motivation</span>
          </label>
          <label className="select-input">
            <input
              type="checkbox"
              name="light"
              className="checkbox-input"
              value="Business"
              checked={state.category.includes("Business")}
              onChange={(e) => handleCategory(e, "Business")}
            />
            <span className="text">Business</span>
          </label>
          <label className="select-input">
            <input
              type="checkbox"
              name="light"
              className="checkbox-input"
              value="Comics"
              checked={state.category.includes("Comics")}
              onChange={(e) => handleCategory(e, "Comics")}
            />
            <span className="text">Comics</span>
          </label>
        </div>
      </div>
      <div className="filter-rating">
        <h4>Rating</h4>
        <div className="filter-subcontainer">
          <label className="select-input">
            <input
              type="radio"
              name="light"
              className="radio-input"
              value="1"
              checked={state.rating === "1"}
              onChange={(e) => handleRating(e.target.value)}
            />
            <span className="text">1 stars & above</span>
          </label>
          <label className="select-input">
            <input
              type="radio"
              name="light"
              className="radio-input"
              value="2"
              checked={state.rating === "2"}
              onChange={(e) => handleRating(e.target.value)}
            />
            <span className="text">2 stars & above</span>
          </label>
          <label className="select-input">
            <input
              type="radio"
              name="light"
              className="radio-input"
              value="3"
              checked={state.rating === "3"}
              onChange={(e) => handleRating(e.target.value)}
            />
            <span className="text">3 stars & above</span>
          </label>
          <label className="select-input">
            <input
              type="radio"
              name="light"
              className="radio-input"
              value="4"
              checked={state.rating === "4"}
              onChange={(e) => handleRating(e.target.value)}
            />
            <span className="text">4 stars & above</span>
          </label>
        </div>
      </div>
      <div className="filter-sort">
        <h4>Sort by price</h4>
        <div className="filter-subcontainer">
          <label className="select-input">
            <input
              type="radio"
              name="light-1"
              className="radio-input"
              value="LTH"
              checked={state.sort === "LTH"}
              onChange={(e) => handleSortChange(e.target.value)}
            />
            <span className="text">price-Low-to-High</span>
          </label>
          <label className="select-input">
            <input
              type="radio"
              name="light-1"
              className="radio-input"
              value="HTL"
              checked={state.sort === "HTL"}
              onChange={(e) => handleSortChange(e.target.value)}
            />
            <span className="text">price-High-to-Low</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
