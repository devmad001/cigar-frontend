<template>
  <div class="main">
    <p class="subheader">
      Enter the email you provided during registration.
    </p>
    <p class="subheader">
      We will send a link to reset your password.
    </p>
    <form id="forgot-form">
      <div class="row">
        <div class="column">
          <label for="email">Email</label>
          <input 
            type="text" 
            id="email" 
            :class="{invalid: !formIsValid}" 
            v-model.trim="email" 
          />
          <p class="error" v-if="!formIsValid">{{ error }}</p>
        </div>
      </div>
      <div class="row">
        <a 
          href="" 
          class="btn btn-full hvr-radial-out lite"
          :class="{disabled: buttonIsDisabled}"
          @click.prevent="submit" 
          v-show="!isLoading"
        >
          Send Instructions
        </a>
        <base-spinner v-show="isLoading"></base-spinner>
      </div>
    </form>      
  </div>
</template>

<script>
export default {
  emits: ['closeForgotModal'],
  data() {
    return {
      email: '',
      formIsValid: true,
      error: null,
      isLoading: false
    }
  },
  computed: {
    buttonIsDisabled() {
      if (this.email !== '' && this.emailIsValid()) return false;
      return true;
    }
  },
  methods: {
    emailIsValid() {
      const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return validator.test(this.email);
    },
    async submit() {
      this.formIsValid = true;
      this.error = null;
      if (!this.emailIsValid()) {
        this.formIsValid = false;
        this.error = 'Incorrect Email';
        return;
      }
      this.isLoading = true;
      const response = await fetch(
        'https://hiscigar.com/api/v1/users/forgot_password', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: this.email})
        }
      );

      this.isLoading = false;
      if (!response.ok) {
        this.formIsValid = false;
        this.error = 'This email is not in the database, please try another one.';
        this.$toast.error('Failed');
        return;
      } 
      this.$toast.success("Successfully Completed");
      this.email = '';
    }
  },
}
</script>

<style lang="scss" scoped>
  div.main { margin-top: 30px; }
  .subheader {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #535249;
    text-align: center;
    width: 380px;
    margin: auto;

    &.message{ color: rgb(109, 202, 72); }
  }
  div form#forgot-form {
    padding: 30px 170px 0;

    .row { 
      margin-bottom: 30px;

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
    div.main { margin-top: 15px; }
    div form#forgot-form {
      padding-top: 15px;
      .row { margin-bottom: 15px; }
    }
  }

  @media screen and (max-width: 720px) {
    div form#forgot-form {
      padding: 15px 100px;
    }
  }

  @media screen and (max-width: 540px) {
    .subheader { max-width: 90%; }
    div form#forgot-form {
      padding: 15px 50px;
    }
  }
</style>
