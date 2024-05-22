<template>
  <div id="base-wrapper" class="base-wrapper flex_wrapper flex_between">
    <div class="body">
      <div class="text_block">
        <p class="accent_text">Cigar finder,</p>
        <h2 class="title">{{ header }}</h2>
      </div>
      <slot></slot>
    </div>
    <div class="banner">
      <test-ads-banner class="static-page-banner" type="static-page"></test-ads-banner>
    </div>
  </div>
  <test-ads-banner type="footer"></test-ads-banner>
</template>

<script>
import TestAdsBanner from '../layout/TestAdsBanner';

export default {
  props: ["header"],
  components: {
    TestAdsBanner
  }
}
</script>

<style lang="scss" scoped>
  div#base-wrapper {
    .body {
      margin-right: 100px;

      .text_block { margin-bottom: 50px; }
    }
  }

  @media screen and (max-width: 960px) {
    div#base-wrapper {
      .body {
        margin-right: 50px;
        max-width: 80%;
      }
      .banner {
        max-width: 20%;
        img { width: 100%; }
      }
    }
  }

  @media screen and (max-width: 720px) {
    div#base-wrapper {
      &.flex_wrapper{ display: block; }

      .body { 
        max-width: 100%;
        margin-right: 0;
      }
      .banner {
        max-width: 200px;
        margin: auto;
      }
    }
  }
</style>
