export default {
  filters(state) {
    return state.filters;
  },
  activeFilters(state) {
    return state.activeFilters;
  },
  lastActive(state) {
    return state.lastActive;
  },
  isLoading(state) {
    return state.isLoading;
  },
  filtersLastRequestTimestamp(state) {
    return state.filtersLastRequestTimestamp;
  },
  page(state) {
    return state.page;
  }
};
