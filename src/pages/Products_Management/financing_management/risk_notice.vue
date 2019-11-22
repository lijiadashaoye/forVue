<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-input size="mini" v-model="seachInput" placeholder="输入ID" style="width:180px;"></el-input>
      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
      <el-button
        size="mini"
        type="warning"
        v-if="tableInputData.data.quanxian.includes('sys_dict_add')"
        @click="buttonRowUpdata(true)"
      >添加</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      <!-- 弹出框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dialog.title"
        :visible.sync="dialog.show"
        width="750px"
        :before-close="dialogClose"
      >
        <editor-bar v-model="updata.content" :url="'product/file/up/product'"></editor-bar>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import isTable from "@/components/isTable/isTable.vue";
import EditorBar from "@/components/wangEnduit";

export default {
  components: {
    isTable,
    EditorBar
  },
  data() {
    return {
      env: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      seachInput: "", // 搜索框输入的内容

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
      dialog: {
        // 弹出框的控制
        show: false,
        title: ""
      },
      //修改、添加
      updata: {
        content: ""
      }
    };
  },

  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    // 关闭弹框
    dialogClose() {
      this.dialog.show = false;
      this.updata = {
        content: ""
      };
    },
    // 弹出框的操作
    dialogAction(type) {
      if (type) {
        if (this.updata.content) {
          let httpType = "";
          if (this.dialog.title == "添加") {
            httpType = "post";
          } else {
            httpType = "put";
          }

          this.$api
            .risk_notice({
              vm: this,
              httpType: httpType,
              data: this.updata
            })
            .then(res => {
              if (res) {
                this.$message.success(`${this.dialog.title}成功！`);
                this.getUserData();
                this.dialogClose();
              }
            });
        } else {
          this.$message.error("请输入内容");
        }
      } else {
        this.dialogClose();
      }
    },
    // 监听表格的操作
    tableEmit(data) {
      this.deleteData = [];
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata(false, data.data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.deleteData = data.data;
          break;
      }
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            // 单独删除
            this.$api
              .risk_notice_item({
                vm: this,
                id: this.aloneDeleteData[0].id,
                httpType: "delete"
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
      if (type === "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              this.deleteData.forEach(item => {
                let del = this.$api
                  .risk_notice_item({
                    vm: this,
                    id: item.id,
                    httpType: "delete"
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
                        data: item
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });

              Promise.all(promiseArr).then(arr => {
                this.getUserData();
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";

                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>ID 值为：${item.id}</li>`;
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
                  confirmButtonText: "确定"
                });
              });
            })
            .catch(() => {});
        }
      }
    },

    // 搜索框、重置
    seachClick(type) {
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      if (!type) {
        this.seachInput = "";
      }
      this.getUserData();
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        this.dialog.title = "添加";
        this.updata = {
          content: ""
        };
      } else {
        this.dialog.title = "修改";
        this.$api
          .risk_notice_item({
            vm: this,
            httpType: "get",
            id: inData.id
          })
          .then(res => {
            if (res) {
              this.updata = {
                id: res.data.id,
                content: res.data.content
              };
            }
          });
      }
      this.dialog.show = true;
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let sys_dict_edit = quanxian.includes("sys_dict_edit");
      let sys_dict_del = quanxian.includes("sys_dict_del");

      let sys_dict_add = quanxian.includes("sys_dict_add");
      if (sys_dict_add) {
        this.tableInputData.data.quanxian.push("sys_dict_add");
      }

      if (sys_dict_edit) {
        this.tableInputData.data.quanxian.push("sys_dict_edit");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }

      if (sys_dict_del) {
        this.tableInputData.data.quanxian.push("sys_dict_del");
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
        this.tableInputData.data.list = data.list;
        this.tableInputData.data.title = [
          {
            title: "ID",
            key: "id",
            minWidth: "80"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "180"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取用户表格数据
    getUserData() {
      this.loadEnd = false;
      let obj = {
        vm: this,
        method: "get",
        search: {
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        }
      };

      if (this.seachInput) {
        obj.search.id = this.seachInput;
      }

      this.$api.risk_notice_list(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
