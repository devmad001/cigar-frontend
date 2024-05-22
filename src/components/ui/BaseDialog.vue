<template>
  <teleport to="body">
    <div 
      v-if="show"
      v-show="reOpen" 
      @click="tryClose" 
      class="backdrop" 
      :class="{registration: isRegistration, login: isLogin, filter: isFilter}"
    >
      <div></div>
    </div>
    <transition name="dialog">
      
      <dialog open v-if="show" v-show="reOpen" :class="{registration: isRegistration, login: isLogin, filter: isFilter, contactEdit: isContactEdit, changePassword: isChangePassword, editPersonalData: isEditPersonalData, cropModal: modalCrop}">
        <div class="close-button" @click="tryClose"></div>
        <section :class="{modalStyle: modalClass}" id="dialog">
          <header>
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
          </header> 
          <slot></slot>
          <footer id="dialog-footer" v-show="!isFilter">
            <slot name="footer"></slot>
          </footer>
        </section>
        <section class="background">
          <div>
            <img v-show="isRegistration" src='../../assets/logo_1712.svg' alt="grey logo">
            <img v-show="isLogin" src='../../assets/logo_0501.svg' alt="grey logo">
          </div>
        </section>
      </dialog>
    
    </transition>
  </teleport>
</template>

<script>
export default {
  data: function(){
    return {
      img: this.isRegistration ? "logo_1712" : "logo_0501"
    }
  },
  props: {
    modalClass: {
      type: Boolean
    },
    modalCrop: {
      type: Boolean
    },
    reOpen: {
      type: Boolean,
      required: false,
      default: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    isRegistration: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLogin: {
      type: Boolean,
      required: false,
      default: false
    },
    isFilter: {
      type: Boolean,
      required: false,
      default: false
    },
    isContactEdit: {
      required: false,
      default: false
    },
    isChangePassword: {
      required: false,
      default: false
    },
    isEditPersonalData: {
      required: false,
      default: false
    },
    isCropAvatarModal: {
      required: false,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>

.modalStyle {
  margin: 25px 0 45px 0;
}
.cropModal {
  top: 10vh;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  
  div {
    content: url('../../assets/img/modal_back.svg');
    display: block;
    width: 80%;
    left: 10%;
    position: absolute;
    bottom: 20%;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0% 100%;
  }
}

.backdrop.login div,
.backdrop.registration div {
  bottom: 0;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  z-index: 100;
  border: none;
  box-shadow: 0px 4px 50px rgba(53, 46, 20, 0.5);
  border-radius: 2px;
  padding: 0;
  margin: 0;
  background-color: white;
  font-family: Lato;

  .close-button {
    background: url('../../assets/img/close_modal_icon.svg');
    background-size: cover;
    background-position: center;
    width: 32px;
    height: 32px;
    position: absolute;
    z-index: 11;
    top: -50px;
    right: 0;
    cursor: pointer;
  }

  section.background { display: none; }

  footer#dialog-footer { display: none; }
  
  &.registration {
    top: 7vh;
    display: flex;
    flex-direction: row-reverse;

    section#dialog { 
      width: 65%;
      footer#dialog-footer { display: block; }
    }

    section.background { 
      display: block;
      padding: 0;
      width: 35%;
      img{
        max-width: 130px;
      }
      div {
        height: 100%;
        background-image: url('../../assets/img/registration_modal_background.png');
        background-size: cover;
      } 
    }
  }

  &.login {
    top: 7vh;
    display: flex;
    width: 85%;

    section#dialog {
      width: 45%;
      footer#dialog-footer { display: block; }
    }

    section.background { 
      display: block;
      padding: 0;
      width: 65%;

      div {
        height: 100%;
        background-image: url('../../assets/img/login_modal_background.png');
        background-size: cover;
        img{
          max-width: 130px;
        }
      } 
    }
  }

  section.background div {
    text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    img { margin-bottom: 50px; }
  }

  section#dialog {
    padding: 50px 0 0;
    position: relative;

    header h2 {
      font-family: 'Lato', sans-serif;
      font-weight: 800;
      font-size: 32px;
      line-height: 38px;
      text-transform: uppercase;
      color: #393939;
      padding: 0 70px;
      text-align: center;
    }

    footer#dialog-footer {
      left: 0;
      right: 0;
      padding: 30px 70px 50px;
      background: #F2E2D3;
    }
  }
  &.login section#dialog,
  &.registration section#dialog,
  &.filter section#dialog {
    header h2 {
      text-align: left;
    }
  }
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
@media screen and (max-height: 900px) {
  dialog,
  dialog.registration,
  dialog.login {
    section#dialog {
      padding-top: 25px;

      footer#dialog-footer { padding: 30px 70px; }
    }
  }
}

@media (max-height: 700px) {
  dialog,
  dialog.registration,
  dialog.login {
    .close-button {
      top: -40px;
    }

    section#dialog {
      padding-top: 15px;

      footer#dialog-footer { padding: 20px 70px; }
    }
  }
}

@media (min-width: 720px) {
  dialog.registration {
    left: calc(50% - 30rem);
    width: 60rem;
  }
  dialog.login {
    width: 66rem;
    left: calc(50% - 33rem);
  }

  dialog {
    width: 40rem;
    left: calc(50% - 20rem);
  }
}

@media screen and (max-width: 1200px) {
  dialog.login {
    width: 50rem;
    left: calc(50% - 25rem);

    section.background { width: 55%; }
    section#dialog { 
      width: 45%; 

      header h2 { padding: 0 50px; }
    }
  }
}

@media screen and (max-width: 980px) {
  dialog.registration section.background { display: none; }
  dialog.registration {
    left: calc(50% - 20rem);
    width: 40rem;

    section#dialog {
      width: 100%;
    }
  }

  dialog.login {
    width: 40rem;
    left: calc(50% - 20rem);
    top: 10vh;

    section.background { display: none; }
    section#dialog {width: 100%; }
  }
}

@media screen and (max-width: 720px) {
  .backdrop { display: none; }
  dialog {
    width: 30rem;
    left: calc(50% - 15rem);
    top: 15vh;
  }

  dialog.filter { position: fixed; }

  dialog.registration,
  dialog.login,
  dialog.filter {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    .close-button {
      top: 20px;
      right: 25px;
    }
  }
  dialog.filter { overflow-y: auto;}

  dialog,
  dialog.registration,
  dialog.login,
  dialog.filter {
    section#dialog {
      padding-top: 70px;

      header h2 { padding: 0 0 30px 20px; }
    }
  }
}
@media screen and (max-width: 540px) {
  dialog {
    left: 0;
    top: 0 !important;
    height: 100%;
    width: 100%;

    .close-button {
      top: 20px;
      right: 35px!important;
    }

    section#dialog {
      header h2 { padding: 0 50px; }
    }
  }

  dialog.registration,
  dialog.login,
  dialog.filter {
    position: fixed;
    right: 0;
    box-shadow: none;

    section#dialog {
      padding-right: 0;
      
      header h2 { padding: 0 0 30px 20px; }
      footer#dialog-footer { 
        bottom: -60px;
        padding-left: 20px;
      }
    }
  }
  dialog.login section#dialog footer#dialog-footer { bottom: 0; }
}
@media screen and (max-width: 400px) {
  .close-button {
      top: 20px;
      right: 25px !important;
    }
}
</style>
