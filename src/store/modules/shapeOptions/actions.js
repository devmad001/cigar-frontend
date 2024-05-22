import { fetchData } from "@/modules/utilities";

export default {
  async loadShapeOptions(context, payload) {
    let url = "https://hiscigar.com/api/v1/products/shape_options";
    if(payload?.q) url += '?q=' + payload.q;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));
    
    const options = responseData.options;
    context.commit('setShapeOptions', options);
  }
};
