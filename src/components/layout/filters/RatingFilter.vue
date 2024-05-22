<template>
  <div class="accordion" :class="{active: open}">
    <div class="head_part" @click="toggleOpening">
      Rating
    </div>
    <div class="body_part">
      <div class="item">
        <input type="checkbox" id="less-one" v-model="selected" :value="1" @change="submitFilter(1)">
        <label for="less-one" class="rating">
          1
          <span class="full"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div class="count">{{ counts.one }}</div>
      </div>
      <div class="item">
        <input type="checkbox" id="less-two" v-model="selected" :value="2" @change="submitFilter(2)">
        <label for="less-two" class="rating">
          2
          <span class="full"></span>
          <span class="full"></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div class="count">{{ counts.two }}</div>
      </div>
      <div class="item">
        <input type="checkbox" id="less-three" v-model="selected" :value="3" @change="submitFilter(3)">
        <label for="less-three" class="rating">
          3
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
          <span></span>
          <span></span>
        </label>
        <div class="count">{{ counts.three }}</div>
      </div>
      <div class="item">
        <input type="checkbox" id="less-four" v-model="selected" :value="4" @change="submitFilter(4)">
        <label for="less-four" class="rating">
          4
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
          <span></span>
        </label>
        <div class="count">{{ counts.four }}</div>
      </div>
      <div class="item">
        <input type="checkbox" id="less-five" v-model="selected" :value="5" @change="submitFilter(5)">
        <label for="less-five" class="rating">
          5
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
          <span class="full"></span>
        </label>
        <div class="count">{{ counts.five }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      selected: []
    }
  },
  computed: {
    selectedValues() {
      return this.selected;
    },
    activeValues() {
      return this.$store.getters.activeFilters.filter(val => val.type === 'rating').map(filter => filter.values);
    },
    counts() {
      if (this.$store.getters.filters && this.$store.getters.filters.length) { 
        return this.$store.getters.filters.filter(filter => filter[1].type === 'rating')[0][1];
      }
      return [];
    }
  },
  watch: {
    activeValues(curValue) {
      this.selected = curValue;
    },
    $route() {
      this.open = false;
    }
  },
  methods: {
    toggleOpening() {
      this.open = !this.open;
    },
     submitFilter(value) {
      const payload = {
        type: 'rating',
        values: value
      } 
      this.$store.dispatch('addToActive', payload)
    },
  }
}
</script>
