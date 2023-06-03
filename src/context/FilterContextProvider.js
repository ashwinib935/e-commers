import React, { createContext, useReducer } from "react";
import { reducerFunc } from "../reducer/reducerFunc";
export const FilterContext = createContext();

function FilterContextProvider({ children }) {
  const [state, filterDispatch] = useReducer(reducerFunc, {
    search: "",
    priceRange: 0,
    category: [],
    rating: 0,
    sort: 0,
  });

  return (
    <FilterContext.Provider value={{ filterDispatch, state }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
