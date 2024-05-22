import { fetchData } from "@/modules/utilities";

export default {
  async getReviewsList(context, payload) {
    let url = "https://hiscigar.com/api/v1/reviews?product_id=" + payload + "&per_page=3";
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setReviewsList', responseData);
  },

  async reviewsListPagination(context, payload) {
    let url = "https://hiscigar.com/api/v1/reviews?product_id=" + payload.id + "&per_page=3" + payload?.params;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setReviewsList', responseData);
  },
};
