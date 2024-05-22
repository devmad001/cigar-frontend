<template>
  <base-meta :titleProp="pageHeader + ' | Cigar Finder'"></base-meta>
  <base-categories-wrapper>
    <div v-if="pageHeader === 'E-Cigarettes'">
      <header-block :accentText="pageHeader" title="Categories"></header-block>
      <e-cigarettes-page></e-cigarettes-page>
    </div>
    <div v-else>
      <header-block :title="pageHeader" class="not-e-cigarettes"></header-block>
      <products-list
        :countTitle="countProducts"
        :products="productsList.products"
        :count="productsList.count"
        :startPage="page"
        showCount
      >
        <template v-slot:filters>
          <base-spinner v-show="isLoading"></base-spinner>
          <div v-show="filtersList && !isLoading">
            <range-filter v-for="filter in rangeFilters" :key="filter[0] + filter[1].values.max" :title="filter[0]" :minValue="filter[1].values.min" :maxValue="filter[1].values.max"></range-filter>
            <array-filter v-for="filter in arrayFilters" :key="filter[0]" :title="filter[0]" :values="filter[1].values"></array-filter>
          </div>
          <rating-filter v-if="!isMobileScreen && !isLoading"></rating-filter>
        </template>

        <template v-slot:shape-options v-if="currentCategory?.title === 'Cigars' && activeFilters?.length === 0">
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
          <!-- TODO: refactor with component -->
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
      </products-list>
    </div>
    <banners-section></banners-section>
    <test-ads-banner type="footer"></test-ads-banner>
  </base-categories-wrapper>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import BannersSection from "../layout/categoryComponents/BannersSection";
import HeaderBlock from "../layout/categoryComponents/HeaderBlock";
import ProductsList from "../layout/products/ProductsList";
import RatingFilter from "../layout/filters/RatingFilter.vue";
import RangeFilter from '../layout/filters/RangeFilter.vue';
import ArrayFilter from '../layout/filters/ArrayFilter.vue';
import ECigarettesPage from '../layout/categoryComponents/ECigarettesComponent.vue';
import SortInput from '../layout/products/sorting/SortInput.vue';

import { initCJDeepLinks } from '../../cjDLGenerator.js'

