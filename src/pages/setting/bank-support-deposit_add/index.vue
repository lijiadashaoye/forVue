<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="background:#fff;">
      <addBankSupport style="width:500px;margin:30px auto;" :list.sync="list" @send="send" />
    </div>
  </div>
</template>


<script>
import { bank_support_add } from "../../../api/setting_use.js";
import { mapActions } from "vuex";
import addBankSupport from "../../../components/addBankSupport";
export default {
  props: {},
  components: {
    addBankSupport
  },
  data() {
    return {
      env: null,

      pageName: "", // 当前页面名字
      list: []
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";

    this.getBankCardList();
    this.list =
      this.$store.state.bankCard.bankCardList.data.list.length > 0
        ? this.$store.state.bankCard.bankCardList.data.list
        : JSON.parse(window.sessionStorage.getItem("bankCardList"));
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  methods: {
    ...mapActions({
      getBankCardList: "bankCard/getBankCardList"
    }),
    //发送请求
    send(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限
      if (jurisdiction.indexOf("support_deposit_add") > -1) {
        bank_support_add(data).then(res => {
          if (res && res.success) {
            this.$router.push(`/home/setting/bank-support-deposit/list`);
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
