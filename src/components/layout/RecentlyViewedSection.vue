<template>
   <section id="recently-viewed" v-show="viewedProducts?.length > 0">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Recently</p>
        <h2 class="title">Viewed</h2>
      </div>
    </div>

    <div class="wrapper flex_wrapper flex_between flex_wrap max-width">
      <product-preview
        v-for="item in viewedProducts"
        :key="item.id"
        :seller="item.seller"
        :imageUrl="item.image_url"
        :name="item.name"
        :price="item.price"
        :rating="item.rating"
        :id="item.id"
        :slug="item.slug"
        className="no-flex"
        homePageFavorite
        :productPageClass="{
          product_page: 'product-page',
          img_wraper_page: 'img-wraper-page',
          img: 'img',
          btn_show: 'btn-show'
        }"
        :isFavorite="item.favorite"
        :clickLink="item.click_link"
        :link="item.link"
        :handleFavorite="handleFavorite"
      />
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
  computed: {
    viewedProducts() {
      return this.$store.getters.viewedProduct.products
    },
  },
  created() {
    this.$store.dispatch('loadViewedProduct');
  },
  methods: {
    handleFavorite: function({ isFavorite, id}) {
     if (!isFavorite) {
        this.addToWishlistDebounce(id);
        return;
      }
      this.removeFromWishlist(id);
    },

    async addToWishlist(id) {
      await this.$store.dispatch('addToWishlist', { id, updateAction: 'updateHotSaleProducts' });
    },

    addToWishlistDebounce: debounce(function(id) {
      this.addToWishlist(id)
    }, 500),

    async removeFromWishlist(id) {
      await this.$store.dispatch('removeFromWishlist', { id, updateAction: 'updateHotSaleProducts' })
      this.$store.dispatch('loadViewedProduct');
    },
  }
}

</script>

<style lang="scss" scoped>
#recently-viewed {
	margin-bottom: 100px;
  h2.title{ margin-bottom: 50px; }

}

@media screen and (max-width: 1200px) {
  #recently-viewed .flex_between {
    max-width: 80%;
  }
}

@media screen and (max-width: 960px) {
  #recently-viewed .flex_between {
    justify-content: space-around;
    max-width: 100%;
  }
}

@media screen and (max-width: 720px) {
  #recently-viewed {
    margin: 0 20px 100px 20px;
    .wrapper {
      overflow: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      .item {
        margin-right: 20px;
        max-width: 150px;
        .img-daily-wrapper {
          width: 150px;
        }
      }
    }
    .flex_wrap {
      flex-wrap: nowrap;
    }
    .flex_between {
      justify-content: initial;
      max-width: unset;
    }
  }
}
</style>
