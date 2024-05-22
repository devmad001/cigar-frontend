<template>
    <div>
      <form autocomplete="off" id="register-form" @submit.prevent="submitForm">
        <div class="row">
          <div class="column first">
            <label for="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              :class="{invalid: !name.isValid}" 
              v-model.trim="name.val"
            />
            <p class="error" v-if="!name.isValid">Incorrect Name</p>
          </div>
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
          <div class="column first">
            <label for="phone">Phone Number</label>
            <input 
              type="text" 
              id="phone" 
              :class="{invalid: !phone.isValid}"
              placeholder="+1 (XXX) XXX-XXXX"
              v-model.trim="phone.visibleValue"
              v-maska="'+1 (###) ###-####'"
            />
            <p class="error" v-if="!phone.isValid">Incorrect Phone Number</p>
          </div>
          <div class="column">
            <label for="state">State</label>
            <select v-model="state.index" id="state" :class="{invalid: !state.isValid, 'not-selected': !state.val}">
              <option disabled value="">Not Selected</option>
              <option v-for="(state, index) in states" :key="state.iso" v-bind:value="index">{{ state.name }}</option>
            </select>
            <p class="error" v-if="!state.isValid">Incorrect State</p>
          </div>
        </div>
        <div class="row">
          <div class="column first">
            <label for="city">City</label>
            <Multiselect
              v-model="city.val"
              :options="cities"
              :searchable="true"
              :close-on-select="true"
              :allow-empty="true"
              :showOptions="!!state.iso"
              placeholder="Not Selected"
              :class="{invalid: !city.isValid}"
            />
            <p class="error" v-if="!city.isValid">Incorrect City</p>
          </div>
          <div class="column">
            <label for="address">Address</label>
            <input 
              type="text" 
              id="address" 
              :class="{invalid: !address.isValid}" 
              v-model.trim="address.val"
            />
            <p class="error" v-if="!address.isValid">Incorrect Address</p>
          </div>
        </div>
        <div class="row">
          <div class="column first">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              :class="{invalid: !password.isValid}" 
              v-model.trim="password.val"
            />
            <span class="eye" :class="{show: !passwordIsHide, hide: passwordIsHide}" @click="togglePasswordVisibility"></span>
            <p class="error" v-if="!password.isValid">{{ password.errorMessage }}</p>
          </div>
          <div class="column">
            <label for="password-confirmation">Confirm Password</label>
            <input 
              type="password" 
              id="password-confirmation" 
              :class="{invalid: !passwordConfirmation.isValid}" 
              v-model.trim="passwordConfirmation.val"
            />
            <span class="eye" :class="{show: !passwordConfirmationIsHide, hide: passwordConfirmationIsHide}" @click="togglePasswordConfirmationVisibility"></span>
            <p class="error" v-if="!passwordConfirmation.isValid">{{ passwordConfirmation.errorMessage }}</p>
          </div>
        </div>
        <div class="row">
          <p>
            By creating account, you agree with our <span><router-link to="/terms-and-conditions" @click="closeModal">Terms & Conditions</router-link></span> 
            and <span><router-link to="/privacy-policy" @click="closeModal">Privacy Policy</router-link></span>
          </p>
        </div>
        <div class="row">
          <a href="" class="btn btn-full hvr-radial-out lite" :class="{disabled: registrationButtonIsDisabled}" @click.prevent="submitForm" v-show="!isLoading">Register</a>
          <base-spinner v-show="isLoading"></base-spinner>
        </div>
        <div class="row social-login">
          <div class="column first">
            <a href="" class="btn social facebook" @click.prevent="loginWithFacebook">Register via Facebook</a>
          </div>
          <div class="column">
            <a href="" class="btn social google" @click.prevent="handleClickSignIn">Register with  Google</a>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { initFbsdk } from '../../../fb.js';
import { maska } from "maska"
import Multiselect from '@vueform/multiselect';
import "@vueform/multiselect/themes/default.css";

