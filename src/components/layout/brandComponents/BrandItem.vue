<template>
  <div class="item" @click="redirect(title)">
    <figure class="image">
      <img v-lazy="image" :alt="title">
    </figure>
    <div class="title">
      <h6>{{ title }}</h6>
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
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    redirect(title) {
      this.$store.dispatch('addToActive', { type: 'brand', values: title });
      this.$router.push({ path: `/categories/1-cigars`});
    }
  },
}
</script>

<style lang="scss" scoped>
  .item {
    width: 280px;
    max-width: 280px;
    cursor: pointer;

    .image {
      background: #FCF9F6;
      max-height: 120px;
      padding: 20px;

      img {
        max-width: 240px;
        width: 80%;
        height: 80px;
      }
    }
    .image:hover {
      background: #F2E2D3;
    }

    .title {
      width: 100%;
      text-align: center;
      margin-top: 10px;

      h6 {
        font-family: 'Lato';
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        text-transform: capitalize;
        color: #352414;
        white-space: pre-wrap;
        overflow: auto;
      }
    }

    &:hover .title h6{
      color: #6C3F13;
    }
  }

  @media screen and (max-width: 576px) {
    .item {
      width: 100px;
      max-width: 100px;
      height: 33px;
      
      .image {
        padding: 0;
        background: #FFF;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .image:hover {
        background: #FCF9F6;
      }

      .title {
        display: none;
      }
    }
  }
</style>
