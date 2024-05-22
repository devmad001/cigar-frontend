<template>
  <div :class="[classname?.defaultClass]">
    <form autocomplete="off" @submit.prevent="submitForm" :class="classname?.advertiseStyle">
      <div class="container-input">
        <div class="title">{{title}}</div>
        <div class="row">
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            :class="{invalid: !name.isValid}"
            v-model.trim="name.val"
            @focus="handleFocus"
            maxlength="48"
          />
          <p class="error" v-if="!name.isValid">{{ name.errorMessage }}</p>
        </div>
        <div class="row">
          <label for="email">Your email</label>
          <input
            type="text"
            id="email"
            :class="{invalid: !email.isValid}"
            v-model.trim="email.val"
            @focus="handleFocus"
            maxlength="48"
          />
          <p class="error" v-if="!email.isValid">{{ email.errorMessage }}</p>
        </div>
      </div>
      <div class="container-textarea">
        <div class="row">
          <label for="textarea">Message </label>
          <textarea
            type="text"
            id="textarea"
            @focus="handleFocus"
            :class="{invalid: !textarea.isValid}"
            v-model.trim="textarea.val"
          />
          <p class="error" v-if="!textarea.isValid">{{textarea.errorMessage}}</p>
        </div>
        <div class="row">
          <vue-recaptcha
            siteKey="6LfVO24cAAAAADAtqbGsZzhIZau4ykcK-R63dVSm"
            size="normal"
            theme="light"
            :tabindex="0"
            @verify="recaptchaVerified"
            @expire="recaptchaExpired"
            ref="vueRecaptcha"
          />
        </div>
        <div class="btn-block">
          <button aria-label="submit" :disabled="validateForm" @click.prevent="submitForm" class="btn hvr-radial-out lite">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import vueRecaptcha from 'vue3-recaptcha2';

