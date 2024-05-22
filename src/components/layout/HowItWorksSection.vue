<template>
  <section id="how-it-work">
		<div class="wrapper">
      <div class="text_block">
        <p class="accent_text">How It</p>
        <h2 class="title">works</h2>
      </div>
		</div>
		<div class="wrapper flex_wrapper flex_between svg-background">
			<div class="item">
        <div class="ellipse">1</div>
        <div class="text">
          <p class="title">Explore Cigar Finder</p>
          <p>
            Search and compare between many tobacco online retailers for the best prices, reviews, etc. 
            We gather daily information from many cigar/tobacco-related e-commerce sites, 
            combine them, and tailor it according to your search request.
          </p>
        </div>
			</div>

			<div class="item">
				<div class="ellipse">2</div>
        <div class="text">
          <p class="title">Buy It</p>
          <p>
            Found the item you love? Once you have compared prices and reviews between the selected items. 
            Click on the shop now button to take you to the retailer's website to complete your purchase. 
          </p>
        </div>
			</div>

			<div class="item last">
				<div class="ellipse last">3</div>
        <div class="text">
          <p class="title">Enjoy It</p>
          <p>
            Once purchased, allow a few minutes for your confirmation email to arrive. 
            There you can view your order details with tracking information. 
            Once the order arrives, simply CUT, LIGHT, AND ENJOY your delicious cigar.
          </p>
        </div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
section#how-it-work{
	h2{
		margin-bottom: 45px;
    text-align: left;
	}
  p.accent_text {
    text-align: left;
  }
  .svg-background {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: -50%;
      width: 100%;
      height: 700px;
      opacity: 0.3;
      background: url('../../assets/how-it-works-background.svg');
      background-repeat: no-repeat; 
    }
  }
	.item{
		width: 32.2%;
		text-align: center;
    
		p{
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 22px;
			text-align: center;
			color: #352414;
			margin: 0;
			&.title{
				font-weight: bold;
				font-size: 24px;
				line-height: 29px;
				margin-bottom: 20px;
				margin-top: 35px;
				text-transform: capitalize;
				color: #352414;
			}
		}
    .ellipse {
      margin: auto;
      width: 115px;
      height: 115px;
      line-height: 115px;
      border-radius: 50%;
      font-family: 'Lato', sans-serif;
      font-style: normal;
      font-weight: 900;
      font-size: 44px;
      color: #6C3F13;
      text-align: center;
      background: #F2E2D3;
      position: relative;

      &::after {
        content: "";
        background: url('../../assets/arrow.svg');
        position: absolute;
        top: 37%;
        left: 155%;
        width: 155px;
        height: 30px;
      }
      &.last::after { content: none; }
    }
	}
}

@media screen and (max-width: 1200px) {
  section#how-it-work{
    .item{
      .ellipse::after {
        background-size: 75%;
        background-repeat: no-repeat;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  section#how-it-work{
    .item{
      .ellipse::after {
        background-size: 55%;
        left: 130%;
      }
    }
  }
}

@media screen and (max-width: 720px) {
  section#how-it-work{
    .wrapper.flex_wrapper{
      display: block;

      .item {
        width: 90%;
        margin: auto;
        margin-bottom: 220px;
        
        .ellipse::after {
          background-size: 100%;
          top: 310%;
          left: -15%;
          -webkit-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          transform: rotate(90deg);
        }
        &.last::after { content: none; }
        &.last { margin-bottom: 0; }
      }
    }

    .svg-background::before {
        top: -10%;
        left: 0; 
    }
  }
}

@media screen and (max-width: 540px) {
  section#how-it-work{
    .accent_text {
      font-size: 32px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2.title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 30px;
    }

    .wrapper {
      max-width: 100%;
      margin: 0 20px;
    }

    .wrapper.flex_wrapper {
      margin: 0;
    }

    .wrapper.flex_wrapper .item {
      display: flex;
      margin-bottom: 30px;

      .text {
        width: 80%;
        margin-left: 15px;

        p {
          text-align: left;
          font-size: 14px;
          line-height: 150%;
        }

        .title {
          font-weight: 700;
          font-size: 18px;
          line-height: 22px;
          margin-top: 0;
          margin-bottom: 10px;
        }
      }

      .ellipse {
        width: 40px;
        height: 35px;
        font-size: 18px;
        line-height: 32px;
        padding-top: 5px;
         margin-top: 0;
      }

      .ellipse::after { 
        background-size: 85%;
        background-repeat: no-repeat;
        background: url('../../assets/img/mobile_arrow.svg');
        position: absolute;
        top: 175%;
        left: 5px;
        width: 30px;
        height: 50px;
        -webkit-transform: none;
        -moz-transform: none;
        -ms-transform: none;
        -o-transform: none;
        transform: none;
      }
    }

    .svg-background::before {
        top: -12%;
        left: 0; 
        background-position: 100% 0%;
    }
  }
}

@media screen and (max-width: 370px){
  section#how-it-work .wrapper.flex_wrapper .item .ellipse::after { top: 200%; }
}
</style>
