<template>
  <div class="item" @click="setRequest">
    <p class="title">{{ details?.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
  },
  computed: {
    category() {
      return this.$store.getters.category;
    }
  },
  methods: {
    setRequest() {
      this.$store.dispatch('fromSuggestionOn');
      this.$emit('resetSearchInput');
      this.$store.dispatch('setRequest', { request: this.details?.title, category: this.$store.getters.category });
      this.$router.replace('/search-results');
      if (this.category?.id > 0) {
        this.$store.dispatch('loadProducts', {params:`&q=${this.details?.title}&category_id=${this.category?.id}`});
      } else {
        this.$store.dispatch('loadProducts', {params:`&q=${this.details?.title}`});
      }
      this.$store.dispatch('loadProducts', {params:`&q=${this.details?.title}&category_id=${this.category?.id}`});
      this.$store.dispatch('enableLoading');
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
  cursor: pointer;

  &:hover .title {
    text-decoration: underline;
  }
  .title {
    color: #6C3F13;
    font-size: 16px;
    text-align: left;
  }
}
</style>
