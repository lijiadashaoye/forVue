<template>
  <div>
    <router-view v-if="toShow"></router-view>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      toShow: false
    };
  },
  beforeMount() {
    this.toShow = false;
    let dict = sessionStorage.getItem("dict");

    if (!dict) {
      this.$store.dispatch("get_dict", this).then(res => {
        this.toShow = true;
      });
    } else {
      this.toShow = true;
    }
  }
};
</script>
<style lang='scss'>
@import url("../../components/allCss.scss");
</style>
