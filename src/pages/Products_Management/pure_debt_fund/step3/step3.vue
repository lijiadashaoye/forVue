<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div v-if="!isOk" style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isFormLine"
        :rules="rules"
      >
        <el-form-item size="mini" label="费率类型">
          <el-radio-group v-model="ruleForm.type">
            <el-radio-button label="认购"></el-radio-button>
            <el-radio-button label="申购"></el-radio-button>
            <el-radio-button label="赎回"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <hr style="margin:0 0 5px 0;" />

        <div v-show="ruleForm['type']==='认购'">
          <el-form-item label="金额">
            <div class="toFlex">
              <el-select
                class="isInput"
                style="margin-right:10px;"
                clearable
                placeholder="请选择"
                v-model="ruleForm.minAmountSymbol"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="minTransactionAmount" class="isInput">
                <el-input
                  type="number"
                  clearable
                  v-model="ruleForm.minTransactionAmount"
                  placeholder="最小交易金额"
                ></el-input>
              </el-form-item>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.minAmountUnit"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.currency_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="交易金额">
            <div class="toFlex">
              <el-select
                class="isInput"
                style="margin-right:10px;"
                clearable
                placeholder="请选择"
                v-model="ruleForm.maxAmountSymbol"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="maxTransactionAmount" class="isInput">
                <el-input
                  type="number"
                  clearable
                  v-model="ruleForm.maxTransactionAmount"
                  placeholder="最大交易金额"
                ></el-input>
              </el-form-item>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.maxAmountUnit"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.currency_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="费率" prop="rate">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rate"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="单笔费用" prop="cost">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.cost"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
        </div>

        <div v-show="ruleForm['type']==='申购'">
          <el-form-item label="金额">
            <div class="toFlex">
              <el-select
                class="isInput"
                style="margin-right:10px;"
                clearable
                placeholder="请选择"
                v-model="ruleForm.minAmountSymbol2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="minTransactionAmount2" class="isInput">
                <el-input
                  style="margin-right:10px;"
                  type="number"
                  clearable
                  v-model="ruleForm.minTransactionAmount2"
                  placeholder="最小金额"
                ></el-input>
              </el-form-item>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.minAmountUnit2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.currency_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="交易金额">
            <div class="toFlex">
              <el-select
                class="isInput"
                style="margin-right:10px;"
                clearable
                placeholder="请选择"
                v-model="ruleForm.maxAmountSymbol2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="maxTransactionAmount2" class="isInput">
                <el-input
                  style="margin-right:10px;"
                  type="number"
                  clearable
                  v-model="ruleForm.maxTransactionAmount2"
                  placeholder="金额"
                ></el-input>
              </el-form-item>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.maxAmountUnit2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.currency_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="费率" prop="rate2">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rate2"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount2">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount2"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="单笔费用" prop="cost2">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.cost2"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
        </div>

        <div v-show="ruleForm['type']==='赎回'">
          <el-form-item label="赎回期限">
            <div class="toFlex">
              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.minTimeSymbol"
              >
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-form-item prop="minTimeLimit">
                <el-input
                  type="number"
                  clearable
                  v-model="ruleForm.minTimeLimit"
                  placeholder="最大期限"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item label="赎回天数">
            <div class="toFlex">
              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.maxTimeSymbol"
              >
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-form-item prop="maxTimeLimit">
                <el-input
                  type="number"
                  clearable
                  v-model="ruleForm.maxTimeLimit"
                  placeholder="最大期限"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item label="费率" prop="rate3">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rate3"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount3">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount3"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="单笔费用" prop="cost3">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.cost3"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-if="!isOk" class="nextButtons">
      <el-button size="mini" type="primary" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="primary" @click="next">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="back">取消</el-button>
    </div>

    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";

