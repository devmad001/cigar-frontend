import { fetchData } from "@/modules/utilities";

export default {
  async categories(context) {
    let responseData = []
    
    await fetchData('https://hiscigar.com/api/v1/categories', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setCategories', responseData.categories);
  }
};
