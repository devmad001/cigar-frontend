<template>
  <base-meta pageType="advertise"></base-meta>
  <BaseAdvertiseWithUs 
    title="Advertise with Us"
    linkTitle="/advertise-with-us" 
  >
    <div class="content-slider">
      <AdvertiseSlider 
        advertiseSlider="advertise-slider" 
        advertiseSlide="advertise-slide" 
        advertiseSliderMiniWrap="advertise-slide-mini-wrap"
        advertiseMini="advertise-mini"
        advertiseSliderMini="advertise-slide-mini"
        btn="btn"
        staticImage
      />
    </div>
    <div class="text">
      <p>CigarFinder.com makes comparison shopping easy with Product Reviews, Advance Search Filters, Compare Prices & Read Reviews on Top Brands & Products. Cigarfinder.com is a great way to search and compare premium cigars, humidors, pipes, e-cigarettes, tobacco, accessories, and more from the top cigar retailers online. We help you narrow your search by selecting your preferences with prices, sizes, brands, sellers, strength, country, plus more.</p>
      <p>Grow your business and increase sales with our advance online <b>advertising</b> solutions that help you find and attract new customers. We do all the heavy lifting by organizing and integrating all your online products onto cigarfinder.com. To learn more about becoming an advertiser, signup below with company information and a brief description of your company and goals.</p>
      <p><b>Benefits of Using CigarFinder.com</b></p>
      <p>CigarFinder.com provides shoppers with extensive product information to help them make informed decisions. Shoppers have the ability to:</p>
      <ul>
        <li>Read products and customer reviews</li>
        <li>Sort products by price, rating, brands, store, and more</li>
        <li>Quickly compare final prices, excluding tax and shipping costs</li>
        <li>Find online deals and coupons</li>
        <li>Purchase the item(s) directly from their selected online retailers</li>
      </ul>
      <p><b>Our Program Features:</b></p>
      <ul>
        <li>30–day Cookie</li>
        <li>Responsive Design Site Optimized for Desktop, Mobile and Tablet</li>
        <li>Monthly Newsletter Promotional Marketing Calendar & Exclusive Coupon Codes for Featured Advertisers</li>
      </ul>
      <p><b>Requirements:</b></p>
      <ul>
        <li>Dedicated Advertising Manager Required</li>
        <li>Well-designed Online E-Commerce Store with HQ Product Images</li>
        <li>Open to Joining an Affiliate Program</li>
      </ul>
    </div>
    <ContactUsForm ></ContactUsForm>
    <test-ads-banner type="footer" />
    </BaseAdvertiseWithUs>
</template>

<script>
import BaseAdvertiseWithUs from '../ui/BaseAdvertiseWithUs.vue';
import AdvertiseSlider from '../layout/AdvertiseSlider.vue';
import ContactUsForm from '../layout/ContactUs.vue';

export default {
  data() {
    return {
      attachments: [
        { url: "https://cigar-dev.s3.amazonaws.com/uploads/attachment/8350/1516293844540-0.jpeg" },
        { url: "https://cigar-dev.s3.amazonaws.com/uploads/attachment/8351/FITBC_box_orB.jpg" },
        { url: "https://cigar-dev.s3.amazonaws.com/uploads/attachment/8352/FITBT_closed.jpg" },
        { url: "https://cigar-dev.s3.amazonaws.com/uploads/attachment/8353/1502_Black_Gold.jpg" },
      ],
    }
  },
  components: {
    BaseAdvertiseWithUs,
    AdvertiseSlider,
    ContactUsForm
  }
}
</script>

<style lang="scss" scoped>
.content-slider {
  margin-bottom: 50px;
}

.text {
  margin: 0 230px 50px;
  text-align: start;
  font-family: Lato;
  font-size: 18px;
  line-height: 22px;
  color: #535249;
  p {
    margin-bottom: 5px;
  }
  ul {
    margin: 0 0 5px 30px;
  }
}

.ad-banner {
  margin: 0 0 70px;
}

@media screen and (max-width: 1200px) {
  .text {
    margin: 0 120px 50px;
  }
}

@media screen and (max-width: 720px) {
  .text {
    margin: 0px 25px 50px;
  }
}

</style>