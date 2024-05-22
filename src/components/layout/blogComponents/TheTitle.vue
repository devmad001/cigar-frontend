<template>
<!-- TODO there is an opportunity to reuse -->
  <div :class="['title-wrapper', advertiseTitle]">
    <div class="text_block">
      <router-link class="title" to="/">Home</router-link>
      <span class="title">/</span>
      <router-link  :class=" titleDetails?.title ? 'title' : 'title active' " :to="linkTitle">{{ title }}</router-link >
      <span v-show="titleDetails?.title" class="title">/</span>
      <a class="title active">{{ titleDetails?.title }}</a>
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
    linkTitle: {
      type: String,
    },
    titleDetails: {
      type: Object,
    },
    classDetails: {
      type: String,
    },
    advertiseTitle: {
      type: String,
    }
  },
}
</script>

<style lang="scss" scoped>
.title-wrapper {
  margin-bottom: 75px;
  text-align: left;

  span { margin: 0 10px; }

  .title {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    text-transform: uppercase;
    color: #6C3F13;

    &.active { 
      color: #393939; 
      font-weight: 800;
      text-decoration: none;
    }
  }
}
.advertise-title {
    margin: 0 80px 50px;
  }
@media screen and (max-width: 1200px) {
  .advertise-title {
    margin: 0 35px 50px;
  }
}
@media screen and (max-width: 720px) {
  .advertise-title {
    margin: -150px 20px 100px;;
  }
}
</style>