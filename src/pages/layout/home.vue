<template>
  <div class="home">
    <Header class="isHeader" />
    <Slider />
    <div :class="asideState?'isContent1':'isContent2'">
      <section class="logoWaper" v-if="routerName==='home'">
        <section class="logo">
          <img src="../../assets/logo.jpg" style="width:100%; height:100;" />
        </section>
        <p>比财数据科技</p>
      </section>
      <router-view v-else style="height:100%;"></router-view>
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
  mounted() {
    this.routerName = this.$route.name;
    let styleId = document.querySelector("#ll");
    if (!styleId) {
      let env = sessionStorage.getItem("env") === "development",
        head = document.querySelector("head"),
        style = document.createElement("style");
      style.id = "ll";
      if (env) {
        // 修改滚动条颜色
        style.innerHTML = `.is-opened i {color: rgb(151, 24, 255); !important}
            #app ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: rgb(151, 24, 255);
            }.el-table ::-webkit-scrollbar-thumb {
            border-radius: 5px !important;
            background: rgb(151, 24, 255) !important;}`;
      } else {
        style.innerHTML = `.is-opened i {color:  #188FFF !important;}
             #app ::-webkit-scrollbar-thumb {
             border-radius: 4px;background: rgb(112, 179, 243)}
             .el-table ::-webkit-scrollbar-thumb {
             border-radius: 5px !important;
             background: rgb(112, 179, 243) !important;}`;
      }
      head.appendChild(style);
    }
  },
  created() {
    let dict = sessionStorage.getItem("get_dict"),
      xilie_cunkuan = sessionStorage.getItem("xilie_cunkuan"),
      xilie_licai = sessionStorage.getItem("xilie_licai"),
      xilie_touzi = sessionStorage.getItem("xilie_touzi");
    if (!dict) {
      this.$store.dispatch("get_dict", this).then(res => {
        sessionStorage.setItem("dict", JSON.stringify(res));
      });
    }

    if (!xilie_cunkuan) {
      this.$api.get_licaiTree({ vm: this, type: "deposit" }).then(res => {
        if (res) {
          sessionStorage.setItem("xilie_cunkuan", JSON.stringify(res.data));
        }
      });
    }
    if (!xilie_licai) {
      this.$api.get_licaiTree({ vm: this, type: "wmp" }).then(res => {
        if (res) {
          sessionStorage.setItem("xilie_licai", JSON.stringify(res.data));
        }
      });
    }

    if (!xilie_touzi) {
      this.$api.get_licaiTree({ vm: this, type: "investment" }).then(res => {
        if (res) {
          sessionStorage.setItem("xilie_touzi", JSON.stringify(res.data));
        }
      });
    }
  }
};
</script>

