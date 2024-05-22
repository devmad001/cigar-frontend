<template>
  <section id="our-blog">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Learn More In</p>
        <h2 class="title">Cigar Life</h2>
      </div>
    </div>
    <div v-show="articlesList.articles" class="wrapper m-top-50">
      <div class="row-revers">
        <BlogCard
          v-for="(article, index) in articlesList.articles" 
          :key="article.id"
          classOurBlog="our-blog"
          otherBlock="block-blog"
          ourBlogText="our-blog-text"
          :image="article?.image"
          :title="article?.title"
          :slug="article?.slug"
          :created="article?.created_at"
          :body="article?.body"
          :id="article?.id"
          :ourBlogIndex="index"
          :srtCount="43"
        />
      </div>

      <div class="row">
         <BlogCard
          v-for="(article, index) in articlesList.articles" 
          :key="article.id"
          classOurBlogOther="our-blog-other"
          otherBlock="other-block"
          ourBlogText="our-blog-text"
          :image="article?.image"
          :title="article?.title"
          :created="article?.created_at"
          :slug="article?.slug"
          body=""
          :id="article?.id"
          :ourBlogIndexOther="index"
          :srtCount="20"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BlogCard from './blogComponents/BlogCard.vue';

export default {
  components: {
    BlogCard
  },
  computed: {
    articlesList() {
      return this.$store.getters.articlesList
    },
  },
  created() {
    this.$store.dispatch('getArticlesList',  { params: "&article_type=blog&per_page=10" });
  },

}
</script>


<style lang="scss" scoped>

section#our-blog{
  margin-top: 100px;
  .wrapper {
    .row {  
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px; 
      margin: 0 0 0 -15px;
    }

    .row-revers {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0 -15px;
    }
  }
}

@media screen and (max-width: 1200px) {
  section#our-blog{
    padding: 0 105px;
    .wrapper {
      max-width: none;
      .text_block {
            margin: 0 -68px;
      }
    }
    
  }
}

@media screen and (max-width: 960px){
  section#our-blog {
    justify-content: space-around;
    max-width: 100%;
    padding: 20px;
    .wrapper {
      .text_block {
        margin: 0 ;
      }
      .row {
        margin: 0;

        .column {
          margin: 30px 0;
        }
      }
      .row-revers {
        margin: 0;
        display: block;
      }
    }
  }
}
@media screen and (max-width: 720px) {
  section#our-blog {
    .wrapper {
      display: flex;
      overflow: auto;
      overflow-y: hidden;

      .row-revers {
        display: flex;
      }

      .row {
        display: flex;
        flex-wrap: inherit;
      }
    }
    .wrapper::-webkit-scrollbar {
      width: 0;
    }
  }
}

@media screen and (max-width: 540px) {
  section#our-blog{
    margin-top: 50px;

    .accent_text {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 20px;
    }
  }
}
</style>
