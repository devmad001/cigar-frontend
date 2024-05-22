<template>
  <section id="recommended">
    <div  class="wrapper">
      <div class="text_block">
        <p class="accent_text">{{accent_text}}</p>
        <h2 class="title">{{title}}</h2>
      </div>
    </div>

    <div class="wrapper max-width">
      <div class="left arrow" @click="slide('left')">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9L9 17" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div 
        class="carousel-container" 
        id="container"
      >
        <product-preview
          homePageFavorite
          v-for="item in items"
          :key="item.id"
          :seller="item.seller"
          :imageUrl="item.image_url"
          :name="item.title"
          :price="item.price"
          :defaultProduct="defaultProduct"
          :rating="item.rating"
          :id="item.id"
          :slug="item.slug"
          className="no-flex"
          :isFavorite="item.favorite"
          :clickLink="item.click_link"
          :link="item.link"
          :handleFavorite="handleFavorite"
          class="grid"
        />
      </div>
      <div class="right arrow" @click="slide('right')">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 17L9 9L1 1" stroke="#6C3F13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import debounce from "../../utils/debounce";

export default {
  components: {
    ProductPreview: defineAsyncComponent(() => 
      import('@/components/layout/products/ProductPreview')
    ),
  },
  props: {
    items: Array,
    accent_text: String,
    title: String,
    productPageClass: Object,
    defaultProduct: Object
  },
  methods: {
    slide(direction){
      const container = document.getElementById('container');
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
    },
    handleFavorite: function({ isFavorite, id}) {
      if (!isFavorite) {
        this.addToWishlistDebounce(id);
        return;
      }
      this.removeFromWishlist(id);
    },

    async addToWishlist(id) {
      await this.$store.dispatch('addToWishlist', { id, updateAction: 'updateHotSaleProducts' });
      this.$store.dispatch('loadViewedProduct');
      this.$store.dispatch('loadRecommendedProducts');
    },

    addToWishlistDebounce: debounce(function(id) {
      this.addToWishlist(id)
    }, 500),

    async removeFromWishlist(id) {
      await this.$store.dispatch('removeFromWishlist', { id, updateAction: 'updateHotSaleProducts' })
      this.$store.dispatch('loadViewedProduct');
      this.$store.dispatch('loadRecommendedProducts');
    },
  }
}
</script>

<style lang="scss" scoped>
#recommended{
	margin-bottom: 100px;
  h2.title{ margin-bottom: 50px; }

  .carousel-container {
    padding-left: 20px;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: relative;
    
    :deep(.item) { 
      margin-right: 20px;
      min-height: 445px;
      min-width: 330px;
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

@media screen and (max-width: 720px) {
  #recommended .carousel-container {
    padding-left: 0;
  }
}

@media screen and (max-width: 1300px) {
  #recommended {
    .left { left: -35px; }
    .right { right: -35px; }
  }
}

@media screen and (max-width: 1200px) {
  #recommended .max-width {
    max-width: 90%;
  }
}

@media screen and (max-width: 720px) {
  #recommended {
    margin: 0 0px 50px 20px;

    p.accent_text {
      font-family: 'Parisienne', cursive;
      font-style: normal;
      font-weight: 400;
      font-size: 22px;
      line-height: 24px;
      margin-bottom: 5px;
      text-transform: capitalize;
    }

    h2.title{
      font-weight: 800;
      font-size: 24px;
      line-height: 29px;
      margin-bottom: 20px;
    }

    .wrapper {
      margin-left: 0px;
    }

    .carousel-container .item {
      margin-right: 20px;
      max-width: 150px;
      min-width: 150px;
      min-height: auto;
      .img-daily-wrapper { width: 150px; }
    }
    .carousel-container::-webkit-scrollbar,
    .arrow { 
      display: none;
    }
    .max-width { max-width: 100%; }
  }
}

@media screen and (max-width: 576px) {
  #recommended {
    p.accent_text {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
    }

    .wrapper{
      :deep(.item) {
        max-height: 220px;
        margin-bottom: 0;

        &.grid:not(.no-hover):hover .item_body{
          box-shadow: none;
          border-radius: 0;

          .payment-methods.grid-only {
            display: none;
          }
        }

        p.name {
          max-height: 30px;
          overflow: hidden;
          white-space: break-spaces;
        }

        .img_wrapper {
          height: 120px;
          background-color: #f7f7f7;
        }
      }
    }
  }
}
</style>
