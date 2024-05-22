<template>
  <div class="header">
    {{ title }}
    <svg v-if="title !== 'Avatar'" :class="{icon: title !== 'Avatar'}" @click="action" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 13.66V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H10.34" stroke="#F2E2D3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18 2L22 6L12 16H8V12L18 2Z" stroke="#F2E2D3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    action: {
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #F2E2D3;
  padding-bottom: 16.5px;
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
}

.icon {
  cursor: pointer;
}

</style>