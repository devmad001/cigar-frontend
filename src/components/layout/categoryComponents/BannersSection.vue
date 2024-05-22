<template>
  <section id="banners" class="flex_wrapper flex_between" v-show="!isMobileScreen">
    <test-ads-banner type="small"></test-ads-banner>
    <test-ads-banner type="small"></test-ads-banner>
    <test-ads-banner type="small"></test-ads-banner>
    <test-ads-banner type="small"></test-ads-banner>
  </section>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: 0
    };
  },
  computed: {
    isMobileScreen() {
      return this.screenWidth <= 720;
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
  }
};
</script>

<style lang="scss" scoped>
#banners {
  margin-bottom: 50px;
  .ad-banner { margin: 50px 0; }
}

@media screen and (max-width: 1100px){
  .ad-banner:last-child { display: none; }
}

@media screen and (max-width: 800px){
  .ad-banner:nth-child(2n) { display: none; }
}

@media screen and (max-width: 720px){
  #banners { display: none; }
}

/*@media screen and (max-width: 540px){*/
  /*.flex_between { justify-content: center; }*/
  /*.ad-banner { display: none; }*/
  /*.ad-banner:first-child { display: block; }*/
/*}*/
</style>
