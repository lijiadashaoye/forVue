<template>
  <div :class="asideState?'aside1':'aside2'" id="isAside">
    <el-menu
      @select="handleSelect"
      text-color="rgb(109,109,109)"
      :active-text-color="act"
      :collapse="!asideState"
      :collapse-transition="false"
      :unique-opened="true"
      :default-active="defaultAct"
      style="height:100%;overflow-y: scroll;"
    >
      <el-submenu :index="''+item1.path" v-for="(item1,index1) in asideData" :key="index1">
        <template slot="title">
          <i :class="`myIcon22px icon-${item1.icon}`"></i>
          <span style="font-size:18px">{{item1.label}}</span>
        </template>

        <div v-for="(item2,index2) in item1.children" :key="+index2">
          <el-menu-item
            :class="PathLabel===item2.label?envasideColor:''"
            :index="''+item2.path"
            v-if="item2.children&&item2.children.length==0"
          >
            <span style="font-size:16px">{{item2.label}}</span>
          </el-menu-item>

          <el-submenu :index="''+item2.path" v-if="item2.children&&item2.children.length!=0">
            <template slot="title" style="background:red;">
              <i :class="`myIcon18px icon-${item2.icon}`"></i>
              <span style="font-size:16px">{{item2.label}}</span>
            </template>
            <div v-for="(item3,index3) in item2.children" :key="index3">
              <el-menu-item
                :class="PathLabel===item3.label?envasideColor:''"
                :index="''+item3.path"
                v-if="item3.children&&item3.children.length==0"
              >
                <span style="font-size:14px;">{{item3.label}}</span>
              </el-menu-item>

              <el-submenu :index="''+item3.path" v-if="item3.children&&item3.children.length!=0">
                <template slot="title" class>
                  <i :class="`myIcon18px icon-${item3.icon}`"></i>
                  <span style="font-size:14px;">{{item3.label}}</span>
                </template>

                <div v-for="(item4,index4) in item3.children" :key="index4">
                  <el-menu-item
                    :class="PathLabel===item4.label?envasideColor:''"
                    :index="''+item4.path"
                    v-if="item4.children&&item4.children.length==0"
                  >
                    <span style="font-size:12px;">{{item4.label}}</span>
                  </el-menu-item>

                  <el-submenu
                    :index="''+item4.path"
                    v-if="item4.children&&item4.children.length!=0"
                  >
                    <template slot="title">
                      <i :class="`myIcon20px icon-${item4.icon}`"></i>
                      <span style="font-size:12px;">{{item4.label}}</span>
                    </template>

                    <el-menu-item
                      v-for="(item5,index5) in item4.children"
                      :key="index5"
                      :index="''+item5.path"
                    >
                      <span style="font-size:12px;">{{item5.label}}</span>
                    </el-menu-item>
                  </el-submenu>
                </div>
              </el-submenu>
            </div>
          </el-submenu>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      asideData: null, // 导航的数据
      PathLabel: "",
      defaultAct: "",
      envasideColor: "",
      act: ""
    };
  },
  computed: {
    ...mapGetters({
      // 获取导航是否展开true为收缩状态
      asideState: "get_asideState",
      reGetAsideData: "get_reGetAsideData",
      whicePath: "get_whicePath"
    })
  },
  watch: {
    whicePath(data) {
      this.setPath(data);
    },
    // 菜单管理设置导航后触发
    reGetAsideData() {
      // 路由数据
      this.asideData = JSON.parse(sessionStorage.getItem("asideData"));
    }
  },

  created() {
    let env = sessionStorage.getItem("env") === "development";
    if (env) {
      this.envasideColor = "setColors1";
      this.act = "rgb(255, 116, 24)";
    } else {
      this.envasideColor = "setColors";
      this.act = "#6db3f5";
    }
    this.setPath(this.$route.path);
  },
  methods: {
    // 获取组后被选择的项，即 obj
    handleSelect(key, keyPath) {
      let beforePath = "" + this.$store.state.for_layout.whicePath, // 获取上一次的路由路径
        now = sessionStorage.getItem("now");
      if (new RegExp(key).test(beforePath)) {
        // 如果点击同一导航多次，才会执行
        if (beforePath != now) {
          this.toRoute(key, keyPath);
        }
      } else {
        this.toRoute(key, keyPath);
      }
    },
    // 执行跳转
    toRoute(key, keyPath) {
      let arr = [];
      let dataArr = this.asideData,
        obj = null;

      let digui = data_arr => {
        data_arr.forEach(item => {
          if (item.path === key) {
            obj = item;
          } else {
            if (keyPath.includes(item.path)) {
              arr.push(item.label);
            }
            digui(item.children);
          }
        });
      };
      digui(dataArr);
      this.$store.commit("set_title", arr.join(" > ") + " > "); // 变更面包屑导航
      sessionStorage.setItem("page", obj.label);
      this.$router.push({ path: obj.path });
      sessionStorage.setItem("now", this.$route.path);
    },
    // 监听路由变化调整导航背景色
    setPath(paths) {
      this.asideData = JSON.parse(sessionStorage.getItem("asideData"));
      if (this.asideData) {
        let digui = tar => {
          for (let i = tar.length; i--; ) {
            // if (!tar[i].path) continue;
            let path1 = new RegExp(tar[i].path),
              kk = path1.test(paths);
            if (kk) {
              if (tar[i].children.length === 0) {
                this.PathLabel = tar[i].label;
                this.defaultAct = tar[i].path;
              } else {
                digui(tar[i].children);
              }
            } else {
              if (tar[i].children) {
                digui(tar[i].children);
              }
            }
          }
        };
        digui(this.asideData);

        let road = sessionStorage.getItem("road");
        if (road) {
          this.$store.commit("set_title", road); // 变更面包屑导航
        }
      } else {
        setTimeout(() => this.setPath(paths), 300);
      }
    }
  }
};
</script>
