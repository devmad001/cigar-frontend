<template>
  <div class="customer-review" v-if="productsCount !== 0">
    <div id="review" >
      <div class="block-title">
        <div class="customer">Customer</div>
        <div class="review">Review</div>
      </div>
      <div class="average-rating">Average Rating: <base-rating :rating="product.rating"></base-rating></div>
        <div  class="comment-card-block" v-for="review in reviewsList.reviews" :key="review.id">
          <CommentCard 
            :title="review?.title"
            :body="review?.body"
            :rating="review?.rating"
            :date="review?.review_date"
            :full_name="review?.reviewer_name"
          />
        </div >
        <div class="pagination" >
          <pagination v-model="page" :records="productsCount" :per-page="3" :options="options" @paginate="commentPagination" />
        </div>
    </div>
    <div class="advertising">
      <test-ads-banner type="small" classname="active"></test-ads-banner>
      <test-ads-banner type="small" classname="active"></test-ads-banner>
    </div>
  </div>
</template>

<script>
import CommentCard from './CommentCard.vue';
import TestAdsBanner from '../../layout/TestAdsBanner.vue';
import ThePagination from '../../ui/ThePagination.vue';
import { initCJDeepLinks } from '../../../cjDLGenerator'

export default {
  data() {
    return {
      page: 1,
      options: Object.freeze({
        template: ThePagination,
        edgeNavigation: true,
        texts: {
          first: "<<",
          last: ">>",
          variant: 'secondary'
        },
      }),
      
      
    }
  },
  props: {
    product: {
      type: Object,
    },
  },
  computed: {
    productsCount() {
      return this.reviewsList.count || 0;
    },
    reviewsList() {
      return this.$store.getters.reviewsList
    },
  },
  components: {
    TestAdsBanner,
    CommentCard,
  },
  methods: {
    commentPagination() {
      const categoryParams = "&page=" + this.page;
      const payload = { params: categoryParams, id: this.product.id }
      this.$store.dispatch('reviewsListPagination', payload);
      setTimeout(() => {
        initCJDeepLinks();
      }, 1500);
    },
  },
}
  
</script>
  

<style lang="scss" scoped>
.customer-review {
  margin-top: 50px;
  display: flex;
  margin-right: 130px;
 }
.review-block {
  display: flex;
  .advertising {
    margin-left: 123px;
    .ad-banner { 
      width: 300px; 
      height: 250px;
    }
  }
}
.pagination {
  max-width: 675px;
  width: 100%;
}
#review {
  font-family: Lato;
  max-width: 675px;
  width: 100%;
  .comment-card-block {
    width: 100%;
  }
  .block-title {
    padding-bottom: 15px;
    border-bottom: 2px solid #B26D28;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .customer {
      font-family: Parisienne;
      font-style: normal;
      font-weight: normal;
      font-size: 40px;
      text-transform: capitalize;
      color: #6C3F13;
    }
    .review {
      font-style: normal;
      font-weight: 800;
      font-size: 40px;
      text-transform: uppercase;
      color: #393939;
    }
    
  }
  .average-rating {
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    color: #393939;
    text-align: start;
    padding-bottom: 20px;
    margin-top: 20px;
    border-bottom: 1px solid #B26D28;
  }
}
@media screen and (max-width: 1290px){
  .pagination {
    max-width: 405px;
    width: 100%;
  }
  .review-block {
    display: flex;
    .advertising {
      margin-left: 123px;
      .ad-banner { 
        width: 200px; 
        height: 150px;
      }
    }
  }
}
@media screen and (max-width: 1000px){
  .pagination {
    max-width: 305px;
    width: 100%;
  }
  .review-block {
    display: flex;
    .advertising {
      margin-left: 50px;

    }
  }
}
@media screen and (max-width: 850px){
  .pagination {
    max-width: 305px;
    width: 100%;
  }
  .review-block {
    display: flex;
    .advertising {
      margin-left: 50px;
      .ad-banner { 
        width: 185px; 
        height: 150px;
      }
    }
  }
}
@media screen and (max-width: 720px) {
    .customer-review {
      flex-direction: column;
      margin-right: 0;
    }
    .review-block {
      .advertising {
        display: flex;
        margin-left: 0;
        justify-content: space-around;
        margin-left: 0;
      }
    }
    .ad-banner { 
      width: 300px; 
      height: 250px;
    }
  }
</style>