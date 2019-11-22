<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="170px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="institutionId" label="机构名称" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            @change="change_xilie(ruleForm.institutionId,true)"
            placeholder="请选择"
            v-model="ruleForm.institutionId"
          >
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <a class="isAClick" @click="toJiGou">无机构？</a>
        </el-form-item>

        <el-form-item label="产品系列" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.seriesId"
            @change="setXiLie(ruleForm.seriesId)"
          >
            <el-option
              size="mini"
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <a class="isAClick" @click="toXiLie">无产品系列？</a>
        </el-form-item>

        <hr />

        <el-form-item prop="fundHouseId" label="基金公司" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.fundHouseId"
          >
            <el-option
              size="mini"
              v-for="item in dictData.jijin"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <a class="isAClick" @click="toJiJin">无基金公司？</a>
        </el-form-item>

        <el-form-item label="产品公司名称" prop="productHome" class="is50">
          <el-input class="isInput" clearable v-model="ruleForm.productHome" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="产品名称" prop="name" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item size="mini" label="是否允许申购" class="is50">
          <el-radio-group v-model="ruleForm.canShenGou" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="起购金额" class="is50" prop="purchaseAmount">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.purchaseAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="递增金额" prop="increaseAmount" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="最大申购金额" prop="maxBuy" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.maxBuy"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item class="is50" label="预期年化收益率" prop="interestRate">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.interestRate"
            placeholder="请输入"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item class="is50" label="保底收益率" prop="baodi">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.baodi"
            placeholder="请输入"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item class="is50" label="产品收益率区间最大值" prop="maxInterestRate">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.maxInterestRate"
            placeholder="请输入"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="7日年化收益率" class="is50" prop="onThe7thOfTheYearYield">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.onThe7thOfTheYearYield"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="万份年化收益" class="is50" prop="thousandsOfYearsYields">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.thousandsOfYearsYields"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="单位净值" class="is50" prop="netAssetValue">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.netAssetValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="累计净值" class="is50" prop="netAccumulateValue">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.netAccumulateValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="风险等级" class="is50" prop="riskLevel">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.riskLevel"
          >
            <el-option
              size="mini"
              v-for="item in dictData.risk_level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品版本标识" prop="contentVersion" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.contentVersion"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="自定义标签" class="is50">
          <el-select
            filterable
            class="isInput"
            v-model="ruleForm.selfDefiningTags"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size="mini"
              v-for="item in dictData.selfDefiningTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动标签" class="is50">
          <el-select
            filterable
            class="isInput"
            v-model="ruleForm.activityTags"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              size="mini"
              v-for="item in dictData.activityTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item size="mini" label="继承系列的活动标签" class="is50">
          <el-radio-group v-model="ruleForm.jicheng" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>-->

        <el-form-item size="mini" label="是否允许赎回" class="is50">
          <el-radio-group v-model="ruleForm.canShuHui" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="最小赎回金额" prop="minShuHui" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.minShuHui"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大赎回金额" prop="maxShuHui" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.maxShuHui"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="单日最大赎回金额" prop="dayMaxShuHui" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.dayMaxShuHui"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="产品剩余额度百分比" prop="eduBi" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.eduBi"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="计息基础" prop="jixiBase" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.jixiBase"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="起息日期" class="is50" prop="valueDate">
          <el-date-picker
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="isInput"
            v-model="ruleForm.valueDate"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="到期日期" class="is50" prop="daoqi">
          <el-date-picker
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="isInput"
            v-model="ruleForm.daoqi"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="产品结算日" class="is50" prop="qingsuan">
          <el-date-picker
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="isInput"
            v-model="ruleForm.qingsuan"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="剩余额度" prop="surplusQuota" class="is50">
          <el-select
            filterable
            class="isInput"
            v-model="ruleForm.surplusQuota"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in dictData.surplus_quota"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期限" prop="timeLimit" class="is50">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.timeLimit"
            placeholder="请输入"
          ></el-input>
          <span class="isA">天</span>
        </el-form-item>
        <el-form-item label="币种" style="position:relative" class="is50" prop="currencyCode">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.currencyCode">
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期次" prop="qici" class="is50">
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.qici"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="收益类型" style="position:relative" class="is50" prop="shouyitype">
          <!-- <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.shouyitype">
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input class="isInput" clearable v-model="ruleForm.shouyitype" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="产品描述" style="text-align:left;width:100%;margin-right:30px;">
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>
      </el-form>
      <div class="nextButtons">
        <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import EditorBar from "@/components/wangEnduit";

