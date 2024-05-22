<template>
  <section class="ad-banner" :class="[searchHeaderType ? 'small-horizontal' : '']">
    <div class="wrapper flex_wrapper flex_between">
      <div class="image">
        <div v-if="adType && !isMobileScreen">
          <div v-html="bannerBody"></div>
        </div>
        <div v-else-if="smallType && !isMobileScreen" class="small">
          <div v-html="bannerBody"></div>
        </div>
        <div v-else-if="filterType && !isMobileScreen">
          <div v-html="bannerBody"></div>
        </div>
        <div v-else-if="searchHeaderType && !isMobileScreen">
          <div v-html="bannerBody"></div>
        </div>
        <div v-else-if="staticPageType && !isMobileScreen">
          <div v-html="bannerBody"></div>
        </div>
        <div v-else-if="mediumHorizontal && !isMobileScreen">
          <div v-html="bannerBody"></div>
        </div>
        <img src="../../assets/img/b_footer_image.png" alt="image for page bottom" decoding="async" loading="lazy" v-else>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      body: null,
      screenWidth: 0
    }
  },
  computed: {
    adType() {
      return this.type === 'ad'; 
    }, 
    smallType() {
      return this.type === 'small';
    },
    filterType() {
      return this.type === 'filter';
    },
    searchHeaderType() {
      return this.type === 'small-horizontal'
    },
    staticPageType() {
      return this.type === 'static-page'
    },
    mediumHorizontal() {
      return this.type === 'medium-horizontal'
    },
    bannerBody() {
      return this.body;
    },
    isMobileScreen() {
      return this.screenWidth <= 720;
    }
  },
  async created() {
    const body = await this.loadBanner(this.bannerType(this.type));
    if (body) this.body = body;
    this.screenWidth = window.innerWidth;
  },
  methods: {
    bannerType(type) {
      let type_param = "";
      switch (type) {
        case "ad":
          type_param = "horizontal_728x90";
          break;
        case "small":
          type_param = "square_250x250";
          break;
        case "filter":
          type_param = "vertical_160x600";
          break;
        case "static-page":
          type_param = "vertical_300x600";
          break;
        case "small-horizontal":
          type_param = "horizontal_300x50";
          break;
        case "medium-horizontal":
          type_param = "horizontal_468x60";
          break;
      }
      return type_param;
    },
    async loadBanner(params) {
      if (params) {
        let param = `?ad_type=${params}`;
        const response = await fetch(
          `https://hiscigar.com/api/v1/get_banner${param}`, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const responseData = await response.json();

        if (!response.ok) return null;
        return responseData?.banner?.body;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/AdBanner.scss';

.ad-banner {
  margin: 100px 0;
  .image { 
    margin: auto;

    :deep(.small div a img) {
      width: 250px;
      height: 250px;
    }
  }
  .image img { max-width: 100%; }
  .small-banner { display: none; }

  &.static-page-banner {
    margin: 0;
    .image {
      width: 300px;
    }
  }
}

.ad-banner.small-horizontal {
  margin: 0;
  .image { margin: 0; }
  .image img { max-width: 100%; }
  .small-banner { display: none; }
}

@media screen  and (max-width: 720px) {
  .ad-banner .wrapper { max-width: 100%; }
  .ad-banner .image {
    max-width: 100%;

    :deep(img) { width: 100%; }
  } 
}

@media screen and (max-width: 576px) {
  .ad-banner.small {
    display: none;
  }
}
</style>
