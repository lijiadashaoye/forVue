<template>
  <div class="componentWaper">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  props: {},
  // provide() {
  //   return {
  //     //动态刷新页面
  //     reload: this.reload
  //   };
  // },
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
