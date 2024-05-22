import { fetchData } from "@/modules/utilities";

export default {
  setRequest(context, payload) {
    context.commit('setRequest', payload);
  },
  async loadCategoriesWithProducts(context, payload) {
    let params = payload.params?.replace('%', '%25');
    let url = "https://hiscigar.com/api/v1/products/search_results?per_page=15" + params;
    let responseData = [];
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setCategoriesWithProducts', responseData);
  },
  removeCategoriesWithProducts(context) {
    context.commit('resetCategoriesWithProducts');
  },
  fromSuggestionOn(context) {
    context.commit('setFromSuggestionToTrue');
  },
  fromSuggestionOff(context) {
    context.commit('setFromSuggestionToFalse');
  }
};
