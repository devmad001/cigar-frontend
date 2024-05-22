<template>
  <div class="title-wrapper">
    <div class="text_block">
      <router-link class="title" to="/">Home</router-link>
      <span class="slash">/</span>
      <router-link :to="'/categories/' + productCategotyId" class="title">{{ titleCategory }}</router-link>
      <span class="slash">/</span>
      <a class="title active">{{ titleProduct }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleCategory: {
      type: String
    },
    titleProduct: {
      type: String
    },
    productCategotyId: {
      type: Number,
    }
  },  
}
</script>

<style lang="scss" scoped>
.title-wrapper {
  font-family: 'Lato', sans-serif;
  margin-bottom: 75px;
  text-align: left;

  span { margin: 0 10px; }
  .slash {
    font-size: 22px;
  }
  .title {
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    text-transform: uppercase;
    color: #6C3F13;
    text-decoration: underline;

    &.active { 
      color: #393939; 
      font-weight: 800;
    }
  }
}
</style>
