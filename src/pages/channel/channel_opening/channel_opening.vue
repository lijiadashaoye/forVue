<template>
  <div>
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable">asdfdf</div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      env: null,
      pageName: "" // 当前页面名字
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page");
  },

  methods: {}
};
</script>

<style scoped='true' lang="scss">
</style>
