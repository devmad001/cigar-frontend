<template>
  <section id="news" v-if="articlesList.articles?.length >= 1">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Cigar Industry</p>
        <h2 class="title">News</h2>
      </div>
    </div>
    <div class="wrapper m-top-50">
      <div class="row">
        <div class="main-column column">
          <news-card 
          :id="articlesList.articles[0]?.id" 
          :image="articlesList.articles[0]?.image"
          :title="articlesList.articles[0]?.title"
          :slug="articlesList.articles[0]?.slug"
          :created="articlesList.articles[0]?.created_at"
          :isMainColumn="true"
        ></news-card>
        </div>
        <div class="column mobile-carusel-container" v-if="articlesList.articles?.length > 1">
          <news-card 
            v-for="article in articlesList.articles.slice(1)"
            :key="article.id"
            :id="article.id"
            :image="article?.image"
            :title="article?.title"
            :slug="article?.slug"
            :created="article?.created_at"
            :isColumn="true"
          ></news-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NewsCard from '../layout/newsComponents/NewsCard.vue';

export default {
  components: {
    NewsCard
  },
  computed: {
    articlesList() {
      return this.$store.getters.newsList;
    },
  },
  created() {
    this.$store.dispatch('getArticlesList',  { params: "&article_type=news&per_page=4", type: 'news' });
  },
}
</script>

<style lang="scss" scoped>
  #news {
    .main-column {
      max-width: 100%;
      margin-right: 20px;
    }
    .column {
      width: 50%;
    }
    
    :deep(.block) {
      .blog-card {
        .content {
          text-align: left;
        }
      }
    }
  }

  @media screen and (max-width: 720px) {
    #news {
      .row {
        display: block;
      }

      .main-column {
        width: 100%;
      }

      .accent_text {
        font-size: 32px;
        line-height: 44px;
        margin-bottom: 0;
      }

      h2.title {
        font-size: 32px;
        line-height: 38px;
      }

      .mobile-carusel-container {
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        white-space: nowrap;
        position: relative;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>
