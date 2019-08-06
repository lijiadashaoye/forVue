<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      //动态刷新页面
      isRouterAlive: true
    };
  },
  beforeDestroy() {},
  mounted() {},
  watch: {},
  methods: {
    reload() {
      //动态刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
