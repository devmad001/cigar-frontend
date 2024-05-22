<template>
  <div class="accordion" :class="{active: open}">
    <div class="head_part" @click="toggleOpening">
      {{ title.replace(/[^a-z]/gi, ' ') }}
    </div>
    <div class="body_part with-scroll">
      <input type="text" name="brand-search" class="filter-search" placeholder="Search" v-if="title === 'brand'" @input="updateList">
      <div v-for="value in valuesList" :key="value">
        <div class="item" v-if="value.name && value.count !== 0">
          <input type="checkbox" :id="idName(value.name)" v-model="selected" :value="value.name" @change="submitFilter(value.name)" >
          <label :for="idName(value.name)">{{ value.name }}</label>
          <div class="count">{{ value.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'values'],
  data() {
    return {
      open: false,
      selected: [],
      filteredValues: null
    }
  },
  computed: {
    activeValues() {
      return this.$store.getters.activeFilters.filter(val => val.type === this.title).map(filter => filter.values);
    },
		valuesList() {
      if (this.filteredValues) return this.filteredValues;
			return this.values;
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
  created() {
      if (this.$store.getters.activeFilters) {
        this.selected = this.$store.getters.activeFilters
          .filter(val => val.type === this.title)
          .map(filter => filter.values);
      }
      if (this.$store.getters.activeFilters.map(filter => filter.type).includes(this.title)) this.open = true;
  },
  methods: {
    toggleOpening() {
      this.open = !this.open;
    },
    submitFilter(name) {
      const payload = {
        type: this.title,
        values: name
      } 
      this.$store.dispatch('addToActive', payload);
      this.$store.dispatch('addToLastActive', this.title);
    },
    updateList(e) {
      const value = e.target.value.toLowerCase();
      const filtered = this.values.filter(filter => filter.name && filter.name.toLowerCase().includes(value));
      this.filteredValues = filtered;
    },
    idName(value) {
      if (this.title === 'seller') return value + '__seller'
      return value;
    }
  },
}
</script>
