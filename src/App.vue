<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      this.$store.commit("set_path", to.path);
    }
  }
};
</script>