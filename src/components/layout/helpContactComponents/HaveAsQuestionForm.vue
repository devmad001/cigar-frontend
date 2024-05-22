<template>
  <div class="question-content">
      <ContactUsForm
        title="Have as Question?"
        :classname="{
          defaultClass: 'question-form',
        }"
      />
    <test-ads-banner type="medium-horizontal"></test-ads-banner>
  </div>
</template>

<script>
import ContactUsForm from "../forms/ContactUsForm";
export default {
  components: {ContactUsForm}
}
</script>

<style lang="scss" scoped>

.question-content {
  height: 100%;
  margin: -125px 0 0 0;
}

@media screen and (max-width: 930px) {
  .question-content {
    margin: 50px auto;
  }
}


</style>