export default {
  emits: ['closeRegistration'],
  directives: { maska: maska },
  components: {
    Multiselect
  },
  data() {
    return {
      cities: [],
      name: {
        val: '',
        isValid: true
      },
      email: {
        val: '',
        isValid: true
      },
      phone: {
        visibleValue: '',
        val: '',
        isValid: true
      },
      state: {
        val: '',
        index:'',
        iso:'',
        isValid: true
      },
      city: {
        val: '',
        isValid: true
      },
      address: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      passwordConfirmation: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      formIsValid: true,
      passwordIsHide: true,
      passwordConfirmationIsHide: true,
      isLoading: false
    }
  },
  computed: {
    states() {
      return this.$store.getters.states;
    },
    countryStatesToken() {
      return this.$store.getters.countryStatesToken;
    },
    registrationButtonIsDisabled () {
      if (
        this.formIsValid === false || 
        this.name.val === '' || 
        this.email.val === '' || 
        this.phone.val === '' || 
        this.state.val === '' || 
        this.city.val === '' || 
        this.address.val === '' || 
        this.password.val === '' || 
        this.passwordConfirmation.val === ''
      ) {
          return true;
        } else {
          return false;
        }
    },
    nameVal() {
      return this.name.val;
    },
    emailVal() {
      return this.email.val;
    },
    phoneVal() {
      return this.phone.visibleValue;
    },
    stateIndex() {
      return this.state.index;
    },
    cityVal() {
      return this.city.val;
    },
    addressVal() {
      return this.address.val;
    },
    passwordVal() {
      return this.password.val;
    },
    passwordConfirmationVal() {
      return this.passwordConfirmation.val;
    }
  },
  watch: {
    nameVal(curValue) {
      this.formIsValid = true;
      if (curValue === '' || curValue.length > 48) {
        this.name.isValid = false;
        this.formIsValid = false;
      } else {
        this.name.isValid = true;
        this.formIsValid = true;
      }
    },
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
    phoneVal(curValue) {
      this.formIsValid = true;
      if (curValue === '') {
        this.phone.isValid = false;
        this.formIsValid = false;
      } else {
        this.phone.isValid = true;
        this.formIsValid = true;
        this.phone.val = '+' + curValue.replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,4})/)[0];
      }
    },
    stateIndex(curValue) {
      this.formIsValid = true;
      const state = this.states[curValue];
      this.state.val = state.name;
      this.state.iso = state.iso;
      this.getCities(state.iso);
      if (this.state.iso === '') {
        this.state.isValid = false;
        this.formIsValid = false;
      } else {
        this.state.isValid = true;
        this.formIsValid = true;
      }
    },
    cityVal(curValue) {
      this.formIsValid = true;
      if (curValue === '') {
        this.city.isValid = false;
        this.formIsValid = false;
      } else {
        this.city.isValid = true;
        this.formIsValid = true;
      }
    },
    addressVal(curValue) {
      this.formIsValid = true;
      if (curValue === '') {
        this.address.isValid = false;
        this.formIsValid = false;
      } else {
        this.address.isValid = true;
        this.formIsValid = true;
      }
    },
    passwordVal(curValue) {
      this.formIsValid = true;
    
      if (curValue === '' || curValue.length < 8 || curValue.length > 48 || curValue !== this.passwordConfirmation.val) {
        this.password.isValid = false;
        this.formIsValid = false;
        if (curValue === '' || curValue.length < 8 || curValue.length > 48 ) {
          this.password.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        } else {
          this.password.errorMessage = 'Password mismatch';
        }
      } else {
        this.password.isValid = true;
        this.passwordConfirmation.isValid = true;
        this.formIsValid = true;
      }
    },
    passwordConfirmationVal(curValue) {
      this.formIsValid = true;

      if (curValue === '' || curValue.length < 8 || curValue.length > 48 || curValue !== this.password.val) {
        this.passwordConfirmation.isValid = false;
        this.password.isValid = false;
        this.formIsValid = false;
        if (curValue === '' || curValue.length < 8 || curValue.length > 48 ) {
          this.passwordConfirmation.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        } else {
          this.passwordConfirmation.errorMessage = 'Password mismatch';
        }
      } else {
        this.passwordConfirmation.isValid = true;
        this.password.isValid = true;
        this.formIsValid = true;
      }
    }
  },
  mounted () {
    initFbsdk();
  },
  methods: {
    сheckNumber(target) {
      target.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    },
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
      if (this.name.val === '' || this.name.val.length > 48) {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === '' || this.email.val.length < 6 || this.email.val.length > 48) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.phone.val === '') {
        this.phone.isValid = false;
        this.formIsValid = false;
      }
      if (this.state.val === '') {
        this.state.isValid = false;
        this.formIsValid = false;
      }
      if (this.city.val === '') {
        this.city.isValid = false;
        this.formIsValid = false;
      }
      if (this.address.val === '') {
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '' || this.password.val.length < 8 || this.password.val.length > 48 || this.password.val !== this.passwordConfirmation.val) {
        this.password.isValid = false;
        this.formIsValid = false;
         if (this.password.val === '' || this.password.val.length < 8 || this.password.val.length > 48 ) {
          this.password.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        } else {
          this.password.errorMessage = 'Password mismatch';
        }
      }
      if (this.passwordConfirmation.val === '' || this.passwordConfirmation.val.length < 8 || this.passwordConfirmation.val.length > 48 || this.passwordConfirmation.val !== this.password.val) {
        this.passwordConfirmation.isValid = false;
        this.formIsValid = false;
        if (this.passwordConfirmation.val === '' || this.passwordConfirmation.val.length < 8 || this.passwordConfirmation.val.length > 48 ) {
          this.passwordConfirmation.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
        } else {
          this.passwordConfirmation.errorMessage = 'Password mismatch';
        }
      }
    },
    async submitForm() {
      this.validateForm();
      if (this.registrationButtonIsDisabled === true) {
        return;
      }

      const actionPayload = {
        userData: {
          email: this.email.val,
          phone_number: this.phone.val,
          full_name: this.name.val,
          password: this.password.val,
          password_confirmation: this.passwordConfirmation.val,
          state: this.state.val,
          city: this.city.val,
          address: this.address.val
        }
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch('signup', actionPayload);
        this.closeModal();
        this.$toast.success("Successfully Completed");
      } catch (err) {
        this.$toast.error(err.toString());
      }

      this.isLoading = false;
    },

    closeModal() {
      this.$emit("closeRegistration");
    },

    togglePasswordVisibility(target) {
      this.passwordIsHide = !this.passwordIsHide;
      const input = target.target.previousSibling;
      this.toggleInputType(input);
    },
    togglePasswordConfirmationVisibility(target) {
      this.passwordConfirmationIsHide = !this.passwordConfirmationIsHide;
      const input = target.target.previousSibling;
      this.toggleInputType(input);
    },
    toggleInputType(input) {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    },
    async getCities(state) {
      this.cities = null;
      this.city.isValid = true;
      this.city.val = '';
      const url = `https://api.countrystatecity.in/v1/countries/us/states/${state}/cities`
      const response = await fetch(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSCAPI-KEY': this.countryStatesToken
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error || 'Cities Loading is Failed. Please try again');
        throw error;
      }
      this.cities = responseData.map(city => { return city.name });
      this.city.isValid = true;
    }
  },
}
</script>

