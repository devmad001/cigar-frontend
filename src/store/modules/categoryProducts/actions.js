export default {
  async loadProducts(context, payload) {
    let productsLastRequestTimestamp = new Date();
    context.commit('setProductsLastRequestTimestamp', productsLastRequestTimestamp);

    const params = payload.params;
    let url = "https://hiscigar.com/api/v1/products?per_page=15" + params;

    const token = context.getters.token;

    const response = await fetch(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': token
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error);
      throw error;
    }

    if (productsLastRequestTimestamp === context.getters.productsLastRequestTimestamp) {
      context.commit('setProducts', responseData);
    }
  },

  async addToWishlist(context, payload) {
    return context.dispatch('requestToWishlist', {
      id: payload.id,
      mode: 'add',
      updateAction: payload.updateAction
    });
  },

  async removeFromWishlist(context, payload) {
    return context.dispatch('requestToWishlist', {
      id: payload.id,
      mode: 'remove',
      hardReload: payload.hardReload,
      updateAction: payload.updateAction
    });
  },
  
  async requestToWishlist(context, payload) {
    let url = "https://hiscigar.com/api/v1/products/" + payload.id + "/save";
    let method = 'POST';
    if (payload.mode === 'remove') { 
      url = "https://hiscigar.com/api/v1/products/" + payload.id + "/remove"; 
      method = 'DELETE';
    }
    const token = context.getters.token;

    const response = await fetch(
      url, 
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': token
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.errors || 'add/remove to Wishlist is failed. Please try again');
      throw error;
    }
    if (!payload.hardReload) {
      context.commit(payload.updateAction || 'updateProduct', payload);
    }
 
    context.dispatch('loadWishlist', "&sort_column=favorite_at&sort_type=desc");
  }
};