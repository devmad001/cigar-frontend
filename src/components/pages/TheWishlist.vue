<template>
  <base-meta pageType="wishlist"></base-meta>
  <base-profile-wrapper title="wishlist">
    <div class="blank-products" v-if="!productsList">
      <div class="image"></div>
      <h2 class="title">no data to display</h2> 
    </div>
    <products-list :onlyList="true" :showCount="true" :countTitle="countProducts" :products="productsList.products"
                   :count="productsList.count" :reload="true" withoutPaginate v-else>
    </products-list>
  </base-profile-wrapper>
  <div class="pagination">
    <pagination v-if="productsList.count" v-model="page" :records="productsList.count" :per-page="15" :options="options" @paginate="loadProducts" />
  </div>
  <test-ads-banner  type="footer"></test-ads-banner>
</template>

<script>
import ProductsList from '../layout/products/ProductsList.vue';
import ThePagination from '../ui/ThePagination.vue';

export default {
  components: {
    ProductsList
  },
  data() {
    return {
      page: 1,
      options: Object.freeze({
        template: ThePagination,
        edgeNavigation: true,
        texts: {
          first: "<<",
          last: ">>"
        }
      }),
    }
  },
  computed: {
    productsList() {
      return this.$store.getters.wishList;
    },
    countProducts() {
      if (this.productsList) return this.productsList.count + " products added";
      return "0 products added";
    }, 
    sorting() {
      return this.$store.getters.sorting;
    },
  },
  watch: {
    sorting(curVal, prevVal) {
      if (curVal && curVal !== prevVal) this.loadProducts();
    }
  },
  methods: {
    loadProducts() {
      let sort = "&sort_column=favorite_at&sort_type=desc";
      if (this.sorting) sort = this.sorting;
      this.$store.dispatch('loadWishlist', "&page=" + this.page + sort);
    }
  }
}
</script>

<style lang="scss" scoped>
  #products-list {
    width: 100%;
    margin-top: 0;
    :deep(.body) { width: 100%; }
  }
  :deep(.VuePagination nav ul) {margin: auto;}

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
