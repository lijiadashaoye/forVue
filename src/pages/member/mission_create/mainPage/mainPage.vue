<template>
  <div>
   mainPage
  </div>
</template>
<script>

export default {
  props: {},
  data() {
    return {
      pageName: "" // 当前页面名字
    };
  },
  created() {
    this.pageName = sessionStorage.getItem("page");
  },

  methods: {}
};
</script>

<style scoped='true' lang="scss">
@import "./mainPage.scss";
</style>
