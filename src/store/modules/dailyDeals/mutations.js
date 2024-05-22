export default {
  setDailyDeals(state, payload) {
    state.dailyDeals = payload;
  },
  updateDailyDealsProducts(state, payload) {
    state.dailyDeals = state.dailyDeals.map(pr => {
      if(pr.id === payload.id) return { ...pr, favorite: !pr.favorite}
      return pr
    });
  }
}