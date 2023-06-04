export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, search: action.payload };
    case "CLEAR":
      return {
        ...state,
        search: "",
        priceRange: "",
        category: [],
        rating: 0,
        sort: 0,
      };
    case "PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "CATEGORY":
      return {
        ...state,
        category: action.payload.check
          ? [...state.category, action.payload.option]
          : state.category.length > 0
          ? state.category.filter(
              (categoryValue) => categoryValue !== action.payload.option
            )
          : [],
      };
    case "RATING":
      return { ...state, rating: action.payload };
    case "SORT":
      return { ...state, sort: action.payload };
    case "HOME_CATEGORY":
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    default:
      return state;
  }
};
