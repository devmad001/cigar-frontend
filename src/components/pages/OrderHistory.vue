<template>
  <base-meta pageType="orderhistory"></base-meta>
  <base-profile-wrapper title="order history">
    <div class="blank-products" v-if="!productsList">
      <div class="image"></div>
      <h2 class="title">no data to display</h2>
    </div>
    <products-list 
      :onlyList="true"
      :orderHistory="true"
      :countTitle="countProducts" 
      :products="productsList"
      :count="productsList.count" 
      deleteSvg="delete-svg"
      :reload="true" v-else>
    </products-list>
  </base-profile-wrapper>
  <test-ads-banner type="footer"></test-ads-banner>
</template>

<script>
import ProductsList from '../layout/products/ProductsList.vue';

export default {
  components: {
    ProductsList
  },
  computed: {
    productsList() {
      return this.$store.getters.orderHistory
    },
    countProducts() {
      if (this.productsList) return this.productsList.count + " products added";
      return "0 products added";
    },
  }
}
</script>

<style lang="scss" scoped>
#products-list {
  width: 100%;
  margin-top: 0;
  :deep(.body) { width: 100%; }
}

@media screen and (max-width: 1200px) {
  #products-list {
    width: 100%;
    :deep(.body) {
      .list-header .products-count { width: 100%; }
      .item.list .item_body {
        .prices {
          justify-content: space-between;
          margin-bottom: 0;
          align-items: center;
          .price,
          .old-price {
            font-size: 20px;
            margin-right: 10px;
          }
        }
        a.link {
          width: 200px;
          height: 44px;
        }
      }
    }
  }
}
@media screen and (max-width: 720px) {
  #products-list {
    width: 100%;
    :deep(.body) {
      .list-header .products-count { width: 100%; }
    }
  }
}
</style>