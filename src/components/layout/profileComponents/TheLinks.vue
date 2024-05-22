<template>
  <div class="links">
    <div class="item">
      <router-link to="/profile">My profile</router-link>
    </div>
    <div class="item">
      <router-link to="/orderhistory">Order History</router-link>
    </div>
    <div class="item last">
      <router-link to="/wishlist">Wishlist</router-link>
    </div>
    <test-ads-banner type="small"></test-ads-banner>
    <test-ads-banner type="small"></test-ads-banner>
  </div>
</template>

<style lang="scss" scoped>
.links {
  width: 25%;
  margin-right: 20px;
  padding-top: 4px;

  .item {
    text-align: left;
    border-bottom: 2px solid #B26D28;
    padding-bottom: 15px;
    color: #6C3F13;
    width: 100%;
    margin-bottom: 15px;

    &.last { margin-bottom: 60px; }

    a {
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      font-size: 22px;
      line-height: 26px;
      color: #6C3F13;
      text-transform: uppercase;
      text-decoration: none;
      &:hover { color: #393939; }
      &.router-link-active { color: #393939; }
    }
  }
  .ad-banner { margin: 20px 0; }
}

@media screen and (max-width: 720px) {
  .links { display: none; }
}
</style>