<template>
  <section v-if="brands" id="brands">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Popular</p>
        <h2 class="title">Cigar Brands</h2>
      </div>

      <div class="wrapper max-width">
        <div class="left arrow" @click="slide('left')">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9L9 17" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="carousel-container" id="brands-container">
        <brands-list :items="brands"></brands-list>
      </div>
      <div class="right arrow" @click="slide('right')">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 17L9 9L1 1" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import BrandsList from './brandComponents/BrandsList.vue';

export default {
  components: {
    BrandsList
  },
  computed: {
    brands() {
      return this.$store.getters.brandsList;
    },
  },
  methods: {
    slide(direction){
      const container = document.getElementById('brands-container');
      let scrollCompleted = 0;
      const slideVar = setInterval(function(){
        if(direction == 'left'){
          container.scrollLeft -= 33.33;
        } else {
          container.scrollLeft += 33.33;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 100){
          window.clearInterval(slideVar);
        }
      }, 50);
    }
  }
}
</script>

<style lang="scss" scoped>
#brands{
	margin-bottom: 100px;
  h2.title{ margin-bottom: 50px; }

  .carousel-container {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
    
    :deep(.item) { 
      margin-right: 20px;
    }

    &::-webkit-scrollbar {
      height: 10px;
      border-radius: 5px;
      background-color: #F2E2D3;
    }
    &::-webkit-scrollbar-thumb {
      height: 10px;
      border-radius: 5px;
      background-color: #B26D28;
    }
  }
  .arrow {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #F2E2D3;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    top: 45%;
    cursor: pointer;
    &:hover {
      svg path {
        stroke: #F2E2D3;;
      }
      background-color: #6C3F13;;
    }
  }
  .left { left: -65px; }
  .right { right: -65px; }
}

@media screen and (max-width: 1300px) {
  #brands {
    .left { left: -75px; }
    .right { right: -75px; }
  }
}

@media screen and (max-width: 1200px) {
  #brands .max-width {
    max-width: 90%;
  }
}

@media screen and (max-width: 1100px) {
  #brands {
    .left { left: -55px; }
    .right { right: -55px; }
  }
}

@media screen and (max-width: 720px) {
  #brands {
    margin: 0 20px 100px 20px;

    .carousel-container {
      padding-left: 0;
    }

    .carousel-container .item {
      margin-right: 20px;
      max-width: 150px;
      min-width: 150px;
      min-height: auto;
      .img-daily-wrapper { width: 150px; }
    }
    
    .arrow { 
      display: none;
    }
    .max-width { max-width: 100%; }
  }
}

@media screen and (max-width: 576px) {
  #brands {
    margin-bottom: 50px;

    .accent_text {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>
