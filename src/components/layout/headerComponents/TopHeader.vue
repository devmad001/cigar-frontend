<template>
  <div id="account-links">
    <div class="links">
      <router-link to="/help" class="help-link">Help & Contact</router-link>
      <router-link to="/blog" class="help-link">Blog</router-link>
      <router-link to="/news">News</router-link>
    </div>
    <div class="my-account" v-if="isLoggedIn">
      <div class="avatar">
        <img :src="avatar" alt="avatar" class="avatar-image" v-if="avatar && avatar !== 'undefined'">
        <div class="blank-avatar" v-else>
          {{ firstLetters }}
        </div>
      </div>
      <div class="name"  @click="openUserLinksList" v-click-outside="closeUserLinksList">{{ userInfo?.full_name }}</div>
      <div class="favorites" @click="clickFavorite">
        <router-link to='/wishlist'>
          <img src="@/assets/heart_filled.svg" alt="filled favorites heart" v-if="favoriteIsClicked">
          <img src="@/assets/favorites_heart.png" alt="favorites heart" v-else>
          <span v-if="isLoggedIn && wishList.count > 0">{{wishList.count}}</span>
        </router-link>
      </div>

      <nav class="user-links-list" v-show="menuIsOpen">
        <ul>
          <li>
            <router-link to="/orderhistory">Order History</router-link>
          </li>
          <li>
            <router-link to="/profile">My Profile</router-link>
          </li>
          <li>
            <router-link to="/wishlist">Wishlist</router-link>
          </li>
          <li>
            <a class="special-link" @click="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="login" v-else>
      <div class="avatar">
        <img src="../../../assets/blank_avatar.svg" alt="blank avatar">
      </div>
      <div class="links">
        <a @click="openLoginModal">Login</a>
        <span>/</span>
        <a @click="openRegisterModal">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuIsOpen: false,
      favoriteIsClicked: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.menuIsOpen = false;
      this.$router.replace('/');
    },
    openUserLinksList() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    closeUserLinksList(){
      this.menuIsOpen = false;
    },
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
    clickFavorite() {
      this.favoriteIsClicked = !this.favoriteIsClicked;
      setTimeout(()=> {
        this.favoriteIsClicked = false;
      }, 500)
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userInfo() {
      return this.$store.getters.user.current_user
    },
    userName() {
      return this.$store.getters.userName;
    },
    avatar() {
      return this.$store.getters.user.current_user?.avatar_image?.url;
    },
    firstLetters() {
      const name = this.userName.split(' ');
      if (name[0] && name[1]) return name[0][0] + name[1][0];
      return name[0][0];
    },
    wishList() {
      return this.$store.getters.wishList;
    },
  }
}
</script>

<style lang="scss" scoped>
#account-links.scrolled {
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.4s linear;
}
#account-links {
  transition: all 0.4s linear;
  opacity: 1;
  width: 100%;
  height: 50px;
  background: #f2e2d3;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .links a,
  .my-account .name {
    font-weight: 400;
    font-size: 16px;
    color: #B26D28;
    cursor: pointer;
  }

  .links {
    height: 20px;
    margin-left: 5%;
    font-family: Lato, sans-serif;

    .help-link::after {
      content: "|";
      margin: 0 20px;
    }

    a { text-decoration: none; }
    a:hover { text-decoration: underline; }

    span {
      color: #B26D28;
      margin: 0 10px;
    }
  }

  .my-account,
  .login {
    height: 20px;
    margin-right: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .avatar {
      margin-right: 15px;

      .blank-avatar {
        width: 30px;
        height: 25px;
        border-radius: 18px;
        background-color: #6C3F13;
        text-align: center;
        padding-top: 5px;
        color: #F1B57A;
      }

      .avatar-image {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
    }

    .favorites {
      margin-left: 30px;
      cursor: pointer;
      width: 22px;
      height: 22px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        width: 10px;
        height: 10px;
        background: #6C3F13;
        color: #fff;
        font-weight: 800;
        font-size: 8px;
        line-height: 10px;
        border-radius: 2px;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    .name { position: relative; }

    .name::after {
      position: absolute;
      right: -10px;
      top: -25%;
      content: url('../../../assets/show_more.png');
    }
  }

  .my-account .user-links-list {
    border: 1px solid #F2E2D3;
    border-top: none;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 5px 5px 20px rgba(108, 63, 19, 0.1);
    border-radius: 2px;
    position: absolute;
    top: 35px;
    min-width: 150px;
    width: 100%;
    z-index: 1;

    ul {
      list-style: none;
      margin-top: 15px;
      text-align: left;

      li {
        margin-bottom: 15px;
        padding: 0 20px;

        a {
          font-family: Lato, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 22px;
          color: #6C3F13;
          text-decoration: none;
          cursor: pointer;
        }

        a.special-link { color: #F1B57A;}
        a:hover { text-decoration: underline; }
      }
    }
  }
}
</style>
