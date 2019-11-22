<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      env: null,

      pageName: "素材预览" // 当前页面名字
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
  },
  mounted() {},
  methods: {}
};
</script>
