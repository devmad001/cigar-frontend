<template>
  <div>
    <form autocomplete="off" id="edit-contacts-form" @submit.prevent="submitForm">
      <div class="content-edit-contacts">
        <div class="block-input">
          <label class="label" for="state">State</label>
          <select v-model="state.index" id="state" :class="{invalid: !state.isValid, 'not-selected': !state.val}">
            <option disabled value="">{{userInfo?.state}}</option>
            <option v-for="(state, index) in states" :key="state.iso" v-bind:value="index">{{ state.name }}</option>
          </select>
          <p class="error" v-if="!state.isValid">Incorrect State</p>
        </div>
        <div cclass="block-input">
          <label class="label" for="city">City</label>
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
        <div class="block-input address">
          <label class="label" for="address">Address</label>
          <input
            type="text"
            id="address"
            :class="{invalid: !address.isValid}"
            v-model.trim="address.val"
            maxlength="48"
          />
          <p class="error" v-if="!address.isValid">Incorrect Address</p>
        </div>
        <div class="block-input">
          <label class="label" for="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            :class="{invalid: !phone.isValid}"
            placeholder="+1 (XXX) XXX-XXXX"
            v-model.trim="phone.visibleValue"
            v-maska="'+1 (###) ###-####'"
            maxlength="48"
          />
          <p class="error" v-if="!phone.isValid">Incorrect Phone Number</p>
        </div>
        <button aria-label="submit" :disabled="validateForm" @click.prevent="submitForm" class="btn-save hvr-radial-out lite">
          <a>Save</a>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { maska } from "maska"
import "@vueform/multiselect/themes/default.css";

export default {
  emits: ['closeContactsBlockEdit'],
  directives: { maska: maska },
  components: {
    Multiselect,
  },
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    return {
      cities: [],
      phone: {
        visibleValue: this.userInfo?.phone_number,
        val: '',
        isValid: true
      },
      state: {
        val: {
          value: this.userInfo?.state,
          label: this.userInfo?.state
        },
        index: '',
        iso:'',
        isValid: true
      },
      city: {
        val: this.userInfo?.city,
        isValid: true
      },
      address: {
        val: this.userInfo?.address,
        isValid: true
      },
      formIsValid: true,
      isLoading: false
    }
  },
  computed: {
    validateForm() {
      return !(this.address.isValid && this.phone.isValid && this.city.isValid && this.state.isValid);
    },
    states() {
      return this.$store.getters.states;
    },
    countryStatesToken() {
      return this.$store.getters.countryStatesToken;
    },
    registrationButtonIsDisabled () {
      if (
        this.formIsValid === false ||
        this.phone.val === '' ||
        this.state.val === '' ||
        this.city.val === '' ||
        this.address.val === ''
      ) {
        return true;
      } else {
        return false;
      }
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
  },
  mounted: function() {
    if(this.state.val.value) {
      const country = this.states.find(item => item.name === this.state.val.value);
      this.state.iso = country.iso
      return this.getCities(this.state.iso, true);
    }
  },
  watch: {
    phoneVal(curValue) {
      this.formIsValid = true;
      if (curValue === '' || curValue.length <= 16) {
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
  },
  methods: {
    сheckNumber(target) {
      target.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    },
    closeModal() {
      this.$emit("closeContactsBlockEdit");
    },
    async submitForm() {
      await fetch('https://hiscigar.com/api/v1/users/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Session-Token': this.$store.getters.token
          },
          body: JSON.stringify({
            state: this.state.val, 
            city: this.city.val,
            address: this.address.val,
            phone_number: this.phone.val,
          })
        }
      )
      this.$store.dispatch("getUserInfo");
      this.closeModal()
    },
    async getCities(state, saveCity) {
      this.cities = null;
      this.city.isValid = true;
      if(!saveCity) this.city.val = ''
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
      this.cities = responseData.map(city => { return city.name });
      this.city.isValid = true;
    }
  },
}
</script>

<style lang="scss" scoped>
div form#edit-contacts-form {
    label {
      margin: 0 0 5px 5px;
    }
    :deep(.multiselect.is-single) {
      margin: 0;

      .multiselect-input {
        margin-top: 5px;
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
        width: 8px;
        height: 3px;
        margin-right: 6px;
      }
    }
  }
.content-edit-contacts {
  max-width: 380px;
  margin: 30px auto 35px;
  .address {
    margin-top: 15px;
  }
  .block-input{
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    .label {
      margin: 0 0 5px 5px;
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
    .multiselect-input {
      border: 1px solid #F2E2D3;
    }
    input, #state {
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