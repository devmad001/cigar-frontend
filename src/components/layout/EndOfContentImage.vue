<template>
  <section class="bottom-image">
    <div class="wrapper flex_wrapper flex_between">
      <div class="image">
        <picture>
          <source srcset="../../assets/img/webp_b_footer_image.png.webp" type="image/webp">
          <img src="../../assets/img/b_footer_image.png" alt="image for page bottom" width="781" height="114" decoding="async" loading="lazy">
        </picture>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bottom-image {
  margin: 50px 0;
  .image { 
    margin: auto;

    img { max-width: 100%; }
  }
}

@media screen  and (max-width: 720px) {
  .bottom-image .wrapper { max-width: 100%; }
  .bottom-image .image {
    max-width: 100%;

    :deep(img) { width: 100%; }
  } 
}
</style>
