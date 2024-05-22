<template>
  <div class="specification-section">
     <div  class="specification-block" v-for="feature in Object.keys(specification)" :key="feature">
        <div class="specification-title">{{feature === 'wrapper_type' ? 'wrapper' : feature}} </div>
        <div class="specification-info">{{specification[feature]}}</div>
      </div>

    <div class="product-buy">
      <div class="prices">
        <p class="old-price" v-show="oldPrice">{{ oldPriceValue}}</p>
        <p class="price" v-show="price">{{ priceValue }}</p>
      </div>
      <div class="item_row">
        <a class="btn btn-show link hvr-radial-out lite" :href="correctLink" target="_blank" rel="noopener noreferrer" @click="addToPurchased(id, $event)">Shop Now</a>
        <div class="to_wishlists hvr-radial-out lite for-circle" :class="{'is-favorite': product.favorite}" @click="toggleFavorite">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5948 3.18661L12 3.74685L12.4051 3.18663C12.8296 2.59975 13.3075 2.10173 13.8304 1.69723C14.8616 0.899833 16.0232 0.5 17.2956 0.5C19.0111 0.5 20.5819 1.18501 21.7285 2.42853C22.8632 3.65939 23.5 5.35416 23.5 7.21252C23.5 9.09882 22.8038 10.8477 21.2348 12.7408L21.2348 12.7408C19.8158 14.4531 17.7661 16.2019 15.3373 18.2717L15.3372 18.2717L15.3165 18.2894C14.4958 18.9889 13.5646 19.7826 12.5983 20.6276L12.598 20.6279C12.433 20.7723 12.2206 20.8523 12 20.8523C11.7794 20.8523 11.5671 20.7724 11.4016 20.6275L11.4013 20.6272C10.4279 19.7762 9.49075 18.9775 8.66603 18.2745L8.66332 18.2722L8.66329 18.2722C6.2341 16.2021 4.18441 14.4532 2.76535 12.741C1.19634 10.8477 0.5 9.09879 0.5 7.21271C0.5 5.35416 1.1368 3.65939 2.27135 2.42853C3.41786 1.18502 4.98889 0.5 6.70441 0.5C7.97679 0.5 9.1384 0.899836 10.1694 1.69721L10.1694 1.69723C10.6925 2.10171 11.1706 2.59991 11.5948 3.18661Z" stroke="#6C3F13"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="payment-methods list-only">
      <div class="payment"><img v-for="method in paymentsMethods" :key="method" :src="require(`@/assets/img/${method}.png`)" :alt="method + ' logo'" :class="method"></div>
      <span v-show="showShippingPrice" class="free-shipping">
        {{shippingPrice.text}}
        <span class="value-shipping">{{shippingPrice.price}}</span> </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    product: {
    },
    handleFavourite: {
      type: Function
    },
    clickLink: {},
    link: {
      type: String
    },
    specification: {
      type: Object
    },
    id: {
      type: Number,
    },
    oldPrice: {
      type: Number,
    },
    price: {
      type: Number,
    }
  },
  computed: {
    isMobileScreen() {
      return this.screenWidth <= 720;
    },
    productsList() {
      return this.$store.getters.productsList;
    },
    specifications() {
      return this.specs;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    showShippingPrice() {
      return Object.keys(this.shippingPrice).length > 0
    },
    shippingPrice() {
      let seller = this.product.seller;
      let shippingInfo = {};
      switch (seller) {
        case "JR Cigar":
          shippingInfo.text = 'Free shipping on all orders for an entire year for only';
          shippingInfo.price = '$39.95';
          break;
        case "Blu":
          shippingInfo.text = 'Shipping fees on orders under';
          shippingInfo.price = '$80';
          break;
      }
      return shippingInfo
    },
    paymentsMethods() {
      let seller = this.seller;
      let methods = ['visa', 'mastercard', 'discover'];
      switch (seller) {
        case "JR Cigar":
          methods.push('AE');
          break;
        case "Cigars Month Club":
          methods.push('AE');
          break;
        case "Kind Juice":
          methods.push('AE', 'bitcoin');
          break;
        case "VaporDNA":
          methods.push('diners', 'AE', 'JCB');
          break;
        case "Avail Vapor":
          methods.push('AE');
          break;
      }
      return methods;
    },
    correctLink() {
      if (this.clickLink) return this.clickLink;
      return this.link;
    },
    priceValue() {
      return  '$' + this.price / 100;
    },
    oldPriceValue() {
      return  '$' + this.oldPrice / 100;
    }
  },
  methods: {
    toggleFavorite(event) {
      event.stopPropagation();
      if (!this.isLoggedIn) {
        this.openRegisterModal();
        return;
      }
      this.handleFavourite()
    },
    openRegisterModal() {
      this.$store.dispatch('registrationModalToggle', true);
    },
    openLoginModal() {
      this.$store.dispatch('loginModalToggle', true);
    },
    closeModal() {
      this.$store.dispatch('registrationModalToggle', false);
      this.$store.dispatch('loginModalToggle', false);
      this.$store.dispatch('toggleForgotPassword', false);
    },
    async addToPurchased(id, event) {
      event.stopPropagation();
      const response = await fetch(
        `https://hiscigar.com/api/v1/products/${id}/buy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Session-Token': this.$store.getters.token
          }
        }
      );
      await response.json();
      if (this.isLoggedIn) this.$store.dispatch('loadOrderHistory')
    },
  },
}
</script>

<style lang="scss" scoped>
.specification-section {
  background: #FCF9F6;
  width: -webkit-fill-available;
  width: -moz-fit-content;
  padding: 30px;
  max-width: 690px;
  white-space: nowrap;

  .specification-title {
    margin-right: 10px;
    padding-top: 5px;
  }

  .specification-block {
    display: flex;
    justify-content: space-between;
    max-width: 425px;
    width: 100%;
    text-transform: capitalize;
  }
  .specification-info {
    background: #FFFFFF;
    border: 1px solid #D2C7BA;
    box-sizing: border-box;
    border-radius: 2px;
    margin-bottom: 28px;
    max-width: 280px;
    height: 30px;
    width: 100%;
    display: flex;
    padding: 3px;
  }
  .product-buy {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .prices {
    display: flex;
    font-weight: 800;
    margin-top: 8px;
  }
  .item_row {
    display: flex;
    max-height: 45px;
  }
  .to_wishlists{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #F2E2D3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.is-favorite svg { fill: #6C3F13; }
  }
  .free-shipping { margin-left: 15px;}
  .value-shipping {
    background: rgba(255, 59, 59, 0.2);
    border-radius: 4px;
    color: #FF3B3B;
    font-weight: bold;
    font-size: 16px;
    padding: 3px 8px;
    margin-left: 7px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6C3F13;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    padding: 12px 30px;
    border-radius: 25px;
    margin-right: 10px;
    text-decoration: none;
  }
  .btn.hvr-radial-out:before { border-radius: 25px; }
  .prices { 
    margin-bottom: 10px;
    margin-right: 20px;
    font-size: 32px;
    color: #393939;
  }
  .old-price {
    margin-bottom: 0;
    text-decoration-line: line-through; 
    color: #D2C7BA;
    margin-right: 20px;
  }
   .payment-methods {
        display: flex;
        justify-content: space-between;
      }
      .payment {
        display: flex;
        align-items: center;
      }

      .payment-methods.list-only {margin-top: 15px}

      .payment-methods.list-only,
      .features {
        opacity: 1; 
        display: flex;
        height: auto;
      }
      .payment-methods.list-only .discover{
        width: 45px;
        height: 22px;
      }
      .payment-methods .visa { height: 10px; }
      .payment-methods .bitcoin { height: 32px; }
      .features {
        flex-wrap: wrap;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 17px;
        color: #352414;

        p { 
          padding: 0 10px 0 0;
          margin-right: 10px;
          border-right: 1px solid #F2E2D3; 
          height: auto;
          opacity: 1;
          text-transform: capitalize;
          text-align: justify;
        }
        p:first-child { padding-left: 0; }
        p:last-child { border: none; }
        span {
          opacity: 1; 
          font-weight: bold;
        }
      }

  @media screen and (max-width: 850px) {
    .payment-methods {
      flex-direction: column;
      align-items: center;
    }

    .free-shipping { margin-top: 15px; }
  }
}
</style>
