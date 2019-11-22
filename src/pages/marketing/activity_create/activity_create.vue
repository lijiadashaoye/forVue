<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="padding-bottom:0;">
      <router-view v-if="again"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      env: null,
      pageName: "", // 当前页面名字
      again: true
    };
  },
  beforeDestroy() {
    sessionStorage.removeItem("fromHttp");
    sessionStorage.removeItem("step1Data");
    sessionStorage.removeItem("step2Data");
    sessionStorage.removeItem("step3Data");
    sessionStorage.removeItem("whichAward");
    sessionStorage.removeItem("jiangliKaQuan");
    sessionStorage.removeItem("jiangliHongBao");
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.setPage();
  },
  watch: {
    $route() {
      let kk = sessionStorage.getItem("page");
      // 监听页面step变化
      let pagename = this.$route.name;
      if (pagename === "activity_create") {
        sessionStorage.clear(); // 既然是创建，那之前点击编辑过来的数据就不要了
        sessionStorage.setItem("page", kk);
        this.$nextTick(() => {
          this.$router.push({
            name: "activity_create_step1"
          });
        });
      }
      let str = this.$route.name.substr(-1);
      this.pageName = kk + ` > 第 ${str} 步`;
    }
  },
  methods: {
    setPage() {
      // 第一次进入页面
      new Promise(resolve => {
        let id = this.$route.query["id"];
        if (id) {
          this.$router.push({
            name: "activity_create_step1",
            query: { id: id }
          });
        } else {
          this.$router.push({ name: "activity_create_step1" });
        }
        resolve();
      }).then(() => {
        let str = this.$route.name.substr(-1);
        this.pageName = sessionStorage.getItem("page") + ` > 第 ${str} 步`;
      });
    }
  }
};
</script>
