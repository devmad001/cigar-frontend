<template>
  <div @click="handleIsOpen" class="answer">
    <div v-if="!isOpen" class="wrapper-svg" >
      <svg  width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="5" width="12" height="2" fill="#6C3F13"/>
        <rect x="5" width="2" height="12" fill="#6C3F13"/>
      </svg>
    </div>
    <div class="wrapper-minus" v-else>
      <svg  width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="12" height="2" fill="#6C3F13"/>
      </svg>
    </div>
    <div>
      <div class="title">
        {{title}}
      </div>
      <div v-show="isOpen" v-html="body" class="body"/>
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    title: {
      type: String,
    },
    body: {
      type: String,
    }
  },
  methods: {
    handleIsOpen() {
      return this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  border-bottom: 1px solid #F2E2D3;
  max-width: 675px;
  width: 100%;
  height: max-content;
  padding: 15px 0;
  display: flex;
  text-align: start;
  cursor: pointer;
} 

.wrapper-svg {
  margin: 2px 10px 0 0;
}

.title {
  font-family: Lato;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #393939;
  margin-bottom: 5px;
}

.wrapper-minus {
  margin: -3px 10px 0 0;
}

@media screen and (max-width: 930px){
  .answer {
    max-width: 100%;
  }
}

</style>