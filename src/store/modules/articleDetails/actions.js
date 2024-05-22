import { fetchData } from "@/modules/utilities";

export default {
  async articlesDetails(context, payload) {
    let url = "https://hiscigar.com/api/v1/articles/" + payload;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setArticlesDetails', responseData);
  },
};
