<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff;">
      <loginSpread
        style="padding-top:30px;width:500px;margin:0 auto;"
        :appChannel.sync="this.$store.state.protocol.appChannel"
        :addFlag="addFlag"
        :updataFlag="updataFlag"
        @req="req"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { loginSpread_add } from "../../../api/setting_use.js";
import loginSpread from "../../../components/loginSpread";
export default {
  props: {},
  components: {
    loginSpread
  },
  data() {
    return {
      env: null,

      pageName: "", // 当前页面名字
      addFlag: true,
      updataFlag: true
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
    this.getAppChannel();
  },
  methods: {
    ...mapMutations({
      getAppChannel: "protocol/getAppChannel"
    }),

    req(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("login_page_spread_add") > -1) {
        loginSpread_add(data)
          .then(res => {
            if (res && res.success) {
              this.$router.push("/home/setting/login-page-spread/list");
            }
          })
          .catch(err => {
            this.$alert(`${err.message}`, "保存失败", {
              confirmButtonText: "确定"
            });
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
