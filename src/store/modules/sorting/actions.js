export default {
  setSorting(context, payload) {
    context.commit('setSorting', payload);
  },
  disableSorting(context) {
    context.commit('setSorting', '');
  },
};
