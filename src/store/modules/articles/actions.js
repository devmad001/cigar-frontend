import { fetchData } from "@/modules/utilities";

export default {
  async getArticlesList(context, payload) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/articles', payload,context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    if (payload?.type && payload?.type === 'news') {
      context.commit('setNewsList', responseData);
    } else {
      context.commit('setArticlesList', responseData);
    }
  },
};
