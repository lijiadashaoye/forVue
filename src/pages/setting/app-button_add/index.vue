<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="addButton">
      <addButtonLeft @send="send" style="padding:30px;"/>
      <addButtonRight />
    </div>
  </div>
</template>
<script>
import addButtonLeft from "../../../components/addButtonLeft";
import addButtonRight from "../../../components/addButtonRight";
import { app_button_add } from "../../../api/setting_use";
export default {
  components: {
    addButtonLeft,
    addButtonRight
  },
  data() {
    return {
      env: null,
      pageName: "" // 当前页面名字
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    //设置页面头部名称
    this.pageName = this.$route.name;
  },
  methods: {
    send(data) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      if (jurisdiction.indexOf("app_button_add") > -1) {
        app_button_add(data)
          .then(res => {
            if (res && res.success) {
              this.$router.push(`/home/setting/app-button/list`);
            }
          })
          .catch(err => {
            this.$alert(`${err.message}`, "保存失败", {
              confirmButtonText: "确定",
              callback: action => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`
                });
              }
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

<style scoped='true' lang="scss">
#addButton {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  background: #fff;
}
</style>
