<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable" style="background:#fff;">
      <yuebaoAddorUpt @reqest="reqest" style="width:400px;margin:0 auto; padding-top:30px;" />
    </div>
  </div>
</template>


<script>
import yuebaoAddorUpt from "../../../components/yuebaoAddorUpt";
import { yuebao_add } from "../../../api/setting_use.js";
export default {
  props: {},
  components: {
    yuebaoAddorUpt
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
  },
  methods: {
    //接受子组件传递的信息
    reqest(obj) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("yuebao_rate_add") > -1) {
        yuebao_add(obj).then(res => {
          if (res.success) {
            //添加成功  跳转到列表页面
            this.$router.push("/home/setting/yuebao-rate/list");
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
