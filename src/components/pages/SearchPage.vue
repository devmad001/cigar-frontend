<template>
  <base-meta pageType="search_page"></base-meta>
  <base-categories-wrapper class="m-top-300">
    <!--<test-ads-banner type="small" class="small"></test-ads-banner>-->
    <header-block :title="headerTitle" extended></header-block>
    <search-list 
      :countTitle="countProducts"
      :products="productsList.products"
      :count="productsList.count"
      :categoriesList="categoriesList"
      :categoriesWithProducts="categoriesWithProducts"
    >
      <template v-slot:filters>
        <div v-if="filtersList">
          <range-filter v-for="filter in rangeFilters" :key="filter[0]" :title="filter[0]" :minValue="filter[1].values.min" :maxValue="filter[1].values.max"></range-filter>
          <array-filter v-for="filter in arrayFilters" :key="filter[0]" :title="filter[0]" :values="filter[1].values"></array-filter>
        </div>
        <rating-filter v-if="!isMobileScreen"></rating-filter>
      </template>

      <template v-slot:shape-options v-if="categoryObj()?.title === 'Cigars' && activeFilters?.length === 0">
        <div
          class="item"
          v-for="item in shapeOptions"
          :key="item"
          @click="selectShape(item.name)"
        >
          {{ item.name }}
        </div>
      </template>

      <template v-slot:active-filters>
        <div class="item" v-for="item in activeFilters" :key="item">
          {{ itemValue(item) }}
          <span class="star" v-if="item.type === 'rating'"></span>
          <span
            class="remove"
            @click="disableFilter(item)"
          ></span>
        </div>
      </template>

      <template v-slot:mobile-control>
        <div class="sorting" @click="openMobileSorting">
          <span class="icon"></span>
          <span class="title">Sort By</span>
        </div>

        <base-dialog
          :show="isMobileScreen"
          :reOpen="mobileSortingIsOpen"
          title="Sort by"
          @close="closeModal"
          isFilter
        >
          <sort-input isMobile></sort-input>
        </base-dialog>

        <div class="filter" @click="openMobileFilters">
          <span class="icon"></span>
          <span class="title">Filter</span>
        </div>

        <base-dialog
          :show="isMobileScreen"
          :reOpen="mobileFiltersIsOpen"
          title="Filter"
          @close="closeModal"
          isFilter
        >
          <div class="filters mobile" v-show="mobileFiltersIsOpen">
            <div class="filter_wrapper">
              <div v-if="filtersList">
                <range-filter v-for="filter in rangeFilters" :key="filter[0]" :title="filter[0]" :minValue="filter[1].values.min" :maxValue="filter[1].values.max"></range-filter>
                <array-filter v-for="filter in arrayFilters" :key="filter[0]" :title="filter[0]" :values="filter[1].values"></array-filter>
              </div>
              <rating-filter></rating-filter>
            </div>
              <div class = "ok-button" @click="closeModal">ok</div>
          </div>
        </base-dialog>
      </template>
    </search-list>
    <div class="pagination">
      <pagination v-if="!categoriesWithProducts && productsList.count" v-model="page" :records="productsList.count" :per-page="15" :options="options" @paginate="loadProducts()" />
    </div>
    <test-ads-banner type="footer"></test-ads-banner>
  </base-categories-wrapper>
</template>

<script>
/* eslint-disable */
import { defineAsyncComponent } from 'vue'

import HeaderBlock from "../layout/categoryComponents/HeaderBlock";
import SearchList from "../layout/search/SearchList.vue";
import RatingFilter from "../layout/filters/RatingFilter.vue";
import RangeFilter from '../layout/filters/RangeFilter.vue';
import ArrayFilter from '../layout/filters/ArrayFilter.vue';
import SortInput from '../layout/products/sorting/SortInput.vue';
import ThePagination from '../ui/ThePagination.vue';

import { initCJDeepLinks } from '../../cjDLGenerator.js';

