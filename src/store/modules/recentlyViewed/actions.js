import { fetchData } from "@/modules/utilities";

export default {
  async loadViewedProduct(context) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/products?viewed=true&per_page=15', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setViewedProduct', responseData);
  }
};
