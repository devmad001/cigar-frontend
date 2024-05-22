export default {
  setProducts(state, payload) {
    state.products = payload;
  },
  updateProduct(state, payload) {
    const product = state.products.products?.find(pr => pr.id === payload.id);
    if(product) product.favorite = !product?.favorite;
  },
  setProductsLastRequestTimestamp(state, payload) {
    state.productsLastRequestTimestamp = payload;
  }
};
