<template>
  <div class="crop-modal">
    <Cropper :image="uploadedAvatar"/>
  </div>
</template>

<script>
import Cropper from "./Cropper";
export default {
  components: {Cropper},
  emits: ['closeCropAvatarModalModal'],
  computed: {
    uploadedAvatar() {
      return this.$store.getters.croppedAvatar
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeCropAvatarModalModal");
    },
  },
}
</script>

<style lang="scss" scoped>
.crop-modal {
  margin-top: 30px;
}

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
      background-image: url('../../../../assets/img/custom_select_arrow.svg');
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
      background-image: url('../../../../assets/img/custom_select_arrow.svg');
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