<style lang="scss" scoped>
  div form#register-form {
    :deep(.multiselect.is-single) {
      margin: 0;

      .multiselect-input {
        min-height: 30px;
        border: 1px solid #F2E2D3;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;
      }
      .multiselect-search input {
        padding: 0 35px 0 10px;
      }

      .multiselect-placeholder {
        padding-left: 10px;
        color: rgba(83, 82, 73, 0.3);
      }
      
      .multiselect-option {
        padding-left: 10px;
      }

      .multiselect-clear {
        width: 28px;
        height: 26px;
        top: 46%;
        transform: translateY(-48%);

        &::before { top: 10px; }
        &::after { top: 10px; }
      }

      .multiselect-caret {
        border: 0;
        background: transparent;
        background-image: url('../../../assets/img/custom_select_arrow.svg');
        background-size: 7px 3px;
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: 50%;
        width: 4px;
        height: 3px;
      }
    }
  }

  div form#register-form {
    padding: 30px 70px 0;

    .row { 
      margin-bottom: 30px;

      .column { position: relative; }

      .first { margin-right: 20px; }

      label {
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;
        margin-bottom: 5px;
        padding-left: 5px;
      }
      :root {
        --select-border: #777;
        --select-focus: blue;
        --select-arrow: var(--select-border);
      }

      select#state {
        appearance: none;
        background-color: transparent;
        width: 100%;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;
        background: transparent;
        background-image: url('../../../assets/img/custom_select_arrow.svg');
        background-size: 7px 3px;
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: 50%;

        &.not-selected {
          color: rgba(83, 82, 73, 0.3);
        }

        &::-ms-expand {
          display: none;
        }
      }
      input, #state {
        background: #FFFFFF;
        border: 1px solid #F2E2D3;
        box-sizing: border-box;
        border-radius: 2px;
        height: 30px;
        padding: 4px 10px;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #535249;

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
        font-weight: 400;
        transition: all 0.3s ease-out;

        &:hover {
           box-shadow: 0px 4px 15px #B26D28;
           border-radius: 25px;
        }

        &.facebook { 
          text-align: right; 
          padding-left: 28px;
        }
        &.google { 
          text-align: center; 
          padding-left: 31px;
        }

        &:before {
          position: absolute;
          content: "";
          top: 12px;
          left: 5%;
          width: 24px;
          height: 24px;
         
          background-size: cover;
          background-repeat: no-repeat;
        }
        &.facebook::before { background-image: url('../../../assets/img/facebook_logo.png'); }
        &.google::before { background-image: url('../../../assets/img/google_logo.png'); }
      }
    }
  }
  

  @media screen and (max-height: 900px) {
    div form#register-form {
      padding-top: 15px;
      .row { margin-bottom: 15px; }
    }
  }

  @media (max-height: 700px) {
    div form#register-form {
      padding-top: 10px;
      .row { margin-bottom: 7px; }
    }
  }

  @media screen and (max-width: 720px) {
    div form#register-form {
      .row.social-login {
        display: block;

        .column  {
          width: 100%;

          &.first { margin-bottom: 10px; }

          .btn.social {
            width: 100%;
            padding: 14px 0;
            text-align: center;

            &::before { left: 22%; }
          }
        }
      }
    }
  }

  @media screen and (max-width: 560px) {
    div form#register-form {
      .row .column.first {margin-right: 0;}
    }
  }

  @media screen and (max-width: 540px) {
    div form#register-form {
      padding: 0 20px;

      .row { 
        margin-bottom: 15px;
        display: block;

        .column.first { margin-bottom: 15px; }
        .btn:link,
        .btn:visited { padding: 14px 0; }
        &.social-login .column .btn.social::before { left: 25%; }
      }
    }
  }

  @media screen and (max-width: 500px) {
    div form#register-form .row.social-login .column .btn.social::before { left: 20%; }
  }
  @media screen and (max-width: 420px) {
    div form#register-form .row.social-login .column .btn.social::before { left: 15%; }
  }
  @media screen and (max-width: 350px) {
    div form#register-form .row.social-login .column .btn.social::before { left: 12%; }
  }
  @media screen and (max-width: 320px) {
    div form#register-form .row.social-login .column .btn.social::before { left: 10%; }
  }
</style>
