<template>
  <div class="title-wrapper">
    <div class="text_block">
      <router-link class="title" to="/">Home</router-link>
      <span class="title">/</span>
      <a class="title active">{{ title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
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
    }
  }
}
</style>
