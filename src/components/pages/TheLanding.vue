<template>
  <base-meta pageType="main_page"></base-meta>
  <head-bunner></head-bunner>
  <welcome-section></welcome-section>
  <our-benefits></our-benefits>
  <test-ads-banner type="ad"></test-ads-banner>
  <daily-deals></daily-deals>
  <hot-sale-section></hot-sale-section>
  <RecommendedSection v-show="recommendedProducts.length > 0"
    accent_text="What We"
    title="Recommend"
    :items="recommendedProducts"
    className="no-flex"
  />
  <brands-section></brands-section>
  <recently-viewed-section className="no-flex"></recently-viewed-section>
  <how-it-work-section></how-it-work-section>
  <test-ads-banner type="ad"></test-ads-banner>
  <our-blog-section></our-blog-section>
  <news-section></news-section>
  <bottom-image></bottom-image>

  <base-dialog :show="restorePasswordIsOpen" title="Restore Password" @close="closeModal">
    <restore-password-form @closeModal="closeModal" :token="token"></restore-password-form>
  </base-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import HeadBunner from '../layout/HeadBanner';
import WelcomeSection from '../layout/WelcomeSection';
import OurBenefits from '../layout/OurBenefits';
import DailyDeals from '../layout/DailyDeals';
import HotSaleSection from '../layout/HotSaleSection';
import HowItWorkSection from '../layout/HowItWorksSection';
import OurBlogSection from '../layout/OurBlogSection';
import RecommendedSection from '../layout/RecommendedSection.vue';
// import RecentlyViewedSection from '../layout/RecentlyViewedSection.vue';
import BrandsSection from '../layout/BrandsSection.vue';
import NewsSection from '../layout/NewsSection.vue';
import BottomImage from '../layout/EndOfContentImage.vue';

export default {
  components: {
    HeadBunner,
    WelcomeSection,
    OurBenefits,
    DailyDeals,
    HotSaleSection,
    HowItWorkSection,
    OurBlogSection,
    RecommendedSection,
    BrandsSection,
    NewsSection,
    BottomImage,
    BaseDialog: defineAsyncComponent(() => 
      import('../ui/BaseDialog')
    ),
    RestorePasswordForm: defineAsyncComponent(() => 
      import('../layout/forms/RestorePasswordForm')
    ),
    // RecentlyViewedSection
  },
  data() {
    return {
      token: '',
      restorePasswordIsOpen: false
    }
  },
  computed: {
    recommendedProducts() {
      return this.$store.getters.recommendedProducts
    }
  },
  created() {
    this.$store.dispatch('loadRecommendedProducts');
    if (this.$route.params.token) {
      this.token = this.$route.params.token;
      this.restorePasswordIsOpen = true;
    }   
  },
  
  methods: {
    closeModal() {
      this.restorePasswordIsOpen = false;
    }
  },
}
</script>

<style lang="scss" scoped>
  .ad-banner { margin: 50px 0; }
</style>
