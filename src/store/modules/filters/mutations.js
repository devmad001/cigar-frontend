export default {
  setFilters(state, payload) {
    state.filters = payload;
  },
  addToActive(state, payload) {
    if (typeof payload.values === 'object' && state.activeFilters.find(obj => obj.type === payload.type)) {
      let index = state.activeFilters.findIndex(obj => obj.type === payload.type);
      state.activeFilters[index] = payload;
      return;
    } 
    if (state.activeFilters.find(obj => obj.type === payload.type && obj.values === payload.values)) {
      let index = state.activeFilters.findIndex(obj => obj.type === payload.type && obj.values === payload.values);
      state.activeFilters.splice(index, 1);
      return;
    }
    state.activeFilters.push(payload)
  },
  removeFromActive(state, payload) {
    let index = state.activeFilters.findIndex(obj => obj.type === payload.type && obj.values === payload.values);
    state.activeFilters.splice(index, 1);
  },
  disableAll(state) {
    state.activeFilters = [];
  },
  setLastActive(state, payload) {
    state.lastActive = payload;
  },
  changeLoading(state, payload) {
    state.isLoading = payload;
  },
  setFiltersLastRequestTimestamp(state, payload) {
    state.filtersLastRequestTimestamp = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  }
};
