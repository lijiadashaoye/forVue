<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
      <div class="toCreateBtn">
        <el-button
          v-if="tableInputData.data.quanxian.includes('market_coupon_add')"
          size="mini"
          type="warning"
          @click="buttonRowUpdata(true)"
        >创建卡券</el-button>
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
          <el-form-item label="卡券名称">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="卡券类别">
            <el-select
              v-model="ruleForm.type"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select
              v-model="ruleForm.status"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in statueList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="有效期">
            <el-date-picker
              v-model="ruleForm.couponDate"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size='mini'
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
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
    <!-- 弹出框 -->
    <el-dialog
      :close-on-click-modal='false'
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="500px"
      :before-close="dialogClose"
    >
      <el-form
        size="small"
        :model="dialog.data"
        label-width="110px"
      >
        <el-form-item label="卡券名称">
          <el-input
            readonly
            v-model="dialog.data.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="已设定发放总数">
          <el-input
            readonly
            v-model="dialog.data.issueNum"
          ></el-input>
        </el-form-item>

        <el-form-item label="已领取">
          <el-input
            readonly
            v-model="dialog.data.getNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="剩余">
          <el-input
            readonly
            v-model="dialog.data.remain"
          ></el-input>
        </el-form-item>
        <el-form-item label="发放">
          <el-input
            class="addDanWei"
            :placeholder='`只能输入正整数，小于${dialog.data.remain}张`'
            v-model="dialog.data.add"
          ></el-input>
        </el-form-item>

      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogAction(false)"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="dialogAction(true)"
        >确 定</el-button>

      </span>
    </el-dialog>

  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  data() {
    return {
      // 表单上边搜索部分的数据
      ruleForm: {
        name: "",
        type: "",
        status: "",
        couponDate: ""
      },
      typeList: [
        {
          label: "奖励金",
          value: "AWARD"
        },
        {
          label: "体验金券",
          value: "EXPERIENCE"
        },
        {
          label: "全部",
          value: ""
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
        },
        {
          label: "全部",
          value: ""
        }
      ],
      dialog: {
        // 弹出框的控制
        show: false,
        title: "",
        data: {}
      },

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
    let page = sessionStorage.getItem("page"); // 获取页面名称
    this.pageName = page;
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    checkNum(value) {
      let reg = /\./;
      if (reg.test(value)) {
        return true;
      } else if (value === "") {
        return true;
      } else if (value < 0) {
        return true;
      } else {
        return false;
      }
    },
    // 关闭弹框
    dialogClose() {
      this.dialog = {
        // 弹出框的控制
        show: false,
        title: "",
        data: {}
      };
    },
    // 弹出框的操作
    dialogAction(type) {
      if (type) {
        if (this.dialog.data.add > this.dialog.data.remain) {
          this.$message.error("没有那么多呀！");
        } else if (this.checkNum(this.dialog.data.add)) {
          this.$message.error("请输入正确的排序数据（正整数）！");
        } else {
          this.$api
            .market_coupon_zengFa({
              vm: this,
              data: {
                id: this.dialog.data.id,
                issueNum: this.dialog.data.add
              }
            })
            .then(res => {
              if (res) {
                this.$message.success("增发成功！");
                this.getUserData();
                this.dialog.show = false;
              }
            });
        }
      } else {
        this.dialog = {
          // 弹出框的控制
          show: false,
          title: "",
          data: {}
        };
      }
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(false, data.data);
          break;
        case "xiangqing": //  领用详情
          this.lingyong(data.data);
          break;
        case "zengfa": // 增发情况
          this.zengfa(data.data);
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
        .market_coupon_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "GRANTING" : "STOPGRANT"
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
              .market_coupon_deleteData({
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
                  .market_coupon_deleteData({
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
                    failName += `卡券名称为：${item.data[0].name} \n`;
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
    // 查询、重置
    seachClick(type) {
      if (type) {
        let obj = {};
        if (this.ruleForm.name) {
          obj.name = this.ruleForm.name;
        }
        if (this.ruleForm.type) {
          obj.type = this.ruleForm.type;
        }
        if (this.ruleForm.status) {
          obj.status = this.ruleForm.status;
        }

        if (this.ruleForm.couponDate) {
          obj.queryBeginTime = this.ruleForm.couponDate[0];
          obj.queryEndTime = this.ruleForm.couponDate[1];
        }
        this.$api
          .market_create_getCouponList({
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
          name: "",
          type: "",
          status: "",
          couponDate: ""
        };
        this.tableInputData.pageSize = 10;
        this.tableInputData.pageNum = 1;
        this.getUserData();
      }
    },
    // 领用详情
    lingyong(data) {
      sessionStorage.setItem("page", "领用详情");
      this.$router.push({
        name: "coupon_info",
        query: { id: data.id }
      });
    },
    // 增发情况
    zengfa(data) {
      this.dialog.title = "增加发放";
      this.dialog.data = {
        id: data.id,
        name: data.name,
        issueNum: data.issueNum,
        getNum: data.getNum,
        remain: parseInt(data.issueNum, 10) - parseInt(data.getNum, 10),
        add: ""
      };
      this.dialog.show = true;
    },
    // 创建卡券按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        sessionStorage.setItem("page", "创建卡券");
        this.$router.push({
          name: "coupon_add"
        });
      } else {
        sessionStorage.setItem("page", "修改卡券");
        this.$router.push({
          name: "coupon_add",
          query: { id: inData.id }
        });
      }
    },
    // 用户权限判定
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      let market_coupon_add = quanxian.includes("market_coupon_add");
      let market_coupon_del = quanxian.includes("market_coupon_del");
      let market_coupon_upd = quanxian.includes("market_coupon_upd");
      let market_coupon_detail = quanxian.includes("market_coupon_detail");
      let market_coupon_upd_num = quanxian.includes("market_coupon_upd_num");
      if (market_coupon_add) {
        this.tableInputData.data.quanxian.push("market_coupon_add");
      }
      if (market_coupon_upd) {
        this.tableInputData.data.quanxian.push("market_coupon_upd");
        this.tableInputData.data.custom.push({
          text: "修改",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }
      if (market_coupon_del) {
        this.tableInputData.data.quanxian.push("market_coupon_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
      if (market_coupon_detail) {
        this.tableInputData.data.quanxian.push("market_coupon_detail");
        this.tableInputData.data.custom.push({
          text: "领用详情",
          type: "info",
          size: "small",
          emit: "xiangqing"
        });
      }
      if (market_coupon_upd_num) {
        this.tableInputData.data.quanxian.push("market_coupon_upd_num");
        this.tableInputData.data.custom.push({
          text: "增加发放",
          type: "primary",
          size: "small",
          emit: "zengfa"
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
            title: "卡券名称",
            key: "name",
            minWidth: "80"
          },
          {
            title: "卡券类型",
            key: "type",
            minWidth: "140"
          },
          {
            title: "有效期开始时间",
            key: "startTime",
            minWidth: "170"
          },
          {
            title: "有效期结束时间",
            key: "endTime",
            minWidth: "170"
          },
          {
            title: "已领取数",
            key: "getNum",
            minWidth: "80",
            color: "blue"
          },
          {
            title: "已使用数",
            key: "useNum",
            minWidth: "80",
            color: "green"
          },
          {
            title: "发放总数",
            key: "issueNum",
            minWidth: "80",
            color: "red"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "170"
          },
          {
            title: "操作人",
            key: "creatorName",
            minWidth: "100"
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
            // 将 shelfStatus 属性换成 action 属性
            if (str === "status") {
              delete obj[str];
              // WAITGRANT:待发放 GRANTING:发放中，STOPGRANT:已停止
              switch (item[str]) {
                case "WAITGRANT":
                  obj["switch"] = false;
                  obj["action"] = "待发放";
                  break;
                case "GRANTING":
                  obj["switch"] = true;
                  obj["action"] = "发放中";
                  break;
                case "STOPGRANT":
                  obj["switch"] = false;
                  obj["action"] = "已停止";
                  break;
              }
            }
            if (str === "type") {
              // EXPERIENCE:体验金券 AWARD:奖励金券(加息券)
              delete obj[str];
              switch (item[str]) {
                case "EXPERIENCE":
                  obj[str] = "体验金券";
                  break;
                case "AWARD":
                  obj[str] = "奖励金券(加息券)";
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
    // 获取用户表格数据
    getUserData() {
      this.$api
        .market_create_getCouponList({
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
.addDanWei {
  width: 250px;
  position: relative;
}
.addDanWei::after {
  content: "张";
  position: absolute;
  right: -20px;
  top: 2px;
  font-weight: bold;
  font-size: 14px;
}
</style>

