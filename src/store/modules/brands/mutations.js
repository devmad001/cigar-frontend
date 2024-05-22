export default {
  setBrands(state, payload) {
    if (payload.length >= 12) {
      const [list,chunkSize] = [payload, Math.ceil(payload.length/3)];
      /* eslint-disable */
      state.brands = [...Array(Math.ceil(list.length / chunkSize))].map(_ => list.splice(0,chunkSize));
      /* eslint-enable */
    } else {
      state.brands = payload;
    }
  }
};
