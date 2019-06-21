<template>
  <div>
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div id='forTable'>
      asdfdf
    </div>
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
</style>
