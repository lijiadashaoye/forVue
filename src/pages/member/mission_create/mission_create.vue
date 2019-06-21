<template>
  <div>
    {{pageName}}
    <button @click="step(1)">step1</button>
    <button @click="mainPage">mainPage</button>
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
 methods: {
    step(num) {
      this.$router.push({ name: `mission_create_step${num}` });
    },
    mainPage() {
      this.$router.push({ name: "mission_create_mainPage" });
    }
  }
};
</script>

<style scoped='true' lang="scss">
@import "./mission_create.scss";
</style>
