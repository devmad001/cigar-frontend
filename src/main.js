import { createApp } from 'vue';

import router from './router'
import store from './store/index';
import App from './App';
import BaseSpinner from './components/ui/BaseSpinner';
import TestAdsBanner from './components/layout/TestAdsBanner';
import BaseProfileWrapper from './components/ui/BaseProfileWrapper';
import BaseRating from './components/ui/BaseRating';
import BaseMeta from './components/ui/BaseMeta';

import ClickOutside from './directives/ckick-outside';

import GAuth from 'vue3-google-oauth2';
import Toaster from "@meforma/vue-toaster";
import Pagination from 'v-pagination-3';
import VueLazyloadNext from 'vue-lazyload-next';
import VueGtag from 'vue-gtag-next'

//Global Styles
import './styles/TheFilters.scss';
import './styles/ActiveFilters.scss';
import './styles/MobileControl.scss';
import './styles/ProductsListHeader.scss';
import './styles/WrappersStyles.scss';

const app = createApp(App);

const gAuthOptions = { 
  clientId: '353532333871-ouadcgink0ant3sodqscc3ltg4ef23i7.apps.googleusercontent.com', 
  scope: 'profile email', 
  prompt: 'select_account', 
  fetch_basic_profile: false 
}

app.use(router);
app.use(store);

app.use(GAuth, gAuthOptions);
app.use(Toaster);
app.use(VueLazyloadNext);
app.use(VueGtag, {
  property: {
    id: "G-9K136YLXRK",
  }
});

app.component('base-spinner', BaseSpinner);
app.component('base-profile-wrapper', BaseProfileWrapper);
app.component('test-ads-banner', TestAdsBanner);
app.component('pagination', Pagination);
app.component('base-rating', BaseRating);
app.component('base-meta', BaseMeta);

app.directive("click-outside", ClickOutside);

app.mount('#app');
