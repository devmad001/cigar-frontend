export default {
  setUserInfo(state, payload) {
    state.currentUser = payload;
  },
  setCroppedAvatar(state, payload) {
    state.croppedAvatar = payload;
  },
  setLoader(state, payload) {
    state.loader = payload;
  }
}; 
