import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      userId: null,
      userName: null,
      avatar: null,
      token: null,
      userData: null,
    };
  },
  mutations,
  actions,
  getters
}
