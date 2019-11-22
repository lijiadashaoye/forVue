<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div v-if="!isOk" id="forTable">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        :rules="rules"
        class="isForm"
      >
        <el-form-item label="同一产品标识" class="is50" prop="sameProductFlag">
          <el-input clearable v-model="ruleForm.sameProductFlag" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>

        <el-form-item label="是否上架" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.shelveStatus"
          >
            <el-option
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否面签" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.visaInterview"
          >
            <el-option
              v-for="item in dictData.visa_interview_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属区域" style="position:relative" class="is50" prop="areaCode">
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

        <el-form-item label="默认存款笔数" class="is50" prop="defaultNum">
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

        <el-form-item label="默认存款金额" class="is50" prop="defaultAmount">
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

        <el-form-item label="榜单专区标识" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.listAreaFlag"
          >
            <el-option
              size="mini"
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合作方式" class="is50" prop="cooperationMode">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.cooperationMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.cooperation_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行对接方式" class="is50" prop="connectionMode">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.connectionMode"
          >
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年收费率" class="is50" prop="yearRate">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.yearRate"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="默认关注数量" class="is50" prop="defaultFlowNum">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.defaultFlowNum"
            placeholder="请输入"
            class="isInput"
          ></el-input>
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

        <el-form-item size="mini" label="自动上架" class="is50">
          <el-radio-group v-model="ruleForm.autoShelve" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否签约" class="is50">
          <el-radio-group v-model="ruleForm.signed" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否实名" class="is50">
          <el-radio-group v-model="ruleForm.realNameAuth" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否显示银行页" class="is50">
          <el-radio-group v-model="ruleForm.showBankPage" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="H5链接" style="width:100%;" prop="h5Url">
          <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
        </el-form-item>
      </el-form>
      <div v-if="!isOk" class="nextButtons">
        <el-button size="mini" type="warning" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="primary" @click="next" :disabled="isSaveIng">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>

    <div v-if="isOk" id="forTable">
      <hasSuccess @isOver="isOver" />
    </div>
  </div>
