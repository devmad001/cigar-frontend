<template>
  <section id="products-list" class="flex_wrapper flex_between">
    <div class=filters v-if="!onlyList">
      <div class="filter_wrapper">
        <slot name="filters"></slot>
      </div>

      <test-ads-banner  type="filter"></test-ads-banner>
    </div>
    <div class="body">
      <div class="list-header flex_wrapper flex_between desktop" v-if="count > 0 && showCount">
        <h2 class="products-count desktop" v-if="showCount">{{ countTitle }}</h2>
        <sort-input v-show="wichList"></sort-input>
        <div class="view-control flex_wrapper view-active" v-if="!isMobileScreen">
          <div class="list" @click="activateListMode" :class="{active: activeMode('list')}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="4" rx="1" fill="#F2E2D3"/>
              <rect y="6" width="16" height="4" rx="1" fill="#F2E2D3"/>
              <rect y="12" width="16" height="4" rx="1" fill="#F2E2D3"/>
            </svg>
          </div>
          <div class="grid" @click="activateGridMode" :class="{active: activeMode('grid')}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="path-1-inside-1" fill="white">
                  <rect width="7" height="7" rx="1"/>
              </mask>
              <rect width="7" height="7" rx="1" fill="#F2E2D3" stroke="#F2E2D3" stroke-width="4" mask="url(#path-1-inside-1)"/>
              <mask id="path-2-inside-2" fill="white">
                  <rect y="9" width="7" height="7" rx="1"/>
              </mask>
              <rect y="9" width="7" height="7" rx="1" fill="#F2E2D3" stroke="#F2E2D3" stroke-width="4" mask="url(#path-2-inside-2)"/>
              <mask id="path-3-inside-3" fill="white">
                  <rect x="9" y="9" width="7" height="7" rx="1"/>
              </mask>
              <rect x="9" y="9" width="7" height="7" rx="1" fill="#F2E2D3" stroke="#F2E2D3" stroke-width="4" mask="url(#path-3-inside-3)"/>
                  <mask id="path-4-inside-4" fill="white">
              <rect x="9" width="7" height="7" rx="1"/>
              </mask>
              <rect x="9" width="7" height="7" rx="1" fill="#F2E2D3" stroke="#F2E2D3" stroke-width="4" mask="url(#path-4-inside-4)"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="mobile-control" v-if="!onlyList">
        <slot name="mobile-control"></slot>
      </div>

      <div class="active-filters" v-if="!onlyList">
        <slot name="active-filters"></slot>
      </div>

      <div class="shape-options" v-if="!onlyList && this.$store.getters.activeFilters?.length === 0 && currentCategory?.title === 'Cigars'">
        <slot name="shape-options"></slot>
      </div>

      <div class="list-header flex_wrapper flex_between mobile" v-if="count > 0 && showCount">
        <h2 class="products-count mobile" v-if="showCount">{{ countTitle }}</h2>
      </div>

      <div class="blank-products" v-if="!productsList">
        <div class="image"></div>
        <h2 class="title">no data to display</h2> 
      </div>
      <div v-else>
        <div class="product-items" :class="itemsMode">
          <!-- TODO: refactor product props -->
          <product-preview
            v-for="product in productsList"
            :key="product.id"
            :date="product.purchased_at"
            :id="product.id"
            :imageUrl="product.image_url"
            :name="product.title"
            :oldPrice="product.old_price" 
            :price="product.price" 
            :class="[itemsMode, noHover ? 'no-hover' : '', 'order-histry']"
            :deleteSvg="deleteSvg"
            :isFavorite="product.favorite"
            :specs="product.specifications"
            :seller="product.seller"
            :link="product.link"
            :clickLink="product.click_link"
            :rating="product.rating"
            :reload="hardReload"
            :isOrderHistory="orderHistory"
            :slug="product.slug"
          >
          </product-preview>
        </div>

        <pagination v-if="!withoutPaginate" v-model="page" :records="productsCount" :per-page="15" :options="options" @paginate="loadProducts" />
      </div>
    </div>      
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ThePagination from '../../ui/ThePagination.vue';
import SortInput from './sorting/SortInput.vue';

import { initCJDeepLinks } from '../../../cjDLGenerator.js'

