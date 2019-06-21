<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <everyInfo :forJiGouInfo='pageData' />
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
      page: "fund_company",   // 基金公司管理
      id:this.$route.query["id"]
    };
  },

  methods: {}
};
</script>
