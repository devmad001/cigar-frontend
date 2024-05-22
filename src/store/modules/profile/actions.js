import { fetchData } from "@/modules/utilities";

export default {
  async getUserInfo(context) {
    let url = "https://hiscigar.com/api/v1/users/profile";
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));
      
    context.commit('setUserInfo', responseData);
  },

   setCroppedAvatar(context, payload) {
    context.commit('setCroppedAvatar', payload);
  },

  setLoader(context, payload) {
    context.commit('setLoader', payload)
  }

}
