<template>
  <base-meta pageType="blog"></base-meta>
  <BaseBlogWrapper :title="'news'" linkTitle="/news" :isNews="true" >
    <NewsCard 
      v-for="(article, index) in articlesList.articles"
      :key="article.id"
      :image="article?.image"
      :title="article?.title"
      :created="article?.created_at"
      :body="article?.body"
      :id="article?.id"
      :index="index"
      :slug="article?.slug"
    >
    </NewsCard>
  </BaseBlogWrapper>
  <div class="pagination">
    <pagination v-model="page" :records="articlesCount" :per-page="10" :options="options" @paginate="commentPagination" />
  </div>
  <bottom-image></bottom-image>
</template>

<script>
import BaseBlogWrapper from '../ui/BaseBlogWrapper.vue';
import NewsCard from '../layout/newsComponents/NewsCard.vue';
import ThePagination from '../ui/ThePagination.vue';
import BottomImage from '../layout/EndOfContentImage.vue';

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
  components: {
    BaseBlogWrapper,
    NewsCard,
    BottomImage
  },
  created() {
    this.$store.dispatch('getArticlesList', { params: "&page=1&article_type=news" });
  },
  computed: {
    articlesList() {
      return this.$store.getters.articlesList
    },
    articlesCount() {
      return this.articlesList.count || 0;
    },
  },
   methods: {
    commentPagination() {
      const categoryParams = "&article_type=news&page=" + this.page;
      const payload = { params: categoryParams }
      this.$store.dispatch('getArticlesList', payload);
    },
  },
}
</script>

<style lang="scss" scoped>
  .ad-banner {
    margin: 35px 0;
  }
  .pagination {
    margin: 30px auto 50px;
  }
</style>
