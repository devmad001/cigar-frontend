export default {
  request(state) {
    return state.searchRequest;
  },
  category(state) {
    return state.category;
  },
  categoriesWithProducts(state) {
    return state.categoriesWithProducts;
  },
  fromSuggestion(state) {
    return state.fromSuggestion;
  }
};
