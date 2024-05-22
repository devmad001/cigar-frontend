<template>
    <div class="change-password-modal">
        <form autocomplete="off" @submit.prevent="submitForm">
            <div class="block-input">
                <label class="label" for="current">Current</label>
                    <input 
                        type="text" 
                        id="current" 
                        :class="{invalid: !current.isValid}" 
                        v-model.trim="current.val"
                        maxlength="48"
                    />
                <span class="eye" :class="{show: !currentIsHide, hide: currentIsHide}" @click="toggleCurrentIsHideVisibility"></span>
                <p class="error" v-if="!current.isValid">{{ current.errorMessage }}</p>
            </div>
            <div class="block-input">
                <label class="label" for="password">New Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        :class="{invalid: !password.isValid}" 
                        v-model.trim="password.val"
                        maxlength="48"
                    />
                <span class="eye" :class="{show: !passwordIsHide, hide: passwordIsHide}" @click="togglePasswordVisibility"></span>
                <p class="error" v-if="!password.isValid">{{ password.errorMessage }}</p>
            </div>
            <div class="block-input">
                <label class="label" for="password-confirmation">Confirm New Password</label>
                <input 
                    type="password" 
                    id="password-confirmation" 
                    :class="{invalid: !passwordConfirmation.isValid}" 
                    v-model.trim="passwordConfirmation.val"
                    maxlength="48"
                />
                <span class="eye" :class="{show: !passwordConfirmationIsHide, hide: passwordConfirmationIsHide}" @click="togglePasswordConfirmationVisibility"></span>
                <p class="error" v-if="!passwordConfirmation.isValid">{{ passwordConfirmation.errorMessage }}</p>
            </div>
            <button aria-label="submit" :disabled="validateForm" @click.prevent="submitForm" class="btn-save hvr-radial-out lite">
              <a>Save</a>
            </button>
        </form>
    </div>
</template>

<script>

export default {
    emits: ['closeChangePassword'],
    data() {
        return {
            current: {
                val: '',
                isValid: true,
                errorMessage: ''
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
            currentIsHide: false,
            passwordConfirmationIsHide: true,
            isLoading: false,
        }
    },
    methods: {
        closeModal() {
          this.$emit("closeChangePassword");
        },
        async submitForm() {
          const url = "https://hiscigar.com/api/v1/users/change_password";
          await fetch(
            url,
            {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Session-Token': this.$store.getters.token
            },
            body: JSON.stringify({ 
              current_password : this.current.val,
              password: this.password.val,
              password_confirmation : this.passwordConfirmation.val})
            }
          )

          this.closeModal()
        },
        toggleCurrentIsHideVisibility(target) {
            this.currentIsHide = !this.currentIsHide;
            const input = target.target.previousSibling;
            this.toggleInputType(input);
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
    },
    computed: {
        validateForm() {
          return !(this.current.isValid && this.password.isValid && this.passwordConfirmation.isValid);
        },
        passwordVal() {
            return this.password.val;
        },
        passwordConfirmationVal() {
            return this.passwordConfirmation.val;
        },
        currentVal() {
            return this.current.val;
        }
    },
    watch: {
        currentVal(curValue) {
            this.formIsValid = true;
            
            if (curValue === '' || curValue.length < 8 || curValue.length > 48) {
                this.current.isValid = false;
                this.formIsValid = false;
                if (curValue === '' || curValue.length < 8 || curValue.length > 48 ) {
                this.current.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
                } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(curValue)){
                  this.password.errorMessage = 'Please, enter your password correctly';
                }
            } else {
                this.current.isValid = true;
                this.formIsValid = true;
            }
        },
        passwordVal(curValue) {
            this.formIsValid = true;
            
            if (curValue === '' || 
                curValue.length < 8 || 
                curValue.length > 48 || 
                curValue !== this.passwordConfirmation.val || 
                !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(curValue)
              ) {
                this.password.isValid = false;
                this.formIsValid = false;                
                if (curValue === '' || curValue.length < 8 || curValue.length > 48 ) {
                this.password.errorMessage = 'Your password must be at least 8 and at most 48 characters long';
                } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(curValue)){
                  this.password.errorMessage = 'Please, enter your password correctly';
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
                } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(curValue)){
                  this.password.errorMessage = 'Please, enter your password correctly';
                } else {
                this.password.errorMessage = 'Password mismatch';
                }
            } else {
                this.passwordConfirmation.isValid = true;
                this.password.isValid = true;
                this.formIsValid = true;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.change-password-modal {
  max-width: 380px;
  margin: 30px auto 35px;
  .block-input{
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      position: relative;
      .label {
          margin: 0 0 5px 5px;
      }
      .error {
          margin-left: 5px;
      }
      span.eye {
      content: "";
      width: 18px;
      height: 18px;
      position: absolute;
      top: 28px;
      right: 7px;
      
          &.show { 
          top: 30px; 
          background: url('../../../assets/img/eye_on.png'); 
          background-repeat: no-repeat;
          }
          &.hide { background: url('../../../assets/img/eye_off.png'); }
      }
      input {
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
          outline: none;

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
  }
  .btn-save {
      margin-top: 30px;
      cursor: pointer;
      width: 102px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #6C3F13;
      border-radius: 25px;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      text-decoration: none;
      color: #fff;
      height: 50px;
      &:disabled {
        background-color: #E5E5E5;
        pointer-events: none;
      }
    }

  .name {
    margin: 0 0 5px 10px;
  }

  .error {
    margin: 2px 0 0 15px;
    font-size: 10px;
    font-weight: 400;
    color: #FF3C3C;
  }
}
   
</style>
