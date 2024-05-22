<template>
  <div id="search" >
    <div class="logo" @click="setCigareCategory()">
      <router-link to="/">
        <img src="@/assets/logo_1712.svg" alt="logo" loading="lazy">
      </router-link>
    </div>
    <div class="search-field" :class="{ focused: request }">
      <div class="input">
        <input type="text" v-on:keyup.enter="setEnter" placeholder="Search products here" v-model.trim="request"/>
        <dynamic-list 
          v-if="request && dynamicListIsOpen"
          :request="request"
          @closeDynamicList="closeDynamicList"
          v-click-outside="closeDynamicList"
          @resetSearchInput="resetInput"
        ></dynamic-list>
      </div>
      <div class="categories" @click="openCategoriesList" v-click-outside="closeCategoriesList">
        <p class="selected-category">{{ selectedCategory.title }}</p>
        <nav class="searcheable-categories-list" v-show="isOpen">
          <ul class="main-list">
            <li @click="selectCategory(-1)">{{ defaultCategory.title }}</li>
            <li v-for="category in categories" :key="category.id" @click="selectCategory(category.title === 'E-Cigarettes' ? -1 : category.id)" :class="[ category.title === 'E-Cigarettes' ? 'disable' : '']">
              {{ category.title }}
              <ul class="subcategories" v-if="category.subcategories">
                <li v-for="subcategory in category.subcategories" :key="subcategory.id" @click.stop="selectSubCategory(category.id, subcategory.id)">{{ subcategory.title }}</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div class="button hvr-radial-out lite" @click="setRequest">
        <router-link to="/search-results">Search</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicList from '../search/DynamicList.vue';

export default {
  components: {
    DynamicList
  },
  data() {
    return {
      isOpen: false,
      selectedCategory: null,
      request: null,
      defaultCategory: {
        id: 0,
        title: 'All Categories'
      },
      dynamicListIsOpen: false,
      forceClose: false
    };
  },
  computed: {
    categories() {
      if (this.$store.getters.categoriesList) {
        return this.$store.getters.categoriesList.filter(cat => !cat.category_id);
      }
      return this.$store.getters.categoriesList;
    },
    category() {
      return this.$store.getters.category;
    }
  },
  watch: {
    category(curVal) {
      this.selectedCategory = curVal; 
    },
    request(curValue, prevVal) {
      if (curValue !== prevVal && this.forceClose) {
        this.forceClose = false;
        return this.dynamicListIsOpen = false;
      }
      if (curValue !== "") this.dynamicListIsOpen = true;
    },
    $route() {
      this.$route.path === "/" && (this.selectedCategory = {id:1, title:"Cigars"})
    }
  },
  methods: {
    setEnter() {
      this.$router.replace('/search-results');
      this.setRequest();
      this.request = '';
    },
    openCategoriesList() {
      this.isOpen = !this.isOpen;
    },
    closeCategoriesList() {
      this.isOpen = false;
    },
    closeDynamicList() {
      this.dynamicListIsOpen = false;
    },
    selectCategory(id) {
      if (id === -1) {
        this.selectedCategory = this.defaultCategory;
        return;
      }
      this.selectedCategory = this.categories.find(i => i.id === id);
    },
    selectSubCategory(categoryId, subcategoryId) {
      const category = this.categories.find(i => i.id === categoryId);
      this.selectedCategory = category.subcategories.find(i => i.id === subcategoryId);
      this.closeCategoriesList();
    },
    setRequest() {
      // const wordsCount = this.request?.split(' ').length;
      // if (wordsCount > 2) {
      //   this.$store.dispatch('fromSuggestionOn');
      // } else {
        this.$store.dispatch('fromSuggestionOff');
      // }
      this.$store.dispatch('setRequest', { request: this.request, category: this.selectedCategory });
      this.$store.dispatch('disableAllFilters');
      this.$store.dispatch('enableLoading');
      this.forceClose = false;
      this.request = '';
    },
    resetInput() {
      this.request = '';
      this.dynamicListIsOpen = false;
      this.forceClose = true;
      
    },
    setCigareCategory(){
      this.selectedCategory = {id:1, title:"Cigars"}
    }
  },
  created() {
    this.selectedCategory = {id:1, title:"Cigars"};
  }
}
</script>

<style lang="scss" scoped>
#search.scrolled { 
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.5s linear;
}
#search {
  transition: all 0.5s linear;
  height: 100px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo { 
    margin-left: 5%;
    width: 150px;
    height: 60px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .search-field {
    height: 50px;
    width: 70%;
    margin-right: 5%;
    display: flex;
    border: 1px solid #F2E2D3;
    box-sizing: border-box;

    &.focused {
      z-index: 10;
      background: #fff;
    }

    .input {
      width: 60%;
      padding: 14px 15px;
      position: relative;

      input {
        font-family: 'Lato', sans-serif;
        color: #352414;
        font-size: 18px;
        padding: 0; 
        width: 100%;
        height: 100%;
        outline:none;
        height: 20px;
      }

      input::placeholder {
        color: #7D7D7D;
        opacity: 0.3;
      }
    }

    .categories { 
      width: 20%; 
      position: relative;
      display: flex;
      align-items: center;
      justify-content: left;
      padding-left: 20px;
      cursor: pointer;

      .selected-category {
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        color: #7D7D7D;
        text-align: left;
        vertical-align: middle;
      }

      .searcheable-categories-list {
        border: 1px solid #F2E2D3;
        border-top: none;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 5px 5px 20px rgba(108, 63, 19, 0.1);
        border-radius: 2px;
        position: absolute;
        top: 50px;
        left: 0px;
        width: 100%; 
        z-index: 1;

        .main-list,
        .subcategories { 
          list-style: none;
          margin-top: 15px;
          text-align: left;

          li {
            padding-left: 20px;
            margin-bottom: 15px;
            font-family: Lato, sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            color: #6C3F13;
            transition: all 0.2s ease-out;
            cursor: pointer;

            &.disable {
              &:hover {
                color: #6C3F13;
                cursor: auto;
                text-decoration: none;
              }
            }

            &:hover {
              color: #F1B57A;
              text-decoration: underline;
            }
          }  
        }

        .subcategories{
          li {
            text-decoration: none; 
            color: #BA7C3D;

            &:hover {
              color: #F1B57A;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .categories::before {
      content: "";
      height: 30px;
      position: absolute;
      top: 10px;
      left: 0;
      border-left: 1px solid #F2E2D3;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      background-color: #6C3F13;

      a {
        color: #fff;
        font-size: 16px;
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@media screen  and (max-width: 960px){
  div#search {
    .search-field {
      width: 60%;
      .categories { width: 30%; }
    }
  }
}
</style>
