<template>
  <div>
    <form autocomplete="off" id="edit-personal-data-form" @submit.prevent="submitForm">
      <div class="edit-personal-data-form">
        <div class="block-input">
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            :class="{invalid: !name.isValid}"
            v-model.trim="name.val"
            maxlength="48"
          />
          <p class="error" v-if="!name.isValid">Incorrect Name</p>
      </div>
      <div v-show="!isGoogleLogin" class="block-input">
        <label for="email">Email</label>
            <input
              type="text"
              id="email"
              :class="{invalid: !email.isValid}"
              v-model.trim="email.val"
              maxlength="48"
            />
        <p class="error" v-if="!email.isValid">Incorrect Email</p>
      </div>
      <button aria-label="submit" :disabled="validateForm" @click.prevent="submitForm" class="btn-save hvr-radial-out lite">
           <a>Save</a>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
    emits: ['closeEditPersonalData'],
    data() {
        return{
            name: {
                val: this.userInfo?.full_name,
                isValid: true
            },
            email: {
                val: this.userInfo?.email,
                isValid: true
            },
            formIsValid: true,
            isLoading: false
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeEditPersonalData");
        },
        async submitForm() {
            await fetch('https://hiscigar.com/api/v1/users/profile',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Token': this.$store.getters.token
                    },
                    body: JSON.stringify({email: this.email.val, full_name: this.name.val})
                }

            )
            this.$store.dispatch("getUserInfo");
            this.closeModal()
        }
    },
    props: {
        userInfo: {
            type: Object,
        },
    },
    computed: {
      validateForm() {
        return !(this.name.isValid && this.email.isValid);
      },
        nameVal() {
            return this.name.val;
        },
        emailVal() {
            return this.email.val;
        },
      isGoogleLogin() {
        return this.userInfo?.social_type === 'google'
      },
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
            if (curValue === '' || curValue.length < 6 || curValue.length > 48 || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(curValue)) {
                this.email.isValid = false;
                this.formIsValid = false;
            } else {
                this.email.isValid = true;
                this.formIsValid = true;
            }
        },
    },
}
</script>


<style lang="scss" scoped>
.edit-personal-data-form {
  max-width: 380px;
  margin: 30px auto 35px;
  .block-input{
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      label {
          margin: 0 0 5px 5px;
      }
      input {
          outline: none;
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
