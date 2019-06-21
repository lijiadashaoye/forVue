<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <div class="headerName">
        <h3>{{pageName}}</h3>
        <span
          title="点击查看"
          @click="toSeeRiZhi"
        >修改日志</span>
      </div>
    </div>
    <everyInfo :pageData='pageData' />
  </div>
</template>
<script>
import everyInfo from "../../../../components/everyInfo.vue";

export default {
  components: { everyInfo },
  data() {
    return {
      pageName: "", // 当前页面名字
      pageData: {},
    };
  },
  mounted() {
    this.pageName =
      sessionStorage.getItem("page") +
      ` > ${this.$route.query["institutionName"]}详情`; // 获取页面名称
    this.pageData = {
      page: "manage_money_matters",  // 理财管理
      id:this.$route.query["id"]
    };
  },
  methods: {
    // 点击查看日志
    toSeeRiZhi() {
      console.log(this.pageData);
    }
  },
};
</script>
