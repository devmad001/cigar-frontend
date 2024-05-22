<template>
  <div 
    :class="otherBlock"  
    class="block"
    v-if="condition">
    <div :class="[classOurBlog, classOurBlogOther]" class="blog-card hvr-box-shadow" @click="redirect">
      <div class="img-wrapper">
        <picture>
          <source :srcset="image.webp.url" type="image/webp">
          <img :src="image.medium.url" :alt="title" decoding="async" loading="lazy">
        </picture>
      </div>
      <div class="content">
        <div class="title" >{{title}}</div>
        <div class="date">{{formattedDate}}</div>
        <div :class="['text', ourBlogText, isSafari ? 'safari-ellipsis' : 'ellipsis']" v-html="text()"></div>
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
    body: String,
    id: Number,
    index:  Number,
    ourBlogIndex: Number,
    classOurBlog: String,
    srtCount: Number,
    ourBlogIndexOther: Number,
    otherBlock: String,
    classOurBlogOther: String,
    ourBlogText: String,
    slug: String
  },
  data() {
    return {
      isSafari: false
    }
  },
  computed: {
    formattedDate() {
      return format(new Date(this.created), 'do MMM yyyy');
    }, 
    condition() {
      return this.ourBlogIndex < 2 || this.index > 0 || this.index === 0 || this.ourBlogIndexOther > 1 && this.ourBlogIndexOther < 5  
    },
  },
  created() {
    if (navigator.userAgent.toLowerCase().indexOf('safari') > -1) this.isSafari = true;
  },
  methods: {
    text () {
      const text = this?.body.split(' ').slice(0, this.srtCount)
      return text.join(' ') + " <a class='link'>read more</a>"
    },
     redirect() {
      const params = this.slug ? this.slug : this.id;
      this.$router.push({ path: `/blog/${params}` });
    },
  }
}
</script>

<style lang="scss" scoped>
  .other-block {
    max-width: 380px;
    width: 30%;
  }
  .blog-card {
    display: flex;
    margin: 15px 0;
    height: 250px;
    cursor: pointer;
  }

  .img-wrapper {
    max-width: 580px;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .block { padding: 10px; }

  #blog-wrapper{
    .content{
      padding:0;
      margin:20px;
    }
  }

  .content {
    padding: 20px;
    text-align: start;
    overflow: hidden;
  }
  
  :deep(.link) {
    color: #6C3F13;
    border-bottom: 1px solid #6C3F13;

    &:hover {
      color: #B26D28;
      border-bottom: 1px solid #B26D28;
    }
  }

  .text {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    color: #393939;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .safari-ellipsis {
    overflow: hidden;
    display: block;
    font-size: 1rem;
    line-height: 1.5rem;
    height: 4.5rem;
    
    p { width: 94%; }
  }

  .date {
    margin: 15px 0 20px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #393939;
  }

  .title {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    color: #393939;
  }
  .our-blog {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .img-wrapper {
      max-width: 640px;
      width: 100%;
      height: 250px;
    }

    .content {
      padding: 20px 10px;
      max-width: 640px;
      width: calc(100% - 20px);
    }    
  }

  .our-blog-other {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 86%;
    margin: 30px 0;

     .img-wrapper {
      max-width: 640px;
      width: 100%;
      height: 250px;
    }

    .content {
      padding: 20px 10px;
      max-width: 640px;
      width: 95%;
    }      
          
  }

  @media screen and (max-width: 960px){
    .block { padding: 0; }
    
    .our-blog .img-wrapper, .our-blog .content,
    .other-block,
    .our-blog-other .img-wrapper {
      max-width: 100%; 
    }
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

     .content { padding: 20px 0; }
     .our-blog-other { margin-top: 15px; }

    .other-block {
      max-width: 380px;
      width: 100%;      
      margin-right: 10px;

      .img-wrapper {
        width: 150px;
        height: 132px;
      }

      .title {
        font-size: 14px;
        line-height: 17px;
      }

      .content { padding: 15px 0 0; }

      .date {
        margin: 10px 0 0;
        font-size: 14px;
      }
    }
    
    .block-blog {
      margin-right: 10px;

      .img-wrapper {
        width: 150px;
        height: 132px;
      }

      .title {
        font-size: 14px;
        line-height: 17px;
      }

      .content { padding: 15px 0 0; }

      .date {
        margin: 10px 0 0;
        font-size: 14px;
      }
    }

    .our-blog-text { display: none; }
  }
</style>
