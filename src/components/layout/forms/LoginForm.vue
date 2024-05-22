<template>
  <div>
    <form id="login-form" @submit.prevent="submitForm">
      <div class="row">
        <div class="column">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            :class="{invalid: !email.isValid}"
            v-model.trim="email.val"
          />
          <p class="error" v-if="!email.isValid">Incorrect Email</p>
        </div>
        </div>

        <div class="row">
          <div class="column">
            <div class="flex_wrapper flex_between">
              <label for="password">Password</label>
              <a class="forgot-link" @click="forgotPassword">Forgot Password</a>
            </div>
            <input
              type="password"
              id="password"
              :class="{invalid: !password.isValid}"
              v-model.trim="password.val"
            />
            <span class="eye" :class="{show: !passwordIsHide, hide: passwordIsHide}" @click="togglePasswordVisibility"></span>
            <p class="error" v-if="!password.isValid">{{ password.errorMessage }}</p>
          </div>
        </div>
        <div class="row">
          <a href="" class="btn btn-full hvr-radial-out lite" :class="{disabled: loginButtonIsDisabled}" @click.prevent="submitForm" v-show="!isLoading">Login</a>
          <base-spinner v-show="isLoading"></base-spinner>
        </div>
        <div class="row social-login">
          <div class="column">
            <a href="" class="btn social facebook" @click.prevent="loginWithFacebook">Login via Facebook</a>
          </div>
        </div>
        <div class="row social-login">
          <div class="column">
            <a href="" class="btn social google" @click.prevent="handleClickSignIn">Login with  Google</a>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { initFbsdk } from '../../../fb.js';

