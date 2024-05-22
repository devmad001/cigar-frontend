<template>
  <section id="head-banner">
    <h1>Find the Perfect Cigar!</h1>
    <p class="first_line">SEARCH AND COMPARE</p>
    <p>CIGAR PRICES ONLINE</p>
    <a href="" class="btn btn-full hvr-radial-out lite" v-if="!isLoggedIn" @click.prevent="openRegisterModal">Register Now</a>
  </section>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    openRegisterModal() {
      this.$store.dispatch('registrationModalToggle', true);
    },
    openLoginModal() {
      this.$store.dispatch('loginModalToggle', true);
    },
    closeModal() {
      this.$store.dispatch('registrationModalToggle', false);
      this.$store.dispatch('loginModalToggle', false);
      this.$store.dispatch('toggleForgotPassword', false);
    }
  }
}
</script>

<style lang="scss" scoped>
  #head-banner {
    margin-top: 210px;
    height: 100%;
    background: url('../../assets/head_banner.png');
    text-align: center;
    padding: 100px 100px 135px;
    
    h1 {
      font-family: 'Parisienne', cursive;
      font-size: 50px;
      line-height: 50px;
      font-weight: 400;
      color: #F1B57A;
      margin-bottom: 20px;
    }

    p {
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      font-size: 50px;
      line-height: 60px;
      color: #FFF;
      text-transform: uppercase;
    }

    .btn { margin-top: 30px; }

    .btn:link,
    .btn:visited {
      width: 140px;
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      font-size: 20px;
      line-height: 100%;
      letter-spacing: 0.05em;
      vertical-align: middle;
      display: inline-block;
      padding: 19px 30px; 
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

    .hvr-shutter-out-vertical.lite:before { border-radius: 25px; }
  }
  @media screen and (max-width: 1200px) {
    #head-banner { background-repeat: no-repeat; }
  }

  @media screen and (max-width: 720px){
    #head-banner {
      margin-top: 190px;
      background: url('@/assets/webp_mobile_head_banner.png.webp');
      background-size: 100vw auto !important;
      text-align: center;

      h1 {
        font-family: 'Parisienne', cursive;
        font-size: 35px;
        line-height: 35px;
        font-weight: 400;
        color: #F1B57A;
        text-transform: none;
        max-width: 300px;
        margin: 0px auto;
      }

      p {
        font-style: normal;
        font-size: 22px;
        line-height: 40px;
      }

      p.first_line { margin-top: 30px; }

      .btn, .btn-full:link,
      .btn-full:visited, .btn:link,
      .btn:visited, .hvr-shutter-out-vertical {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0.05em;
        padding: 20px 30px;
      }
    }
  }

  @media screen and (max-width: 540px) {
    #head-banner {
      padding: 100px 0 50px;
      background-repeat: no-repeat;
    }
  }

  @media screen and (max-width: 320px) {
    #head-banner { padding: 50px 20px; }
  }
</style>
