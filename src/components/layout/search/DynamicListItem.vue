<template>
  <div class="item" @click="redirect">
    <div class="image">
      <img v-lazy="details.image_url" alt="test product 1" v-show="details.image_url">
    </div>
    <div class="body">
      <p class="title">{{details.title}}</p>
      <div class="prices">
        <p class="old-price" v-show="details.old_price">{{ '$' + details.old_price / 100 }}</p>
        <p class="price" v-show="details.price">{{ '$' + details.price / 100 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
  },
  methods: {
    redirect() {
      this.$router.push({ path: `/product/${this.details.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 15px;
  display: flex;
  cursor: pointer;

  &:hover {
    box-shadow: 0 -2px 8px -3px #B26D28;
  }

  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    color: #6C3F13;
    font-size: 16px;
    text-align: left;
  }

  .prices {
    display: flex;
    margin-top: 10px;

    .old-price {
      text-decoration-line: line-through;
      color: #b8b8b8;
      margin-right: 10px;
    }

    .price {
      font-weight: 800;
      color: #393939;
      text-align: left;
    }
  }
}
</style>
