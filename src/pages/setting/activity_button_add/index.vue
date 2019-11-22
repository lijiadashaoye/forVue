<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff;">
      <activityButton @send="send" style="width:600px;margin:30px auto;" />
    </div>
  </div>
</template>

<script>
import activityButton from "../../../components/activityButton";
import { activity_button_add } from "../../../api/setting_use.js";
export default {
  components: {
    activityButton
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
  },
  methods: {
    send(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("activity_button_add") > -1) {
        activity_button_add(data).then(res => {
          if (res && res.success) {
            this.$router.push("/home/setting/activity-button/list");
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

<style>
</style>
