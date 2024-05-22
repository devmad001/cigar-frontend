import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      filters: null,
      activeFilters: [],
      lastActive: "",
      isLoading: false
    };
  },
  mutations,
  actions,
  getters
}
