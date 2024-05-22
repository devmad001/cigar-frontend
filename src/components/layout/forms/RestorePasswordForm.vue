<template>
  <div class="main">
    <form id="restore-form">
      <div class="row">
        <div class="column first">
          <label for="new-password">Password</label>
          <input
            type="password"
            id="new-password"
            :class="{invalid: !password.isValid}"
            v-model.trim="password.val"
          />
          <span class="eye" :class="{show: !passwordIsHide, hide: passwordIsHide}" @click="togglePasswordVisibility"></span>
          <p class="error" v-if="!password.isValid">{{ password.errorMessage }}</p>
        </div>
        <div class="column">
          <label for="new-password-confirmation">Confirm Password</label>
          <input
            type="password"
            id="new-password-confirmation"
            :class="{invalid: !passwordConfirmation.isValid}"
            v-model.trim="passwordConfirmation.val"
          />
          <span class="eye" :class="{show: !passwordConfirmationIsHide, hide: passwordConfirmationIsHide}" @click="togglePasswordConfirmationVisibility"></span>
          <p class="error" v-if="!passwordConfirmation.isValid">{{ passwordConfirmation.errorMessage }}</p>
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
          Save New Password
        </a>
        <base-spinner v-show="isLoading"></base-spinner>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['token'],
  emits: ['closeModal'],
  data() {
    return {
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
      isLoading: false,
      passwordIsHide: true,
      passwordConfirmationIsHide: true,
      passwordWatchValid: false,
      passwordConfirmationWatchValid: false
    }
  },
  computed: {
    passwordVal() {
      return this.password.val;
    },
    passwordConfirmationVal() {
      return this.passwordConfirmation.val;
    },
    buttonIsDisabled() {
      return !this.passwordWatchValid && !this.passwordConfirmationWatchValid;
    }
  },
  watch: {
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
        this.passwordWatchValid = true;
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
        this.passwordConfirmationWatchValid = true;
      }
    }
  },
  methods: {
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
    async submit() {
      this.formIsValid = true;
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;
      const response = await fetch(
        'https://hiscigar.com/api/v1/users/reset_password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: this.token,
            password: this.password.val,
            password_confirmation: this.passwordConfirmation.val
          })
        }
      );

      this.isLoading = false;
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.errors || 'Something went Wrong. Please try again');
        this.$toast.error(error.toString());
        return;
      }
      this.$emit('closeModal');
      this.$router.replace('/');
      this.$toast.success("Successfully Completed");
    },
    validateForm() {
      this.formIsValid = true;
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
    }
  },
}
</script>

<style lang="scss" scoped>
  div form#restore-form {
    padding: 30px 170px 0;

    .row {
      margin-bottom: 30px;
      .column { position: relative; }
      .column.first { margin-bottom: 30px; }
      &.error-message {
        margin-bottom: 10px;
        margin-top: -25px;

        p {color: #FF3C3C;}
      }

      span.eye {
        content: "";
        width: 16px;
        height: 16px;
        position: absolute;
        top: 30px;
        right: 7px;

        &.show {
          top: 32px;
          background: url('../../../assets/img/eye_on.png');
        }
        &.hide { background: url('../../../assets/img/eye_off.png'); }
      }

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
    }
  }

  @media screen and (max-height: 900px) {
    div.main { margin-top: 15px; }
    div form#restore-form {
      padding-top: 15px;
      .row { margin-bottom: 15px; }
    }
  }

  @media screen and (max-width: 720px) {
    div form#restore-form {
      padding: 15px 100px;
    }
  }

  @media screen and (max-width: 540px) {
    div form#restore-form {
      padding: 15px 50px;
      .row {
        display: block;
        max-width: 100%;
        margin: auto;

        .btn:link,
        .btn:visited {
          margin-top: 30px;
          padding: 14px 0;
        }
      }
    }
  }
</style>
