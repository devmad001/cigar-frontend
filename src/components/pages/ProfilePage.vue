<template>
  <base-meta pageType="profile"></base-meta>
  <base-profile-wrapper title="my profile">
    <profile/>
  </base-profile-wrapper>
  <test-ads-banner type="footer"></test-ads-banner>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  components: {
    Profile: defineAsyncComponent(() => import('@/components/layout/profileComponents/TheProfile'))
  }
}
</script>

<style lang="scss" scoped>
#products-list {
  width: 75%;
  margin-top: 0;
  :deep(.body) { width: 100%; }
}

@media screen and (max-width: 1200px) {
  #products-list {
    width: 100%;
    :deep(.body) {
      .list-header .products-count { width: 100%; }
      .item.list .item_body {
        .prices {
          justify-content: space-between;
          margin-bottom: 0;
          align-items: center;
          .price,
          .old-price {
            font-size: 20px;
            margin-right: 10px;
          }
        }
        a.link {
          width: 200px;
          height: 44px;
        }
      }
    }
  }
}
@media screen and (max-width: 720px) {
  #products-list {
    width: 100%;
    :deep(.body) {
      .list-header .products-count { width: 100%; }
    }
  }
}
</style>
