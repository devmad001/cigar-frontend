<template>
  <header>
    <top-header :class="{scrolled: scrolled}"></top-header>
    <search-header :class="{scrolled: scrolled}"></search-header>
    <categories-header :class="{scrolled: scrolled}"></categories-header>
    <mobile-header :scrolled="scrolled ? 'scrolled' : ''"></mobile-header>
  </header>
</template>

<script>
import TopHeader from './headerComponents/TopHeader';
import SearchHeader from './headerComponents/SearchHeader';
import CategoriesHeader from './headerComponents/CategoriesHeader';
import MobileHeader from './headerComponents/MobileHeader';

export default {
  components: {
    TopHeader,
    SearchHeader,
    CategoriesHeader,
    MobileHeader
  },
  data() {
    return {
      windowTop: 0,
    }
  },
  computed: {
    scrolled() {
      if (this.windowTop > 100) return true;
      return false;
    }
  },
  methods: {
    onScroll(e) {
      this.windowTop = e.target.scrollingElement.scrollTop;
    },
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 3;
    box-shadow: 0px 10px 15px rgb(0 0 0 / 10%);
  }

 @media screen and (max-width: 720px){
    #mobile-menu { display: flex; }
    #account-links,
    #search,
    #main-menu,
    #main-menu.scrolled {
      display: none;
    }
  }
</style>
