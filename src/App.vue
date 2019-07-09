<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  watch: {
    $route(to) {
      this.$store.commit("set_path", to.path);
    }
  },
  mounted() {
    
  }
};
</script>