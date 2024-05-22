<template>
  <div id="categories-wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
#categories-wrapper {
  margin-top: 210px;
  height: 100%;

  /*&.m-top-300 { margin-top: 300px; }*/
}

@media screen and (max-width: 720px){
  #categories-wrapper,
  #categories-wrapper.m-top-300 { 
    /*margin-top: 210px;*/
    margin-bottom: 50px;
  }
}
</style>