export default {
  components: {
    BaseDialog: defineAsyncComponent(() => 
      import('@/components/ui/BaseDialog')
    ),
    BaseCategoriesWrapper: defineAsyncComponent(() => 
      import('@/components/ui/BaseCategoriesWrapper')
    ),
    HeaderBlock,
    SearchList,
    RatingFilter,
    RangeFilter,
    ArrayFilter,
    SortInput
  },
  data() {
    return {
      screenWidth: 0,
      mobileFiltersIsOpen: false,
      mobileSortingIsOpen: false,
      page: 1,
      options: Object.freeze({
        template: ThePagination,
        edgeNavigation: true,
        texts: {
          first: "<<",
          last: ">>"
        }
      }),
    };
  },
  computed: {
    headerTitle() {
      const category = this.searchCategory;
      const request = this.$store.getters.request;

      let text = "";
      if (request) text = `"${request}" `;
      if (category && category.title !== undefined) {
        text += `${category.title}`;
      } else if (category.title === undefined) {
        let categoryNane = this.$store.getters.categoriesList.find(cat => cat.id === parseInt(category))?.title;
        text += `${categoryNane}`;
      }
      return text;
    },
    searchCategory() {
      return this.$store.getters.category;
    },
    searchRequest() {
      return this.$store.getters.request;
    },
    categoriesWithProducts() {
      return this.$store.getters.categoriesWithProducts;
    },
    categoriesList() {
      return this.$store.getters.category && this.$store.getters.category.id === 0;
    },
    isMobileScreen() {
      return this.screenWidth <= 720;
    },
    productsList() {
      return this.$store.getters.productsList;
    },
    filtersList() {
      return this.$store.getters.filters;
    },
    rangeFilters() {
      if (this.filtersList) return this.$store.getters.filters.filter(f => f[1].type === 'range');
      return null;
    },
    arrayFilters() {
      if (this.filtersList) return this.$store.getters.filters.filter(f => f[1].type === 'array');
      return null;
    },
    countProducts() {
      if (this.productsList) return this.productsList.count + " products found";
      return "0 products found";
    },
    activeFilters() {
      return this.$store.getters.activeFilters;
    },
    shapeOptions() {
      return this.$store.getters.shapeOptions;
    },
    sorting() {
      return this.$store.getters.sorting;
    },
    fromSuggestion() {
      return this.$store.getters.fromSuggestion;
    }
  },
  watch: {
    searchCategory() {
      let params = this.parseActiveFilters(this.activeFilters);
      this.loadProducts(params);
      this.loadFilters(params);
      if (this.categoriesList) this.loadCategoriesWithProducts(params);
    },
    searchRequest: {
      handler(curVal, oldVal) {
        if (curVal && oldVal && curVal != oldVal) this.page = 1;
        let params = this.parseActiveFilters(this.activeFilters);
        //this.loadProducts(params);
        this.loadFilters(params);
        if (this.categoriesList) this.loadCategoriesWithProducts(params);
      },
      deep: true
    },
    $route() {
      if (!this.$route.fullPath.includes('/product')) {
        this.$store.dispatch('disableSorting');
        this.$store.dispatch('disableAllFilters');
      } else {
        let params = this.parseActiveFilters(this.activeFilters);
        this.loadFilters(params);
      }
    },
    activeFilters: {
      handler(curVal) {
        let params = this.parseActiveFilters(curVal);
        this.loadProducts(params);
        this.loadFilters(params);
        if (this.categoriesList) this.loadCategoriesWithProducts(params);
      },
      deep: true
    },
    sorting() {
      let params = this.parseActiveFilters(this.activeFilters);
      if (this.categoriesList) return this.loadCategoriesWithProducts(params);
      this.loadProducts(params);
    },
    productsList(newVal, prevVal) {
      if (newVal?.count && JSON.stringify(newVal) !== JSON.stringify(prevVal)&& newVal.count > 0 && newVal.count <= 15) {
        this.page = 1;
      }
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 720) {
      this.itemsMode = "grid";
    }
    this.buildFilters();
    this.$store.dispatch('loadShapeOptions', { q: this.$store.getters.request });
    const params = this.parseActiveFilters(this.activeFilters);
    if (!this.categoriesList) this.loadProducts(params);
    this.loadFilters(params);
    if (this.categoriesList) this.loadCategoriesWithProducts();
    this.buildCategory();
  },
  mounted() {
    initCJDeepLinks();
  },
  methods: {
    parseActiveFilters(filters) {
      if (filters.filter) {
        let resArr = [];
        filters.filter(function(item){
          let i = resArr.findIndex(x => (x.type == item.type));
          if(i <= -1){
            resArr.push(item);
          }
          return null;  
        });

        let paramsKeys = resArr.map(p => p.type);
        let params = "";
        let values = [];
        let mainValues = "";
        paramsKeys.forEach(el => {
          filters.filter(filter => filter.type === el).forEach(filter => {
            if (filter.type === el && typeof filter.values === 'string' || typeof filter.values === 'number') {
              values.push(encodeURIComponent(filter.values));
            } else if (filter.type === el && typeof filter.values === 'object') {
              mainValues += '&' + el + '_from=' + parseInt(filter.values.min) + '&' + el + '_to=' + parseInt(filter.values.max);
            }
          });
          if (mainValues) {
            params += mainValues;
            mainValues = "";
          } else {
            params += "&" + el + "=" + values.join(',');
          }
          values = [];
        });
        return params;
      }
    },
    itemValue(item) {
      let values = item.values;
      if (typeof values === 'object' && item.type === 'price') return '$' + values.min / 100 + ' - $' + values.max / 100;
      if (typeof values === 'object') return values.min / 100 + ' - ' + values.max / 100;
      return values;
    }, 
    loadProducts(params = "") {
      let categoryParams = '';
      let category = this.categoryObj();

      if (this.page && this.page > 0) categoryParams += '&page=' + this.page;
      if (category && category.id > 0) categoryParams += "&category_id=" + category.id;
      if (category?.id === 2 || category?.title === 'Best Sellers' ) categoryParams += "&best_sellers=true";
      if (this.searchRequest) {
        categoryParams += `&q=${this.searchRequest}`;
        // params += `&q=${this.searchRequest}`;
        if (!this.fromSuggestion) categoryParams += `&title=${this.searchRequest}`;
      }
      if (this.activeFilters) categoryParams += this.parseActiveFilters(this.activeFilters);
      // categoryParams += `&q=${this.searchRequest}}`
      this.replaceState(categoryParams + params);
      const payload = { params: categoryParams + params + this.sorting };
      if (this.$route.path === "/search-results") {
        this.$store.dispatch('loadProducts', payload);
        // !0 === true
      } else if (this.$route.path === "/search-results" && !this.searchCategory.id) {
        this.$store.dispatch('removeCategoriesWithProducts');
      }
      this.scrollToTop();
      setTimeout(() => {
        initCJDeepLinks();
      }, 1500);
    },
    loadCategoriesWithProducts(params = '') {
      let categoryParams = "";
      if (this.searchRequest) categoryParams += `&title=${this.searchRequest}`;
      const payload = { params: categoryParams + params + this.sorting };
      if (this.$route.path === "/search-results") this.$store.dispatch('loadCategoriesWithProducts', payload);
    },
    loadFilters(params = "") {
      let categoryParams = "";
      let category = this.categoryObj();

      if (category && category.id > 0) categoryParams = "&category_id=" + category.id;
      if (category?.id === 2 || category?.title === 'Best Sellers' ) categoryParams += "&best_sellers=true";
      if (this.searchRequest && this.fromSuggestion) categoryParams += `&q=${this.searchRequest}`;
      if (this.searchRequest && !this.fromSuggestion) categoryParams += `&q=${this.searchRequest}&title=${this.searchRequest}`;
      // categoryParams += `&q=${this.searchRequest}}`;
      const payload = { params: categoryParams + params }
      
      if (this.$route.path === "/search-results") {
        this.$store.dispatch('enableLoading');
        this.$store.dispatch('loadFilters', payload);
      }
    },
    selectShape(shape) {
      if (shape) this.$store.dispatch('addToActive', { type: 'shape', values: shape });
    },
    activeMode(mode) {
      return this.itemsMode === mode;
    },
    activateGridMode() {
      this.itemsMode = "grid";
    },
    activateListMode() {
      this.itemsMode = "list";
    },
    disableFilter(payload) {
      this.$store.dispatch('disableFilter', payload);
    },
    openMobileFilters() {
      this.mobileFiltersIsOpen = true;
    },
    openMobileSorting() {
      this.mobileSortingIsOpen = true;
    },
    closeModal() {
      this.mobileFiltersIsOpen = false;
      this.mobileSortingIsOpen = false;
    },
    scrollToTop() {
      const element = document.getElementById("products-list");
      const top = element?.offsetTop - 50;
      window.scrollTo(0, top);
    },
    // TODO: 
    // refactor and fix that there and for productsList controller
    replaceState(params = '') {
      let query = params + this.sorting;

      if (query[0] === '&') query = query.slice(1);

      let current = location.pathname;
      if (query) current += '?' + query;
      window.history.replaceState({ current: current }, document.title, current);
    },
    categoryObj() {
      if (typeof this.searchCategory === "object") return this.searchCategory;
      if (this.$store.getters.categoriesList === null) return { id: 1, title: 'Cigars' }
      return this.$store.getters.categoriesList.find(cat => cat.id === parseInt(this.searchCategory));
    },
    buildFilters() {
      let params = '';
      let splitLocation = window.location.href.split('?');
      let price = {};
      let ring = {};
      let sorting = '';
      let request = '';
      let category = '';

      if (splitLocation.length > 1) params = decodeURIComponent(splitLocation[1]).split('&');
      for (var i = 0; i < params.length; i++) {
        var arr = params[i].split('=');
        if (arr.length == 2 && arr[0] && arr[1]) {
          var key = arr[0];
          var value = decodeURIComponent(arr[1]);
          if (key === 'page') {
            this.page = parseInt(arr[1]);
          }
          else if (key === 'sort_column' || key === 'sort_type') {
            sorting += '&' + key + '=' + value;
          }
          else if (key.includes('price')) {
            if (key.includes('_from')) {
              price.min = value;
            } else if (key.includes('_to')) {
              price.max = value;
            }
          }
          else if (key.includes('ring')) {
            if (key.includes('_from')) {
              ring.min = value
            } else if (key.includes('_to')) {
              ring.max = value;
            }
          } else if (key === 'q') {
            request = value;
          } else if (key === 'category_id') {
            category = value;
          } else if (['title'].indexOf(key) < 0) {
            var values = value.split(',');
            for (var j = 0; j < values.length; j++) {
              if (values[j]) this.$store.dispatch('addToActive', { type: key, values: values[j] });
            }
          }
        }
      }

      if (price.min || price.max) {
        this.$store.dispatch('addToActive', { type: 'price', values: price })
      }

      if (ring.min || ring.max) {
        this.$store.dispatch('addToActive', { type: 'ring', values: ring })
      }

      if (request) {
        this.$store.dispatch('setRequest', { request: request, category: category })
      }

      if (sorting) this.$store.dispatch('setSorting', sorting)
    },
    buildCategory() {
      let category = {}
      if (typeof this.searchCategory !== "object" && this.searchCategory !== null && this.$store.getters.categoriesList) {
        category = this.$store.getters.categoriesList.find(cat => cat.id === parseInt(this.searchCategory));
        this.$store.dispatch('setRequest', { request: this.searchRequest, category: category })
      } else if (this.$store.getters.categoriesList === null){
        category = { id: 1, title: 'Cigars' }
        this.$store.dispatch('setRequest', { request: this.searchRequest, category: category })
      }
    }
  }
};
</script>

<style scoped>
.ad-banner.small { display: none; }
:deep(.VuePagination nav ul) {margin: auto;}

@media screen and (max-width: 720px) {
  .ad-banner.small { display: block; }
}
</style>
