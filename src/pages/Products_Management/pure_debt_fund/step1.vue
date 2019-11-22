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
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item prop="institutionId" label="机构名称" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
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
        <hr />
        <el-form-item label="产品名称" prop="name" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="基金代码" prop="code" class="is50">
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            type="number"
            v-model="ruleForm.code"
          ></el-input>
        </el-form-item>

        <el-form-item label="交易状态" prop="status" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.status"
          >
            <el-option
              size="mini"
              v-for="item in dictData.transaction_state "
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

        <el-form-item label="单日涨幅" class="is50" prop="oneDayIncrease">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.oneDayIncrease"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="近一月个涨幅" class="is50" prop="oneMonthIncrease">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.oneMonthIncrease"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="近三月个涨幅" class="is50" prop="threeMonthIncrease">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.threeMonthIncrease"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="近六个月涨幅" class="is50" prop="sixMonthIncrease">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.sixMonthIncrease"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="近一年涨幅" class="is50" prop="oneYearIncrease">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.oneYearIncrease"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="nextButtons">
      <el-button size="mini" type="primary" @click="next">下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="mini" type="info" @click="back">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.oneDayIncrease = "0.00";
        callback();
      } else {
        this.ruleForm.oneDayIncrease = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.threeMonthIncrease = "0.00";
        callback();
      } else {
        this.ruleForm.threeMonthIncrease = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum7 = (rule, value, callback) => {
      if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.sixMonthIncrease = "0.00";
        callback();
      } else {
        this.ruleForm.sixMonthIncrease = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum6 = (rule, value, callback) => {
      if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.oneYearIncrease = "0.00";
        callback();
      } else {
        this.ruleForm.oneYearIncrease = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum8 = (rule, value, callback) => {
      if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.oneMonthIncrease = "0.00";
        callback();
      } else {
        this.ruleForm.oneMonthIncrease = (+value).toFixed(2);
        callback();
      }
    };
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
    // 验证数字
    var checkNum4 = (rule, value, callback) => {
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
    var checkNum5 = (rule, value, callback) => {
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

    return {
      env: null,
      pageName: "",
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构ID
        fundHouseId: "", // 基金公司ID
        name: "", // 产品名称
        code: "", // 代码
        status: "", // 交易状态
        contentVersion: "", // 版本
        netAssetValue: "0.0000", // 单位净值
        netAccumulateValue: "0.0000", // 累计净值
        oneDayIncrease: "0.00", // 单日涨幅
        threeMonthIncrease: "0.00", // 近三个月涨幅
        sixMonthIncrease: "0.00", // 近六个月涨幅
        oneYearIncrease: "0.00", // 近一年涨幅
        oneMonthIncrease: "0.00", // 近一个月涨幅
        quyu: "100000", // 产品区域
        currencyCode: "CNY"
      },
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "change" }
        ],
        name: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" },
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        code: [
          { min: 1, max: 6, message: "最多输入6个字", trigger: "blur" },
          { required: true, message: "请输入基金代码", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择交易状态", trigger: "change" }
        ],
        contentVersion: [{ validator: checkNum3, trigger: "blur" }],
        netAssetValue: [{ validator: checkNum4, trigger: "blur" }],
        netAccumulateValue: [{ validator: checkNum5, trigger: "blur" }],
        oneDayIncrease: [{ validator: checkNum1, trigger: "blur" }],
        threeMonthIncrease: [{ validator: checkNum2, trigger: "blur" }],
        sixMonthIncrease: [{ validator: checkNum7, trigger: "blur" }],
        oneYearIncrease: [{ validator: checkNum6, trigger: "blur" }],
        oneMonthIncrease: [{ validator: checkNum8, trigger: "blur" }],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        quyu: [{ required: true, message: "请选择产品区域", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增纯债基金第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    if (sessionStorage.getItem("chunzhai_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("chunzhai_step1"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            "chunzhai_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "pure_debt_fund_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "pure_debt_fund_mainPage"
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
    }
  }
};
</script>
