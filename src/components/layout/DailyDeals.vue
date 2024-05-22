<template>
  <section v-show="productsToShow.length > 0" id="deals">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Daily</p>
        <h2 class="title">Deals</h2>
      </div>
    </div>

     <div class="wrapper flex_wrapper flex_between flex_wrap">
       <product-preview
          v-for="(item, index) in productsToShow"
          :key="item.id"
          :seller="item.seller"
          :imageUrl="item.image_url"
          imgDailyWrapper="img-daily-wrapper"
          :name="item.name"
          :price="item.price"
          :rating="item.rating"
          :id="item.id"
          :slug="item.slug"
          homePageFavorite
          className="no-flex"
          :isFavorite="item.favorite"
          :clickLink="item.click_link"
          :link="item.link"
          :dailyDealsIndex="index"
          :handleFavorite="handleFavorite"
          class="grid"
        />
		</div>
  <test-ads-banner  type="ad"></test-ads-banner>
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
    productsToShow() {
      if (this.daily.length === 0 ) return this.products
      return this.daily
    },
    daily() {
      return this.$store.getters.dailyDeals
    },
    products() {
      return this.$store.getters.productsList
    },
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
      await this.$store.dispatch('addToWishlist', { id, updateAction: 'updateDailyDealsProducts' });
    },

    addToWishlistDebounce: debounce(function(id) {
      this.addToWishlist(id)
    }, 500),

    async removeFromWishlist(id) {
      await this.$store.dispatch('removeFromWishlist', { id, updateAction: 'updateDailyDealsProducts' })
    },
  },
  created() {
    this.$store.dispatch('loadDailyDeals')
    this.$store.dispatch('loadProducts', { params: "" });
  }
}
</script>


<style lang="scss" scoped>
section#deals{
	margin-bottom: 100px;
  h2.title{ margin-bottom: 50px; }
}

@media screen and (max-width: 1255px) {
  .wrapper {
    justify-content: space-around;  
  }
}

@media screen and (max-width: 1200px) {
  section#deals .flex_between {
    max-width: 80%;
    justify-content: space-around;  
  }
}

@media screen and (max-width: 960px) {
  section#deals .flex_between {
    justify-content: space-around;
    max-width: 100%;
  }
}

@media screen and (max-width: 720px) {
  section#deals {
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
