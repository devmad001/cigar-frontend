<template>
  <div class="text_block" :class="[extended ? 'flex_wrapper flex_between' : '']">
    <p class="accent_text" v-if="accentText">{{ accentText }}</p>
    <h2 class="title">
      {{ title }}
    </h2>
    <div class="banner" v-if="extended">
      <test-ads-banner type="small-horizontal"></test-ads-banner>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    accentText: {
      type: String,
      default: ''
    },
    extended: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .text_block {
    padding-top: 20px;
  }

  @media screen and (max-width: 720px) {
    .ad-banner { display: none; }
    .text_block {
      margin-bottom: 10px;
    }
    h2.title {
      font-size: 32px;
      line-height: 38px;
    }
  }

  @media screen and (max-width: 576px) {
    .text_block.not-e-cigarettes { display: none; }
    h2.title { 
      padding: 0 11px;
      font-size: 20px;
      line-height: 22px ;
    }
    .text_block {
      padding-top: 5px;
    }
  }
</style>
