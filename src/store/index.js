import { createStore } from 'vuex';

import authModule from './modules/auth/index';
import categoriesModule from './modules/categories/index';
import productsModule from './modules/categoryProducts/index';
import wishlistModule from './modules/wishlist/index';
import filtersModule from './modules/filters/index';
import profileModule from './modules/profile/index';
import orderHistoryModule from './modules/orderHistory/index';
import productDetailsModule from './modules/product/index';
import reviewsListModule from './modules/reviews/index';
import recentlyViewedModule from './modules/recentlyViewed/index';
import searchModule from './modules/search/index';
import sortingModule from './modules/sorting/index';
import articlesListModule from './modules/articles/index';
import articlesDetailsModule from './modules/articleDetails/index';
import answersModule from './modules/answers/index';
import dailyDealsModule from './modules/dailyDeals/index';
import hotSaleModule from './modules/hotSale/index';
import recommendedModule from './modules/recommendedProducts/index';
import shapeOptionsModule from './modules/shapeOptions/index';
import brandsModule from './modules/brands/index';

const store = createStore({
  modules: {
    auth: authModule,
    categories: categoriesModule,
    products: productsModule,
    wishlist: wishlistModule,
    filters: filtersModule,
    profile: profileModule,
    orderHistory: orderHistoryModule,
    productDetails: productDetailsModule,
    reviewsList: reviewsListModule,
    viewedProduct: recentlyViewedModule,
    search: searchModule,
    sorting: sortingModule,
    articlesList: articlesListModule,
    articleDetails: articlesDetailsModule,
    answers: answersModule,
    dailyDeals: dailyDealsModule,
    hotSale: hotSaleModule,
    recommended: recommendedModule,
    shapeOptions: shapeOptionsModule,
    brands: brandsModule
  },
  state() {
    return {
      registrationIsOpen: false,
      loginIsOpen: false,
      forgotPasswordIsOpen: false,
      countryStatesToken: "ZTBjS2FmSmdwZDJ5RmxzS3FQSEh4NzB5VUJIdnFMU3RYbEM0TEZhcQ==",
      states: [
        {
          name: "Alabama",
          iso: "AL"
        },
        {
          name: "Alaska",
          iso: "AK"
        },
        {
          name: "Arizona",
          iso: "AZ"
        },
        {
          name: "Arkansas",
          iso: "AR"
        },
        {
          name: "California",
          iso: "CA"
        },
        {
          name: "Colorado",
          iso: "CO"
        },
        {
          name: "Connecticut",
          iso: "CT"
        },
        {
          name: "Delaware",
          iso: "DE"
        },
        {
          name: "District of Columbia",
          iso: "DC"
        },
        {
          name: "Florida",
          iso: "FL"
        },
        {
          name: "Georgia",
          iso: "GA"
        },
        {
          name: "Hawaii",
          iso: "HI"
        },
        {
          name: "Idaho",
          iso: "ID"
        },
        {
          name: "Illinois",
          iso: "IL"
        },
        {
          name: "Indiana",
          iso: "IN"
        },
        {
          name: "Iowa",
          iso: "IA"
        },
        {
          name: "Kansas",
          iso: "KS"
        },
        {
          name: "Kentucky",
          iso: "KY"
        },
        {
          name: "Louisiana",
          iso: "LA"
        },
        {
          name: "Maine",
          iso: "ME"
        },
        {
          name: "Maryland",
          iso: "MD"
        },
        {
          name: "Massachusetts",
          iso: "MA"
        },
        {
          name: "Michigan",
          iso: "MI"
        },
        {
          name: "Minnesota",
          iso: "MN"
        },
        {
          name: "Mississippi",
          iso: "MS"
        },
        {
          name: "Missouri",
          iso: "MO"
        },
        {
          name: "Montana",
          iso: "MT"
        },
        {
          name: "Nebraska",
          iso: "NE"
        },
        {
          name: "Nevada",
          iso: "NV"
        },
        {
          name: "New Hampshire",
          iso: "NH"
        },
        {
          name: "New Jersey",
          iso: "NJ"
        },
        {
          name: "New Mexico",
          iso: "NM"
        },
        {
          name: "New York",
          iso: "NY"
        },
        {
          name: "North Carolina",
          iso: "NC"
        },
        {
          name: "North Dakota",
          iso: "ND"
        },
        {
          name: "Ohio",
          iso: "OH"
        },
        {
          name: "Oklahoma",
          iso: "OK"
        },
        {
          name: "Oregon",
          iso: "OR"
        },
        {
          name: "Pennsylvania",
          iso: "PA"
        },
        {
          name: "Puerto Rico",
          iso: "PR"
        },
        {
          name: "Rhode Island",
          iso: "RI"
        },
        {
          name: "South Carolina",
          iso: "SC"
        },
        {
          name: "South Dakota",
          iso: "SD"
        },
        {
          name: "Tennessee",
          iso: "TN"
        },
        {
          name: "Texas",
          iso: "TX"
        },
        {
          name: "Utah",
          iso: "UT"
        },
        {
          name: "Vermont",
          iso: "VT"
        },
        {
          name: "Virginia",
          iso: "VA"
        },
        {
          name: "Washington",
          iso: "WA"
        },
        {
          name: "West Virginia",
          iso: "WV"
        },
        {
          name: "Wisconsin",
          iso: "WI"
        },
        {
          name: "Wyoming",
          iso: "WY"
        }  
      ]
    }
  },
  actions: {
    registrationModalToggle(context, payload) {
      context.commit('toggleRegistration', payload);
    },
    loginModalToggle(context, payload) {
      context.commit('toggleLogin', payload);
    },
    forgotPasswordModalToggle(context, payload) {
      context.commit('toggleForgotPassword', payload);
    },
  },
  mutations: {
    toggleRegistration(state, payload) {
      state.registrationIsOpen = payload;
    },
    toggleLogin(state, payload) {
      state.loginIsOpen = payload;
    },
    toggleForgotPassword(state, payload) {
      state.forgotPasswordIsOpen = payload;
    }
  },
  getters: {
    states(state) {
      return state.states;
    },
    countryStatesToken(state) {
      return state.countryStatesToken;
    },
    registrationIsOpen(state) {
      return state.registrationIsOpen;
    },
    loginIsOpen(state) {
      return state.loginIsOpen;
    },
    forgotPasswordIsOpen(state) {
      return state.forgotPasswordIsOpen;
    }
  }
});

export default store;
