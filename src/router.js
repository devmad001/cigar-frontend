import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from "vue-gtag-next";
import { initCJDeepLinks } from './cjDLGenerator.js'

import TheLanding from './components/pages/TheLanding';
const PrivacyPolicy = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "static-pages" */ 
  '@/components/pages/PrivacyPolicy'
);   
const TermConditions = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "static-pages" */ 
  '@/components/pages/TermsConditions'
);
const HelpContact = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "static-pages" */ 
  '@/components/pages/HelpContact'
);
const AdvertiseWithUs = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "static-pages" */ 
  '@/components/pages/AdvertiseWithUs'
);
const TheWishlist = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "profile-pages" */ 
  '@/components/pages/TheWishlist'
);
const ProfilePage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "profile-pages" */ 
  '@/components/pages/ProfilePage'
);
const OrderHistory = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "profile-pages" */ 
  '@/components/pages/OrderHistory'
);
const CategoryPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "product-pages" */ 
  '@/components/pages/CategoryPage'
);
const SearchPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "product-pages" */ 
  '@/components/pages/SearchPage'
);
const ProductPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "product-pages" */ 
  '@/components/pages/ProductPage'
);
const BlogPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "article-pages" */ 
  '@/components/pages/BlogPage'
);
const BlogDetailsPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "article-pages" */ 
  '@/components/pages/BlogDetailsPage'
);
const NewsPage = () => import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "article-pages" */ 
  '@/components/pages/NewsPage'
);

import store from './store/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: TheLanding },
      { path: '/categories/:slug', component: CategoryPage },
      { path: '/product/:slug', component: ProductPage},
      { path: '/profile', component: ProfilePage,  meta: { needsAuth: true }  },
      { path: '/search-results', component: SearchPage },
      { path: '/wishlist', component: TheWishlist,  meta: { needsAuth: true } },
      { path: '/orderhistory', component: OrderHistory,  meta: { needsAuth: true } },
      { path: '/restore_password/:token', component: TheLanding, name: 'restore' },
      { path: '/privacy-policy', component: PrivacyPolicy },
      { path: '/terms-and-conditions', component: TermConditions },
      { path: '/help', component: HelpContact },
      { path: '/blog', component: BlogPage },
      { path: '/blog/:slug', component: BlogDetailsPage },
      { path: '/news', component: NewsPage },
      { path: '/news/:slug', component: BlogDetailsPage },
      { path: '/advertise-with-us', component: AdvertiseWithUs }
    ],
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    scrollBehavior (to, from, savedPosition) {
      return { 
        top: 0, 
        behavior: 'smooth' 
      }
    }
});

router.beforeEach(function(to, from, next) {
  if (to.meta.needsAuth && !store.getters.isAuthenticated) {
    store.dispatch('registrationModalToggle', true);
    next('/');
  } else {
    next();
  }
});

router.afterEach(() => {
  setTimeout(() => {
    initCJDeepLinks();
  }, 1500)
});

trackRouter(router);

export default router;
