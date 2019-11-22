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

        <el-form-item label="默认购买笔数" class="is50" prop="defaultBuyNum">
          <el-input
            clearable
            v-model="ruleForm.defaultBuyNum"
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

        <el-form-item label="产品区域" class="is50">
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

        <!-- <el-form-item label="自定义斜标签" class="is50" prop="zidingyiMark">
          <el-input clearable v-model="ruleForm.zidingyiMark" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>-->
        <!-- <el-form-item size="mini" label="是否畅销标签" class="is50">
          <el-radio-group v-model="ruleForm.changxiao" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>-->

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
        <el-form-item size="mini" label="显示银行提示页" class="is50">
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

        <el-form-item size="mini" label="到期自动转存" class="is50">
          <el-radio-group v-model="ruleForm.zhuancun" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>
        <!-- <div style="width:100%;">
          <el-form-item label="自定义跳转链接" prop="zidingyiUrl">
            <el-input clearable v-model="ruleForm.zidingyiUrl" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>-->
        <div style="width:100%;">
          <el-form-item label="新手专享推荐理由" prop="newPlayer">
            <el-input
              clearable
              v-model="ruleForm.newPlayer"
              placeholder="请输入"
              type="textarea"
              class="isInput"
            ></el-input>
          </el-form-item>
        </div>
        <div style="width:100%;">
          <el-form-item label="拼团推荐理由" prop="pintuan">
            <el-input
              clearable
              v-model="ruleForm.pintuan"
              placeholder="请输入"
              type="textarea"
              class="isInput"
            ></el-input>
          </el-form-item>
        </div>
        <div style="width:100%;">
          <el-form-item label="产品推荐理由" prop="product">
            <el-input
              clearable
              v-model="ruleForm.product"
              placeholder="请输入"
              type="textarea"
              class="isInput"
            ></el-input>
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
        shelveStatus: "yes", // 上下架
        visaInterview: "no", // 是否面签
        recommend: "否", // 是否推荐
        // changxiao: "否", // 是否畅销标签
        homePage: "否", // 是否首页排行
        defaultBuyNum: "0", // 默认购买数量
        defaultAmount: "0.00", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        regulatoryProperty: "", // 监管属性
        realNameAuth: "是", // 是否实名
        showBankPage: "否", // 显示银行提示页
        signed: "否", // 是否签约
        yearRate: "0.00", // 年收费率
        cooperationMode: "unknown", // 合作方式
        connectionMode: "nothing", // 银行对接方式
        h5Url: "", // 产品H5链接
        zhuancun: "否", // 到期转存
        quyu: "100000", // 产品区域
        // zidingyiUrl: "", // 自定义跳转链接
        // zidingyiMark: "", // 自定义斜标签
        newPlayer: "", // 新手专享推荐理由
        pintuan: "", // 拼团推荐理由
        product: "" // 产品推荐理由
      },
      rules: {
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ],
        sameProductFlag: [
          { min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        flowNum: [{ validator: checkNum3, trigger: "blur" }],
        yearRate: [{ validator: check_yearRate, trigger: "blur" }],
        defaultBuyNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: check_defaultAmount, trigger: "blur" }],
        zidingyiMark: [
          { min: 1, max: 3, message: "最多输入3个字", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增保险产品第二步"; // 获取页面名称
    if (sessionStorage.getItem("baoxian_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("baoxian_step2"));
    }
  },

  methods: {
    // 保存
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("baoxian_step1"));
          let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));
          let obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName,
            fundHouseId: step1.fundHouseId, // 所属基金公司名称
            fundHouseName: "",
            productCompanyName: step1.productHome, // 产品公司名称
            seriesId: step1.seriesId, // 产品系列ID
            seriesName: "",
            name: step1.name, // 产品名称
            minAmount: +step1.purchaseAmount, // 起购金额
            increaseAmount: +step1.increaseAmount, // 递增金额
            interestRate: step1.interestRate, // 预期年化收益率
            riskLevel: step1.riskLevel, // 风险等级
            riskLevelLabel: "",
            surplusQuota: step1.surplusQuota, // 剩余额度
            surplusQuotaLabel: "",
            valueDate: step1.valueDate, // 起息日
            deadline: +step1.timeLimit, // 期限
            managementDate: [step1.valueDate, step1.daoqi], //起息日,到期日
            regulatoryProperty: this.ruleForm.regulatoryProperty, //监管属性
            regulatoryPropertyLabel: "",
            description: step1.description, // 产品描述
            contentVersion: +step1.contentVersion, //  产品版本标识
            currencyCode: step1.currencyCode, // 币种编码
            selfDefiningTags: [],
            activityTags: [],
            period: +step1.qici, // 期次
            revenueType: step1.shouyitype, // 收益类型
            minRedemptionAmount: +step1.minShuHui, //  最小赎回金额
            maxRedemptionAmount: +step1.maxShuHui, //  最大赎回金额
            singleDayAmount: +step1.dayMaxShuHui, //  单日最大赎回金额
            surplusAmountPercentage: +step1.eduBi, //  产品剩余额度百分比
            maxReturnInterval: +step1.maxInterestRate, //  产品收益区间最大值
            interestBasis: +step1.jixiBase, //  计息基础
            settlementDay: step1.qingsuan, //  产品清算日
            renewal: this.ruleForm.zhuancun === "否" ? "NO" : "YES", // 到期转存
            insuranceFinancing: {
              // 保险理财详情表
              netAssetValue: +step1.netAssetValue, // 单位净值
              netAccumulateValue: +step1.netAccumulateValue, // 累计净值
              bottomGuardYield: +step1.baodi, // 保底收益
              onThe7thOfTheYearYield: +step1.onThe7thOfTheYearYield, // 七日年化收益率
              thousandsOfYearsYields: +step1.thousandsOfYearsYields // 万分收益率
            },
            appInfo: {
              shelveStatus: this.ruleForm.shelveStatus, // 上下架
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview, // 是否面签
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "否" ? "NO" : "YES", // 是否推荐
              homePage: this.ruleForm.homePage === "否" ? "NO" : "YES", // 是否首页排行
              defaultAmount: +this.ruleForm.defaultAmount, // 默认购买金额
              defaultBuyNum: this.ruleForm.defaultBuyNum // 默认购买数量
                ? +this.ruleForm.defaultBuyNum
                : 0,
              defaultFlowNum: this.ruleForm.flowNum // 默认关注数量
                ? +this.ruleForm.flowNum
                : 0,
              listAreaFlag: this.ruleForm.listAreaFlag, // 榜单专区标识
              listAreaFlagLabel: "",
              sameProductFlag: this.ruleForm.sameProductFlag, // 同一产品标识
              realNameAuth: this.ruleForm.realNameAuth === "否" ? "NO" : "YES", // 是否实名
              signed: this.ruleForm.signed === "否" ? "NO" : "YES", // 是否签约
              cooperationMode: this.ruleForm.cooperationMode, // 合作方式
              cooperationModeLabel: "",
              yearRate: +this.ruleForm.yearRate, // 年收费率
              showBankPage: this.ruleForm.showBankPage === "否" ? "NO" : "YES", // 显示银行提示页
              connectionMode: this.ruleForm.connectionMode, // 银行对接方式
              connectionModeLabel: "",
              h5Url: this.ruleForm.h5Url, // 产品H5链接
              areaCode: "", // 区域编码
              areaName: "",
              isAllowPurchase: step1.canShenGou === "否" ? "NO" : "YES", // 是否可以申购
              isAllowRedeem: step1.canShuHui === "否" ? "NO" : "YES", // 是否可以赎回
              noviceVipReason: this.ruleForm.newPlayer, // 新手专享推荐理由
              assembleReason: this.ruleForm.pintuan, // 拼团推荐理由
              productReason: this.ruleForm.product // 产品推荐理由
            }
          };
          if (obj.seriesId != "") {
            obj.seriesName = xilieData.name;
          }
          // 基金
          obj.fundHouseName = obj.fundHouseId
            ? this.dictData.jijin.filter(item => item.id === obj.fundHouseId)[0]
                .name
            : "";

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
          // 剩余额度
          if (obj.surplusQuota) {
            obj.surplusQuotaLabel = this.dictData.surplus_quota.filter(
              item => item.value == obj.surplusQuota
            )[0].label;
          }
          // 监管属性
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
          // 榜单专区标识
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
            .add_baoxian({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                sessionStorage.removeItem("baoxian_step1");
                sessionStorage.removeItem("baoxian_step2");
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
        sessionStorage.removeItem("baoxian_step1");
        sessionStorage.removeItem("baoxian_step2");
        this.$router.push({ name: `baoxian_step1` });
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
      sessionStorage.setItem("baoxian_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "baoxian_step1"
      });
    }
  }
};
</script>