export default {
  props: {
    wichList: {
      type: Boolean,
      default: true
    },
    class: String,
    onlyList: {
      type: Boolean,
      default: false
    },
    orderHistory: {
      type: Boolean,
      default: false
    },
    showCount: {
      type: Boolean,
      default: false
    },
    countTitle: {
      type: String,
      default: "0 products found"
    },
    count: {
      type: Number,
      default: 0
    },
    startPage: {
      type: Number,
      default: 1
    },
    products: {
      type: Array,
      default: null
    },
    reload: {
      type: Boolean,
      default: false
    },
    withoutPaginate: {
      type: Boolean,
      default: false
    },
    deleteSvg: String
  },
  components: {
    ProductPreview: defineAsyncComponent(() => 
      import('@/components/layout/products/ProductPreview')
    ),
    SortInput
  },
  data() { 
    return {
      itemsMode: 'list',
      noHover: false,
      page: this.startPage,
      options: Object.freeze({
        template: ThePagination,
        edgeNavigation: true,
        texts: {
          first: "<<",
          last: ">>"
        }
      }),
      screenWidth: 0,
      mobileFiltersIsOpen: false,
      mobileSortingIsOpen: false
    }
  },
  computed: {
    isMobileScreen() {
      return this.screenWidth <= 720;
    },
    productsList() {
      if (this.products && this.products.length > 0) return this.products;
      return null;
    },
    productsCount() {
      return this.count;
    },
    hardReload() {
      return this.reload;
    },
    sorting() {
      return this.$store.getters.sorting;
    },
    currentCategory() {
      return this.$store.getters.categoriesList?.find(i => i.id === parseInt(this.categoryId(this.$route.params.slug || '')));
    }
  },
   watch: {
    $route(to, from) {
      if (from.params.slug !== to.params.slug) this.page = 1;
    },
    sorting(curVal, prevVal) {
      if (curVal && curVal !== prevVal) this.loadProducts();
    },
    page: {
      handler() {
        this.replaceState()
      },
      deep: true
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 720) {
      this.itemsMode = 'list';
      this.noHover = true;
    }
  },
  methods: {
    activeMode(mode) {
      return this.itemsMode === mode;
    },
    activateGridMode() {
      this.itemsMode = 'grid';
    },
     activateListMode() {
      this.itemsMode = 'list';
    },
    activeFilters(){
      // TODO: DRY that
      const filters = this.$store.getters.activeFilters;
      if (filters) {
        let resArr = [];
        filters.filter(function(item){
          let i = resArr.findIndex(x => (x.type == item.type));
          if(i <= -1){
            resArr.push(item);
          }
          return null;  
        });

        let paramsKeys = resArr.map(p => p.type);
        let params = '';
        let values = '';
        let mainValues = '';
        paramsKeys.forEach(el => {
          filters.filter(filter => filter.type === el).forEach(filter => {
            if (filter.type === el && typeof filter.values === 'string' || typeof filter.values === 'number') {
              values += encodeURIComponent(filter.values) + ',';
            } else if (filter.type === el && typeof filter.values === 'object') {
              mainValues += '&' + el + '_from=' + parseInt(filter.values.min) + '&' + el + '_to=' + parseInt(filter.values.max);
            }
          })
          if (mainValues) {
            params += mainValues;
            mainValues = '';
          } else {
            params += '&' + el + '=' + values;
          }
          values = '';
        });
        return params;
      }
    },
    loadProducts() {
      let categoryParams = "&category_id=" + this.$route.params.slug.split('-')[0] + "&page=" + this.page;
      if (this.pageHeader === 'Best Sellers') categoryParams = "&best_sellers=true";
      const payload = { params: categoryParams + this.activeFilters() + this.sorting }
      this.$store.dispatch('loadProducts', payload);
      this.scrollToTop();
      setTimeout(() => {
        initCJDeepLinks();
      }, 1500);
    },
    scrollToTop() {
      const element = document.getElementById("products-list");
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
    replaceState() {
      let query = this.activeFilters() + this.sorting;
      if (this.page && this.page > 1) query += '&page=' + this.page;
      if (query[0] === '&') query = query.slice(1);
      let obj = { current: location.pathname + '?' + query };
      if (query) window.history.replaceState(obj, document.title, obj.current);
    },
    categoryId(slug) {
      return slug.split('-')[0];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ProductsList.scss";
@import '@/styles/BlankPage.scss';

.pagination-image {
  margin: 30px 0 70px 0;
  display: flex;
}

#products-list {
  //filters block
  .filters { min-width: 25%; }

  //products list
  .body {
    min-width: 75%;

    //products list view
    .product-items { margin-top: 15px; }
  }
  .view-active { cursor: pointer; }
}
@media screen and (max-width: 720px){
  #products-list {
    .body { 
      .list-header.desktop { padding-bottom: 10px; }
      .list-header.mobile { margin-top: 5px; }
    }
  }
}
@media screen and (max-width: 540px){
  #products-list {
    .body .product-items.list { 
      display: flex; 
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
}
</style>
