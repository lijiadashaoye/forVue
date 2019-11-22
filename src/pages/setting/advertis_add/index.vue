<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff;">
      <advertis
        style="width:500px;margin:30px auto;"
        :appChannel.sync="this.$store.state.protocol.appChannel"
        @send="send"
      />
    </div>
  </div>
</template>

<script>
import advertis from "../../../components/advertis";
import { adverdis_Page_add } from "../../../api/setting_use";
import { mapMutations } from "vuex";
export default {
  components: {
    advertis
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
      adverdis_Page_add(data)
        .then(res => {
          if (res && res.success) {
            this.$router.push("/home/setting/advertis/list");
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

<style>
</style>
