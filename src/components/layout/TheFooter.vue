<template>
  <footer id="footer">
    <div class="row">
      <div class="column">
        <div class="logo">
          <img src="../../assets/logo_0501.svg" alt="footer logo" width="137" height="68">
        </div>
        <div class="social">
          <a href="https://www.facebook.com/CigarFinder-101488222162301" target="_blank" rel="noopener noreferrer"><span class="icon facebook"></span></a>
          <a href="https://twitter.com/FinderCigar" target="_blank" rel="noopener noreferrer"><span class="icon twitter"></span></a>
          <a href="https://www.instagram.com/cigarfinder/" target="_blank" rel="noopener noreferrer"><span class="icon insagram"></span></a>
          <a href="https://www.youtube.com/channel/UC-wPHdjAFYCb7N8Mvb9QSHg" target="_blank" rel="noopener noreferrer"><span class="icon youtube"></span></a>
        </div>
      </div>
      <div class="column">
        <ul class="link-list">
          <li  v-for="category in categories" :key="category.id">
            <router-link :to="link(category.slug)">{{ category.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="link-list last">
          <li><router-link to="/help">Help & Contact</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/news">News</router-link></li>
          <li><router-link to="/terms-and-conditions">Terms & Conditions</router-link></li>
          <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
          <li><router-link to="/advertise-with-us">Advertise with Us</router-link></li>
        </ul>
      </div>
      <div class="column double-column contact-us">
        <p class="title">Newsletter</p>
        <p class="subtitle">Signup to get the latest news and salest</p>
        <form id="footer-form">
          <div class="input">
            <input type="email" name="email" class="email" placeholder="Your Email" v-model.trim="email"/>
            <p class="message" v-if="message">{{message}}</p>
          </div>
          <button class="btn btn-full hvr-radial-out lite" :disabled="validateForm" aria-label="sign up">
            <a @click="subscribe">Sign Up</a>
          </button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: '', 
      message: null,
      error: false,
      formIsValid: true,
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    categories() {
      if (this.$store.getters.categoriesList) {
        return this.$store.getters.categoriesList.filter(cat => !cat.category_id);
      }
      return this.$store.getters.categoriesList;
    },
    validateForm() {
      return !(this.error);
    },
    emailVal() {
      return this.email;
    },
  },
  watch: {
    emailVal(curValue) {
      this.formIsValid = true;
      if (curValue === '' || curValue.length < 6 || curValue.length > 48 || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(curValue)) {
        this.error = false;
        this.formIsValid = false;
      } else {
        this.error = true;
        this.formIsValid = true;
      }
    },
  },
  methods: {
    async subscribe() {
      this.error = false;
      this.message = '';
      const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validator.test(this.email)) {
        this.error = true;
        this.message = 'Incorrect Email';
        setTimeout(() => {
          this.error = false;
          this.message = '';
          this.email = '';
        }, 8000)
        return;
      }
       
      const response = await fetch(
        'https://hiscigar.com/api/v1/users/newsletter', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Session-Token': this.token
          },
          body: JSON.stringify({email: this.email})
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = responseData.errors || 'Subscription Failed. Please try again';
        this.$toast.error(error[0]);
        return;
      } 
      this.$toast.success("Successfully Completed");
      this.email = '';
    },
    link(id) {
      return '/categories/' + id;
    }
  },
}
</script>

<style lang="scss" scoped>
footer#footer {
  background: #352414;
  padding: 30px 0 15px;
  .logo{
    img{
      max-width:137px;
      object-fit: cover;
    }
  }
  .social {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;

    a {
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 20px;

      .icon {
        width: 100%;
        height: 100%;

      }
    }
    a .insagram { width: 16px; height: 16px; padding-top: 1px;}
    a .twitter { padding-top: 2px; }
    a:last-child { margin: 0; }
    .facebook { content: url('../../assets/img/fb_logo.png'); }
    .twitter { content: url('../../assets/img/twitter_logo.png'); }
    .insagram { content: url('../../assets/img/insta_logo.png'); }
    .youtube { content: url('../../assets/img/youtube-logo.svg'); }
  }

  .link-list {
    list-style: none;
    li {
      text-align: left;
      a {
        width: 100%;
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        line-height: 22px;
        color: #F2E3D2;
        text-decoration: none;
        transition: all 0.3s ease-out;

        &:hover {
          color: #fff;
          text-decoration: underline;
        }
      }
    }
  }

  .contact-us {
    text-align: left;

    .title {
      font-family: 'Lato', sans-serif;
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
      text-transform: capitalize;
      color: #F2E3D2;
      margin-bottom: 5px;
    }

    .subtitle, 
    .message {
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      line-height: 19px;
      color: #BC803C;
      margin-bottom: 15px;
    }

    #footer-form {
      display: flex;
      
      .input { 
        width: 300px; 
        margin-right: 10px;
      }
      .message {
        margin-bottom: 0;
        &.error { color:  #FF3C3C; }
      }
      input.email {
        background: #F2E3D2;
        border: 1px solid #6C3F13;
        box-sizing: border-box;
        border-radius: 20px;
        width: 100%;
        height: 40px;
        margin-right: 10px;
        padding: 10px 20px;

        &.error { 
          background-color:  #FF3C3C;
          &::placeholder { 
            color: #fff;
            opacity: 1;
          }
        }

        &::placeholder {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 19px;
          color: #352414;
          opacity: 0.3;
        }

        &:focus { outline: none; }
      }

      .btn,
      .btn:link,
      .btn:visited {
        font-family: 'Lato', sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0.05em;
        vertical-align: middle;
        display: inline-block;
        padding: 0 30px;
        text-decoration: none;
        text-align: center;
        border-radius: 200px;
        transition: background-color 0.2s, border-color 0.2s;
        cursor: pointer;
        &:disabled {
          background-color: #E5E5E5;
          pointer-events: none;
        }
      }

      .btn-full,
      .btn-full:link,
      .btn-full:visited {
        background-color: #6C3F13;
        border: 1px solid #6C3F13;
        color: #fff;
      }
      .hvr-shutter-out-vertical.lite:before {
        border-radius: 25px;
      }
    }
  }
}

@media screen  and (max-width: 1200px){
  footer#footer {
    .contact-us #footer-form .input {max-width: 240px;}
  }
}

@media screen  and (max-width: 720px){
  footer#footer {
    .row {
      display: block;

      .social { margin-bottom: 30px; }

      .link-list { margin-left: 20px; }
      .link-list.last { margin-bottom: 30px; }

      .contact-us {
        margin-left: 20px;
      }
    }
  }
}

@media screen  and (max-width: 540px){
  footer#footer {
    .contact-us {
      padding-right: 20px;
      #footer-form {
        display: block;
        .input {
          max-width: 90%;
          margin: auto;
        }
        input {
          margin-bottom: 20px;
        }
        .btn,
        .btn:link,
        .btn:visited {
          padding: 10px 30px;
        }

        input#email,
        .btn {
          display: block;
          margin: auto;
          margin-bottom: 30px;
        }
      }
    } 
  }
}

@media screen  and (max-width: 320px){
  footer#footer .contact-us { 
    #footer-form input.email { max-width: 100%; }
  }
}
</style>
