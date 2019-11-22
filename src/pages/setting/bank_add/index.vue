<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable">
      <addBankDetail @send="send" />
    </div>
  </div>
</template>

<script>
import { bank_add } from "../../../api/setting_use.js";
import addBankDetail from "../../../components/addBankDetail";
export default {
  props: {},
  components: {
    addBankDetail
  },
  data() {
    return {
      env: null,
      pageName: "" // 当前页面名字
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = this.$route.name;
  },
  methods: {
    //向添加
    send(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("bank_add") > -1) {
        bank_add(data).then(res => {
          if (res && res.success) {
            this.$router.push(`/home/setting/bank/list`);
          }
        });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
</style>
