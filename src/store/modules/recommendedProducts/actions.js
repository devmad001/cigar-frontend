import { fetchData } from "@/modules/utilities";

export default {
  async loadRecommendedProducts(context) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/products?recommendations=true', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setRecommended', responseData.products);
  }
};
