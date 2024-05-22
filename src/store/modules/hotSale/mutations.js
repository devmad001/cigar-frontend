export default {
  setHotSale(state, payload) {
    state.hotSaleproducts = payload.products;
  },
  updateHotSaleProducts(state, payload) {
    state.hotSaleproducts = state.hotSaleproducts.map(pr => {
      if(pr.id === payload.id) return { ...pr, favorite: !pr.favorite}
      return pr
    });
  }
}