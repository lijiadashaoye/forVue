<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div v-if="!isOk" style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item label="监管属性" class="is50" prop="regulatoryProperty">
          <el-select
            filterable
            v-model="ruleForm.regulatoryProperty"
            clearable
            placeholder="请选择"
            class="isInput"
          >
            <el-option
              size="mini"
              v-for="item in dictData.regulatory_property"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同一产品标识" class="is50" prop="sameProductFlag">
          <el-input clearable v-model="ruleForm.sameProductFlag" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="默认关注数量" class="is50" prop="flowNum">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.flowNum"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否上架" class="is50">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.shelveStatus">
            <el-option
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否面签" class="is50">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.visaInterview">
            <el-option
              v-for="item in dictData.visa_interview_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认购买金额" class="is50" prop="defaultAmount">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.defaultAmount"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">
            元
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item label="默认购买笔数" class="is50" prop="defaultNum">
          <el-input
            clearable
            v-model="ruleForm.defaultNum"
            placeholder="请输入"
            class="isInput"
            type="number"
          ></el-input>
          <span class="isA">
            笔
            <i class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
          </span>
        </el-form-item>

        <el-form-item prop="listAreaFlag" label="榜单专区标识" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.listAreaFlag"
          >
            <el-option
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合作方式" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.cooperationMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.cooperation_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行对接方式" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.connectionMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年收费率" class="is50" prop="yearRate">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.yearRate"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="产品区域" class="is50" prop="quyu">
          <el-select filterable class="isInput" clearable placeholder="请选择" v-model="ruleForm.quyu">
            <el-option
              size="mini"
              v-for="item in dictData.quyu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini" label="是否推荐" class="is50">
          <el-radio-group v-model="ruleForm.recommend" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否首页排行" class="is50">
          <el-radio-group v-model="ruleForm.homePage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否实名" class="is50">
          <el-radio-group v-model="ruleForm.realNameAuth" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否显示银行页" class="is50">
          <el-radio-group v-model="ruleForm.showBankPage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否签约" class="is50">
          <el-radio-group v-model="ruleForm.signed" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="自动上架" class="is50">
          <el-radio-group v-model="ruleForm.autoShelve" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div v-if="!isOk" class="nextButtons">
        <el-button size="mini" type="warning" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="primary" @click="next">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>

    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import hasSuccess from "@/components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    var check_yearRate = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100的数字"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm.yearRate = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_defaultAmount = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        this.ruleForm.defaultAmount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      dictData: {},
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        flowNum: "0", // 默认关注数量
        shelveStatus: "yes", // 是否上架
        visaInterview: "no", // 是否面签
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultNum: "0", // 默认购买数量
        defaultAmount: "0.00", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        regulatoryProperty: "", // 监管属性
        realNameAuth: "是", // 是否实名
        showBankPage: "否", // 是否显示银行页
        signed: "否", // 是否签约
        yearRate: "0.00", // 年收费率
        cooperationMode: "unknown", // 合作方式
        connectionMode: "nothing", // 银行对接方式
        h5Url: "", // 产品H5链接
        autoShelve: "否", // 自动上架
        quyu: "100000" // 产品区域
      },
      rules: {
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ],
        quyu: [
          { required: true, message: "请选择产品区域", trigger: "change" }
        ],
        sameProductFlag: [
          { min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        flowNum: [{ validator: checkNum3, trigger: "blur" }],
        yearRate: [{ validator: check_yearRate, trigger: "blur" }],
        defaultNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: check_defaultAmount, trigger: "blur" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第二步"; // 获取页面名称
    if (sessionStorage.getItem("licai_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step2"));
    }
  },

  methods: {
    // 保存
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("licai_step1"));
          let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));
          let obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName,
            seriesId: step1.seriesId,
            seriesName: "",
            name: step1.name,
            minAmount: +step1.purchaseAmount,
            increaseAmount: +step1.increaseAmount,
            interestRate: step1.interestRate,
            productFeature: step1.productFeature,
            productFeatureLabel: "",
            riskLevel: step1.riskLevel,
            riskLevelLabel: "",
            surplusQuota: step1.surplusQuota,
            surplusQuotaLabel: "",
            valueDate: step1.valueDate,
            deadline: +step1.timeLimit,
            managementDate: step1.managementDate,
            raiseDate: step1.raiseDate,
            regulatoryProperty: this.ruleForm.regulatoryProperty,
            regulatoryPropertyLabel: "",
            description: step1.description,
            contentVersion: +step1.contentVersion,
            currencyCode: step1.currencyCode, // 币种编码
            selfDefiningTags: [],
            activityTags: [],
            appInfo: {
              shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview,
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
              homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
              defaultAmount: +this.ruleForm.defaultAmount,
              defaultBuyNum: this.ruleForm.defaultNum
                ? +this.ruleForm.defaultNum
                : 0,
              defaultFlowNum: this.ruleForm.flowNum
                ? +this.ruleForm.flowNum
                : 0,
              listAreaFlag: this.ruleForm.listAreaFlag,
              sameProductFlag: this.ruleForm.sameProductFlag,
              realNameAuth: this.ruleForm.realNameAuth === "否" ? "NO" : "YES",
              listAreaFlagLabel: "",
              signed: this.ruleForm.signed === "否" ? "NO" : "YES",
              cooperationMode: this.ruleForm.cooperationMode,
              cooperationModeLabel: "",
              yearRate: +this.ruleForm.yearRate,
              autoShelve: this.ruleForm.autoShelve === "否" ? "NO" : "YES",
              showBankPage: this.ruleForm.showBankPage === "否" ? "NO" : "YES",
              connectionMode: this.ruleForm.connectionMode,
              connectionModeLabel: "",
              h5Url: this.ruleForm.h5Url,
              areaCode: "",
              areaName: ""
            }
          };

          if (obj.seriesId != "") {
            obj.seriesName = xilieData.name;
          }

          // 产品特性
          obj.productFeatureLabel = obj.productFeature
            ? this.dictData.product_feature_type.filter(
                item => item.value === obj.productFeature
              )[0].label
            : "";
          // 风险
          if (obj.riskLevel) {
            obj.riskLevelLabel = this.dictData.risk_level.filter(
              item => item.value == obj.riskLevel
            )[0].label;
          }

          // 币种
          if (obj.currencyCode) {
            let kk = this.dictData.bizhong.filter(
              tar => tar.value === obj.currencyCode
            )[0];
            obj.currencyName = kk.label;
            obj.currencyUnit = kk.unit;
          }

          if (obj.surplusQuota) {
            obj.surplusQuotaLabel = this.dictData.surplus_quota.filter(
              item => item.value == obj.surplusQuota
            )[0].label;
          }
          // 监管
          if (obj.regulatoryProperty) {
            obj.regulatoryPropertyLabel = this.dictData.regulatory_property.filter(
              item => item.value == obj.regulatoryProperty
            )[0].label;
          }

          // 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";

          // 是否面签Label
          obj.appInfo.visaInterviewLabel = obj.appInfo.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === obj.appInfo.visaInterview
              )[0].label
            : "";

          if (obj.appInfo.listAreaFlag) {
            obj.appInfo.listAreaFlagLabel = this.dictData.list_area_type.filter(
              item => item.value == obj.appInfo.listAreaFlag
            )[0].label;
          }

          // 银行合作方式Label
          obj.appInfo.cooperationModeLabel = obj.appInfo.cooperationMode
            ? this.dictData.cooperation_mode.filter(
                item => item.value === obj.appInfo.cooperationMode
              )[0].label
            : "";

          // 银行对接方式
          obj.appInfo.connectionModeLabel = obj.appInfo.connectionMode
            ? this.dictData.bank_connection_mode.filter(
                item => item.value === obj.appInfo.connectionMode
              )[0].label
            : "";
          // 产品区域
          if (this.ruleForm.quyu) {
            obj.appInfo.areaCode = this.ruleForm.quyu;
            let quyu = this.dictData.quyu;
            wap: for (let i = quyu.length; i--; ) {
              if (quyu[i].value == obj.appInfo.areaCode) {
                obj.appInfo.areaName = quyu[i].label;
                break wap;
              }
            }
          }

          // 获取自定义标签
          if (step1.selfDefiningTags.length > 0) {
            this.dictData.selfDefiningTags.forEach(item => {
              step1.selfDefiningTags.forEach(tar => {
                if (item.id === tar) {
                  obj.selfDefiningTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }
          // 获取活动标签
          if (step1.activityTags.length > 0) {
            this.dictData.activityTags.forEach(item => {
              step1.activityTags.forEach(tar => {
                if (item.id === tar) {
                  obj.activityTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }

          this.$api
            .add_licai({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                sessionStorage.removeItem("licai_step1");
                sessionStorage.removeItem("licai_step2");
                this.isOk = true;
              }
            });
        } else {
          this.$message.error("请输入必填数据！");
        }
      });
    },
    // 提交成功
    isOver(type) {
      sessionStorage.setItem("page", "理财管理 ");
      if (type === "back") {
        this.$router.push({ name: `manage_money_matters_mainPage` });
      } else {
        // 清空新增理财时用到的
        sessionStorage.removeItem("licai_step1");
        sessionStorage.removeItem("licai_step2");
        this.$router.push({ name: `manage_money_matters_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "manage_money_matters_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("licai_step2", JSON.stringify(this.ruleForm));

      this.$router.push({
        name: "manage_money_matters_step1"
      });
    }
  }
};
</script>
