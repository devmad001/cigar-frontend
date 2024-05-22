<template>
  <div id="advertise-wrapper" class="base-wrapper-advertise">
    <TheTitle 
      :title="title" 
      linkTitle
      advertiseTitle="advertise-title"
    >
    </TheTitle>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheTitle from '../layout/blogComponents/TheTitle.vue'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    linkTitle: {
      type: String,
    },
    titleDetails: {
      type: String,
    },
    classDetails: {
      type: String,
    },
  },
  components: {
    TheTitle,
  }
}
</script>

<style lang="scss" scoped>
#advertise-wrapper {
  .body { 
    width: 100%;
    display: flex;
    flex-direction: column;
  }
 
}
 .base-wrapper-advertise {
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    margin-top: 290px;
  }
</style>
