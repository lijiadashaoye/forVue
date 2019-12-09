<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import cashOut from '../../stores/member/cashOut';//提现管理
export default {
  props: {},
  data() {
    return {
      pageName: "" // 当前页面名字
    };
  },
    created() {
        this.$store.registerModule('cashOut', cashOut);
        this.pageName = sessionStorage.getItem("page");
    },
    beforeDestroy() {
        sessionStorage.removeItem("huiyuan_dengji");
        sessionStorage.removeItem("huiyuan_mark");
        this.$store.unregisterModule('cashOut');
    }
};
</script>
