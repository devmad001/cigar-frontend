<template>
  <div class="contacts-wrapper">
    <profile-header :title="title" :action="openModal"></profile-header>
    <slot name="contacts"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    ProfileHeader: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/TheHeader')
    )
  },
  props: {
    title: String,
    openModal: Function,
  }
}
</script>

<style lang="scss" scoped>
.contacts-wrapper {
  width: 280px;
  margin-bottom: 50px;
}
</style>
