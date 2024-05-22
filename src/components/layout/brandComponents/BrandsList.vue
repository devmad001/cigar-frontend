<template>
  <div class="list" v-if="itemsList">
    <div class="chunks" v-if="itemsList.length === 3 && Array.isArray(itemsList[0])">
      <brands-row v-for="row in itemsList" :key="row[0]" :rowProp="row">
        <brand-item v-for="item in row" :key="item.id" :title="item?.name" :image="item?.image?.small.url"></brand-item>
      </brands-row>
    </div>
    <div class="items" v-else>
      <brand-item v-for="item in items" :key="item.id" :title="item?.name" :image="item?.image?.small.url"></brand-item>
    </div>
  </div>
</template>

<script>
import BrandItem from './BrandItem.vue'
import BrandsRow from './BrandsRow.vue'

export default {
  components: {
    BrandItem,
    BrandsRow
  },
  props: {
    items: {
     type: Array,
     required: true
    }
  },
  computed: {
    itemsList() {
      return this.items;
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    margin-bottom: 20px;
  }

  .chunks {
    width: 100%;
  }

  .items {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
