<template>
  <base-meta pageType="blog"></base-meta>
  <BaseBlogWrapper :title="'blog'" linkTitle="/blog">
    <BlogCard 
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
    </BlogCard>
    <div class="pagination">
      <pagination v-model="page" :records="articlesCount" :per-page="10" :options="options" @paginate="commentPagination" />
    </div>
    <test-ads-banner type="footer" />
  </BaseBlogWrapper>
</template>

<script>
import BaseBlogWrapper from '../ui/BaseBlogWrapper.vue';
import BlogCard from '../layout/blogComponents/BlogCard.vue';
import ThePagination from '../ui/ThePagination.vue';

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
    BlogCard
  },
  created() {
    this.$store.dispatch('getArticlesList', { params: "&page=1&article_type=blog" });
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
      const categoryParams = "&article_type=blog&page=" + this.page;
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
