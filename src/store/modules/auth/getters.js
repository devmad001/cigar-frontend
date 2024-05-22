export default {
  userId(state) {
    return state.userId;
  },
  userData(state) {
    return state.userData;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  userName(state) {
    return state.userName;
  },
  avatar(state) {
    return state.avatar;
  }
};
