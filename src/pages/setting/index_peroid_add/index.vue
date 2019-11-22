<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff">
      <peroid
        :appChannel.sync="this.$store.state.protocol.appChannel"
        style="width:500px;margin:0 auto;padding-top:30px;"
        @send="send"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import peroid from "../../../components/peroid";
import { peroid_add } from "../../../api/setting_use.js";

export default {
  components: {
    peroid
  },
  data() {
    return {
      env: null,
      pageName: ""
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
    //点击保存
    send(data) {
      peroid_add(data)
        .then(res => {
          if (res && res.success) {
            this.$router.push("/home/setting/index-peroid/list");
          }
        })
        .catch(res => {
          this.$message({
            type: "info",
            message: `action: ${res.message}`
          });
        });
    }
  }
};
</script>
