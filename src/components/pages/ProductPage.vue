<template>
  <base-meta :titleProp="product.title + ' | Cigar Finder'" :descriptionProp="product.description?.substr(0, 140) + '...'"></base-meta>
  <base-product-wrapper
    :titleCategory="product.category?.title"
    :titleProduct="product.title"
    :productCategotyId="product.category_id"
  >
    <div class="page-block">
      <Details :product="product"></Details>
      <div class="review-block">
        <Review :product="product" />
      </div>
      <div class="resently-block">
        <RecommendedSection
          accent_text="Recently"
          title="viewed"
          :items="viewed"
          :productPageClass="{
            product_page: 'product-page',
            img_wraper_page: 'img-wraper-page',
            img: 'img',
            btn_show: 'btn-show',
          }"
        />
        <banners-section></banners-section>
        <test-ads-banner type="footer"></test-ads-banner>
      </div>
    </div>
  </base-product-wrapper>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import Review from "../layout/OneProductComponents/Review.vue";
import Details from "../layout/OneProductComponents/Details.vue";
import RecommendedSection from "../layout/RecommendedSection.vue";
import BannersSection from "../layout/categoryComponents/BannersSection";

export default {
  components: {
    BaseProductWrapper: defineAsyncComponent(() => 
      import('@/components/ui/BaseProductWrapper')
    ),
    Review,
    Details,
    RecommendedSection,
    BannersSection,
  },
  props: {
    idProduct: {
      type: String,
    },
  },
  watch: {
    $route(to, from) {
      if (
        to.params.slug &&
        from.params.slug !== to.params.slug &&
        to.path.includes("/product")
      ) {
        const id = to.params.slug.split('-')[0];
        this.$store.dispatch("loadProductDetails", { id: id });
        this.$store.dispatch("getReviewsList", id);
        this.$store.dispatch("loadViewedProduct");
      }
    },
  },
  computed: {
    product() {
      return this.$store.getters.product;
    },
    viewed() {
      return this.$store.getters.viewedProduct.products;
    },
  },
  mounted() {
    const id = this.$route.params.slug.split('-')[0]
    this.$store.dispatch("loadProductDetails", { id });
    this.$store.dispatch("getReviewsList", id);
    this.$store.dispatch("loadViewedProduct");
  },
}
</script>

<style lang="scss" scoped>
.page-block {
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
}
.resently-block {
  margin-top: 100px;
  max-width: 1277px;
  width: 100%;
}

@media screen and (max-width: 720px) {
  .page-block {
    justify-content: center;
  }
}
</style>