<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div v-if="!isOk">
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

        <el-form-item size="mini" label="是否上架" class="is50">
          <el-radio-group v-model="ruleForm.shelve" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否面签" class="is50">
          <el-radio-group v-model="ruleForm.visaInterview" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
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

        <el-form-item prop="listAreaFlag" label="榜单专区标识" class="is50">
          <el-select class="isInput" clearable placeholder="请选择" v-model="ruleForm.listAreaFlag">
            <el-option
              size="mini"
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
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
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 14 || ("" + value).length < 0) {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };
    return {
      dictData: {},
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        flowNum: "", // 默认关注数量
        shelve: "否", // 是否上架
        visaInterview: "否", // 是否面签
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultNum: "", // 默认购买数量
        defaultAmount: "", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        regulatoryProperty: "" // 监管属性
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
        regulatoryProperty: [
          { required: true, message: "请选择监管属性", trigger: "blur" }
        ],
        sameProductFlag: [
          { min: 1, max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        flowNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第二步"; // 获取页面名称
    if (sessionStorage.getItem("licai_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step2"));
    }
  },

  methods: {
    // 保存
    next() {
      let step1 = JSON.parse(sessionStorage.getItem("licai_step1"));
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_licai"));
      let obj = {
        institutionId: step1.institutionId,
        institutionName: "",
        seriesId: step1.seriesId,
        seriesName: "",
        name: step1.name,
        increaseAmount: +step1.increaseAmount,
        interestRate: +step1.interestRate,
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
        appInfo: {
          shelve: this.ruleForm.shelve === "否" ? "NO" : "YES",
          visaInterview: this.ruleForm.visaInterview === "否" ? "NO" : "YES",
          homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
          listAreaFlag: this.ruleForm.listAreaFlag,
          recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
          sameProductFlag: this.ruleForm.sameProductFlag,
          defaultAmount: +this.ruleForm.defaultAmount,
          defaultBuyNum: +this.ruleForm.defaultNum,
          defaultFlowNum: +this.ruleForm.flowNum,
          listAreaFlagLabel: ""
        }
      };

      // 机构
      obj.institutionName = this.dictData.jigou.filter(item => {
        return item.id === obj.institutionId;
      })[0].name;

      if (obj.seriesId) {
        obj.seriesName = xilieData.name;
      }
      if (obj.riskLevel) {
        obj.riskLevelLabel = this.dictData.risk_level.filter(
          item => item.value == obj.riskLevel
        )[0].label;
      }
      if (obj.surplusQuota) {
        obj.surplusQuotaLabel = this.dictData.surplus_quota.filter(
          item => item.value == obj.surplusQuota
        )[0].label;
      }
      if (obj.regulatoryProperty) {
        obj.regulatoryPropertyLabel = this.dictData.regulatory_property.filter(
          item => item.value == obj.regulatoryProperty
        )[0].label;
      }
      if (obj.appInfo.listAreaFlag) {
        obj.appInfo.listAreaFlagLabel = this.dictData.list_area_type.filter(
          item => item.value == obj.appInfo.listAreaFlag
        )[0].label;
      }
      this.$api
        .add_licai({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.isOk = true;
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
