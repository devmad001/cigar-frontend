import { fetchData } from "@/modules/utilities";

export default {
  async loadDailyDeals(context) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/products?per_page=3&daily_deals=true', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    const sortedProducts = responseData.products.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
    context.commit('setDailyDeals', sortedProducts);
  },
};