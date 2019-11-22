<template>
  <div>
    <router-view></router-view>
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
  beforeDestroy() {
    sessionStorage.removeItem("huiyuan_dengji");
    sessionStorage.removeItem("huiyuan_mark");
  }
};
</script>
