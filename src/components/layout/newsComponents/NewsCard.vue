<template>
  <div class="block" :class="{ column_item: isColumn, main_item: isMainColumn }" v-if="id">
    <div class="blog-card hvr-box-shadow" @click="redirect">
      <div class="img-wrapper">
        <picture>
          <source :srcset="image.webp.url" type="image/webp">
          <img :src="image.medium.url" :alt="title" decoding="async" loading="lazy">
        </picture>
      </div>
      <div class="content">
        <div class="date">{{formattedDate}}</div>
        <div class="title" >{{title}}</div>
      </div>
    </div>
    <div v-show="index === 4">
      <test-ads-banner type="ad" />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    image: Object,
    title: String,
    created: String,
    id: Number,
    index:  Number,
    slug: String,
    isColumn: Boolean,
    isMainColumn: Boolean
  },
  computed: {
    formattedDate() {
      return format(new Date(this.created), 'do MMM yyyy');
    }
  },
  methods: {
    redirect() {
      const params = this.slug ? this.slug : this.id;
      this.$router.push({ path: `/news/${params}` });
    },
  }
}
</script>

<style lang="scss" scoped>
  .blog-card {
    margin: 15px 0;
    cursor: pointer;
  }

  .img-wrapper {
    max-height: 250px;
    width: 100%;
    img {
      max-height: 250px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .block { padding: 10px; }

  #blog-wrapper{
    .content{
      padding: 0;
      margin: 0 0 20px;
      text-align: start;
      overflow: hidden;
    }

    .body.news .block { width: 45%; }
  }
  
  :deep(.link) {
    color: #6C3F13;
    border-bottom: 1px solid #6C3F13;

    &:hover {
      color: #B26D28;
      border-bottom: 1px solid #B26D28;
    }
  }

  .date {
    margin: 15px 0;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #393939;
  }

  .title {
    font-family: 'Lato';
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #393939;
    max-height: 60px;
    overflow: hidden;
    white-space: break-spaces;
  }

  .column_item .blog-card {
    display: flex;
    justify-content: left;

    .img-wrapper {
      width: 170px;
      min-width: 170px;
      margin-right: 20px;
    }

    .content {
      text-align: left;

      .date { margin-top: 0; }
    }
  }

  @media screen and (max-width: 960px){
    .block { padding: 0; }
  }

  @media screen and (max-width: 720px) {
    .blog-card {
      flex-direction: column;
      height: 87%;
    }

    .img-wrapper {
      max-width: 100%;
      height: 250px; 
     }

    .content { padding-bottom: 20px; }
    #blog-wrapper .body.news .block { width: 100%; }

    .block .blog-card .content {
      .date {
        font-size: 14px;
        line-height: 19px;
      }
      .title {
        font-size: 14px;
        line-height: 17px;
        max-height: 35px;
      }
    }

    .column_item {
      margin-right: 10px;
      .blog-card {
        display: block;
        height: 220px;
        width: 200px;
        margin: 0;

        .img-wrapper {
          width: 100%;
          height: 150px;
        }

        .content {
          display: flex;
          flex-direction: column-reverse;
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    .main_item  .blog-card,
    .column_item .blog-card {
      box-shadow: none;
    }

    .main_item {
      .img-wrapper { height: 170px; }
      .content .date { margin: 15px 0 10px; }
    }

    .column_item .blog-card {
      display: block;
      height: 190px;
      width: 150px;
      margin: 0;

      .img-wrapper {
        width: 100%;
        height: 100px;
        min-width: 100%;
      }

      .content .title { margin: 20px 0 10px; }
    }
  }
</style>
