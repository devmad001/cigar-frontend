import { fetchData } from "@/modules/utilities";

export default {
  async loadHotSale(context) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/products?per_page=8&hot_sale=true', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setHotSale', responseData);
  },
};
