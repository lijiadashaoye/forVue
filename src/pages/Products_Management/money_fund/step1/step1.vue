<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
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
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.institutionName">
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
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.fundHouseId">
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

        <el-form-item label="万分年化收益率" class="is50" prop="thousandsOfYearsYields">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.thousandsOfYearsYields"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="产品描述" prop="description">
          <quill-editor class="isInput" v-model="ruleForm.description"></quill-editor>
        </el-form-item>

        <el-form-item label="收益规则" prop="yieldRule">
          <quill-editor class="isInput" v-model="ruleForm.yieldRule"></quill-editor>
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
export default {
  props: {},
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
    // 验证数字
    var checkNum4 = (rule, value, callback) => {
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
        commission: "", // 手续费
        description: "", // 描述
        yieldRule: "", //  收益规则
        onThe7thOfTheYearYield: "", // 七日年化收益率
        thousandsOfYearsYields: "" // 万份年化收益率
      },
      //表单验证
      rules: {
        institutionName: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        fundHouseId: [
          { required: true, message: "请选择基金公司", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 10, message: "最多输入10个字", trigger: "blur" }
        ],
        purchaseAmount: [{ validator: checkNum3, trigger: "blur" }],
        redemptionDate: [{ validator: checkNum3, trigger: "blur" }],
        lockinPeriod: [{ validator: checkNum3, trigger: "blur" }],
        buyIn: [{ validator: checkNum3, trigger: "blur" }],
        commission: [{ validator: checkNum3, trigger: "blur" }],
        redemptionDate: [{ validator: checkNum3, trigger: "blur" }],
        onThe7thOfTheYearYield: [{ validator: checkNum4, trigger: "blur" }],
        thousandsOfYearsYields: [{ validator: checkNum4, trigger: "blur" }],
        description: [
          { min: 1, max: 150, message: "最多输入140个字", trigger: "blur" }
        ],
        yieldRule: [
          { min: 1, max: 150, message: "最多输入140个字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
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