export default {
  components: {
    vueRecaptcha
  },
  data() {
    return{
      name: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      email: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      textarea: {
        val: '',
        isValid: true,
        errorMessage: ''
      },
      recaptchaIsValid: false,
      formIsValid: true,
      isLoading: false,
      isFormSubmmited: false,
    }
  },
  props: {
    title: {
      type: String
    },
    classname: {
      type: Object
    }
  },
  computed: {
    validateForm() {
      if(this.isFormSubmmited) return true
      if(this.name.val === '' && this.email.val === '' && this.textarea.val === '' && this.recaptchaIsValid) return true
      return !(this.name.isValid && this.email.isValid && this.textarea.isValid && this.recaptchaIsValid);
    },
    nameVal() {
      return this.name.val;
    },
    emailVal() {
      return this.email.val;
    },
    textareaVal() {
      return this.textarea.val;
    }
  },
  watch: {
    nameVal(curValue) {
      this.formIsValid = true;
      if(this.isFormSubmmited) return;
      if (curValue === '' || curValue.length > 48 || curValue.length < 6) {
        this.name.isValid = false;
        this.formIsValid = false;
        this.name.errorMessage = 'Invalid data entered. Please check the entered data';
      } else {
        this.name.isValid = true;
        this.formIsValid = true;
      }
    },
    emailVal(curValue) {
      this.formIsValid = true;
      if(this.isFormSubmmited) return;
      if ((curValue === '' || curValue.length < 6 || curValue.length > 48 || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(curValue)) && !this.email.reload) {
        this.email.isValid = false;
        this.formIsValid = false;
        this.email.errorMessage = 'Invalid data entered. Please check the entered data';
      } else {
        this.email.isValid = true;
        this.formIsValid = true;
      }
    },
    textareaVal(curValue) {
      this.formIsValid = true;
      if(this.isFormSubmmited) return;
      if (curValue === '' || curValue.length < 6) {
        this.textarea.isValid = false;
        this.formIsValid = false;
        this.textarea.errorMessage = 'Invalid data entered. Please check the entered data';
      } else {
        this.textarea.isValid = true;
        this.formIsValid = true;
      }
    }
  },
  methods: {
    async submitForm() {
      const response = await fetch('https://hiscigar.com/api/v1/help/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Session-Token': this.$store.getters.token
          },
          body: JSON.stringify({email: this.email.val, full_name: this.name.val, body: this.textarea.val})
        }
      )
      const responseData = await response.json();
      if (!response.ok) {
        return this.$toast.error(responseData?.errors[0]);
      }
      this.$toast.success("Successfully Completed");
      this.resetForm();
    },
    recaptchaVerified(response) {
      if (response) this.verifyToken(response);
    },
    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
    },
    async verifyToken(token) {
      const response = await fetch('https://hiscigar.com/api/v1/verify_recaptcha',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token: token})
        }
      )
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.error);
        throw error;
      }
      this.recaptchaIsValid = true;
    },
    resetForm() {
      this.textarea.val = '';
      this.email.val = '';
      this.name.val = '';
      this.isFormSubmmited = true
      this.textarea.isValid = true;
      this.email.isValid = true;
      this.name.isValid = true;
      this.recaptchaIsValid = false;
      this.$refs.vueRecaptcha.reset();
    },
    handleFocus() {
      this.isFormSubmmited = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.question-form {
  width: 380px;
  margin: 0 68px 0 0;
  height: 77%;
  padding: 50px;
  background: #fcf9f6;
  position: relative;
  z-index: 1;
}
.advertise-form {
  margin: 0 130px 50px;
  padding: 50px 100px;
  background: #FCF9F6;
  position: relative;
  z-index: 1;
}

.question-form, .advertise-form {
  .btn-block {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .btn {
    font-family: Lato;
    background-color: #6C3F13;
    padding: 12px 30px 14px 30px;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    border-radius: 25px;
    margin-top: 50px;
    cursor: pointer;
    &:disabled {
      background-color: #E5E5E5;
      pointer-events: none;
    }
  }

  .title {
    font-family: Lato;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    color: #393939;
    margin-bottom: 30px;
    text-align: start;
  }

  .advertise-style {
    display: flex;
    justify-content: space-between;
    .container-textarea {
      max-width: 380px;
      width: 100%;
      margin: 0 50px;
    }
  }

  .container-input {
    max-width: 380px;
    width: 100%;
  }
}
.advertise-form:before {
  content: "";
  background-image: url('../../../assets/img/question.png');
  background-repeat: no-repeat;
  z-index: -1;
  top: 34px;
  right: 0;
  bottom: 20px;
  position: absolute;
  opacity: .3;
  width: 300px;
}
.question-form:before {
  content: "";
  background-image: url('../../../assets/img/question.png');
  background-repeat: no-repeat;
  z-index: -1;
  left: 177px;
  top: 351px;
  right: 0;
  bottom: 20px;
  position: absolute;
  opacity: .3;
}

.row {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;

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
    text-align: start;

  }

  textarea {
    width: 100% !important;
    height: 100px!important;
    resize: none;
  }

  input, textarea{
    background: #FFFFFF;
    border: 1px solid #F2E2D3;
    box-sizing: border-box;
    border-radius: 2px;
    height: 30px;
    padding: 5px 10px;
    outline: none;
    width: 100%;

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
  .error {
    margin: 2px 0 0 15px;
    font-size: 10px;
    font-weight: 400;
    color: #FF3C3C;
    text-align: start;
  }
}

@media screen and (max-width: 1200px){
  .advertise-form {
    margin: 0 70px 50px;
    padding: 50px 50px;
  }
  .question-form {
    margin: 50px auto;
  }
}

@media screen and (max-width: 560px) {
  .question-form {
    padding: 30px;
    max-width: 82%;
  }
}

@media screen and (max-width: 720px) {
  .advertise-form {
    margin: 0 25px 50px;
    padding: 50px 25px;
  }
  .advertise-style {
    flex-direction: column;
    .container-textarea {
      margin: 0 !important;
    }
  }
}

@media screen and (max-width: 420px) {
  form {
    display: flex;
    flex-direction: column;
  }
  .question-form, .advertise-form .container-textarea {
    margin: 0;
  }
}

</style>