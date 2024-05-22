<template> 
  <div id="cookies-banner" class="flex_wrapper" v-if="visibility">
    <div class="cookies-logo">
      <img src="../../assets/img/cookies_logo.png" alt="cookies logo" width="150" height="150">
    </div>
    <div class="body">
      <div class="text_block">
        <p class="accent_text">We Use cookies</p>
        <h2 class="title">to make your experience of this website better.</h2>
      </div>
      <div class="buttons flex_wrapper flex_between">
        <a href="" class="btn btn-full" @click.prevent="allowCookies">Allow Cookies</a>
        <a href=""  class="cancel-link" @click.prevent="closeModal">Decline Cookies</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visibility: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    allowCookies() {
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 1000000*36000;
      now.setTime(expireTime);
      
      document.cookie = encodeURIComponent('allowedCookie') + '=' + 'true; expires='+now.toUTCString()+'';
      this.closeModal();
    },
    closeModal() {
      this.$emit('closeCookiesBanner');
    }
  }
}
</script>

<style lang="scss" scoped>
  div#cookies-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: #352414;
    z-index: 99;
    align-items: center;
    justify-content: center;

    .cookies-logo {
      margin-right: 50px;
    }

    .accent_text { color: #F2E2D3; }
    h2.title { 
      font-size: 20px;
      line-height: 24px;
      color: #fff;
    }

    .buttons {
      margin-top: 20px;
      align-items: center;
      .btn:link,
      .btn:visited {
        width: 280px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 100%;
        letter-spacing: 0.05em;
        vertical-align: middle;
        display: inline-block;
        padding: 14px 0; 
        text-decoration: none;
        border-radius: 200px;
        transition: background-color 0.2s, border-color 0.2s;
      }

      .btn-full:link,
      .btn-full:visited {
        background-color: #B26D28;
        border: 1px solid #B26D28;
        color: #fff;
      }

      .cancel-link {
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        color: #F2E2D3;
      }
    }
  }

  @media screen and (max-width: 720px){
    div#cookies-banner {
      padding-top: 40px;
      height: 400px;
      &.flex_wrapper { display: block; }

      .cookies-logo {
        margin-bottom: 20px;
        margin-right: 0;
      }

      .accent_text,
      h2.title {
        padding: 0 20px;
        text-align: center;
      }
      .buttons { padding: 0 20px; }
    }
  }

  @media screen and (max-width: 540px){
    div#cookies-banner {
      .buttons {
        &.flex_wrapper { display: block; }
        a { 
          display: block;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
