<template>
  <div class="comment-card-block">
    <div class="answer" >{{ title }}</div>
      <div class="rating">
        <base-rating :rating="rating"></base-rating>
      </div>
      <div class="block-info">
        <div class="name-commentator">
          {{ full_name }}
        </div>
        <div class="date">
          {{ formattedDate }}
        </div>
      </div>
      <div class="text">
       {{ body }}
      </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    title: String,
    body: String,
    rating: {
      type: Number,
      required: true
    },
    date: { 
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    },
  },
  computed: {
    formattedDate() {
      return format(new Date(this.date), 'do MMM yyyy');
    },
  }
}
</script>

<style lang="scss" scoped>
.comment-card-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid #B26D28;
  .answer {
    margin-top: 20px;
    font-weight: bold;
    font-size: 16px;
  }

  .rating { margin: 10px 0; }

  .block-info {
    display: flex;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 19px;

    color: #000000;

    .name-commentator { margin-right: 20px; }
  }
  .text {
    font-size: 16px;
    color: #535249;
    text-align: start;
  }
}
</style>