export default {
  components: {
    BaseDialog: defineAsyncComponent(() => 
      import('@/components/ui/BaseDialog')
    ),
    BaseCategoriesWrapper: defineAsyncComponent(() => 
      import('@/components/ui/BaseCategoriesWrapper')
    ),
    BannersSection,
    HeaderBlock,
    ProductsList,
    RatingFilter,
    RangeFilter,
    ArrayFilter,
    ECigarettesPage,
    SortInput
  },
  data() {
    return {
      screenWidth: 0,
      mobileFiltersIsOpen: false,
      mobileSortingIsOpen: false
    };
  },
  computed: {
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
    pageHeader() {
      const categories = this.$store.getters.categoriesList;
      if (categories && this.$route.params.slug && this.$route.path.includes('/categories')) return categories.find(cat => cat.id.toString() === this.categoryId(this.$route.params.slug)).title;
      return "";
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
    page() {
      return this.$store.getters.page;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    currentCategory() {
      return this.$store.getters.categoriesList?.find(i => i.id === parseInt(this.categoryId(this.$route.params.slug || '')));
    }
  },
  watch: {
    pageHeader(curVal) {
      if (curVal && curVal === 'Best Sellers') {
        this.loadProducts();
        this.loadFilters();
      }
    },
    $route(to, from) {
      this.$store.dispatch('disableSorting');
      if (from.params.slug && to.params.slug && from.params.slug !== to.params.slug && to.path.includes('/categories')) {
        this.$store.dispatch('setPage', 1);
        this.loadProducts();
        this.loadFilters('', true);
        const category = this.currentCategory;
        if (category) this.$store.dispatch('setRequest', { category: { id: category.id, title: category?.title } });
        if (category?.title === 'E-Cigarettes') this.$store.dispatch('setRequest', { category: { id: 0, title: 'All Categories' } });
      } else if (!to.params.slug && to.path !== '/search-results') {
        this.$store.dispatch('setRequest', { category: { id: 0, title: 'All Categories' } });
      }
      this.$store.dispatch('disableAllFilters');
    },
    activeFilters: {
      handler(curVal) {
        if (this.$route.params.slug && this.$route.path.includes('/categories')) {
          const params = this.parseActiveFilters(curVal);
          this.loadProducts(params);
          this.loadFilters(params);
        }
      },
      deep: true
    },
    sorting() {
      const params = this.parseActiveFilters(this.activeFilters);
      this.loadProducts(params);
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 720) this.itemsMode = "grid";

    this.buildFilters();
    const params = this.parseActiveFilters(this.activeFilters);

    this.loadProducts(params);
    this.loadFilters(params);

    if (this.$store.getters.categoriesList && this.$route.path.includes('/categories')) {
      const category = this.$store.getters.categoriesList.find(i => i.id === parseInt(this.categoryId(this.$route.params.slug)));
      this.$store.dispatch('setRequest', { category: { id: category.id, title: category?.title } });
    }

    this.$store.dispatch('loadShapeOptions');
  },
  mounted() {
    initCJDeepLinks();
  },
  methods: {
    // TODO: refactor this method
    parseActiveFilters(filters) {
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
      let values = [];
      let mainValues = '';

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
          mainValues = '';
        } else {
          params += '&' + el + '=' + values.join(',');
        }

        values = [];
      });

      return params;
    },
    itemValue(item) {
      let values = item.values;
      const max = values.max;
      const min = values.min;
      if (typeof values === 'object' && item.type === 'price') return '$' + (min / 100) + ' - $' + (max / 100);
      if (typeof values === 'object') return min + ' - ' + max ;
      return values;
    },
    loadProducts(params = '') {
      let categoryParams = "&category_id=" + this.categoryId(this.$route.params.slug);
      if (this.pageHeader === 'Best Sellers') categoryParams = "&best_sellers=true";
      if (this.page && this.page > 1) {
        categoryParams += '&page=' + this.page;
      }

      this.replaceState(params);

      const payload = { params: categoryParams + params + this.sorting };
      this.$store.dispatch('loadProducts', payload);
      setTimeout(() => {
        initCJDeepLinks();
      }, 1500);
    },
    loadFilters(params = '', enableLoading = false) {
      if(!this.filtersList || enableLoading) this.$store.dispatch('enableLoading');
      let categoryParams = "&category_id=" + this.categoryId(this.$route.params.slug);
      if (this.pageHeader === 'Best Sellers') categoryParams += "&best_sellers=true";
      const payload = { params: categoryParams + params };
      this.$store.dispatch('loadFilters', payload);
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
    categoryId(slug) {
      return slug.split('-')[0];
    },
    replaceState(params) {
      let query = params + this.sorting;

      if (this.$store.getters.page && this.$store.getters.page > 1) query += '&page=' + this.page;
      if (query[0] === '&') query = query.slice(1);

      let current = location.pathname;
      if (query) current += '?' + query;
      window.history.replaceState({ current: current }, document.title, current);
    },
    selectShape(shape) {
      if (shape) this.$store.dispatch('addToActive', { type: 'shape', values: shape });
    },
    buildFilters() {
      let params = '';
      let splitLocation = window.location.href.split('?');
      let price = {};
      let ring = {};
      let sorting = '';

      if (splitLocation.length > 1) params = splitLocation[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var arr = params[i].split('=');
        if (arr.length == 2 && arr[0] && arr[1]) {
          var key = arr[0];
          var value = decodeURIComponent(arr[1]);

          if (key === 'page') {
            this.$store.dispatch('setPage', parseInt(value));
          }
          else if (key === 'sort_column' || key === 'sort_type') {
            sorting += '&' + key + '=' + value
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
              ring.min = value;
            } else if (key.includes('_to')) {
              ring.max = value;
            }
          } else if (['title', 'q', 'category_id'].indexOf(key) < 0) {
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

      if (sorting) this.$store.dispatch('setSorting', sorting)
    }
  },
};
</script>
