<template>
  <div id="product-wrapper" class="base-wrapper product">
    <the-title 
      :titleCategory="titleCategory" 
      :titleProduct="titleProduct"
      :productCategotyId="productCategotyId" 
    ></the-title>
    <div class="body flex_wrapper flex_between">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheTitle from '../layout/OneProductComponents/TheTitleOneProduct.vue';

export default {
  props: {
    titleCategory: {
      type: String
    },
    titleProduct: {
      type: String
    },
    productCategotyId: {
      type: Number,
    }
  },
  components: {
    TheTitle,
  }
}
</script>

<style lang="scss" scoped>
#product-wrapper{
  .body { width: 100%; }
}

@media screen and (max-width: 1440px) {
  .product {
    max-width: 1280px;
    padding: 0 50px;
  }
}

@media screen and (max-width: 850px) {
  .product {
    max-width: 90%;
    padding: 0 50px ;
  } 
}

@media screen and (max-width: 720px) {
  .product {
    max-width: unset;
    padding: 0 10px;
  }
}



</style>
