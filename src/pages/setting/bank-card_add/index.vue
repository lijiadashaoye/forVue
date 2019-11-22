<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="background:#fff;">
      <bankCardAddUpd
        :list="list"
        @send="send"
        style="width:500px;margin:0 auto;padding-top:30px;"
      />
    </div>
  </div>
</template>

<script>
import bankCardAddUpd from "../../../components/bankCardAddUpd/index";
import { bank_card_add } from "../../../api/setting_use.js";
import { mapActions } from "vuex";
export default {
  props: {},
  components: {
    bankCardAddUpd
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
    this.getList();
    this.list =
      this.$store.state.bank.bankList.data.list.length > 0
        ? this.$store.state.bank.bankList.data.list
        : JSON.parse(window.sessionStorage.getItem("bankList"));
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  methods: {
    ...mapActions({
      getList: "bank/getList"
    }),

    //点击保存
    send(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("bank_card_add") > -1) {
        bank_card_add(data).then(res => {
          if (res && res.success) {
            this.$router.push(`/home/setting/bank-card/list`);
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
