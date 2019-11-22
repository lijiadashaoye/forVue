<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-input size="mini" v-model="seachInput" placeholder="输入类型" style="width:180px;"></el-input>&nbsp;&nbsp;
      <el-input size="mini" v-model="labelInput" placeholder="输入字典标签" style="width:180px;"></el-input>
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
        width="500px"
        :before-close="dialogClose"
      >
        <el-form
          size="small"
          ref="updataUser"
          :model="updataUser"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="字典值" prop="value">
            <el-input v-model="updataUser.value"></el-input>
          </el-form-item>
          <el-form-item label="字典标签" prop="label">
            <el-input v-model="updataUser.label"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="updataUser.type"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="updataUser.description"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="updataUser.remarks"></el-input>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input type="number" v-model="updataUser.sort" placeholder="只能输入正整数"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    // 验证排序
    var checkNum = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (!value) {
        callback(new Error("请输入排序"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11) {
        callback(new Error("最多输入11个字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      seachInput: "", // 搜索框输入的内容
      labelInput: "", // 标签搜索输入
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
      ruleList: [], // 角色列表
      //修改、添加用户
      updataUser: {
        value: "",
        label: "",
        type: "",
        description: "",
        remarks: "",
        sort: ""
      },
      //表单验证
      rules: {
        value: [
          { required: true, message: "请输入字典值", trigger: "blur" },
          { min: 1, max: 100, message: "字典值为1-100个字符", trigger: "blur" }
        ],
        label: [
          { required: true, message: "请输入字典标签", trigger: "blur" },
          { min: 1, max: 100, message: "标签名为1-100个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入类型", trigger: "blur" },
          { min: 1, max: 100, message: "类型为1-100个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 0, max: 100, message: "描述最多为100个字符", trigger: "blur" }
        ],
        remarks: [
          { required: true, message: "请输入备注", trigger: "blur" },
          { min: 0, max: 255, message: "备注最多为255个字符", trigger: "blur" }
        ],
        sort: [{ required: true, validator: checkNum, trigger: "blur" }]
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
    // 关闭弹框
    dialogClose() {
      this.$refs.updataUser.resetFields();
      this.dialog.show = false;
      this.updataUser = {
        value: "",
        label: "",
        type: "",
        description: "",
        remarks: "",
        sort: ""
      };
    },
    // 弹出框的操作
    dialogAction(type) {
      if (type) {
        this.$refs.updataUser.validate(valid => {
          if (valid) {
            let httpType = ""; // 根据是否需要填写密码判定http方式，是否是添加
            if (this.dialog.title == "添加") {
              httpType = "post";
            } else {
              httpType = "put";
            }
            this.$api
              .admin_dict_aboutUser({
                vm: this,
                method: httpType,
                data: this.updataUser
              })
              .then(res => {
                if (res) {
                  this.$message.success(`${this.dialog.title}成功！`);
                  this.getUserData();
                  this.dialogClose();

                  this.$store.dispatch("get_dict", this).then(res => {
                    sessionStorage.setItem("dict", JSON.stringify(res));
                  });
                }
              });
          }
        });
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
              .admin_dict_deleteUser({
                vm: this,
                id: this.aloneDeleteData[0].id,
                type: this.aloneDeleteData[0].type
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
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.deleteData.forEach(item => {
                let del = this.$api
                  .admin_dict_deleteUser({
                    vm: this,
                    id: item.id,
                    type: item.type
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
                        data: tableData.filter(tar => tar.id == item.id)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });
              Promise.all(promiseArr).then(arr => {
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";

                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>字典值为：${item.data[0].value}</li>`;
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

    // 搜索框、重置
    seachClick(type) {
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      if (!type) {
        this.seachInput = "";
        this.labelInput = "";
      }
      this.getUserData();
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        this.dialog.title = "添加";
        this.updataUser = {
          value: "", // 字典值
          label: "", // 标签名
          type: "", // 类型
          description: "", // 描述
          remarks: "", // 备注
          sort: "" // 排序
        };
      } else {
        this.dialog.title = "信息修改";
        this.updataUser = { ...inData };
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
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
          });
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "字典值",
            key: "value",
            minWidth: "270"
          },
          {
            title: "类型",
            key: "type",
            minWidth: "190"
          },
          {
            title: "字典标签",
            key: "label",
            minWidth: "180"
          },

          {
            title: "描述",
            key: "description",
            minWidth: "180"
          },
          {
            sortable: true,
            title: "排序",
            key: "sort",
            minWidth: "80"
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
        obj.search.type = this.seachInput;
      }
      if (this.labelInput) {
        obj.search.label = this.labelInput;
      }
      this.$api.admin_dict_getTableData(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
