<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div v-if="!isOk" style="overflow:auto;">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
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

        <el-form-item label="是否上架" class="is50" prop="shelveStatus">
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

        <el-form-item label="是否面签" class="is50" prop="visaInterview">
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

        <el-form-item label="产品版本标识" prop="contentVersion" class="is50">
          <el-input
            class="isInput"
            clearable
            v-model="ruleForm.contentVersion"
            placeholder="请输入"
            type="number"
          ></el-input>
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

        <el-form-item label="年收费率" class="is50" prop="yearRate">
          <el-input
            type="number"
            clearable
            v-model="ruleForm.yearRate"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <span class="isA">%</span>
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
        <el-form-item size="mini" label="是否签约" class="is50">
          <el-radio-group v-model="ruleForm.signed" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <div style="width:100%;">
          <el-form-item label="产品H5链接" prop="h5Url">
            <el-input clearable v-model="ruleForm.h5Url" placeholder="请输入" class="isInput"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div v-if="!isOk" class="nextButtons">
        <el-button size="mini" type="primary" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="primary" @click="next">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="back">取消</el-button>
      </div>
    </div>

    <hasSuccess @isOver="isOver" v-if="isOk" />
  </div>
</template>
<script>
import hasSuccess from "@/components/success.vue";
export default {
  components: { hasSuccess },
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
    var checkNum2 = (rule, value, callback) => {
      if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.yearRate = "0.0000";
        callback();
      } else {
        this.ruleForm.yearRate = (+value).toFixed(4);
        callback();
      }
    };

    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else if (!value) {
        this.ruleForm.defaultAmount = "0.00";
        callback();
      } else {
        this.ruleForm.defaultAmount = (+value).toFixed(2);
        callback();
      }
    };

    return {
      env: null,
      dictData: {}, // 字典数据
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        sameProductFlag: "", // 同一产品标识
        flowNum: "0", // 默认关注数量
        shelveStatus: "yes", // 是否上架
        visaInterview: "no", // 是否面签
        recommend: "否", // 是否推荐
        homePage: "否", // 是否首页排行
        defaultNum: "0", // 默认购买数量
        defaultAmount: "0.00", // 默认购买金额
        listAreaFlag: "", // 榜单专区标识
        contentVersion: "", // 内容版本号
        realNameAuth: "是", // 是否实名认证
        signed: "否", // 是否签约
        cooperationMode: "unknown", // 合作方式
        yearRate: "0.0000", // 年收费率
        h5Url: "", // h5链接
        showBankPage: "否" // 是否显示银行页
      },
      rules: {
        shelveStatus: [
          { required: true, message: "请选择上架状态", trigger: "change" }
        ],

        sameProductFlag: [
          { min: 1, max: 100, message: "最多输入100个字", trigger: "blur" }
        ],
        flowNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultNum: [{ validator: checkNum3, trigger: "blur" }],
        defaultAmount: [{ validator: checkNum1, trigger: "blur" }],
        yearRate: [{ validator: checkNum2, trigger: "blur" }],
        visaInterview: [
          { required: true, message: "请选择是否面签", trigger: "change" }
        ],
        cooperationMode: [
          { required: true, message: "请选择合作方式", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.pageName = sessionStorage.getItem("page") + " > 新增货币基金第二步"; // 获取页面名称
    if (sessionStorage.getItem("huobijijin_step2")) {
      this.ruleForm = JSON.parse(sessionStorage.getItem("huobijijin_step2"));
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(sessionStorage.getItem("huobijijin_step1"));
          let obj = {
            institutionId: step1.institutionName,
            institutionName: "",
            fundHouseId: step1.fundHouseId,
            fundHouseName: "",
            name: step1.name,
            minAmount: +step1.purchaseAmount,
            redemptionDate: +step1.redemptionDate,
            lockinPeriod: +step1.lockinPeriod,
            buyIn: +step1.buyIn,
            commission: +step1.commission,
            description: step1.description,
            yieldRule: step1.yieldRule,
            contentVersion: +this.ruleForm.contentVersion, // 内容版本号
            accountingDate: step1.redemptionDate, // 到账赎回日
            currencyCode: step1.currencyCode, // 币种编码
            currencyName: "",
            currencyUnit: "",
            selfDefiningTags: [],
            activityTags: [],
            yield: {
              onThe7thOfTheYearYield: +step1.onThe7thOfTheYearYield,
              thousandsOfYearsYields: +step1.thousandsOfYearsYields
            },
            appInfo: {
              sameProductFlag: this.ruleForm.sameProductFlag,
              defaultFlowNum: +this.ruleForm.flowNum,
              shelveStatus: this.ruleForm.shelveStatus,
              shelveStatusLabel: "",
              visaInterview: this.ruleForm.visaInterview,
              visaInterviewLabel: "",
              recommend: this.ruleForm.recommend === "否" ? "NO" : "YES",
              homePage: this.ruleForm.homePage === "否" ? "NO" : "YES",
              defaultBuyNum: +this.ruleForm.defaultNum,
              defaultAmount: +this.ruleForm.defaultAmount,
              listAreaFlag: this.ruleForm.listAreaFlag,
              listAreaFlagLabel: "",
              realNameAuth: this.ruleForm.realNameAuth === "否" ? "NO" : "YES", // 是否实名认证
              signed: this.ruleForm.signed === "否" ? "NO" : "YES", // 是否签约
              cooperationMode: this.ruleForm.cooperationMode, // 合作方式
              cooperationModeLabel: "",
              yearRate: +this.ruleForm.yearRate, // 年收费率
              h5Url: this.ruleForm.h5Url, // h5链接
              showBankPage: this.ruleForm.showBankPage === "否" ? "NO" : "YES", // 是否显示银行页
              areaCode: step1.areaCode, // 区域编码
              areaName: ""
            }
          };
          // 榜单专区标识Label
          obj.appInfo.listAreaFlagLabel = obj.appInfo.listAreaFlag
            ? this.dictData.list_area_type.filter(
                item => item.value === obj.appInfo.listAreaFlag
              )[0].label
            : "";
          // 上架状态
          obj.appInfo.shelveStatusLabel = obj.appInfo.shelveStatus
            ? this.dictData.shelve_status.filter(
                item => item.value === obj.appInfo.shelveStatus
              )[0].label
            : "";
          // 银行合作方式Label
          obj.appInfo.cooperationModeLabel = obj.appInfo.cooperationMode
            ? this.dictData.cooperation_mode.filter(
                item => item.value === obj.appInfo.cooperationMode
              )[0].label
            : "";
          // 机构
          obj.institutionName = obj.institutionId
            ? this.dictData.jigou.filter(
                item => item.id === obj.institutionId
              )[0].name
            : "";
          // 基金
          obj.fundHouseName = obj.fundHouseId
            ? this.dictData.jijin.filter(item => item.id === obj.fundHouseId)[0]
                .name
            : "";
          // 币种
          if (obj.currencyCode) {
            let kk = this.dictData.bizhong.filter(
              tar => tar.value === obj.currencyCode
            )[0];
            obj.currencyName = kk.label;
            obj.currencyUnit = kk.unit;
          }
          // 所属区域
          obj.appInfo.areaName = step1.areaCode
            ? this.dictData.quyu.filter(
                item => item.value === step1.areaCode
              )[0].label
            : "";
          // 是否面签Label
          obj.appInfo.visaInterviewLabel = obj.appInfo.visaInterview
            ? this.dictData.visa_interview_type.filter(
                item => item.value === obj.appInfo.visaInterview
              )[0].label
            : "";

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
            .add_huobijijin({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                sessionStorage.removeItem("huobijijin_step1");
                sessionStorage.removeItem("huobijijin_step2");
                this.isOk = true;
              }
            });
        }
      });
    },
    isOver(type) {
      sessionStorage.setItem("page", "货币基金管理 ");
      if (type === "back") {
        this.$router.push({ name: `money_fund_mainPage` });
      } else {
        this.$router.push({ name: `money_fund_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "money_fund_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem("huobijijin_step2", JSON.stringify(this.ruleForm));
      this.$router.push({
        name: "money_fund_step1"
      });
    }
  }
};
</script>
