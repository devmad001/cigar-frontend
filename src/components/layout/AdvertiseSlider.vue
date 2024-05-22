<template>
    <div v-if="attachments" :class="[slider, advertiseSlider, type]">
        <button aria-label="prev" :class="['prev-btn', btn]" @click="prevImage">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#F2E2D3"/>
            <path d="M16.8 10.2L12 15L16.8 19.8" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button aria-label="next" :class="['next-btn', btn]" @click="nextImage">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" transform="rotate(-180 15 15)" fill="#F2E2D3"/>
            <path d="M13.2 19.8L18 15L13.2 10.2" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      <div class="large" v-for="(image, index) in attachments" :key="image.id" >
          <img v-show="activeImage === index" :class="[{active: activeImage === index}, slide, advertiseSlide]" :src="image.url" alt="image">
      </div>
      <div :class="[miniSliderWrap, advertiseSliderMiniWrap]">
        <div :class="[mini, advertiseMini]" v-for="(image, index) in attachments" :key="image.id" >
          <img :class="[{active: activeImage === index}, advertiseSliderMini, miniSlide]" :src="image.url" alt="image">
        </div>
      </div>
    </div>
    <div class="static-image" v-else-if="!attachments && staticImage">
      <img src="@/assets/img/advertise.png" alt="main image">
    </div>
</template>

<script>
export default {
  props: {
    attachments: Object,
    slider: String,
    slide: String,
    miniSliderWrap: String,
    miniSlide: String,
    mini: String,
    advertiseSlider: String,
    advertiseSlide: String,
    advertiseSliderMiniWrap: String,
    advertiseSliderMini: String,
    advertiseMini: String,
    btn: String,
    staticImage: Boolean,
    type: String
  },
  data() {
    return {
      activeImage: 0,
    }
  },
  methods: {
    prevImage() {
      if (this.activeImage === 0) {
        this.activeImage = this.attachments.length - 1
      } else {
        this.activeImage--
      }
    },
    nextImage() {
      if (this.attachments.length -1 === this.activeImage) {
        this.activeImage = 0
      } else {
        this.activeImage++
      }
    }
  }
} 
</script>

<style lang="scss" scoped>
.static-image{
  width: 88%;
  margin: auto;
  img {
    width: 100%;
  }
}

.dvertise-slider {
  max-width: 100%;
  max-height: 550px;
  height: 100%;
}

.advertise-slide {
  width: 100%;
  height: 355px;
  object-fit: scale-down;
}

.advertise-slide-mini-wrap {
  display: flex;
  justify-content: center;
  overflow: scroll;
  background: #352414;
  height: 380px;
  padding: 7px 0;
  height: -webkit-fill-available;
  &::-webkit-scrollbar {
      display: none;
    }
}

.advertise-slide-mini {
  max-width: 152px;
  width: 100%;
  opacity: 0.5;
}

.advertise-mini {
  padding: 10px;
}

.slider {
    max-width: 480px;
    max-height: 480px;
    height: 100%;
    margin-right: 50px;
    position: relative;
    
    @media(min-width:1391px){
      &.product-details{
        width: 480px;
        height: 480px;
        .large{
          img{
            object-fit: contain;
            max-height: 480px;
          }
        }
        .mini-slide{
          height: 80px;
          object-fit: contain;
        }
      }
    }
  }

  .mini-slider-wrap {
    display: flex;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .slide {
    width: 480px;
    opacity: 0.5;
  }

  .mini-slide {
    width: 80px;
    opacity: 0.5;
  }

  .active {
    opacity: 1;
  }

  .prev-btn, .next-btn {
    position: absolute;
    top: 50%;
    cursor: pointer;
    background: none;
    &:hover {
      svg path {
        stroke: #F2E2D3;;
      }
      svg circle {
        fill: #6C3F13;
      }
    }
  }

  .prev-btn {
    left: 20px;
  }

  .next-btn {
    right: 20px;
  }
  .btn {
    top: 270px;
  }

  .mini {
    margin: 10px 10px 0 0;
  }

  @media screen and (max-width: 1390px) {
    .slider {
      width: 300px;
      height: 300px;
    }

    .mini-slide {
      width: 35px
    }

    .slide {
      width: 300px;
    }
  }
</style>
