<template>
   <section id="hot-sale">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Hot</p>
        <h2 class="title">Sale</h2>
      </div>
    </div>

    <div class="wrapper flex_wrapper flex_between flex_wrap">
      <product-preview
        v-for="item in hotSaleProduct"
        :key="item.id"
        :seller="item.seller"
        :imageUrl="item.image_url"
        :name="item.title"
        :price="item.price"
        homePageFavorite
        :rating="item.rating"
        :idHotSale="item.id"
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
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import debounce from '../../utils/debounce';

export default {
  components: {
    ProductPreview: defineAsyncComponent(() => 
      import('@/components/layout/products/ProductPreview')
    ),
  },
  computed: {
    hotSaleProduct() {
      return this.$store.getters.hotSaleproducts
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
      await this.$store.dispatch('addToWishlist', { id, updateAction: 'updateHotSaleProducts' });
    },

    addToWishlistDebounce: debounce(function(id) {
      this.addToWishlist(id)
    }, 500),

    async removeFromWishlist(id) {
      await this.$store.dispatch('removeFromWishlist', { id, updateAction: 'updateHotSaleProducts' })
      this.$store.dispatch('loadViewedProduct');
    },
  },
  created() {
    this.$store.dispatch('loadHotSale');
  }
}
</script>


<style lang="scss" scoped>
section#hot-sale {
  margin-bottom: 100px;
  h2.title{ margin-bottom: 50px; }
}

@media screen and (max-width: 1200px) {
  section#hot-sale .flex_between {
    max-width: 80%;
  }
}

@media screen and (max-width: 960px) {
  section#hot-sale .flex_between {
    justify-content: space-around;
    max-width: 100%;
  }
}

@media screen and (max-width: 720px) {
  section#hot-sale {
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

@media screen and (max-width: 576px) {
  section#hot-sale {
    p.accent_text {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 30px;
    }

    .wrapper{
      :deep(.item) {
        max-height: 220px;
        margin-bottom: 0;
        min-width: 150px;

        &.grid:not(.no-hover):hover .item_body{
          box-shadow: none;
          border-radius: 0;

          .payment-methods.grid-only {
            display: none;
          }
        }

        .img_wrapper {
          height: 120px;
          background-color: #f7f7f7;

          img {
            max-width: 85%;
          }
        }

        p.name {
          max-height: 30px;
          overflow: hidden;
          white-space: break-spaces;
        }
      }
    }
  }
}
</style>
