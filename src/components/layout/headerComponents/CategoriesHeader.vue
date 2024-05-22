<template>
  <div id="main-menu">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo_1712.svg" alt="logo">
      </router-link>
    </div>
    <nav>
      <ul>
        <li class="category-button hvr-shutter-out-vertical" v-for="category in categories" :key="category.id" @mouseenter="openSubMenu" @mouseleave="closeSubMenu">
          <router-link :to="link(category.slug)" :class="[activeLink(category.id) ? 'router-link-active' : '']">{{ category.title }}</router-link>
          <div class="subcategories" v-if="category.subcategories" @mouseenter="openSubMenu" @mouseleave="closeSubMenu">
            <div class="subcategory  hvr-shutter-out-vertical" v-for="subcategory in category.subcategories" :key="subcategory.id">
              <router-link :to="link(subcategory.slug)" :class="[activeLink(category.id) ? 'router-link-active' : '']">{{ subcategory.title }}</router-link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      if (this.$store.getters.categoriesList) {
        return this.$store.getters.categoriesList.filter(cat => !cat.category_id);
      }
      return this.$store.getters.categoriesList;
    },
    searchedCategory() {
      return this.$store.getters.category;
    }
  },
  methods: {
    link(slug) {
      return '/categories/' + slug;
    },
    openSubMenu(e) {
      e.target.classList.add("isOpen");
    },
    closeSubMenu(e) {
      e.target.classList.remove("isOpen");
    },
    activeLink(id) {
      return this.$route.path === '/search-results' && this.searchedCategory?.id === id;
    }
  },
}
</script>

<style lang="scss" scoped>
#main-menu.scrolled {
  background-color: #fff;
  border: 1px solid #F7F7F7;
  box-sizing: border-box;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;

  .logo { 
    display: block;
    padding: 9px 0;
    margin-right: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  nav ul {
    .category-button, 
    .category-button a {
      color: #6C3F13;
      &.isOpen .subcategories { 
        background: #fff;
        top: 55px;

        .subcategory:hover a { color: #B26D28; }
        .subcategory:hover::before { content: none; }
      }

      .router-link-active { color: #F1B57A; }

      &:hover { color:#B26D28; }
      &:hover::before { content: none; }
    }
  }
}
#main-menu {
  height: 60px;
  background-color: #352414;
  .logo {display: none;}

  nav {
    height: 100%;

    ul {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .category-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: Lato, sans-serif;
        height: 100%;
        list-style: none;
        font-size: 22px;
        color: #F1B57A;
        position: relative;
        cursor: pointer;

        &.hvr-shutter-out-vertical::before { left: -3px; }
        .router-link-active { color: #fff;}

        a {
          height: 100%;
          width: 100%;
          padding: 0 25px;
          display: flex;
          align-items: center;
          font-size: 22px;
          color: #F1B57A;
          text-decoration: none;
        }

        .subcategories { display: none; }
       
        &.isOpen .subcategories {
          display: block;
          position: absolute;
          bottom: 0px;
          top: 60px;
          left: -3px;
          width: calc(100% + 3px);
          background: #352414;
          max-height: 200px;
          height: 130px;

          .hvr-shutter-out-vertical::before { left: 0; }
          
          .subcategory {
            margin-top: 10px;
            padding: 0 0 0 20px;
            text-align: left;

            a {
              width: 100%;
              font-family: 'Lato', sans-serif;
              font-size: 18px;
              line-height: 22px;
              color: #BA7C3D;
            }
          } 
        }
      }
      
      .category-button:not(:last-child)::after{
        content: "";
        position: absolute;
        width: 2px;
        height: 20px;
        top: 22px;
        right: 0;
        background: #6C3F13;
      }
      
    }
  }
}

@media screen  and (max-width: 1200px){
   div#main-menu.scrolled nav ul .category-button a {
    padding: 0 15px;
    font-size: 18px;
   }
}

@media screen  and (max-width: 960px){
  div#main-menu.scrolled {
    .logo { margin-right: 20px; }
  }
  div#main-menu nav ul .category-button {
    a {
      padding: 0 15px;
      font-size: 18px;
    }

    &.isOpen .subcategories { bottom: -85px; }
  }
}

@media screen  and (max-width: 870px){
  div#main-menu.scrolled nav ul .category-button a { padding: 0 10px;}
  div#main-menu nav ul .category-button a,
  div#main-menu.scrolled nav ul .category-button a { font-size: 17px; }
}
</style>
