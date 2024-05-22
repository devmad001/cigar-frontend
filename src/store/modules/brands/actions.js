import { fetchData } from "@/modules/utilities";

export default {
  async brands(context) {
    let responseData = []
    await fetchData('https://hiscigar.com/api/v1/brands', null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    context.commit('setBrands', responseData.brands);
  }
};