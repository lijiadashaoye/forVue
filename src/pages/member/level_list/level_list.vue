<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <el-button
        size="mini"
        type="primary"
        @click="buttonRowUpdata(true)"
        v-if="tableInputData.data.quanxian.includes('member_level_add')"
      >新增会员等级</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="400px"
      :before-close="dialogClose"
    >
      <el-form :model="menuData" label-width="100px" :rules="rules" size="mini" ref="menuData">
        <el-form-item label="等级图标" required>
          <div class="upimg">
            <imgUpload
              v-if="dialog.show"
              :datas="{
                  url:'admin/file/up/member',
                  imgUrl:menuData.icon
                }"
              @selectImg="sharePageImg($event)"
            />
          </div>
        </el-form-item>

        <el-form-item label="等级名称" prop="name">
          <el-input v-model="menuData.name"></el-input>
        </el-form-item>

        <div style="display:flex;">
          <el-form-item label="成长值范围" prop="growthStart">
            <el-input type="number" v-model="menuData.growthStart"></el-input>
          </el-form-item>

          <el-form-item label="-" prop="growthEnd" label-width="30px">
            <el-input type="number" v-model="menuData.growthEnd"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="积分类型" prop="expireType">
          <el-select
            filterable
            v-model="menuData.expireType"
            placeholder="请选择"
            @change="selectExpireType"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="menuData.expireType==='LATERMONTH'" prop="resetMonth" label="月数">
          每
          <el-input type="number" style="width:150px;margin:0 5px;" v-model="menuData.resetMonth"></el-input>月重置
        </el-form-item>

        <el-form-item v-if="menuData.expireType==='LATERDAY'" label="天数" prop="effectiveDay">
          发卡/升降级
          <el-input type="number" style="width:150px;margin:0 5px;" v-model="menuData.effectiveDay"></el-input>天
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="markDialogAction(false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="markDialogAction(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";
import imgUpload from "../../../components/upImg.vue";

export default {
  props: {},
  components: {
    isTable,
    imgUpload
  },
  data() {
    var checkNum = function(rule, value, callBack) {
      let patrn = /\./g;
      if (patrn.test(value)) {
        callBack(new Error("只能输入正整数数字"));
      } else if (value.length > 10 || +value < 0) {
        callBack(new Error("只能输入1-10正整数数字"));
      } else {
        callBack();
      }
    };
    var retLength = function(rule, value, callBack) {
      if (("" + value).length > 10 || ("" + value).length < 0) {
        callBack(new Error("请输入1-10个字符"));
      } else {
        callBack();
      }
    };
    return {
      pageName: "", // 当前页面名字
      loadEnd: false,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
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
      // 弹出框的控制
      dialog: {
        show: false,
        title: ""
      },
      options: [
        {
          value: "EVEY",
          label: "永久有效"
        },
        {
          value: "LATERMONTH",
          label: "每多少个月重置"
        },
        {
          value: "LATERDAY",
          label: "发卡/升降级之后多少天"
        }
      ],
      // 表单
      menuData: {
        icon: "",
        name: "",
        growthStart: "",
        growthEnd: "",
        expireType: ""
      },
      rules: {
        name: [
          { min: 1, max: 20, message: "等级名称为1-20个字符", trigger: "blur" },
          { required: true, message: "请输入等级名称", trigger: "blur" }
        ],
        expireType: [
          { required: true, message: "选择积分类型", trigger: "blur" }
        ],
        growthStart: [
          { required: true, message: "请输入最小值", trigger: "blur" },
          { validator: checkNum, trigger: "blur" },
          { validator: retLength, trigger: "blur" }
        ],
        growthEnd: [
          { required: true, message: "请输入最大值", trigger: "blur" },
          { validator: retLength, trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        resetMonth: [
          { required: true, message: "请输入数值", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        effectiveDay: [
          { required: true, message: "请输入天数", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page");
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
        case "switch": // switch 变换
          this.switchAction(data.data);
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
          var arr = data.data.map(item => item);
          this.deleteData = arr;
          break;
      }
    },
    // 表格里的switch事件
    switchAction(data) {
      this.$api
        .member_level_UpDown({
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
    // 图片上传
    sharePageImg(data) {
      this.menuData.icon = data.url;
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      if (type) {
        // 新增
        this.dialog = {
          httpType: "post",
          show: true,
          title: "新增会员等级"
        };
      } else {
        // 编辑
        this.$api
          .member_level_getInfo({
            vm: this,
            data: inData.id
          })
          .then(res => {
            if (res) {
              this.menuData = res.data;
              this.dialog = {
                httpType: "put",
                show: true,
                title: "修改会员等级"
              };
              // console.log(this.menuData);
            }
          });
      }
    },
    //////////////////////////////////////////////////////////////
    // 积分类型变化
    selectExpireType() {
      delete this.menuData.resetMonth;
      delete this.menuData.effectiveDay;
      let obj = { ...this.menuData };
      switch (this.menuData.expireType) {
        case "LATERMONTH":
          obj.resetMonth = "";
          break;
        case "LATERDAY":
          obj.effectiveDay = "";
          break;
      }
      this.menuData = { ...obj };
    },
    // 关闭弹框
    dialogClose() {
      this.dialog = {
        show: false,
        title: ""
      };
      this.$refs.menuData.resetFields();
      this.menuData = {
        icon: "",
        name: "",
        growthStart: "",
        growthEnd: "",
        expireType: ""
      };
    },
    // 标签弹出框的取消、确定按钮
    markDialogAction(type) {
      if (type) {
        this.$refs.menuData.validate(valid => {
          if (valid && this.menuData.icon) {
            if (+this.menuData.growthStart < +this.menuData.growthEnd) {
              this.$api
                .member_level_createNewLevel({
                  vm: this,
                  method: this.dialog.httpType,
                  data: this.menuData
                })
                .then(res => {
                  if (res) {
                    this.getUserData();
                    this.dialogClose();
                  }
                });
            } else {
              this.$message.error("请输入正确成长值范围！");
            }
          } else {
            this.$message.error("请输入完整的正确数据！");
          }
        });
      } else {
        // 修改
        this.dialogClose();
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
                .member_level_deleteLevel({
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
                    .member_level_deleteLevel({
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
                  let titleText = `失败的数据为：\n `;
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
              }
            })
            .catch(() => {});
        }
      }
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));

      let member_level_add = quanxian.includes("member_level_add");
      let member_level_upd = quanxian.includes("member_level_upd");
      let member_level_del = quanxian.includes("member_level_del");

      if (member_level_upd) {
        this.tableInputData.data.quanxian.push("member_level_upd");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "primary",
          size: "small",
          emit: "edit"
        });
      }
      if (member_level_del) {
        this.tableInputData.data.quanxian.push("member_level_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "small",
          emit: "delete"
        });
      }
      if (member_level_add) {
        this.tableInputData.data.quanxian.push("member_level_add");
      }
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
            if (str === "icon") {
              obj[str] = this.$ImgBaseUrl + item[str];
            }
          });
          for (let str in obj) {
            if (str === "expireType") {
              switch (item[str]) {
                case "EVEY":
                  obj[str] = "永久有效";
                  obj["effectiveDay"] = null;
                  obj["resetMonth"] = null;
                  break;
                case "LATERMONTH":
                  obj[str] = "每多少个月重置";
                  obj["effectiveDay"] = null;
                  break;
                case "LATERDAY":
                  obj[str] = "发卡/升降级之后多少天";
                  obj["resetMonth"] = null;
                  break;
              }
            }
          }
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "等级名称",
            key: "name",
            minWidth: "100"
          },
          {
            title: "等级图标",
            key: "icon",
            minWidth: "90",
            isImg: true
          },
          {
            title: "成长值开始值",
            key: "growthStart",
            minWidth: "100"
          },
          {
            title: "成长值结束值",
            key: "growthEnd",
            minWidth: "100"
          },
          {
            title: "有效期类型",
            key: "expireType",
            minWidth: "90"
          },
          {
            title: "多少个月重置",
            key: "resetMonth",
            minWidth: "100"
          },
          {
            title: "发卡/升降级多少天",
            key: "effectiveDay",
            minWidth: "130"
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
          label: "启用/冻结",
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
        .member_level_getList({
          vm: this,
          data: {
            levelId: this.seachInput,
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
