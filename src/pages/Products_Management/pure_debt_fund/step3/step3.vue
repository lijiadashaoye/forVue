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

        <div v-show="ruleForm['type']==='认购'">
          <el-form-item label="金额">
            <div class="toFlex">
              <el-form-item prop="amount">
                <el-input
                  style="margin-right:10px;"
                  type="number"
                  clearable
                  v-model="ruleForm.amount"
                  placeholder="最小金额"
                ></el-input>
              </el-form-item>

              <el-select
                style="margin-right:10px;"
                v-model="ruleForm.amountUnit"
                clearable
                placeholder="请选择"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select clearable placeholder="请选择" v-model="ruleForm.amountSymbol">
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
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
                v-model="ruleForm.transactionUnit"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="transaction" class="isInput">
                <el-input type="number" clearable v-model="ruleForm.transaction" placeholder="最大金额"></el-input>
              </el-form-item>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.transactionSymbol"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="isA1">
                <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
              </span>
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
            <span class="isA">%</span>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount"
              placeholder="请输入"
              type="number"
            ></el-input>
            <span class="isA">%</span>
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
              <el-form-item prop="amount2">
                <el-input
                  style="margin-right:10px;"
                  type="number"
                  clearable
                  v-model="ruleForm.amount2"
                  placeholder="最小金额"
                ></el-input>
              </el-form-item>
              <el-select
                style="margin-right:10px;"
                v-model="ruleForm.amountUnit2"
                clearable
                placeholder="请选择"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select clearable placeholder="请选择" v-model="ruleForm.amountSymbol2">
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
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
                v-model="ruleForm.transactionSymbol2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-form-item prop="transaction2" class="isInput">
                <el-input
                  style="margin-right:10px;"
                  type="number"
                  clearable
                  v-model="ruleForm.transaction2"
                  placeholder="金额"
                ></el-input>
              </el-form-item>
              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.transactionUnit2"
              >
                <el-option
                  size="mini"
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="isA1">
                <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
              </span>
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
            <span class="isA">%</span>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount2">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount2"
              placeholder="请输入"
              type="number"
            ></el-input>
            <span class="isA">%</span>
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
              <el-form-item prop="timeLimit">
                <el-input type="number" clearable v-model="ruleForm.timeLimit" placeholder="天数"></el-input>
              </el-form-item>&nbsp;&nbsp;
              <el-select v-model="ruleForm.timeLimitSymbol" clearable placeholder="请选择">
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="赎回天数">
            <div class="toFlex">
              <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.daysSymbol">
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>&nbsp;&nbsp;
              <el-form-item prop="days">
                <el-input type="number" clearable v-model="ruleForm.days" placeholder="天数"></el-input>
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
            <span class="isA">%</span>
          </el-form-item>

          <el-form-item label="费率折扣" prop="rateDiscount3">
            <el-input
              class="isInput"
              clearable
              v-model="ruleForm.rateDiscount3"
              placeholder="请输入"
              type="number"
            ></el-input>
            <span class="isA">%</span>
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
    var checkNum3 = (rule, value, callback) => {
      if (+value < 0) {
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
        amount: "", // 金额
        amountUnit: "", // 金额单位
        amountSymbol: "", // 金额符号标识
        transaction: "", // 交易金额
        transactionUnit: "", // 交易金额单位
        transactionSymbol: "", // 交易金额符号标识
        // 申购
        rate2: "", // 费率
        rateDiscount2: "", // 费率折扣
        cost2: "", // 单笔费用
        amount2: "", // 金额
        amountUnit2: "", // 金额单位
        amountSymbol2: "", // 金额符号标识
        transaction2: "", // 交易金额
        transactionUnit2: "", // 交易金额单位
        transactionSymbol2: "", // 交易金额符号标识
        // 赎回
        rate3: "", // 费率
        rateDiscount3: "", // 费率折扣
        cost3: "", // 单笔费用
        timeLimit: "", // 期限
        timeLimitSymbol: "", // 期限符号标识
        days: "", // 天数
        daysSymbol: "" // 天数符号标识
      },
      shelveList: [
        {
          label: "上架中",
          value: "YES"
        },
        {
          label: "已下架",
          value: "NO"
        }
      ],
      rules: {
        rate: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount: [{ validator: checkNum3, trigger: "blur" }],
        cost: [{ validator: checkNum3, trigger: "blur" }],
        rate2: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount2: [{ validator: checkNum3, trigger: "blur" }],
        cost2: [{ validator: checkNum3, trigger: "blur" }],
        rate3: [{ validator: checkNum3, trigger: "blur" }],
        rateDiscount3: [{ validator: checkNum3, trigger: "blur" }],
        cost3: [{ validator: checkNum3, trigger: "blur" }],
        amount: [{ validator: checkNum3, trigger: "blur" }],
        transaction: [{ validator: checkNum3, trigger: "blur" }],
        amount2: [{ validator: checkNum3, trigger: "blur" }],
        transaction2: [{ validator: checkNum3, trigger: "blur" }],
        timeLimit: [{ validator: checkNum3, trigger: "blur" }],
        days: [{ validator: checkNum3, trigger: "blur" }]
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
        // dailyIncrease: +step1.dailyIncrease,
        appInfo: {
          shelve: step2.shelve === "是" ? "YES" : "NO",
          visaInterview: step2.visaInterview === "是" ? "YES" : "NO",
          recommend: step2.recommend === "是" ? "YES" : "NO",
          homePage: step2.homePage === "是" ? "YES" : "NO",
          defaultBuyNum: +step2.defaultNum,
          defaultAmount: +step2.defaultAmount
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
          amount: +this.ruleForm.amount,
          amountSymbol: this.ruleForm.amountSymbol,
          amountUnit: this.ruleForm.amountUnit,
          transaction: +this.ruleForm.transaction,
          transactionSymbol: this.ruleForm.transactionSymbol,
          transactionUnit: this.ruleForm.transactionUnit,
          amountUnitLabel: "", // 金额单位Label
          amountSymbolLabel: "", // 金额规则符号Label
          transactionUnitLabel: "", // 交易金额单位Label
          transactionSymbolLabel: "" // 交易金额规则符号Label
        },
        applyForPurchase: {
          // 申购
          rate: +this.ruleForm.rate2, //费率
          rateDiscount: +this.ruleForm.rateDiscount2, //费率折扣
          cost: +this.ruleForm.cost2, //费用
          amount: +this.ruleForm.amount2,
          amountSymbol: this.ruleForm.amountSymbol2,
          amountUnit: this.ruleForm.amountUnit2,
          transaction: +this.ruleForm.transaction2,
          transactionSymbol: this.ruleForm.transactionSymbol2,
          transactionUnit: this.ruleForm.transactionUnit2,
          amountUnitLabel: "", // 金额单位Label
          amountSymbolLabel: "", // 金额规则符号Label
          transactionUnitLabel: "", // 交易金额单位Label
          transactionSymbolLabel: "" // 交易金额规则符号Label
        },
        redemption: {
          // 赎回
          rate: +this.ruleForm.rate3, //费率
          rateDiscount: +this.ruleForm.rateDiscount3, //费率折扣
          cost: +this.ruleForm.cost3, //费用
          days: +this.ruleForm.days,
          daysSymbol: this.ruleForm.daysSymbol,
          daysSymbolLabel: "", // 天数符号标识Label
          timeLimit: +this.ruleForm.timeLimit,
          timeSymbol: this.ruleForm.timeLimitSymbol,
          timeSymbolLabel: "" // 期限符号标识Label
        }
      };
      obj.institutionName = this.dictData.jigou.filter(item => {
        return item.id === obj.institutionId;
      })[0].name;
      obj.fundHouseName = this.dictData.jijin.filter(item => {
        return item.id === obj.fundHouseId;
      })[0].name;
      obj.statusName = this.dictData.transaction_state.filter(item => {
        return item.value === obj.status;
      })[0].label;
      // 认购
      if (this.ruleForm.amountUnit) {
        obj.subscribe.amountUnitLabel = this.dictData.monetary_unit.filter(
          item => item.value == this.ruleForm.amountUnit
        )[0].label;
      }
      if (this.ruleForm.amountSymbol) {
        obj.subscribe.amountSymbolLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.amountSymbol
        )[0].label;
      }
      if (this.ruleForm.transactionUnit) {
        obj.subscribe.transactionUnitLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.transactionUnit
        )[0].label;
      }
      if (this.ruleForm.transactionSymbol) {
        obj.subscribe.transactionSymbolLabel = this.dictData.monetary_unit.filter(
          item => item.value == this.ruleForm.transactionSymbol
        )[0].label;
      }
      // 申购
      if (this.ruleForm.amountUnit2) {
        obj.applyForPurchase.amountUnitLabel = this.dictData.monetary_unit.filter(
          item => item.value == this.ruleForm.amountUnit2
        )[0].label;
      }
      if (this.ruleForm.amountSymbol2) {
        obj.applyForPurchase.amountSymbolLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.amountSymbol2
        )[0].label;
      }
      if (this.ruleForm.transactionUnit2) {
        obj.applyForPurchase.transactionUnitLabel = this.dictData.monetary_unit.filter(
          item => item.value == this.ruleForm.transactionUnit2
        )[0].label;
      }
      if (this.ruleForm.transactionSymbol2) {
        obj.applyForPurchase.transactionSymbolLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.transactionSymbol2
        )[0].label;
      }
      // 赎回
      if (this.ruleForm.daysSymbol) {
        obj.redemption.daysSymbolLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.daysSymbol
        )[0].label;
      }
      if (this.ruleForm.timeLimitSymbol) {
        obj.redemption.timeSymbolLabel = this.dictData.rule_symbol.filter(
          item => item.value == this.ruleForm.timeLimitSymbol
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
