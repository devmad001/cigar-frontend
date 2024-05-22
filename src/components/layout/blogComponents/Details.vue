<template>
    <div  class="blog-details">
      <div class="text_block">
        <p class="accent_text">Article:</p>
        <h2 class="title">{{title}}</h2>
      </div>
      <div class="date">{{formattedDate}}</div>
      <div class="img-wrapper">      
        <img :src="img?.url" :alt="title">
      </div>
      <div v-html="body" class="text"></div>
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    img: Object,
    title: String,
    date: String,
    body: String
  },
  computed: {
    formattedDate() {
      if (this.date) return format(new Date(this.date), 'do MMM yyyy');
      return this.date;
    }, 
  },
}
</script>

<style lang="scss" scoped>
  .blog-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 780px;
    width: 100%;
  }

  .date {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: #535249;
    margin: 15px 0 30px;
    padding-bottom: 7px;
    border-bottom: 2px solid #F2E2D3;
  }

  .img-wrapper { margin-bottom: 30px; }
  img { width: 100%; }

  .text {
    font-family: Lato;
    font-size: 18px;
    line-height: 22px;
    color: #535249;
    text-align: start;
    margin-bottom: 100px;

    :deep(p) { margin-bottom: 20px; }
    :deep(img) { width: 100% !important; }
  }
</style>
