<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="toCreateBtn">
        <el-button size="mini" type="warning" @click="buttonRowUpdata(true)">创建任务</el-button>
        <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      </div>
      <div>
        <!-- 搜索 -->
        <el-form
          :inline="true"
          :model="ruleForm"
          label-width="80px"
          label-suffix=":"
          label-position="right"
          size="mini"
          ref="ruleForm"
        >
          <el-form-item label="任务名称">
            <el-input v-model="ruleForm.activityName" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="任务类别">
            <el-select filterable v-model="ruleForm.shelfStatus" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in searchList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务类型">
            <el-select filterable v-model="ruleForm.shelfStatus" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in searchList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" type="primary" @click="seachClick(true)">查询</el-button>
            <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      env: null,
      // 表单上边搜索部分的数据
      ruleForm: {
        activityNo: "",
        activityName: "",
        shelfStatus: "",
        actDate: ""
      },
      searchList: [
        {
          label: "待上架",
          value: "WAITSHELF"
        },
        {
          label: "上架中",
          value: "UPSHELF"
        },
        {
          label: "已下架",
          value: "DOWNSHELF"
        }
      ],

      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      }
    };
  },
  components: {
    isTable
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(false, data.data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data.id);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item.id);
          this.deleteData = arr;
          break;
        // case "textClick": // 文字的点击
        //   this.textClickAction(data.data);
        //   break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
      }
    },
    // // 表格里的文字点击事件
    // textClickAction(data) {
    //   console.log(data);
    // },

    // 表格里的switch事件,上架、下架
    switchAction(data) {
      this.$api
        .market_create_UpDown({
          vm: this,
          data: {
            id: data.id,
            shelfStatus: data.switch ? "UPSHELF" : "DOWNSHELF"
          }
        })
        .then(res => {
          if (res) {
            this.getUserData();
          }
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .market_create_deleteData({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.getUserData();
                }
              });
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
              this.deleteData.forEach(item => {
                let del = this.$api
                  .market_create_deleteData({
                    vm: this,
                    data: item
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
                    failName += `<li>活动名称为：${item.data[0].activityName}</li>`;
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
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: "确定",
                  callback: this.getUserData
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 查询、重置
    seachClick(type) {
      if (type) {
        let obj = {};
        if (this.ruleForm.activityNo) {
          obj.activityNo = this.ruleForm.activityNo;
        }
        if (this.ruleForm.shelfStatus) {
          obj.shelfStatus = this.ruleForm.shelfStatus;
        }
        if (this.ruleForm.activityName) {
          obj.activityName = this.ruleForm.activityName;
        }
        if (this.ruleForm.actDate) {
          obj.queryBeginTime = this.ruleForm.actDate[0].getTime();
          obj.queryEndTime = this.ruleForm.actDate[1].getTime();
        }
        this.$api
          .market_list_getListData({
            vm: this,
            data: obj
          })
          .then(res => {
            if (res) {
              this.afterGetData(res.data);
            }
          });
      } else {
        this.ruleForm = {
          actNum: "",
          actName: "",
          actState: "",
          actDate: ""
        };
        this.tableInputData.pageSize = 10;
        this.tableInputData.pageNum = 1;
        this.getUserData();
      }
    },
    // 创建活动按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        sessionStorage.setItem("page", "创建活动");
        this.$router.push({
          name: "activity_create"
        });
      } else {
        sessionStorage.setItem("page", "修改活动");
        this.$router.push({
          name: "activity_create",
          query: { id: inData.id }
        });
      }
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let market_activity_upd = quanxian.includes("market_activity_upd");
      let market_activity_del = quanxian.includes("market_activity_del");
      let market_activity_add = quanxian.includes("market_activity_add");

      if (market_activity_add) {
        this.tableInputData.data.quanxian.push("market_activity_add");
      }
      if (market_activity_upd) {
        this.tableInputData.data.quanxian.push("market_activity_upd");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }
      if (market_activity_del) {
        this.tableInputData.data.quanxian.push("market_activity_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
    },
    // 获取数据后的处理
    afterGetData(data) {
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize;
        this.tableInputData.pageNum = data.pageNum;
        // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
        this.tableInputData.data.title = [
          {
            title: "活动编号",
            key: "activityNo",
            minWidth: "100"
          },
          {
            title: "活动名称",
            key: "activityName",
            minWidth: "120"
          },
          {
            title: "开始时间",
            key: "startTime",
            minWidth: "160"
          },
          {
            title: "结束时间",
            key: "endTime",
            minWidth: "160"
          },
          {
            title: "操作人",
            key: "creatorName",
            minWidth: "80"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "160"
          }
        ];

        // 设置表格有额外设置的数据
        // table里是读取 actions 里是否有 switch 属性决定是否显示switch模块
        // 同时，switch 有固定的属性要求，所以需要把服务器返回的属性换个名字
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            // 将 shelfStatus 属性换成 action 属性
            if (str === "shelfStatus") {
              delete obj[str];
              // WAITSHELF:待上架, UPSHELF:上架中, DOWNSHELF:已下架
              switch (item[str]) {
                case "WAITSHELF":
                  obj["switch"] = false;
                  obj["action"] = "待上架";
                  break;
                case "UPSHELF":
                  obj["switch"] = true;
                  obj["action"] = "上架中";
                  break;
                case "DOWNSHELF":
                  obj["switch"] = false;
                  obj["action"] = "已下架";
                  break;
              }
            }
          });
          return obj;
        });
        // 设置需要的额外设置字体颜色的
        this.tableInputData.actions.setColor = {
          label: "活动状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "上架/下架",
          minWidth: 80,
          from: "shelfStatus" // 记录这个交互操作的原数据属性
        };
        // // // 设置字体点击事件
        // this.tableInputData.actions.click = {
        //   label: "活动编号",
        //   minWidth: 100,
        //   from: "activityNo" // 记录这个交互操作的原数据属性
        // };
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取用户表格数据
    getUserData() {
      this.$api
        .member_mission_getList({
          vm: this,
          data: {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
        })
        .then(res => {
          // console.log(res);
          // if (res) {
          //   this.afterGetData(res.data);
          // }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.toCreateBtn {
  padding-bottom: 5px;
}
</style>

