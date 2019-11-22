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
        width="800px"
        :before-close="dialogClose"
      >
        <p style="font-weight:bold;">变量统一填写X</p>
        <el-form
          :rules="rules"
          ref="ruleForm"
          size="mini"
          :model="ruleForm"
          label-width="160px"
          label-suffix=":"
          class="isForm"
          style="width:100%;padding-top: 0;"
        >
          <el-form-item label="投资币种" prop="investmentCurrency">
            <el-select filterable clearable placeholder="请选择" v-model="ruleForm.investmentCurrency">
              <el-option
                size="mini"
                v-for="item in dictData.bizhong"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提前终止权" prop="earlyEnd">
            <el-input clearable placeholder="请输入" v-model="ruleForm.earlyEnd"></el-input>
          </el-form-item>
          <el-form-item label="项目不成立" prop="projectNotEstablished">
            <el-input clearable placeholder="请输入" v-model="ruleForm.projectNotEstablished"></el-input>
          </el-form-item>
          <el-form-item label="收益计算方式" prop="rateCalculationMethod">
            <el-input clearable placeholder="请输入" v-model="ruleForm.rateCalculationMethod"></el-input>
          </el-form-item>
          <el-form-item label="本金及投资收益支付" prop="principalInvestmentPay">
            <el-input clearable placeholder="请输入" v-model="ruleForm.principalInvestmentPay"></el-input>
          </el-form-item>
          <el-form-item label="本项目见证机构" prop="witnessInstitution">
            <el-input clearable placeholder="请输入" v-model="ruleForm.witnessInstitution"></el-input>
          </el-form-item>
          <el-form-item label="技术方案提供商" prop="technicalProvider">
            <el-input clearable placeholder="请输入" v-model="ruleForm.technicalProvider"></el-input>
          </el-form-item>
          <el-form-item label="本项目清算机构" prop="clearingHouse">
            <el-input clearable placeholder="请输入" v-model="ruleForm.clearingHouse"></el-input>
          </el-form-item>
          <el-form-item label="节假日" prop="holiday">
            <el-input clearable placeholder="请输入" v-model="ruleForm.holiday"></el-input>
          </el-form-item>
          <el-form-item label="税款" prop="taxes">
            <el-input clearable placeholder="请输入" v-model="ruleForm.taxes"></el-input>
          </el-form-item>
          <el-form-item label="超募" prop="overSubscription">
            <el-input clearable placeholder="请输入" v-model="ruleForm.overSubscription"></el-input>
          </el-form-item>
          <el-form-item label="最小投资单位" prop="minInvestmentUnit">
            <el-input clearable placeholder="请输入" v-model="ruleForm.minInvestmentUnit"></el-input>
          </el-form-item>
          <el-form-item label="投标期" prop="tenderPeriod">
            <el-input clearable placeholder="请输入" v-model="ruleForm.tenderPeriod"></el-input>
          </el-form-item>
          <el-form-item label="发行规模" prop="issuingScale">
            <el-input clearable placeholder="请输入" v-model="ruleForm.issuingScale"></el-input>
          </el-form-item>
          <el-form-item label="起息日" prop="interestDate">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.interestDate"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="到期日" prop="dueDate">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.dueDate"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="约定还款日" prop="agreedRepaymentDate">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.agreedRepaymentDate"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="资金到账日" prop="fundArrivalDate">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.fundArrivalDate"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogAction(true)">保 存</el-button>
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
      dictData: null,
      dialog: {
        // 弹出框的控制
        show: false,
        title: ""
      },
      //修改、添加
      ruleForm: {
        investmentCurrency: "", // 投资币种
        earlyEnd: "", // 提前终止权
        fundArrivalDate: "", // 资金到账日
        projectNotEstablished: "", // 项目不成立
        rateCalculationMethod: "", // 收益计算方式
        principalInvestmentPay: "", // 本金及投资收益支付
        witnessInstitution: "", // 本项目见证机构
        technicalProvider: "", // 技术方案提供商
        clearingHouse: "", // 本项目清算机构
        holiday: "", // 节假日
        taxes: "", // 税款
        overSubscription: "", // 超募
        minInvestmentUnit: "", // 最小投资单位
        tenderPeriod: "", // 投标期
        interestDate: "", // 起息日
        agreedRepaymentDate: "", // 约定还款日
        dueDate: "", // 到期日
        issuingScale: "" // 发行规模
      },
      rules: {
        investmentCurrency: [
          { required: true, message: "请输入投资币种", trigger: "change" }
        ],
        earlyEnd: [
          { required: true, message: "请输入提前终止权", trigger: "blur" }
        ],
        fundArrivalDate: [
          { required: true, message: "请输入资金到账日", trigger: "change" }
        ],
        projectNotEstablished: [
          { required: true, message: "请输入项目不成立", trigger: "blur" }
        ],
        rateCalculationMethod: [
          { required: true, message: "请输入收益计算方式", trigger: "blur" }
        ],
        principalInvestmentPay: [
          {
            required: true,
            message: "请输入本金及投资收益支付",
            trigger: "blur"
          }
        ],
        witnessInstitution: [
          { required: true, message: "请输入本项目见证机构", trigger: "blur" }
        ],
        technicalProvider: [
          { required: true, message: "请输入技术方案提供商", trigger: "blur" }
        ],
        clearingHouse: [
          { required: true, message: "请输入本项目清算机构", trigger: "blur" }
        ],
        holiday: [{ required: true, message: "请输入节假日", trigger: "blur" }],
        taxes: [{ required: true, message: "请输入税款", trigger: "blur" }],
        overSubscription: [
          { required: true, message: "请输入超募", trigger: "blur" }
        ],
        minInvestmentUnit: [
          { required: true, message: "请输入最小投资单位", trigger: "blur" }
        ],
        tenderPeriod: [
          { required: true, message: "请输入投标期", trigger: "blur" }
        ],
        interestDate: [
          { required: true, message: "请输入起息日", trigger: "change" }
        ],
        agreedRepaymentDate: [
          { required: true, message: "请输入约定还款日", trigger: "change" }
        ],
        dueDate: [
          { required: true, message: "请输入到期日", trigger: "change" }
        ],
        issuingScale: [
          { required: true, message: "请输入发行规模", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    // 关闭弹框
    dialogClose() {
      this.$refs.ruleForm.resetFields();
      this.dialog.show = false;
      this.ruleForm = {};
      this.seachInput = "";
    },
    // 弹出框的操作，true保存
    dialogAction(type) {
      if (type) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let qixi = new Date(this.ruleForm.interestDate),
              daoqi = new Date(this.ruleForm.dueDate),
              huankuan = new Date(this.ruleForm.agreedRepaymentDate),
              daozhang = new Date(this.ruleForm.fundArrivalDate);

            if (daoqi > huankuan) {
              this.$message.error("到期日不能晚于约定还款日！");
              return;
            }
            if (qixi > daoqi) {
              this.$message.error("起息日不能晚于到期日！");
              return;
            }
            if (huankuan > daozhang) {
              this.$message.error("约定还款日不能晚于资金到账日！");
              return;
            }
            let httpType = "";
            if (this.ruleForm.hasOwnProperty("id")) {
              httpType = "put";
            } else {
              httpType = "post";
            }

            this.$api
              .add_project_description({
                vm: this,
                httpType: httpType,
                data: this.ruleForm
              })
              .then(res => {
                if (res) {
                  this.$message.success(`${this.dialog.title}成功！`);
                  this.getUserData();
                  this.dialogClose();
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
              .get_project_description({
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
                  .get_project_description({
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
                this.seachInput = "";
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
        this.dialog.title = "新增项目说明书";
      } else {
        this.dialog.title = "修改项目说明书";
        this.$api
          .get_project_description({
            vm: this,
            httpType: "get",
            id: inData.id
          })
          .then(res => {
            if (res) {
              this.ruleForm = res.data;
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
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item),
            obj = {};
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "investmentCurrency") {
              obj["bizhong"] = this.dictData.bizhong.filter(
                item => item.value == obj[str]
              )[0].label;
            }
          });
          return obj;
        });

        this.tableInputData.data.title = [
          {
            title: "ID",
            key: "id",
            minWidth: "80"
          },
          {
            title: "投资币种",
            key: "bizhong",
            minWidth: "100"
          },
          {
            title: "提前终止权",
            key: "earlyEnd",
            minWidth: "100"
          },
          {
            title: "资金到账日",
            key: "fundArrivalDate",
            minWidth: "100"
          },
          {
            title: "项目不成立",
            key: "projectNotEstablished",
            minWidth: "100"
          },
          {
            title: "收益计算方式",
            key: "rateCalculationMethod",
            minWidth: "100"
          },
          {
            title: "本金及投资收益支付",
            key: "principalInvestmentPay",
            minWidth: "150"
          },
          {
            title: "本项目见证机构",
            key: "witnessInstitution",
            minWidth: "110"
          },
          {
            title: "技术方案提供商",
            key: "technicalProvider",
            minWidth: "110"
          },
          {
            title: "本项目清算机构",
            key: "clearingHouse",
            minWidth: "110"
          },
          {
            title: "节假日",
            key: "holiday",
            minWidth: "100"
          },
          {
            title: "税款",
            key: "taxes",
            minWidth: "100"
          },
          {
            title: "超募",
            key: "overSubscription",
            minWidth: "100"
          },
          {
            title: "最小投资单位",
            key: "minInvestmentUnit",
            minWidth: "100"
          },
          {
            title: "投标期",
            key: "tenderPeriod",
            minWidth: "100"
          },
          {
            title: "起息日",
            key: "interestDate",
            minWidth: "100"
          },
          {
            title: "约定还款日",
            key: "agreedRepaymentDate",
            minWidth: "100"
          },
          {
            title: "到期日",
            key: "dueDate",
            minWidth: "100"
          },
          {
            title: "发行规模",
            key: "issuingScale",
            minWidth: "100"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "100"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
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

      this.$api.get_project_description_list(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