</template>
<script>
import hasSuccess from "@/components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (+value < 0 || +value > 100) {
        callback(new Error("请输入0--100"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      dictData: {}, // 字典数据
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        shelveStatus: "yes", // 是否上架
        visaInterview: "no", // 是否面签
        areaCode: "100000",
        defaultNum: "0", // 默认购买数量
        defaultAmount: "0", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        cooperationMode: "unknown",
        connectionMode: "nothing",
        yearRate: "",
        defaultFlowNum: "0",
        recommend: "否", //
        homePage: "否", // 是否首页排行
        autoShelve: "否", //
        signed: "否", //
        realNameAuth: "是", //
        showBankPage: "否" //
      },
      //表单验证
      rules: {
        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        defaultNum: [{ validator: checkNum2, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum3, trigger: "blur" }],
        h5Url: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        defaultFlowNum: [{ validator: checkNum2, trigger: "blur" }],
        yearRate: [{ validator: checkNum1, trigger: "blur" }],
        cooperationMode: [
          { required: true, message: "请选择合作方式", trigger: "change" }
        ],
        connectionMode: [
          { required: true, message: "请选择银行对接方式", trigger: "change" }
        ],
        areaCode: [
          { required: true, message: "请选择所属区域", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page") + " > 新增结构存款第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let jiegou_step2 = sessionStorage.getItem("jiegou_step2");
    if (jiegou_step2) {
      this.ruleForm = JSON.parse(jiegou_step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.isSaveIng = true;
          let step1 = JSON.parse(sessionStorage.getItem("jiegou_step1"));
          let type = JSON.parse(
            sessionStorage.getItem("dict")
          ).deposit_type.filter(item => {
            return item.value === "structured_deposit";
          })[0];
          let xilieData = JSON.parse(sessionStorage.getItem("select_xilie"));

          let obj = {
            institutionId: xilieData.institutionId,
            institutionName: xilieData.institutionName,
            seriesId: step1.seriesId,
            seriesName: "",
            name: step1.name,
            productSubtype: type.value,
            productSubtypeLabel: type.label,
            minAmount: +step1.minAmount, // 最小起购金额
            maxAmount: +step1.maxAmount, // 最大起购金额
            amountRangeExplain: step1.amountRangeExplain, // 起购范围说明
            typeAlias: step1.typeAlias,
            increaseAmount: +step1.increaseAmount,
            interestRateAlias: step1.interestRateAlias,
            deadlineAlias: step1.deadlineAlias,
            frequencyType: step1.frequencyType, // 付息频率
            frequencyTypeLabel: "",
            surplusQuota: step1.surplusQuota,
            surplusQuotaLabel: "",
            riskLevel: step1.fengxian,
            riskLevelLabel: "",
            regulatoryProperty: step1.regulatoryProperty,
            regulatoryPropertyLabel: "",
            sellingDate: step1.qishou,
            valueDate: step1.qixi,
            currencyCode: step1.currencyCode, // 币种编码
            currencyName: "",
            currencyUnit: "",
            description: step1.description,
            contentVersion: +step1.contentVersion, // 内容版本号
            interest: {
              fromTerm: step1.qixian,
              fromTermUnitType: "1",
              fromTermUnitLabel: "天",
              interestRate: step1.interestRate,
              maxInterestRate: step1.max,
              expireInterestRate: step1.end
            },
            appInfo: {
              shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview,
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "是" ? "YES" : "NO",
              homePage: this.ruleForm.homePage === "是" ? "YES" : "NO",
              defaultBuyNum: +this.ruleForm.defaultNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: "",
              sameProductFlag: this.ruleForm.sameProductFlag,
              defaultFlowNum: +this.ruleForm.defaultFlowNum, // 默认关注数量
              signed: this.ruleForm.signed === "是" ? "YES" : "NO", // 是否签约
              connectionMode: this.ruleForm.connectionMode, // 银行对接方式
              connectionModeLabel: "",
              cooperationMode: this.ruleForm.cooperationMode, // 合作方式
              cooperationModeLabel: "",
              yearRate: +this.ruleForm.yearRate, // 年收费率
              autoShelve: this.ruleForm.autoShelve === "是" ? "YES" : "NO", // 自动上架
              showBankPage: this.ruleForm.showBankPage === "是" ? "YES" : "NO", // 显示银行过渡页
              h5Url: this.ruleForm.h5Url,
              areaCode: this.ruleForm.areaCode, // 区域编码
              areaName: "",
              realNameAuth: this.ruleForm.realNameAuth === "是" ? "YES" : "NO"
            },
            productTags: [],
            selfDefiningTags: [],
            activityTags: []
          };
          if (obj.seriesId != "") {
            obj.seriesName = xilieData.name;
          }

          // 付息频率Label
          obj.frequencyTypeLabel = obj.frequencyType
            ? this.dictData.frequency_type.filter(
                item => item.value === obj.frequencyType
              )[0].label
            : "";
          // 剩余额度Label
          obj.surplusQuotaLabel = obj.surplusQuota
            ? this.dictData.surplus_quota.filter(
                item => item.value === obj.surplusQuota
              )[0].label
            : "";
          // 风险等级Label
          obj.riskLevelLabel = obj.riskLevel
            ? this.dictData.risk_level.filter(
                item => item.value === obj.riskLevel
              )[0].label
            : "";

          // 监管属性Label
          obj.regulatoryPropertyLabel = obj.regulatoryProperty
            ? this.dictData.regulatory_property.filter(
                item => item.value === obj.regulatoryProperty
              )[0].label
            : "";

          // 币种
          if (obj.currencyCode) {
            let kk = this.dictData.bizhong.filter(
              tar => tar.value === obj.currencyCode
            )[0];
            obj.currencyName = kk.label;
            obj.currencyUnit = kk.unit;
          }

          // 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";

          // 是否面签Label
          obj.appInfo.visaInterviewLabel = obj.appInfo.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === obj.appInfo.visaInterview
              )[0].label
            : "";
          // 榜单专区标识Label
          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
              )[0].label
            : "";
          // 银行对接方式Label
          obj.appInfo.connectionModeLabel = obj.appInfo.connectionMode
            ? this.dictData.bank_connection_mode.filter(
                item => item.value === obj.appInfo.connectionMode
              )[0].label
            : "";

          // 银行合作方式Label
          obj.appInfo.cooperationModeLabel = obj.appInfo.cooperationMode
            ? this.dictData.cooperation_mode.filter(
                item => item.value === obj.appInfo.cooperationMode
              )[0].label
            : "";

          // 所属区域
          obj.appInfo.areaName = obj.appInfo.areaCode
            ? this.dictData.quyu.filter(
                item => item.value === obj.appInfo.areaCode
              )[0].label
            : "";

          // 获取产品标签
          if (step1.productTags.length > 0) {
            this.dictData.productTags.forEach(item => {
              step1.productTags.forEach(tar => {
                if (item.id === tar) {
                  obj.productTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }
          // 获取自定义标签
          if (step1.selfDefiningTags.length > 0) {
            this.dictData.selfDefiningTags.forEach(item => {
              step1.selfDefiningTags.forEach(tar => {
                if (item.id === tar) {
                  obj.selfDefiningTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }
          // 获取活动标签
          if (step1.activityTags.length > 0) {
            this.dictData.activityTags.forEach(item => {
              step1.activityTags.forEach(tar => {
                if (item.id === tar) {
                  obj.activityTags.push({
                    id: tar,
                    name: item.name
                  });
                }
              });
            });
          }

          this.$api
            .save_jiegou({
              vm: this,
              data: obj
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                sessionStorage.removeItem("jiegou_step1");
                sessionStorage.removeItem("jiegou_step2");
                this.isOk = true;
              }
            });
        } else {
          this.$message.error("请正确填写表单数据！");
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "存款管理 ");
      if (type === "back") {
        this.$router.push({ name: `deposit_mainPage` });
      } else {
        sessionStorage.removeItem("jiegou_step1");
        sessionStorage.removeItem("jiegou_step2");
        this.$router.push({ name: `jiegou_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "deposit_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("jiegou_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "jiegou_step1"
      });
    }
  }
};
</script>
