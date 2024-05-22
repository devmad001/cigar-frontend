<template>
  <div class="page-details">
    <AdvertiseSlider 
      :attachments="product.attachments"
      slider="slider"
      slide="slide"
      miniSliderWrap="mini-slider-wrap"
      miniSlide="mini-slide"
      mini="mini"
      type = "product-details"
    />
    <div class="content-info">
      <div class="title">{{ product.title }}</div>
      <base-rating :rating="product.rating"></base-rating>
      <div class="description">{{ product.description }} </div>
      <div class="seller">
          <div class="logo-seller">
            <div class="logo-svg">
              <img :src="require(`@/assets/img/store_logos/${sellerLogo}`)" :alt="sellerLogo" v-if="sellerLogo">
            </div>
            <div class="info-seller">
              <div class="label">Seller:</div>
              <div class="value-seller">{{ product.seller }}</div>
            </div>          
          </div>
          <div v-show="showDetails" class="block-specefication">
            <div class="overlay"></div>
            <div  class="specification" v-for="feature in Object.keys(specificationDetails)" :key="feature">
              <span class="label"> {{feature}}: <span class="value">{{specificationDetails[feature]}}</span></span>
            </div>
          </div>
      </div>
      <Specification 
        :specification="specification" 
        :product="currentProduct"
        :handleFavourite="handleFavourite" 
        :id="product.id"
        :clickLink="product.click_link"
        :link="product.link"
        :price="product.price"
        :oldPrice="product.old_price"
      />
    </div>
  </div>
</template>

<script>
import Specification from './Specification.vue';
import AdvertiseSlider from '../AdvertiseSlider.vue';
export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      activeImage: 0,
    }
  },
   components: {
    Specification,    
    AdvertiseSlider
  },
  computed: {
    currentProduct() {
      return this.product
    },
    specificationDetails() {
      const specifications = this.product?.specifications || {};
      const res = {};

      Object.keys(specifications).forEach((key) => {
        res[key.replace(/_+/, ' ')] = specifications[key]
      });

      return res;
    },
    showDetails() {
      return Object.keys(this.specificationDetails).length > 0
    },
    specification() {
      return  this.specificationDetails;
    },
    sellerLogo() {
      let seller = this.product.seller;
      let fileName = ""
      switch (seller) {
        case "JR Cigar":
          fileName = "jrcigars.jpg";
          break;
        case "Cigars Month Club":
          fileName = "month _club.png";
          break;
        case "Kind Juice":
          fileName = "KINDJUICE.png";
          break;
        case "VaporDNA":
          fileName = "vapordna.png";
          break;
        case "Avail Vapor":
          fileName = "avail_vapor.png";
          break;
        case "Blu":
          fileName = "blu.png";
          break;
        case "DirectDelta8":
          fileName = "directdelta.png";
          break;
        case "AirVape":
          fileName = "airvape.png";
          break;
        case "Famous Smoke":
          fileName = "famous.png";
          break;
         case "Thompson Cigar":
          fileName = "thompson.webp";
          break;
        case "Gotham Cigars":
          fileName = "gotham.png";
          break;
        case "Cigars International":
          fileName = "international.svg";
          break;
        case "BnB Tobacco":
          fileName = "bnb.png";
          break;
      }
      return fileName;
    },
  },
  methods: {
    handleFavourite() {
      if(this.currentProduct.favorite) {
        this.$store.dispatch('requestToWishlist', {id: this.product.id, mode: 'remove'})
        //TODO refactor
        this.currentProduct.favorite = false;
      } else {
        this.$store.dispatch('requestToWishlist', {id: this.product.id})
        this.currentProduct.favorite = true;
      }
    },
    prevImage() {
      if (this.activeImage === 0) {
        this.activeImage = this.product.attachments.length - 1
      } else {
        this.activeImage--
      }
    },
    nextImage() {
      if (this.product.attachments.length -1 === this.activeImage) {
        this.activeImage = 0
      } else {
        this.activeImage++
      }
    }
 
  },
}
</script>


<style lang="scss" scoped>
.page-details {
  font-family: Lato;
  display: flex;
  margin-bottom: 50px;

  .slider {
    max-width: 480px;
    max-height: 480px;
    height: 100%;
    margin-right: 50px;
    position: relative;
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

  .large {
    display: flex;
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

  .content-info {
    width: 59%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      font-weight: 800;
      font-size: 32px;
      color: #393939;
      margin-bottom: 20px;
    }
    .description {
      text-align: start;
      font-size: 18px;
      color: #393939;
      margin: 20px 0 15px;
    }
    .seller {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 13px;
      .logo-seller {
        display: flex;
        padding: 16px 0 20px 0;

        .logo-svg {
          height: 50px;
          margin-right: 10px;
        }
        .logo-svg img {
          height: 100%;
        }
        .info-seller {
          text-align: start;
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #B26D28;
        }
      }
      .value-seller {
        font-size: 22px;
        color: #352414;
      }
      .block-specefication {
        display: flex;
        background: #F2E2D3;
        position: relative;
        padding: 16px 0 20px 65px;
        max-width: 382px;
        width: 100%;
        flex-wrap: wrap;
        overflow: hidden;
        .overlay {
          background: #ffffff;
          position: absolute;
          width: 160px;
          height: 160px;
          left: -121px;
          transform: rotate(65deg);  
        }
        .specification {
          display: flex;
          max-width: 190px;
          width: 100%;
          text-align: start;
          font-size: 14px;
          .label {
            font-weight: bold;
            color: #B26D28;
            margin-right: 2px;
            text-transform: capitalize;
          }
          .value {
            color: #6C3F13;
            margin-left: 2px;
            text-transform: capitalize;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1390px) {
  .page-details {
    justify-content: center;
  }
}

@media screen and (max-width: 720px) {
  .page-details {
    flex-direction: column;

    .slider {
      width: 100%;
      height: auto;
      max-width: unset;
      max-height: unset;
    }

    .slide {
      height: auto;
      max-width: unset;
      max-height: unset;
      width: 100%;
    }

    .slider {
      margin-right: 0;
      margin-bottom: 50px;
    }

    .mini-slide {
      width: 80px;
    }

    .content-info {
      width: 100%;
    }

    .prev-btn, .next-btn {
      top: 35%;
    }
  }
}

</style>