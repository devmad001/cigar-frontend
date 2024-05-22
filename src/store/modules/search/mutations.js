export default {
  setRequest(state, payload) {
    state.searchRequest = payload.request;
    state.category = payload.category;
  },
  setCategoriesWithProducts(state, payload) {
    state.categoriesWithProducts = payload;
  },
  resetCategoriesWithProducts(state) {
    state.categoriesWithProducts = null;
  },
  setFromSuggestionToTrue(state) {
    state.fromSuggestion = true;
  },
  setFromSuggestionToFalse(state) {
    state.fromSuggestion = false;
  }
};
