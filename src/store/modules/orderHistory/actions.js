import { fetchData } from "@/modules/utilities";

export default {
  async loadOrderHistory(context) {
    let responseData = [];
    
    await fetchData('https://hiscigar.com/api/v1/products?per_page=15&purchased=true', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    const sortedProducts = responseData.products.sort((a, b) => {
      let firstDate = new Date(a.purchased_at);
      let secondDate = new Date(b.purchased_at);
      return secondDate - firstDate;
    });

    context.commit('setOrderHistory', sortedProducts);
  },
};
