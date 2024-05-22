import { fetchData } from "@/modules/utilities";

export default {
  async loadWishlist(context, params = "") {
    let url = "https://hiscigar.com/api/v1/products?per_page=15&favorite=true" + params;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setWishlist', responseData);
  }
};
