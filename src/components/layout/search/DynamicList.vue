<template>
  <div id="results">
    <div class="suggestions-list" :class="{ open: suggestionsListIsOpen }" v-if="suggestions?.length > 0">
      <the-suggestion
        v-for="item in suggestions"
        :key="item.id"
        :details="item"
        @click="close"
        @resetSearchInput="resetInput"
      ></the-suggestion>
      <p class="show-more suggestions" @click="toggleSuggestionsList">{{suggestionsShowMore}}</p>
    </div>
    <div class="list" :class="{ open: productsListIsOpen }" v-if="products?.length > 0">
      <the-product
        v-for="item in products"
        :key="item.id"
        :details="item"
        @click="close"
      ></the-product>
      <p class="show-more products" @click="toggleProductsList">{{productsShowMore}}</p>
    </div>
    <p class="no-results" v-else-if="products?.length === 0">No Results</p>
  </div>
</template>

<script>
import TheProduct from "./DynamicListItem.vue";
import TheSuggestion from "./SuggestionItem.vue";

export default {
  components: {
    TheProduct,
    TheSuggestion
  },
  props: {
    request: String,
  },
  data() {
    return {
      products: null,
      suggestions: null,
      suggestionsListIsOpen: false,
      productsListIsOpen: false,
    };
  },
  computed: {
    suggestionsShowMore() {
      if (this.suggestionsListIsOpen) return "hide more"
      return "show more"
    },
    productsShowMore() {
      if (this.productsListIsOpen) return "hide more"
      return "show more"
    }
  },
  watch: {
    async request(curVal, prevVal) {
      if (curVal !== prevVal) await this.sendRequest(curVal);
    },
  },
  async created() {
    if (this.request) await this.sendRequest(this.request);
  },
  methods: {
    async sendRequest(request) {
      let url = "https://hiscigar.com/api/v1/products/suggestions?q=" + request?.replace('%', '%25');
      const token = this.$store.getters.token;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Session-Token": token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error);
        throw error;
      }

      this.products = responseData?.products;
      this.suggestions = responseData?.suggestions;
    },
    close() {
      this.$emit("closeDynamicList")
    },
    resetInput(request) {
      this.$emit('resetSearchInput', request);
    },
    toggleSuggestionsList() {
      this.suggestionsListIsOpen = !this.suggestionsListIsOpen;
    },
    toggleProductsList() {
      this.productsListIsOpen = !this.productsListIsOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
#results {
  z-index: 10;
  background: #fff;
  position: absolute;
  top: 48px;
  left: -1px;
  right: 0;
  padding: 15px;
  border: 1px solid #f2e2d3;
  border-top: none;
  min-height: 300px;
  display: flex;

  .suggestions-list {
    width: 50%;
    margin-right: 6px;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 100%;
      top: 0;
      background: #f2e2d3;
      position: absolute;
      right: -3px;
    }
  }
}

.show-more {
  display: none;
}

@media screen and (max-height: 700px) {
  #results {
    height: 300px;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 720px) {
  #results {
    height: 100%;
    flex-wrap: wrap;
    overflow-y: scroll;

    .suggestions-list {
      width: 100%;
      &::after {
        display: none;
      }
    }
  }

  .item {
    display: none;
  }

  .suggestions-list .item:nth-child(-n+3) {
    display: block;
  }

  .list .item:nth-child(-n+3) {
    display: flex;
  }

  .suggestions-list.open .item {
    display: block;
  }

  .list.open .item {
    display: flex;
  }

  .show-more {
    display: block;
    color: #6C3F13;
    text-align: left;
    margin: 10px 0;
    text-decoration: underline;
  }
}
</style>
