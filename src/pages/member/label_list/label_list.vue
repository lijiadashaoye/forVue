<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <label class="isLabel">
        标签名称：
        <el-input size="mini" v-model="seachInput" placeholder="请输入标签名称" style="width:180px;"></el-input>
      </label>
      <label class="isLabel">标签状态：</label>
      <el-select filterable size="mini" v-model="mark_statue" placeholder="请选择">
        <el-option
          v-for="item in markStatueList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="info" style="margin-left:15px" @click="seachClick(false)">重置</el-button>
      <el-button style="margin-left:15px" size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
      <el-button
        size="mini"
        type="warning"
        style="margin-left:15px"
        @click="addMark(true)"
        v-if="tableInputData.data.quanxian.includes('member_label_add')"
      >添加标签</el-button>
    </div>
    <div id="forTable">
      <isTable v-if="loadEnd" :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      :title="dialogMark.title"
      :visible.sync="dialogMark.show"
      width="500px"
      :before-close="markDialogClose"
    >
      <el-form :model="markInput" label-width="80px" :rules="rules" ref="markInput">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="markInput.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="markDialogAction(false)">取 消</el-button>
        <el-button
          :disabled="markInput.name==''"
          size="mini"
          type="primary"
          @click="markDialogAction(true)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      rules: {
        name: [{ min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }]
      },
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      pageName: "", // 当前页面名字
      seachInput: "",
      mark_statue: "", // 标签状态
      markStatueList: [
        {
          label: "启用",
          value: "ENABLE"
        },
        {
          label: "停用",
          value: "DISABLE"
        }
      ],
      loadEnd: false,
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
      // 标签弹出框的控制
      dialogMark: {
        show: false,
        title: "",
        type: ""
      },
      markInput: { name: "" }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page");
  },
  mounted() {
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
          this.addMark(false, data.data);
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

    // 删除、批量删除标签
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .member_labelList_deleteData({
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
                  .member_labelList_deleteData({
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
                    failName += `<li>名称：${item.data[0].name}</li>`;
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
            })
            .catch(() => {});
        }
      }
    },
    ///////////////////////////////////////////////////////////////
    // 新增标签按钮
    addMark(type, data) {
      if (type) {
        this.dialogMark.title = "新增标签";
        this.dialogMark.show = true;
        this.dialogMark.type = "post";
      } else {
        this.markInput.id = data.id;
        this.markInput.name = data.name;
        this.dialogMark.title = "修改标签";
        this.dialogMark.show = true;
        this.dialogMark.type = "put";
      }
    },
    // 标签弹出框的取消、确定按钮
    markDialogAction(type) {
      if (type) {
        if (this.markInput.name.length > 20) {
          this.$message.error("最大支持20位字符！");
        } else {
          this.$api
            .member_labelList_upLabelData({
              vm: this,
              method: this.dialogMark.type,
              data: this.markInput
            })
            .then(res => {
              if (res) {
                this.getUserData();
                this.markDialogClose();
              }
            });
        }
      } else {
        // 修改
        this.markDialogClose();
      }
    },
    // 标签弹框的关闭
    markDialogClose() {
      this.dialogMark = {
        show: false,
        title: "",
        type: ""
      };
      this.markInput = { name: "" };
      this.$refs["markInput"].resetFields();
    },
    // 表格里的switch事件,启用、停用
    switchAction(data) {
      this.$api
        .member_label_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "ENABLE" : "DISABLE"
          }
        })
        .then(res => {
          if (res) {
            this.getUserData();
          }
        });
    },
    ////////////////////////////////////////
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));

      let member_label_add = quanxian.includes("member_label_add");
      if (member_label_add) {
        this.tableInputData.data.quanxian.push("member_label_add");
      }
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
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.title = [
          {
            title: "标签名称",
            key: "name",
            minWidth: "80"
          },
          {
            title: "被使用数量",
            key: "markedNum",
            minWidth: "80"
          },
          {
            title: "创建人名称",
            key: "creatorName",
            minWidth: "120"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "120"
          }
        ];
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "status") {
              delete obj[str];
              // 会员状态(ENABLE:启用 DISABLE:冻结)
              switch (item[str]) {
                case "ENABLE":
                  obj["switch"] = true;
                  obj["action"] = "启用";
                  break;
                case "DISABLE":
                  obj["switch"] = false;
                  obj["action"] = "冻结";
                  break;
              }
            }
          });
          return obj;
        });
        this.tableInputData.actions.setColor = {
          label: "状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "启用/冻结",
          minWidth: 80,
          from: "status" // 记录这个交互操作的原数据属性
        };
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 搜索框
    seachClick(type) {
      if (!type) {
        this.seachInput = "";
        this.mark_statue = "";
      }
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.getUserData();
    },
    // 获取表格数据
    getUserData() {
      let obj;

      obj = {
        pageSize: this.tableInputData.pageSize,
        pageNum: this.tableInputData.pageNum
      };

      if (this.seachInput) {
        obj.name = this.seachInput;
      }
      if (this.mark_statue) {
        obj.status = this.mark_statue;
      }
      this.$api
        .member_manager_getMarkList({
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

<style scoped='true' lang="scss">
.isLabel {
  font-size: 14px;
  padding: 0 3px 0 15px;
}
</style>
