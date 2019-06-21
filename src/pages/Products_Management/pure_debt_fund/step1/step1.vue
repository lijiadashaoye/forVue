<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
        :rules="rules"
      >
        <el-form-item
          prop="institutionId"
          label="机构名称"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.institutionId"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <a
            class="isA"
            @click="toJiGou"
          >无机构？</a>

        </el-form-item>

        <el-form-item
          prop="fundHouseId"
          label="基金公司"
          style="position:relative"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.fundHouseId"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jijin"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <a
            class="isA"
            @click="toJiJin"
          >无基金公司？</a>
        </el-form-item>
        <hr>
        <el-form-item
          label="产品名称"
          prop="name"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="基金代码"
          prop="code"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            placeholder="请输入"
            v-model="ruleForm.code"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="交易状态"
          prop="status"
          class="is50"
        >
          <el-select
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.status"
          >
            <el-option
              size='mini'
              v-for="item in dictData.transaction_state "
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="日涨幅"
          prop="dailyIncrease"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.dailyIncrease"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="单位净值"
          class="is50"
        >
          <el-input
            class="isInput"
            type="number"
            clearable
            v-model="ruleForm.netValue.netAssetValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="累计净值"
          class="is50"
        >
          <el-input
            type="number"
            class="isInput"
            clearable
            v-model="ruleForm.netValue.netAccumulateValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="单日涨幅"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.performance.oneDayIncrease"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="近三月涨幅"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.performance.threeMonthIncrease"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="近六月涨幅"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.performance.sixMonthIncrease"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="近一年涨幅"
          class="is50"
        >
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.performance.oneYearIncrease"
            placeholder="请输入"
            type='number'
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

      </el-form>
    </div>
    <div class="nextButtons">
      <el-button
        size="mini"
        type="primary"
        @click="next"
      >下一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        size="mini"
        type="info"
        @click="back"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构ID
        fundHouseId: "", // 基金公司ID
        name: "", // 产品名称
        code: "", // 代码
        status: "", // 交易状态
        dailyIncrease: "", // 日涨幅
        netValue: {
          netAssetValue: "", // 单位净值
          netAccumulateValue: "" // 累计净值
        },
        performance: {
          oneDayIncrease: "", // 单日涨幅
          threeMonthIncrease: "", // 近三个月涨幅
          sixMonthIncrease: "", // 近六个月涨幅
          oneYearIncrease: "" // 近一年涨幅
        }
      },
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "change" }
        ],
        fundHouseId: [
          { required: true, message: "请选择基金公司", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入基金代码", trigger: "blur" }],
        status: [
          { required: true, message: "请选择交易状态", trigger: "change" }
        ],
        dailyIncrease: [
          { required: true, message: "请输入日涨幅", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
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
