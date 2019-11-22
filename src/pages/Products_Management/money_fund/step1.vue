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
        <el-form-item prop="institutionName" label="机构名称" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionName"
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

        <el-form-item label="基金公司" style="position:relative" class="is50">
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

        <el-form-item label="起购金额" class="is50" prop="purchaseAmount">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.purchaseAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="赎回到帐日" class="is50" prop="redemptionDate">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.redemptionDate"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="锁定期" class="is50" prop="lockinPeriod">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.lockinPeriod"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="买入" class="is50" prop="buyIn">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.buyIn"
            placeholder="请输入"
          ></el-input>
          <span class="isA"></span>
        </el-form-item>

        <el-form-item label="手续费用" class="is50" prop="commission">
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.commission"
            placeholder="请输入"
          ></el-input>
          <span class="isA"></span>
        </el-form-item>

        <el-form-item label="所属区域" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.areaCode"
          >
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
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.currencyCode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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

        <el-form-item label="万份收益" class="is50" prop="thousandsOfYearsYields">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.thousandsOfYearsYields"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="产品描述"
          prop="description"
          style="text-align:left;width:100%;margin-right:30px;"
        >
          <editor-bar v-model="ruleForm.description" :url="'admin/file/up/product'"></editor-bar>
        </el-form-item>

        <el-form-item
          label="收益规则"
          prop="yieldRule"
          style="text-align:left;width:100%;margin-right:30px;"
        >
          <editor-bar v-model="ruleForm.yieldRule" :url="'admin/file/up/product'"></editor-bar>
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
    var check_lockinPeriod = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.lockinPeriod = (+value).toFixed(0);
        callback();
      }
    };

    // 验证数字
    var check_commission = (rule, value, callback) => {
      if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.commission = "0.00";
        callback();
      } else {
        this.ruleForm.commission = (+value).toFixed(2);
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
      if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
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
      if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
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
    var check_purchaseAmount = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.purchaseAmount = (+value).toFixed(2);
        callback();
      }
    };

    return {
      env: null,
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionName: "", // 机构名称
        fundHouseId: "", // 基金公司ID
        name: "", // 产品名称
        purchaseAmount: "", // 起购金额
        redemptionDate: "", // 赎回到账日
        lockinPeriod: "", // 锁定期
        buyIn: "", // 买入
        commission: "0.00", // 手续费
        description: "", // 描述
        yieldRule: "", //  收益规则
        areaCode: "100000",
        currencyCode: "CNY",
        selfDefiningTags: [],
        activityTags: [],
        onThe7thOfTheYearYield: "0.0000", // 七日年化收益率
        thousandsOfYearsYields: "0.0000" // 万份年化收益率
      },
      //表单验证
      rules: {
        institutionName: [
          { required: true, message: "请选择机构名称", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        purchaseAmount: [
          { required: true, message: "请输入起购金额", trigger: "blur" },
          { validator: check_purchaseAmount, trigger: "blur" }
        ],

        redemptionDate: [
          { required: true, message: "请输入赎回到账日", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        lockinPeriod: [
          { required: true, message: "请输入锁定期", trigger: "blur" },
          { validator: check_lockinPeriod, trigger: "blur" }
        ],
        buyIn: [{ validator: checkNum3, trigger: "blur" }],
        commission: [{ validator: check_commission, trigger: "blur" }],
        onThe7thOfTheYearYield: [{ validator: checkNum4, trigger: "blur" }],
        thousandsOfYearsYields: [{ validator: checkNum5, trigger: "blur" }],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增货币基金第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    if (sessionStorage.getItem("huobijijin_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("huobijijin_step1"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            "huobijijin_step1",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push({
            name: "money_fund_step2"
          });
        }
      });
    },
    // 取消
    back() {
      this.$router.push({
        name: "money_fund_mainPage"
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
