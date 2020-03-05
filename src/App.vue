<template>
  <div id="app">
    <feed></feed>
  </div>
</template>

<script>
import store from './store/index';
import Feed from "./views/Feed";

export default {
  name: "app",
  store,
  components: {
    Feed
  }
};
</script>

<style lang="scss">
@import url("./styles/_layout.scss");
@import url("./styles/_reset.scss");
@import url("./styles/_global.scss");
</style>
