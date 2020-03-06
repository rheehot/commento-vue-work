<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./store/index";

export default {
  name: "app",
  store
};
</script>

<style lang="scss">
@import url("./styles/_layout.scss");
@import url("./styles/_reset.scss");
@import url("./styles/_global.scss");
</style>
