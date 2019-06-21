<template>
  <div class="header">
    <div class="front">
      <img v-if="!asideState" src="../../assets/logo.png">
      <span v-if="asideState">比财数据科技</span>
      <button
        :title="buttonText"
        @click="toHidden"
      >
        <span
          class="myIcon12px icon-allLeft"
          v-if="asideState"
        ></span>
        <span
          class="myIcon12px icon-shuangyou"
          v-if="!asideState"
        ></span>
      </button>

    </div>
    <div class="back">
      <span
        @click="routeHome"
        class="toHome"
        title="返回到最初"
      >返回主页</span>

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userName}}&nbsp;
          <span class="myIcon12px icon-down-trangle"></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">
            <span class="myIcon12px icon-yonghu"></span>
            修改信息
          </el-dropdown-item>
          <el-dropdown-item command="2">
            <span class="myIcon12px icon-tuichu"></span>
            退出
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      userName: "",
      buttonText: "点击缩小导航栏！"
    };
  },
  computed: {
    ...mapGetters({
      // 获取导航是否展开true为收缩状态
      asideState: "get_asideState"
    })
  },
  created() {
    let kk = JSON.parse(localStorage.getItem("userData"));
    this.userName = kk ? kk.username : "";
  },
  methods: {
    ...mapMutations(["set_asideState"]),
    // 导航栏的展开收缩
    toHidden() {
      let kk = this.asideState;
      this.$store.commit("set_asideState", { data: !kk });

      if (this.asideState) {
        this.buttonText = "点击收缩导航栏！";
      } else {
        this.buttonText = "点击展开导航栏！";
      }
    },
    // 头部右侧下拉
    handleCommand(command) {
      if (command == 1) {
        sessionStorage.setItem("page", "修改信息");
        this.$router.push({ name: "info" });
      }
      if (command == 2) {
        this.$confirm("确定退出吗？", "确认操作", {
          confirmButtonText: "确定",
          cancelButtonText: "放弃",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch("logout", this);
          })
          .catch(() => {});
      }
    },
    routeHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
