<template>
  <div class='VuePagination' :class='`${props.theme.wrapper} ${props.texts.variant}`'>
    <nav :class='props.theme.nav'>
      <ul v-show="props.showPagination" :class="props.theme.list">
        <li v-if="props.hasEdgeNav" :class='props.theme.firstPage' @click="props.setFirstPage">
          <button aria-label="first page" type="button" v-bind="props.firstPageProps">{{props.texts.first}}</button>
        </li>
        <li :class="props.theme.prev" @click="props.setPrevPage">
          <button aria-label="prev page" type="button" v-bind="props.prevProps">{{props.texts.prevPage}}</button>
        </li>
        <li v-for="page in props.pages" :key="page" :class="props.pageClasses(page)"
            v-on="props.pageEvents(page)">
          <button aria-label="page" type="button" v-bind="props.aProps" :class="props.theme.link">{{page}}</button>
        </li>
        <li :class="props.theme.next" @click="props.setNextPage">
          <button aria-label="next page" type="button" v-bind="props.nextProps">{{props.texts.nextPage}}</button>
        </li>
        <li v-if="props.hasEdgeNav" :class="props.theme.lastPage" @click="props.setLastPage">
          <button aria-label="last page" type="button" v-bind="props.lastPageProps">{{props.texts.last}}</button>
        </li>
        {{props.variant}}
      </ul>
    </nav>
  </div>

</template>

<script>
  export default {
    name: 'MyPagination',
    props: ['props'],
  }
</script>

<style lang="scss" scoped>
  .VuePagination nav{
    margin-top: 30px;
    ul {
      list-style: none;
      display: flex;
      justify-content: left;
      border: 1px solid #6C3F13;
      border-radius: 2px;
      height: 50px;
      max-width: 700px;

      li {
        height: 100%;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          width: 100%;
          height: 100%;
          color: #6C3F13;
          background: #fff;
          font-family: 'Lato', sans-serif;
          font-size: 20px;
          line-height: 24px;
        }
        &.active,
        &.active button {
          color: #fff;
          background: #6C3F13;
          font-weight: bold;
        }
        &.disabled,
        &.disabled button {
          color: #F2E2D3;
        }
      }
    }
  }
  .VuePagination.secondary nav{
    margin: 20px 0 50px;
    font-family: Lato;
    ul {
      border: none;
       li {
        button {
          color:#B26D28;
          font-size: 16px;
        }
        &.active,
        &.active button {
          color: #fff;
          background:#B26D28;
        }
        &.disabled,
        &.disabled button {
          color: #F2E2D3;
        }
      }
    }
  }
</style>
