<template>
  <div id="blog-wrapper" class="base-wrapper" :class="{ news: isNews }">
    <TheTitle 
      :title="title" 
      :linkTitle="linkTitle" 
      :titleDetails="titleDetails" 
      :classDetails="classDetails"
    >
    </TheTitle>
    <div class="body" :class="{ news: isNews }">
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
      type: Object,
    },
    classDetails: {
      type: String,
    },
    isNews: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TheTitle,
  }
}
</script>

<style lang="scss" scoped>
#blog-wrapper {
  .body { 
    width: 100%;
    display: flex;
    flex-direction: column;

    &.news {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}

@media screen and (max-width: 720px) {
  #blog-wrapper .body.news {
    flex-direction: column;
  }
}
</style>
