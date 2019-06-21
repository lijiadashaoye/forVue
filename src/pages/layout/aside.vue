<template>
  <div
    :class="asideState?'aside1':'aside2'"
    id="isAside"
  >
    <el-menu
      @select="handleSelect"
      background-color=" rgb(250, 250, 248)"
      text-color="rgb(109,109,109)"
      active-text-color="#fff"
      :collapse="!asideState"
      :collapse-transition='false'
      :unique-opened='true'
      :default-active="defaultAct"
      style="height:100%;overflow-y: scroll;"
    >
      <el-submenu
        :index="''+item1.path"
        v-for="(item1,index1) in asideData"
        :key='index1'
      >
        <template slot="title">
          <i :class="`myIcon22px icon-${item1.icon}`"></i>
          <span>{{item1.label}}</span>
        </template>

        <div
          v-for="(item2,index2) in item1.children"
          :key='""+index2'
        >
          <el-menu-item
            :class="PathLabel===item2.label?'setColor':''"
            :index="''+item2.path"
            v-if="item2.children&&item2.children.length==0"
          >&nbsp;{{item2.label}}
          </el-menu-item>
          <el-submenu
            :index="''+item2.path"
            v-if="item2.children&&item2.children.length!=0"
          >

            <template slot="title">
              <i :class="`myIcon18px icon-${item2.icon}`"></i>
              {{item2.label}}</template>
            <div
              v-for="(item3,index3) in item2.children"
              :key='index3'
            >
              <el-menu-item
                :class="PathLabel===item3.label?'setColor':''"
                :index="''+item3.path"
                v-if="item3.children&&item3.children.length==0"
              >&nbsp;{{item3.label}}
              </el-menu-item>

              <el-submenu
                :index="''+item3.path"
                v-if="item3.children&&item3.children.length!=0"
              >
                <template slot="title">
                  <i :class="`myIcon18px icon-${item3.icon}`"></i>
                  {{item3.label}}</template>
                <div
                  v-for="(item4,index4) in item3.children"
                  :key='index4'
                >
                  <el-menu-item
                    :class="PathLabel===item4.label?'setColor':''"
                    :index="''+item4.path"
                    v-if="item4.children&&item4.children.length==0"
                  >&nbsp;
                    {{item4.label}}
                  </el-menu-item>

                  <el-submenu
                    :index="''+item4.path"
                    v-if="item4.children&&item4.children.length!=0"
                  >
                    <template slot="title">
                      <i :class="`myIcon20px icon-${item4.icon}`"></i>
                      {{item4.label}}</template>

                    <el-menu-item
                      v-for="(item5,index5) in item4.children"
                      :key='index5'
                      :index="''+item5.path"
                    >{{item5.label}}
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
      isOpen1: null, // 判断导航是否展开
      PathLabel: "",
      defaultAct: ""
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
      this.asideData = JSON.parse(localStorage.getItem("asideData"));
    }
  },
  mounted() {
    this.setPath(this.$route.path);
  },
  methods: {
    // 获取组后被选择的项，即 obj
    handleSelect(key, keyPath) {
      let num = keyPath.length;
      let dataArr = this.asideData,
        obj = null;
      for (let i = 0; i < num; i++) {
        obj = dataArr.filter(item => {
          return item.path == keyPath[i];
        })[0];
        dataArr = obj["children"];
      }
      this.PathLabel = obj.label;
      sessionStorage.setItem("page", obj.label);
      this.$router.push({ path: obj.path });
    },
    // 监听路由变化调整导航背景色
    setPath(paths) {
      this.asideData = JSON.parse(localStorage.getItem("asideData"));
      let digui = tar => {
        for (let i = tar.length; i--; ) {
          let path1 = new RegExp(tar[i].path);
          let kk = path1.test(paths);
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
    }
  }
};
</script>
