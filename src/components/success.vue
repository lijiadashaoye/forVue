<template>
  <div class="successWaper">
    <div class="isOk">
      <span class="myIcon icon-success setText"></span>
      <p class="okText">完成！</p>
    </div>
    <div class="buttons">
      <el-button
        @click="action('back')"
        type="primary"
      >返回列表</el-button>
      <el-button
        @click="action('another')"
        type="primary"
      >新 建</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    action(type) {
      this.$emit("isOver", type);
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
