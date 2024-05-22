import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      searchRequest: null,
      category: {
        id: 1,
        title: 'Cigars'
      },
      categoriesWithProducts: null,
      fromSuggestion: false
    };
  },
  mutations,
  actions,
  getters
};
