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
        <el-form-item prop="institutionId" label="机构名称" style="position:relative" class="is50">
          <el-select
            filterable
            class="isInput"
            @change="change_xilie(ruleForm.institutionId)"
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

        <el-form-item label="产品名称" prop="name" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="产品唯一标识" prop="uuid" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="ruleForm.uuid"></el-input>
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

        <el-form-item label="产品特性" class="is50" prop="productFeature">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.productFeature"
          >
            <el-option
              size="mini"
              v-for="item in dictData.product_feature_type"
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
        </el-form-item>

        <el-form-item label="募集日期" prop="raiseDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.raiseDate"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="isInput"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="币种" style="position:relative" class="is50">
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

        <el-form-item label="理财日期" prop="managementDate">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            class="isInput"
            v-model="ruleForm.managementDate"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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

        <el-form-item label="产品描述">
          <isQuill :url="'admin/file/up/product'" v-model="ruleForm.description"></isQuill>
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
import isQuill from "@/components/quill.vue";

export default {
  components: { isQuill },
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
    // 验证利率
    var checkNumLilv = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (+value >= 100) {
        callback(new Error("不能大于或等于100"));
      } else {
        callback();
      }
    };
    return {
      pageName: "", // 当前页面名字
      dictData: {}, // 字典数据
      ruleForm: {
        institutionId: "", // 机构名称
        seriesId: "", // 产品系列ID
        name: "", // 产品名称
        uuid: "", // 产品唯一标识
        purchaseAmount: "", // 起购金额
        increaseAmount: "", // 递增金额
        interestRate: "", // 预期年化收益率
        riskLevel: "", // 风险等级
        productFeature: "", // 产品特性
        surplusQuota: "", // 剩余额度
        valueDate: "", // 起息日
        timeLimit: "", // 期限
        managementDate: "", // 理财日期
        raiseDate: "", // 募集日期
        description: "", //  产品描述
        currencyCode: "",
        contentVersion: "" //  内容版本号
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
        managementDate: [
          { required: true, message: "请输入理财日期", trigger: "blur" }
        ],
        raiseDate: [
          { required: true, message: "请输入募集日期", trigger: "blur" }
        ],
        uuid: [
          { required: true, message: "产品唯一标识", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        increaseAmount: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入递增金额", trigger: "blur" }
        ],
        purchaseAmount: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入起购金额", trigger: "blur" }
        ],
        interestRate: [
          { validator: checkNumLilv, trigger: "blur" },
          { required: true, message: "请输入预期年化收益率", trigger: "blur" }
        ],

        surplusQuota: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        timeLimit: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入期限", trigger: "blur" }
        ],
        riskLevel: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 获取选定的机构
    let xilieData = JSON.parse(sessionStorage.getItem("xilie_licai"));
    this.change_xilie(xilieData.institutionId);
    if (sessionStorage.getItem("licai_step1")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step1"));
    } else {
      this.ruleForm.institutionId = xilieData.institutionId;
      if (xilieData.id) {
        this.ruleForm.seriesId = xilieData.id;
      }
    }
  },

  methods: {
    // 变更产品系列后，要保存选择的系列，等回到当前页面后数据能对应上
    setXiLie(data) {
      let tar = this.xilie.filter(item => item.id === data);
      sessionStorage.setItem("xilie_licai", JSON.stringify(tar[0]));
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;
      if (this.ruleForm.seriesId != "") {
        this.ruleForm.seriesId = "";
      }
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 时间越早，数值越小
          // 起息日期
          let valueDate = new Date(this.ruleForm.valueDate);
          // 理财日期
          let managementDate1 = new Date(this.ruleForm.managementDate[0]);
          let managementDate2 = new Date(this.ruleForm.managementDate[1]);
          // 募集日期
          let raiseDate2 = new Date(this.ruleForm.raiseDate[1]);

          if (valueDate < managementDate1 || valueDate > managementDate2) {
            this.$message.error("起息日期应介于理财日期之间！");
            return;
          }
          if (valueDate < raiseDate2) {
            this.$message.error("起息日期应晚于募集日期！");
            return;
          }
          if (raiseDate2 > managementDate1) {
            this.$message.error("募集日期应早于理财日期！");
            return;
          }
          sessionStorage.setItem("licai_step1", JSON.stringify(this.ruleForm));
          this.$router.push({
            name: "manage_money_matters_step2"
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
