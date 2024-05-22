import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      currentUser: {},
      croppedAvatar: null,
      loader: false
    };
  },
  mutations,
  actions,
  getters
}
