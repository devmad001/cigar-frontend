<template>
  <teleport to='head'>
    <title>{{ titleData }}</title>
    <meta name="description" :content="descriptionData">
  </teleport>
</template>

<script>
export default {
  props: {
    titleProp: String,
    descriptionProp: String,
    pageType: String
  },
  data() {
    return {
      title: "Cigar Finder",
      description: "The best site for finding cigars, tobacco and all kinds of accessories. Cigars, tobacco, pipes, vapes, electronic cigarettes and other accessories"
    }
  },
  computed: {
    titleData() {
      return this.titleProp || this.title;
    },
    descriptionData() {
      return this.descriptionProp || this.description;
    },
  },
  async created() {
    if (this.pageType) await this.loadMeta();
  },
  methods: {
    async loadMeta() {
      const response = await fetch(
        `https://hiscigar.com/api/v1/get_meta?page_type=${this.pageType}`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) return;
      if (responseData?.meta?.title) this.title = responseData.meta.title;
      if (responseData?.meta?.description) this.description = responseData.meta.description;
    }
  },
}
</script>