export default {
  emits: ['closeLogin', 'forgotPasswordClick'],
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      formIsValid: true,
      passwordIsHide: true,
      isLoading: false
    }
  },
  computed: {
    loginButtonIsDisabled() {
      if (
        this.formIsValid === false ||
        this.email.val === '' ||
        this.password.val === ''
      ) {
          return true;
        } else {
          return false;
        }
    },
    emailVal() {
      return this.email.val;
    },
    passwordVal() {
      return this.password.val;
    }
  },
  watch: {
    emailVal(curValue) {
      this.formIsValid = true;
      if (curValue === '' || curValue.length < 6 || curValue.length > 48) {
        this.email.isValid = false;
        this.formIsValid = false;
      } else {
        this.email.isValid = true;
        this.formIsValid = true;
      }
    },
    passwordVal(curValue) {
      this.formIsValid = true;

      if (curValue === '' || curValue.length < 8 || curValue.length > 48) {
        this.password.isValid = false;
        this.formIsValid = false;
        if (curValue === '' || curValue.length < 8 || curValue.length > 48 ) {
          this.password.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        }
      } else {
        this.password.isValid = true;
        this.formIsValid = true;
      }
    },
  },
  mounted () {
    initFbsdk();
  },
  methods: {
    async loginWithFacebook() {
      try {
        window.FB.login(response => {
          const accessToken = response.authResponse.accessToken;
          if (accessToken) {
            const actionPayload = {
              userData: {
                social_type: 'facebook',
                access_token: accessToken
              }
            }
            try {
              this.$store.dispatch('socialLogin', actionPayload);
              this.$toast.success("Successfully Completed");
              this.closeModal();
            } catch (err) {
              this.$toast.error(err.toString());
            }
          }
        }, this.params)
      } catch (error) {
        this.$toast.error(error.toString());
      }
    },
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        const accessToken = googleUser.getAuthResponse().access_token;
        if (accessToken) {
          const actionPayload = {
            userData: {
              social_type: 'google',
              access_token: accessToken
            }
          }
          try {
            await this.$store.dispatch('socialLogin', actionPayload);
            this.$toast.success("Successfully Completed");
            this.closeModal();
          } catch (err) {
            this.$toast.error(err.toString());
          }
        }
      } catch (error) {
         console.warn(error.error);
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '' || this.email.val.length < 6 || this.email.val.length > 48) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '' || this.password.val.length < 8 || this.password.val.length > 48) {
        this.password.isValid = false;
        this.formIsValid = false;
         if (this.password.val === '' || this.password.val.length < 8 || this.password.val.length > 48 ) {
          this.password.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        }
      }
    },
    async submitForm() {
      this.validateForm();
      if (this.loginButtonIsDisabled === true) {
        return;
      }

      const actionPayload = {
        userData: {
          email: this.email.val,
          password: this.password.val
        }
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch('login', actionPayload);
        this.$toast.success("Successfully Completed");
        this.closeModal();
      } catch (err) {
        this.$toast.error(err.message);
      }

      this.isLoading = false;
    },
    closeModal() {
      this.$emit("closeLogin");
    },
    forgotPassword() {
      this.$emit("forgotPasswordClick");
    },
    togglePasswordVisibility(target) {
      this.passwordIsHide = !this.passwordIsHide;
      const input = target.target.previousSibling;
      this.toggleInputType(input);
    },
    toggleInputType(input) {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  div form#login-form {
    padding: 30px 70px 0;

    .row {
      margin-bottom: 30px;

      .column { position: relative; }

      label {
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;
        margin-bottom: 5px;
        padding-left: 5px;
      }
      input {
        background: #FFFFFF;
        border: 1px solid #F2E2D3;
        box-sizing: border-box;
        border-radius: 2px;
        height: 30px;
        padding: 5px 10px;

        &.invalid {
          color: #fff;
          background: #FF3C3C;
        }

        &::placeholder {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 19px;
          color: #535249;
          opacity: 0.3;
        }
      }
      span.eye {
        content: "";
        width: 18px;
        height: 18px;
        position: absolute;
        top: 30px;
        right: 7px;

        &.show {
          top: 32px;
          background: url('../../../assets/img/eye_on.png');
          background-repeat: no-repeat;
        }
        &.hide { background: url('../../../assets/img/eye_off.png'); }
      }
      p {
        font-family: 'Lato',sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;

        &.error {
          color: #FF3C3C;
          font-size: 10px;
          line-height: 12px;
          margin-bottom: -12px;
        }

        span a {
          color: #6C3F13;
          text-decoration: none;
        }
      }

      .btn:link,
      .btn:visited {
        width: 100%;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 100%;
        letter-spacing: 0.05em;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        padding: 14px 30px;
        text-decoration: none;
        border-radius: 200px;
        transition: background-color 0.2s, border-color 0.2s;
      }

      .btn-full:link,
      .btn-full:visited {
        background-color: #6C3F13;
        border: 1px solid #6C3F13;
        color: #fff;
      }

      .btn-full.disabled:link,
      .btn-full.disabled:visited {
        background-color: #E5E5E5;
        border-color: #E5E5E5;
      }

      .btn:link.social,
      .btn:visited.social {
        width: 80%;
        font-size: 16px;
        line-height: 19px;
        color: #393939;
        border: 1px solid #F2E2D3;
        padding: 14px 24px;
        position: relative;
        text-align: center;
        font-weight: 400;
        transition: all 0.3s ease-out;

        &:hover {
           box-shadow: 0px 4px 15px #B26D28;
           border-radius: 25px;
        }

        &:before {
          position: absolute;
          content: "";
          top: 12px;
          left: 30px;
          width: 24px;
          height: 24px;

          background-size: cover;
          background-repeat: no-repeat;
        }
        &.facebook::before { background-image: url('../../../assets/img/facebook_logo.png'); }
        &.google::before { background-image: url('../../../assets/img/google_logo.png'); }
      }
      .forgot-link {
        font-family: 'Lato', sans-serif;
        font-size: 12px;
        line-height: 14px;
        text-decoration-line: underline;
        color: #6C3F13;
        height: 14px;
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-height: 900px) {
    div form#login-forn {
      padding-top: 15px;
      .row { margin-bottom: 15px; }
    }
  }

  @media (max-height: 700px) {
    div form#login-form {
      padding-top: 10px;
      .row { margin-bottom: 15px; }
    }
  }

  @media screen and (max-width: 1200px){
    div form#login-form {
      padding: 30px 50px 0;

      .row .btn:link.social,
      .row .btn:visited.social {
        &:before { left: 7%; }
      }
    }
  }

  @media screen and (max-width: 980px){
    div form#login-form .row .btn:link.social {
      width: 100%;
      padding: 14px 0;
      text-align: center;

      &::before {
        left: 25%;
      }
    }
  }

  @media screen and (max-width: 720px) {
    div form#login-form{
      .row.social-login {
        display: block;

        .column  {
          width: 100%;

          &.first { margin-bottom: 10px; }

          .btn.social {
            width: 100%;
            padding: 14px 0;
            text-align: center;

            &::before { left: 25%; }
          }
        }
      }
    }
  }

  @media screen and (max-width: 540px) {
    div form#login-form {
      padding: 0 20px;

      .row {
        margin-bottom: 30px;
        display: block;

        .btn:link,
        .btn:visited { padding: 14px 0; }
        &.social-login .column .btn.social::before { left: 25%; }
      }
    }
  }

  @media screen and (max-width: 450px) {
    div form#login-form .row.social-login .column .btn.social::before { left: 18%; }
  }
  @media screen and (max-width: 380px) {
    div form#login-form .row.social-login .column .btn.social::before { left: 15%; }
  }
  @media screen and (max-width: 350px) {
    div form#login-form .row.social-login .column .btn.social::before { left: 12%; }
  }
  @media screen and (max-width: 320px) {
    div form#register-form .row.social-login .column .btn.social::before { left: 10%; }
  }
</style>
