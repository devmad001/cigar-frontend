export default {
  setUserData(state, payload) {
    state.userData = payload.userData;
    state.token = payload.token;
    state.userId = payload.userId;
    state.userName = payload.userName;
    state.avatar = payload.avatar;
  }
};
