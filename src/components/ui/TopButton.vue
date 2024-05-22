<template>
  <div class="TopButton" v-show="scrolled" :class="{bottom: bottom}" :style="bottom ? {bottom: dynamicBottom + 'px'} : {}">
    <span @click="scrollToTop"></span>
  </div>
</template>

<script>
  export default {
    name: 'TopButton',
    data() {
      return {
        windowTop: 0
      }
    },
    computed: {
      scrolled() {
        return this.windowTop > 100;
      },
      bottom() {
        return this.bottomCoordinate() >= this.documentHeight();
      },
      dynamicBottom() {
        return this.bottomOffcet() + this.bottomCoordinate() - this.documentHeight() + this.footerHeight();
      }
    },
    methods: {
      onScroll(e) {
        this.windowTop = e.target.scrollingElement.scrollTop;
      },
      scrollToTop() {
        window.scrollTo(0, 0);
        return 0; 
      },
      bottomCoordinate() {
        return this.windowTop + window.innerHeight;
      },
      documentHeight() {
        return document.body.scrollHeight + 210;
      },
      footerHeight() {
        return document.getElementById('footer').scrollHeight;
      },
      bottomOffcet() {
        if (window.innerWidth <= 720) {
          return 50;
        } else if (window.innerWidth <= 755) {
          return 50;
        } else {
          return 100;
        }
      }
    },
    created() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
</script>

<style lang="scss" scoped>
  .TopButton {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 777;

    span {
      cursor: pointer;
      background-image: url('../../assets/up.svg');
      display: inline-block;
      width: 40px;
      height: 40px;
    }

    span:hover {
      background-image: url('../../assets/hover_up.svg');
    }
  }

  @media screen and (max-width: 1000px) {
    .TopButton {
      right: 50px;
      bottom: 50px;
    }
  }

  @media screen and (max-width: 720px) {
    .TopButton {
      right: 30px;
    }
  }

  @media screen and (max-width: 576px) {
    .TopButton {
      right: 30px;
    }
  }
</style>
