<template>
  <base-meta 
    :titleProp="articleDetails?.title" 
    :descriptionProp="articleDetails?.body?.split(' ')?.slice(0, 180)"
  >
  </base-meta>
  <BaseBlogWrapper 
    :title="pageName" 
    :linkTitle="'/' + pageName" 
    :titleDetails="articleDetails"
    classDetails="active"
  >
  <div class="detalis-block">
    <BlogDetails
      :title="articleDetails?.title"
      :date="articleDetails?.created_at"
      :img="articleDetails?.image"
      :body="articleDetails?.body"    
      />
      <div class="block-banner">
        <test-ads-banner type="small" />
        <test-ads-banner type="small" />
      </div>
  </div>
  <test-ads-banner type="footer" />
  </BaseBlogWrapper>
</template>

<script>
import BaseBlogWrapper from '../ui/BaseBlogWrapper.vue';
import BlogDetails from '../layout/blogComponents/Details.vue';

export default {
  components: {
    BaseBlogWrapper,
    BlogDetails,
  }, 
  computed: {
    articleDetails() {
      return this.$store.getters.articleDetails
    },
    pageName() {
      if (this.$route.fullPath.indexOf('/blog') !== -1) {
        return 'blog'
      }
      return 'news'
    }
  },
  mounted() {
    const id = this.$route.params.slug.split('-')[0]

    this.$store.dispatch('articlesDetails', id)
  },
  
}
</script>

<style lang="scss" scoped>
  .ad-banner {
    margin: 0 0 70px 0;
  }
  .pagination {
    margin: 30px auto 50px;
  }
  .detalis-block {
    display: flex;
  }
  .block-banner {
    margin-left: 123px;
  }
  @media screen and (max-width: 720px) {
    .detalis-block {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .block-banner {
      margin-left: 0;
    }
  }
</style>