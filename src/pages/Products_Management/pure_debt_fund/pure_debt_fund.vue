<template>
  <div style="height:100%;">
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
};
</script>
