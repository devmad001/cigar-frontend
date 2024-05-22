import { fetchData } from "@/modules/utilities";

export default {
  async loadProductDetails(context, payload) {
    let url = `https://hiscigar.com/api/v1/products/${payload.id}`;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setProductDetails', responseData);
  }
};
