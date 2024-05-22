<template>
  <div id="mobile-menu" :class="scrolled">
    <div class="hamburger-menu">
      <input id="menu__toggle" type="checkbox" v-model="menuIsOpen" />
      <label class="menu__btn" for="menu__toggle">
        <span></span>
      </label>
      <div class="menu__box">
        <div class="mobile-logo">
          <img src="@/assets/logo_0501.svg" alt="logo" loading="lazy">
        </div>
        <ul class="menu__box_list">
          <li><router-link to="/" class="menu__item" @click="closeMenu">Home</router-link></li>
          <li v-for="category in categories" :key="category.id">
            <router-link :to="link(category.slug)" class="menu__item" @click="closeMenu">{{ category.title }}</router-link>
            <ul class="subcategories" v-if="category.subcategories">
              <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                <router-link :to="link(subcategory.slug)" 
                  class="menu__item subcategory" 
                  @click="closeMenu"
                  >
                    {{ subcategory.title }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="user-links">
          <div class="my-account" v-if="isLoggedIn">
            <div class="user-data">
              <div class="avatar">
                <img :src="avatar" alt="avatar" class="avatar-image" v-if="avatar && avatar !== 'undefined'">
                <div class="blank-avatar" v-else>
                  {{ firstLetters }}
                </div>
              </div>
              <div class="name">{{ userName }}</div>
            </div>
            <ul class="user-links-list">
              <li>
                <router-link to="/orderhistory" @click="closeMenu">Order History</router-link>
              </li>
              <li>
                <router-link to="/profile" @click="closeMenu">My Profile</router-link>
              </li>
              <li>
                <router-link to="/wishlist" @click="closeMenu">Wishlist</router-link>
              </li>
              <li>
                <a class="special-link" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
          <div class="login" v-else>
            <div class="avatar">
              <img src="../../../assets/img/blank_mobile_avatar.svg" alt="blank avatar">
            </div>
            <div class="auth-links">
              <a @click="openLoginModal">Login</a>
              <span>/</span>
              <a @click="openRegisterModal">Register</a>
            </div>
          </div>
          <div class="links">
            <router-link to="/help" @click="closeMenu" class="help-link">Help & Contact</router-link>
            <router-link to="/blog" @click="closeMenu" class="help-link">Blog</router-link>
            <router-link to="/news" @click="closeMenu">News</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo_1712.svg" alt="logo" loading="lazy">
      </router-link>
    </div>

    <div class="user-actions">
      <div class="user-avatar" @click="!isLoggedIn && openLoginModal">
        <router-link to="/profile">
          <img v-if="avatar && isLoggedIn" :src="avatar" alt="user avatar" class="avatar-image">
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8043 11.4371L10.2568 10.1635C10.0165 10.0432 9.86719 9.8016 9.86719 9.5328V8.6312C9.92825 8.55653 9.99252 8.47147 10.0589 8.3776C10.3893 7.91093 10.6541 7.39147 10.8467 6.8312C11.2229 6.65867 11.4672 6.28667 11.4672 5.86667V4.8C11.4672 4.5432 11.3712 4.2944 11.2005 4.1V2.6816C11.2155 2.53493 11.2741 1.66187 10.6427 0.9416C10.0949 0.3168 9.20612 0 8.00052 0C6.79492 0 5.90612 0.3168 5.35839 0.941333C4.72692 1.6616 4.78559 2.53493 4.80052 2.6816V4.1C4.62985 4.2944 4.53385 4.5432 4.53385 4.8V5.86667C4.53385 6.1912 4.68132 6.49387 4.93305 6.69573C5.17732 7.66293 5.68852 8.39173 5.86719 8.6256V9.508C5.86719 9.76613 5.72639 10.0029 5.49999 10.1267L3.12105 11.4243C2.34745 11.8464 1.86719 12.6555 1.86719 13.5365V14.4C1.86719 15.6656 5.87919 16 8.00052 16C10.1219 16 14.1339 15.6656 14.1339 14.4V13.5885C14.1339 12.6717 13.6243 11.8472 12.8043 11.4371Z" fill="#6C3F13"/>
          </svg>
        </router-link>
      </div>
      <div class="wishlist-button" @click="!isLoggedIn && openLoginModal">
        <router-link to="/wishlist">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path d="M14.7307 2.26807C13.9025 1.36975 12.766 0.875 11.5304 0.875C10.6068 0.875 9.76099 1.16699 9.01636 1.7428C8.64062 2.03345 8.30017 2.38904 8 2.80408C7.69995 2.38916 7.35938 2.03345 6.98352 1.7428C6.23901 1.16699 5.39319 0.875 4.4696 0.875C3.23401 0.875 2.09741 1.36975 1.26917 2.26807C0.450806 3.15588 0 4.36877 0 5.68347C0 7.03662 0.504272 8.27527 1.58691 9.58167C2.55542 10.7502 3.94739 11.9365 5.55933 13.3102C6.10974 13.7793 6.73364 14.311 7.38147 14.8774C7.55261 15.0273 7.77222 15.1099 8 15.1099C8.22766 15.1099 8.44739 15.0273 8.61829 14.8777C9.26611 14.3112 9.89038 13.7792 10.441 13.3098C12.0527 11.9364 13.4447 10.7502 14.4132 9.58154C15.4958 8.27527 16 7.03662 16 5.68335C16 4.36877 15.5492 3.15588 14.7307 2.26807Z" fill="#6C3F13"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span class="wishlist-count" v-if="isLoggedIn && wishList.count > 0">{{wishList.count}}</span>
        </router-link>
      </div>
    </div>
  </div>

  <div class="search-input" :class="scrolled">
    <input type="text" placeholder="Search products here"  v-on:keyup.enter="setEnter" v-model="request"/>
    <div class="icon-wrapper"  @click="setRequest">
      <router-link to="/search-results">
        <img src="../../../assets/img/mobile_search.svg" alt="search icon">
      </router-link>
    </div>
    <dynamic-list 
      v-if="request && dynamicListIsOpen" 
      :request="request" 
      @closeDynamicList="closeDynamicList" 
      v-click-outside="closeDynamicList"
      @resetSearchInput="resetInput"
    ></dynamic-list>
  </div>

  <nav class="categories" :class="scrolled">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link 
          :to="link(category.slug)"
          class="category-link"
          :class="[activeLink(category.id) ? 'router-link-active' : '']"
        >
          {{category.title}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import DynamicList from '../search/DynamicList.vue';

export default {
  props: ['scrolled'],
  components: {
    DynamicList
  },
  data() {
    return {
      request: null,
      menuIsOpen: false,
      dynamicListIsOpen: false,
      forceClose: false
    }
  },
  methods: {
    openRegisterModal() {
      this.$store.dispatch('registrationModalToggle', true);
    },
    openLoginModal() {
      this.$store.dispatch('loginModalToggle', true);
    },
    closeModal() {
      this.$store.dispatch('registrationModalToggle', false);
      this.$store.dispatch('loginModalToggle', false);
      this.$store.dispatch('toggleForgotPassword', false);
    },
    closeMenu() {
      this.menuIsOpen = false;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    },
    link(id) {
      return '/categories/' + id;
    },
    activeLink(id) {
      return this.$route.path === '/search-results' && this.searchedCategory?.id === id;
    },
    setEnter() {
      this.$router.replace('/search-results');
      this.setRequest();
      this.request = '';
    },
    setRequest() {
      this.$store.dispatch('setRequest', { request: this.request, category: this.$store.getters.category });
      this.$store.dispatch('disableAllFilters');
      this.request = '';
      this.$store.dispatch('fromSuggestionOff');
    },
    closeDynamicList() {
      this.dynamicListIsOpen = false;
    },
    resetInput() {
      this.request = '';
      this.dynamicListIsOpen = false;
      this.forceClose = true;
    },
  },
  computed: {
    searchRequest() {
      return this.$store.getters.request;
    },
    wishList() {
      return this.$store.getters.wishList;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.$store.getters.userName;
    },
    firstLetters() {
      const name = this.userName.split(' ');
      if (name[0] && name[1]) return name[0][0] + name[1][0];
      return name[0][0];
    },
    avatar() {
      return this.$store.getters.user?.current_user?.avatar_image?.url;
    },
    categories() {
      if (this.$store.getters.categoriesList) return this.$store.getters.categoriesList.filter(cat => !cat.category_id);
      return this.$store.getters.categoriesList;
    }
  },
  watch: {
    request(curValue, prevVal) {
      if (curValue !== prevVal && this.forceClose) {
        this.forceClose = false;
        return this.dynamicListIsOpen = false;
      }
      if (curValue !== "") this.dynamicListIsOpen = true;
    }
  }
}
</script>

<style lang="scss" scoped>
#mobile-menu { display: none; }

p.modal-footer-title {
  font-family: Parisienne;
  font-size: 24px;
  line-height: 33px;
  color: #6C3F13;
}

a.modal-link {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  line-height: 22px;
  color: #393939;
}

.user-actions {
  display: flex;
  align-items: center;
}

.hamburger-menu { margin-right: 25px; }
.user-avatar { margin-right: 25px; }
.wishlist-button { position: relative; }

.search-input, 
.categories {
  display: none;
}

.avatar-image {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}

.wishlist-count {
  width: 10px;
  height: 10px;
  background: #F2E2D3;
  color: #6C3F13;
  font-weight: 800;
  font-size: 8px;
  line-height: 10px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.logo { 
  width: 80px;
  height: 42px;

  img {
    width: 100%;
    height: 100%;
  }
}

  @media screen and (max-width: 720px){
    #mobile-menu {
      display: flex;
      margin: 20px;
      justify-content: space-between;
    }
    svg path { fill: #000000; }

    #mobile-menu .mobile-search .icon {
      width: 32px;
      height: 32px;
      cursor: pointer;
      z-index: 3;
      position: absolute;
      top: 55px;
      right: 100px;
    }

    .categories {
      display: block;
      margin: 20px;
      ul {
        display: flex;
        flex-wrap: nowrap;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      ul li {
        list-style: none;
        white-space: nowrap;
        max-width: 200px;
        margin-right: 15px;
        a {
          text-decoration: none;
          color: #6C3F13;
        }
      }
    }

    .search-input {
      display: block;
      margin: 0 20px 20px 20px;
      border: 1px solid #F2E2D3;
      display: flex;
      justify-content: space-around;
      position: relative;

      input {
        height: 22px;
        width: calc(100% - 50px);
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        line-height: 22px;
        color: #393939;
        padding: 14px 15px;

        &:focus {
          outline: none;
        }
      }
      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        background-color: #6C3F13;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .search-input.scrolled,
    .categories.scrolled {
      display: none;
    }

    #mobile-menu .mobile-logo { margin-bottom: 40px; }

    #menu__toggle { opacity: 0 }

    .menu__btn {
      display: flex;
      align-items: center;
      top: 42px;
      left: 20px;
      cursor: pointer;
      z-index: 3;
    }

    .menu__btn > span,
    .menu__btn > span::before,
    .menu__btn > span::after {
      display: block;
      position: absolute;
      width: 16px;
      height: 3px;
      background-color: #6C3F13;
      z-index: 3;
      border-radius: 2px;
    }
    .menu__btn > span::before {
      content: '';
      top: -7px;
    }
    .menu__btn > span::after {
      content: '';
      top: 7px;
    }

    .menu__box {
      display: none;
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      z-index: 2;
      margin: 0;
      padding: 45px 0 0;
      background-color: #352414;
      background-image: url('../../../assets/img/mobile_menu_background.svg');
      background-repeat: no-repeat;
      background-position: 100% 0;
      background-size: 100% 70%;
      box-shadow: 1px 0px 6px rgba(0, 0, 0, .2);
    }

    .menu__box_list {
      list-style: none;
      text-align: left;
      padding-bottom: 20px;
    }

    .subcategories {
      margin-left: 20px;
      list-style: none;
    }

    .subcategories .subcategory {
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }

    .menu__item {
      display: block;
      padding: 12px 24px;
      color: #BA7C3D;
      font-family: 'Lato', sans-serif;
      font-size: 22px;
      line-height: 26px;
      font-weight: 600;
      text-decoration: none;
    }
    .menu__item:hover { color: #fff; }
    .router-link-active { color: #fff;}

    #menu__toggle:checked ~ .menu__btn { position: fixed; }
    #menu__toggle:checked ~ .menu__btn > span {
      transform: rotate(45deg);
      background-color: #fff;
      height: 3px;
    }
    #menu__toggle:checked ~ .menu__btn > span::before {
      background-color: #fff;
      top: 0;
      height: 3px;
      transform: rotate(0);
    }
    #menu__toggle:checked ~ .menu__btn > span::after {
      background-color: #fff;
      top: 0;
      height: 3px;
      transform: rotate(90deg);
    }
    #menu__toggle:checked ~ .menu__box {
      left: 0;
      display: block;
    }
    .menu__btn > span,
    .menu__btn > span::before,
    .menu__btn > span::after {
      transition-duration: .25s;
    }

    .menu__item { transition-duration: .25s; }
    .user-links { background-color: #6C3F13; }

    .user-links .my-account .user-data{
      display: flex;
      align-items: center;
      padding: 20px 0 20px 20px;
    }

    .user-links .my-account .user-data .avatar { margin-right: 10px; }
    .user-links .my-account .user-data .avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .user-links .my-account .user-data .blank-avatar {
      width: 40px;
      height: 30px;
      border-radius: 50%;
      background-color: #352414;
      text-align: center;
      padding-top: 10px;
      color: #F1B57A;
    }

    .user-links .my-account .user-data .name {
      font-family: Helvetica;
      font-size: 22px;
      line-height: 25px;
      color: #fff;
    }

    .user-links .my-account .user-links-list {
      text-align: left;
      padding: 0 0 20px 20px;
      list-style: none;
    }

    .user-links .my-account .user-links-list li { margin-bottom: 15px; }
    .user-links .my-account .user-links-list li:last-child { margin-bottom: 0; }
    
    .user-links .my-account .user-links-list li a {
      font-family: 'Lato', sans-serif;
      font-size: 18px;
      line-height: 22px;
      color: #BA7C3D;
      text-decoration: none;
    }

    .user-links .my-account .user-links-list li a:hover,
    .user-links .my-account .user-links-list li a:active { color: #fff; }

    .user-links .login {
      height: 70px;
      padding-left: 20px;
      display: flex;
      align-items: center;
    }

    .user-links .login .avatar { margin-right: 10px; }
    .user-links .login .auth-links a,
    .user-links .login .auth-links span {
      font-family: Helvetica, sans-serif;
      font-size: 22px;
      line-height: 25px;
      color: #fff;
      text-decoration: none;
    }
    .user-links .login .auth-links span { padding: 0 5px; }

    .links {
      height: 55px;
      background: #f2e2d3;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }

    .links a {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #B26D28;
    }

    .help-link::after {
      content: "|";
      margin: 0 20px;
    }

    .links a { text-decoration: none; }
    .links a:hover { text-decoration: underline; }

    .menu__box {
      transition-duration: .25s;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow-y: scroll;
    }

    .categories ul li .category-link {
      font-weight: 600;
    }

    .categories ul li .router-link-active {
      color: #B26D28;
      font-weight: 800;
    }
  }
</style>
