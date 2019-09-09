<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="toCreateBtn">
        <el-button
          v-if="tableInputData.data.quanxian.includes('market_packet_add')"
          size="mini"
          type="warning"
          @click="buttonRowUpdata(true)"
        >创建红包</el-button>
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
          <el-form-item label="红包名称">
            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="红包类型">
            <el-select filterable v-model="ruleForm.amountType" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select filterable v-model="ruleForm.status" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in statueList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" type="primary" @click="seachClick('search')">查询</el-button>
            <el-button size="mini" type="info" @click="seachClick('reset')">重置</el-button>
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
      // 表单上边搜索部分的数据
      ruleForm: {
        name: "",
        status: "",
        amountType: ""
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
          this.seachClick("fenye");
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
        .market_packet_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "GRANTING" : "STOPGRANT"
          }
        })
        .then(res => {
          this.seachClick("upDown");
        });
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .market_packet_deleteData({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("delete");
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
                  .market_packet_deleteData({
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
                    failName += `<li>红包名称为：${item.data[0].name}</li>`;
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
                  callback: this.seachClick("delete")
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 红包详情
    seeInfo(data) {
      sessionStorage.setItem("page", "红包详情");
      this.$router.push({
        name: "packet_info",
        query: { id: data.id }
      });
    },
    // 创建卡券按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        sessionStorage.setItem("page", "创建红包");
        this.$router.push({
          name: "packet_add"
        });
      } else {
        sessionStorage.setItem("page", "修改红包");
        this.$router.push({
          name: "packet_add",
          query: { id: inData.id }
        });
      }
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
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
            title: "红包名称",
            key: "name",
            minWidth: "80"
          },
          {
            title: "红包类型",
            key: "amountType",
            minWidth: "80"
          },
          {
            title: "金额",
            key: "amountFixed",
            minWidth: "80"
          },
          {
            title: "总金额",
            key: "totalAmount",
            minWidth: "80"
          },
          {
            title: "总个数",
            key: "totalNum",
            minWidth: "80"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "160"
          },
          {
            title: "操作人",
            key: "creatorName",
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
                case "WAITGRANT":
                  obj["switch"] = false;
                  obj["action"] = "待发放";
                  // 添加部分操作按钮不可用
                  obj.show = ["edit", "delete"];
                  break;
                case "GRANTING":
                  obj["switch"] = true;
                  obj["action"] = "发放中";
                  obj.show = ["edit", "delete", "see"];
                  break;
                case "STOPGRANT":
                  obj["switch"] = false;
                  obj["action"] = "已停止";
                  obj.show = ["edit", "delete", "see"];
                  break;
              }
            }
            if (str === "amountType") {
              delete obj[str];
              //  FIXATION:固定金额 RANDOM:随机金额)
              switch (item[str]) {
                case "FIXATION":
                  obj[str] = "固定金额";
                  break;
                case "RANDOM":
                  obj[str] = "随机金额";
                  break;
              }
            }
          });
          return obj;
        });

        this.tableInputData.actions.setColor = {
          label: "状态",
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
    // 查询、重置
    seachClick(type) {
      // search  // 搜索
      // reset  // 重置
      // fenye  // 分页
      // upDown  // 上下架
      // delete // 删除
      let obj = {};
      switch (type) {
        case "search":
          if (this.ruleForm.name) {
            obj.name = this.ruleForm.name;
          }
          if (this.ruleForm.amountType) {
            obj.amountType = this.ruleForm.amountType;
          }
          if (this.ruleForm.status) {
            obj.status = this.ruleForm.status;
          }
          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
        case "reset":
          this.ruleForm = {
            name: "",
            type: "",
            status: ""
          };
          this.tableInputData.pageSize = 10;
          this.tableInputData.pageNum = 1;
          this.getUserData();
          break;
        case "fenye":
        case "upDown":
        case "delete":
          if (this.ruleForm.name) {
            obj.name = this.ruleForm.name;
          }
          if (this.ruleForm.amountType) {
            obj.amountType = this.ruleForm.amountType;
          }
          if (this.ruleForm.status) {
            obj.status = this.ruleForm.status;
          }
          obj.pageSize = this.tableInputData.pageSize;
          obj.pageNum = this.tableInputData.pageNum;
          this.getUserData(obj);
          break;
      }
    },
    // 获取用户表格数据
    getUserData(data) {
      let obj;
      if (data) {
        obj = data;
      } else {
        obj = {
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        };
      }
      this.$api
        .market_packet_getListData({
          vm: this,
          data: obj
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