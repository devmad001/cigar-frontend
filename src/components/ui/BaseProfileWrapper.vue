<template>
  <div id="profile-wrapper" class="base-wrapper">
    <the-title :title="title"></the-title>
    <div class="body flex_wrapper">
      <the-links></the-links>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheTitle from '../layout/profileComponents/TheTitle.vue'
import TheLinks from '../layout/profileComponents/TheLinks.vue';
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    TheTitle,
    TheLinks
  }
}
</script>

<style lang="scss" scoped>
#profile-wrapper{
  .body { width: 100%; }
}
</style>
