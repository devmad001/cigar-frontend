<template>
  <base-meta pageType="help"></base-meta>
  <BaseBlogWrapper 
    title="Help & Contact" 
    linkTitle="/help" 
  >
    <div  class="wrapper-title">
      <div class="text_block">
        <p class="accent_text">FAQ</p>
        <h2 class="title">Help & Contact</h2>
      </div>
    </div>
    <div class="help-contact-content">
       <div class="block-answer">
        <Expand 
          v-for="answer in answers.answers" 
          :key="answer.id" 
          :title="answer.title"
          :body="answer.body"  
        />
      </div>
      <HaveAsQuestionForm />
    </div>
    <test-ads-banner type="footer" />
  </BaseBlogWrapper>
</template>

<script>
import BaseBlogWrapper from '../ui/BaseBlogWrapper.vue';
import Expand from '../layout/helpContactComponents/Expand.vue';
import HaveAsQuestionForm from '../layout/helpContactComponents/HaveAsQuestionForm.vue';

export default {
  components: {
    BaseBlogWrapper,
    Expand,
    HaveAsQuestionForm
  },
  created() {
       this.$store.dispatch('getAnswers')
  },
  computed: {
    answers() {
      return this.$store.getters.answers
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper-title {
  margin-bottom: 50px;
}

.block-answer {
  border-top: 2px solid #F2E2D3;
  max-width: 675px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 25px;
}

.ad-banner {
  margin: 0px 0 70px;
}

.help-contact-content {
  display: flex;
  margin-bottom: 100px;
}

@media screen and (max-width: 930px){
  .help-contact-content {
    display: block;
  }
  .block-answer {
    max-width: 100%;
  }
}

@media screen and (max-width: 520px) {
  .block-answer {
    max-width: 98%;
  }
}
</style>