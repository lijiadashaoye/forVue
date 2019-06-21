<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
      <div class="toCreateBtn">
        <el-button
          v-if="tableInputData.data.quanxian.includes('market_packet_add')"
          size="mini"
          type="warning"
          @click="buttonRowUpdata(true)"
        >创建徽章</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="toDelete('more')"
        >批量删除</el-button>
      </div>
      <div>
        <!-- 搜索 -->
        <el-form
          :inline="true"
          :model="ruleForm"
          label-width="80px"
          label-suffix=':'
          label-position='right'
          size='mini'
          ref="ruleForm"
        >
          <el-form-item label="红包名称">
            <el-input
              v-model="ruleForm.badgeWallName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              size="mini"
              type="primary"
              @click="seachClick(true)"
            >查询</el-button>
            <el-button
              size="mini"
              type="info"
              @click="seachClick(false)"
            >重置</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>
    <div
      id='forTable'
      v-if="loadEnd"
    >
      <isTable
        :inputData='tableInputData'
        @tableEmit='tableEmit'
      />
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      // 表单上边搜索部分的数据
      ruleForm: {
        badgeWallName: null,
        pageNum: 1,
        pageSize: 10
      },
      typeList: [
        {
          label: "固定金额",
          value: "FIXATION"
        },
        {
          label: "随机金额",
          value: "RANDOM"
        }
      ],
      statueList: [
        {
          label: "待发放",
          value: "WAITGRANT"
        },
        {
          label: "发放中",
          value: "GRANTING"
        },
        {
          label: "已停止",
          value: "STOPGRANT"
        }
      ],
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
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
        case "see": // 查看详情
          this.seeInfo(data.data);
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
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
      }
    },
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .member_badgewall_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "ENABLE" : "DISABLE"
          }
        })
        .then(res => {
          this.getUserData();
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .member_badgewall_deleteData({
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
                  .member_badgewall_deleteData({
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
                let titleText = `失败的数据为：\n `;
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `名称为：${item.data[0].badgeWallName} \n`;
                  }
                });
                let str = `共操作 ${
                  arr.length
                } 条数据，成功 ${numSucces} 个，失败 ${numFail} 个 \n`;
                if (numFail > 0) {
                  str += titleText + failName;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  callback: this.getUserData
                });
              });
            })
            .catch(() => {});
        }
      }
    },

    seachClick(type) {
      if (type) {
        // 查询
        this.$api
          .member_badgewall_getListData({
            vm: this,
            data: this.ruleForm
          })
          .then(res => {
            if (res) {
              this.afterGetData(res.data);
            }
          });
      } else {
        this.ruleForm = {
          name: "",
          type: "",
          status: ""
        };
        this.tableInputData.pageSize = 10;
        this.tableInputData.pageNum = 1;
        this.getUserData();
      }
    },
    // 徽章墙详情
    seeInfo(data) {
      sessionStorage.setItem("page", "徽章墙详情");
      this.$router.push({
        name: "badgewall_info",
        query: { id: data.id }
      });
    },
    // 创建卡券按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        sessionStorage.setItem("page", "创建徽章墙");
        this.$router.push({
          name: "badgewall_create"
        });
      } else {
        sessionStorage.setItem("page", "修改徽章墙");
        this.$router.push({
          name: "badgewall_create",
          query: { id: inData.id }
        });
      }
    },
    // 用户权限判定
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      let market_packet_add = quanxian.includes("market_packet_add");
      let market_packet_del = quanxian.includes("market_packet_del");
      let market_packet_upd = quanxian.includes("market_packet_upd");

      if (market_packet_add) {
        this.tableInputData.data.quanxian.push("market_packet_add");
      }
      if (market_packet_upd) {
        this.tableInputData.data.quanxian.push("market_packet_upd");
        this.tableInputData.data.custom.push({
          text: "修改",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }
      if (market_packet_del) {
        this.tableInputData.data.quanxian.push("market_packet_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
      this.tableInputData.data.custom.push({
        text: "查看",
        type: "info",
        size: "small",
        emit: "see"
      });
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
            title: "徽章墙名称",
            key: "badgeWallName",
            minWidth: "130"
          },
          {
            title: "徽章墙说明",
            key: "badgeWallExplain",
            minWidth: "180"
          },
          {
            title: "徽章墙图标",
            key: "badgeWallIcon",
            minWidth: "80",
            isImg: true
          },
          {
            title: "模块介绍",
            key: "moduleExplain",
            minWidth: "120"
          },
          {
            title: "礼品介绍",
            key: "giftExplain",
            minWidth: "240"
          },
          {
            title: "点亮规则类型",
            key: "ruleType",
            minWidth: "130"
          },
          {
            title: "h5链接",
            key: "webUrl",
            minWidth: "200"
          },
          {
            title: "创建人",
            key: "createUserName",
            minWidth: "100"
          },
          {
            title: "创建时间",
            key: "createTime",
            minWidth: "120"
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
            //
            // 将 status 属性换成 action 属性
            if (str === "status") {
              delete obj[str];
              // WAITGRANT:待发放 GRANTING:发放中，STOPGRANT:已停止
              switch (item[str]) {
                case "ENABLE":
                  obj["switch"] = true;
                  obj["action"] = "启用";
                  obj.show = ["edit", "delete", "see"];
                  break;
                case "DISABLE":
                  obj["switch"] = false;
                  obj["action"] = "停用";
                  // obj.show = ["edit", "delete"];
                  break;
              }
            }
            if (str === "badgeWallIcon") {
              obj[str] = this.$ImgBaseUrl + item[str];
            }
            if (str === "ruleType") {
              delete obj[str];
              //  DIRECT:默认(直接就给) TIMES:多少个次数的任务 FIXED:固定任务)
              switch (item[str]) {
                case "DIRECT":
                  obj[str] = "默认(直接就给)";
                  break;
                case "TIMES":
                  obj[str] = "多少次数的任务";
                  break;
                case "FIXED":
                  obj[str] = "固定任务";
                  break;
              }
            }
          });
          return obj;
        });

        this.tableInputData.actions.setColor = {
          label: "任务状态",
          minWidth: 80,
          from: "action", // 记录要显示的表单里的数据属性
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "发放/停止 ",
          minWidth: 90,
          from: "status" // 记录这个交互操作的原数据属性
        };
        resolve();
      }).then(() => {
        this.loadEnd = true;
        return true;
      });
    },
    // 获取用户表格数据
    getUserData() {
      this.$api
        .member_badgewall_getListData({
          vm: this,
          data: {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
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

