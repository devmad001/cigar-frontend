<template>
  <section>
    <div class="subcategories">
      <div class="subcategory" v-for="subcategory in subCategories" :key="subcategory.id">
        <router-link :to="'/categories/' + subcategory.slug">
          <div class="category-image">
            <img :src="subcategory.image.medium.url" :alt="subcategory.title" v-if="subcategory.image">
          </div>
          <p class="title">{{ subcategory.title }}</p>
        </router-link>
      </div>
    </div>
    <hot-sale-section></hot-sale-section>
    <banners-section></banners-section>
  </section>
</template>

<script>
import HotSaleSection from '../HotSaleSection';
import BannersSection from "../categoryComponents/BannersSection";

export default {
  components: {
    HotSaleSection,
    BannersSection
  },
  computed: {
    subCategories() {
      const categories = this.$store.getters.categoriesList;
      
      if (categories) return categories.find(cat => cat.title === 'E-Cigarettes').subcategories;
      return [];
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding-top: 50px;
  }

   :deep(#banners) {
      padding-top: 0;
    }

  .subcategories {
    display: flex;
    justify-content: space-between;

    .subcategory {
      max-width: 380px;
      &:not(:last-child) { margin-right: 20px; }

      a { text-decoration: none; }

      .category-image img { width: 100%; }
      
      .title {
        font-family: 'Lato', sans-serif;
        font-weight: 800;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        text-transform: capitalize;
        color: #1E1E1E;
      }
    }
  }

  @media screen and (max-width: 1440px){
    :deep(.wrapper) {
      max-width: 100%;
    }
  }
  
  @media screen and (max-width: 720px){
    .subcategories {
      flex-wrap: wrap;
      justify-content: center;

      .subcategory {
        margin-bottom: 20px;
        
        &:not(:last-child) { margin-right: 0; }
      }
    }
  }
</style>