export default {
  components: { EditorBar },
  data() {
    // 验证最大申购额
    var check_maxBuy = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
      } else if (
        +this.ruleForm.purchaseAmount &&
        +this.ruleForm.maxBuy < +this.ruleForm.purchaseAmount
      ) {
        callback(new Error("最大申购金额不能小于起购金额！"));
      } else {
        this.ruleForm.maxBuy = (+value).toFixed(2);
        callback();
      }
    };
    // 验证起购额
    var check_purchaseAmount = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
      } else if (
        +this.ruleForm.maxBuy &&
        +this.ruleForm.maxBuy < +this.ruleForm.purchaseAmount
      ) {
        callback(new Error("起购金额不能大于最大申购金额！"));
      } else {
        this.ruleForm.purchaseAmount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_increaseAmount = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.increaseAmount = (+value).toFixed(2);
        callback();
      }
    };

    // 验证数字
    var check_interestRate = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        let reg = /\./;
        if (reg.test("" + value)) {
          let val = ("" + value).split(".")[1];
          if (val.length > 4) {
            callback(new Error("最多输入4位！"));
            this.ruleForm.interestRate = (+value).toFixed(4);
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };
    // 验证数字
    var check_baodi = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        let reg = /\./;
        if (reg.test("" + value)) {
          let val = ("" + value).split(".")[1];
          if (val.length > 4) {
            callback(new Error("最多输入4位！"));
            this.ruleForm.baodi = (+value).toFixed(4);
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };

    var check_maxInterestRate = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100正数"));
      } else {
        let reg = /\./;
        if (reg.test("" + value)) {
          let val = ("" + value).split(".")[1];
          if (val.length > 4) {
            callback(new Error("最多输入4位！"));
            this.ruleForm.maxInterestRate = (+value).toFixed(4);
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };

    var checkNum3 = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.timeLimit = (+value).toFixed(0);
        callback();
      }
    };
    // 验证数字
    var checkNum4 = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || !+value) {
        callback(new Error("请输入0--100正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.onThe7thOfTheYearYield = "0.0000";
        callback();
      } else {
        this.ruleForm.onThe7thOfTheYearYield = (+value).toFixed(4);
        callback();
      }
    };
    // 验证数字
    var checkNum5 = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || !+value) {
        callback(new Error("请输入0--100正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.thousandsOfYearsYields = "0.0000";
        callback();
      } else {
        this.ruleForm.thousandsOfYearsYields = (+value).toFixed(4);
        callback();
      }
    };

    // 验证数字
    var checkNum6 = (rule, value, callback) => {
      if (+value <= 0) {
        callback(new Error("请输入大于0的值"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.netAssetValue = "0.0000";
        callback();
      } else {
        this.ruleForm.netAssetValue = (+value).toFixed(4);
        callback();
      }
    };
    // 验证数字
    var checkNum7 = (rule, value, callback) => {
      if (+value <= 0) {
        callback(new Error("请输入大于0的值"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.netAccumulateValue = "0.0000";
        callback();
      } else {
        this.ruleForm.netAccumulateValue = (+value).toFixed(4);
        callback();
      }
    };

    // 验证数字
    var check_minShuHui = (rule, value, callback) => {
      if (+value <= 0) {
        callback(new Error("请输入大于0的值"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.minShuHui = "0.00";
        callback();
      } else if (
        +this.ruleForm.maxShuHui &&
        +value > +this.ruleForm.maxShuHui
      ) {
        callback(new Error("不能大于最大赎回金额！"));
      } else {
        this.ruleForm.minShuHui = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_maxShuHui = (rule, value, callback) => {
      if (+value <= 0) {
        callback(new Error("请输入大于0的值"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.maxShuHui = "0.00";
        callback();
      } else if (
        +this.ruleForm.minShuHui &&
        +value < +this.ruleForm.minShuHui
      ) {
        callback(new Error("不能小于最小赎回金额！"));
      } else {
        this.ruleForm.maxShuHui = (+value).toFixed(2);
        callback();
      }
    };
    var check_dayMaxShuHui = (rule, value, callback) => {
      if (+value <= 0) {
        callback(new Error("请输入大于0的值"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.dayMaxShuHui = "0.00";
        callback();
      } else if (
        +this.ruleForm.maxShuHui &&
        +value > +this.ruleForm.maxShuHui
      ) {
        callback(new Error("不能大于最大赎回金额！"));
      } else {
        this.ruleForm.dayMaxShuHui = (+value).toFixed(2);
        callback();
      }
    };

    var checkNum8 = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.qici = (+value).toFixed(0);
        callback();
      }
    };

    var checkNum9 = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || !value) {
        callback(new Error("请输入0--100正数"));
      } else {
        this.ruleForm.eduBi = (+value).toFixed(2);
        callback();
      }
    };

    return {
      env: null,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列ID
        fundHouseId: "", // 所属基金公司名称
        name: "", // 产品名称
        purchaseAmount: "0.00", // 起购金额
        increaseAmount: "0.00", // 递增金额
        maxBuy: "0.00", // 最大申购额
        interestRate: "0.00", // 预期年化收益率
        baodi: "0.00", // 保底收益率
        maxInterestRate: "0.00", // 产品收益率区间最大值
        riskLevel: "", // 风险等级
        surplusQuota: "", // 剩余额度
        valueDate: "", // 起息日
        timeLimit: "", // 期限
        daoqi: "", // 到期日
        description: "", // 产品描述
        currencyCode: "CNY", // 币种
        contentVersion: "", //  产品版本标识
        selfDefiningTags: [], // 自定义标签
        activityTags: [], // 活动标签
        onThe7thOfTheYearYield: "0.0000", // 七日年化收益率
        thousandsOfYearsYields: "0.0000", // 万份年化收益率
        netAssetValue: "0.0000", // 单位净值
        netAccumulateValue: "0.0000", // 累计净值
        shouyitype: "", // 收益类型
        qici: "", // 期次
        // jicheng: "否", // 继承系列的活动标签
        canShenGou: "是", // 是否可以申购
        canShuHui: "是", // 是否可以赎回
        minShuHui: "0.00", // 最小赎回金额
        maxShuHui: "0.00", // 最大赎回金额
        dayMaxShuHui: "0.00", // 单日最大赎回金额
        eduBi: "0.00", // 产品剩余额度百分比
        jixiBase: "", // 计息基础
        qingsuan: "", // 产品结算日
        productHome: "" // 产品公司名称
      },
      xilie: [], // 从服务器返回的产品系列数据
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        valueDate: [
          { required: true, message: "请输入起息日期", trigger: "blur" }
        ],
        daoqi: [{ required: true, message: "请输入到期日期", trigger: "blur" }],
        qingsuan: [
          { required: true, message: "请输入清算日期", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        increaseAmount: [
          { validator: check_increaseAmount, trigger: "blur" },
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ],
        purchaseAmount: [
          { validator: check_purchaseAmount, trigger: "blur" },
          { required: true, message: "请输入起购金额", trigger: "blur" }
        ],
        interestRate: [
          { validator: check_interestRate, trigger: "blur" },
          { required: true, message: "请输入预期年化收益率", trigger: "blur" }
        ],
        baodi: [
          { validator: check_baodi, trigger: "blur" },
          { required: true, message: "请输入保底收益率", trigger: "blur" }
        ],
        maxInterestRate: [
          { validator: check_maxInterestRate, trigger: "blur" },
          {
            required: true,
            message: "请输入产品收益率最大值",
            trigger: "blur"
          }
        ],
        maxBuy: [
          { validator: check_maxBuy, trigger: "blur" },
          { required: true, message: "请输入最大申购额", trigger: "blur" }
        ],
        surplusQuota: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        timeLimit: [{ required: true, validator: checkNum3, trigger: "blur" }],
        qici: [{ required: true, validator: checkNum8, trigger: "blur" }],
        riskLevel: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        shouyitype: [
          { required: true, message: "请选择收益类型", trigger: "change" }
        ],
        onThe7thOfTheYearYield: [{ validator: checkNum4, trigger: "blur" }],
        thousandsOfYearsYields: [{ validator: checkNum5, trigger: "blur" }],
        netAssetValue: [{ validator: checkNum6, trigger: "blur" }],
        netAccumulateValue: [{ validator: checkNum7, trigger: "blur" }],
        minShuHui: [
          { validator: check_minShuHui, trigger: "blur" },
          { required: true, message: "请输入最小赎回金额", trigger: "blur" }
        ],
        maxShuHui: [
          { validator: check_maxShuHui, trigger: "blur" },
          { required: true, message: "请输入最大赎回金额", trigger: "blur" }
        ],
        dayMaxShuHui: [{ validator: check_dayMaxShuHui, trigger: "blur" }],
        eduBi: [{ validator: checkNum9, trigger: "blur" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增保险产品第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 获取选定的机构
    let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));

    if (sessionStorage.getItem("baoxian_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("baoxian_step1"));
      this.change_xilie(this.ruleForm.institutionId, false);
    } else {
      this.change_xilie(xilieData.institutionId, false);
      this.ruleForm.institutionId = xilieData.institutionId;
      if (xilieData.id) {
        this.ruleForm.seriesId = xilieData.id;
      }
    }
  },

  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      if (typeof data === "number") {
        let tar = this.xilie.filter(item => item.id === data);
        sessionStorage.setItem("select_xilie", JSON.stringify(tar[0]));
      } else {
        let xilieData = JSON.parse(sessionStorage.getItem("select_xilie")),
          obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName
          };
        sessionStorage.setItem("select_xilie", JSON.stringify(obj));
      }
    },
    // 变更机构后，要对应调整系列
    change_xilie(id, type) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_licai"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;
      if (this.ruleForm.seriesId != "" && type) {
        this.ruleForm.seriesId = "";
      }
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 时间越早，数值越小
          // 起息日期
          let valueDate = new Date(this.ruleForm.valueDate),
            daoqi = new Date(this.ruleForm.daoqi),
            qingsuan = new Date(this.ruleForm.qingsuan);
          if (daoqi < valueDate) {
            this.$message.error("起息日期应早于到期日期！");
            return;
          }
          if (qingsuan < daoqi) {
            this.$message.error("清算日期应晚于到期日期！");
            return;
          }

          sessionStorage.setItem(
            "baoxian_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "baoxian_step2"
          });
        } else {
          this.$message.error("请输入必填数据！");
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "manage_money_matters_mainPage"
      });
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_step1"
      });
    },
    toJiJin() {
      sessionStorage.setItem("page", "基金公司管理");
      this.$router.push({
        name: "fund_company_step1"
      });
    },
    toXiLie() {
      this.$router.push({
        name: "manage_money_matters_mainPage",
        query: {
          institutionId: this.ruleForm.institutionId
        }
      });
    }
  }
};
</script>