export default {
  components: { hasSuccess },
  data() {
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      isOk: false,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        type: "认购", // 类型（认购/申购）
        // 认购
        rate: "", // 费率
        rateDiscount: "", // 费率折扣
        cost: "", // 单笔费用
        minTransactionAmount: "", // 金额
        minAmountUnit: "", // 金额单位
        minAmountSymbol: "", // 金额符号标识
        maxTransactionAmount: "", // 最大交易金额
        maxAmountUnit: "", // 交易金额单位
        maxAmountSymbol: "", // 交易金额符号标识
        // 申购
        rate2: "", // 费率
        rateDiscount2: "", // 费率折扣
        cost2: "", // 单笔费用
        minTransactionAmount2: "", // 金额
        minAmountUnit2: "", // 金额单位
        minAmountSymbol2: "", // 金额符号标识
        maxTransactionAmount2: "", // 最大交易金额
        maxAmountUnit2: "", // 交易金额单位
        maxAmountSymbol2: "", // 交易金额符号标识
        // 赎回
        rate3: "", // 费率
        rateDiscount3: "", // 费率折扣
        cost3: "", // 单笔费用
        minTimeLimit: "", // 期限
        minTimeSymbol: "", // 期限符号标识
        maxTimeLimit: "", // 天数
        maxTimeSymbol: "" // 天数符号标识
      },
      rules: {
        rate: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount: [{ validator: checkNum3, trigger: "blur" }],
        cost: [{ validator: checkNum2, trigger: "blur" }],

        rate2: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount2: [{ validator: checkNum3, trigger: "blur" }],
        cost2: [{ validator: checkNum2, trigger: "blur" }],

        rate3: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount3: [{ validator: checkNum3, trigger: "blur" }],
        cost3: [{ validator: checkNum2, trigger: "blur" }],

        minTransactionAmount: [{ validator: checkNum2, trigger: "blur" }],
        maxTransactionAmount: [{ validator: checkNum2, trigger: "blur" }],
        minTransactionAmount2: [{ validator: checkNum2, trigger: "blur" }],
        maxTransactionAmount2: [{ validator: checkNum2, trigger: "blur" }],
        minTimeLimit: [{ validator: checkNum2, trigger: "blur" }],
        maxTimeLimit: [{ validator: checkNum2, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增纯债基金第三步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    if (sessionStorage.getItem("chunzhai_step3")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("chunzhai_step3"));
    }
  },
  methods: {
    // 保存
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("chunzhai_step1"));
          let step2 = JSON.parse(sessionStorage.getItem("chunzhai_step2"));
          let obj = {
            institutionId: step1.institutionId,
            institutionName: "",
            fundHouseId: step1.fundHouseId,
            fundHouseName: "",
            name: step1.name,
            code: step1.code,
            status: step1.status,
            statusName: "",
            contentVersion: +step1.contentVersion, // 产品版本标识
            appInfo: {
              shelveStatus: step2.shelveStatus,
              shelveStatusLabel: "",
              recommend: step2.recommend === "是" ? "YES" : "NO",
              visaInterview: step2.visaInterview,
              visaInterviewLabel: "", // 是否面签Label
              homePage: step2.homePage === "是" ? "YES" : "NO",
              defaultBuyNum: +step2.defaultNum,
              defaultAmount: +step2.defaultAmount,
              realNameAuth: step2.realNameAuth === "是" ? "YES" : "NO",
              h5Url: step2.h5Url, // 产品H5链接
              showBankPage: step2.showBankPage === "是" ? "YES" : "NO" // 是否显示银行页
            },
            netValue: {
              // 净值
              netAccumulateValue: +step1.netValue.netAccumulateValue,
              netAssetValue: +step1.netValue.netAssetValue
            },
            //  业绩
            performance: {
              oneDayIncrease: +step1.performance.oneDayIncrease,
              oneYearIncrease: +step1.performance.oneYearIncrease,
              sixMonthIncrease: +step1.performance.sixMonthIncrease,
              threeMonthIncrease: +step1.performance.threeMonthIncrease
            },
            subscribe: {
              // 认购
              rate: +this.ruleForm.rate, //费率
              rateDiscount: +this.ruleForm.rateDiscount, //费率折扣
              cost: +this.ruleForm.cost, //费用
              minTransactionAmount: +this.ruleForm.minTransactionAmount, // 最小交易金额
              minAmountUnit: this.ruleForm.minAmountUnit, // 最小金额单位
              minAmountUnitLabel: "", // 最小金额单位Label
              minAmountSymbol: this.ruleForm.minAmountSymbol, // 最小金额规则符号
              minAmountSymbolLabel: "", //最小金额规则符号

              maxTransactionAmount: +this.ruleForm.maxTransactionAmount, // 最大交易金额
              maxAmountUnit: this.ruleForm.maxAmountUnit, // 最大交易金额单位
              maxAmountUnitLabel: "", //最大交易金额单位Label
              maxAmountSymbol: this.ruleForm.maxAmountSymbol,
              maxAmountSymbolLabel: "" // 最大交易金额规则符号Label
            },
            applyForPurchase: {
              // 申购
              rate: +this.ruleForm.rate2, //费率
              rateDiscount: +this.ruleForm.rateDiscount2, //费率折扣
              cost: +this.ruleForm.cost2, //费用

              minTransactionAmount: +this.ruleForm.minTransactionAmount2, // 最小交易金额
              minAmountUnit: this.ruleForm.minAmountUnit2, // 最小金额单位
              minAmountUnitLabel: "", // 最小金额单位Label
              minAmountSymbol: this.ruleForm.minAmountSymbol2, // 最小金额规则符号
              minAmountSymbolLabel: "", //最小金额规则符号

              maxTransactionAmount: +this.ruleForm.maxTransactionAmount2, // 最大交易金额
              maxAmountUnit: this.ruleForm.maxAmountUnit2, // 最大交易金额单位
              maxAmountUnitLabel: "", //最大交易金额单位Label
              maxAmountSymbol: this.ruleForm.maxAmountSymbol2,
              maxAmountSymbolLabel: "" // 最大交易金额规则符号Label
            },
            redemption: {
              // 赎回
              rate: +this.ruleForm.rate3, //费率
              rateDiscount: +this.ruleForm.rateDiscount3, //费率折扣
              cost: +this.ruleForm.cost3, //费用

              minTimeLimit: +this.ruleForm.minTimeLimit,
              minTimeSymbol: this.ruleForm.minTimeSymbol,
              minTimeSymbolLabel: "", // 最小期限符号标识Label
              maxTimeLimit: +this.ruleForm.maxTimeLimit,
              maxTimeSymbol: this.ruleForm.maxTimeSymbol,
              maxTimeSymbolLabel: "" // 最大期限符号标识Label
            }
          };
          // 机构名称
          obj.institutionName = this.dictData.jigou.filter(item => {
            return item.id === obj.institutionId;
          })[0].name;
          // 基金公司名称
          obj.fundHouseName = this.dictData.jijin.filter(item => {
            return item.id === obj.fundHouseId;
          })[0].name;
          // 交易状态显示名
          obj.statusName = this.dictData.transaction_state.filter(item => {
            return item.value === obj.status;
          })[0].label;

          // 上架状态
          obj.appInfo.shelveStatusLabel = step2.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";
          // 是否面签Label
          obj.appInfo.visaInterviewLabel = step2.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === step2.visaInterview
              )[0].label
            : "";
          // 认购
          // 最小金额单位Label
          if (this.ruleForm.minAmountUnit) {
            obj.subscribe.minAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == this.ruleForm.minAmountUnit
            )[0].label;
          }
          // 最小金额规则符号
          if (this.ruleForm.minAmountSymbol) {
            obj.subscribe.minAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.minAmountSymbol
            )[0].label;
          }
          // 最大交易金额单位
          if (this.ruleForm.maxAmountUnit) {
            obj.subscribe.maxAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == this.ruleForm.maxAmountUnit
            )[0].label;
          }
          // 最大交易金额规则符号Label
          if (this.ruleForm.maxAmountSymbol) {
            obj.subscribe.maxAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.maxAmountSymbol
            )[0].label;
          }
          // 申购
          // 最小金额单位Label
          if (this.ruleForm.minAmountUnit2) {
            obj.applyForPurchase.minAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == this.ruleForm.minAmountUnit2
            )[0].label;
          }
          // 最小金额规则符号
          if (this.ruleForm.minAmountSymbol2) {
            obj.applyForPurchase.minAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.minAmountSymbol2
            )[0].label;
          }
          // 最大交易金额单位Label
          if (this.ruleForm.maxAmountUnit2) {
            obj.applyForPurchase.maxAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == this.ruleForm.maxAmountUnit2
            )[0].label;
          }
          // 最大交易金额规则符号Label
          if (this.ruleForm.maxAmountSymbol2) {
            obj.applyForPurchase.maxAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.maxAmountSymbol2
            )[0].label;
          }
          // 赎回
          // 最小期限符号标识Label
          if (this.ruleForm.minTimeSymbol) {
            obj.redemption.minTimeSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.minTimeSymbol
            )[0].label;
          }
          // 最大期限符号标识Label
          if (this.ruleForm.maxTimeSymbol) {
            obj.redemption.maxTimeSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == this.ruleForm.maxTimeSymbol
            )[0].label;
          }
          this.$api
            .add_chunzhai({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                this.isOk = true;
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "纯债基金管理");
      if (type === "back") {
        this.$router.push({ name: `pure_debt_fund_mainPage` });
      } else {
        this.$router.push({ name: `pure_debt_fund_step1` });
        sessionStorage.removeItem("chunzhai_step1");
        sessionStorage.removeItem("chunzhai_step2");
        sessionStorage.removeItem("chunzhai_step3");
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "pure_debt_fund_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("chunzhai_step3", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "pure_debt_fund_step2"
      });
    }
  }
};
</script>
