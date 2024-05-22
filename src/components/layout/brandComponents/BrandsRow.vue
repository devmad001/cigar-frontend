<template>
  <div class="brands-row">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .brands-row {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-bottom: 20px;
  }
</style>
