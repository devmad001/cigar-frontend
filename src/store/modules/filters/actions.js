import { fetchData } from "@/modules/utilities";

export default {
  async loadFilters(context, payload) {
    let filtersLastRequestTimestamp = new Date();
    context.commit('setFiltersLastRequestTimestamp', filtersLastRequestTimestamp);

    let params = payload.params;
    let url = "https://hiscigar.com/api/v1/products/filters?per_page=15" + params;
    if (context.getters.lastActive) url += "&last_active=" + context.getters.lastActive;
    let responseData = []
    
    await fetchData(url, null, context.getters.token)
      .then((res) => responseData = res)
      .catch((err) => console.log(err));

    if (responseData.filters !== undefined && filtersLastRequestTimestamp === context.getters.filtersLastRequestTimestamp) {
      context.commit('setFilters', Object.entries(editFilterItems(responseData.filters)));
      context.dispatch('disableLoading');
      return
    }

    return null;
  },
  addToActive(context, payload) {
    context.commit('addToActive', payload);
  },
  disableFilter(context, payload) {
    context.commit('removeFromActive', payload);
  },
  setPage(context, payload) {
    context.commit('setPage', payload);
  },
  disableAllFilters(context) {
    context.commit('disableAll');
  },
  addToLastActive(context, payload) {
    context.commit('setLastActive', payload);
  },
  enableLoading(context) {
    context.commit('changeLoading', true);
  },
  disableLoading(context) {
    context.commit('changeLoading', false);
  }
};

const editFilterItems = (filters) => {
  let filterItemsToRemove = ["3", "4", "5", "6", "7", "8", "9"];
  if (filters?.strength){
    let copyFilters = {...filters};
    let editedStrengthList = filters.strength.values.filter(item => !filterItemsToRemove.includes(item.name));
    copyFilters.strength.values = editedStrengthList;
    return copyFilters;
  }
  else {
    return filters
  }
};
