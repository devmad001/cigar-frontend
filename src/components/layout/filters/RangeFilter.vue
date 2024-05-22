<template>
 <div class="accordion" :class="{active: open}">
    <div class="head_part" @click="toggleOpening">
      {{title}}
    </div>
    <div class="body_part slider">
      <div class="inputs">
        <input type="text" :value="minPrice" @change="updatePriceFilter($event,0)">
        <span>-</span>
        <input type="text" :value="maxPrice" @change="updatePriceFilter($event,1)">
        <a class="hvr-radial-out lite" @click="submitFilter">ok</a>
      </div>
      <Slider v-model="selected" :min="min" :max="max" :tooltips="false" />
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider';

export default {
  components: {
    Slider
  },
  props: {
    title: {
      type: String,
      required: true 
    },
    minValue: {
      required: true, 
      default: 0
    },
    maxValue: {
      required: true
    }
  },
  data() {
    return {
      open: false,
      selected: []
    }
  },
  computed: {
    min() {
      if (this.minValue === this.maxValue) return parseInt((this.minValue / 100) - 1)
      if (this.title === 'price') return parseInt(this.minValue / 100);
      return parseInt(this.minValue);
    },
    max() {
      if (this.title === 'price') return parseInt(this.maxValue / 100);
      return parseInt(this.maxValue)
    },
    minPrice() {
      if (this.title === 'price') return '$' + this.selected[0];
      return this.selected[0];
    },
    maxPrice() {
      if (this.title === 'price') return '$' + this.selected[1];
      return this.selected[1];
    },
    activeValues() {
      return this.$store.getters.activeFilters.find(val => val.type === this.title);
    },
  },
  watch: {
    activeValues(curValue) {
      if (curValue === undefined) this.selected = [this.min, this.max];
    },
    $route() {
      this.open = false;
    }
  },
  created() {
    this.selected = [this.min, this.max];
  },
  methods: {
    toggleOpening() {
      this.open = !this.open;
    },
    updatePriceFilter(e, index) {
      if(e.target.value.substring(0, 1) === "$") {
         const value = parseInt(e.target.value.substring(1));
        if (Number.isInteger(value)) this.selected[index] = value
      } else return  this.selected[index] = '$'
      return ;
    },
    submitFilter() {
      let min = this.selected[0];
      let max = this.selected[1];
      if (this.title === 'price') {
        min *= 100;
        max = max * 100 + 99;
      }
      const payload = {
        type: this.title,
        values: {
          min: min,
          max: max
        }
      } 
      this.$store.dispatch('addToActive', payload);
      this.$store.dispatch('addToLastActive', this.title);
    }
  }
}
</script>

<style scoped>
@import '@vueform/slider/themes/default.css'
</style>
