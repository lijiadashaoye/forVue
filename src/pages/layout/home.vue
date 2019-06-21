<template>
  <div class="home">
    <Header class="isHeader" />
    <Slider />
    <div :class="asideState?'isContent1':'isContent2'">
      <section
        class="logoWaper"
        v-if="routerName==='home'"
      >
        <section class="logo">
          <img
            src="../../assets/logo.jpg"
            style="width:100%; height:100;"
          ></section>
        <p>比财数据科技</p>
      </section>
      <router-view
        v-if="routerName!=='home'"
        style="height:100%;"
      ></router-view>
    </div>
  </div>
</template>


<script>
import Header from "./header";
import Slider from "./aside";
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      routerName: ""
    };
  },
  computed: {
    ...mapGetters({
      // 获取导航是否展开
      asideState: "get_asideState"
    })
  },
  components: {
    Header,
    Slider
  },
  watch: {
    $route(e) {
      this.routerName = e.name;
    }
  },
  created() {
    this.routerName = this.$route.name;
  },
  methods: {}
};
</script>


<style lang='scss'>
@import "./layout.scss";
.logo {
  width: 140px;
  height: 160px;
  margin: 0 auto;
}
.logoWaper {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.logoWaper > p {
  text-indent: 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #1a80df;
  letter-spacing: 10px;
}
</style>
