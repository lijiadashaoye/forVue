<template>
  <div class="componentWaper">
    <div id="forHeader">
      <div class="headerName">
        <p class="isPageName">
          <span :class="env?'lineSpan1':'lineSpan'">|</span>
          位置：{{$store.state.for_layout.titles}}{{pageName}}
        </p>
        <span title="点击查看" @click="toSeeRiZhi">修改日志</span>
      </div>
    </div>
    <everyInfo :pageData="forEveryInfo" />
  </div>
</template>
<script>
import everyInfo from "@/components/everyInfo.vue";

export default {
  components: { everyInfo },
  data() {
    return {
      env: null,
      pageName: "", // 当前页面名字
      forEveryInfo: {}
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName =
      sessionStorage.getItem("page") + ` > ${this.$route.query["name"]}详情`; // 获取页面名称
    this.forEveryInfo = {
      page: "pure_debt_fund", // 纯债基金管理
      id: this.$route.query["id"]
    };
  },
  methods: {
    // 点击查看日志
    toSeeRiZhi() {
      console.log(this.forEveryInfo);
    }
  }
};
</script>