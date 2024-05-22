<template>
  <div class="sort flex_wrapper flex_between" v-if="!isMobile">
    <label for="sorting">Sort By</label>
    <Multiselect
      v-model="sortedBy"
      :options="sortingOptions"
      :close-on-select="true"
      id="sorting"
      placeholder="Not Selected"
    />
  </div>
  <div
    class="sorting-list"
    style="padding: 0 20px"
    v-else
  >
    <div
      class="sort"
      v-for="option in sortingOptions"
      :key="option.value"
      style="margin-bottom: 30px"
    >
      <input
        type="radio"
        :name="option.value"
        :id="option.value"
        class="custom-radio"
        :value="option.value"
        v-model="sortedBy"
      />
      <label class="custom-radio-label" :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import "@vueform/multiselect/themes/default.css";
import '@/styles/CustomRadio.scss';
import { mapActions } from 'vuex';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Multiselect
  },
  data() {
    return {
      sortingOptions: [
        { label: 'Low to expensive', value: 'price-asc'},
        { label: 'Expensive to low', value: 'price-desc' },
        { label: 'Most popular', value: 'purchases-desc' },
        { label: 'New Items', value: 'created_at-desc' },
      ],
      sortedBy: null,
    }
  }, 
  watch: {
    sortedBy(curVal, prevVal) {
      if (!curVal) return this.disableSorting();
      if (curVal && curVal !== prevVal) {
        const value = curVal.split('-');
        const column = value[0];
        const type = value[1];
        this.setSorting(`&sort_column=${column}&sort_type=${type}`);
      }
    },
    $route() {
      this.sortedBy = null;
    }
  },
  methods: {
    ...mapActions(['setSorting', 'disableSorting']),
  }
}
</script>

<style lang="scss" scoped>
.sort {
  :deep(.multiselect.is-single) {
    margin: 0;

    .multiselect-input {
      min-height: 32px;
      border: 1px solid #F2E2D3;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      line-height: 19px;
      color: #535249;
    }
    .multiselect-placeholder { color: rgba(83, 82, 73, 0.3); }
    
    .multiselect-single-label {
      padding-left: 15px;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      line-height: 19px;
      color: #352414;
    }
    
    .multiselect-option {
      padding-left: 10px;
      &.is-selected { background: #6C3F13; }
    }

    .multiselect-clear {
      width: 28px;
      height: 26px;
      top: 44%;
      transform: translateY(-48%);

      &::before { top: 10px; }
      &::after { top: 10px; }
    }

    .multiselect-caret {
      border: 0;
      background: transparent;
      background-image: url('../../../../assets/img/custom_select_arrow.svg');
      background-size: 7px 3px;
      background-repeat: no-repeat;
      background-position-x: 95%;
      background-position-y: 50%;
      width: 4px;
      height: 3px;
    }
  }
}
</style>
