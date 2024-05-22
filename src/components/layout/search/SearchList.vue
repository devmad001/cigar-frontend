<template>
  <section id="products-list" class="flex_wrapper flex_between">
    <div class=filters v-if="!onlyList">
      <div class="filter_wrapper">
        <slot name="filters"></slot>
      </div>

      <test-ads-banner  type="filter"></test-ads-banner>
    </div>
    <div class="body">
      <div class="list-header flex_wrapper flex_between desktop" v-if="count > 0">
        <h2 class="products-count desktop">{{ countTitle }}</h2>
        <sort-input></sort-input>
        <div class="view-control flex_wrapper" v-if="!isMobileScreen">
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

      <div class="shape-options" 
        v-if="!onlyList && this.$store.getters.activeFilters?.length === 0"
      >
        <slot name="shape-options"></slot>
      </div>

      <div class="list-header flex_wrapper flex_between mobile" v-if="count > 0">
        <h2 class="products-count mobile">{{ countTitle }}</h2>
      </div>

      <div class="blank-products" v-if="!productsList">
        <div class="image"></div>
        <h2 class="title">no data to display</h2> 
      </div>
      <div v-else>
        <div v-if="categoriesList && categoriesWithProducts">
          <div 
            class="category"
            v-for="category in categoriesWithProducts.categories.filter(cat => cat.products)" 
            :key="category.id"
          >
            <p class="title">{{category.title}}</p>
            <div class="product-items" :class="itemsMode">
              <product-preview 
                v-for="product in category.products" 
                :key="product.id"
                :id="product.id"
                :imageUrl="product.image_url"
                :name="product.title"
                :oldPrice="product.old_price" 
                :price="product.price" 
                :class="[itemsMode, noHover ? 'no-hover' : '']" 
                :isFavorite="product.favorite"
                :specs="product.specifications"
                :seller="product.seller"
                :link="product.link"
                :clickLink="product.click_link"
                :rating="product.rating"
                :reload="hardReload"
                :category="category"
                :slug="product.slug"
              >
              </product-preview>
            </div>
            <div class="show-more" @click="setRequest(category)">Show More →</div>
          </div>
        </div>
        <div class="product-items" :class="itemsMode" v-else>
          <product-preview 
            v-for="product in productsList" 
            :key="product.id"
            :id="product.id"
            :imageUrl="product.image_url"
            :name="product.title"
            :oldPrice="product.old_price" 
            :price="product.price" 
            :class="[itemsMode, noHover ? 'no-hover' : '']" 
            :isFavorite="product.favorite"
            :specs="product.specifications"
            :seller="product.seller"
            :link="product.link"
            :clickLink="product.click_link"
            :rating="product.rating"
            :reload="hardReload"
            :slug="product.slug"
          >
          </product-preview>
        </div>
      </div>
    </div>      
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import SortInput from '../products/sorting/SortInput.vue';

export default {
  props: {
    onlyList: {
      type: Boolean,
      default: false
    },
    countTitle: {
      type: String,
      default: "0 products found"
    },
    count:{
      type: Number,
      default: 0
    },
    products: {
      type: Array,
      default: null
    },
    categoriesWithProducts: {
      type: Object,
      default: null
    },
    reload: {
      type: Boolean,
      default: false
    },
    categoriesList: {
      type: Boolean,
      default: false
    }
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
    currentCategory() {
      return this.$store.getters.category;
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
    setRequest(category) {
      this.$store.dispatch('setRequest', { request: this.$store.getters.request, category: { id: category.id, title: category.title } });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/ProductsList.scss";
@import '@/styles/BlankPage.scss';

#products-list {
  //products list
  .body {
    // Category with products
    .category {
      margin-bottom: 50px;

      .title {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        color: #393939;
        text-align: left;
      }
      
      .show-more {
        text-align: left;
        font-size: 18px;
        line-height: 22px;
        color: #B26D28;
        cursor: pointer;
      }
    }

    //products list view
    .product-items { margin-top: 30px; }
  }
}
@media screen and (max-width: 720px){
  #products-list {
    
    .body { 
      .list-header.desktop { padding-bottom: 0; }
      .list-header.mobile { margin-top: 0; }
    }
  }
}
@media screen and (max-width: 576px){
  #products-list {
    margin-top: 0;

    .body .product-items.list { 
      display: flex; 
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .mobile-control,
    .active-filters,
    .shape-options,
    .list-header.mobile {
      padding: 0 11px;
    }
  }
}
</style>
