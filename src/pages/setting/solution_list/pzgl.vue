<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <span>配置位置：</span>
      <el-select filterable size="mini" v-model="actNO" placeholder="请选择" @change="getUserData">
        <el-option
          v-for="item in searchList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="primary" @click="buttonRowUpdata(null)">添加</el-button>
      <!-- <el-button size="mini" type="warning" @click="toSee()">概览</el-button> -->
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

   
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";
// import imgUpload from "../../../components/upImg.vue";

export default {
  props: {},
  components: {
    isTable
    // imgUpload
  },
  data() {
    return {
   
      env: null,
      pageName: "", // 当前页面名字
      loadEnd: false,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      actNO: "sidebar_left", // 配置位置
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      searchList: [
        {
          label: "侧边栏-左侧",
          value: "sidebar_left"
        },
        {
          label: "首页按钮",
          value: "button_top"
        },
        {
          label: "活动按钮",
          value: "activity_button_top"
        },
        {
          label: "启动页",
          value: "launch_advertis"
        },
        {
          label: "侧边栏广告",
          value: "sidebar_banner"
        },
        {
          label: "首页广告",
          value: "index_banner"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = sessionStorage.getItem("page");
    if (this.$route.query["weizhi"]) {
      this.actNO = this.$route.query["weizhi"];
    }

    this.canDoWhat();
    this.getUserData();
  },

  methods: {
    // 概览
    // toSee() {
    //   console.log("概览");
    // },
   
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item);
          this.deleteData = arr;

          break;
      }
    },
    // 表格里的switch事件
    switchAction(data) {
      let obj = {
        id: data.id,
        status: data.switch ? "ENABLE" : "DISABLE"
      };
      this.$api
        .switch_change({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.getUserData();
          }
        });
    },
    // 图片上传
    sharePageImg(data) {
      this.menuData.img = data.url;
    },
    // 添加按钮、编辑按钮
    buttonRowUpdata(data) {
      if (data) {
        sessionStorage.setItem("page", "编辑素材");
        // 编辑
        this.$router.push({
          name: "scbj",
          query: {
            id: data.data.id,
            weizhi: this.actNO
          }
        });
      } else {
        sessionStorage.setItem("page", "添加素材");
        // 添加
        this.$router.push({
          name: "scbj",
          query: {
            weizhi: this.actNO
          }
        });
      }
    },
    //////////////////////////////////////////////////////////////
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            if (this.aloneDeleteData[0].switch) {
              this.$message.error("启用状态，不可删除");
            } else {
              this.$api
                .setting_peizhi_list_delete({
                  vm: this,
                  data: this.aloneDeleteData[0].id
                })
                .then(res => {
                  if (res) {
                    this.$message.success("删除成功！");
                    this.getUserData();
                  }
                });
            }
          })
          .catch(() => {});
      }
      if (type == "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              let arr = this.deleteData.map(item => item.switch);
              if (arr.includes(true)) {
                this.$message.error("启用状态的不可删除，请勿勾选正在启用的！");
              } else {
                this.deleteData.forEach(item => {
                  let del = this.$api
                    .setting_peizhi_list_delete({
                      vm: this,
                      data: item.id
                    })
                    .then(res => {
                      let obj;
                      if (res) {
                        obj = {
                          ok: true,
                          data: item
                        };
                      } else {
                        obj = {
                          ok: false,
                          data: tableData.filter(tar => tar.id == item)
                        };
                      }
                      return obj;
                    });
                  promiseArr.push(del);
                });
                Promise.all(promiseArr).then(arr => {
                  this.deleteData = [];
                  // 拼接删除结果
                  let numSucces = 0;
                  let numFail = 0;
                  let failName = "";
                  arr.forEach(item => {
                    if (item.ok) {
                      numSucces++;
                    } else {
                      numFail++;
                      failName += `<li>名称：${item.data[0].solutionDesc}</li>`;
                    }
                  });
                  let str = `<p>共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个</p>`;
                  if (numFail > 0) {
                    str += `<p>失败的数据为：</p>
                    <ul>
                      ${failName}
                    </ul>`;
                  }
                  this.$alert(str, "操作结果提示", {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: this.getUserData
                  });
                });
              }
            })
            .catch(() => {});
        }
      }
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      this.tableInputData.data.custom.push({
        text: "修改",
        type: "primary",
        size: "small",
        emit: "edit"
      });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "small",
        emit: "delete"
      });
    },
    // 获取数据后的处理
    afterGetData(data) {
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "status") {
              delete obj[str];
              // ENABLE 启用  DISABLE 停用;
              switch (item[str]) {
                case "ENABLE":
                  obj["switch"] = true;
                  obj["action"] = "有效";
                  break;
                case "DISABLE":
                  obj["switch"] = false;
                  obj["action"] = "无效";
                  break;
              }
            }
            // 活动管理配置管理设置素材，属性名： sucai
            obj.sucai = item.previewResourceListVos.map(tar => {
              return {
                text: tar.title,
                img: tar.imageUrl,
                type: tar.imageUrl.split(".")[1]
              };
            });
          });
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "方案名称",
            key: "solutionDesc",
            minWidth: "100"
          },
          {
            title: "素材预览",
            key: "sucai",
            minWidth: "200",
            imgArr: true // 展示图片数组
          }
        ];
        this.tableInputData.actions.setColor = {
          label: "状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: " 有效/无效",
          minWidth: 80,
          from: "status" // 记录这个交互操作的原数据属性
        };
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
    getUserData() {
      this.$api
        .setting_peizhi_list({
          vm: this,
          data: {
            solutionGroup: this.actNO,
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
        })
        .then(res => {
          if (res) {
            if (res.data) {
              this.afterGetData(res.data);
            } else {
              this.afterGetData({
                total: 0,
                pageSize: this.tableInputData.pageSize,
                pageNum: this.tableInputData.pageNum,
                list: []
              });
            }
          }
        });
    }
  }
};
</script>