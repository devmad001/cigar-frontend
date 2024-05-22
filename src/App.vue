<template>
  <the-header></the-header>
  <router-view></router-view>
  <base-dialog :show="registartionModalIsOpen" title="Registration" @close="closeModal" isRegistration>
    <registration-form @closeRegistration="closeModal"></registration-form>
    <template v-slot:footer>
      <p class="modal-footer-title">Already registered?</p>
      <a class="modal-link" @click.prevent="closeModal(); openLoginModal();">Login</a>
    </template>
  </base-dialog>

  <base-dialog :show="loginModalIsOpen" title="Authorization" @close="closeModal" isLogin>
    <login-form @closeLogin="closeModal" @forgotPasswordClick="forgotPasswordClick"></login-form>
    <template v-slot:footer>
      <p class="modal-footer-title">Don't have an account?</p>
      <a class="modal-link" @click.prevent="closeModal(); openRegisterModal();">Register</a>
    </template>
  </base-dialog>

  <base-dialog :show="forgotPasswordModalIsOpen" title="Forgot Password" @close="closeModal">
    <forgot-password-form></forgot-password-form>
  </base-dialog>

  <the-footer></the-footer>
  <transition name="fade" mode="out-in">
    <cookies-banner :visibility="cookiesBannerVisibility" @closeCookiesBanner="closeCookiesBanner"></cookies-banner>
  </transition>
  <top-button></top-button>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import TheHeader from './components/layout/TheHeader';
import TheFooter from './components/layout/TheFooter';
import CookiesBanner from './components/layout/CookiesBanner';
import TopButton from './components/ui/TopButton';

export default {
  components: {
    TheHeader,
    TheFooter,
    CookiesBanner,
    TopButton,
    BaseDialog: defineAsyncComponent(() => 
      import('./components/ui/BaseDialog')
    ),
    RegistrationForm: defineAsyncComponent(() =>
      import('./components/layout/forms/RegistrationForm')
    ),
    LoginForm: defineAsyncComponent(() =>
      import('./components/layout/forms/LoginForm')
    ),
    ForgotPasswordForm: defineAsyncComponent(() =>
      import('./components/layout/forms/ForgotPasswordForm')
    ),
  },
  data() {
    return {
      cookiesBannerVisibility: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    registartionModalIsOpen() {
      return this.$store.getters.registrationIsOpen;
    },
    loginModalIsOpen() {
      return this.$store.getters.loginIsOpen;
    },
    forgotPasswordModalIsOpen() {
      return this.$store.getters.forgotPasswordIsOpen;
    },
  },
  beforeCreate() {
    this.$store.dispatch('categories');
    this.$store.dispatch('brands');
  },
  created() {
    this.checkCookies();
    this.$store.dispatch('tryLogin');
  },
  methods: {
    checkCookies() {
      if (!this.getCookie('allowedCookie')) { 
        setTimeout(() => {
          this.cookiesBannerVisibility = true;
        }, 5000)
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    closeCookiesBanner() {
      this.cookiesBannerVisibility = false;
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
      this.$store.dispatch('forgotPasswordModalToggle', false);
    },
    forgotPasswordClick() {
      this.closeModal();
      this.$store.dispatch('forgotPasswordModalToggle', true);
    },
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(300px);
}

* {
  padding: 0;
  margin: 0;
  border: 0;
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.accent_text{
	font-family: 'Parisienne', cursive;
	font-style: normal;
	font-weight: normal;
	font-size: 40px;
	line-height: 54px;
	text-transform: capitalize;
	text-align: left;
	color: #6C3F13;
	margin: 0;
	margin-bottom: -15px;
}

h2.title{
	font-style: normal;
	font-weight: 800;
	font-size: 40px;
	line-height: 48px;
	text-transform: uppercase;
	color: #393939;
	font-family: 'Lato', sans-serif;
	text-align: left;
}
p.desk{
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: normal;
}

.m-bottom-15 { margin-bottom: 15px; }
.m-right-20 { margin-right: 20px; }
.m-top-50 { margin-top: 50px; }

p.modal-footer-title {
  font-family: 'Parisienne';
  font-size: 24px;
  line-height: 33px;
  color: #6C3F13;
}

a.modal-link {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  line-height: 22px;
  color: #393939;
  text-decoration: underline;
  cursor: pointer;
}

.hvr-shutter-out-vertical {
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-shutter-out-vertical:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #6C3F13;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-shutter-out-vertical.lite:before {
  background: #B26D28;
}
.hvr-shutter-out-vertical:hover, .hvr-shutter-out-vertical:focus, .hvr-shutter-out-vertical:active {
  color: white;
}
.hvr-shutter-out-vertical:hover:before, .hvr-shutter-out-vertical:focus:before, .hvr-shutter-out-vertical:active:before {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}
.hvr-box-shadow {
  transition: box-shadow 0.3s ease-out;
}
div.hvr-box-shadow:hover {
  box-shadow: 0px 4px 15px #B26D28;
  border-radius: 2px;
}
.hvr-radial-out {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.8s;
  transition-duration: 0.8s;
}
.hvr-radial-out:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #6C3F13;
  border-radius: 100%;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-radial-out:hover, .hvr-radial-out:focus, .hvr-radial-out:active {
  color: white;
}
.hvr-radial-out:hover:before, .hvr-radial-out:active:before {
  -webkit-transform: scale(2);
  transform: scale(2);
}
.hvr-radial-out.lite:before {
  background: #B26D28;
}
.hvr-radial-out.disabled:before { content: none; }
      
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50XSwaPGQ3q5d0N7w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* latin-ext */
@font-face {
  font-family: 'Parisienne';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/parisienne/v13/E21i_d3kivvAkxhLEVZpQyZwD8CtevK5qw.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Parisienne';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/parisienne/v13/E21i_d3kivvAkxhLEVZpQyhwD8CtevI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
