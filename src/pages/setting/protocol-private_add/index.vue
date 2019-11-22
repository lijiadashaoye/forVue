<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable"  style="background:#fff;">
      <protocolAddUpt style="width:800px;margin:30px auto;" :appChannel.sync="this.$store.state.protocol.appChannel" @req="req" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import protocolAddUpt from "../../../components/protocolAddUpt";
import { protocol_add } from "../../../api/setting_use.js";
export default {
  props: {},
  components: {
    protocolAddUpt
  },
  data() {
    return {
      env: null,
      pageName: "" // 当前页面名字
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
      if (jurisdiction.indexOf("protocol_private_add") > -1) {
        protocol_add(data).then(res => {
          if (res && res.success) {
            this.$router.push("/home/setting/protocol-private/list");
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
