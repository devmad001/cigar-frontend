<template>
  <div v-if="dailyDealsIndex ? dailyDealsIndex < 3 : true" class="item hvr-box-shadow">
    <div class="date" v-if="isOrderHistory">{{formattedDate}}</div>
    <div :class="[itemInfo, productPageClass?.product_page, className]" @click="redirect">
      <div :class="[productPageClass?.img_wraper_page, imgDailyWrapper]" class="img_wrapper">
        <img :class="[productPageClass?.img]" v-lazy="imageUrl" alt="test product 1" v-show="imageUrl">
      </div>
      <div class="item_body">
        <div class="product-header">
          <div class="item_row">
            <div class="star_wrapper">
              <base-rating :rating="rating"></base-rating>
            </div>
            <button class="coronacigarBrn" @click="sellerBtn($event)" v-if="sellerName" aria-label="external link to seller site">
              <a class="coronacigar" :href="correctLink" target="_blank" rel="noopener noreferrer" @click="addToPurchased(id, $event)">{{sellerName}}</a>
            </button>
          </div>
          <div>
            <div class="name-wrap">
              <p class="name">{{ name }}</p>
              <div :class="deleteSvg">
                <svg v-if="isOrderHistory && !isMobileScreen" @click="removeFromPurchased(id, $event)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3.99998H19.9999H16.9999V0.999984C17 0.447984 16.553 0 16 0H7.99998C7.447 0 7 0.447984 7 0.999984V3.99998H4H1.99998C1.447 3.99998 1 4.44797 1 4.99997C1 5.55197 1.44695 6 1.99998 6H2.99997V21C2.99997 22.654 4.34598 24 5.99997 24H18C19.654 24 21 22.654 21 21V6H22C22.5529 6 22.9999 5.55202 22.9999 5.00002C22.9999 4.44802 22.553 3.99998 22 3.99998ZM8.99997 2.00002H15V4.00003H8.99997V2.00002ZM19 21C19 21.551 18.552 22 18 22H5.99997C5.44797 22 4.99998 21.551 4.99998 21V6H7.99998H16H19V21H19Z" fill="#F2E2D3"/>
                  <path d="M8.99998 8C8.447 8 8 8.44798 8 8.99998V18C8 18.552 8.447 19 8.99998 19C9.55297 19 9.99997 18.552 9.99997 18V8.99998C9.99997 8.44798 9.55297 8 8.99998 8Z" fill="#F2E2D3"/>
                  <path d="M15 8C14.447 8 14 8.44798 14 8.99998V18C14 18.552 14.447 19 15 19C15.553 19 16 18.552 16 18V8.99998C16 8.44798 15.553 8 15 8Z" fill="#F2E2D3"/>
                </svg>
                <svg v-if="isOrderHistory && isMobileScreen" @click="removeFromPurchased(id, $event)" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z" fill="black"/>
                  <path d="M35 17H32.9999H29.9999V14C30 13.448 29.553 13 29 13H21C20.447 13 20 13.448 20 14V17H17H15C14.447 17 14 17.448 14 18C14 18.552 14.447 19 15 19H16V34C16 35.654 17.346 37 19 37H31C32.654 37 34 35.654 34 34V19H35C35.5529 19 35.9999 18.552 35.9999 18C35.9999 17.448 35.553 17 35 17ZM22 15H28V17H22V15ZM32 34C32 34.551 31.552 35 31 35H19C18.448 35 18 34.551 18 34V19H21H29H32V34H32Z" fill="#F2E2D3"/>
                  <path d="M22 21C21.447 21 21 21.448 21 22V31C21 31.552 21.447 32 22 32C22.553 32 23 31.552 23 31V22C23 21.448 22.553 21 22 21Z" fill="#F2E2D3"/>
                  <path d="M28 21C27.447 21 27 21.448 27 22V31C27 31.552 27.447 32 28 32C28.553 32 29 31.552 29 31V22C29 21.448 28.553 21 28 21Z" fill="#F2E2D3"/>
                </svg>
              </div>
            </div>
            <div class="features" v-if="specifications">
              <p v-for="feature in Object.keys(specifications)" :key="feature">
                <span>{{feature.replace('_', ' ')}}: </span>
                {{specifications[feature] ? specifications[feature].toString() : specifications[feature]}}
              </p>
            </div>
              </div>
            </div>
            <div class="product-buy">
              <div class="prices">
                <p class="old-price" v-show="oldPrice">{{ oldPriceValue }}</p>
                <p class="price" v-show="price">{{ priceValue }}</p>
              </div>
              <div class="payment-methods grid-only" :class="[paymentsMethods.length > 5 ? 'large-count__js' : '']">
                <img v-for="method in paymentsMethods" :key="method" :src="require(`@/assets/img/${method}.png`)" :alt="method + ' logo'" :class="method">
              </div>
              <div class="item_row">
                <a v-bind:class="[productPageClass?.btn_show]" class="link hvr-radial-out lite" :href="correctLink" target="_blank" rel="noopener noreferrer" @click="addToPurchased(id, $event)">Shop Now</a>
                <button 
                  aria-label="add to wishlist" 
                  :class="['to_wishlists hvr-radial-out lite hvr-radial-out lite for-circle', {'hvr-radial-out lite for-circle': homePageFavorite && !isMobileScreen}, {'is-favorite': isFavorite}, {'home-favorite': homePageFavorite}]" 
                  @click="toggleFavorite($event)"
                >
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5948 3.18661L12 3.74685L12.4051 3.18663C12.8296 2.59975 13.3075 2.10173 13.8304 1.69723C14.8616 0.899833 16.0232 0.5 17.2956 0.5C19.0111 0.5 20.5819 1.18501 21.7285 2.42853C22.8632 3.65939 23.5 5.35416 23.5 7.21252C23.5 9.09882 22.8038 10.8477 21.2348 12.7408L21.2348 12.7408C19.8158 14.4531 17.7661 16.2019 15.3373 18.2717L15.3372 18.2717L15.3165 18.2894C14.4958 18.9889 13.5646 19.7826 12.5983 20.6276L12.598 20.6279C12.433 20.7723 12.2206 20.8523 12 20.8523C11.7794 20.8523 11.5671 20.7724 11.4016 20.6275L11.4013 20.6272C10.4279 19.7762 9.49075 18.9775 8.66603 18.2745L8.66332 18.2722L8.66329 18.2722C6.2341 16.2021 4.18441 14.4532 2.76535 12.741C1.19634 10.8477 0.5 9.09879 0.5 7.21271C0.5 5.35416 1.1368 3.65939 2.27135 2.42853C3.41786 1.18502 4.98889 0.5 6.70441 0.5C7.97679 0.5 9.1384 0.899836 10.1694 1.69721L10.1694 1.69723C10.6925 2.10171 11.1706 2.59991 11.5948 3.18661Z" stroke="#6C3F13"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="payment-methods list-only">
              <img v-for="method in paymentsMethods" :key="method" :src="require(`@/assets/img/${method}.png`)" :alt="method + ' logo'" :class="method">
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import debounce  from "../../../utils/debounce";
import { format } from 'date-fns'

