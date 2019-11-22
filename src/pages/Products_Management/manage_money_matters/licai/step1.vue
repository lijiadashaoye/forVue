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

        <el-form-item label="产品名称" prop="name" class="is50">
          <el-input class="isInput" placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="起购金额" class="is50" prop="purchaseAmount">
          <el-input
            type="number"
            class="isInput"
            v-model="ruleForm.purchaseAmount"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="递增金额" prop="increaseAmount" class="is50">
          <el-input
            class="isInput"
            v-model="ruleForm.increaseAmount"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item class="is50" label="预期年化收益率" prop="interestRate">
          <el-input class="isInput" type="number" v-model="ruleForm.interestRate" placeholder="请输入"></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="风险等级" class="is50" prop="riskLevel">
          <el-select filterable class="isInput" placeholder="请选择" v-model="ruleForm.riskLevel">
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

        <el-form-item label="剩余额度" prop="surplusQuota" class="is50">
          <el-select filterable class="isInput" v-model="ruleForm.surplusQuota" placeholder="请选择">
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
          <el-input class="isInput" type="number" v-model="ruleForm.timeLimit" placeholder="请输入"></el-input>
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

        <el-form-item label="起息日期" class="is50" prop="valueDate">
          <el-date-picker
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="isInput"
            v-model="ruleForm.valueDate"
            placeholder="选择日期"
          ></el-date-picker>
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
    // 验证数字
    var check_purchaseAmount = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000 || !value) {
        callback(new Error("请输入0--10000000正数"));
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
    var checkNum3 = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.timeLimit = (+value).toFixed(0);
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
        name: "", // 产品名称
        purchaseAmount: "0.00", // 起购金额
        increaseAmount: "0.00", // 递增金额
        interestRate: "0.00", // 预期年化收益率
        riskLevel: "", // 风险等级
        productFeature: "", // 产品特性
        surplusQuota: "", // 剩余额度
        valueDate: "", // 起息日
        timeLimit: "", // 期限
        managementDate: "", // 理财日期
        raiseDate: "", // 募集日期
        description: "", //  产品描述
        currencyCode: "CNY",
        contentVersion: "", //  内容版本号
        selfDefiningTags: [],
        activityTags: []
      },
      xilie: [], // 从服务器返回的产品系列数据
      //表单验证
      rules: {
        institutionId: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        valueDate: [
          { required: true, message: "请输入起息日期", trigger: "change" }
        ],
        managementDate: [
          { required: true, message: "请输入理财日期", trigger: "change" }
        ],
        raiseDate: [
          { required: true, message: "请输入募集日期", trigger: "change" }
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

        surplusQuota: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        timeLimit: [{ required: true, validator: checkNum3, trigger: "blur" }],
        riskLevel: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        currencyCode: [
          { required: true, message: "请选择币种", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增理财产品第一步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    // 获取选定的机构
    let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));

    if (sessionStorage.getItem("licai_step1")) {
      // 从第二步跳过来的
      this.ruleForm = JSON.parse(sessionStorage.getItem("licai_step1"));
      this.change_xilie(this.ruleForm.institutionId, false);
    } else {
      this.change_xilie(xilieData.institutionId, false);
      // 第一次进入页面
      this.ruleForm.institutionId = xilieData.institutionId;
      if (xilieData.id) {
        // 选择了系列才会执行
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
