<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div
      v-if="!isOk"
      style="overflow:auto;"
    >
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isFormLine"
      >

        <el-form-item
          size="mini"
          label="费率类型"
        >
          <el-radio-group v-model="ruleForm.type">
            <el-radio-button label="认购"></el-radio-button>
            <el-radio-button label="申购"></el-radio-button>
            <el-radio-button label="赎回"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <div v-show='ruleForm["type"]==="认购"'>
          <el-form-item label="金额">
            <div class="toFlex">
              <el-input
                style="margin-right:10px;"
                type='number'
                clearable
                v-model="ruleForm.subscribe.amount"
                placeholder="最小金额"
              ></el-input>
              <el-select
                style="margin-right:10px;"
                v-model="ruleForm.subscribe.amountUnit"
                clearable
                placeholder="请选择"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                clearable
                placeholder="请选择"
                v-model="ruleForm.subscribe.amountSymbol"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
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
                v-model="ruleForm.subscribe.transactionUnit"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                class="isInput"
                style="margin-right:10px;"
                type='number'
                clearable
                v-model="ruleForm.subscribe.transaction"
                placeholder="最大金额"
              ></el-input>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.subscribe.transactionSymbol"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span class="isA1">
                <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
              </span>
            </div>
          </el-form-item>
        </div>

        <div v-show='ruleForm["type"]==="申购"'>
          <el-form-item label="金额">
            <div class="toFlex">
              <el-input
                style="margin-right:10px;"
                type='number'
                clearable
                v-model="ruleForm.applyForPurchase.amount"
                placeholder="最小金额"
              ></el-input>

              <el-select
                style="margin-right:10px;"
                v-model="ruleForm.applyForPurchase.amountUnit"
                clearable
                placeholder="请选择"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                clearable
                placeholder="请选择"
                v-model="ruleForm.applyForPurchase.amountSymbol"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
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
                v-model="ruleForm.applyForPurchase.transactionSymbol"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                class="isInput"
                style="margin-right:10px;"
                type='number'
                clearable
                v-model="ruleForm.applyForPurchase.transaction"
                placeholder="金额"
              ></el-input>

              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.applyForPurchase.transactionUnit"
              >
                <el-option
                  size='mini'
                  v-for="item in dictData.monetary_unit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span class="isA1">
                <i class="myIcon14px icon-wenhaoyuanyiwenxianxing isA1"></i>
              </span>
            </div>
          </el-form-item>
        </div>

        <div v-show='ruleForm["type"]==="赎回"'>
          <el-form-item label="赎回期限">

            <div class="toFlex">
              <el-input
                type='number'
                clearable
                v-model="ruleForm.redemption.timeLimit"
                placeholder="天数"
              ></el-input>&nbsp;&nbsp;

              <el-select
                v-model="ruleForm.redemption.timeLimitSymbol"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="赎回天数">
            <div class="toFlex">
              <el-select
                class="isInput"
                clearable
                placeholder="请选择"
                v-model="ruleForm.redemption.daysSymbol"
              >
                <el-option
                  v-for="item in dictData.rule_symbol"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              &nbsp;&nbsp;
              <el-input
                type='number'
                clearable
                v-model="ruleForm.redemption.days"
                placeholder="天数"
              ></el-input>

            </div>
          </el-form-item>
        </div>

        <el-form-item label="费率">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.rate"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="费率折扣">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.rateDiscount"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="单笔费用">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.cost"
            placeholder="请输入"
            type='number'
          ></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div
      v-if="!isOk"
      class="nextButtons"
    >
      <el-button
        size="mini"
        type="primary"
        @click="before"
      >上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="primary"
        @click="next"
      >保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="info"
        @click="back"
      >取消</el-button>
    </div>

    <hasSuccess
      @isOver="isOver"
      v-if="isOk"
    />
  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";

export default {
  components: { hasSuccess },
  data() {
    return {
      isOk: false,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        type: "认购", // 类型（认购/申购）
        rate: "", // 费率
        rateDiscount: "", // 费率折扣
        cost: "", // 单笔费用
        applyForPurchase: {
          // 申购
          amount: "", // 金额
          amountUnit: "", // 金额单位
          amountSymbol: "", // 金额符号标识
          transaction: "", // 交易金额
          transactionUnit: "", // 交易金额单位
          transactionSymbol: "" // 交易金额符号标识
        },
        subscribe: {
          // 认购
          amount: "", // 金额
          amountUnit: "", // 金额单位
          amountSymbol: "", // 金额符号标识
          transaction: "", // 交易金额
          transactionUnit: "", // 交易金额单位
          transactionSymbol: "" // 交易金额符号标识
        },
        redemption: {
          // 赎回
          timeLimit: "", // 期限
          timeLimitSymbol: "", // 期限符号标识
          days: "", // 天数
          daysSymbol: "" // 天数符号标识
        }
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
      ]
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
        dailyIncrease: +step1.dailyIncrease,
        appInfo: {
          shelve: step2.shelve === "是" ? "YES" : "NO",
          visaInterview: step2.visaInterview === "是" ? "YES" : "NO",
          recommend: step2.recommend === "是" ? "YES" : "NO",
          homePage: step2.homePage === "是" ? "YES" : "NO",
          defaultNum: +step2.defaultNum,
          defaultAmount: +step2.defaultAmount
        },
        netValue: {
          netAccumulateValue: +step1.netValue.netAccumulateValue,
          netAssetValue: +step1.netValue.netAssetValue
        }, // 净值
        performance: {
          oneDayIncrease: +step1.performance.oneDayIncrease,
          oneYearIncrease: +step1.performance.oneYearIncrease,
          sixMonthIncrease: +step1.performance.sixMonthIncrease,
          threeMonthIncrease: +step1.performance.threeMonthIncrease
        }, //  业绩
        applyForPurchase: {
          // 申购
          amount: +this.ruleForm.applyForPurchase.amount,
          amountSymbol: this.ruleForm.applyForPurchase.amountSymbol,
          amountUnit: this.ruleForm.applyForPurchase.amountUnit,
          transaction: +this.ruleForm.applyForPurchase.transaction,
          transactionSymbol: this.ruleForm.applyForPurchase.transactionSymbol,
          transactionUnit: this.ruleForm.applyForPurchase.transactionUnit
        },
        subscribe: {
          // 认购
          amount: +this.ruleForm.subscribe.amount,
          amountSymbol: this.ruleForm.subscribe.amountSymbol,
          amountUnit: this.ruleForm.subscribe.amountUnit,
          transaction: +this.ruleForm.subscribe.transaction,
          transactionSymbol: this.ruleForm.subscribe.transactionSymbol,
          transactionUnit: this.ruleForm.subscribe.transactionUnit
        },
        redemption: {
          days: +this.ruleForm.redemption.days,
          daysSymbol: this.ruleForm.redemption.daysSymbol,
          timeLimit: +this.ruleForm.redemption.timeLimit,
          timeLimitSymbol: this.ruleForm.redemption.timeLimitSymbol
        } // 赎回
      };
      obj.institutionName = this.dictData.jigou.filter(item => {
        return item.id === obj.institutionId;
      })[0].name;
      obj.fundHouseName = this.dictData.jijin.filter(item => {
        return item.id === obj.fundHouseId;
      })[0].name;
      obj.statusName = this.dictData.transaction_state.filter(item => {
        return item.id === obj.status;
      })[0].label;
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