export default {
  props: {
    homePageFavorite: Boolean,
    imgDailyWrapper: String,
    dailyDealsIndex: Number,
    className: String,
    productPageClass: Object,
    defaultProduct: Object,
    isOrderHistory: Boolean,
    date: String,
    id: Number,
    imageUrl: String,
    name: String,
    price: Number,
    oldPrice: Number,
    isFavorite: {
      type: Boolean,
      default: false
    },
    specs: Object,
    seller: String,
    link: String,
    clickLink: String, 
    rating: {
      type: String,
      default: '0'
    },
    reload: {
      type: Boolean,
      default: false
    },
    category: {},
    idHotSale: Number,
    handleFavorite: Function,
    deleteSvg: String,
    slug: String
  },
  data() {
    return {
      screenWidth: 0,
      itemInfo: 'item-info',
      selectedCategory: null,
      defaultCategory: {
        id: 0,
        title: 'All Categories'
      }
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
  },
  computed: {
    isMobileScreen() {
      return this.screenWidth <= 720;
    },
    formattedDate() {
      return format(new Date(this.date), 'do MMM yyyy');
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    token() {
      return this.$store.getters.token;
    },
    specifications() {
      return this.specs;
    },
    sellerName() {
      return this.seller;
    },
    sellerUrl() {
      let seller = this.seller;
      let url = "";
      
      switch (seller) {
        //case "JR Cigar":
          //url = "https://www.jrcigars.com/";
          //break;
        case "Cigars Month Club":
          url = "https://www.cigarmonthclub.com/";
          break;
        case "Kind Juice":
          url = "https://www.kindjuice.com/";
          break;
        case "VaporDNA":
          url = "https://vapordna.com/";
          break;
        case "Avail Vapor":
          url = "https://availvapor.com/";
          break;
        case "Blu":
          url = "https://www.blu.com";
          break;
        case "DirectDelta8":
          url = "https://www.dd8shop.com/";
          break;
        case "AirVape":
          url = "https://airvapeusa.com/";
          break;
        case "Famous Smoke":
          url = "https://www.famous-smoke.com/";
          break;
        case "Thompson Cigar":
          url = "https://www.thompsoncigar.com";
          break;
        case "Gotham Cigars":
          url = "https://www.gothamcigars.com";
          break;
        case "Cigars International":
          url = "https://www.cigarsinternational.com";
          break;
        case "BnB Tobacco":
          url = "https://www.bnbtobacco.com";
          break;
        case "Mike's Cigars":
          url = "https://mikescigars.com";
          break;
      }
      return url;
    },
    paymentsMethods() {
      let seller = this.seller;
      let methods = ['visa', 'mastercard', 'discover'];
      switch (seller) {
        //case "JR Cigar":
          //methods.push('AE');
          //break;
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
    sellerBtn(event) {
      event.stopPropagation();
    },
    redirect() {
      const params = this.slug ? this.slug : this.id;
      this.$router.push({ path: `/product/${params}` });
    },
    toggleFavorite(event) {
      event.stopPropagation();

      if (!this.isLoggedIn) {
        return this.openRegisterModal();
      }

      if(this.handleFavorite) {
        return this.handleFavorite({
          isLoggedIn: this.isLoggedIn,
          isFavorite: this.isFavorite,
          id: this.id
        })
      }

     if (!this.isFavorite) {
        this.addToWishlistDebounce();
        return;
      }
      this.removeFromWishlist();
    },
    async addToWishlist() {
      await this.$store.dispatch('addToWishlist', { id: this.id })
      this.$store.dispatch('setRequest', { request: this.request, category: { id: this.defaultCategory.id, title: this.defaultCategory.title } });
      this.$store.dispatch('loadOrderHistory')
    },
    addToWishlistDebounce: debounce(function() {
      this.addToWishlist()
    }, 500),
    async removeFromWishlist() {
      await this.$store.dispatch('removeFromWishlist', { id: this.id, hardReload: this.reload })
      this.$store.dispatch('setRequest', { request: this.request, category: { id: this.defaultCategory.id, title: this.defaultCategory.title } });
      this.$store.dispatch('loadOrderHistory')
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
            'Session-Token': this.token
          }
        }
      );
      await response.json();
      if (this.isLoggedIn) this.$store.dispatch('loadOrderHistory')
    },
    async removeFromPurchased(id, event) {
      event.stopPropagation();
      if (this.isLoggedIn) {
        const response = await fetch(
            `https://hiscigar.com/api/v1/products/${id}/remove_purchase`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Session-Token': this.token
              }
            }
        );
        this.$store.dispatch('loadOrderHistory')
        await response.json();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .img-daily-wrapper {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    img {
      width: 100%;
      height:100%;
    }
  }
  .delete-svg {
    padding: 9px;
    border-radius: 50%;
  }

  .delete-svg:hover {
    padding: 9px;
    border-radius: 50%;
    height: 25px;
    background: #6C3F13;
    svg circle {
      fill: #6C3F13;
    }
  }
.product-page { flex-direction: column; }

.name-wrap {
  min-height: 54px;
  display: flex;
  justify-content: space-between;
}

.date {
  text-align: start;
  margin-bottom: 30px;
}

.item-info { display: flex; }
.no-flex { display: block; }

.img-wraper-page {
  .img {
    max-width: 52%!important;
    height: 250px;
    object-fit: cover;
  }
}

@media screen and (max-width: 720px) {
  .delete-svg:hover { background: transparent; }

  .img-daily-wrapper {
    width: 120px;
    height: 120px;
    img {
      object-fit: cover;
    }
  }

   .item .item-info .item_body {
    padding-left: 0;
    padding-right: 0;
     .home-favorite {
       width: 75px;
       height: 35px;
       background: none;
       margin-left: 5px;
     }
  }

  .product-header {
    .item_row{
      flex-direction: column;
      align-items: start !important;
      .star_wrapper {
        margin-top: 10px;
      }
    }
  }

  .item { box-shadow: none !important; }

  .item .product-buy .item_row a.link {
    padding: 13px 30px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }

  div.hvr-box-shadow:hover { box-shadow: 0px 4px 15px rgb(108 63 19 / 10%); }

  .product-page .img-wraper-page {
    img {
      height: 120px;
      width: 120px;
    }
  }
}

.item{
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(108, 63, 19, 0.1);
  border-radius: 2px;
  margin: 20px 0 20px 0px;
  max-width: 378px;
  cursor: pointer;

  &.list {
    width: 100%;
    max-width: 100%;
    min-width: 620px;
    margin: 0px;
    margin-bottom: 5px;
    box-shadow: none;
    transition: box-shadow 0.3s ease-out;
    position: relative;
    padding: 20px;
    border-width: 1px 0px 0px 0px;
    border-style: solid;
    border-color: #f2e2d3;

    &:first-child{
      margin-top: 0;
    }

    .img_wrapper {
      margin-top: auto;
      margin-bottom: auto;
      min-width: 180px;
      width: 180px;
      height: 180px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item_body {
      padding-bottom: 0;
      width: 90%;

      .to_wishlists { margin-top: -15px; }

      .product-header {
        flex-direction: column-reverse;

        .item_row { margin-top: 11px; }
      }
      
      .item_row { justify-content: left; }
      .coronacigar { margin-left: 11px; }
      .name-wrap { min-height: 0px; }
      
      p.name {
        font-size: 24px;
        line-height: 29px;
        margin: 0px;
        max-width: 560px;
      }
      .product-buy {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        margin-top: 31px;
      }
      .prices {
        margin-bottom: 10px;
        min-width: 200px;
      }
      .price,
      .old-price {
        font-size: 28px;
        font-weight: 800;
        line-height: 34px;
        margin-bottom: 0;
      }
      .old-price { margin-right: 20px; }
      a.link {
        margin-right: 10px;
        margin-top: -15px;
        width: 150px;
      }
      .payment-methods {
        display: flex;
        align-items: center;
      }

      .payment-methods.grid-only { display: none; }
      .payment-methods.list-only { margin-top: 5px;}

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
        color: #352414;

        white-space: nowrap !important;
        overflow: hidden;
        height: 14px;
        display: flex;
        margin: 0px;
        margin-top: 18px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        width: 100%;
        max-width: 100%;

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
    }

    &:hover {
      box-shadow: 0px 0px 15px #B26D28;
      border-radius: 2px;

      @media screen and (max-width: 720px){
        box-shadow: none ;
      }
    }
  }

  &.grid {
    max-width: 280px;
    width: 280px;
    max-height: 415px;
    height: 415px;

    .item-info { display: block; }
    .img_wrapper { height: 185px; }

    .img_wrapper img {
      max-width: 200px;
      max-height: 197px;
    }

    .item_body {
      padding-bottom: 30px;

      .payment-methods.list-only { display: none; }

      p.name {
        height: 50px;
        margin-bottom: 0;
      }
      .payment-methods.grid-only,
      .features,
      .features p,
      .features p span {
        transition: height 0.7s linear;
      }
      a.link { width: 170px; }
    }

    &:not(.no-hover):hover {
      z-index: 6;
      box-shadow: 0 -2px 8px -3px #B26D28;

      .item_body {
        background: #FFFFFF;
        box-shadow: 0 7px 11px -3px #B26D28;
        border-radius: 2px;

        p.name { margin-bottom: 0; }
        .payment-methods.grid-only,
        .features,
        .features p,
        .features p span {
          display: flex;
          opacity: 1;
          height: auto;
          transition:
            opacity 0.3s linear,
            height 0.3s linear;
        }
        .payment-methods.grid-only {
          padding-bottom: 20px;
          height: 20px;
          justify-content: space-between;
          align-items: center;

          .visa { height: 10px; }
          .discover { height: 22px; }
        }
        .features {
          flex-wrap: wrap;
          justify-content: left;
          margin-bottom: 5px;
          font-size: 13px;
          line-height: 16px;
          color: #352414;

          p {
            padding: 0 10px 0 0;
            margin-right: 10px;
            margin-bottom: 5px;
            border-right: 1px solid #F2E2D3;
            text-transform: capitalize;
            text-align: justify;
          }
          p:first-child { padding-left: 0; }
          p:last-child { border: none; }
          span { font-weight: bold; }
        }
      }
    }
  }

  .img_wrapper img { max-width: 100%; }

  .item_body{
    padding: 12px 20px 49px 20px;

    .product-header {
      display: flex;
      flex-direction: column;
      min-height: 75px;
    }
    .payment-methods,
    .features,
    .features p,
    .features p span {
      height: 0;
      opacity: 0;
    }
    .item_row{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .coronacigar{
      font-size: 14px;
      line-height: 17px;
      border-bottom: 1px solid;
      color: #393939;
      text-decoration: none;
    }
    .coronacigarBrn {
      background: transparent;
    }
    svg.silver_fill{
      path{
        fill: #E5E5E5;
      }
    }
    .prices {
      display: flex;
      justify-content: left;
    }

    p.name{
      white-space: nowrap;
      overflow: hidden;
      max-width: 340px;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #6C3F13;
      margin-top: 15px;
      margin-bottom: 20px;
      text-align: left;
    }

    p.price,
    p.old-price {
      font-size: 16px;
      line-height: 19px;
    }
    p.price{
      font-weight: 800;
      color: #393939;
      margin-bottom: 20px;
      text-align: left;
    }
    p.old-price {
      text-decoration-line: line-through;
      color: #b8b8b8;
      margin-right: 15px;
    }
    a.link{
      width: 280px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #6C3F13;
      border-radius: 25px;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      text-decoration: none;
      color: #fff;
    }
    a.link.hvr-radial-out:before { border-radius: 25px; }
    .to_wishlists{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #f2e2d3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      cursor: pointer;

      &.is-favorite svg { fill: #6C3F13; }
    }

    .hvr-radial-out.for-circle:before { border-radius: 50%; }
    .hvr-radial-out.for-circle:hover svg path { stroke: #fff; } 
  }
}

@media screen and (max-width: 960px) {
  .item.list .item_body p.name { max-width: 460px; }
}

@media screen and (max-width: 860px) {
  .item.list .item_body p.name { max-width: 340px; }
}

@media screen and (max-width: 720px) {
  .date { margin: 0; }

  .item-info {
    position: relative;
    .delete-svg {
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }
}

@media screen and (min-width: 1300px) {
  .item.grid:not(.no-hover):hover .item_body .payment-methods.grid-only.large-count__js {
    height: 50px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

@media screen  and (max-width: 1300px){
  .item.grid {
    width: 380px;
    max-width: 380px;
    max-height: 460px;

    .item_body {
      a.link{ width: 260px; }
    }
  }
}

@media screen  and (max-width: 1100px){
  .item.grid {
    width: 330px;
    max-height: 423px;

    .item_body {
      a.link{ width: 70%; }
    }
  }
}

@media screen  and (max-width: 960px){
  .item.grid { max-width: 49%; }
}

@media screen and (max-width: 940px) {
  .item.grid:not(.no-hover):hover .item_body .payment-methods.grid-only.large-count__js {
    height: 50px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

@media screen  and (max-width: 720px) {
  .item.grid {
    width: 49%;

    .item_body {
      .coronacigar { display: none; }
      .prices { margin-top: 10px; }

      .old-price, .price {
        font-size: 14px;
        font-style: normal;
        font-weight: 800;
        line-height: 17px;
        margin-bottom: 0px !important;
      }

      .price { color: #393939; }

      .name-wrap, .product-header {
        min-height: 28px;
        max-height: 28px;
      }

      p.name {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px;
        color: #6c3f13;
        margin: 0px;
        text-overflow: ellipsis;
      }

      .item_row { display: none; }
      .product-header { padding-bottom: 0px; }
    }
  }
}

@media screen  and (max-width: 767px) {
  .item.list {
    margin: 0px;
    padding: 11px;
    position: relative;
    min-width: auto;

    .item-info {
      .item_row {
        position: relative;

        a.link, button.to_wishlists { display: none; }

        .star_wrapper {
          position: absolute;
          top: -20px;
          right: 10px;
        }

        .coronacigar{
          display: block;
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
        }
      }

      .img_wrapper, .img_wrapper img {
        width: 100px;
        height: 100px;
        min-width: auto;
        vertical-align: top;
      }

      .payment-methods, .list-only { display: none !important; }

      .item_body {
        margin-left: 11px;

        .product-header {
          .features {
            height: 12px;
            font-size: 10px;
            font-style: normal;
            font-weight: 700;
            line-height: 12px;
          }
        }

        .name-wrap, .product-header {
          min-height: 28px;
          max-height: 28px;
          display: block;
        }

        p.name {
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
          color: #6c3f13;
          margin: 0px;
          margin-top: 10px;
          text-overflow: ellipsis;
          display: block;
        }

        .old-price, .price {
          font-size: 12px;
          font-style: normal;
          font-weight: 800;
          line-height: 14px;
        }

        .price {
          color: #393939;
        }

        .prices {
          margin-top: 64px;
          margin-bottom: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .item.grid {
    display: block;
    max-width: 90%;
    max-height: 423px;
    width: 330px;
    margin-top: 0;
    border-bottom: none;
    box-shadow: 0px 4px 15px rgb(108 63 19 / 10%);
    border-radius: 2px;

    .item_body {
      padding-bottom: 30px;

      .product-header { flex-direction: column; }
      .item_row { justify-content: space-between; }
      .features,
      .payment-methods,
      .payment-methods.list-only { display: none; }
      .product-buy {
        margin-top: 0;
        display: block;
      }
      .old-price { margin-right: 15px; }
    }
  }

  .item_order_history { box-shadow: none; }

  .item.list {
    .item-info {
      .item_body {
        width: 70%;
        padding-top: 0;

        .name-wrap { max-height: 35px; }

        p.name {
          font-size: 16px;
          line-height: 18px;
          overflow: hidden;
          white-space: break-spaces;
          margin-top: 5px;
          max-height: 36px;
        }

        .price,
        .old-price {
          font-size: 15px;
          line-height: 15px;
        }

        .product-header .item_row {
          margin-top: 0;
        }

        .product-header .features {
          font-size: 13px;
          line-height: 15px;
          height: 15px;

          p { padding: 0 3px 0 0; }
        }
      }

      .img_wrapper{
        width: 170px;
        height: 150px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .item_row {
        .coronacigar {
          margin-left: 0;
          font-size: 12px;
          line-height: 14px;
        }

        .star_wrapper { top: -12px }
      }
    }
  }
}

@media screen and (max-width: 490px) {
  .item,
  .item.grid {
    max-width: 100%;
    width: 100%;

    .img_wrapper img {
      width: 100%; 
      height: 100%;
    } 
  }
}
</style>
