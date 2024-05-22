<template>
  <section id="welcome">
    <div class="wrapper flex_wrapper flex_between">
      <div class="text_block">
        <p class="accent_text">Welcome to Cigar finder,</p>
        <h2 class="title">the world’s largest cigar store</h2>
        <p class="desk m-bottom-15">
          Cigarfinder.com is a great way to search and compare premium cigars, humidors, pipes, 
          e-cigarettes, tobacco, accessories, and more from the top cigar retailers online. 
          We help you narrow your search by selecting your preferences with 
          prices, sizes, brands, sellers, strength, country, plus more.
        </p>
        <p class="desk">
          Explore your favorite cigar brands like Padron, Arturo Fuente, Liga Privada, and more. 
          Expanding our database daily, we now offer the best prices for vapes, humidors, cigar accessories, and the list goes on.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section#welcome {
  background: url("../../assets/background.svg");
  background-repeat: no-repeat;
  background-position: 55% 0;
  padding: 100px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 50%;
    background: url("../../assets/welcome-img.png");
    background-repeat: no-repeat;
    background-position: 25% 0%;
  }
  .text_block {
    text-align: left;
    max-width: 50%;
  }
  h2.title {
    padding-right: 140px;
    margin-bottom: 30px;
    line-height: 48px;
  }
  p.desk {
    font-size: 16px;
    line-height: 22px;
    color: #352414;
  }
}

@media screen and (max-width: 1200px) {
  section#welcome {
    background: none;
    &::before {
      width: 48%;
      background-position: 0% 0%;
    }

    .text_block { max-width: 45%; }
    h2.title { margin-bottom: 20px; }
    p.desk { line-height: 20px; }
  }
}

@media screen and (max-width: 720px) {
  section#welcome {
    &::before { 
      content: none;
      background: none;
    }
    .text_block { max-width: 100%; }
    h2.title { padding-right: 0; }
  }
}

@media screen and (max-width: 540px) {
  section#welcome {
    padding: 50px 20px;
    background: url("../../assets/background.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: -30% 0;

    .wrapper { 
      max-width: 100%; 
    }

    .accent_text {
      font-size: 32px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
    }

    p.desk {
      font-size: 14px;
      line-height: 17px;
    } 
  }
}
</style>
