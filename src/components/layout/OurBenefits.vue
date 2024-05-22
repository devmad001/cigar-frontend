<template>
  <section id="benefits">
    <div class="wrapper">
      <div class="text_block">
        <p class="accent_text">Our</p>
        <h2 class="title">Benefits</h2>
      </div>
    </div>
    <div class="wrapper flex_wrapper flex_between">
      <div class="item">
        <img src="../../assets/img/benefit1.svg" alt="Search" loading="lazy"/>
        <p class="title">Search</p>
        <p>
          Find your favorite cigar brands, tobacco, e-cigarettes, and
          accessories.
        </p>
      </div>

      <div class="item">
        <img src="../../assets/img/benefit2.svg" alt="Compare" loading="lazy"/>
        <p class="title">Compare</p>
        <p>
          Discover multiple retailers offering the product you love, compare
          pricing, reviews, and more.
        </p>
      </div>

      <div class="item">
        <img src="../../assets/img/benefit3.svg" alt="Buy" loading="lazy"/>
        <p class="title">Purchase</p>
        <p>
          Purchase from selected retailers and receive items right to your
          doorstep.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section#benefits {
  h2 {
    margin-bottom: 45px;
    text-align: left;
  }
  p.accent_text {
    text-align: left;
  }
  .item {
    width: 32.2%;
    text-align: center;
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #352414;
      margin: 0;
      &.title {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        margin-bottom: 20px;
        margin-top: 25px;
        text-transform: capitalize;
        color: #352414;
      }
    }
  }
}
@media screen and (max-width: 720px) {
  section#benefits {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  section#benefits {
    .flex_wrapper {
      display: block;
    }
    .item {
      width: 90%;
      margin: auto;
      margin-bottom: 30px;
      p.title {
        font-size: 26px;
      }
      p {
        font-size: 20px;
      }
    }
  }
}
</style>
